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
  DashboardMetrics
} from '../types/cms';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

export function getAuthToken(): string | null {
  return sessionStorage.getItem('admin_session_token');
}

export function setAuthToken(token: string | null) {
  if (token) {
    sessionStorage.setItem('admin_session_token', token);
  } else {
    sessionStorage.removeItem('admin_session_token');
  }
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const headers = new Headers(options.headers || {});

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  if (!(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers
  });

  if (res.status === 401) {
    setAuthToken(null);
    window.dispatchEvent(new CustomEvent('admin-auth-expired'));
    throw new Error('Session expired or unauthorized. Please log in again.');
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || `Request failed with status ${res.status}`);
  }

  return data as T;
}

export const adminApi = {
  // ── Authentication ──
  login: (email: string, password: string) =>
    request<{ token: string; user: User }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    }),

  logout: () =>
    request<{ success: boolean }>('/auth/logout', {
      method: 'POST'
    }),

  getMe: () =>
    request<{ user: User }>('/auth/me'),

  changePassword: (currentPassword: string, newPassword: string) =>
    request<{ success: boolean; message: string }>('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword })
    }),

  // ── Dashboard ──
  getDashboard: () =>
    request<{ metrics: DashboardMetrics; recentActivity: ActivityItem[] }>('/admin/dashboard'),

  // ── Pages ──
  getPages: () =>
    request<PageItem[]>('/admin/pages'),

  createPage: (data: Partial<PageItem>) =>
    request<PageItem>('/admin/pages', {
      method: 'POST',
      body: JSON.stringify(data)
    }),

  updatePage: (id: string, data: Partial<PageItem>) =>
    request<PageItem>(`/admin/pages/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),

  deletePage: (id: string) =>
    request<{ success: boolean }>(`/admin/pages/${id}`, {
      method: 'DELETE'
    }),

  // ── Services ──
  getServices: () =>
    request<ServiceItem[]>('/admin/services'),

  createService: (data: Partial<ServiceItem>) =>
    request<ServiceItem>('/admin/services', {
      method: 'POST',
      body: JSON.stringify(data)
    }),

  updateService: (id: string, data: Partial<ServiceItem>) =>
    request<ServiceItem>(`/admin/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),

  deleteService: (id: string) =>
    request<{ success: boolean }>(`/admin/services/${id}`, {
      method: 'DELETE'
    }),

  reorderServices: (orderedIds: string[]) =>
    request<{ success: boolean }>('/admin/services-reorder', {
      method: 'PUT',
      body: JSON.stringify({ orderedIds })
    }),

  // ── Locations ──
  getLocations: () =>
    request<LocationItem[]>('/admin/locations'),

  createLocation: (data: Partial<LocationItem>) =>
    request<LocationItem>('/admin/locations', {
      method: 'POST',
      body: JSON.stringify(data)
    }),

  updateLocation: (id: string, data: Partial<LocationItem>) =>
    request<LocationItem>(`/admin/locations/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),

  deleteLocation: (id: string) =>
    request<{ success: boolean }>(`/admin/locations/${id}`, {
      method: 'DELETE'
    }),

  // ── Blog ──
  getBlog: () =>
    request<BlogPost[]>('/admin/blog'),

  createBlogPost: (data: Partial<BlogPost>) =>
    request<BlogPost>('/admin/blog', {
      method: 'POST',
      body: JSON.stringify(data)
    }),

  updateBlogPost: (id: string, data: Partial<BlogPost>) =>
    request<BlogPost>(`/admin/blog/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),

  deleteBlogPost: (id: string) =>
    request<{ success: boolean }>(`/admin/blog/${id}`, {
      method: 'DELETE'
    }),

  // ── Media ──
  getMedia: () =>
    request<MediaItem[]>('/admin/media'),

  uploadMedia: (file: File, altText?: string, caption?: string) => {
    const formData = new FormData();
    formData.append('file', file);
    if (altText) formData.append('altText', altText);
    if (caption) formData.append('caption', caption);
    return request<MediaItem>('/admin/media/upload', {
      method: 'POST',
      body: formData
    });
  },

  updateMedia: (id: string, data: Partial<MediaItem>) =>
    request<MediaItem>(`/admin/media/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),

  deleteMedia: (id: string) =>
    request<{ success: boolean }>(`/admin/media/${id}`, {
      method: 'DELETE'
    }),

  // ── SEO ──
  getSeo: () =>
    request<SeoSettings>('/admin/seo'),

  updateSeo: (data: Partial<SeoSettings>) =>
    request<SeoSettings>('/admin/seo', {
      method: 'PUT',
      body: JSON.stringify(data)
    }),

  // ── Settings ──
  getSettings: () =>
    request<SiteSettings>('/admin/settings'),

  updateSettings: (data: Partial<SiteSettings>) =>
    request<SiteSettings>('/admin/settings', {
      method: 'PUT',
      body: JSON.stringify(data)
    }),

  // ── Users ──
  getUsers: () =>
    request<User[]>('/admin/users'),

  createUser: (data: { email: string; name: string; role: 'admin' | 'editor'; password: string }) =>
    request<User>('/admin/users', {
      method: 'POST',
      body: JSON.stringify(data)
    }),

  updateUser: (id: string, data: { name?: string; role?: 'admin' | 'editor'; password?: string }) =>
    request<User>(`/admin/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),

  deleteUser: (id: string) =>
    request<{ success: boolean }>(`/admin/users/${id}`, {
      method: 'DELETE'
    }),

  // ── Activity ──
  getActivity: (filters?: { user?: string; action?: string }) => {
    const params = new URLSearchParams();
    if (filters?.user) params.set('user', filters.user);
    if (filters?.action) params.set('action', filters.action);
    const qs = params.toString();
    return request<ActivityItem[]>(`/admin/activity${qs ? `?${qs}` : ''}`);
  }
};
