'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Tag,
  Gift,
  Package,
  CreditCard,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
];

const managementItems = [
  { href: '/sellers', label: 'Sellers', icon: Users },
  { href: '/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/coupons', label: 'Coupons', icon: Tag },
];

const productItems = [
  { href: '/gift-boxes', label: 'Gift Boxes', icon: Gift },
  { href: '/wrappings', label: 'Wrappings', icon: Package },
  { href: '/greeting-cards', label: 'Greeting Cards', icon: CreditCard },
];

function NavLink({ item, isActive, collapsed }) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      title={collapsed ? item.label : undefined}
      className={`nav-item ${isActive ? 'active' : ''}`}
    >
      <Icon size={20} />
      {!collapsed && <span>{item.label}</span>}
    </Link>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminInfo');
    window.location.href = '/login';
  };

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-white/5">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#8B3A62] flex items-center justify-center">
              <Gift className="text-white" size={18} />
            </div>
            <span className="text-sm font-bold text-white tracking-wide">GIFTHAMPER</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/5 transition-colors"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 overflow-y-auto px-3 space-y-6">
        {/* Overview */}
        <div>
          {!collapsed && (
            <p className="px-4 mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">
              Overview
            </p>
          )}
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              isActive={pathname === item.href}
              collapsed={collapsed}
            />
          ))}
        </div>

        {/* Management */}
        <div>
          {!collapsed && (
            <p className="px-4 mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">
              Management
            </p>
          )}
          {managementItems.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              isActive={pathname === item.href}
              collapsed={collapsed}
            />
          ))}
        </div>

        {/* Products */}
        <div>
          {!collapsed && (
            <p className="px-4 mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">
              Products
            </p>
          )}
          {productItems.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              isActive={pathname === item.href}
              collapsed={collapsed}
            />
          ))}
        </div>
      </nav>

      {/* User Section */}
      <div className="border-t border-white/5 p-4">
        {!collapsed ? (
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-9 h-9 bg-[#8B3A62] flex items-center justify-center text-white text-sm font-bold">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">Admin</p>
              <p className="text-[11px] text-gray-500 truncate">Super Admin</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center mb-3">
            <div className="w-9 h-9 bg-[#8B3A62] flex items-center justify-center text-white text-sm font-bold">
              A
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-colors ${collapsed ? 'justify-center' : ''}`}
          title={collapsed ? 'Logout' : undefined}
        >
          <LogOut size={18} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-[#1a1a2e] text-white flex items-center justify-center"
      >
        <Menu size={20} />
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`lg:hidden fixed left-0 top-0 z-50 h-screen bg-[#1a1a2e] flex flex-col transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ width: '260px' }}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white"
        >
          <X size={18} />
        </button>
        {sidebarContent}
      </aside>

      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex fixed left-0 top-0 z-40 h-screen bg-[#1a1a2e] flex-col transition-all duration-300 ${
          collapsed ? 'w-[72px]' : 'w-[260px]'
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
