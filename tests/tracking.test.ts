import { describe, it, expect, beforeEach } from 'vitest';
import {
  initGoogleAdsTracking,
  syncDOMPhoneNumbers,
  subscribeForwardingPhoneNumber,
  trackCallConversion,
  trackLeadConversion
} from '../src/website/utils/tracking';

// Minimal mock DOM for Node.js test environment
class MockTextNode {
  nodeValue: string;
  parentElement: any;
  constructor(text: string, parent: any) {
    this.nodeValue = text;
    this.parentElement = parent;
  }
}

class MockElement {
  tagName: string;
  attributes: Record<string, string> = {};
  childNodes: any[] = [];
  parentElement: any = null;

  constructor(tagName: string) {
    this.tagName = tagName.toUpperCase();
  }

  setAttribute(k: string, v: string) {
    this.attributes[k] = v;
  }

  getAttribute(k: string) {
    return this.attributes[k] || null;
  }

  get textContent(): string {
    return this.childNodes.map(c => c.nodeValue || c.textContent || '').join('');
  }

  set textContent(v: string) {
    this.childNodes = [new MockTextNode(v, this)];
  }

  appendChild(child: any) {
    child.parentElement = this;
    this.childNodes.push(child);
  }
}

class MockDocument {
  body: MockElement;

  constructor() {
    this.body = new MockElement('BODY');
  }

  querySelectorAll(selector: string) {
    const results: MockElement[] = [];
    const traverse = (el: MockElement) => {
      if (selector === 'a[href^="tel:"]') {
        if (el.tagName === 'A' && (el.getAttribute('href') || '').startsWith('tel:')) {
          results.push(el);
        }
      }
      for (const child of el.childNodes) {
        if (child instanceof MockElement) {
          traverse(child);
        }
      }
    };
    traverse(this.body);
    return results;
  }

  createTreeWalker(root: any, whatToShow: number, filter: any) {
    const textNodes: MockTextNode[] = [];
    const collect = (node: any) => {
      for (const child of node.childNodes || []) {
        if (child instanceof MockTextNode) {
          if (filter.acceptNode(child) === 1) { // 1 = FILTER_ACCEPT
            textNodes.push(child);
          }
        } else if (child instanceof MockElement) {
          collect(child);
        }
      }
    };
    collect(root);

    let idx = 0;
    return {
      nextNode: () => {
        if (idx < textNodes.length) {
          return textNodes[idx++];
        }
        return null;
      }
    };
  }
}

