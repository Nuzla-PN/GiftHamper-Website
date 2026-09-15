'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSellerOrders, updateItemStatus } from '../../../features/orders/orderSlice';
import { ORDER_STATUSES } from '../../../lib/constants';
import { ChevronDown, ChevronUp, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';

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

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'shipped':
        return 'bg-blue-100 text-blue-700';
      case 'processing':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
        <p className="text-gray-500 mt-1">Manage orders containing your products</p>
      </div>

      <div className="card">
        {loading && items.length === 0 ? (
          <div className="flex items-center justify-center h-40">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : items.length === 0 ? (
          <p className="text-gray-400 text-center py-12">No orders yet</p>
        ) : (
          <div className="space-y-4">
            {items.map((order) => (
              <div
                key={order._id}
                className="border border-gray-100 rounded-xl overflow-hidden"
              >
                <div
                  onClick={() => toggleExpand(order._id)}
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="hidden sm:block">
                      <p className="font-mono text-xs text-gray-400">
                        #{order._id?.slice(-8).toUpperCase()}
                      </p>
                      <p className="font-medium text-gray-800 truncate">
                        {order.user?.name || order.customerName || 'Customer'}
                      </p>
                    </div>
                    <div className="sm:hidden">
                      <p className="font-medium text-gray-800 text-sm">
                        #{order._id?.slice(-8).toUpperCase()}
                      </p>
                      <p className="text-xs text-gray-400">
                        {order.user?.name || order.customerName || 'Customer'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <p className="font-semibold text-gray-800">
                        ₹{order.totalAmount?.toLocaleString() || 0}
                      </p>
                      <p className="text-xs text-gray-400">
                        {order.items?.length || 0} item(s)
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status || 'pending'}
                    </span>
                    <span className="text-xs text-gray-400 hidden md:block">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                    {expandedOrder === order._id ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>

                {expandedOrder === order._id && (
                  <div className="border-t border-gray-100 p-4 bg-gray-50">
                    <div className="sm:hidden mb-3">
                      <p className="font-semibold text-gray-800">
                        ₹{order.totalAmount?.toLocaleString() || 0}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Order Items</h4>
                    <div className="space-y-3">
                      {order.items?.map((item) => (
                        <div
                          key={item._id}
                          className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-100"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden">
                              {item.product?.images?.[0] || item.image ? (
                                <img
                                  src={item.product?.images?.[0] || item.image}
                                  alt={item.product?.title || item.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
                                  IMG
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-800">
                                {item.product?.title || item.name || 'Product'}
                              </p>
                              <p className="text-xs text-gray-400">
                                Qty: {item.quantity} × ₹{item.price}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <select
                              value={item.status || 'pending'}
                              onChange={(e) =>
                                handleStatusChange(order._id, item._id, e.target.value)
                              }
                              className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                            >
                              {ORDER_STATUSES.map((status) => (
                                <option key={status} value={status}>
                                  {status.charAt(0).toUpperCase() + status.slice(1)}
                                </option>
                              ))}
                            </select>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                item.status
                              )}`}
                            >
                              {item.status || 'pending'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
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
    </div>
  );
}
