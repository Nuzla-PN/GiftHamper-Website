import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag, Package, Truck, CheckCircle, XCircle,
  ChevronRight, ChevronDown, ChevronUp, Star,
  RotateCcw, MessageSquare, Download, Search,
  ArrowRight, Clock, MapPin, Phone, Gift,
  AlertCircle, ThumbsUp, Camera, X, Check,
  RefreshCw, Ban, FileText, Share2,
} from "lucide-react";
import { addtoCart } from "../features/cart/cartSlice";

/* ══════════════════════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════════════════════ */
function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });
}

function formatCurrency(n) {
  return `₹${Number(n).toLocaleString("en-IN")}`;
}

const STATUS_CONFIG = {
  placed: {
    label: "Order Placed",
    color: "#2874f0",
    bg: "#e3f2fd",
    icon: ShoppingBag,
    step: 1,
  },
  confirmed: {
    label: "Confirmed",
    color: "#7b1fa2",
    bg: "#f3e5f5",
    icon: CheckCircle,
    step: 2,
  },
  shipped: {
    label: "Shipped",
    color: "#e65100",
    bg: "#fff3e0",
    icon: Truck,
    step: 3,
  },
  out_for_delivery: {
    label: "Out for Delivery",
    color: "#f57f17",
    bg: "#fffde7",
    icon: Truck,
    step: 4,
  },
  delivered: {
    label: "Delivered",
    color: "#2e7d32",
    bg: "#e8f5e9",
    icon: CheckCircle,
    step: 5,
  },
  cancelled: {
    label: "Cancelled",
    color: "#c62828",
    bg: "#ffebee",
    icon: XCircle,
    step: 0,
  },
  return_requested: {
    label: "Return Requested",
    color: "#6d4c41",
    bg: "#efebe9",
    icon: RotateCcw,
    step: 0,
  },
  returned: {
    label: "Returned",
    color: "#37474f",
    bg: "#eceff1",
    icon: RotateCcw,
    step: 0,
  },
};

