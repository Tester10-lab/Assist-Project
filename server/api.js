import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import cors from 'cors';
import { db, hashPassword, verifyPassword, generateToken } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Public uploads directory (handled safely for serverless environments)
const UPLOADS_DIR = path.join(__dirname, '..', 'public', 'uploads');
try {
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
} catch (e) {
  console.warn('[Server] Uploads directory notice:', e?.message || e);
}

// Normalize incoming request path so both /api/auth/login and /auth/login route properly for API serverless
const KNOWN_API_PREFIXES = ['/auth', '/public', '/pages', '/services', '/blog', '/locations', '/media', '/leads', '/quotes', '/seo', '/settings', '/export', '/activity', '/users'];
app.use((req, res, next) => {
  if (KNOWN_API_PREFIXES.some(prefix => req.url === prefix || req.url.startsWith(prefix + '/') || req.url.startsWith(prefix + '?'))) {
    req.url = '/api' + req.url;
  }
  next();
});

// Multer Storage Configuration with memory storage (Safe across serverless & persistent environments)
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif'];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, WebP, SVG, and GIF are permitted.'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 8 * 1024 * 1024 } // 8MB limit
});

// ── Server-Side Auth Middleware ──
export function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid authorization token.' });
  }

  const token = authHeader.split(' ')[1];
  const session = db.data.sessions.find(s => s.token === token);

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized: Session expired or invalid.' });
  }

  // Check expiration (24 hours)
  if (new Date(session.expiresAt) < new Date()) {
    db.data.sessions = db.data.sessions.filter(s => s.token !== token);
    db.save();
    return res.status(401).json({ error: 'Unauthorized: Session has expired. Please log in again.' });
  }

  const user = db.data.users.find(u => u.id === session.userId);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized: User account no longer exists.' });
  }

  req.user = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    mustChangePassword: user.mustChangePassword
  };
  req.session = session;
  next();
}

export function requireAdmin(req, res, next) {
  requireAuth(req, res, () => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden: Administrator privileges required.' });
    }
    next();
  });
}

// ────────────────────────────────────────────────────────
// 1. AUTHENTICATION ENDPOINTS
// ────────────────────────────────────────────────────────

// POST /api/auth/login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const cleanEmail = email.trim().toLowerCase();
  const user = db.data.users.find(u => u.email.toLowerCase() === cleanEmail);

  if (!user) {
    // Prevent timing enumeration attacks
    crypto.scryptSync('dummy_password_timing_pad', 'dummy_salt_value', 64);
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  const isValid = verifyPassword(password, user.passwordHash, user.passwordSalt);
  if (!isValid) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  // Create session
  const token = generateToken();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 24 hours

  db.data.sessions.push({
    token,
    userId: user.id,
    role: user.role,
    expiresAt,
    createdAt: new Date().toISOString()
  });

  db.logActivity(user.name, 'User Logged In', 'Authentication', `IP: ${req.ip || 'local'}`);
  db.save();

  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      mustChangePassword: user.mustChangePassword
    }
  });
});

// POST /api/auth/logout
app.post('/api/auth/logout', requireAuth, (req, res) => {
  db.data.sessions = db.data.sessions.filter(s => s.token !== req.session.token);
  db.logActivity(req.user.name, 'User Logged Out', 'Authentication', '');
  db.save();
  res.json({ success: true, message: 'Logged out successfully.' });
});

// GET /api/auth/me
app.get('/api/auth/me', requireAuth, (req, res) => {
  res.json({ user: req.user });
});

// POST /api/auth/change-password
app.post('/api/auth/change-password', requireAuth, (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!newPassword || newPassword.length < 8) {
    return res.status(400).json({ error: 'New password must be at least 8 characters long.' });
  }

  const user = db.data.users.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }

  // If user mustChangePassword, they can bypass currentPassword check if not provided, otherwise require currentPassword
  if (!user.mustChangePassword) {
    if (!currentPassword || !verifyPassword(currentPassword, user.passwordHash, user.passwordSalt)) {
      return res.status(401).json({ error: 'Current password is incorrect.' });
    }
  }

  const { hash, salt } = hashPassword(newPassword);
  user.passwordHash = hash;
  user.passwordSalt = salt;
  user.mustChangePassword = false;
  user.updatedAt = new Date().toISOString();

  // Clear initial setup file once password has been securely changed
  const SETUP_FILE = path.join(__dirname, 'data', 'initial-admin-setup.txt');
  if (fs.existsSync(SETUP_FILE)) {
    try { fs.unlinkSync(SETUP_FILE); } catch {}
  }

  db.logActivity(user.name, 'Password Changed', 'Security', 'User updated account password.');
  db.save();

  res.json({ success: true, message: 'Password updated successfully.' });
});

