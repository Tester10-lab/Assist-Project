import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  writeBatch
} from 'firebase/firestore';
import {
  signInWithEmailAndPassword,
  signOut,
  updatePassword
} from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, auth, storage } from '../../firebase';

import type {
  User,
  PageItem,
  ServiceItem,
  LocationItem,
  BlogPost,
  MediaItem,
  SeoSettings,
  SiteSettings,
  ActivityItem,
  DashboardMetrics,
  EnquiryItem
} from '../types/cms';

// We don't need token management anymore because Firebase Auth handles sessions,
// but we keep the stub methods for compatibility if they are still called.
export async function getAuthToken(): Promise<string | null> {
  return auth.currentUser ? await auth.currentUser.getIdToken() : null;
}

export function setAuthToken(token: string | null) {
  // Handled by Firebase Auth state listener
}

// Helper to log activity
async function logActivity(action: string, resource: string, details: string) {
  if (!auth.currentUser) return;
  const user = auth.currentUser.displayName || auth.currentUser.email || 'Admin';
  await addDoc(collection(db, 'activity'), {
    user,
    action,
    resource,
    details,
    timestamp: new Date().toISOString()
  });
}

export const adminApi = {
  // ── Authentication ──
  login: async (email: string, password: string) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const token = await cred.user.getIdToken();
    return { token, user: { id: cred.user.uid, email: cred.user.email, name: cred.user.displayName, role: 'admin', mustChangePassword: false } as User };
  },

  logout: async () => {
    await signOut(auth);
    return { success: true };
  },

  getMe: async () => {
    // Rely on Firebase Auth context rather than this endpoint, but provide a stub.
    const u = auth.currentUser;
    if (!u) throw new Error('Not authenticated');
    return { user: { id: u.uid, email: u.email, name: u.displayName, role: 'admin', mustChangePassword: false } as User };
  },

  changePassword: async (currentPassword: string, newPassword: string) => {
    if (auth.currentUser) {
      await updatePassword(auth.currentUser, newPassword);
      await logActivity('Password Changed', 'Security', 'User updated account password.');
      return { success: true, message: 'Password updated successfully.' };
    }
    throw new Error('Not authenticated');
  },

  // ── Dashboard ──
  getDashboard: async () => {
    const pages = await getDocs(collection(db, 'pages'));
    const services = await getDocs(collection(db, 'services'));
    const locations = await getDocs(collection(db, 'locations'));
    const blog = await getDocs(collection(db, 'blog'));
    const media = await getDocs(collection(db, 'media'));
    // Firebase Auth has no list users in client SDK, assuming 1 for now unless tracked in firestore
    const enquiries = await getDocs(collection(db, 'enquiries'));
    
    const activityQuery = query(collection(db, 'activity'), orderBy('timestamp', 'desc'));
    const activityDocs = await getDocs(activityQuery);

    let publishedPages = 0;
    pages.forEach(d => { if (d.data().status === 'published') publishedPages++; });
    
    let publishedServices = 0;
    services.forEach(d => { if (d.data().status === 'published') publishedServices++; });

    let publishedLocations = 0;
    locations.forEach(d => { if (d.data().status === 'published') publishedLocations++; });

    let publishedBlog = 0;
    blog.forEach(d => { if (d.data().status === 'published') publishedBlog++; });

    let newEnquiries = 0;
    enquiries.forEach(d => { if (d.data().status === 'new') newEnquiries++; });

    const recentActivity = activityDocs.docs.map(d => ({ id: d.id, ...d.data() } as ActivityItem)).slice(0, 10);

    return {
      metrics: {
        pages: { total: pages.size, published: publishedPages, draft: pages.size - publishedPages },
        services: { total: services.size, published: publishedServices },
        locations: { total: locations.size, published: publishedLocations },
        blog: { total: blog.size, published: publishedBlog },
        media: { total: media.size },
        users: { total: 1 },
        enquiries: { total: enquiries.size, new: newEnquiries }
      },
      recentActivity
    };
  },

  // ── Pages ──
  getPages: async () => {
    const snap = await getDocs(collection(db, 'pages'));
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as PageItem));
  },

  createPage: async (data: Partial<PageItem>) => {
    const id = data.slug ? data.slug.toLowerCase().replace(/[^a-z0-9_-]/g, '-') : crypto.randomUUID();
    const newData = { ...data, id, updatedAt: new Date().toISOString() };
    await setDoc(doc(db, 'pages', id), newData);
    await logActivity('Created Page', 'Pages', `Page: "${newData.title}" (${id})`);
    return newData as PageItem;
  },

  updatePage: async (id: string, data: Partial<PageItem>) => {
    const updateData = { ...data, updatedAt: new Date().toISOString() };
    await updateDoc(doc(db, 'pages', id), updateData);
    await logActivity('Updated Page', 'Pages', `Page ID: ${id}`);
    const snap = await getDoc(doc(db, 'pages', id));
    return { id: snap.id, ...snap.data() } as PageItem;
  },

  deletePage: async (id: string) => {
    await deleteDoc(doc(db, 'pages', id));
    await logActivity('Deleted Page', 'Pages', `Page ID: ${id}`);
    return { success: true };
  },

  // ── Services ──
  getServices: async () => {
    const q = query(collection(db, 'services'), orderBy('order'));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as ServiceItem));
  },

  createService: async (data: Partial<ServiceItem>) => {
    const id = data.slug ? data.slug.toLowerCase().replace(/[^a-z0-9_-]/g, '-') : crypto.randomUUID();
    const newData = { ...data, id };
    await setDoc(doc(db, 'services', id), newData);
    await logActivity('Created Service', 'Services', `Service: "${newData.name}"`);
    return newData as ServiceItem;
  },

  updateService: async (id: string, data: Partial<ServiceItem>) => {
    await updateDoc(doc(db, 'services', id), data);
    await logActivity('Updated Service', 'Services', `Service ID: ${id}`);
    const snap = await getDoc(doc(db, 'services', id));
    return { id: snap.id, ...snap.data() } as ServiceItem;
  },

  deleteService: async (id: string) => {
    await deleteDoc(doc(db, 'services', id));
    await logActivity('Deleted Service', 'Services', `Service ID: ${id}`);
    return { success: true };
  },

  reorderServices: async (orderedIds: string[]) => {
    const batch = writeBatch(db);
    for (let i = 0; i < orderedIds.length; i++) {
      batch.update(doc(db, 'services', orderedIds[i]), { order: i + 1 });
    }
    await batch.commit();
    await logActivity('Reordered Services', 'Services', `Updated display ordering.`);
    return { success: true };
  },

  // ── Locations ──
  getLocations: async () => {
    const snap = await getDocs(collection(db, 'locations'));
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as LocationItem));
  },

  createLocation: async (data: Partial<LocationItem>) => {
    const id = data.slug ? data.slug.toLowerCase().replace(/[^a-z0-9_-]/g, '-') : crypto.randomUUID();
    const newData = { ...data, id };
    await setDoc(doc(db, 'locations', id), newData);
    await logActivity('Created Location', 'Locations', `Suburb: "${newData.name}"`);
    return newData as LocationItem;
  },

  updateLocation: async (id: string, data: Partial<LocationItem>) => {
    await updateDoc(doc(db, 'locations', id), data);
    await logActivity('Updated Location', 'Locations', `Location ID: ${id}`);
    const snap = await getDoc(doc(db, 'locations', id));
    return { id: snap.id, ...snap.data() } as LocationItem;
  },

  deleteLocation: async (id: string) => {
    await deleteDoc(doc(db, 'locations', id));
    await logActivity('Deleted Location', 'Locations', `Location ID: ${id}`);
    return { success: true };
  },

  // ── Blog ──
  getBlog: async () => {
    const snap = await getDocs(collection(db, 'blog'));
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as BlogPost));
  },

  createBlogPost: async (data: Partial<BlogPost>) => {
    const id = data.slug ? data.slug.toLowerCase().replace(/[^a-z0-9_-]/g, '-') : crypto.randomUUID();
    const newData = { ...data, id, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    await setDoc(doc(db, 'blog', id), newData);
    await logActivity('Created Blog Post', 'Blog', `Post: "${newData.title}"`);
    return newData as BlogPost;
  },

  updateBlogPost: async (id: string, data: Partial<BlogPost>) => {
    const updateData = { ...data, updatedAt: new Date().toISOString() };
    await updateDoc(doc(db, 'blog', id), updateData);
    await logActivity('Updated Blog Post', 'Blog', `Post ID: ${id}`);
    const snap = await getDoc(doc(db, 'blog', id));
    return { id: snap.id, ...snap.data() } as BlogPost;
  },

  deleteBlogPost: async (id: string) => {
    await deleteDoc(doc(db, 'blog', id));
    await logActivity('Deleted Blog Post', 'Blog', `Post ID: ${id}`);
    return { success: true };
  },

  // ── Media ──
  getMedia: async () => {
    const snap = await getDocs(collection(db, 'media'));
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as MediaItem));
  },

  uploadMedia: async (file: File, altText?: string, caption?: string, targetLocation?: string) => {
    const storageRef = ref(storage, 'uploads/' + file.name + '-' + Date.now());
    const uploadTask = await uploadBytesResumable(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);

    const mediaItem = {
      id: crypto.randomUUID(),
      filename: file.name,
      url: downloadURL,
      altText: altText || file.name,
      caption: caption || '',
      mimeType: file.type,
      size: file.size,
      dimensions: 'Asset',
      createdAt: new Date().toISOString()
    };

    await setDoc(doc(db, 'media', mediaItem.id), mediaItem);
    await logActivity('Uploaded Media Asset', 'Media', `File: "${file.name}"`);
    return mediaItem as MediaItem & { placementMessage?: string };
  },

  assignMedia: async (mediaUrl: string, target: string) => {
    return { success: true, message: 'Assign media implemented in update endpoints.' };
  },

  updateMedia: async (id: string, data: Partial<MediaItem>) => {
    await updateDoc(doc(db, 'media', id), data);
    const snap = await getDoc(doc(db, 'media', id));
    return { id: snap.id, ...snap.data() } as MediaItem;
  },

  deleteMedia: async (id: string) => {
    await deleteDoc(doc(db, 'media', id));
    await logActivity('Deleted Media Asset', 'Media', `Media ID: ${id}`);
    return { success: true };
  },

  // ── SEO ──
  getSeo: async () => {
    const snap = await getDoc(doc(db, 'global', 'seo'));
    return (snap.exists() ? snap.data() : {}) as SeoSettings;
  },

  updateSeo: async (data: Partial<SeoSettings>) => {
    await updateDoc(doc(db, 'global', 'seo'), data);
    const snap = await getDoc(doc(db, 'global', 'seo'));
    return snap.data() as SeoSettings;
  },

  // ── Settings ──
  getSettings: async () => {
    const snap = await getDoc(doc(db, 'global', 'settings'));
    return (snap.exists() ? snap.data() : {}) as SiteSettings;
  },

  updateSettings: async (data: Partial<SiteSettings>) => {
    await updateDoc(doc(db, 'global', 'settings'), data);
    const snap = await getDoc(doc(db, 'global', 'settings'));
    return snap.data() as SiteSettings;
  },

  // ── Users ──
  getUsers: async () => {
    // Only return current user since Firebase Auth does not list users from client
    if (auth.currentUser) {
      return [{ id: auth.currentUser.uid, email: auth.currentUser.email, name: auth.currentUser.displayName, role: 'admin', mustChangePassword: false } as User];
    }
    return [];
  },

  createUser: async (data: { email: string; name: string; role: 'admin' | 'editor'; password: string }) => {
    throw new Error('User creation via client SDK is restricted.');
  },

  updateUser: async (id: string, data: { name?: string; role?: 'admin' | 'editor'; password?: string }) => {
    throw new Error('User update via client SDK is restricted.');
  },

  deleteUser: async (id: string) => {
    throw new Error('User deletion via client SDK is restricted.');
  },

  // ── Activity ──
  getActivity: async (filters?: { user?: string; action?: string }) => {
    let q = query(collection(db, 'activity'), orderBy('timestamp', 'desc'));
    const snap = await getDocs(q);
    let activities = snap.docs.map(d => ({ id: d.id, ...d.data() } as ActivityItem));
    
    if (filters?.user) activities = activities.filter(a => a.user === filters.user);
    if (filters?.action) activities = activities.filter(a => a.action === filters.action);
    
    return activities;
  },

  // ── Enquiries & Callbacks ──
  getEnquiries: async (status?: string) => {
    let q = query(collection(db, 'enquiries'));
    if (status && status !== 'all') {
      q = query(collection(db, 'enquiries'), where('status', '==', status));
    }
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as EnquiryItem));
  },

  updateEnquiry: async (id: string, updates: Partial<EnquiryItem>) => {
    await updateDoc(doc(db, 'enquiries', id), updates);
    await logActivity('Updated Enquiry', 'Enquiry', `ID: ${id}`);
    const snap = await getDoc(doc(db, 'enquiries', id));
    return { success: true, enquiry: { id: snap.id, ...snap.data() } as EnquiryItem };
  },

  deleteEnquiry: async (id: string) => {
    await deleteDoc(doc(db, 'enquiries', id));
    await logActivity('Deleted Enquiry', 'Enquiry', `ID: ${id}`);
    return { success: true };
  }
};
