'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSellerProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../../../features/products/productSlice';
import ProductForm from '../../../components/ProductForm';
import { Plus, Edit2, Trash2, Loader2, ChevronLeft, ChevronRight, Search } from 'lucide-react';

export default function ProductsPage() {
  const dispatch = useDispatch();
  const { items = [], pagination, loading } = useSelector((state) => state.products);

  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    dispatch(fetchSellerProducts({ page: currentPage, limit: 20 }));
  }, [dispatch, currentPage]);

  const handleSave = async (data) => {
    if (editingProduct) {
      await dispatch(updateProduct({ id: editingProduct._id, productData: data }));
    } else {
      await dispatch(createProduct(data));
    }
    setFormOpen(false);
    setEditingProduct(null);
    dispatch(fetchSellerProducts({ page: currentPage, limit: 20 }));
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormOpen(true);
  };

  const handleDelete = async (id) => {
    await dispatch(deleteProduct(id));
    setDeleteConfirm(null);
    dispatch(fetchSellerProducts({ page: currentPage, limit: 20 }));
  };

  const filtered = items.filter(
    (p) =>
      p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.mainCategory?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Products</h1>
          <p className="text-gray-500 mt-1">Manage your gift hamper products</p>
        </div>
        <button
          onClick={() => { setEditingProduct(null); setFormOpen(true); }}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      <div className="card">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="input-field pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading && items.length === 0 ? (
          <div className="flex items-center justify-center h-40">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-gray-400 text-center py-12">No products found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b border-gray-100">
                  <th className="pb-3 font-medium">Image</th>
                  <th className="pb-3 font-medium">Title</th>
                  <th className="pb-3 font-medium">Price</th>
                  <th className="pb-3 font-medium">Stock</th>
                  <th className="pb-3 font-medium">Category</th>
                  <th className="pb-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((product) => (
                  <tr key={product._id} className="border-b border-gray-50 last:border-0">
                    <td className="py-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                        {product.images?.[0] ? (
                          <img
                            src={product.images[0]}
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                            No img
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-3">
                      <p className="font-medium text-gray-800">{product.title}</p>
                      <p className="text-xs text-gray-400 truncate max-w-[200px]">
                        {product.description}
                      </p>
                    </td>
                    <td className="py-3">
                      <span className="font-semibold text-gray-800">₹{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-xs text-gray-400 line-through ml-2">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          product.stock > 10
                            ? 'bg-green-100 text-green-700'
                            : product.stock > 0
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {product.stock} in stock
                      </span>
                    </td>
                    <td className="py-3">
                      <span className="text-gray-600">{product.mainCategory}</span>
                      <br />
                      <span className="text-xs text-gray-400">{product.subCategory}</span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        {deleteConfirm === product._id ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleDelete(product._id)}
                              className="px-2 py-1 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-lg hover:bg-gray-300"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirm(product._id)}
                            className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Page {pagination.page} of {pagination.totalPages}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(pagination.totalPages, p + 1))}
                disabled={currentPage === pagination.totalPages}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      <ProductForm
        isOpen={formOpen}
        onClose={() => { setFormOpen(false); setEditingProduct(null); }}
        product={editingProduct}
        onSave={handleSave}
        loading={loading}
      />
    </div>
  );
}
