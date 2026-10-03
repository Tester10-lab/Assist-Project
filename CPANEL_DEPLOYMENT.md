# cPanel Deployment Guide — Assist Roofing

This document provides step-by-step instructions for deploying the **Assist Roofing** application (`https://assistroofing.com.au/`) on a standard cPanel hosting environment with Node.js and Phusion Passenger support (CloudLinux NodeJS Selector / cPanel Application Manager).

---

## 1. Prerequisites & Specifications

| Requirement | Value / Specification |
| :--- | :--- |
| **Node.js Version** | **Node.js 20.x LTS** (or 22.x / 18.x) |
| **Application Type** | Node.js Express 5.x + React 19 SPA |
| **Application Root** | `assistroofing` (or `public_html` if deployed directly) |
| **Startup File** | `app.js` (or `server/index.js`) |
| **Entry Script** | `npm start` (or `node app.js`) |
| **Database** | Lowdb JSON (`server/data/db.json`) |
| **Static Build Output** | `dist/` |

---

## 2. Step-by-Step Deployment Instructions

### Step 1: Upload Project Files to cPanel
1. In your local terminal, generate a clean deployment package (excluding `node_modules`, `.git`, and `dist`):
   ```bash
   # Or zip the project files via File Explorer / zip tool
   ```
2. Log in to **cPanel** and open **File Manager**.
3. Create an application directory in your home directory (e.g., `/home/username/assistroofing`).
4. Upload your zip file and extract it into `/home/username/assistroofing`.
   > **Note:** Do NOT upload local `node_modules` or `.git`. Dependencies will be installed natively on the server.

---

### Step 2: Create Node.js Application in cPanel
1. In cPanel, navigate to the **Software** section and click **Setup Node.js App** (or **Application Manager**).
2. Click **Create Application** (or **+ Create**).
3. Configure the application settings:
   - **Node.js version:** Select **20.x** (recommended) or **22.x**.
   - **Application mode:** Select **Production**.
   - **Application root:** Enter `assistroofing` (the directory where project files were uploaded).
   - **Application URL:** Select `assistroofing.com.au` (or your domain/subdomain).
   - **Application startup file:** Enter `app.js` (or `server/index.js`).
   - **Passenger log file:** (Optional/auto-generated, e.g., `passenger.log`).
4. Click **Create**.

---

### Step 3: Configure Environment Variables
Under the **Environment variables** section in the Node.js App interface, add the following key-value pairs:

| Variable Name | Value | Purpose |
| :--- | :--- | :--- |
| `NODE_ENV` | `production` | Enables production optimizations and disables debug overhead |
| `INITIAL_ADMIN_EMAIL` | `admin@assistroofing.com.au` | Seed administrator email (if database is empty) |
| `INITIAL_ADMIN_PASSWORD` | *(Strong custom password)* | Seed administrator password |

*(Note: `PORT` is assigned automatically by cPanel/Passenger. Do not hardcode a port.)*

---

### Step 4: Run `npm install` and `npm run build`
cPanel displays a command line string at the top of the app page to enter the virtual environment, for example:
```bash
source /home/username/nodevenv/assistroofing/20/bin/activate && cd /home/username/assistroofing
```

1. Open **cPanel Terminal** (or connect via SSH).
2. Paste the virtual environment command.
3. Install production dependencies:
   ```bash
   npm install --production=false
   ```
4. Build the production React frontend and generate static deep routes:
   ```bash
   npm run build
   ```
   *Expected output: Generates `dist/` bundle, builds sitemap, copies `llms.txt`, and generates deep route HTML stubs with customized metadata.*

---

### Step 5: Configure Directory Permissions
Ensure that the Node.js user has write permissions to the data and upload directories. In cPanel File Manager or Terminal, ensure:

```bash
# Directories: 755
chmod 755 server/data
chmod 755 public/uploads
chmod 755 public/data

# Files: 644
chmod 644 server/data/db.json
chmod 644 public/data/cms-content.json
```
*(Do not use 777 permissions. 755/644 ensures strict security while allowing the cPanel user to write).*