// ────────────────────────────────────────────────────────
// 2. PUBLIC API (Synchronized with Public Website)
// ────────────────────────────────────────────────────────

// GET /api/public/content
app.get('/api/public/content', (req, res) => {
  // Only published content is visible publicly
  const publishedServices = db.data.services
    .filter(s => s.status === 'published')
    .sort((a, b) => (a.order || 99) - (b.order || 99));

  const publishedPages = db.data.pages
    .filter(p => p.status === 'published')
    .reduce((acc, p) => {
      acc[p.id] = p;
      return acc;
    }, {});

  const publishedLocations = db.data.locations
    .filter(l => l.status === 'published');

  const publishedBlog = db.data.blog
    .filter(b => b.status === 'published')
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());

  res.json({
    services: publishedServices,
    pages: publishedPages,
    locations: publishedLocations,
    blog: publishedBlog,
    seo: db.data.seo,
    settings: db.data.settings
  });
});

// POST /api/public/enquiry (Also alias /api/public/callback)
const handlePublicEnquiry = (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      address,
      service,
      urgency,
      preferredTime,
      message,
      type = 'callback'
    } = req.body || {};

    if (!phone || typeof phone !== 'string' || !phone.trim()) {
      return res.status(400).json({
        success: false,
        accepted: false,
        error: 'A valid Australian phone number is required so our team can call you.'
      });
    }

    const cleanPhone = phone.trim().replace(/[^0-9+ ]/g, '');
    const digitCount = cleanPhone.replace(/[^0-9]/g, '').length;
    if (digitCount < 8 || digitCount > 15) {
      return res.status(400).json({
        success: false,
        accepted: false,
        error: 'Please enter a valid Australian mobile or landline number (e.g. 0478 250 790).'
      });
    }

    const cleanName = (name && typeof name === 'string' ? name : 'Website Visitor').trim().slice(0, 100);
    const cleanService = (service && typeof service === 'string' ? service : 'Roof Inspection / Callback').trim().slice(0, 120);
    const timing = (preferredTime || urgency || 'ASAP / Within 2 hours').trim().slice(0, 80);
    const cleanAddress = (address && typeof address === 'string' ? address : '').trim().slice(0, 200);
    const cleanEmail = (email && typeof email === 'string' ? email : '').trim().slice(0, 100);
    const cleanMessage = (message && typeof message === 'string' ? message : '').trim().slice(0, 1500);

    const enquiryId = `ENQ-${Date.now().toString().slice(-6)}-${crypto.randomBytes(2).toString('hex').toUpperCase()}`;

    const newEnquiry = {
      id: enquiryId,
      type: type === 'quote' ? 'quote' : 'callback',
      name: cleanName,
      phone: cleanPhone,
      email: cleanEmail,
      address: cleanAddress,
      service: cleanService,
      preferredTime: timing,
      urgency: timing,
      message: cleanMessage,
      status: 'new', // 'new' | 'contacted' | 'resolved'
      createdAt: new Date().toISOString(),
      userAgent: req.headers['user-agent'] || '',
      ip: req.ip || req.socket?.remoteAddress || ''
    };

    // Deliver & store enquiry
    db.addEnquiry(newEnquiry);

    // Record activity trail
    db.logActivity(
      cleanName,
      'Callback Request Received',
      'Enquiry',
      `ID: ${enquiryId} | Service: ${cleanService} | Phone: ${cleanPhone} | Preferred Time: ${timing}`
    );

    // Return 201 Created and ACCEPTED confirmation
    return res.status(201).json({
      success: true,
      accepted: true,
      id: enquiryId,
      message: `Callback request accepted! Reference #${enquiryId}. Peter from Assist Roofing will call you ${timing === 'ASAP / Next 15 mins' ? 'within 15 minutes' : 'shortly'}.`,
      enquiry: {
        id: enquiryId,
        name: cleanName,
        phone: cleanPhone,
        service: cleanService,
        preferredTime: timing,
        createdAt: newEnquiry.createdAt
      }
    });
  } catch (err) {
    console.error('[Enquiry API Error]:', err);
    return res.status(500).json({
      success: false,
      accepted: false,
      error: 'Unable to deliver your enquiry. Please call Peter directly on 0478 250 790.'
    });
  }
};

