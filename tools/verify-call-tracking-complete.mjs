import { spawn } from 'child_process';
import http from 'http';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9230;
const BASE_URL = process.argv[2] || process.env.TEST_BASE_URL || 'https://project-1-c8b7e.web.app';
const TEST_URL = `${BASE_URL}/services/roof-repairs/#google-wcc-debug`;

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

class SimpleCDP {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.id = 1;
    this.callbacks = new Map();
  }

  async connect() {
    const WebSocketClient = globalThis.WebSocket;
    this.ws = new WebSocketClient(this.wsUrl);
    await new Promise((resolve, reject) => {
      this.ws.onopen = resolve;
      this.ws.onerror = reject;
    });

    this.ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && this.callbacks.has(msg.id)) {
        const { resolve, reject } = this.callbacks.get(msg.id);
        this.callbacks.delete(msg.id);
        if (msg.error) reject(msg.error);
        else resolve(msg.result);
      }
    };
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = this.id++;
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async eval(expression) {
    const res = await this.send('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true
    });
    if (res.exceptionDetails) {
      throw new Error(`Eval failed: ${JSON.stringify(res.exceptionDetails)}`);
    }
    return res.result?.value;
  }

  close() {
    if (this.ws) this.ws.close();
  }
}

async function run() {
  console.log('======================================================================');
  console.log('🧪 GOOGLE ADS WEBSITE-CALL TRACKING VERIFICATION SUITE');
  console.log('======================================================================\n');

  const chromeProc = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    'about:blank'
  ], { stdio: 'ignore' });

  try {
    let version = null;
    for (let i = 0; i < 20; i++) {
      await sleep(250);
      try {
        version = await fetchJson(`http://127.0.0.1:${PORT}/json/list`);
        if (version && version.length > 0) break;
      } catch (e) {}
    }

    const pageTarget = version.find(t => t.type === 'page');
    const cdp = new SimpleCDP(pageTarget.webSocketDebuggerUrl);
    await cdp.connect();

    await cdp.send('Runtime.enable');
    await cdp.send('Page.enable');

    cdp.ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.method === 'Runtime.consoleAPICalled') {
        if (msg.params.type === 'error' || msg.params.type === 'warning') {
          console.log(`[Browser ${msg.params.type.toUpperCase()}]:`, ...msg.params.args.map(a => a.value || a.description));
        }
      }
      if (msg.method === 'Runtime.exceptionThrown') {
        console.log('[Browser EXCEPTION]:', msg.params.exceptionDetails);
      }
      if (msg.id && cdp.callbacks.has(msg.id)) {
        const { resolve, reject } = cdp.callbacks.get(msg.id);
        cdp.callbacks.delete(msg.id);
        if (msg.error) reject(msg.error);
        else resolve(msg.result);
      }
    };

    console.log(`[Step 1] Loading URL: ${TEST_URL}`);
    await cdp.send('Page.navigate', { url: TEST_URL });
    
    // Wait for React to mount and tracking helpers to initialize
    let waited = 0;
    while (waited < 12000) {
      const ready = await cdp.eval(`Boolean(document.querySelector('#root')?.children?.length > 0 && typeof window.__syncDOMPhoneNumbers === 'function')`);
      if (ready) break;
      await sleep(300);
      waited += 300;
    }
    console.log(`[Hydration Ready] Waited ${waited}ms for React and tracking helpers`);

    // 1. Verify Deployment & Execution of exact Google Ads Snippet
    console.log('\n--- 1. GOOGLE ADS CALL SNIPPET EXECUTION AUDIT ---');
    const snippetAudit = await cdp.eval(`(() => {
      // Inspect static script tags in <head>
      const scripts = Array.from(document.querySelectorAll('head script'));
      const gtagScripts = scripts.map(s => ({
        src: s.getAttribute('src') || null,
        content: s.textContent?.trim() || null
      })).filter(s => s.src?.includes('gtag') || (s.content && s.content.includes('AW-18404411620')));

      // Inspect dataLayer config commands
      const dataLayerConfigs = (window.dataLayer || []).filter(item => {
        const arr = Array.from(item);
        return arr[0] === 'config';
      }).map(item => {
        const arr = Array.from(item);
        return {
          command: arr[0],
          target: arr[1],
          params: typeof arr[2] === 'object' && arr[2] !== null ? Object.keys(arr[2]).reduce((acc, k) => {
            acc[k] = typeof arr[2][k] === 'function' ? '[Function]' : arr[2][k];
            return acc;
          }, {}) : arr[2]
        };
      });

      // Check if exact call conversion config was pushed
      const callConfig = dataLayerConfigs.find(c => c.target === 'AW-18404411620/2y2sCPWtrJodEOSR9MdE');
      const baseAdsConfig = dataLayerConfigs.find(c => c.target === 'AW-18404411620');
      const ga4Config = dataLayerConfigs.find(c => c.target === 'G-VTEV53E3T3');

      return {
        gtagScriptLoaded: scripts.some(s => s.src?.includes('id=AW-18404411620')),
        dataLayerConfigs,
        hasCallConfig: Boolean(callConfig),
        callConfigDetails: callConfig,
        hasPhoneConversionIds: Boolean(callConfig?.params?.phone_conversion_ids?.includes('AW-18404411620/2y2sCPWtrJodEOSR9MdE')),
        hasBaseAdsConfig: Boolean(baseAdsConfig),
        hasGa4Config: Boolean(ga4Config),
        hasForwardingHandler: typeof window.__handleGoogleForwardingNumber === 'function',
        hasSyncDOMHelper: typeof window.__syncDOMPhoneNumbers === 'function'
      };
    })()`);
    console.log('Snippet Audit Result:', JSON.stringify(snippetAudit, null, 2));

    // 2. Initial Phone Elements on /services/roof-repairs/
    console.log('\n--- 2. INITIAL PHONE ELEMENTS ON /services/roof-repairs/ ---');
    const initialPhoneReport = await cdp.eval(`(() => {
      const telLinks = Array.from(document.querySelectorAll('a[href^="tel:"]')).map(a => ({
        href: a.getAttribute('href'),
        text: a.textContent.trim(),
        visible: a.offsetParent !== null
      }));

      const bodyText = document.body.innerText;
      const count0478 = (bodyText.match(/0478\\s*250\\s*790/g) || []).length;

      return {
        activePhoneNumber: window.__activePhoneNumber,
        totalTelLinks: telLinks.length,
        telLinks,
        visibleTextCount: count0478
      };
    })()`);
    console.log('Initial Phone Report:', JSON.stringify(initialPhoneReport, null, 2));

    // 3. Verify Dynamic Google Forwarding Number Replacement
    console.log('\n--- 3. GOOGLE FORWARDING NUMBER REPLACEMENT TEST ---');
    const FORWARDING_DISPLAY = '03 9999 8888';
    const FORWARDING_RAW = '0399998888';
    console.log(`Triggering window.__handleGoogleForwardingNumber('${FORWARDING_DISPLAY}', '${FORWARDING_RAW}')...`);
    
    await cdp.eval(`window.__handleGoogleForwardingNumber('${FORWARDING_DISPLAY}', '${FORWARDING_RAW}')`);
    await sleep(200);

    const postSwapReport = await cdp.eval(`(() => {
      const telLinks = Array.from(document.querySelectorAll('a[href^="tel:"]')).map(a => ({
        href: a.getAttribute('href'),
        text: a.textContent.trim()
      }));

      const bodyText = document.body.innerText;
      const countReplaced = (bodyText.match(/03\\s*9999\\s*8888/g) || []).length;
      const countOriginal = (bodyText.match(/0478\\s*250\\s*790/g) || []).length;

      const nonReplacedLinks = telLinks.filter(l => !l.href.includes('0399998888'));

      return {
        activePhoneNumber: window.__activePhoneNumber,
        totalTelLinks: telLinks.length,
        nonReplacedLinksCount: nonReplacedLinks.length,
        nonReplacedLinks,
        allLinksPointToForwarding: nonReplacedLinks.length === 0,
        replacedTextMentions: countReplaced,
        originalRemainingTextMentions: countOriginal,
        sampleLinks: telLinks.slice(0, 4)
      };
    })()`);
    console.log('Post Swap Report:', JSON.stringify(postSwapReport, null, 2));

    // 4. Client-Side SPA Navigation Test
    console.log('\n--- 4. CLIENT-SIDE NAVIGATION (SPA) FORWARDING PERSISTENCE ---');
    
    // Navigate to Roof Replacement (/services/roof-replacement/)
    console.log('Navigating to Roof Replacement (/services/roof-replacement)...');
    await cdp.eval(`(() => {
      window.history.pushState(null, '', '/services/roof-replacement');
      window.dispatchEvent(new PopStateEvent('popstate'));
    })()`);
    await sleep(600);

    const nav1Report = await cdp.eval(`(() => {
      const telLinks = Array.from(document.querySelectorAll('a[href^="tel:"]')).map(a => ({
        href: a.getAttribute('href'),
        text: a.textContent.trim(),
        classes: a.className,
        parent: a.parentElement ? a.parentElement.tagName : null
      }));
      const nonReplaced = telLinks.filter(l => !l.href.includes('0399998888'));
      
      const headerBtn = document.querySelector('header a[href^="tel:"]');
      const footerBtn = document.querySelector('footer a[href^="tel:"]');
      const stickyMobileBtn = document.querySelector('.mobile-call-sticky a[href^="tel:"], .mobile-call-btn, a[href^="tel:"].fixed, .call-btn-mobile');

      return {
        currentPath: window.location.pathname,
        pageTitle: document.title,
        totalTelLinks: telLinks.length,
        allLinksPreserved: nonReplaced.length === 0,
        nonReplacedCount: nonReplaced.length,
        headerCallLink: headerBtn ? { href: headerBtn.getAttribute('href'), text: headerBtn.textContent.trim() } : 'Not isolated in header tag',
        footerCallLink: footerBtn ? { href: footerBtn.getAttribute('href'), text: footerBtn.textContent.trim() } : 'Not isolated in footer tag',
        sampleLinks: telLinks
      };
    })()`);
    console.log('Nav 1 (Roof Replacement) Report:', JSON.stringify(nav1Report, null, 2));

    console.log('\nNavigating to About Us (/about)...');
    await cdp.eval(`(() => {
      window.history.pushState(null, '', '/about');
      window.dispatchEvent(new PopStateEvent('popstate'));
    })()`);
    await sleep(400);

    const nav2Report = await cdp.eval(`(() => {
      const telLinks = Array.from(document.querySelectorAll('a[href^="tel:"]')).map(a => ({
        href: a.getAttribute('href'),
        text: a.textContent.trim()
      }));
      const nonReplaced = telLinks.filter(l => !l.href.includes('0399998888'));
      return {
        currentPath: window.location.pathname,
        pageTitle: document.title,
        totalTelLinks: telLinks.length,
        allLinksPreserved: nonReplaced.length === 0,
        sampleLinks: telLinks.slice(0, 3)
      };
    })()`);
    console.log('Nav 2 (About Us) Report:', JSON.stringify(nav2Report, null, 2));

    console.log('\nNavigating back to Roof Repairs (/services/roof-repairs)...');
    await cdp.eval(`(() => {
      window.history.pushState(null, '', '/services/roof-repairs');
      window.dispatchEvent(new PopStateEvent('popstate'));
    })()`);
    await sleep(400);

    const navBackReport = await cdp.eval(`(() => {
      const telLinks = Array.from(document.querySelectorAll('a[href^="tel:"]')).map(a => ({
        href: a.getAttribute('href'),
        text: a.textContent.trim()
      }));
      const nonReplaced = telLinks.filter(l => !l.href.includes('0399998888'));
      return {
        currentPath: window.location.pathname,
        pageTitle: document.title,
        totalTelLinks: telLinks.length,
        allLinksPreserved: nonReplaced.length === 0,
        sampleLinks: telLinks.slice(0, 3)
      };
    })()`);
    console.log('Nav Back (Roof Repairs) Report:', JSON.stringify(navBackReport, null, 2));

    // 5. Test Click-to-call mobile intent event (contact_call)
    console.log('\n--- 5. CLICK-TO-CALL EVENT (contact_call) AUDIT ---');
    const callClickAudit = await cdp.eval(`(() => {
      let callEventFired = null;
      window.addEventListener('assist:call_clicked', (e) => {
        callEventFired = e.detail;
      });

      // Find first visible tel: link and dispatch click
      const link = document.querySelector('a[href^="tel:"]');
      if (link) {
        // Intercept navigation for test
        const originalHref = window.location.href;
        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
        return {
          clickedLinkText: link.textContent.trim(),
          clickedHref: link.getAttribute('href'),
          customEventReceived: callEventFired
        };
      }
      return { clicked: false };
    })()`);
    console.log('Call Click Audit:', JSON.stringify(callClickAudit, null, 2));

    cdp.close();
  } catch (err) {
    console.error('Error during test execution:', err);
  } finally {
    chromeProc.kill('SIGKILL');
  }
}

run();
