"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Package,
  Star,
  MapPin,
  Heart,
  Settings,
  LogOut,
  ChevronRight,
  ShoppingBag,
  HelpCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  {
    label: "Order History",
    icon: Package,
    href: "/account?tab=orders",
    description: "View your past orders",
  },
  {
    label: "My Reviews",
    icon: Star,
    href: "/account?tab=reviews",
    description: "Manage your reviews",
  },
  {
    label: "Saved Addresses",
    icon: MapPin,
    href: "/account?tab=addresses",
    description: "Edit delivery addresses",
  },
  {
    label: "Wishlist",
    icon: Heart,
    href: "/account?tab=wishlist",
    description: "Your saved items",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/account?tab=settings",
    description: "Account preferences",
  },
];

export default function UserProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNav = (href) => {
    setIsOpen(false);
    router.push(href);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="relative p-2 text-gray-700 hover:text-[#8B3A62] transition-colors"
      >
        <User className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-[#FDF5F3] to-white">
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 rounded-full flex items-center justify-center bg-[#8B3A62]">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Guest User
                  </p>
                  <p className="text-xs text-gray-500">Login to view profile</p>
                </div>
              </div>
            </div>

            <div className="py-1">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNav(item.href)}
                  className="w-full flex items-center px-4 py-3 hover:bg-[#FFF8F6] transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-gray-100 group-hover:bg-[#8B3A62] transition-colors">
                    <item.icon className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="ml-3 flex-1 text-left">
                    <p className="text-sm font-medium text-gray-900 group-hover:text-[#8B3A62] transition-colors">
                      {item.label}
                    </p>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#8B3A62] transition-colors" />
                </button>
              ))}
            </div>

            <div className="border-t border-gray-100 py-1">
              <button className="w-full flex items-center px-4 py-3 hover:bg-red-50 transition-colors group">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-gray-100 group-hover:bg-red-100 transition-colors">
                  <LogOut className="w-4 h-4 text-gray-600 group-hover:text-red-600 transition-colors" />
                </div>
                <span className="ml-3 text-sm font-medium text-gray-900 group-hover:text-red-600 transition-colors">
                  Logout
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
