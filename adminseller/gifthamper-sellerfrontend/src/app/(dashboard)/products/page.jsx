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
import {
  Plus,
  Edit2,
  Trash2,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Search,
  Inbox,
} from 'lucide-react';

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

  const stockStatus = (stock) => {
    if (stock > 10) return 'status-delivered';
    if (stock > 0) return 'status-processing';
    return 'status-cancelled';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="section-badge">Products</span>
          <h1 className="text-2xl font-bold text-gray-900 mt-3">Products</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your gift hamper catalog</p>
        </div>
        <button
          onClick={() => {
            setEditingProduct(null);
            setFormOpen(true);
          }}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Table card */}
      <div className="card">
        {/* Search */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="input-field pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <p className="text-xs text-gray-400 hidden sm:block">
            {filtered.length} product{filtered.length !== 1 ? 's' : ''}
          </p>
        </div>

        {loading && items.length === 0 ? (
          <div className="flex items-center justify-center h-40">
            <Loader2 className="w-8 h-8 animate-spin" style={{ color: '#8B3A62' }} />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-300">
            <Inbox className="w-12 h-12 mb-3" />
            <p className="text-sm text-gray-400">No products found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="table-header">
                  <th className="text-left px-4 py-3 font-semibold">Image</th>
                  <th className="text-left px-4 py-3 font-semibold">Title</th>
                  <th className="text-left px-4 py-3 font-semibold">Price</th>
                  <th className="text-left px-4 py-3 font-semibold">Stock</th>
                  <th className="text-left px-4 py-3 font-semibold">Category</th>
                  <th className="text-right px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((product) => (
                  <tr
                    key={product._id}
                    className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="w-11 h-11 bg-gray-100 overflow-hidden">
                        {product.images?.[0] ? (
                          <img
                            src={product.images[0]}
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300 text-[10px] font-bold uppercase">
                            No img
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-gray-800">{product.title}</p>
                      <p className="text-xs text-gray-400 truncate max-w-[200px]">
                        {product.description}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-bold text-gray-900">₹{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-xs text-gray-400 line-through ml-2">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`status-pill ${stockStatus(product.stock)}`}>
                        {product.stock} in stock
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-gray-600 text-sm">{product.mainCategory}</span>
                      <br />
                      <span className="text-xs text-gray-400">{product.subCategory}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 hover:bg-blue-50 text-blue-600 transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        {deleteConfirm === product._id ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleDelete(product._id)}
                              className="px-3 py-1.5 bg-red-500 text-white text-xs font-semibold hover:bg-red-600 transition-colors"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="px-3 py-1.5 bg-gray-200 text-gray-600 text-xs font-semibold hover:bg-gray-300 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirm(product._id)}
                            className="p-2 hover:bg-red-50 text-red-500 transition-colors"
                            title="Delete"
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

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              Page {pagination.page} of {pagination.totalPages}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: Math.min(pagination.totalPages, 5) }, (_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 text-xs font-semibold transition-colors ${
                      currentPage === page
                        ? 'text-white'
                        : 'text-gray-500 hover:bg-gray-100'
                    }`}
                    style={currentPage === page ? { background: '#8B3A62' } : {}}
                  >
                    {page}
                  </button>
                );
              })}
              <button
                onClick={() => setCurrentPage((p) => Math.min(pagination.totalPages, p + 1))}
                disabled={currentPage === pagination.totalPages}
                className="p-2 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      <ProductForm
        isOpen={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditingProduct(null);
        }}
        product={editingProduct}
        onSave={handleSave}
        loading={loading}
      />
    </div>
  );
}
