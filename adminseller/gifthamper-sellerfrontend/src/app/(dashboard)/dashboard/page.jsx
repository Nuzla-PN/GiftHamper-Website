'use client';

import { useEffect, useState } from 'react';
import { Package, ShoppingCart, DollarSign, Inbox } from 'lucide-react';
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
        <div
          className="w-10 h-10 border-3 border-t-transparent rounded-full animate-spin"
          style={{ borderColor: '#8B3A62', borderTopColor: 'transparent', borderWidth: '3px' }}
        />
      </div>
    );
  }

  const statCards = [
    {
      label: 'PRODUCTS',
      value: stats.products,
      icon: Package,
      variant: 'blue',
    },
    {
      label: 'ORDERS',
      value: stats.orders,
      icon: ShoppingCart,
      variant: 'gold',
    },
    {
      label: 'REVENUE',
      value: `₹${stats.revenue.toLocaleString()}`,
      icon: DollarSign,
      variant: 'green',
    },
  ];

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
      {/* Section badge */}
      <div>
        <span className="section-badge">Overview</span>
        <h1 className="text-2xl font-bold text-gray-900 mt-3">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Your gift hamper business at a glance</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className={`stat-card ${card.variant}`}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                  {card.label}
                </p>
                <div
                  className="w-10 h-10 flex items-center justify-center"
                  style={{ background: '#FDF5F3' }}
                >
                  <Icon className="w-5 h-5" style={{ color: '#8B3A62' }} />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900">{card.value}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <span className="section-badge">Recent Orders</span>
          <a
            href="/orders"
            className="text-xs font-semibold uppercase tracking-[0.1em] hover:underline"
            style={{ color: '#8B3A62' }}
          >
            View All
          </a>
        </div>

        {recentOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-300">
            <Inbox className="w-12 h-12 mb-3" />
            <p className="text-sm text-gray-400">No orders yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="table-header">
                  <th className="text-left px-4 py-3 font-semibold">Order ID</th>
                  <th className="text-left px-4 py-3 font-semibold">Customer</th>
                  <th className="text-left px-4 py-3 font-semibold">Amount</th>
                  <th className="text-left px-4 py-3 font-semibold">Status</th>
                  <th className="text-left px-4 py-3 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3.5 font-mono text-xs font-semibold text-gray-600">
                      #{order._id?.slice(-8).toUpperCase()}
                    </td>
                    <td className="px-4 py-3.5 text-gray-700">
                      {order.user?.name || order.customerName || 'N/A'}
                    </td>
                    <td className="px-4 py-3.5 font-semibold text-gray-900">
                      ₹{order.totalAmount?.toLocaleString() || 0}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`status-pill ${statusClass(order.status)}`}>
                        {order.status || 'pending'}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-gray-400 text-xs">
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
