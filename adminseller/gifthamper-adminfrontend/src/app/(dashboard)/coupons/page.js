'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
} from '../../../features/coupons/couponSlice';
import { COUPON_TYPES } from '../../../lib/constants';
import Modal from '../../../components/Modal';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const initialForm = {
  code: '',
  type: 'percentage',
  value: '',
  minAmount: '',
  usageLimit: '',
  isActive: true,
};

export default function CouponsPage() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.coupons);
  const [showModal, setShowModal] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    dispatch(fetchCoupons());
  }, [dispatch]);

  const openAdd = () => {
    setEditingCoupon(null);
    setForm(initialForm);
    setShowModal(true);
  };

  const openEdit = (coupon) => {
    setEditingCoupon(coupon);
    setForm({
      code: coupon.code,
      type: coupon.type,
      value: coupon.value,
      minAmount: coupon.minAmount || '',
      usageLimit: coupon.usageLimit || '',
      isActive: coupon.isActive ?? true,
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...form,
      value: Number(form.value),
      minAmount: form.minAmount ? Number(form.minAmount) : undefined,
      usageLimit: form.usageLimit ? Number(form.usageLimit) : undefined,
    };
    if (editingCoupon) {
      dispatch(updateCoupon({ id: editingCoupon._id, ...data }));
    } else {
      dispatch(createCoupon(data));
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this coupon?')) {
      dispatch(deleteCoupon(id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="section-badge">Coupon Management</span>
          <h1 className="text-2xl font-bold text-[#1a1a2e] mt-3">Coupons</h1>
          <p className="text-sm text-gray-500 mt-1">Manage discount coupons</p>
        </div>
        <button onClick={openAdd} className="btn-primary flex items-center gap-2">
          <Plus size={16} /> Add Coupon
        </button>
      </div>

      {loading ? (
        <div className="text-center py-16 text-gray-400 text-sm">Loading coupons...</div>
      ) : (
        <div className="card overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="table-header">
                  <th className="px-6 py-3 text-left">Code</th>
                  <th className="px-6 py-3 text-left">Type</th>
                  <th className="px-6 py-3 text-left">Value</th>
                  <th className="px-6 py-3 text-left hidden md:table-cell">Min Amount</th>
                  <th className="px-6 py-3 text-left">Usage</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.map((coupon) => (
                  <tr key={coupon._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-mono font-bold text-sm text-[#1a1a2e]">
                      {coupon.code}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20">
                        {coupon.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-[#1a1a2e]">
                      {coupon.type === 'percentage' ? `${coupon.value}%` : `$${coupon.value}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                      {coupon.minAmount ? `$${coupon.minAmount}` : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">
                      {coupon.usedCount ?? 0}/{coupon.usageLimit ?? '∞'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`status-pill ${coupon.isActive ? 'status-delivered' : 'status-cancelled'}`}>
                        {coupon.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(coupon)}
                          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-[#8B3A62] hover:bg-[#8B3A62]/5 transition-colors"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(coupon._id)}
                          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {items.length === 0 && (
            <div className="text-center py-12">
              <p className="text-sm text-gray-400">No coupons found</p>
            </div>
          )}
        </div>
      )}

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingCoupon ? 'Edit Coupon' : 'Add Coupon'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-1.5 font-mono">Code</label>
            <input
              type="text"
              value={form.code}
              onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
              required
              className="input-field font-mono"
              placeholder="e.g. SAVE20"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-1.5 font-mono">Type</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="input-field"
              >
                {COUPON_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-1.5 font-mono">Value</label>
              <input
                type="number"
                value={form.value}
                onChange={(e) => setForm({ ...form, value: e.target.value })}
                required
                min="0"
                className="input-field"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-1.5 font-mono">Min Amount</label>
              <input
                type="number"
                value={form.minAmount}
                onChange={(e) => setForm({ ...form, minAmount: e.target.value })}
                min="0"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-1.5 font-mono">Usage Limit</label>
              <input
                type="number"
                value={form.usageLimit}
                onChange={(e) => setForm({ ...form, usageLimit: e.target.value })}
                min="0"
                className="input-field"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <div
              onClick={() => setForm({ ...form, isActive: !form.isActive })}
              className={`relative inline-flex h-6 w-11 cursor-pointer rounded-sm transition-colors ${form.isActive ? 'bg-emerald-500' : 'bg-gray-300'}`}
            >
              <span className={`inline-block h-4 w-4 transform bg-white transition-transform mt-1 ${form.isActive ? 'translate-x-6' : 'translate-x-1'}`} />
            </div>
            <label className="text-sm text-gray-600">Active</label>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button type="button" onClick={() => setShowModal(false)} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {editingCoupon ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
