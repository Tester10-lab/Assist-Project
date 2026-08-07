import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import { Package, AlertTriangle, Search } from 'lucide-react';

export const MaterialInventoryModule: React.FC = () => {
  const { inventory, suppliers, purchaseOrders, restockItem } = useERP();
  const [activeTab, setActiveTab] = useState<'products' | 'suppliers' | 'orders'>('products');
  const [searchSKU, setSearchSKU] = useState('');

  const filteredInventory = inventory.filter(i =>
    i.name.toLowerCase().includes(searchSKU.toLowerCase()) ||
    i.sku.toLowerCase().includes(searchSKU.toLowerCase()) ||
    i.category.toLowerCase().includes(searchSKU.toLowerCase())
  );

  const totalInventoryValuation = inventory.reduce((acc, i) => acc + (i.inStock * i.unitCost), 0);
  const lowStockCount = inventory.filter(i => i.inStock <= i.minStockLevel).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Package className="w-6 h-6 text-emerald-600" /> Module 10 — Material Inventory Management
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Roofing materials database, Australian suppliers, purchase orders, project allocation, and low stock notifications.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-right px-3.5 py-1.5 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-400 uppercase font-extrabold">Total Inventory Value</span>
            <div className="text-sm font-black text-emerald-700">${totalInventoryValuation.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'products' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Roofing Material Products ({inventory.length})
        </button>

        <button
          onClick={() => setActiveTab('suppliers')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'suppliers' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Suppliers ({suppliers.length})
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'orders' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Purchase Orders ({purchaseOrders.length})
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          
          {/* Search bar */}
          <div className="flex justify-between items-center">
            <div className="relative w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search SKU, item name or category..."
                value={searchSKU}
                onChange={e => setSearchSKU(e.target.value)}
                className="w-full bg-white border border-slate-200 text-xs text-slate-900 rounded-xl pl-9 pr-4 py-2 focus:outline-none focus:border-emerald-500 shadow-2xs"
              />
            </div>

            {lowStockCount > 0 && (
              <span className="px-3 py-1.5 bg-rose-50 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" /> {lowStockCount} Items Below Min Stock Threshold
              </span>
            )}
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider bg-slate-50">
                  <th className="py-3.5 px-4">SKU / Item Name</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4 text-center">In Stock</th>
                  <th className="py-3.5 px-4 text-center">Allocated</th>
                  <th className="py-3.5 px-4 text-right">Unit Cost</th>
                  <th className="py-3.5 px-4">Supplier</th>
                  <th className="py-3.5 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredInventory.map(item => {
                  const isLow = item.inStock <= item.minStockLevel;
                  return (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 text-xs">{item.name}</div>
                        <div className="text-[10px] text-slate-500 font-mono">SKU: {item.sku} • {item.warehouseLocation}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className={`font-mono font-bold text-xs ${isLow ? 'text-rose-600 font-black' : 'text-slate-900'}`}>
                          {item.inStock} {item.unit}s
                        </span>
                        {isLow && <span className="block text-[9px] text-rose-600 font-black uppercase">LOW STOCK</span>}
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono text-slate-600">
                        {item.allocatedToProjects} {item.unit}s
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono text-slate-900 font-bold">
                        ${item.unitCost.toFixed(2)}
                      </td>
                      <td className="py-3.5 px-4 text-slate-700 font-medium">
                        {item.supplierName}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => restockItem(item.id, 50)}
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] rounded-lg shadow-2xs"
                        >
                          + Restock 50
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {activeTab === 'suppliers' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {suppliers.map(sup => (
            <div key={sup.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900">{sup.name}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Contact: {sup.contactPerson}</p>
                </div>
                <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
                  ★ {sup.rating}
                </span>
              </div>
              <div className="text-xs text-slate-600 space-y-1 pt-2 border-t border-slate-100">
                <div>Phone: {sup.phone}</div>
                <div>Email: {sup.email}</div>
                <div className="text-indigo-700 font-bold">Lead Time: {sup.leadTimeDays} business days</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider bg-slate-50">
                <th className="py-3.5 px-4">PO Number</th>
                <th className="py-3.5 px-4">Supplier</th>
                <th className="py-3.5 px-4">Order Date</th>
                <th className="py-3.5 px-4">Expected Delivery</th>
                <th className="py-3.5 px-4 text-right">Total Amount</th>
                <th className="py-3.5 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {purchaseOrders.map(po => (
                <tr key={po.id} className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{po.poNumber}</td>
                  <td className="py-3.5 px-4 text-slate-700">{po.supplierName}</td>
                  <td className="py-3.5 px-4 text-slate-500">{po.orderDate}</td>
                  <td className="py-3.5 px-4 text-slate-500">{po.expectedDelivery}</td>
                  <td className="py-3.5 px-4 text-right font-bold text-emerald-700">${po.totalAmount.toLocaleString()}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                      po.status === 'received' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}>
                      {po.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};
