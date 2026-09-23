import React, { useEffect, useState, useRef } from 'react';
import { adminApi } from '../utils/api';
import type { MediaItem } from '../types/cms';
import {
  Image as ImageIcon,
  UploadCloud,
  Copy,
  Check,
  Trash2,
  Edit2,
  Search,
  CheckCircle,
  AlertCircle,
  X,
  Save
} from 'lucide-react';

export const MediaLibrary: React.FC = () => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<MediaItem | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadMedia = async () => {
    setIsLoading(true);
    try {
      const data = await adminApi.getMedia();
      setMedia(data);
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to load media.' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Client-side quick check
    if (file.size > 5 * 1024 * 1024) {
      setStatusMessage({ type: 'error', text: 'File exceeds maximum 5MB size limit.' });
      return;
    }

    setIsUploading(true);
    setStatusMessage(null);

    try {
      const uploaded = await adminApi.uploadMedia(file, file.name, 'Uploaded via CMS');
      setStatusMessage({ type: 'success', text: `Uploaded "${uploaded.filename}" successfully.` });
      await loadMedia();
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'File upload failed.' });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleCopyUrl = (item: MediaItem) => {
    navigator.clipboard.writeText(item.url);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    try {
      await adminApi.updateMedia(editingItem.id, {
        altText: editingItem.altText,
        caption: editingItem.caption
      });
      setStatusMessage({ type: 'success', text: 'Media metadata updated.' });
      setEditingItem(null);
      await loadMedia();
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to update media.' });
    }
  };

  const handleDelete = async (item: MediaItem) => {
    if (!window.confirm(`Delete media asset "${item.filename}"?`)) return;

    try {
      await adminApi.deleteMedia(item.id);
      setStatusMessage({ type: 'success', text: `Media "${item.filename}" deleted.` });
      await loadMedia();
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to delete media.' });
    }
  };

  const filteredMedia = media.filter(m =>
    m.filename.toLowerCase().includes(search.toLowerCase()) ||
    m.altText.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-[#f19e1f]" />
            <span>Media Library & Assets ({media.length})</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Upload and manage persistent roofing photos, brand assets, and inspection diagrams.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/jpeg,image/png,image/webp,image/svg+xml,image/gif"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="px-4 py-2.5 bg-[#f19e1f] hover:bg-[#d88713] text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 disabled:opacity-60 cursor-pointer"
          >
            <UploadCloud className="w-4 h-4" />
            <span>{isUploading ? 'Uploading...' : 'Upload Image'}</span>
          </button>
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

      {/* Search */}
      <div className="relative w-full sm:w-72">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search by file name or alt text..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#f19e1f]"
        />
      </div>

      {/* Grid of Media */}
      {isLoading ? (
        <div className="p-12 text-center text-xs text-slate-500">Loading media library...</div>
      ) : filteredMedia.length === 0 ? (
        <div className="p-12 text-center text-xs text-slate-500 bg-white rounded-2xl border border-slate-200">
          No media files match your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredMedia.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group"
            >
              <div className="h-40 bg-slate-100 overflow-hidden relative flex items-center justify-center">
                <img
                  src={item.url}
                  alt={item.altText || item.filename}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e: any) => {
                    e.target.onerror = null;
                    e.target.src = '/roofora-assets/images/portfolio-img1.jpg';
                  }}
                />
                <button
                  onClick={() => handleCopyUrl(item)}
                  title="Copy Image URL"
                  className="absolute top-2 right-2 px-2.5 py-1 bg-slate-900/80 hover:bg-slate-900 text-white rounded-lg text-[10px] font-bold backdrop-blur-sm transition-all flex items-center gap-1"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy URL</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between text-xs">
                <div>
                  <h4 className="font-bold text-slate-900 truncate" title={item.filename}>
                    {item.filename}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5" title={item.altText}>
                    Alt: {item.altText || '—'}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono mt-1">
                    <span>{Math.round(item.size / 1024)} KB</span>
                    <span>•</span>
                    <span>{item.mimeType.split('/')[1]?.toUpperCase()}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-3">
                  <button
                    onClick={() => setEditingItem({ ...item })}
                    className="p-1.5 text-slate-500 hover:text-blue-600 rounded-lg hover:bg-slate-50"
                    title="Edit Metadata"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-slate-50"
                    title="Delete Media"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Metadata Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">Edit Media Details</h3>
              <button onClick={() => setEditingItem(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Alt Text (Accessibility & SEO)
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.altText}
                  onChange={e => setEditingItem({ ...editingItem, altText: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#f19e1f]"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Caption / Notes
                </label>
                <input
                  type="text"
                  value={editingItem.caption}
                  onChange={e => setEditingItem({ ...editingItem, caption: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#f19e1f]"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#f19e1f] hover:bg-[#d88713] text-slate-950 font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Update</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
