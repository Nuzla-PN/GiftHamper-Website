'use client';

import { useEffect, useState } from 'react';
import { Package, ShoppingCart, DollarSign, TrendingUp } from 'lucide-react';
import api from '../../../lib/axios';

export default function DashboardPage() {
  const [stats, setStats] = useState({ products: 0, orders: 0, revenue: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [productsRes, ordersRes] = await Promise.all([
          api.get('/products?limit=1'),
          api.get('/orders?limit=5'),
        ]);

        const totalProducts = productsRes.data.total || productsRes.data.data?.length || 0;
        const orders = ordersRes.data.data || ordersRes.data.orders || [];
        const totalOrders = ordersRes.data.total || orders.length;

        let revenue = 0;
        orders.forEach((order) => {
          if (order.totalAmount) revenue += order.totalAmount;
        });

        setStats({ products: totalProducts, orders: totalOrders, revenue });
        setRecentOrders(orders.slice(0, 5));
      } catch (err) {
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Products',
      value: stats.products,
      icon: Package,
      color: 'bg-blue-50 text-blue-600',
      iconBg: 'bg-blue-100',
    },
    {
      title: 'Total Orders',
      value: stats.orders,
      icon: ShoppingCart,
      color: 'bg-green-50 text-green-600',
      iconBg: 'bg-green-100',
    },
    {
      title: 'Revenue',
      value: `₹${stats.revenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-secondary-50 text-secondary-600',
      iconBg: 'bg-secondary-100',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 mt-1">Overview of your gift hamper business</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="card flex items-center gap-4">
              <div className={`w-12 h-12 ${stat.iconBg} rounded-xl flex items-center justify-center`}>
                <Icon className={`w-6 h-6 ${stat.color.split(' ')[1]}`} />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
          <a href="/orders" className="text-sm text-primary hover:text-primary-600 font-medium">
            View All
          </a>
        </div>

        {recentOrders.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No orders yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b border-gray-100">
                  <th className="pb-3 font-medium">Order ID</th>
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order._id} className="border-b border-gray-50 last:border-0">
                    <td className="py-3 font-mono text-xs">
                      #{order._id?.slice(-8).toUpperCase()}
                    </td>
                    <td className="py-3">{order.user?.name || order.customerName || 'N/A'}</td>
                    <td className="py-3 font-medium">₹{order.totalAmount?.toLocaleString() || 0}</td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === 'delivered'
                            ? 'bg-green-100 text-green-700'
                            : order.status === 'shipped'
                            ? 'bg-blue-100 text-blue-700'
                            : order.status === 'processing'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {order.status || 'pending'}
                      </span>
                    </td>
                    <td className="py-3 text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