/* Demo orders — replace with real Redux selector */
const DEMO_ORDERS = [
  {
    id: "ORD-2025-00142",
    placedOn: "2025-04-08T10:30:00",
    deliveredOn: "2025-04-11T14:22:00",
    status: "delivered",
    paymentMethod: "UPI",
    paymentStatus: "Paid",
    address: {
      name: "Rahul Sharma",
      line1: "42, MG Road",
      city: "Kozhikode",
      state: "Kerala",
      pin: "673001",
      phone: "+91 98765 43210",
    },
    items: [
      {
        id: "p001",
        title: "Luxury Rose & Chocolate Hamper",
        image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=200&q=80",
        price: 1299,
        originalPrice: 1799,
        qty: 1,
        sellerName: "Aroha Gifts",
        subCategory: "Chocolate Hamper",
        review: null,
      },
      {
        id: "p002",
        title: "Artisan Tea Collection Box",
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=200&q=80",
        price: 849,
        qty: 1,
        sellerName: "Festive Trunk",
        subCategory: "Coffee & Tea",
        review: { rating: 4, text: "Absolutely loved the tea varieties. Great packaging!" },
      },
    ],
    subtotal: 2148,
    discount: 150,
    delivery: 0,
    total: 1998,
    trackingId: "BLUE9875432001IN",
    courier: "Bluedart",
    timeline: [
      { status: "placed",           time: "2025-04-08T10:30:00", note: "Your order has been placed" },
      { status: "confirmed",        time: "2025-04-08T12:00:00", note: "Seller confirmed your order" },
      { status: "shipped",          time: "2025-04-09T09:15:00", note: "Picked up by Bluedart" },
      { status: "out_for_delivery", time: "2025-04-11T07:45:00", note: "Out for delivery in your area" },
      { status: "delivered",        time: "2025-04-11T14:22:00", note: "Delivered to Rahul Sharma" },
    ],
  },
  {
    id: "ORD-2025-00098",
    placedOn: "2025-03-22T16:10:00",
    status: "shipped",
    paymentMethod: "Credit Card",
    paymentStatus: "Paid",
    address: {
      name: "Rahul Sharma",
      line1: "42, MG Road",
      city: "Kozhikode",
      state: "Kerala",
      pin: "673001",
      phone: "+91 98765 43210",
    },
    items: [
      {
        id: "p003",
        title: "Spa & Wellness Gift Set",
        image: "https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=200&q=80",
        price: 3199,
        originalPrice: 3999,
        qty: 1,
        sellerName: "Bliss & Co.",
        subCategory: "Wellness",
        review: null,
      },
    ],
    subtotal: 3199,
    discount: 200,
    delivery: 0,
    total: 2999,
    trackingId: "DTDC20250322KK",
    courier: "DTDC",
    estimatedDelivery: "2025-04-14",
    timeline: [
      { status: "placed",    time: "2025-03-22T16:10:00", note: "Order placed successfully" },
      { status: "confirmed", time: "2025-03-22T18:30:00", note: "Confirmed by Bliss & Co." },
      { status: "shipped",   time: "2025-03-24T10:00:00", note: "Shipped via DTDC" },
    ],
  },
  {
    id: "ORD-2025-00067",
    placedOn: "2025-02-14T09:00:00",
    deliveredOn: "2025-02-17T11:30:00",
    status: "returned",
    paymentMethod: "Net Banking",
    paymentStatus: "Refunded",
    address: {
      name: "Rahul Sharma",
      line1: "42, MG Road",
      city: "Kozhikode",
      state: "Kerala",
      pin: "673001",
      phone: "+91 98765 43210",
    },
    items: [
      {
        id: "p004",
        title: "Valentine's Special Hamper",
        image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=200&q=80",
        price: 2499,
        qty: 1,
        sellerName: "Aroha Gifts",
        subCategory: "Occasion",
        review: { rating: 2, text: "Box was damaged on arrival. Return process was smooth though." },
      },
    ],
    subtotal: 2499,
    discount: 0,
    delivery: 49,
    total: 2548,
    trackingId: "EKART9821KK01",
    courier: "Ekart",
    refundAmount: 2548,
    refundDate: "2025-02-20",
    timeline: [
      { status: "placed",          time: "2025-02-14T09:00:00", note: "Order placed" },
      { status: "confirmed",       time: "2025-02-14T10:15:00", note: "Confirmed" },
      { status: "shipped",         time: "2025-02-15T08:00:00", note: "Shipped" },
      { status: "delivered",       time: "2025-02-17T11:30:00", note: "Delivered" },
      { status: "return_requested",time: "2025-02-17T13:00:00", note: "Return initiated — damaged item" },
      { status: "returned",        time: "2025-02-20T10:00:00", note: "Refund of ₹2,548 processed" },
    ],
  },
  {
    id: "ORD-2025-00031",
    placedOn: "2025-01-05T14:20:00",
    status: "cancelled",
    paymentMethod: "COD",
    paymentStatus: "Not Charged",
    address: {
      name: "Rahul Sharma",
      line1: "42, MG Road",
      city: "Kozhikode",
      state: "Kerala",
      pin: "673001",
      phone: "+91 98765 43210",
    },
    items: [
      {
        id: "p005",
        title: "Corporate Gift Hamper — Premium",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&q=80",
        price: 5999,
        qty: 3,
        sellerName: "Yuvan Hampers",
        subCategory: "Corporate Gifts",
        review: null,
      },
    ],
    subtotal: 17997,
    discount: 1000,
    delivery: 0,
    total: 16997,
    cancelReason: "Out of stock — seller cancelled",
    timeline: [
      { status: "placed",    time: "2025-01-05T14:20:00", note: "Order placed" },
      { status: "cancelled", time: "2025-01-05T18:00:00", note: "Cancelled: item went out of stock" },
    ],
  },
];

