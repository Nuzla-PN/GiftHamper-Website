'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSellers, toggleSellerActive } from '../../../features/sellers/sellerSlice';
import DataTable from '../../../components/DataTable';
import { Star, ToggleLeft, ToggleRight } from 'lucide-react';

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
    <tr key={seller._id} className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{seller.name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{seller.email}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{seller.productsCount ?? seller.products?.length ?? 0}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-1 text-sm text-secondary">
          <Star size={14} fill="currentColor" />
          <span>{seller.rating?.toFixed(1) ?? '0.0'}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            seller.isActive || seller.active
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {seller.isActive || seller.active ? 'Active' : 'Inactive'}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <button
          onClick={() => handleToggle(seller._id)}
          className="text-gray-500 hover:text-primary transition-colors"
        >
          {seller.isActive || seller.active ? (
            <ToggleRight size={24} className="text-green-500" />
          ) : (
            <ToggleLeft size={24} className="text-red-500" />
          )}
        </button>
      </td>
    </tr>
  ));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Sellers</h1>
        <p className="text-gray-500">Manage all registered sellers</p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading sellers...</div>
      ) : (
        <DataTable headers={headers} rows={rows} pagination={pagination} onPageChange={setPage} />
      )}
    </div>
  );
}
