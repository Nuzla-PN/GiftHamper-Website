'use client';

import { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import { CATEGORIES } from '../lib/constants';

const defaultProduct = {
  title: '',
  description: '',
  price: '',
  originalPrice: '',
  stock: '',
  mainCategory: 'Occasion',
  subCategory: '',
  tags: '',
  isFeatured: false,
  customizable: false,
  images: [],
};

export default function ProductForm({ isOpen, onClose, product, onSave, loading }) {
  const [form, setForm] = useState(defaultProduct);

  useEffect(() => {
    if (product) {
      setForm({
        title: product.title || '',
        description: product.description || '',
        price: product.price || '',
        originalPrice: product.originalPrice || '',
        stock: product.stock || '',
        mainCategory: product.mainCategory || 'Occasion',
        subCategory: product.subCategory || '',
        tags: Array.isArray(product.tags) ? product.tags.join(', ') : product.tags || '',
        isFeatured: product.isFeatured || false,
        customizable: product.customizable || false,
        images: product.images || [],
      });
    } else {
      setForm(defaultProduct);
    }
  }, [product, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...form,
      price: Number(form.price),
      originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
      stock: Number(form.stock),
      tags: form.tags
        ? form.tags.split(',').map((t) => t.trim()).filter(Boolean)
        : [],
    };
    onSave(data);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">
            {product ? 'Edit Product' : 'Add New Product'}
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input
              type="text"
              name="title"
              required
              className="input-field"
              placeholder="Premium Gift Hamper"
              value={form.title}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
            <textarea
              name="description"
              required
              rows={3}
              className="input-field"
              placeholder="Describe your gift hamper..."
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
              <input
                type="number"
                name="price"
                required
                min="0"
                step="0.01"
                className="input-field"
                placeholder="999"
                value={form.price}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Original Price</label>
              <input
                type="number"
                name="originalPrice"
                min="0"
                step="0.01"
                className="input-field"
                placeholder="1499"
                value={form.originalPrice}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stock *</label>
            <input
              type="number"
              name="stock"
              required
              min="0"
              className="input-field"
              placeholder="50"
              value={form.stock}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Main Category *</label>
              <select
                name="mainCategory"
                required
                className="input-field"
                value={form.mainCategory}
                onChange={handleChange}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sub Category *</label>
              <input
                type="text"
                name="subCategory"
                required
                className="input-field"
                placeholder="Birthday, Anniversary..."
                value={form.subCategory}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              name="tags"
              className="input-field"
              placeholder="premium, luxury, festive"
              value={form.tags}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="isFeatured"
                checked={form.isFeatured}
                onChange={handleChange}
                className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
              />
              <span className="text-sm font-medium text-gray-700">Featured</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="customizable"
                checked={form.customizable}
                onChange={handleChange}
                className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
              />
              <span className="text-sm font-medium text-gray-700">Customizable</span>
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button type="button" onClick={onClose} className="btn-outline">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2">
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {product ? 'Update Product' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
