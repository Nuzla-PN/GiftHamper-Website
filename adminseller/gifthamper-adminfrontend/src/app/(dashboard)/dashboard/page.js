'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboard } from '../../../features/auth/authSlice';
import { Users, Package, ShoppingCart, DollarSign } from 'lucide-react';
import StatsCard from '../../../components/StatsCard';

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { dashboard, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getDashboard());
  }, [dispatch]);

  const stats = dashboard || {};

  return (
    <div className="space-y-6">
      <div>
        <span className="section-badge">Admin Dashboard</span>
        <h1 className="text-2xl font-bold text-[#1a1a2e] mt-3">Dashboard Overview</h1>
        <p className="text-sm text-gray-500 mt-1">Welcome to the GiftHamper admin panel</p>
      </div>

      {loading ? (
        <div className="text-center py-16 text-gray-400 text-sm">Loading dashboard...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard
              icon={Users}
              label="Total Sellers"
              value={stats.totalSellers ?? 0}
              color="primary"
            />
            <StatsCard
              icon={Package}
              label="Total Products"
              value={stats.totalProducts ?? 0}
              color="secondary"
            />
            <StatsCard
              icon={ShoppingCart}
              label="Total Orders"
              value={stats.totalOrders ?? 0}
              color="blue"
            />
            <StatsCard
              icon={DollarSign}
              label="Total Revenue"
              value={`$${(stats.totalRevenue ?? 0).toLocaleString()}`}
              color="green"
            />
          </div>

          {/* Recent Orders */}
          <div className="card">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#1a1a2e]">Recent Orders</h2>
              <a href="/orders" className="text-xs font-semibold text-[#8B3A62] hover:underline">View All</a>
            </div>
            {stats.recentOrders && stats.recentOrders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="table-header">
                      <th className="px-4 py-3 text-left">Order ID</th>
                      <th className="px-4 py-3 text-left">Date</th>
                      <th className="px-4 py-3 text-left">Amount</th>
                      <th className="px-4 py-3 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {stats.recentOrders.map((order) => (
                      <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-sm font-mono font-semibold text-[#1a1a2e]">
                          #{order._id?.slice(-8) || 'N/A'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-sm font-semibold text-[#1a1a2e]">
                          ${(order.totalAmount || order.total || 0).toLocaleString()}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`status-pill status-${order.status}`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <ShoppingCart className="mx-auto text-gray-300 mb-3" size={40} />
                <p className="text-sm text-gray-400">No recent orders found</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
