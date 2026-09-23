import React, { useEffect, useState } from 'react';
import { adminApi } from '../utils/api';
import type { LocationItem } from '../types/cms';
import {
  MapPin,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  AlertCircle,
  Search,
  Save,
  X
} from 'lucide-react';

export const LocationsManager: React.FC = () => {
  const [locations, setLocations] = useState<LocationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editingLoc, setEditingLoc] = useState<Partial<LocationItem> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const loadLocations = async () => {
    setIsLoading(true);
    try {
      const data = await adminApi.getLocations();
      setLocations(data);
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to load locations.' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLocations();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLoc || !editingLoc.name) return;

    setIsSaving(true);
    setStatusMessage(null);

    try {
      if (editingLoc.id) {
        await adminApi.updateLocation(editingLoc.id, editingLoc);
        setStatusMessage({ type: 'success', text: `Location "${editingLoc.name}" updated successfully.` });
      } else {
        await adminApi.createLocation(editingLoc);
        setStatusMessage({ type: 'success', text: `Location "${editingLoc.name}" added successfully.` });
      }
      setEditingLoc(null);
      await loadLocations();
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to save location.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (loc: LocationItem) => {
    if (!window.confirm(`Are you sure you want to delete suburb "${loc.name}"?`)) return;

    try {
      await adminApi.deleteLocation(loc.id);
      setStatusMessage({ type: 'success', text: `Location "${loc.name}" removed.` });
      await loadLocations();
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to delete location.' });
    }
  };

  const openNewLocationModal = () => {
    setEditingLoc({
      name: '',
      slug: '',
      pageTitle: '',
      intro: '',
      localContent: '',
      services: ['Roof Leak Repairs', 'Colorbond Re-Roofing'],
      images: ['/roofora-assets/images/portfolio-img1.jpg'],
      faqs: [],
      seoTitle: '',
      metaDescription: '',
      postalCode: '3000',
      coordinates: { lat: -37.8136, lng: 144.9631 },
      status: 'published'
    });
  };

  const filteredLocations = locations.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.postalCode.includes(search) ||
    l.intro.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <MapPin className="w-6 h-6 text-[#f19e1f]" />
            <span>Melbourne Locations & Suburbs ({locations.length})</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage meaningful location landing details and local SEO coverage without generating thin doorway pages.
          </p>
        </div>

        <button
          onClick={openNewLocationModal}
          className="px-4 py-2.5 bg-[#f19e1f] hover:bg-[#d88713] text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Location</span>
        </button>
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
          placeholder="Filter by suburb name or postcode..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#f19e1f]"
        />
      </div>

      {/* Locations Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-xs text-slate-500">Loading locations...</div>
        ) : filteredLocations.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500">No locations found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-4">Suburb & Postcode</th>
                  <th className="py-3.5 px-4">Page Title</th>
                  <th className="py-3.5 px-4">Coordinates</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredLocations.map(loc => (
                  <tr key={loc.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 text-sm">{loc.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">VIC {loc.postalCode} • {loc.slug}</div>
                    </td>
                    <td className="py-3.5 px-4 max-w-xs truncate text-slate-700">
                      {loc.pageTitle || '—'}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                      {loc.coordinates?.lat?.toFixed(4)}, {loc.coordinates?.lng?.toFixed(4)}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          loc.status === 'published'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {loc.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setEditingLoc({ ...loc })}
                          className="p-1.5 text-slate-600 hover:text-blue-600 rounded-lg hover:bg-slate-100"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(loc)}
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-slate-100"
                        >
                          <Trash2 className="w-4 h-4" />
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

      {/* Modal */}
      {editingLoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  {editingLoc.id ? `Edit Location: ${editingLoc.name}` : 'Add Melbourne Suburb'}
                </h3>
              </div>
              <button
                onClick={() => setEditingLoc(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Suburb Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingLoc.name || ''}
                    onChange={e => setEditingLoc({
                      ...editingLoc,
                      name: e.target.value,
                      slug: editingLoc.slug || e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                    })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#f19e1f]"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    value={editingLoc.postalCode || ''}
                    onChange={e => setEditingLoc({ ...editingLoc, postalCode: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#f19e1f]"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Status
                  </label>
                  <select
                    value={editingLoc.status || 'published'}
                    onChange={e => setEditingLoc({ ...editingLoc, status: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#f19e1f]"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Local Intro & Roofing Context
                </label>
                <textarea
                  rows={2}
                  value={editingLoc.intro || ''}
                  onChange={e => setEditingLoc({ ...editingLoc, intro: e.target.value })}
                  placeholder="e.g. Coastal requirements in Brighton or heritage terrace roofing in South Yarra"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#f19e1f]"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                  SEO Title
                </label>
                <input
                  type="text"
                  value={editingLoc.seoTitle || ''}
                  onChange={e => setEditingLoc({ ...editingLoc, seoTitle: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#f19e1f]"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingLoc(null)}
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
                  <span>{isSaving ? 'Saving...' : 'Save Location'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
