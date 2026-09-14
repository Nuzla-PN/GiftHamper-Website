"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  Package,
  Star,
  MapPin,
  Heart,
  User,
  Settings,
  ChevronRight,
  Clock,
  Truck,
  CheckCircle,
  Plus,
  Trash2,
  Edit3,
  ShoppingBag,
} from "lucide-react";
import { removeFromWishlist } from "../../features/wishlist/wishlistSlice";
import { addtoCart } from "../../features/cart/cartSlice";

const tabs = [
  { id: "orders", label: "Order History", icon: Package },
  { id: "reviews", label: "My Reviews", icon: Star },
  { id: "addresses", label: "Saved Addresses", icon: MapPin },
  { id: "wishlist", label: "Wishlist", icon: Heart },
];

const mockOrders = [
  {
    id: "ORD-2024-001",
    date: "2024-12-15",
    items: [
      { name: "Luxury Chocolate Hamper", price: 1299, qty: 1 },
      { name: "Dry Fruit Delight Box", price: 899, qty: 1 },
    ],
    total: 2198,
    status: "delivered",
    image: "/images/h1.png",
  },
  {
    id: "ORD-2024-002",
    date: "2024-12-10",
    items: [{ name: "Birthday Surprise Hamper", price: 1599, qty: 1 }],
    total: 1599,
    status: "shipped",
    image: "/images/h2.png",
  },
  {
    id: "ORD-2024-003",
    date: "2024-11-28",
    items: [
      { name: "Wellness Self-Care Kit", price: 999, qty: 2 },
    ],
    total: 1998,
    status: "delivered",
    image: "/images/h3.png",
  },
];

const mockReviews = [
  {
    id: 1,
    product: "Luxury Chocolate Hamper",
    rating: 5,
    date: "2024-12-18",
    comment:
      "Amazing quality! The chocolates were fresh and beautifully packaged. Perfect gift for my mom.",
  },
  {
    id: 2,
    product: "Birthday Surprise Hamper",
    rating: 4,
    date: "2024-12-12",
    comment:
      "Great variety of items. The birthday decorations were a nice touch. Would order again.",
  },
];

const mockAddresses = [
  {
    id: 1,
    label: "Home",
    name: "Priya Sharma",
    phone: "+91 98765 43210",
    address: "123 MG Road, Indore, Madhya Pradesh - 452001",
    isDefault: true,
  },
  {
    id: 2,
    label: "Office",
    name: "Priya Sharma",
    phone: "+91 98765 43210",
    address: "456 Corporate Tower, Bhopal, Madhya Pradesh - 462001",
    isDefault: false,
  },
];

const mockWishlist = [
  {
    id: 1,
    name: "Gourmet Coffee Hamper",
    price: 1499,
    originalPrice: 1899,
    image: "/images/h1.png",
    inStock: true,
  },
  {
    id: 2,
    name: "Premium Dry Fruit Box",
    price: 2199,
    originalPrice: 2599,
    image: "/images/h2.png",
    inStock: true,
  },
  {
    id: 3,
    name: "Baby Shower Gift Set",
    price: 999,
    originalPrice: 1299,
    image: "/images/h3.png",
    inStock: false,
  },
];