app.post('/api/public/enquiry', handlePublicEnquiry);
app.post('/api/public/callback', handlePublicEnquiry);

// ────────────────────────────────────────────────────────
// 3. ADMIN CMS ENDPOINTS (Protected with RBAC)
// ────────────────────────────────────────────────────────

// GET /api/admin/dashboard
app.get('/api/admin/dashboard', requireAuth, (req, res) => {
  const totalPages = db.data.pages.length;
  const publishedPages = db.data.pages.filter(p => p.status === 'published').length;
  const draftPages = totalPages - publishedPages;

  const totalServices = db.data.services.length;
  const publishedServices = db.data.services.filter(s => s.status === 'published').length;

  const totalLocations = db.data.locations.length;
  const publishedLocations = db.data.locations.filter(l => l.status === 'published').length;

  const totalBlog = db.data.blog.length;
  const publishedBlog = db.data.blog.filter(b => b.status === 'published').length;

  const totalMedia = db.data.media.length;
  const totalUsers = db.data.users.length;

  const allEnquiries = Array.isArray(db.data.enquiries) ? db.data.enquiries : [];
  const totalEnquiries = allEnquiries.length;
  const newEnquiries = allEnquiries.filter(e => e.status === 'new').length;

  const recentActivity = db.data.activity.slice(0, 10);

  res.json({
    metrics: {
      pages: { total: totalPages, published: publishedPages, draft: draftPages },
      services: { total: totalServices, published: publishedServices },
      locations: { total: totalLocations, published: publishedLocations },
      blog: { total: totalBlog, published: publishedBlog },
      media: { total: totalMedia },
      users: { total: totalUsers },
      enquiries: { total: totalEnquiries, new: newEnquiries }
    },
    recentActivity
  });
});

// ── Enquiries Management ──
app.get('/api/admin/enquiries', requireAuth, (req, res) => {
  const statusFilter = req.query.status;
  let items = Array.isArray(db.data.enquiries) ? db.data.enquiries : [];
  if (statusFilter && statusFilter !== 'all') {
    items = items.filter(e => e.status === statusFilter);
  }
  res.json(items);
});

app.put('/api/admin/enquiries/:id', requireAuth, (req, res) => {
  const { status, notes } = req.body || {};
  const updated = db.updateEnquiry(req.params.id, { status, notes });
  if (!updated) {
    return res.status(404).json({ error: 'Enquiry not found' });
  }
  db.logActivity(
    req.user?.name || 'Admin',
    'Updated Enquiry',
    'Enquiry',
    `ID: ${req.params.id} marked as ${status || 'updated'}`
  );
  res.json(updated);
});

app.delete('/api/admin/enquiries/:id', requireAuth, (req, res) => {
  const success = db.deleteEnquiry(req.params.id);
  if (!success) {
    return res.status(404).json({ error: 'Enquiry not found' });
  }
  db.logActivity(
    req.user?.name || 'Admin',
    'Deleted Enquiry',
    'Enquiry',
    `ID: ${req.params.id}`
  );
  res.json({ success: true });
});

// ── Pages Management ──
app.get('/api/admin/pages', requireAuth, (req, res) => {
  res.json(db.data.pages);
});

