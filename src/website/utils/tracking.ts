/**
 * Centralized Google Ads & Analytics Conversion Tracking Helper
 * Supports:
 * 1. Google Ads Tag (AW-XXXXXXXXX)
 * 2. Website-Call Tracking (Google forwarding number dynamic replacement)
 * 3. Click-to-call mobile conversions
 * 4. Callback / Quote form lead conversions
 */

export interface TrackingConfig {
  ga4Id?: string;
  googleAdsId?: string;
  googleAdsCallConversionLabel?: string;
  googleAdsLeadConversionLabel?: string;
  phoneConversionNumber?: string;
}

// Read current tracking settings from window.__CMS_SETTINGS or environment
export function getActiveTrackingConfig(): TrackingConfig {
  if (typeof window === 'undefined') {
    return {};
  }

  const cmsSettings = (window as any).__CMS_CONTENT__?.settings?.tracking || {};
  
  return {
    ga4Id: cmsSettings.ga4Id || import.meta.env.VITE_GA4_ID || 'G-VTEV53E3T3',
    googleAdsId: cmsSettings.googleAdsId || import.meta.env.VITE_GOOGLE_ADS_ID || 'AW-18404411620',
    googleAdsCallConversionLabel: cmsSettings.googleAdsCallConversionLabel || import.meta.env.VITE_GOOGLE_ADS_CALL_CONVERSION || '',
    googleAdsLeadConversionLabel: cmsSettings.googleAdsLeadConversionLabel || import.meta.env.VITE_GOOGLE_ADS_LEAD_CONVERSION || '',
    phoneConversionNumber: cmsSettings.phoneConversionNumber || '0478 250 790',
  };
}

let lastInitializedTrackingKey = '';

/**
 * Initialize Google Ads Tag & Website Call Tracking alongside GA4
 * Ensures send_page_view: false is set on Ads to prevent duplicate page view hits.
 */
export function initGoogleAdsTracking(customConfig?: Partial<TrackingConfig>) {
  if (typeof window === 'undefined') return;

  const config = { ...getActiveTrackingConfig(), ...customConfig };
  const gtag = (window as any).gtag;

  if (typeof gtag !== 'function') return;

  const adsId = config.googleAdsId || 'AW-18404411620';
  const callLabel = config.googleAdsCallConversionLabel || '';
  const phoneTarget = config.phoneConversionNumber || '0478 250 790';
  const trackingKey = `${adsId}|${callLabel}|${phoneTarget}`;

  // Only reconfigure if settings have actually changed to prevent duplicate executions on route changes
  if (lastInitializedTrackingKey === trackingKey) {
    return;
  }
  lastInitializedTrackingKey = trackingKey;

  if (adsId) {
    if (callLabel) {
      const sendTo = callLabel.includes('/') ? callLabel : `${adsId}/${callLabel}`;
      gtag('config', sendTo, {
        phone_conversion_number: phoneTarget,
        send_page_view: false
      });
    } else {
      gtag('config', adsId, {
        phone_conversion_number: phoneTarget,
        send_page_view: false
      });
    }
  }
}

/**
 * Track Click-to-Call Conversions (Mobile tap on phone buttons / tel: links)
 */
export function trackCallConversion(url?: string): void {
  if (typeof window === 'undefined') return;

  const config = getActiveTrackingConfig();
  const gtag = (window as any).gtag;

  // 1. Dispatch custom DOM event for audit/listeners
  try {
    window.dispatchEvent(
      new CustomEvent('assist:call_clicked', {
        detail: {
          timestamp: new Date().toISOString(),
          phone: config.phoneConversionNumber || '0478 250 790',
          path: window.location.pathname
        }
      })
    );
  } catch (err) {
    console.warn('[Tracking Event Error]:', err);
  }

  // 2. Fire Google Analytics 4 Call & Lead Events (Preserving GA4)
  if (typeof gtag === 'function') {
    const ga4Id = config.ga4Id || 'G-VTEV53E3T3';
    try {
      gtag('event', 'contact_call', {
        event_category: 'engagement',
        event_label: 'Phone Call Click',
        phone_number: config.phoneConversionNumber || '0478 250 790',
        page_location: window.location.href,
        send_to: ga4Id
      });
    } catch (err) {
      console.warn('[GA4 Call Event Warning]:', err);
    }

    // 3. Fire Google Ads Call Conversion Action ONLY if separate conversion label is supplied
    // Destination ID AW-18404411620 alone does not track specific call leads without its conversion label
    if (config.googleAdsId && config.googleAdsCallConversionLabel) {
      const sendTo = config.googleAdsCallConversionLabel.includes('/')
        ? config.googleAdsCallConversionLabel
        : `${config.googleAdsId}/${config.googleAdsCallConversionLabel}`;

      try {
        gtag('event', 'conversion', {
          send_to: sendTo,
          event_callback: () => {
            if (url) window.location.href = url;
          }
        });
        return;
      } catch (err) {
        console.warn('[Google Ads Conversion Warning]:', err);
      }
    }
  }

  if (url) {
    window.location.href = url;
  }
}

/**
 * Track Lead Form Conversions (Enquiry or Callback accepted by server)
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
  try {
    gtag('event', 'generate_lead', {
      event_category: 'enquiry',
      event_label: type === 'callback' ? 'Fast Callback Request' : 'Inspection Quote Request',
      service_type: service || 'Roofing',
      transaction_id: enquiryId,
      value: 1.0,
      currency: 'AUD',
      send_to: ga4Id,
      method: 'form',
      form_name: type
    });
  } catch (err) {
    console.warn('[GA4 Lead Event Warning]:', err);
  }
}
