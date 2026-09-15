'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchWrappings,
  createWrapping,
  updateWrapping,
  deleteWrapping,
} from '../../../features/addons/addonSlice';
import Modal from '../../../components/Modal';
import { Plus, Edit2, Trash2, Package } from 'lucide-react';

const initialForm = {
  name: '',
  price: '',
  description: '',
  image: '',
  color: '',
};

export default function WrappingsPage() {
  const dispatch = useDispatch();
  const { wrappings, loading } = useSelector((state) => state.addons);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    dispatch(fetchWrappings());
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
      color: item.color || '',
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...form, price: Number(form.price) };
    if (editingItem) {
      dispatch(updateWrapping({ id: editingItem._id, ...data }));
    } else {
      dispatch(createWrapping(data));
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this wrapping?')) {
      dispatch(deleteWrapping(id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="section-badge">Wrapping Management</span>
          <h1 className="text-2xl font-bold text-[#1a1a2e] mt-3">Wrappings</h1>
          <p className="text-sm text-gray-500 mt-1">Manage wrapping options</p>
        </div>
        <button onClick={openAdd} className="btn-primary flex items-center gap-2">
          <Plus size={16} /> Add Wrapping
        </button>
      </div>

      {loading ? (
        <div className="text-center py-16 text-gray-400 text-sm">Loading wrappings...</div>
      ) : wrappings.length === 0 ? (
        <div className="card text-center py-16">
          <Package className="mx-auto text-gray-300 mb-3" size={40} />
          <p className="text-sm text-gray-400">No wrappings found</p>
          <button onClick={openAdd} className="btn-primary mt-4">Add First Wrapping</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {wrappings.map((item) => (
            <div key={item._id} className="card p-0 overflow-hidden group">
              <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="text-gray-300" size={32} />
                  </div>
                )}
                {item.color && (
                  <div className="absolute top-3 left-3">
                    <div className="w-6 h-6 rounded-full border-2 border-white shadow" style={{ backgroundColor: item.color }} />
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
                  <p className="text-xs text-gray-500 line-clamp-2">{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingItem ? 'Edit Wrapping' : 'Add Wrapping'}
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
          <div className="grid grid-cols-2 gap-4">
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
              <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-1.5 font-mono">Color</label>
              <input
                type="color"
                value={form.color || '#000000'}
                onChange={(e) => setForm({ ...form, color: e.target.value })}
                className="w-full h-[38px] border border-gray-200 cursor-pointer"
              />
            </div>
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
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button type="button" onClick={() => setShowModal(false)} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary">{editingItem ? 'Update' : 'Create'}</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
