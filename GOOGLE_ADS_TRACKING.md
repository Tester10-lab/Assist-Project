# Google Ads & GA4 Tracking Implementation Guide

This document details the configuration for **Assist Roofing** ([assistroofing.com.au](https://assistroofing.com.au/)).

---

## 1. Active Configuration Summary

| Destination / Property | Identifier | Status | Purpose |
| :--- | :--- | :--- | :--- |
| **Google Analytics 4 (GA4)** | `G-VTEV53E3T3` | **Active** | Primary container, page views, engagement, and custom events |
| **Google Ads Destination** | `AW-18404411620` | **Configured** | Remarketing, conversion linking, and Google Forwarding Number swapping |
| **Website Call Conversion Action** | *(Awaiting user label)* | Standby | Will track phone call leads once label is pasted |
| **Website Lead Conversion Action** | *(Awaiting user label)* | Standby | Will track form and callback leads once label is pasted |
| **Target Phone Number** | `0478 250 790` | **Active** | Dynamic swap target for Google Forwarding Numbers |

---

## 2. Co-existence & Avoiding Duplicate Page Views

Google Ads (`AW-18404411620`) is configured directly alongside your existing Google tag (`G-VTEV53E3T3`) using a single shared `gtag.js` script in the `<head>` of [`index.html`](file:///c:/Users/Diplon/OneDrive/Desktop/Assist%20Project/index.html):

```html
<!-- Google tag (gtag.js) for GA4 and Google Ads Destination -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-VTEV53E3T3"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  // 1. Primary GA4 container — sends the standard page_view event on page load
  gtag('config', 'G-VTEV53E3T3');

  // 2. Google Ads Destination configured alongside GA4
  // 'send_page_view: false' ensures Ads DOES NOT generate duplicate page view hits,
  // while activating remarketing context, conversion linking, and Google Forwarding Number swapping.
  gtag('config', 'AW-18404411620', {
    'phone_conversion_number': '0478 250 790',
    'send_page_view': false
  });
</script>
```

### Why this avoids duplicate page views:
1. **Single Library Load**: Only one `https://www.googletagmanager.com/gtag/js?id=G-VTEV53E3T3` script tag is loaded. No second tag is injected.
2. **`send_page_view: false`**: Passed explicitly to the `AW-18404411620` config command. Google Analytics 4 retains complete ownership of `page_view` measurement, preventing Google Ads or linked GA4 views from double counting.
3. **Idempotent Single Page Routing**: In [`src/website/utils/tracking.ts`](file:///c:/Users/Diplon/OneDrive/Desktop/Assist%20Project/src/website/utils/tracking.ts), navigation between pages does not repeatedly invoke config commands with pageview hits.

---

## 3. How to Provide Your Conversion Labels

Because the Google Ads destination ID (`AW-18404411620`) alone cannot distinguish between different types of leads without its conversion action labels, the system is designed to accept your separate conversion labels at any time:

### Where to paste them:
1. Log in to the Admin Dashboard at `/admin`.
2. Go to **Settings** (`/admin/settings`).
3. Scroll down to **Google Ads & Website-Call Tracking**:
   - **Google Ads Tag ID**: Pre-filled with `AW-18404411620`.
   - **Call Conversion Action Label**: Paste your label from Google Ads (e.g. `AbC-D_efG12345` or `AW-18404411620/AbC-D_efG12345`).
   - **Lead / Quote Conversion Action Label**: Paste your label from Google Ads (e.g. `XyZ-1_aBc67890` or `AW-18404411620/XyZ-1_aBc67890`).
4. Click **Save Tracking Settings**.

The configuration updates immediately in [`server/data/db.json`](file:///c:/Users/Diplon/OneDrive/Desktop/Assist%20Project/server/data/db.json) and takes effect on the live website without rebuilding or restarting the server.

---

## 4. How Conversions Are Fired

### A. Website Phone Calls (`trackCallConversion`)
When a visitor taps or clicks any phone link across the site:
1. **GA4 Event**: Fired directly to `G-VTEV53E3T3` (Call intent only, no `generate_lead`):
   - `gtag('event', 'contact_call', { send_to: 'G-VTEV53E3T3', phone_number: '0478 250 790', ... })`
2. **Google Ads Call Conversion**:
   - **If Call Conversion Label is provided**: Fires `gtag('event', 'conversion', { send_to: 'AW-18404411620/' + callLabel })`.
   - **If Call Conversion Label is NOT yet provided**: Fails safely without firing an incomplete conversion hit, while preserving GA4 tracking.

### B. Successful Enquiries & Callbacks (`trackLeadConversion`)
When a visitor submits an enquiry or 15-minute callback request:
1. The form submits to `POST /api/public/enquiry`.
2. **Only after server acceptance** (`{ success: true, accepted: true, id: "..." }`), conversions are triggered:
   - **GA4 Event**: `gtag('event', 'generate_lead', { send_to: 'G-VTEV53E3T3', method: 'form', form_name: 'quote_modal_form' | 'callback_form' | 'contact_page_form', transaction_id: enquiryId, value: 1.0, currency: 'AUD' })`.
   - **Google Ads Lead Conversion**: If the Lead Conversion Label is provided, fires `gtag('event', 'conversion', { send_to: 'AW-18404411620/' + leadLabel, transaction_id: enquiryId, value: 1.0, currency: 'AUD' })`.
3. No user PII (names, emails, phones, or messages) is sent to Google Analytics.
4. If validation fails or the server returns an error, no conversion event is fired.