---

### Step 6: Start / Restart the Application
1. In the **Setup Node.js App** interface, click **Restart** (or **Start**).
2. The Passenger service will automatically bind to the dynamic socket/port and serve the application through Apache/Nginx.

---

### Step 7: Configure SSL / HTTPS
1. In cPanel, navigate to **Security** > **SSL/TLS Status**.
2. Run **AutoSSL** for `assistroofing.com.au` to ensure a valid Let's Encrypt or Sectigo certificate is active.
3. In **Domains**, toggle **Force HTTPS Redirect** to ON.

---

## 3. Post-Deployment Verification Checklist

Test every critical component directly in the browser and via curl:

### 1. Homepage & Core Assets
- [ ] Visit `https://assistroofing.com.au/`
- [ ] Verify HTTP status: `200 OK`
- [ ] Inspect console: CSS, JavaScript bundle, and fonts load with 0 errors.

### 2. Deep Routes (Pre-Rendered & Clean URLs)
Verify that entering these URLs directly in the browser bar returns `200 OK` without redirect hops or 404s:
- [ ] `https://assistroofing.com.au/about`
- [ ] `https://assistroofing.com.au/services`
- [ ] `https://assistroofing.com.au/services/roof-restoration`
- [ ] `https://assistroofing.com.au/services/roof-repairs`
- [ ] `https://assistroofing.com.au/services/roof-replacement`
- [ ] `https://assistroofing.com.au/services/colorbond-roofing`
- [ ] `https://assistroofing.com.au/services/guttering`
- [ ] `https://assistroofing.com.au/services/leak-detection`
- [ ] `https://assistroofing.com.au/projects`
- [ ] `https://assistroofing.com.au/testimonials`
- [ ] `https://assistroofing.com.au/contact`

### 3. SEO & Knowledge Discovery Assets
- [ ] `https://assistroofing.com.au/sitemap.xml` &mdash; Valid XML sitemap declaring canonical URLs.
- [ ] `https://assistroofing.com.au/robots.txt` &mdash; Disallows `/admin/`, references sitemap and `llms.txt`.
- [ ] `https://assistroofing.com.au/llms.txt` &mdash; Machine-readable AI knowledge specification.
- [ ] `https://assistroofing.com.au/llms-full.txt` &mdash; Authoritative system specifications.
- [ ] Verify Canonical URL: `<link rel="canonical" href="https://assistroofing.com.au/..." />` on all routes.

### 4. CMS Administration Panel
- [ ] Visit `https://assistroofing.com.au/admin`
- [ ] Log in with initial credentials.
- [ ] Perform a test edit on a service or site setting and click Save.
- [ ] Confirm `server/data/db.json` and `public/data/cms-content.json` update correctly.

---

## 4. Troubleshooting & Hosting-Specific Settings

| Issue | Cause | Resolution |
| :--- | :--- | :--- |
| **503 Service Unavailable** | Node.js process failed to start | Check cPanel error log (`passenger.log` or `stderr.log`). Ensure `npm run build` was run so `dist/` exists. |
| **404 on deep routes** | Apache overriding requests | Ensure Apache passes all requests to Phusion Passenger. `server/index.js` handles routing fallback. |
| **Cannot save in CMS / EACCES** | Permission denied on `db.json` | Run `chmod 755 server/data` and `chmod 644 server/data/db.json` via cPanel File Manager. |
| **Styles or images not loading** | Missing base path or asset folder | Verify `dist/` contains `dist/assets/` and `dist/roofora-assets/`. Run `npm run build` again if needed. |
| **cPanel uses Apache .htaccess** | Passenger requires .htaccess directives | If cPanel uses .htaccess for Passenger, the Node.js selector creates it automatically. Do not delete the cPanel-managed block in `.htaccess`. |
