'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchGiftBoxes,
  createGiftBox,
  updateGiftBox,
  deleteGiftBox,
} from '../../../features/addons/addonSlice';
import Modal from '../../../components/Modal';
import { Plus, Edit2, Trash2, Gift } from 'lucide-react';

const initialForm = {
  name: '',
  price: '',
  description: '',
  image: '',
  features: '',
};

export default function GiftBoxesPage() {
  const dispatch = useDispatch();
  const { giftBoxes, loading } = useSelector((state) => state.addons);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    dispatch(fetchGiftBoxes());
  }, [dispatch]);

  const openAdd = () => {
    setEditingItem(null);
    setForm(initialForm);
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setForm({
      name: item.name || '',
      price: item.price || '',
      description: item.description || '',
      image: item.image || '',
      features: Array.isArray(item.features) ? item.features.join(', ') : item.features || '',
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...form,
      price: Number(form.price),
      features: form.features
        ? form.features.split(',').map((f) => f.trim()).filter(Boolean)
        : [],
    };
    if (editingItem) {
      dispatch(updateGiftBox({ id: editingItem._id, ...data }));
    } else {
      dispatch(createGiftBox(data));
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this gift box?')) {
      dispatch(deleteGiftBox(id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="section-badge">Gift Box Management</span>
          <h1 className="text-2xl font-bold text-[#1a1a2e] mt-3">Gift Boxes</h1>
          <p className="text-sm text-gray-500 mt-1">Manage gift box products</p>
        </div>
        <button onClick={openAdd} className="btn-primary flex items-center gap-2">
          <Plus size={16} /> Add Gift Box
        </button>
      </div>

      {loading ? (
        <div className="text-center py-16 text-gray-400 text-sm">Loading gift boxes...</div>
      ) : giftBoxes.length === 0 ? (
        <div className="card text-center py-16">
          <Gift className="mx-auto text-gray-300 mb-3" size={40} />
          <p className="text-sm text-gray-400">No gift boxes found</p>
          <button onClick={openAdd} className="btn-primary mt-4">Add First Gift Box</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {giftBoxes.map((item) => (
            <div key={item._id} className="card p-0 overflow-hidden group">
              <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Gift className="text-gray-300" size={32} />
                  </div>
                )}
                <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => openEdit(item)}
                    className="w-8 h-8 bg-white/90 backdrop-blur flex items-center justify-center text-gray-600 hover:text-[#8B3A62] transition-colors"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="w-8 h-8 bg-white/90 backdrop-blur flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-[#1a1a2e]">{item.name}</h3>
                  <span className="text-sm font-bold text-[#D4AF37] whitespace-nowrap">${item.price}</span>
                </div>
                {item.description && (
                  <p className="text-xs text-gray-500 line-clamp-2 mb-3">{item.description}</p>
                )}
                {Array.isArray(item.features) && item.features.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {item.features.slice(0, 3).map((f, i) => (
                      <span key={i} className="px-2 py-0.5 text-[10px] font-medium bg-gray-100 text-gray-600">
                        {f}
                      </span>
                    ))}
                    {item.features.length > 3 && (
                      <span className="px-2 py-0.5 text-[10px] font-medium bg-gray-100 text-gray-600">
                        +{item.features.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingItem ? 'Edit Gift Box' : 'Add Gift Box'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-1.5 font-mono">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-1.5 font-mono">Price</label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
              min="0"
              step="0.01"
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-1.5 font-mono">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="input-field resize-none"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-1.5 font-mono">Image URL</label>
            <input
              type="text"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-1.5 font-mono">Features (comma separated)</label>
            <input
              type="text"
              value={form.features}
              onChange={(e) => setForm({ ...form, features: e.target.value })}
              className="input-field"
              placeholder="e.g. Premium box, Ribbon, Tissue paper"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button type="button" onClick={() => setShowModal(false)} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary">{editingItem ? 'Update' : 'Create'}</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