app.post('/api/admin/pages', requireAuth, (req, res) => {
  const newPage = {
    id: req.body.slug ? req.body.slug.toLowerCase().replace(/[^a-z0-9_-]/g, '-') : crypto.randomUUID(),
    title: req.body.title || 'Untitled Page',
    slug: req.body.slug || '',
    status: req.body.status || 'draft',
    heroHeading: req.body.heroHeading || '',
    heroDescription: req.body.heroDescription || '',
    heroImage: req.body.heroImage || '',
    content: req.body.content || '',
    seoTitle: req.body.seoTitle || '',
    metaDescription: req.body.metaDescription || '',
    canonical: req.body.canonical || '',
    ogImage: req.body.ogImage || '',
    noIndex: Boolean(req.body.noIndex),
    updatedAt: new Date().toISOString()
  };

  db.data.pages.push(newPage);
  db.logActivity(req.user.name, 'Created Page', 'Pages', `Page: "${newPage.title}" (${newPage.id})`);
  db.save();
  res.status(201).json(newPage);
});

app.put('/api/admin/pages/:id', requireAuth, (req, res) => {
  const index = db.data.pages.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Page not found.' });
  }

  const updated = {
    ...db.data.pages[index],
    ...req.body,
    updatedAt: new Date().toISOString()
  };

  db.data.pages[index] = updated;
  db.logActivity(req.user.name, 'Updated Page', 'Pages', `Page: "${updated.title}" (${updated.id})`);
  db.save();
  res.json(updated);
});

app.delete('/api/admin/pages/:id', requireAuth, (req, res) => {
  const page = db.data.pages.find(p => p.id === req.params.id);
  if (!page) {
    return res.status(404).json({ error: 'Page not found.' });
  }

  // Prevent deleting critical public pages
  const reservedPages = ['home', 'about', 'services', 'gallery', 'testimonials', 'contact'];
  if (reservedPages.includes(page.id)) {
    return res.status(400).json({ error: `Cannot delete core public page "${page.title}". You may set status to draft instead.` });
  }

  db.data.pages = db.data.pages.filter(p => p.id !== req.params.id);
  db.logActivity(req.user.name, 'Deleted Page', 'Pages', `Page: "${page.title}" (${page.id})`);
  db.save();
  res.json({ success: true, message: 'Page deleted.' });
});

// ── Services Management ──
app.get('/api/admin/services', requireAuth, (req, res) => {
  const sorted = [...db.data.services].sort((a, b) => (a.order || 99) - (b.order || 99));
  res.json(sorted);
});

app.post('/api/admin/services', requireAuth, (req, res) => {
  const newService = {
    id: req.body.slug ? req.body.slug.toLowerCase().replace(/[^a-z0-9_-]/g, '-') : crypto.randomUUID(),
    name: req.body.name || 'New Roofing Service',
    slug: req.body.slug || '',
    category: req.body.category || 'repairs',
    categoryLabel: req.body.categoryLabel || 'Roofing Repairs',
    shortDescription: req.body.shortDescription || '',
    fullDescription: req.body.fullDescription || '',
    image: req.body.image || '/roofora-assets/images/services-img1.jpg',
    icon: req.body.icon || 'fa-solid fa-screwdriver-wrench',
    badge: req.body.badge || 'Licensed',
    features: Array.isArray(req.body.features) ? req.body.features : [],
    benefits: Array.isArray(req.body.benefits) ? req.body.benefits : [],
    faqs: Array.isArray(req.body.faqs) ? req.body.faqs : [],
    seoTitle: req.body.seoTitle || '',
    metaDescription: req.body.metaDescription || '',
    status: req.body.status || 'published',
    order: req.body.order !== undefined ? Number(req.body.order) : db.data.services.length + 1
  };

  db.data.services.push(newService);
  db.logActivity(req.user.name, 'Created Service', 'Services', `Service: "${newService.name}"`);
  db.save();
  res.status(201).json(newService);
});

app.put('/api/admin/services/:id', requireAuth, (req, res) => {
  const index = db.data.services.findIndex(s => s.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Service not found.' });
  }

  const updated = {
    ...db.data.services[index],
    ...req.body
  };

  db.data.services[index] = updated;
  db.logActivity(req.user.name, 'Updated Service', 'Services', `Service: "${updated.name}"`);
  db.save();
  res.json(updated);
});

