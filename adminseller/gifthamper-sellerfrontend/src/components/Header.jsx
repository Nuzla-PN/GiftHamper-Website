'use client';

import { useSelector } from 'react-redux';
import { Menu, Bell } from 'lucide-react';

export default function Header({ onMenuClick }) {
  const { seller } = useSelector((state) => state.auth);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Menu className="w-6 h-6 text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold text-gray-800 hidden sm:block">
          Welcome back, {seller?.name || 'Seller'}
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {seller?.name?.charAt(0)?.toUpperCase() || 'S'}
            </span>
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-gray-800">{seller?.name}</p>
            <p className="text-xs text-gray-400">{seller?.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
