import React, { useEffect, useState } from 'react';
import { adminApi } from '../utils/api';
import type { ServiceItem } from '../types/cms';
import {
  Wrench,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  AlertCircle,
  Search,
  Save,
  X
} from 'lucide-react';

export const ServicesManager: React.FC = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [editingService, setEditingService] = useState<Partial<ServiceItem> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const loadServices = async () => {
    setIsLoading(true);
    try {
      const data = await adminApi.getServices();
      setServices(data);
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to load services.' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService || !editingService.name) return;

    setIsSaving(true);
    setStatusMessage(null);

    try {
      if (editingService.id) {
        await adminApi.updateService(editingService.id, editingService);
        setStatusMessage({ type: 'success', text: `Service "${editingService.name}" updated successfully.` });
      } else {
        await adminApi.createService(editingService);
        setStatusMessage({ type: 'success', text: `Service "${editingService.name}" created successfully.` });
      }
      setEditingService(null);
      await loadServices();
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to save service.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (service: ServiceItem) => {
    if (!window.confirm(`Are you sure you want to delete service "${service.name}"? This will remove it from the public website.`)) {
      return;
    }

    try {
      await adminApi.deleteService(service.id);
      setStatusMessage({ type: 'success', text: `Service "${service.name}" deleted.` });
      await loadServices();
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to delete service.' });
    }
  };

  const openNewServiceModal = () => {
    setEditingService({
      name: '',
      slug: '',
      category: 'repairs',
      categoryLabel: 'Roofing Repairs',
      shortDescription: '',
      fullDescription: '',
      image: '/roofora-assets/images/services-img1.jpg',
      icon: 'fa-solid fa-screwdriver-wrench',
      badge: 'VBA Licensed',
      features: ['AS 4349.1 Standard', 'Licensed Tradespeople'],
      benefits: ['Guaranteed Quality'],
      faqs: [],
      seoTitle: '',
      metaDescription: '',
      status: 'published',
      order: services.length + 1
    });
  };

  const filteredServices = services.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.shortDescription.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === 'all' || s.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Wrench className="w-6 h-6 text-[#f19e1f]" />
            <span>Roofing Services ({services.length})</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage the roofing services displayed on the public website's service scope and checklists.
          </p>
        </div>

        <button
          onClick={openNewServiceModal}
          className="px-4 py-2.5 bg-[#f19e1f] hover:bg-[#d88713] text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
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

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search services by title or description..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#f19e1f]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {['all', 'repairs', 'replacement', 'restoration', 'gutters'].map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                categoryFilter === cat
                  ? 'bg-[#1e2e4f] text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Services Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-xs text-slate-500">Loading services...</div>
        ) : filteredServices.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500">No services found matching criteria.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-4 w-12 text-center">#</th>
                  <th className="py-3.5 px-4">Service Name</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Badge</th>
                  <th className="py-3.5 px-4">Description</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredServices.map((service, index) => (
                  <tr key={service.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 text-center font-bold text-slate-400">
                      {service.order || index + 1}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 text-sm">{service.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{service.slug}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="capitalize px-2 py-0.5 rounded bg-slate-100 font-semibold text-slate-700">
                        {service.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {service.badge ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                          {service.badge}
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 max-w-sm truncate text-slate-500">
                      {service.shortDescription}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          service.status === 'published'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {service.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setEditingService({ ...service })}
                          className="p-1.5 text-slate-600 hover:text-blue-600 rounded-lg hover:bg-slate-100"
                          title="Edit Service"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(service)}
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-slate-100"
                          title="Delete Service"
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

      {/* ── Edit / Add Service Modal ── */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  {editingService.id ? `Edit: ${editingService.name}` : 'Create New Roofing Service'}
                </h3>
                <p className="text-xs text-slate-400">
                  Changes save directly to the authoritative CMS database and sync live.
                </p>
              </div>
              <button
                onClick={() => setEditingService(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Service Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingService.name || ''}
                    onChange={e => setEditingService({
                      ...editingService,
                      name: e.target.value,
                      slug: editingService.slug || e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                    })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#f19e1f]"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Slug (URL identifier)
                  </label>
                  <input
                    type="text"
                    value={editingService.slug || ''}
                    onChange={e => setEditingService({ ...editingService, slug: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#f19e1f]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Category
                  </label>
                  <select
                    value={editingService.category || 'repairs'}
                    onChange={e => setEditingService({ ...editingService, category: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#f19e1f]"
                  >
                    <option value="repairs">Repairs & Leaks</option>
                    <option value="replacement">Installation & Replacement</option>
                    <option value="restoration">Restoration & Painting</option>
                    <option value="gutters">Gutters & Drainage</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Badge Text
                  </label>
                  <input
                    type="text"
                    value={editingService.badge || ''}
                    onChange={e => setEditingService({ ...editingService, badge: e.target.value })}
                    placeholder="e.g. Urgent 24/7"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#f19e1f]"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Status
                  </label>
                  <select
                    value={editingService.status || 'published'}
                    onChange={e => setEditingService({ ...editingService, status: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#f19e1f]"
                  >
                    <option value="published">Published (Live)</option>
                    <option value="draft">Draft (Hidden)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Short Description (Checklist summary)
                </label>
                <textarea
                  rows={2}
                  required
                  value={editingService.shortDescription || ''}
                  onChange={e => setEditingService({ ...editingService, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#f19e1f]"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Full Service Details
                </label>
                <textarea
                  rows={3}
                  value={editingService.fullDescription || ''}
                  onChange={e => setEditingService({ ...editingService, fullDescription: e.target.value })}
                  placeholder="Detailed breakdown of workmanship, materials, and Australian standards."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#f19e1f]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Image URL
                  </label>
                  <input
                    type="text"
                    value={editingService.image || ''}
                    onChange={e => setEditingService({ ...editingService, image: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#f19e1f]"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={editingService.order || 1}
                    onChange={e => setEditingService({ ...editingService, order: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#f19e1f]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
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
                  <span>{isSaving ? 'Saving...' : 'Save Service'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