/* ══════════════════════════════════════════════════════════════
   REVIEW MODAL
══════════════════════════════════════════════════════════════ */
function ReviewModal({ item, orderId, onClose, onSubmit }) {
  const [rating, setRating]     = useState(0);
  const [hovered, setHovered]   = useState(0);
  const [text, setText]         = useState("");
  const [images, setImages]     = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const LABELS = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

  const handleSubmit = () => {
    if (rating === 0) return;
    onSubmit({ itemId: item.id, orderId, rating, text });
    setSubmitted(true);
    setTimeout(onClose, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4 pb-4 sm:pb-0"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <motion.div
        initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 60 }}
        className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="px-6 pt-5 pb-4 flex items-center justify-between border-b border-rose-50"
          style={{ background: "linear-gradient(135deg,#FFF0F3,#FFF6EC)" }}>
          <div>
            <p className="text-[10px] font-bold text-[#C2556A] tracking-widest uppercase">Write a Review</p>
            <p className="text-sm font-bold text-[#3B2A35] mt-0.5 line-clamp-1">{item.title}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-rose-100 transition-colors">
            <X size={17} className="text-rose-400" />
          </button>
        </div>

        {submitted ? (
          <div className="px-6 py-12 text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: "linear-gradient(135deg,#C2556A,#E8956D)" }}>
              <Check size={28} className="text-white" strokeWidth={3} />
            </motion.div>
            <p className="text-lg font-bold text-[#3B2A35]">Thank you!</p>
            <p className="text-sm text-rose-900/50 mt-1">Your review has been submitted.</p>
          </div>
        ) : (
          <div className="px-6 py-5 space-y-5">
            {/* Product thumbnail */}
            <div className="flex items-center gap-3 bg-[#FEF9F5] rounded-2xl p-3 border border-rose-100">
              <img src={item.image} alt={item.title} className="w-14 h-14 object-contain rounded-xl bg-white p-1 border border-rose-100" />
              <div>
                <p className="text-xs font-semibold text-[#3B2A35] line-clamp-1">{item.title}</p>
                <p className="text-[11px] text-rose-900/40">by {item.sellerName}</p>
              </div>
            </div>

            {/* Star rating */}
            <div className="text-center">
              <p className="text-sm font-bold text-[#3B2A35] mb-3">Rate this product</p>
              <div className="flex justify-center gap-2">
                {[1,2,3,4,5].map((s) => (
                  <button key={s}
                    onMouseEnter={() => setHovered(s)}
                    onMouseLeave={() => setHovered(0)}
                    onClick={() => setRating(s)}
                    className="transition-transform hover:scale-125"
                  >
                    <Star size={32}
                      style={(hovered || rating) >= s
                        ? { color: "#D4A847", fill: "#D4A847" }
                        : { color: "#e5e7eb" }} />
                  </button>
                ))}
              </div>
              {(hovered || rating) > 0 && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-sm font-semibold mt-1.5"
                  style={{ color: "#C2556A" }}>
                  {LABELS[hovered || rating]}
                </motion.p>
              )}
            </div>

            {/* Text */}
            <div>
              <label className="block text-sm font-bold text-[#3B2A35] mb-2">Describe your experience</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="What did you love? Any issues? How was packaging? (optional)"
                rows={3}
                maxLength={500}
                className="w-full border border-rose-200 rounded-xl px-4 py-3 text-sm text-[#3B2A35] resize-none focus:outline-none focus:ring-2 bg-[#FEF9F5] placeholder:text-rose-300 leading-relaxed transition-all"
                style={{ "--tw-ring-color": "rgba(194,85,106,0.2)" }}
              />
              <div className="flex justify-between mt-1">
                <p className="text-[10px] text-rose-900/30">Min. 10 characters</p>
                <p className="text-[10px] text-rose-900/30">{text.length}/500</p>
              </div>
            </div>

            {/* Photo upload hint */}
            <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-rose-200 text-sm font-semibold text-rose-900/40 hover:border-[#C2556A] hover:text-[#C2556A] transition-all">
              <Camera size={16} /> Add Photos (optional)
            </button>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={rating === 0}
              className="w-full py-3.5 rounded-2xl text-sm font-bold text-white transition-all hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0"
              style={{ background: "linear-gradient(135deg,#C2556A,#E8956D)" }}
            >
              Submit Review
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   ORDER TRACKING TIMELINE
══════════════════════════════════════════════════════════════ */
function TrackingTimeline({ timeline, status }) {
  const isCancelled = status === "cancelled" || status === "returned" || status === "return_requested";

  return (
    <div className="space-y-0">
      {timeline.map((step, i) => {
        const cfg   = STATUS_CONFIG[step.status] ?? STATUS_CONFIG.placed;
        const Icon  = cfg.icon;
        const isLast = i === timeline.length - 1;
        return (
          <div key={i} className="flex gap-3">
            {/* Line + dot */}
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 transition-all"
                style={isLast ? {
                  background: isCancelled ? "#ffebee" : "linear-gradient(135deg,#C2556A,#E8956D)",
                  borderColor: isCancelled ? "#ef9a9a" : "#C2556A",
                } : {
                  background: "#f5f5f5", borderColor: "#e0e0e0",
                }}>
                <Icon size={14}
                  style={{ color: isLast ? (isCancelled ? "#c62828" : "#fff") : "#9e9e9e" }} />
              </div>
              {i < timeline.length - 1 && (
                <div className="w-0.5 flex-1 my-1" style={{ background: "#e0e0e0", minHeight: 20 }} />
              )}
            </div>

            {/* Content */}
            <div className="pb-5 flex-1 min-w-0">
              <p className="text-sm font-bold"
                style={{ color: isLast ? (isCancelled ? "#c62828" : "#C2556A") : "#9e9e9e" }}>
                {cfg.label}
              </p>
              <p className="text-xs mt-0.5" style={{ color: "#9e9e9e" }}>{step.note}</p>
              <p className="text-[11px] mt-0.5" style={{ color: "#bdbdbd" }}>{formatDate(step.time)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   ORDER CARD
══════════════════════════════════════════════════════════════ */
function OrderCard({ order, onReview, onReorder, onCancel }) {
  const [expanded,       setExpanded]       = useState(false);
  const [showTracking,   setShowTracking]   = useState(false);
  const [reviewingItem,  setReviewingItem]  = useState(null);
  const [localReviews,   setLocalReviews]   = useState({});

  const cfg       = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.placed;
  const Icon      = cfg.icon;
  const isActive  = !["cancelled","returned"].includes(order.status);
  const isDelivered = order.status === "delivered";
  const isCancelled = order.status === "cancelled";
  const isReturned  = ["returned","return_requested"].includes(order.status);

  const stepCount = 5;
  const progress  = isCancelled || isReturned ? 0 : ((cfg.step - 1) / (stepCount - 1)) * 100;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
     className="bg-white rounded-3xl border border-rose-200 shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
            style={{
            boxShadow: "0 10px 25px rgba(194,85,106,0.08)",
            }}
    >
      {/* ── ORDER HEADER ── */}
      <div className="px-4 sm:px-5 py-4 border-b border-rose-50"
        style={{ background: "linear-gradient(135deg,#FFF8F9,#FFFAF5)" }}>
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-[#3B2A35] tracking-wide">{order.id}</span>
              <span className="w-1 h-1 rounded-full bg-rose-200 hidden sm:block" />
              <span className="text-xs text-rose-900/40">Placed {formatDate(order.placedOn)}</span>
              {order.deliveredOn && (
                <>
                  <span className="w-1 h-1 rounded-full bg-rose-200 hidden sm:block" />
                  <span className="text-xs text-rose-900/40">Delivered {formatDate(order.deliveredOn)}</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              {/* Status badge */}
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border"
                style={{ color: cfg.color, background: cfg.bg, borderColor: `${cfg.color}33` }}>
                <Icon size={11} /> {cfg.label}
              </span>
              {/* Payment badge */}
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-[#f3faf4] text-green-700 border border-green-100">
                {order.paymentMethod} · {order.paymentStatus}
              </span>
            </div>
          </div>

          <div className="text-right">
            <p className="text-xl font-extrabold text-[#3B2A35]">{formatCurrency(order.total)}</p>
            <p className="text-xs text-rose-900/40 mt-0.5">
              {order.items.length} item{order.items.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Progress bar (active orders only) */}
        {isActive && !isCancelled && (
          <div className="mt-4">
            <div className="flex justify-between mb-1.5">
             {[
                { label: "Placed", icon: ShoppingBag },
                { label: "Confirmed", icon: CheckCircle },
                { label: "Shipped", icon: Truck },
                { label: "Out for Delivery", icon: Truck },
                { label: "Delivered", icon: CheckCircle },
                ].map((step, i) => {
                const Icon = step.icon;
                const active = cfg.step > i;

                return (
                    <div key={i} className="flex flex-col items-center w-[18%]">
                    <div
                        className="w-6 h-6 flex items-center justify-center rounded-full"
                        style={{
                        background: active ? "#C2556A" : "#eee",
                        color: active ? "#fff" : "#aaa",
                        }}
                    >
                        <Icon size={12} />
                    </div>
                    <span
                        className="text-[9px] mt-1 font-semibold"
                        style={{ color: active ? "#C2556A" : "#bdbdbd" }}
                    >
                        {step.label}
                    </span>
                    </div>
                );
                })}
            </div>
            <div className="h-1.5 rounded-full overflow-hidden bg-rose-100">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg,#C2556A,#E8956D)" }}
              />
            </div>
            {order.estimatedDelivery && (
              <p className="text-xs text-rose-900/50 mt-1.5 flex items-center gap-1">
                <Clock size={11} className="text-[#C2556A]" />
                Estimated delivery: <span className="font-bold text-[#3B2A35]">{formatDate(order.estimatedDelivery)}</span>
              </p>
            )}
          </div>
        )}

        {/* Refund info */}
        {isReturned && order.refundAmount && (
          <div className="mt-3 flex items-center gap-2 bg-green-50 border border-green-100 rounded-xl px-3 py-2">
            <CheckCircle size={14} className="text-green-600 shrink-0" />
            <p className="text-xs font-semibold text-green-700">
              Refund of {formatCurrency(order.refundAmount)} processed on {formatDate(order.refundDate)}
            </p>
          </div>
        )}
        {/* Cancel reason */}
        {isCancelled && order.cancelReason && (
          <div className="mt-3 flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
            <AlertCircle size={14} className="text-red-400 shrink-0" />
            <p className="text-xs font-semibold text-red-600">{order.cancelReason}</p>
          </div>
        )}
      </div>

      {/* ── ITEMS PREVIEW ── */}
      <div className="divide-y divide-rose-50">
        {(expanded ? order.items : order.items.slice(0, 2)).map((item) => {
          const reviewed = localReviews[item.id] || item.review;
          const disc     = item.originalPrice && item.originalPrice > item.price
            ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
            : null;
          return (
            <div key={item.id} className="px-4 sm:px-5 py-4">
              <div className="flex gap-3 sm:gap-4">
                {/* Image */}
                <Link to={`/products/${item.id}`}>
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-[#FFF8F6] border border-rose-100 shrink-0 flex items-center justify-center">
                    <img src={item.image} alt={item.title}
                      className="w-full h-full object-contain p-2 hover:scale-105 transition-transform duration-300" />
                  </div>
                </Link>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <Link to={`/products/${item.id}`}>
                    <p className="text-sm font-bold text-[#3B2A35] hover:text-[#C2556A] transition-colors line-clamp-2 leading-snug">
                      {item.title}
                    </p>
                  </Link>
                  <p className="text-xs text-rose-900/40 mt-0.5 mb-1.5">
                    Sold by <span className="font-semibold text-[#C2556A]">{item.sellerName}</span>
                    {item.qty > 1 && <span className="ml-2 text-rose-900/30">× {item.qty}</span>}
                  </p>

                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className="text-base font-extrabold text-[#3B2A35]">{formatCurrency(item.price)}</span>
                    {item.originalPrice && item.originalPrice > item.price && (
                      <>
                        <span className="text-xs text-rose-900/35 line-through">{formatCurrency(item.originalPrice)}</span>
                        <span className="text-xs font-bold text-[#6B8F71]">{disc}% off</span>
                      </>
                    )}
                  </div>

                  {/* Existing review display */}
                  {reviewed && (
                    <div className="mt-2 bg-[#FEF9F5] border border-rose-100 rounded-xl px-3 py-2">
                      <div className="flex items-center gap-1 mb-1">
                        {[...Array(5)].map((_, si) => (
                          <Star key={si} size={11}
                            style={si < reviewed.rating
                              ? { color: "#D4A847", fill: "#D4A847" }
                              : { color: "#e5e7eb" }} />
                        ))}
                        <span className="text-[10px] font-bold text-[#D4A847] ml-1">Your Review</span>
                      </div>
                      {reviewed.text && (
                        <p className="text-xs text-rose-900/60 italic line-clamp-2">"{reviewed.text}"</p>
                      )}
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="flex flex-wrap gap-2 mt-2.5">
                    {isDelivered && !reviewed && (
                      <button
                        onClick={() => setReviewingItem(item)}
                        className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full text-white transition-all hover:shadow-md hover:-translate-y-0.5"
                        style={{ background: "linear-gradient(135deg,#C2556A,#E8956D)" }}
                      >
                        <Star size={11} /> Write Review
                      </button>
                    )}
                    {isDelivered && (
                      <button
                        onClick={() => onReorder(item)}
                        className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border border-rose-200 text-[#C2556A] hover:bg-rose-50 transition-all"
                      >
                        <RotateCcw size={11} /> Buy Again
                      </button>
                    )}
                    {isDelivered && !isReturned && (
                      <button className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-rose-100 text-rose-900/50 hover:border-[#C2556A] hover:text-[#C2556A] transition-all">
                        <RefreshCw size={11} /> Return
                      </button>
                    )}
                    {!isDelivered && !isCancelled && !isReturned && (
                      <button className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-rose-100 text-rose-900/50 hover:border-red-300 hover:text-red-500 transition-all">
                        <Ban size={11} /> Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {order.items.length > 2 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-1.5 py-3 text-sm font-semibold text-[#C2556A] hover:bg-rose-50 transition-all border-t border-rose-50"
        >
          {expanded ? <><ChevronUp size={15} /> Show less</> : <><ChevronDown size={15} /> View {order.items.length - 2} more item{order.items.length - 2 !== 1 ? "s" : ""}</>}
        </button>
      )}

      {/* ── ORDER ACTIONS FOOTER ── */}
      <div className="border-t border-rose-50">
        {/* Track + Tracking ID row */}
        <div className="px-4 sm:px-5 py-3 flex items-center justify-between flex-wrap gap-2">
          {order.trackingId && (
            <div className="flex items-center gap-1.5 text-xs text-rose-900/50">
              <Truck size={12} className="text-[#C2556A]" />
              <span className="font-semibold">{order.courier}</span>
              <span>·</span>
              <span className="font-mono text-[11px] text-rose-900/40">{order.trackingId}</span>
            </div>
          )}
          {order.address && (
            <div className="flex items-center gap-1 text-xs text-rose-900/40">
              <MapPin size={11} /> {order.address.city}, {order.address.state}
            </div>
          )}
        </div>

        {/* Action buttons strip */}
        <div className="flex border-t border-rose-50 divide-x divide-rose-50">
          {isActive && order.timeline && (
            <button
              onClick={() => setShowTracking(!showTracking)}
              className="flex-1 flex items-center justify-center gap-1.5 py-3 text-sm font-semibold text-rose-900/60 hover:text-[#C2556A] hover:bg-rose-50 transition-all"
            >
              <Truck size={14} />
              <span className="hidden sm:inline">Track Order</span>
              <span className="sm:hidden">Track</span>
              {showTracking ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </button>
          )}
          <button className="flex-1 flex items-center justify-center gap-1.5 py-3 text-sm font-semibold text-rose-900/60 hover:text-[#C2556A] hover:bg-rose-50 transition-all">
            <FileText size={14} />
            <span className="hidden sm:inline">Invoice</span>
            <span className="sm:hidden">Bill</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-1.5 py-3 text-sm font-semibold text-rose-900/60 hover:text-[#C2556A] hover:bg-rose-50 transition-all">
            <MessageSquare size={14} />
            <span className="hidden sm:inline">Help</span>
            <span className="sm:hidden">Help</span>
          </button>
          {isDelivered && (
            <button
              onClick={() => onReorder(order.items[0])}
              className="flex-1 flex items-center justify-center gap-1.5 py-3 text-sm font-bold text-white transition-all"
              style={{ background: "linear-gradient(135deg,#C2556A,#E8956D)" }}
            >
              <RotateCcw size={14} />
              <span className="hidden sm:inline">Reorder</span>
              <span className="sm:hidden">Reorder</span>
            </button>
          )}
        </div>
      </div>

      {/* ── TRACKING PANEL ── */}
      <AnimatePresence>
        {showTracking && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 py-5 bg-[#FEF9F5] border-t border-rose-100">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-bold text-[#3B2A35] flex items-center gap-2">
                  <Truck size={15} className="text-[#C2556A]" /> Shipment Tracking
                </p>
                {order.trackingId && (
                  <div className="flex items-center gap-1.5 text-xs bg-white border border-rose-100 rounded-lg px-2.5 py-1">
                    <span className="text-rose-900/40">ID:</span>
                    <span className="font-mono font-semibold text-[#3B2A35]">{order.trackingId}</span>
                  </div>
                )}
              </div>
              <TrackingTimeline timeline={order.timeline} status={order.status} />

              {/* Delivery address */}
              {order.address && (
                <div className="mt-4 bg-white border border-rose-100 rounded-xl p-4">
                  <p className="text-[10px] font-bold text-rose-900/40 uppercase tracking-widest mb-2 flex items-center gap-1">
                    <MapPin size={10} /> Delivery Address
                  </p>
                  <p className="text-sm font-bold text-[#3B2A35]">{order.address.name}</p>
                  <p className="text-xs text-rose-900/50 mt-0.5">{order.address.line1}, {order.address.city}</p>
                  <p className="text-xs text-rose-900/50">{order.address.state} — {order.address.pin}</p>
                  <p className="text-xs text-rose-900/40 mt-1 flex items-center gap-1">
                    <Phone size={10} /> {order.address.phone}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Review Modal */}
      <AnimatePresence>
        {reviewingItem && (
          <ReviewModal
            item={reviewingItem}
            orderId={order.id}
            onClose={() => setReviewingItem(null)}
            onSubmit={(review) => {
              setLocalReviews((p) => ({ ...p, [review.itemId]: review }));
              setReviewingItem(null);
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════════ */
export default function MyOrdersPage() {
  const dispatch = useDispatch();

  /* Replace with real Redux selector: useSelector(selectOrders) */
  const orders = DEMO_ORDERS;

  const [search,  setSearch]  = useState("");
  const [filter,  setFilter]  = useState("all");
  const [sortBy,  setSortBy]  = useState("recent");

  const FILTERS = [
    { v: "all",       l: "All Orders" },
    { v: "active",    l: "Active"     },
    { v: "delivered", l: "Delivered"  },
    { v: "cancelled", l: "Cancelled"  },
    { v: "returned",  l: "Returned"   },
  ];

  const filtered = orders
    .filter((o) => {
      if (filter === "active")    return ["placed","confirmed","shipped","out_for_delivery"].includes(o.status);
      if (filter === "delivered") return o.status === "delivered";
      if (filter === "cancelled") return o.status === "cancelled";
      if (filter === "returned")  return ["returned","return_requested"].includes(o.status);
      return true;
    })
    .filter((o) => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        o.id.toLowerCase().includes(q) ||
        o.items.some((i) => i.title.toLowerCase().includes(q))
      );
    })
    .sort((a, b) => {
      if (sortBy === "oldest") return new Date(a.placedOn) - new Date(b.placedOn);
      if (sortBy === "amount-high") return b.total - a.total;
      if (sortBy === "amount-low")  return a.total - b.total;
      return new Date(b.placedOn) - new Date(a.placedOn);
    });

  /* Summary stats */
  const totalSpend   = orders.filter(o => o.status === "delivered").reduce((s, o) => s + o.total, 0);
  const activeCount  = orders.filter(o => ["placed","confirmed","shipped","out_for_delivery"].includes(o.status)).length;
  const deliveredCount = orders.filter(o => o.status === "delivered").length;
  const pendingReviews = orders.filter(o => o.status === "delivered")
    .flatMap(o => o.items.filter(i => !i.review)).length;

  const handleReorder = (item) => {
    dispatch(addtoCart({
      id:       item.id,
      title:    item.title,
      image:    Array.isArray(item.image) ? item.image[0] : item.image,
      price:    item.price,
      quantity: 1,
      totalPrice: item.price,
    }));
  };

  /* Empty state */
  if (orders.length === 0) return (
    <div className="min-h-screen bg-[#FEF9F5] flex flex-col items-center justify-center py-20 px-4 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="w-28 h-28 rounded-full flex items-center justify-center mb-6"
        style={{ background: "linear-gradient(135deg,#FFF0F3,#FFF6EC)" }}
      >
        <ShoppingBag className="w-12 h-12 text-[#C2556A]" />
      </motion.div>
      <h2 className="text-2xl font-bold text-[#3B2A35] mb-2">No orders yet 🛍️</h2>
      <p className="text-base text-rose-900/50 mb-8 max-w-sm leading-relaxed">
        Looks like you haven't placed any orders. Start browsing our curated hamper collection!
      </p>
      <Link to="/products"
        className="inline-flex items-center gap-2 px-10 py-3.5 rounded-full font-bold text-base text-white hover:shadow-xl hover:-translate-y-0.5 transition-all"
        style={{ background: "linear-gradient(135deg,#C2556A,#E8956D)" }}>
        Explore Hampers <ArrowRight size={16} />
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FEF9F5]">

      {/* ── HERO HEADER ── */}
      <div
        className="relative overflow-hidden px-4 sm:px-6 pt-6 pb-12"
        style={{ background: "linear-gradient(135deg,#3B2A35 0%,#C2556A 60%,#E8956D 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Ccircle cx='30' cy='30' r='20'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/50 mb-2">
                ✦ Order History
              </p>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                My Orders
                <span className="ml-3 text-base font-semibold text-white/70">
                  ({orders.length} total)
                </span>
              </h1>
              <p className="text-white/60 text-sm mt-1.5">
                {activeCount > 0 && <>{activeCount} active</>}
                {activeCount > 0 && deliveredCount > 0 && " · "}
                {deliveredCount > 0 && <>{deliveredCount} delivered</>}
                {pendingReviews > 0 && (
                  <> · <span className="text-white font-bold">{pendingReviews} pending review{pendingReviews !== 1 ? "s" : ""}</span></>
                )}
              </p>
            </div>
          </div>

          {/* Stat pills */}
          <div className="flex flex-wrap gap-2.5 mt-5">
            {[
              { icon: <ShoppingBag size={13} />,  label: `${orders.length} Orders`         },
              { icon: <Truck size={13} />,         label: `${activeCount} In Transit`       },
              { icon: <CheckCircle size={13} />,   label: `${deliveredCount} Delivered`     },
              { icon: <Star size={13} />,          label: `${pendingReviews} To Review`     },
              { icon: <Gift size={13} />,          label: `${formatCurrency(totalSpend)} Spent` },
            ].map(({ icon, label }) => (
              <div key={label}
                className="flex items-center gap-1.5 text-xs font-semibold text-white px-3 py-1.5 rounded-full border border-white/20"
                style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)" }}>
                {icon} {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 pb-16">

        {/* ── SEARCH + FILTER + SORT BAR ── */}
        <div className="bg-white rounded-2xl border border-rose-100 shadow-sm mb-5 overflow-hidden">

          {/* Search */}
          <div className="px-4 pt-4 pb-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-300" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by order ID or product name..."
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-[#FEF9F5] border border-rose-100 rounded-xl focus:outline-none focus:ring-2 text-[#3B2A35] placeholder:text-rose-300 transition-all"
                style={{ "--tw-ring-color": "rgba(194,85,106,0.2)" }}
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <X size={14} className="text-rose-300 hover:text-rose-500" />
                </button>
              )}
            </div>
          </div>

          {/* Filter chips */}
          <div className="px-4 pb-3 flex gap-2 overflow-x-auto scrollbar-hide">
            {FILTERS.map(({ v, l }) => {
              const count = v === "all" ? orders.length
                : v === "active"    ? orders.filter(o => ["placed","confirmed","shipped","out_for_delivery"].includes(o.status)).length
                : v === "delivered" ? orders.filter(o => o.status === "delivered").length
                : v === "cancelled" ? orders.filter(o => o.status === "cancelled").length
                : orders.filter(o => ["returned","return_requested"].includes(o.status)).length;
              return (
                <button key={v} onClick={() => setFilter(v)}
                  className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold border transition-all flex items-center gap-1.5
                    ${filter === v ? "text-white border-transparent" : "text-rose-900/50 border-rose-200 bg-white hover:border-[#C2556A] hover:text-[#C2556A]"}`}
                  style={filter === v ? { background: "linear-gradient(135deg,#C2556A,#E8956D)" } : {}}>
                  {l}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${filter === v ? "bg-white/20 text-white" : "bg-rose-50 text-rose-900/40"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2 px-4 pb-3.5 border-t border-rose-50 pt-3 flex-wrap">
            <span className="text-sm font-bold text-[#3B2A35]">Sort:</span>
            {[
              { v: "recent",      l: "Newest First"  },
              { v: "oldest",      l: "Oldest First"  },
              { v: "amount-high", l: "Amount ↓"      },
              { v: "amount-low",  l: "Amount ↑"      },
            ].map((s) => (
              <button key={s.v} onClick={() => setSortBy(s.v)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all
                  ${sortBy === s.v ? "text-white" : "text-rose-900/50 hover:text-[#C2556A]"}`}
                style={sortBy === s.v ? { background: "linear-gradient(135deg,#C2556A,#E8956D)" } : {}}>
                {s.l}
              </button>
            ))}
          </div>
        </div>

        {/* Pending reviews nudge */}
        {pendingReviews > 0 && filter !== "cancelled" && (
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            className="mb-4 bg-amber-50 border border-amber-100 rounded-2xl px-4 py-3.5 flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
              <Star size={16} className="text-amber-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-amber-800">
                You have {pendingReviews} pending review{pendingReviews !== 1 ? "s" : ""}
              </p>
              <p className="text-xs text-amber-700/70">Help other shoppers by sharing your experience!</p>
            </div>
            <button
              onClick={() => setFilter("delivered")}
              className="text-xs font-bold text-amber-700 underline underline-offset-2 shrink-0"
            >
              Review Now
            </button>
          </motion.div>
        )}

        {/* Result count */}
        <p className="text-sm text-rose-900/50 font-medium mb-4 px-1">
          Showing <span className="font-bold text-[#3B2A35]">{filtered.length}</span> order{filtered.length !== 1 ? "s" : ""}
          {search && <> matching <span className="text-[#C2556A] font-bold">"{search}"</span></>}
        </p>

        {/* ── ORDER CARDS ── */}
        <div className="space-y-6">
          <AnimatePresence>
            {filtered.map((order, index) => (
              <motion.div key={order.id}
              
                 whileHover={{ y: -4 }}   // ✅ ADD HERE (hover effect)
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    className="relative bg-white rounded-3xl border border-rose-200 shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
                    style={{ boxShadow: "0 10px 25px rgba(194,85,106,0.08)" }}
                transition={{ delay: index * 0.06 }}> 
                <div className="absolute left-0 top-0 h-full w-1.5 rounded-l-3xl"
       style={{ background: "linear-gradient(#C2556A,#E8956D)" }} />
                <OrderCard
                  order={order}
                  onReorder={handleReorder}
                  onCancel={(id) => console.log("Cancel", id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* No results */}
        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-rose-100 p-12 text-center mt-2">
            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#FFF0F3,#FFF6EC)" }}>
              <ShoppingBag size={26} className="text-[#C2556A]" />
            </div>
            <p className="text-base font-bold text-[#3B2A35] mb-1">No orders found</p>
            <p className="text-sm text-rose-900/40">
              {search ? `No results for "${search}". Try a different search.` : "No orders in this category."}
            </p>
            {search && (
              <button onClick={() => setSearch("")}
                className="mt-4 text-sm font-bold text-[#C2556A] hover:underline">
                Clear search
              </button>
            )}
          </div>
        )}

        {/* Browse more */}
        <div className="mt-8 bg-white rounded-2xl border border-rose-100 p-6 text-center">
          <p className="text-sm font-semibold text-rose-900/50 mb-3">Looking for something special?</p>
          <Link to="/products"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold text-sm text-white hover:shadow-lg hover:-translate-y-0.5 transition-all"
            style={{ background: "linear-gradient(135deg,#C2556A,#E8956D)" }}>
            <Gift size={15} /> Browse Hampers <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
