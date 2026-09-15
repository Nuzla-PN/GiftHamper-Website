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
    <header className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold text-gray-800">Welcome back, {adminName}</h2>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-500 hover:text-primary transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <User size={16} className="text-white" />
          </div>
          <span className="text-sm font-medium text-gray-700">{adminName}</span>
        </div>
      </div>
    </header>
  );
}
