'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, updateOrderStatus } from '../../../features/orders/orderSlice';
import { ORDER_STATUSES } from '../../../lib/constants';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function OrdersPage() {
  const dispatch = useDispatch();
  const { items, pagination, loading } = useSelector((state) => state.orders);
  const [page, setPage] = useState(1);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    dispatch(fetchOrders({ page, limit: 20 }));
  }, [dispatch, page]);

  const handleStatusChange = (orderId, status) => {
    dispatch(updateOrderStatus({ orderId, status }));
  };

  return (
    <div className="space-y-6">
      <div>
        <span className="section-badge">Order Management</span>
        <h1 className="text-2xl font-bold text-[#1a1a2e] mt-3">Orders</h1>
        <p className="text-sm text-gray-500 mt-1">Manage all customer orders</p>
      </div>

      {loading ? (
        <div className="text-center py-16 text-gray-400 text-sm">Loading orders...</div>
      ) : (
        <div className="card overflow-hidden p-0">
          <div className="divide-y divide-gray-100">
            {items.map((order) => (
              <div key={order._id} className="p-4 hover:bg-gray-50 transition-colors">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
                >
                  <div className="flex-1 grid grid-cols-2 md:grid-cols-5 gap-4 items-center">
                    <div>
                      <p className="text-sm font-mono font-bold text-[#1a1a2e]">
                        #{order._id?.slice(-8) || 'N/A'}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#1a1a2e]">
                        {order.customer?.name || order.user?.name || 'N/A'}
                      </p>
                      <p className="text-xs text-gray-400 truncate max-w-[160px]">
                        {order.customer?.email || order.user?.email || ''}
                      </p>
                    </div>
                    <div className="hidden md:block">
                      <p className="text-sm font-mono text-gray-500">
                        {order.items?.length ?? 0} item(s)
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#1a1a2e]">
                        ${(order.totalAmount || order.total || 0).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <span className={`status-pill status-${order.status}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                  <button className="ml-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-[#8B3A62] transition-colors">
                    {expandedOrder === order._id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                </div>

                {expandedOrder === order._id && (
                  <div className="mt-4 ml-4 pl-4 border-l-2 border-[#8B3A62]/20 space-y-3 bg-gray-50 p-4">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {item.name || item.product?.name || `Item ${idx + 1}`}
                          <span className="text-gray-400 ml-1">x{item.quantity}</span>
                        </span>
                        <span className="font-semibold text-[#1a1a2e]">
                          ${((item.price || item.product?.price || 0) * (item.quantity || 1)).toLocaleString()}
                        </span>
                      </div>
                    ))}
                    <div className="pt-3 border-t border-gray-200 flex items-center gap-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Update Status</span>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className="input-field !w-auto !py-1.5 !text-xs"
                      >
                        {ORDER_STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t border-gray-200">
              <div className="text-xs font-mono text-gray-500">
                Page {page} of {pagination.totalPages}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page <= 1}
                  className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-30 transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page >= pagination.totalPages}
                  className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-30 transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
