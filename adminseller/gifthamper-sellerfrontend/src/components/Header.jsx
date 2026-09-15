'use client';

import { useSelector } from 'react-redux';
import { Menu, Bell, ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

const pageTitles = {
  '/dashboard': { title: 'Dashboard', breadcrumb: 'Overview' },
  '/products': { title: 'Products', breadcrumb: 'Manage Products' },
  '/orders': { title: 'Orders', breadcrumb: 'Manage Orders' },
  '/profile': { title: 'Profile', breadcrumb: 'Account Settings' },
};

export default function Header({ onMenuClick }) {
  const { seller } = useSelector((state) => state.auth);
  const pathname = usePathname();
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  const page = pageTitles[pathname] || { title: 'Dashboard', breadcrumb: 'Overview' };

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Left: title + breadcrumb */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 -ml-2 hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>

          <div className="hidden sm:block">
            <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400 mb-0.5">
              <span>Seller</span>
              <ChevronRight className="w-3 h-3" />
              <span style={{ color: '#8B3A62' }}>{page.breadcrumb}</span>
            </div>
            <h1 className="text-lg font-bold text-gray-900">{page.title}</h1>
          </div>
        </div>

        {/* Right: notification + profile */}
        <div className="flex items-center gap-2">
          <button className="relative p-2.5 hover:bg-gray-100 transition-colors">
            <Bell className="w-5 h-5 text-gray-500" />
            <span
              className="absolute top-2 right-2 w-2 h-2 rounded-full"
              style={{ background: '#EF4444' }}
            />
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-3 pl-3 pr-2 py-1.5 hover:bg-gray-100 transition-colors"
            >
              <div className="hidden sm:block text-right">
                <p className="text-sm font-semibold text-gray-800 leading-tight">
                  {seller?.name || 'Seller'}
                </p>
                <p className="text-[10px] text-gray-400">{seller?.email}</p>
              </div>
              <div
                className="w-9 h-9 flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                style={{ background: '#8B3A62' }}
              >
                {seller?.name?.charAt(0)?.toUpperCase() || 'S'}
              </div>
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-full mt-1 w-56 bg-white border border-gray-200 shadow-lg z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-800">{seller?.name}</p>
                  <p className="text-xs text-gray-400">{seller?.email}</p>
                </div>
                <a
                  href="/profile"
                  className="block px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Account Settings
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
