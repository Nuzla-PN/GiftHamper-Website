'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSellerOrders, updateItemStatus } from '../../../features/orders/orderSlice';
import { ORDER_STATUSES } from '../../../lib/constants';
import {
  ChevronDown,
  ChevronUp,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Inbox,
} from 'lucide-react';

export default function OrdersPage() {
  const dispatch = useDispatch();
  const { items = [], pagination, loading } = useSelector((state) => state.orders);

  const [expandedOrder, setExpandedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchSellerOrders({ page: currentPage, limit: 20 }));
  }, [dispatch, currentPage]);

  const handleStatusChange = (orderId, itemId, status) => {
    dispatch(updateItemStatus({ orderId, itemId, status }));
  };

  const toggleExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const statusClass = (status) => {
    switch (status) {
      case 'delivered': return 'status-delivered';
      case 'shipped': return 'status-shipped';
      case 'processing': return 'status-processing';
      case 'cancelled': return 'status-cancelled';
      default: return 'status-pending';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <span className="section-badge">Orders</span>
        <h1 className="text-2xl font-bold text-gray-900 mt-3">Orders</h1>
        <p className="text-sm text-gray-500 mt-1">Manage orders containing your products</p>
      </div>

      {/* Orders list */}
      <div className="card">
        {loading && items.length === 0 ? (
          <div className="flex items-center justify-center h-40">
            <Loader2 className="w-8 h-8 animate-spin" style={{ color: '#8B3A62' }} />
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-300">
            <Inbox className="w-12 h-12 mb-3" />
            <p className="text-sm text-gray-400">No orders yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((order) => {
              const isExpanded = expandedOrder === order._id;
              return (
                <div
                  key={order._id}
                  className={`border transition-all duration-200 ${
                    isExpanded ? 'border-[#8B3A62]/30' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {/* Order header row */}
                  <div
                    onClick={() => toggleExpand(order._id)}
                    className="flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    {/* Order ID + customer */}
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-xs font-semibold text-gray-500">
                        #{order._id?.slice(-8).toUpperCase()}
                      </p>
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {order.user?.name || order.customerName || 'Customer'}
                      </p>
                    </div>

                    {/* Amount — desktop */}
                    <div className="text-right hidden sm:block">
                      <p className="font-bold text-gray-900">
                        ₹{order.totalAmount?.toLocaleString() || 0}
                      </p>
                      <p className="text-[10px] text-gray-400">
                        {order.items?.length || 0} item{(order.items?.length || 0) !== 1 ? 's' : ''}
                      </p>
                    </div>

                    {/* Status */}
                    <span className={`status-pill ${statusClass(order.status)}`}>
                      {order.status || 'pending'}
                    </span>

                    {/* Date — desktop */}
                    <span className="text-xs text-gray-400 hidden md:block min-w-[80px] text-right">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>

                    {/* Amount — mobile */}
                    <p className="font-bold text-gray-900 text-sm sm:hidden">
                      ₹{order.totalAmount?.toLocaleString() || 0}
                    </p>

                    {/* Expand icon */}
                    <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                  </div>

                  {/* Expanded items */}
                  {isExpanded && (
                    <div className="border-t border-gray-100 p-4 bg-gray-50/50">
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-3">
                        Order Items
                      </p>
                      <div className="space-y-2">
                        {order.items?.map((item) => (
                          <div
                            key={item._id}
                            className="flex items-center justify-between bg-white border border-gray-100 p-3"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gray-100 overflow-hidden flex-shrink-0">
                                {item.product?.images?.[0] || item.image ? (
                                  <img
                                    src={item.product?.images?.[0] || item.image}
                                    alt={item.product?.title || item.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-gray-300 text-[9px] font-bold">
                                    IMG
                                  </div>
                                )}
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-800">
                                  {item.product?.title || item.name || 'Product'}
                                </p>
                                <p className="text-xs text-gray-400">
                                  Qty: {item.quantity} × ₹{item.price}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <select
                                value={item.status || 'pending'}
                                onChange={(e) =>
                                  handleStatusChange(order._id, item._id, e.target.value)
                                }
                                className="input-field text-xs py-1.5 px-2 w-auto min-w-[100px]"
                              >
                                {ORDER_STATUSES.map((status) => (
                                  <option key={status} value={status}>
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                  </option>
                                ))}
                              </select>
                              <span className={`status-pill ${statusClass(item.status)}`}>
                                {item.status || 'pending'}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
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
    </div>
  );
}