app.delete('/api/admin/services/:id', requireAuth, (req, res) => {
  const service = db.data.services.find(s => s.id === req.params.id);
  if (!service) {
    return res.status(404).json({ error: 'Service not found.' });
  }

  db.data.services = db.data.services.filter(s => s.id !== req.params.id);
  db.logActivity(req.user.name, 'Deleted Service', 'Services', `Service: "${service.name}"`);
  db.save();
  res.json({ success: true, message: 'Service deleted.' });
});

// Reorder services
app.put('/api/admin/services-reorder', requireAuth, (req, res) => {
  const { orderedIds } = req.body;
  if (!Array.isArray(orderedIds)) {
    return res.status(400).json({ error: 'orderedIds must be an array of service IDs.' });
  }

  orderedIds.forEach((id, idx) => {
    const service = db.data.services.find(s => s.id === id);
    if (service) {
      service.order = idx + 1;
    }
  });

  db.logActivity(req.user.name, 'Reordered Services', 'Services', `Updated display ordering for ${orderedIds.length} services.`);
  db.save();
  res.json({ success: true, message: 'Services reordered successfully.' });
});

// ── Locations Management ──
app.get('/api/admin/locations', requireAuth, (req, res) => {
  res.json(db.data.locations);
});

app.post('/api/admin/locations', requireAuth, (req, res) => {
  const newLocation = {
    id: req.body.slug ? req.body.slug.toLowerCase().replace(/[^a-z0-9_-]/g, '-') : crypto.randomUUID(),
    name: req.body.name || 'New Melbourne Suburb',
    slug: req.body.slug || '',
    pageTitle: req.body.pageTitle || '',
    intro: req.body.intro || '',
    localContent: req.body.localContent || '',
    services: Array.isArray(req.body.services) ? req.body.services : [],
    images: Array.isArray(req.body.images) ? req.body.images : [],
    faqs: Array.isArray(req.body.faqs) ? req.body.faqs : [],
    seoTitle: req.body.seoTitle || '',
    metaDescription: req.body.metaDescription || '',
    postalCode: req.body.postalCode || '3000',
    coordinates: req.body.coordinates || { lat: -37.8136, lng: 144.9631 },
    status: req.body.status || 'published'
  };

  db.data.locations.push(newLocation);
  db.logActivity(req.user.name, 'Created Location', 'Locations', `Suburb: "${newLocation.name}"`);
  db.save();
  res.status(201).json(newLocation);
});

app.put('/api/admin/locations/:id', requireAuth, (req, res) => {
  const index = db.data.locations.findIndex(l => l.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Location not found.' });
  }

  const updated = {
    ...db.data.locations[index],
    ...req.body
  };

  db.data.locations[index] = updated;
  db.logActivity(req.user.name, 'Updated Location', 'Locations', `Suburb: "${updated.name}"`);
  db.save();
  res.json(updated);
});

app.delete('/api/admin/locations/:id', requireAuth, (req, res) => {
  const loc = db.data.locations.find(l => l.id === req.params.id);
  if (!loc) {
    return res.status(404).json({ error: 'Location not found.' });
  }

  db.data.locations = db.data.locations.filter(l => l.id !== req.params.id);
  db.logActivity(req.user.name, 'Deleted Location', 'Locations', `Suburb: "${loc.name}"`);
  db.save();
  res.json({ success: true, message: 'Location deleted.' });
});

// ── Blog Management ──
app.get('/api/admin/blog', requireAuth, (req, res) => {
  res.json(db.data.blog);
});

