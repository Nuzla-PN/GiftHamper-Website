'use client';

import { Bell, User } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Header() {
  const [adminName, setAdminName] = useState('Admin');

  useEffect(() => {
    const info = localStorage.getItem('adminInfo');
    if (info) {
      try {
        const parsed = JSON.parse(info);
        setAdminName(parsed.name || parsed.email || 'Admin');
      } catch {}
    }
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
      <div />
      <div className="flex items-center gap-4">
        <button className="relative w-9 h-9 flex items-center justify-center text-gray-400 hover:text-[#8B3A62] hover:bg-[#8B3A62]/5 transition-colors">
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <div className="w-px h-8 bg-gray-200" />
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#8B3A62] flex items-center justify-center">
            <User size={16} className="text-white" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-[#1a1a2e] leading-none">{adminName}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
