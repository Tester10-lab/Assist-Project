import React, { useEffect, useState } from 'react';
import { adminApi } from '../utils/api';
import type { PageItem } from '../types/cms';
import {
  FileText,
  Edit2,
  CheckCircle,
  Search,
  ExternalLink,
  Save,
  X,
  AlertCircle
} from 'lucide-react';

export const PagesManager: React.FC = () => {
  const [pages, setPages] = useState<PageItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editingPage, setEditingPage] = useState<PageItem | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const loadPages = async () => {
    setIsLoading(true);
    try {
      const data = await adminApi.getPages();
      setPages(data);
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to load pages.' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPages();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPage) return;

    setIsSaving(true);
    setStatusMessage(null);

    try {
      await adminApi.updatePage(editingPage.id, editingPage);
      setStatusMessage({ type: 'success', text: `Page "${editingPage.title}" updated successfully.` });
      setEditingPage(null);
      await loadPages();
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to save page.' });
    } finally {
      setIsSaving(false);
    }
  };

  const filteredPages = pages.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.slug.toLowerCase().includes(search.toLowerCase()) ||
    p.heroHeading.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <FileText className="w-6 h-6 text-[#f19e1f]" />
            <span>Public Website Pages</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage page content, hero banners, and page-specific SEO for the public website.
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search pages..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#f19e1f]"
          />
        </div>
      </div>

      {statusMessage && (
        <div
          className={`p-4 rounded-xl text-xs font-semibold flex items-center justify-between gap-2 ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {statusMessage.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span>{statusMessage.text}</span>
          </div>
          <button onClick={() => setStatusMessage(null)}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Pages Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-xs text-slate-500">Loading pages...</div>
        ) : filteredPages.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500">No matching pages found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-4">Page Title & Slug</th>
                  <th className="py-3.5 px-4">Hero Heading</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">SEO Title</th>
                  <th className="py-3.5 px-4">Last Updated</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredPages.map(page => (
                  <tr key={page.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 text-sm">{page.title}</div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        {page.slug ? `/${page.slug}` : '/ (Homepage)'}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 max-w-xs truncate text-slate-700">
                      {page.heroHeading || '—'}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          page.status === 'published'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {page.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 max-w-xs truncate text-slate-500">
                      {page.seoTitle || '—'}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                      {new Date(page.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={page.slug ? `/#${page.slug}` : '/'}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="View on Live Website"
                          className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-100"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => setEditingPage({ ...page })}
                          className="px-3 py-1.5 bg-[#1e2e4f] text-white rounded-lg hover:bg-[#283d66] font-bold text-xs flex items-center gap-1"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Edit Page Modal ── */}
      {editingPage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Edit Page: {editingPage.title}
                </h3>
                <span className="text-xs text-slate-400 font-mono">
                  Slug: {editingPage.slug ? `/${editingPage.slug}` : '/ (Homepage)'}
                </span>
              </div>
              <button
                onClick={() => setEditingPage(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Page Title
                  </label>
                  <input
                    type="text"
                    required
                    value={editingPage.title}
                    onChange={e => setEditingPage({ ...editingPage, title: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#f19e1f]"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Publication Status
                  </label>
                  <select
                    value={editingPage.status}
                    onChange={e => setEditingPage({ ...editingPage, status: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#f19e1f]"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Hero Heading
                </label>
                <input
                  type="text"
                  value={editingPage.heroHeading}
                  onChange={e => setEditingPage({ ...editingPage, heroHeading: e.target.value })}
                  placeholder="Prominent main banner heading"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#f19e1f]"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Hero Subtitle / Description
                </label>
                <textarea
                  rows={2}
                  value={editingPage.heroDescription}
                  onChange={e => setEditingPage({ ...editingPage, heroDescription: e.target.value })}
                  placeholder="Supporting subtitle text under the main hero title"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#f19e1f]"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Hero Background Image URL
                </label>
                <input
                  type="text"
                  value={editingPage.heroImage}
                  onChange={e => setEditingPage({ ...editingPage, heroImage: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#f19e1f]"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Main Page Content / Overview
                </label>
                <textarea
                  rows={3}
                  value={editingPage.content}
                  onChange={e => setEditingPage({ ...editingPage, content: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#f19e1f]"
                />
              </div>

              <div className="pt-3 border-t border-slate-200">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-3">
                  Page SEO Configuration
                </h4>

                <div className="space-y-3">
                  <div>
                    <label className="block font-semibold text-slate-600 mb-1">
                      SEO Meta Title
                    </label>
                    <input
                      type="text"
                      value={editingPage.seoTitle}
                      onChange={e => setEditingPage({ ...editingPage, seoTitle: e.target.value })}
                      placeholder="Title tag for search engines"
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#f19e1f]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-600 mb-1">
                      Meta Description (Recommended 150-160 characters)
                    </label>
                    <textarea
                      rows={2}
                      value={editingPage.metaDescription}
                      onChange={e => setEditingPage({ ...editingPage, metaDescription: e.target.value })}
                      placeholder="Search snippet description"
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#f19e1f]"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="noIndexCheck"
                      checked={editingPage.noIndex}
                      onChange={e => setEditingPage({ ...editingPage, noIndex: e.target.checked })}
                      className="rounded text-[#f19e1f]"
                    />
                    <label htmlFor="noIndexCheck" className="text-slate-700 font-semibold cursor-pointer">
                      Exclude from search engine indexing (noindex)
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingPage(null)}
                  className="px-4 py-2 font-bold text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 bg-[#f19e1f] hover:bg-[#d88713] text-slate-950 font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'Saving Changes...' : 'Save Page Content'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