app.post('/api/admin/blog', requireAuth, (req, res) => {
  const newPost = {
    id: crypto.randomUUID(),
    title: req.body.title || 'Untitled Post',
    slug: req.body.slug ? req.body.slug.toLowerCase().replace(/[^a-z0-9_-]/g, '-') : crypto.randomUUID(),
    excerpt: req.body.excerpt || '',
    content: req.body.content || '',
    featuredImage: req.body.featuredImage || '/roofora-assets/images/portfolio-img1.jpg',
    author: req.body.author || req.user.name,
    publishDate: req.body.publishDate || new Date().toISOString().split('T')[0],
    category: req.body.category || 'Roofing Advice',
    tags: Array.isArray(req.body.tags) ? req.body.tags : [],
    status: req.body.status || 'draft',
    seoTitle: req.body.seoTitle || '',
    metaDescription: req.body.metaDescription || '',
    canonical: req.body.canonical || '',
    ogImage: req.body.ogImage || '',
    noIndex: Boolean(req.body.noIndex),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  db.data.blog.push(newPost);
  db.logActivity(req.user.name, 'Created Blog Post', 'Blog', `Post: "${newPost.title}"`);
  db.save();
  res.status(201).json(newPost);
});

app.put('/api/admin/blog/:id', requireAuth, (req, res) => {
  const index = db.data.blog.findIndex(b => b.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Blog post not found.' });
  }

  const updated = {
    ...db.data.blog[index],
    ...req.body,
    updatedAt: new Date().toISOString()
  };

  db.data.blog[index] = updated;
  db.logActivity(req.user.name, 'Updated Blog Post', 'Blog', `Post: "${updated.title}"`);
  db.save();
  res.json(updated);
});

app.delete('/api/admin/blog/:id', requireAuth, (req, res) => {
  const post = db.data.blog.find(b => b.id === req.params.id);
  if (!post) {
    return res.status(404).json({ error: 'Blog post not found.' });
  }

  db.data.blog = db.data.blog.filter(b => b.id !== req.params.id);
  db.logActivity(req.user.name, 'Deleted Blog Post', 'Blog', `Post: "${post.title}"`);
  db.save();
  res.json({ success: true, message: 'Blog post deleted.' });
});

// ── Media Library Management ──
app.get('/api/admin/media', requireAuth, (req, res) => {
  res.json(db.data.media);
});

function applyMediaPlacement(target, url) {
  if (!target || !url) return '';

  if (target === 'home_hero') {
    const p = db.data.pages.find(page => page.id === 'home');
    if (p) p.heroImage = url;
    return 'Homepage Hero Banner';
  }
  if (target === 'about_hero') {
    const p = db.data.pages.find(page => page.id === 'about');
    if (p) p.heroImage = url;
    return 'About Page Hero Banner';
  }
  if (target === 'about_og') {
    const p = db.data.pages.find(page => page.id === 'about');
    if (p) p.ogImage = url;
    return 'About Us Featured Image';
  }
  if (target === 'services_hero') {
    const p = db.data.pages.find(page => page.id === 'services');
    if (p) p.heroImage = url;
    return 'Services Overview Banner';
  }
  if (target.startsWith('service_')) {
    const slug = target.replace('service_', '');
    const s = db.data.services.find(svc => svc.id === slug || svc.slug === slug);
    if (s) {
      s.heroImage = url;
      return `${s.title} Service Hero`;
    }
  }
  if (target === 'gallery_hero') {
    const p = db.data.pages.find(page => page.id === 'gallery');
    if (p) p.heroImage = url;
    return 'Projects & Gallery Banner';
  }
  if (target === 'branding_logo') {
    if (!db.data.settings.branding) db.data.settings.branding = {};
    db.data.settings.branding.logoUrl = url;
    return 'Website Main Header Logo';
  }
  if (target === 'seo_og') {
    if (!db.data.seo) db.data.seo = {};
    db.data.seo.defaultOgImage = url;
    return 'Global Social Share (OpenGraph) Image';
  }
  return '';
}

app.post('/api/admin/media/upload', requireAuth, upload.single('file'), (req, res) => {
  try {
    let mediaUrl = req.body?.url;
    let filename = req.body?.filename || 'custom-upload.jpg';
    let size = 0;
    let mimeType = 'image/jpeg';

    if (req.file) {
      const safeExt = path.extname(req.file.originalname).toLowerCase() || '.jpg';
      const cleanBase = path.basename(req.file.originalname, safeExt).replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 30);
      filename = `${cleanBase}-${Date.now()}${safeExt}`;
      size = req.file.size;
      mimeType = req.file.mimetype;

      // Attempt to save to local uploads dir if writable (VPS / local dev)
      let savedLocally = false;
      try {
        if (!fs.existsSync(UPLOADS_DIR)) {
          fs.mkdirSync(UPLOADS_DIR, { recursive: true });
        }
        const filePath = path.join(UPLOADS_DIR, filename);
        fs.writeFileSync(filePath, req.file.buffer);
        mediaUrl = `/uploads/${filename}`;
        savedLocally = true;
      } catch {
        // Read-only filesystem (Vercel Serverless) -> Deliver resilient Base64 Data URI
        savedLocally = false;
      }

      if (!savedLocally) {
        mediaUrl = `data:${mimeType};base64,${req.file.buffer.toString('base64')}`;
      }
    } else if (!mediaUrl) {
      return res.status(400).json({ error: 'Please select an image file or enter an image URL.' });
    }

    const mediaItem = {
      id: crypto.randomUUID(),
      filename: filename,
      url: mediaUrl,
      altText: req.body.altText || filename,
      caption: req.body.caption || '',
      mimeType: mimeType,
      size: size,
      dimensions: 'Asset',
      createdAt: new Date().toISOString()
    };

    db.data.media.unshift(mediaItem);

    // If placement target was chosen
    const target = req.body.targetLocation;
    let targetLabel = '';
    if (target) {
      targetLabel = applyMediaPlacement(target, mediaUrl);
    }

    db.logActivity(
      req.user.name,
      'Uploaded Media Asset',
      'Media',
      `File: "${filename}" ${targetLabel ? `(Placed in: ${targetLabel})` : ''}`
    );
    db.save();

    res.status(201).json({
      ...mediaItem,
      placementMessage: targetLabel ? `Image assigned to ${targetLabel}` : undefined
    });
  } catch (err) {
    console.error('[Media Upload Error]:', err);
    res.status(500).json({ error: err?.message || 'Failed to process media upload.' });
  }
});

