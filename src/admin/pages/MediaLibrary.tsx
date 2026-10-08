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
  Save,
  Layers,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

const PLACEMENT_OPTIONS = [
  { value: '', label: '📁 Media Library Only (General Asset)' },
  { value: 'home_hero', label: '🏠 Homepage: Hero Banner Background' },
  { value: 'about_hero', label: 'ℹ️ About Us: Top Banner Background' },
  { value: 'about_og', label: '📸 About Us: Featured Story Photo' },
  { value: 'services_hero', label: '🛠️ Services Overview: Banner Background' },
  { value: 'service_roof-restoration', label: '✨ Service: Roof Restoration Hero Image' },
  { value: 'service_roof-repairs', label: '🚨 Service: Emergency Roof Repairs Hero' },
  { value: 'service_roof-replacement', label: '🏗️ Service: Roof Replacement Hero' },
  { value: 'service_colorbond-roofing', label: '🛡️ Service: Colorbond Roofing Hero' },
  { value: 'service_guttering', label: '💧 Service: Gutter Replacement Hero' },
  { value: 'service_leak-detection', label: '🔍 Service: Roof Leak Detection Hero' },
  { value: 'gallery_hero', label: '🖼️ Gallery: Projects Banner Background' },
  { value: 'branding_logo', label: '🏷️ Website Branding: Main Header Logo' },
  { value: 'seo_og', label: '🌐 Global SEO: Social Sharing (OpenGraph) Image' }
];