function StatusBadge({ status }) {
  const config = {
    delivered: {
      color: "bg-green-100 text-green-700",
      icon: CheckCircle,
      label: "Delivered",
    },
    shipped: {
      color: "bg-blue-100 text-blue-700",
      icon: Truck,
      label: "Shipped",
    },
    processing: {
      color: "bg-yellow-100 text-yellow-700",
      icon: Clock,
      label: "Processing",
    },
  };
  const s = config[status] || config.processing;
  return (
    <span
      className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-medium ${s.color}`}
    >
      <s.icon className="w-3 h-3" />
      <span>{s.label}</span>
    </span>
  );
}

function OrdersTab() {
  return (
    <div className="space-y-4">
      {mockOrders.map((order) => (
        <div
          key={order.id}
          className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
            <div>
              <p className="text-sm font-semibold text-gray-900">{order.id}</p>
              <p className="text-xs text-gray-500 mt-0.5">
                Placed on{" "}
                {new Date(order.date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <StatusBadge status={order.status} />
          </div>
          <div className="space-y-2 mb-3">
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-gray-700">
                  {item.name} x {item.qty}
                </span>
                <span className="font-medium text-gray-900">
                  ₹{item.price.toLocaleString("en-IN")}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between border-t border-gray-100 pt-3">
            <p className="text-sm font-bold text-[#8B3A62]">
              Total: ₹{order.total.toLocaleString("en-IN")}
            </p>
            <Link
              href={`/account/orders/${order.id}`}
              className="text-xs font-medium text-[#8B3A62] hover:underline flex items-center space-x-1"
            >
              <span>View Details</span>
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

function ReviewsTab() {
  return (
    <div className="space-y-4">
      {mockReviews.map((review) => (
        <div
          key={review.id}
          className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {review.product}
              </p>
              <div className="flex items-center space-x-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < review.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-xs text-gray-500">
              {new Date(review.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
          <p className="text-sm text-gray-600 mt-2">{review.comment}</p>
          <div className="flex items-center space-x-3 mt-3">
            <button className="text-xs text-[#8B3A62] hover:underline flex items-center space-x-1">
              <Edit3 className="w-3 h-3" />
              <span>Edit</span>
            </button>
            <button className="text-xs text-red-500 hover:underline flex items-center space-x-1">
              <Trash2 className="w-3 h-3" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function AddressesTab() {
  return (
    <div className="space-y-4">
      {mockAddresses.map((addr) => (
        <div
          key={addr.id}
          className={`bg-white rounded-xl border p-5 transition-shadow hover:shadow-md ${
            addr.isDefault ? "border-[#8B3A62]" : "border-gray-100"
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-[#FDF5F3]">
                <MapPin className="w-4 h-4 text-[#8B3A62]" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-semibold text-gray-900">
                    {addr.label}
                  </p>
                  {addr.isDefault && (
                    <span className="text-[10px] font-medium bg-[#8B3A62] text-white px-2 py-0.5 rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-700 mt-1">{addr.name}</p>
                <p className="text-sm text-gray-600">{addr.phone}</p>
                <p className="text-sm text-gray-500 mt-1">{addr.address}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3 mt-3 ml-12">
            <button className="text-xs text-[#8B3A62] hover:underline flex items-center space-x-1">
              <Edit3 className="w-3 h-3" />
              <span>Edit</span>
            </button>
            {!addr.isDefault && (
              <button className="text-xs text-gray-500 hover:text-[#8B3A62] hover:underline">
                Set as Default
              </button>
            )}
            {!addr.isDefault && (
              <button className="text-xs text-red-500 hover:underline flex items-center space-x-1">
                <Trash2 className="w-3 h-3" />
                <span>Remove</span>
              </button>
            )}
          </div>
        </div>
      ))}
      <button className="w-full flex items-center justify-center space-x-2 py-3 border-2 border-dashed border-gray-300 rounded-xl text-sm font-medium text-gray-600 hover:border-[#8B3A62] hover:text-[#8B3A62] transition-colors">
        <Plus className="w-4 h-4" />
        <span>Add New Address</span>
      </button>
    </div>
  );
}

function WishlistTab() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const handleAddToCart = (item) => {
    dispatch(addtoCart({
      id: item.id,
      name: item.name,
      image: item.image,
      price: item.price,
      originalPrice: item.originalPrice,
      quantity: 1,
      totalPrice: item.price,
      stock: item.inStock ? 10 : 0,
      addons: {},
    }));
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="text-center py-16">
        <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
        <p className="text-sm text-gray-500 mb-6">Browse products and add your favorites to the wishlist</p>
        <Link href="/products" className="inline-flex items-center px-5 py-2.5 rounded-lg bg-[#8B3A62] text-white text-sm font-semibold hover:bg-[#6E2D4D] transition-colors">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {wishlistItems.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group"
        >
          <div className="relative bg-[#FDF5F3] p-4 flex items-center justify-center h-40">
            {item.image ? (
              <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
            ) : (
              <ShoppingBag className="w-16 h-16 text-[#8B3A62] opacity-30 group-hover:opacity-50 transition-opacity" />
            )}
            <button
              onClick={() => dispatch(removeFromWishlist(item.id))}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-white shadow-sm hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5 text-red-500" />
            </button>
            {!item.inStock && (
              <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                <span className="text-xs font-medium text-gray-700 bg-white px-3 py-1 rounded-full shadow">
                  Out of Stock
                </span>
              </div>
            )}
          </div>
          <div className="p-4">
            <p className="text-sm font-semibold text-gray-900 line-clamp-2">
              {item.name}
            </p>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-sm font-bold text-[#8B3A62]">
                ₹{item.price.toLocaleString("en-IN")}
              </span>
              {item.originalPrice > 0 && (
                <span className="text-xs text-gray-400 line-through">
                  ₹{item.originalPrice.toLocaleString("en-IN")}
                </span>
              )}
            </div>
            <button
              disabled={!item.inStock}
              onClick={() => handleAddToCart(item)}
              className={`w-full mt-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                item.inStock
                  ? "bg-[#8B3A62] text-white hover:bg-[#6E2D4D]"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              {item.inStock ? "Add to Cart" : "Notify Me"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function AccountPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = searchParams.get("tab") || "orders";

  const setTab = (tab) => {
    router.push(`/account?tab=${tab}`);
  };

  const tabContent = {
    orders: <OrdersTab />,
    reviews: <ReviewsTab />,
    addresses: <AddressesTab />,
    wishlist: <WishlistTab />,
  };

  return (
    <div className="min-h-screen bg-[#FDF5F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Account</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your orders, reviews, and preferences
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-100 p-4 sticky top-24">
              <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-gray-100">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#8B3A62]">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Guest User
                  </p>
                  <p className="text-xs text-gray-500">user@example.com</p>
                </div>
              </div>
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? "bg-[#8B3A62] text-white"
                        : "text-gray-700 hover:bg-[#FFF8F6] hover:text-[#8B3A62]"
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                {tabs.find((t) => t.id === activeTab)?.label || "Order History"}
              </h2>
            </div>
            {tabContent[activeTab] || tabContent.orders}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AccountPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FDF5F3] flex items-center justify-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      }
    >
      <AccountPageContent />
    </Suspense>
  );
}