describe('Google Ads Phone Conversion & Tracking Suite', () => {
  let doc: MockDocument;
  let link1: MockElement;
  let link2: MockElement;
  let paragraph: MockElement;

  beforeEach(() => {
    doc = new MockDocument();
    
    // Set up mock DOM
    link1 = new MockElement('A');
    link1.setAttribute('href', 'tel:0478250790');
    link1.textContent = 'Call 0478 250 790';
    doc.body.appendChild(link1);

    paragraph = new MockElement('P');
    paragraph.textContent = 'Direct contact: 0478 250 790 available 24/7.';
    doc.body.appendChild(paragraph);

    link2 = new MockElement('A');
    link2.setAttribute('href', 'tel:0478250790');
    link2.textContent = '0478 250 790';
    doc.body.appendChild(link2);

    // Setup global window and document
    (globalThis as any).document = doc;
    (globalThis as any).window = globalThis;
    (globalThis as any).window.location = {
      pathname: '/services/roof-repairs',
      href: 'https://assistroofing.com.au/services/roof-repairs'
    };
    (globalThis as any).window.dispatchEvent = function() {};
    (globalThis as any).NodeFilter = {
      SHOW_TEXT: 4,
      FILTER_ACCEPT: 1,
      FILTER_REJECT: 2
    };

    (globalThis as any).dataLayer = [];
    (globalThis as any).gtag = function(...args: any[]) {
      (globalThis as any).dataLayer.push(args);
    };

    (globalThis as any).__activePhoneNumber = {
      display: '0478 250 790',
      tel: '0478250790',
      isForwarding: false
    };
    (globalThis as any).__phoneSubscribers = [];
    (globalThis as any).__subscribePhoneNumber = function(cb: any) {
      (globalThis as any).__phoneSubscribers.push(cb);
      cb((globalThis as any).__activePhoneNumber);
      return function() {
        (globalThis as any).__phoneSubscribers = (globalThis as any).__phoneSubscribers.filter((s: any) => s !== cb);
      };
    };
    (globalThis as any).__handleGoogleForwardingNumber = function(formatted_number: string, mobile_number: string) {
      if (!formatted_number) return;
      const rawDigits = (mobile_number || formatted_number).replace(/[^0-9+]/g, '');
      (globalThis as any).__activePhoneNumber = {
        display: formatted_number,
        tel: rawDigits,
        isForwarding: true
      };
      for (let i = 0; i < (globalThis as any).__phoneSubscribers.length; i++) {
        try { (globalThis as any).__phoneSubscribers[i]((globalThis as any).__activePhoneNumber); } catch (e) {}
      }
      syncDOMPhoneNumbers(formatted_number, rawDigits);
    };
    (globalThis as any).__syncDOMPhoneNumbers = syncDOMPhoneNumbers;
    delete (globalThis as any).__lastReplacedDisplay;
    delete (globalThis as any).__lastReplacedTel;
  });

  it('1. Configuration Uniqueness: does not add duplicate phone configurations into dataLayer', () => {
    // Initial head script in index.html
    (globalThis as any).gtag('config', 'AW-18404411620/2y2sCPWtrJodEOSR9MdE', {
      phone_conversion_number: '0478 250 790',
      phone_conversion_callback: (globalThis as any).__handleGoogleForwardingNumber
    });

    const initialConfigs = (globalThis as any).dataLayer.filter(
      (item: any[]) => item[0] === 'config' && item[1] === 'AW-18404411620/2y2sCPWtrJodEOSR9MdE'
    );
    expect(initialConfigs.length).toBe(1);

    // Call initGoogleAdsTracking as done on React mount
    initGoogleAdsTracking({
      googleAdsId: 'AW-18404411620',
      googleAdsCallConversionLabel: '2y2sCPWtrJodEOSR9MdE',
      phoneConversionNumber: '0478 250 790'
    });

    // Must still be 1 (no duplicate config pushed)
    const postConfigs = (globalThis as any).dataLayer.filter(
      (item: any[]) => item[0] === 'config' && item[1] === 'AW-18404411620/2y2sCPWtrJodEOSR9MdE'
    );
    expect(postConfigs.length).toBe(1);
    expect(postConfigs[0][2].phone_conversion_number).toBe('0478 250 790');
  });

  it('2. Forwarding Number Replacement: updates active phone state and notifies subscribers', () => {
    let capturedState: any = null;
    const unsubscribe = subscribeForwardingPhoneNumber((state) => {
      capturedState = state;
    });

    expect(capturedState.display).toBe('0478 250 790');
    expect(capturedState.isForwarding).toBe(false);

    // Trigger Google Forwarding replacement
    (globalThis as any).__handleGoogleForwardingNumber('03 9999 8888', '0399998888');

    expect(capturedState.display).toBe('03 9999 8888');
    expect(capturedState.tel).toBe('0399998888');
    expect(capturedState.isForwarding).toBe(true);

    unsubscribe();
  });

  it('3. DOM Replacement: updates all tel: links and text nodes without corrupting DOM tree', () => {
    (globalThis as any).__handleGoogleForwardingNumber('03 9999 8888', '0399998888');

    const telLinks = doc.querySelectorAll('a[href^="tel:"]');
    expect(telLinks.length).toBe(2);

    telLinks.forEach(link => {
      expect(link.getAttribute('href')).toBe('tel:0399998888');
    });

    expect(link1.childNodes[0].nodeValue).toBe('Call 03 9999 8888');
    expect(paragraph.childNodes[0].nodeValue).toBe('Direct contact: 03 9999 8888 available 24/7.');
    expect(link2.childNodes[0].nodeValue).toBe('03 9999 8888');
  });

  it('4. Route Navigation Persistence: re-syncs DOM phone numbers after new HTML is mounted', () => {
    // Set forwarding active
    (globalThis as any).__handleGoogleForwardingNumber('03 9999 8888', '0399998888');

    // Simulate SPA navigation mounting new page content with original default numbers
    const newPageLink = new MockElement('A');
    newPageLink.setAttribute('href', 'tel:0478250790');
    newPageLink.textContent = 'Call Peter: 0478 250 790';
    doc.body.appendChild(newPageLink);

    // Trigger sync
    syncDOMPhoneNumbers();

    expect(newPageLink.getAttribute('href')).toBe('tel:0399998888');
    expect(newPageLink.childNodes[0].nodeValue).toBe('Call Peter: 03 9999 8888');
  });

  it('5. Event Preservation: trackCallConversion fires GA4 contact_call without fake forwarding conversion', () => {
    trackCallConversion();

    const callEvent = (globalThis as any).dataLayer.find(
      (item: any[]) => item[0] === 'event' && item[1] === 'contact_call'
    );
    expect(callEvent).toBeDefined();
    expect(callEvent[2].phone_number).toBe('0478 250 790');
    expect(callEvent[2].send_to).toBe('G-VTEV53E3T3');

    // Verify NO synthetic 'conversion' event was emitted for a click
    const fakeConversion = (globalThis as any).dataLayer.find(
      (item: any[]) => item[0] === 'event' && item[1] === 'conversion'
    );
    expect(fakeConversion).toBeUndefined();
  });

  it('6. Lead Event Preservation: trackLeadConversion fires GA4 generate_lead with proper parameters', () => {
    trackLeadConversion('ENQ-TEST-123', 'quote', 'Roof Repairs');

    const leadEvent = (globalThis as any).dataLayer.find(
      (item: any[]) => item[0] === 'event' && item[1] === 'generate_lead'
    );
    expect(leadEvent).toBeDefined();
    expect(leadEvent[2].form_name).toBe('quote_modal_form');
    expect(leadEvent[2].service_type).toBe('Roof Repairs');
    expect(leadEvent[2].transaction_id).toBe('ENQ-TEST-123');
    expect(leadEvent[2].send_to).toBe('G-VTEV53E3T3');
  });
});