export const MediaLibrary: React.FC = () => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<MediaItem | null>(null);
  const [assigningItem, setAssigningItem] = useState<MediaItem | null>(null);
  const [selectedPlacement, setSelectedPlacement] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  // Upload modal state
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [uploadAltText, setUploadAltText] = useState('');
  const [uploadCaption, setUploadCaption] = useState('');
  const [uploadTargetLocation, setUploadTargetLocation] = useState('');
  
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      setStatusMessage({ type: 'error', text: 'File exceeds maximum 8MB size limit.' });
      return;
    }

    setSelectedFile(file);
    setUploadAltText(file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));

    const reader = new FileReader();
    reader.onload = (event) => {
      setFilePreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);

    setIsUploadModalOpen(true);
  };

  const handleExecuteUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsUploading(true);
    setStatusMessage(null);

    try {
      const uploaded = await adminApi.uploadMedia(
        selectedFile,
        uploadAltText.trim() || selectedFile.name,
        uploadCaption.trim() || 'Uploaded via CMS',
        uploadTargetLocation || undefined
      );

      const placementNotice = uploaded.placementMessage ? ` & ${uploaded.placementMessage}` : '';
      setStatusMessage({
        type: 'success',
        text: `Uploaded "${uploaded.filename}" successfully${placementNotice}.`
      });

      setIsUploadModalOpen(false);
      setSelectedFile(null);
      setFilePreview(null);
      setUploadAltText('');
      setUploadCaption('');
      setUploadTargetLocation('');
      await loadMedia();
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'File upload failed.' });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDirectAssign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assigningItem || !selectedPlacement) return;

    try {
      const res = await adminApi.assignMedia(assigningItem.url, selectedPlacement);
      setStatusMessage({ type: 'success', text: res.message || 'Image placement applied successfully!' });
      setAssigningItem(null);
      setSelectedPlacement('');
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to assign image placement.' });
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
    <div className="space-y-6 font-['Sora',sans-serif]">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-[#f19e1f]" />
            <span>Media Library & Placement Hub ({media.length})</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Upload images, copy persistent URLs, or assign photos directly to any page, service hero, or branding banner.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/jpeg,image/png,image/webp,image/svg+xml,image/gif"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="px-4 py-2.5 bg-[#f19e1f] hover:bg-[#d88713] text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 disabled:opacity-60 cursor-pointer"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload Image</span>
          </button>
        </div>
      </div>

      {/* ── Status Notification ── */}
      {statusMessage && (
        <div
          className={`p-4 rounded-xl text-xs font-semibold flex items-center justify-between gap-2 ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {statusMessage.type === 'success' ? <CheckCircle className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-red-600" />}
            <span>{statusMessage.text}</span>
          </div>
          <button onClick={() => setStatusMessage(null)} className="text-slate-400 hover:text-slate-700">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ── Search Bar ── */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by file name or alt text..."
          className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#f19e1f] focus:ring-1 focus:ring-[#f19e1f]"
        />
      </div>

      {/* ── Media Grid ── */}
      {isLoading ? (
        <div className="p-12 text-center text-slate-400 text-xs">Loading media assets...</div>
      ) : filteredMedia.length === 0 ? (
        <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-12 text-center">
          <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-700">No media assets found</h3>
          <p className="text-xs text-slate-400 mt-1 mb-4">Upload high-resolution photos for your roof restorations & services.</p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-[#f19e1f] hover:bg-[#d88713] text-slate-950 font-bold text-xs rounded-xl shadow-sm inline-flex items-center gap-2"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Select File</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredMedia.map(item => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden flex items-center justify-center p-2">
                <img
                  src={item.url}
                  alt={item.altText}
                  className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    // Fallback visual
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                
                {/* Floating Quick Action Buttons */}
                <div className="absolute top-2 right-2 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleCopyUrl(item)}
                    className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold shadow-md flex items-center gap-1 transition-all ${
                      copiedId === item.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-sm'
                    }`}
                    title="Copy full image URL"
                  >
                    {copiedId === item.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === item.id ? 'Copied' : 'Copy URL'}</span>
                  </button>
                </div>
              </div>

              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-xs text-slate-900 truncate" title={item.filename}>
                    {item.filename}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                    Alt: {item.altText || 'None'}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1 uppercase font-semibold">
                    {Math.round(item.size / 1024) || 50} KB • {item.mimeType?.split('/')[1]?.toUpperCase() || 'IMAGE'}
                  </p>
                </div>

                {/* Card Action Row */}
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between gap-1.5">
                  <button
                    onClick={() => {
                      setAssigningItem(item);
                      setSelectedPlacement('');
                    }}
                    className="flex-1 px-2.5 py-1.5 bg-slate-100 hover:bg-[#f19e1f] text-slate-700 hover:text-slate-950 rounded-lg text-[11px] font-bold transition-colors flex items-center justify-center gap-1"
                    title="Assign this image to a page or service banner"
                  >
                    <Layers className="w-3 h-3" />
                    <span>Set As...</span>
                  </button>

                  <button
                    onClick={() => setEditingItem(item)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                    title="Edit Alt Text & Caption"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleDelete(item)}
                    className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    title="Delete Media Asset"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── UPLOAD & PLACEMENT MODAL ── */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative animate-fadeIn">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-[#f19e1f]" />
                <h3 className="font-bold text-sm text-slate-900">Upload & Place Media Asset</h3>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleExecuteUpload} className="space-y-4">
              {filePreview && (
                <div className="relative aspect-[16/9] bg-slate-50 border border-slate-200 rounded-xl overflow-hidden flex items-center justify-center">
                  <img
                    src={filePreview}
                    alt="Preview"
                    className="max-h-full max-w-full object-contain"
                  />
                  <div className="absolute bottom-2 left-2 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-sm">
                    {selectedFile?.name} ({Math.round((selectedFile?.size || 0) / 1024)} KB)
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Where do you want to put this image? (Target Placement)
                </label>
                <select
                  value={uploadTargetLocation}
                  onChange={e => setUploadTargetLocation(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#f19e1f] focus:ring-1 focus:ring-[#f19e1f]"
                >
                  {PLACEMENT_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-400 mt-1">
                  Selecting a target location will automatically update that website section with this new image.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Alt Text (SEO & Accessibility)
                </label>
                <input
                  type="text"
                  required
                  value={uploadAltText}
                  onChange={e => setUploadAltText(e.target.value)}
                  placeholder="e.g. Colorbond Roof Restoration in Toorak Melbourne"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#f19e1f]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Caption / Internal Note
                </label>
                <input
                  type="text"
                  value={uploadCaption}
                  onChange={e => setUploadCaption(e.target.value)}
                  placeholder="e.g. SupaPoint Repointing before and after"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#f19e1f]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-5 py-2.5 bg-[#f19e1f] hover:bg-[#d88713] text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {isUploading ? (
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Upload & Apply</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── SET AS / PLACEMENT MODAL (FOR EXISTING ASSETS) ── */}
      {assigningItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl relative animate-fadeIn">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#f19e1f]" />
                <h3 className="font-bold text-sm text-slate-900">Set Image Placement</h3>
              </div>
              <button
                onClick={() => setAssigningItem(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleDirectAssign} className="space-y-4">
              <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <img
                  src={assigningItem.url}
                  alt={assigningItem.altText}
                  className="w-16 h-12 object-cover rounded-lg shrink-0"
                />
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-slate-900 truncate">{assigningItem.filename}</p>
                  <p className="text-[11px] text-slate-500 truncate">{assigningItem.altText}</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Select where this image should appear on the website:
                </label>
                <select
                  required
                  value={selectedPlacement}
                  onChange={e => setSelectedPlacement(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#f19e1f]"
                >
                  <option value="">-- Choose Target Website Location --</option>
                  {PLACEMENT_OPTIONS.filter(o => o.value !== '').map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAssigningItem(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!selectedPlacement}
                  className="px-5 py-2.5 bg-[#f19e1f] hover:bg-[#d88713] text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Apply Placement</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── EDIT METADATA MODAL ── */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl relative animate-fadeIn">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900">Edit Asset Details</h3>
              <button
                onClick={() => setEditingItem(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Alt Text (SEO Description)
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.altText}
                  onChange={e => setEditingItem({ ...editingItem, altText: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#f19e1f]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Caption / Notes
                </label>
                <input
                  type="text"
                  value={editingItem.caption}
                  onChange={e => setEditingItem({ ...editingItem, caption: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#f19e1f]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#f19e1f] hover:bg-[#d88713] text-slate-950 font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