app.post('/api/admin/media/assign', requireAuth, (req, res) => {
  const { mediaUrl, target } = req.body || {};
  if (!mediaUrl || !target) {
    return res.status(400).json({ error: 'Media URL and target location are required.' });
  }

  const label = applyMediaPlacement(target, mediaUrl);
  if (!label) {
    return res.status(400).json({ error: 'Invalid placement target specified.' });
  }

  db.logActivity(req.user.name, 'Assigned Media Asset', 'Media', `Assigned to ${label}`);
  db.save();
  res.json({ success: true, message: `Successfully assigned image to ${label}!` });
});

app.put('/api/admin/media/:id', requireAuth, (req, res) => {
  const item = db.data.media.find(m => m.id === req.params.id);
  if (!item) {
    return res.status(404).json({ error: 'Media not found.' });
  }

  if (req.body.altText !== undefined) item.altText = req.body.altText;
  if (req.body.caption !== undefined) item.caption = req.body.caption;

  db.logActivity(req.user.name, 'Updated Media Metadata', 'Media', `File: "${item.filename}"`);
  db.save();
  res.json(item);
});

app.delete('/api/admin/media/:id', requireAuth, (req, res) => {
  const item = db.data.media.find(m => m.id === req.params.id);
  if (!item) {
    return res.status(404).json({ error: 'Media item not found.' });
  }

  // If file exists in public/uploads, delete it
  if (item.url && item.url.startsWith('/uploads/')) {
    const filePath = path.join(UPLOADS_DIR, item.filename);
    if (fs.existsSync(filePath)) {
      try { fs.unlinkSync(filePath); } catch {}
    }
  }

  db.data.media = db.data.media.filter(m => m.id !== req.params.id);
  db.logActivity(req.user.name, 'Deleted Media', 'Media', `File: "${item.filename}"`);
  db.save();
  res.json({ success: true, message: 'Media removed.' });
});

// ── SEO Management ──
app.get('/api/admin/seo', requireAuth, (req, res) => {
  res.json(db.data.seo);
});

app.put('/api/admin/seo', requireAdmin, (req, res) => {
  db.data.seo = {
    ...db.data.seo,
    ...req.body
  };
  db.logActivity(req.user.name, 'Updated SEO Settings', 'SEO', 'Modified site meta tags, schema, or indexing policies.');
  db.save();
  res.json(db.data.seo);
});

// ── Site Settings Management ──
app.get('/api/admin/settings', requireAuth, (req, res) => {
  res.json(db.data.settings);
});

