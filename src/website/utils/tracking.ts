/**
 * Centralized Google Ads & Analytics Conversion Tracking Helper
 * Supports:
 * 1. Google Ads Tag (AW-18404411620)
 * 2. Website-Call Tracking (Google forwarding number dynamic replacement)
 * 3. Click-to-call mobile intent events (contact_call)
 * 4. Callback / Quote form lead conversions (generate_lead)
 */

export interface TrackingConfig {
  ga4Id?: string;
  googleAdsId?: string;
  googleAdsCallConversionLabel?: string;
  googleAdsLeadConversionLabel?: string;
  phoneConversionNumber?: string;
}

export interface PhoneNumberState {
  display: string;
  tel: string;
  isForwarding: boolean;
}

// Read current tracking settings from window.__CMS_CONTENT__ or environment
export function getActiveTrackingConfig(): TrackingConfig {
  if (typeof window === 'undefined') {
    return {};
  }

  const cmsSettings = (window as any).__CMS_CONTENT__?.settings?.tracking || {};
  
  return {
    ga4Id: cmsSettings.ga4Id || import.meta.env.VITE_GA4_ID || 'G-VTEV53E3T3',
    googleAdsId: cmsSettings.googleAdsId || import.meta.env.VITE_GOOGLE_ADS_ID || 'AW-18404411620',
    googleAdsCallConversionLabel: cmsSettings.googleAdsCallConversionLabel || import.meta.env.VITE_GOOGLE_ADS_CALL_CONVERSION || '2y2sCPWtrJodEOSR9MdE',
    googleAdsLeadConversionLabel: cmsSettings.googleAdsLeadConversionLabel || import.meta.env.VITE_GOOGLE_ADS_LEAD_CONVERSION || '',
    phoneConversionNumber: cmsSettings.phoneConversionNumber || '0478 250 790',
  };
}

export function getForwardingPhoneNumber(): PhoneNumberState {
  if (typeof window !== 'undefined' && (window as any).__activePhoneNumber) {
    return (window as any).__activePhoneNumber;
  }
  return {
    display: '0478 250 790',
    tel: '0478250790',
    isForwarding: false
  };
}

export function subscribeForwardingPhoneNumber(callback: (state: PhoneNumberState) => void): () => void {
  if (typeof window === 'undefined') return () => {};

  if (typeof (window as any).__subscribePhoneNumber === 'function') {
    return (window as any).__subscribePhoneNumber(callback);
  }

  const handler = (e: any) => {
    if (e.detail) callback(e.detail);
  };
  window.addEventListener('assist:phone_replaced', handler);
  callback(getForwardingPhoneNumber());
  return () => window.removeEventListener('assist:phone_replaced', handler);
}

/**
 * Scan DOM and ensure all telephone links and phone numbers reflect the Google forwarding number
 */
export function syncDOMPhoneNumbers(targetDisplay?: string, targetTel?: string) {
  if (typeof document === 'undefined') return;

  const current = getForwardingPhoneNumber();
  const display = targetDisplay || current.display;
  const telDigits = targetTel || current.tel;

  // 1. Update all telephone links in the DOM
  const telLinks = document.querySelectorAll<HTMLAnchorElement>('a[href^="tel:"]');
  telLinks.forEach(link => {
    const href = link.getAttribute('href') || '';
    if (
      href.includes('0478250790') ||
      href.includes('0478 250 790') ||
      href.includes('61478250790') ||
      href.includes('99999999') ||
      ((window as any).__lastReplacedTel && href.includes((window as any).__lastReplacedTel))
    ) {
      link.setAttribute('href', `tel:${telDigits}`);
    }
  });

  // 2. Safely update text nodes in place using TreeWalker (preserves React virtual DOM Text node references)
  if (document.body) {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          if (!node.parentElement) return NodeFilter.FILTER_REJECT;
          const tag = node.parentElement.tagName;
          if (['SCRIPT', 'STYLE', 'INPUT', 'TEXTAREA'].includes(tag)) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    let textNode: Node | null;
    while ((textNode = walker.nextNode())) {
      const val = textNode.nodeValue || '';
      if (val.includes('0478 250 790')) {
        textNode.nodeValue = val.replace(/0478\s*250\s*790/g, display);
      } else if (
        (window as any).__lastReplacedDisplay &&
        (window as any).__lastReplacedDisplay !== display &&
        val.includes((window as any).__lastReplacedDisplay)
      ) {
        textNode.nodeValue = val.split((window as any).__lastReplacedDisplay).join(display);
      }
    }
  }

  (window as any).__lastReplacedDisplay = display;
  (window as any).__lastReplacedTel = telDigits;
}

if (typeof window !== 'undefined') {
  (window as any).__syncDOMPhoneNumbers = syncDOMPhoneNumbers;
}

let lastInitializedTrackingKey = '';

/**
 * Initialize Google Ads Tag & Website Call Tracking alongside GA4
 */
