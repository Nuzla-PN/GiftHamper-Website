'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSellers, toggleSellerActive } from '../../../features/sellers/sellerSlice';
import DataTable from '../../../components/DataTable';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

export default function SellersPage() {
  const dispatch = useDispatch();
  const { items, pagination, loading } = useSelector((state) => state.sellers);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchSellers({ page, limit: 20 }));
  }, [dispatch, page]);

  const handleToggle = (id) => {
    dispatch(toggleSellerActive(id));
  };

  const headers = ['Name', 'Email', 'Products', 'Rating', 'Status', 'Actions'];

  const rows = items.map((seller) => (
    <tr key={seller._id} className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#8B3A62]/10 flex items-center justify-center text-[#8B3A62] font-bold text-sm">
            {seller.name?.charAt(0)?.toUpperCase() || 'S'}
          </div>
          <span className="text-sm font-semibold text-[#1a1a2e]">{seller.name}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{seller.email}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
        {seller.productsCount ?? seller.products?.length ?? 0}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-1 text-sm text-[#D4AF37]">
          <Star size={14} fill="currentColor" />
          <span className="font-semibold">{seller.rating?.toFixed(1) ?? '0.0'}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`status-pill ${seller.isActive || seller.active ? 'status-delivered' : 'status-cancelled'}`}>
          {seller.isActive || seller.active ? 'Active' : 'Inactive'}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <button
          onClick={() => handleToggle(seller._id)}
          className={`relative inline-flex h-6 w-11 items-center rounded-sm transition-colors ${
            seller.isActive || seller.active ? 'bg-emerald-500' : 'bg-gray-300'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform bg-white transition-transform ${
              seller.isActive || seller.active ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </td>
    </tr>
  ));

  return (
    <div className="space-y-6">
      <div>
        <span className="section-badge">Seller Management</span>
        <h1 className="text-2xl font-bold text-[#1a1a2e] mt-3">Sellers</h1>
        <p className="text-sm text-gray-500 mt-1">Manage all registered sellers</p>
      </div>

      {loading ? (
        <div className="text-center py-16 text-gray-400 text-sm">Loading sellers...</div>
      ) : (
        <DataTable headers={headers} rows={rows} pagination={pagination} onPageChange={setPage} />
      )}
    </div>
  );
}