app.put('/api/admin/settings', requireAdmin, (req, res) => {
  db.data.settings = {
    ...db.data.settings,
    ...req.body
  };
  db.logActivity(req.user.name, 'Updated Site Settings', 'Settings', 'Modified business info, branding, or tracking configuration.');
  db.save();
  res.json(db.data.settings);
});

// ── Users & RBAC Management (Admin Role Only) ──
app.get('/api/admin/users', requireAdmin, (req, res) => {
  const sanitizedUsers = db.data.users.map(u => ({
    id: u.id,
    email: u.email,
    name: u.name,
    role: u.role,
    mustChangePassword: u.mustChangePassword,
    createdAt: u.createdAt,
    updatedAt: u.updatedAt
  }));
  res.json(sanitizedUsers);
});

app.post('/api/admin/users', requireAdmin, (req, res) => {
  const { email, name, role, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and temporary password are required.' });
  }

  const cleanEmail = email.trim().toLowerCase();
  if (db.data.users.some(u => u.email.toLowerCase() === cleanEmail)) {
    return res.status(400).json({ error: 'User with this email already exists.' });
  }

  const { hash, salt } = hashPassword(password);
  const newUser = {
    id: crypto.randomUUID(),
    email: cleanEmail,
    name: name || 'Staff Member',
    role: role === 'admin' ? 'admin' : 'editor',
    passwordHash: hash,
    passwordSalt: salt,
    mustChangePassword: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  db.data.users.push(newUser);
  db.logActivity(req.user.name, 'Created User Account', 'Users', `User: ${newUser.email} (${newUser.role})`);
  db.save();

  res.status(201).json({
    id: newUser.id,
    email: newUser.email,
    name: newUser.name,
    role: newUser.role,
    mustChangePassword: newUser.mustChangePassword
  });
});

app.put('/api/admin/users/:id', requireAdmin, (req, res) => {
  const user = db.data.users.find(u => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }

  if (req.body.name !== undefined) user.name = req.body.name;
  if (req.body.role !== undefined) {
    // Prevent removing the last admin
    if (user.role === 'admin' && req.body.role !== 'admin') {
      const adminCount = db.data.users.filter(u => u.role === 'admin').length;
      if (adminCount <= 1) {
        return res.status(400).json({ error: 'Cannot demote the sole remaining Administrator.' });
      }
    }
    user.role = req.body.role === 'admin' ? 'admin' : 'editor';
  }

  if (req.body.password) {
    const { hash, salt } = hashPassword(req.body.password);
    user.passwordHash = hash;
    user.passwordSalt = salt;
    user.mustChangePassword = true;
  }

  user.updatedAt = new Date().toISOString();
  db.logActivity(req.user.name, 'Updated User Account', 'Users', `User: ${user.email} (${user.role})`);
  db.save();

  res.json({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    mustChangePassword: user.mustChangePassword
  });
});

app.delete('/api/admin/users/:id', requireAdmin, (req, res) => {
  if (req.user.id === req.params.id) {
    return res.status(400).json({ error: 'You cannot delete your own active administrator account.' });
  }

  const user = db.data.users.find(u => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }

  if (user.role === 'admin') {
    const adminCount = db.data.users.filter(u => u.role === 'admin').length;
    if (adminCount <= 1) {
      return res.status(400).json({ error: 'Cannot delete the sole remaining Administrator.' });
    }
  }

  db.data.users = db.data.users.filter(u => u.id !== req.params.id);
  db.data.sessions = db.data.sessions.filter(s => s.userId !== req.params.id);
  db.logActivity(req.user.name, 'Deleted User Account', 'Users', `User: ${user.email}`);
  db.save();

  res.json({ success: true, message: 'User deleted.' });
});

// ── Activity Log (Audit Trail) ──
app.get('/api/admin/activity', requireAuth, (req, res) => {
  const { user, action } = req.query;
  let logs = [...db.data.activity];

  if (user) {
    logs = logs.filter(l => l.user.toLowerCase().includes(String(user).toLowerCase()));
  }
  if (action) {
    logs = logs.filter(l => l.action.toLowerCase().includes(String(action).toLowerCase()));
  }

  res.json(logs);
});

export default app;
