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
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500">Welcome to GiftHamper Admin Panel</p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading dashboard...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

          {stats.recentOrders && stats.recentOrders.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Orders</h2>
              <div className="space-y-3">
                {stats.recentOrders.map((order) => (
                  <div
                    key={order._id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-800">
                        Order #{order._id?.slice(-8) || 'N/A'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">
                        ${(order.totalAmount || order.total || 0).toLocaleString()}
                      </p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          order.status === 'delivered'
                            ? 'bg-green-100 text-green-700'
                            : order.status === 'cancelled'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