export function initGoogleAdsTracking(customConfig?: Partial<TrackingConfig>) {
  if (typeof window === 'undefined') return;

  const config = { ...getActiveTrackingConfig(), ...customConfig };
  const gtag = (window as any).gtag;

  if (typeof gtag !== 'function') return;

  const adsId = config.googleAdsId || 'AW-18404411620';
  const callLabel = config.googleAdsCallConversionLabel || '2y2sCPWtrJodEOSR9MdE';
  const phoneTarget = config.phoneConversionNumber || '0478 250 790';
  const trackingKey = `${adsId}|${callLabel}|${phoneTarget}`;

  if (lastInitializedTrackingKey !== trackingKey) {
    lastInitializedTrackingKey = trackingKey;

    if (adsId) {
      if (callLabel) {
        const sendTo = callLabel.includes('/') ? callLabel : `${adsId}/${callLabel}`;
        gtag('config', sendTo, {
          phone_conversion_number: phoneTarget,
          phone_conversion_callback: (window as any).__handleGoogleForwardingNumber
        });
      } else {
        gtag('config', adsId, {
          phone_conversion_number: phoneTarget,
          phone_conversion_callback: (window as any).__handleGoogleForwardingNumber
        });
      }
    }
  }

  // If Google Tag's _googWcmGet is already available, trigger immediate forwarding number resolution
  if (typeof (window as any)._googWcmGet === 'function') {
    (window as any)._googWcmGet(function(targetNumber: string, mobileNumber: string) {
      if (targetNumber && typeof (window as any).__handleGoogleForwardingNumber === 'function') {
        (window as any).__handleGoogleForwardingNumber(targetNumber, mobileNumber || targetNumber.replace(/\s+/g, ''));
      }
    }, phoneTarget);
  }

  syncDOMPhoneNumbers();
}

/**
 * Track Click-to-Call Conversions (Mobile tap on phone buttons / tel: links)
 * Emits GA4 contact_call event. Does NOT send fake forwarding-call conversions.
 */
export function trackCallConversion(url?: string): void {
  if (typeof window === 'undefined') return;

  const config = getActiveTrackingConfig();
  const gtag = (window as any).gtag;
  const currentPhone = getForwardingPhoneNumber().display;

  // 1. Dispatch custom DOM event for audit/listeners
  try {
    window.dispatchEvent(
      new CustomEvent('assist:call_clicked', {
        detail: {
          timestamp: new Date().toISOString(),
          phone: currentPhone,
          path: window.location.pathname
        }
      })
    );
  } catch (err) {
    console.warn('[Tracking Event Error]:', err);
  }

  // 2. Fire Google Analytics 4 Call Intent Event (contact_call)
  if (typeof gtag === 'function') {
    const ga4Id = config.ga4Id || 'G-VTEV53E3T3';
    try {
      gtag('event', 'contact_call', {
        event_category: 'engagement',
        event_label: 'Phone Call Click',
        phone_number: currentPhone,
        page_location: window.location.href,
        send_to: ga4Id
      });
    } catch (err) {
      console.warn('[GA4 Call Event Warning]:', err);
    }
  }

  if (url) {
    window.location.href = url;
  }
}

/**
 * Track Lead Form Conversions (Enquiry or Callback accepted by server)
 * Fires generate_lead once, strictly after backend confirmation.
 */
export function trackLeadConversion(enquiryId: string, type: 'callback' | 'quote' | 'contact', service?: string): void {
  if (typeof window === 'undefined') return;

  const config = getActiveTrackingConfig();
  const gtag = (window as any).gtag;

  if (typeof gtag !== 'function') return;

  // 1. Fire Google Ads Lead Conversion Action ONLY if separate conversion label is supplied
  if (config.googleAdsId && config.googleAdsLeadConversionLabel) {
    const sendTo = config.googleAdsLeadConversionLabel.includes('/')
      ? config.googleAdsLeadConversionLabel
      : `${config.googleAdsId}/${config.googleAdsLeadConversionLabel}`;

    try {
      gtag('event', 'conversion', {
        send_to: sendTo,
        transaction_id: enquiryId,
        value: 1.0,
        currency: 'AUD'
      });
    } catch (err) {
      console.warn('[Google Ads Lead Conversion Warning]:', err);
    }
  }

  // 2. Fire GA4 Lead Event (Preserving GA4)
  const ga4Id = config.ga4Id || 'G-VTEV53E3T3';
  const formNameMap: Record<string, string> = {
    callback: 'callback_form',
    quote: 'quote_modal_form',
    contact: 'contact_page_form'
  };

  try {
    gtag('event', 'generate_lead', {
      event_category: 'enquiry',
      method: 'form',
      form_name: formNameMap[type] || `${type}_form`,
      service_type: service || 'Roofing',
      transaction_id: enquiryId,
      value: 1.0,
      currency: 'AUD',
      send_to: ga4Id
    });
  } catch (err) {
    console.warn('[GA4 Lead Event Warning]:', err);
  }
}

