import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, ShoppingCart, Trash2, Share2, Star,
  ChevronRight, Gift, Package, Tag, Sparkles,
  SlidersHorizontal, Grid3X3, List, X, Bell,
  Check, ShoppingBag, ArrowRight,
} from "lucide-react";
import { addtoCart } from "../features/cart/cartSlice";

/* ══════════════════════════════════════════════════════════════════
   WISHLIST SLICE  — add this to your Redux store
   (or integrate into your existing wishlistSlice)

   Typical shape:
     state.wishlist.items = [
       { id, name, title, image, price, originalPrice,
         rating, reviews, sellerName, stock, ... }
     ]

   If you already have a wishlist slice, just import the actions
   below from that file instead.
══════════════════════════════════════════════════════════════════ */

// ── Local wishlist state (replace with your Redux slice when ready)
// For now the page manages wishlist items internally so you can
// drop it in and wire up real Redux later without changing the UI.

/* ─── Mock data – remove once connected to real Redux ─────────── */
const MOCK_ITEMS = [
  {
    id: "1",
    title: "Luxury Birthday Celebration Hamper",
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400",
    price: 1499, originalPrice: 2199, rating: 4.8, reviews: 342,
    sellerName: "GiftNest", stock: 8,
    tags: ["Birthday", "Luxury"], isFeatured: true,
    addedOn: "2 days ago",
  },
  {
    id: "2",
    title: "Anniversary Special Rose & Wine Hamper",
    image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400",
    price: 2299, originalPrice: 2999, rating: 4.6, reviews: 218,
    sellerName: "BlossomGifts", stock: 3,
    tags: ["Anniversary", "For Her"], isFeatured: true,
    addedOn: "1 week ago",
  },
  {
    id: "3",
    title: "Diwali Festive Dry Fruit & Sweets Hamper",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400",
    price: 899, originalPrice: 1299, rating: 4.5, reviews: 156,
    sellerName: "FestiveLane", stock: 0,
    tags: ["Diwali", "Dry Fruit Hamper"],
    addedOn: "3 weeks ago",
  },
  {
    id: "4",
    title: "Chocolate & Candle Self-Care Hamper",
    image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=400",
    price: 1199, originalPrice: 1599, rating: 4.7, reviews: 94,
    sellerName: "WarmGifts", stock: 12,
    tags: ["Self Care", "Birthday"],
    addedOn: "5 days ago",
  },
  {
    id: "5",
    title: "Thank You Gratitude Gift Box",
    image: "https://images.unsplash.com/photo-1516961642265-531546e84af2?w=400",
    price: 649, originalPrice: 899, rating: 4.4, reviews: 67,
    sellerName: "CurateCo", stock: 20,
    tags: ["Thank You", "Handmade"],
    addedOn: "1 month ago",
  },
  {
    id: "6",
    title: "Baby Shower Welcome Hamper",
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400",
    price: 1799, originalPrice: 2299, rating: 4.9, reviews: 183,
    sellerName: "TinyJoys", stock: 5,
    tags: ["Baby Shower", "For Her"],
    addedOn: "2 weeks ago",
  },
];

/* ─── Helper ──────────────────────────────────────────────────── */
function discPct(price, orig) {
  if (!orig || orig <= price) return null;
  return Math.round(((orig - price) / orig) * 100);
}

/* ════════════════════════════════════════════════════════════════
   WISHLIST PAGE
════════════════════════════════════════════════════════════════ */
export default function WishlistPage() {
  const dispatch = useDispatch();

  /* ── Replace MOCK_ITEMS with Redux selector when ready:
     const items = useSelector(state => state.wishlist.items);
  ── */
  const [items,     setItems]     = useState(MOCK_ITEMS);
  const [viewMode,  setViewMode]  = useState("grid");   // "grid" | "list"
  const [sortBy,    setSortBy]    = useState("recent");
  const [filter,    setFilter]    = useState("all");
  const [removed,   setRemoved]   = useState(null);     // last removed (undo)
  const [addedIds,  setAddedIds]  = useState([]);       // already-added-to-cart ids
  const [showShare, setShowShare] = useState(null);     // item id for share popover

  /* ── Derived ── */
  const tags = ["all", ...new Set(items.flatMap((i) => i.tags ?? []))];

  const filtered = items
    .filter((i) => filter === "all" || (i.tags ?? []).includes(filter))
    .sort((a, b) => {
      if (sortBy === "price-low")  return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating")     return (b.rating ?? 0) - (a.rating ?? 0);
      return 0; // recent (insertion order)
    });

  const inStockCount    = items.filter((i) => (i.stock ?? 1) > 0).length;
  const outOfStockCount = items.length - inStockCount;
  const totalSaving     = items.reduce((s, i) =>
    s + Math.max(0, (i.originalPrice ?? i.price) - i.price), 0);

  /* ── Actions ── */
  const removeItem = (id) => {
    const item = items.find((i) => i.id === id);
    setRemoved(item);
    setItems((p) => p.filter((i) => i.id !== id));
    setTimeout(() => setRemoved(null), 5000);
  };

  const undoRemove = () => {
    if (removed) { setItems((p) => [...p, removed]); setRemoved(null); }
  };

  const moveToCart = (item) => {
    dispatch(addtoCart({
      id:           item.id,
      name:         item.title,
      title:        item.title,
      image:        Array.isArray(item.image) ? item.image[0] : item.image,
      price:        item.price,
      originalPrice: item.originalPrice,
      quantity:     1,
      stock:        item.stock,
      rating:       item.rating,
      reviews:      item.reviews,
      sellerName:   item.sellerName,
      addons:       {},
      customizations: {},
      totalPrice:   item.price,
    }));
    setAddedIds((p) => [...p, item.id]);
    removeItem(item.id);
  };

  const moveAllToCart = () => {
    filtered.filter((i) => (i.stock ?? 1) > 0).forEach((i) => moveToCart(i));
  };

  /* ════════════════ EMPTY STATE ════════════════ */
  if (items.length === 0) return (
    <div className="min-h-screen bg-[#FEF9F5] flex flex-col items-center justify-center py-20 px-4 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="w-28 h-28 rounded-full flex items-center justify-center mb-6"
        style={{ background: "linear-gradient(135deg,#FFF0F3,#FFF6EC)" }}
      >
        <Heart className="w-12 h-12 text-[#C2556A]" />
      </motion.div>
      <h2 className="text-2xl font-bold text-[#3B2A35] mb-2">Your wishlist is empty 💝</h2>
      <p className="text-base text-rose-900/50 mb-8 max-w-sm">
        Save your favourite hampers here so you never lose track of them.
      </p>
      <Link to="/products"
        className="inline-flex items-center gap-2 px-10 py-3.5 rounded-full font-bold text-base text-white hover:shadow-xl hover:-translate-y-0.5 transition-all"
        style={{ background: "linear-gradient(135deg,#C2556A,#E8956D)" }}>
        Explore Hampers <ArrowRight size={16} />
      </Link>
    </div>
  );

  /* ════════════════ MAIN ════════════════ */
  return (
    <div className="min-h-screen bg-[#FEF9F5]">

      {/* ── HERO HEADER ── */}
      <div
        className="relative overflow-hidden px-4 sm:px-6 pt-6 pb-10"
        style={{ background: "linear-gradient(135deg,#3B2A35 0%,#C2556A 60%,#E8956D 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Ccircle cx='30' cy='30' r='20'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/50 mb-2">
                ✦ Your Saved Items
              </p>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                My Wishlist
                <span className="ml-3 text-base font-bold text-white/70">({items.length})</span>
              </h1>
              <p className="text-white/60 text-sm mt-1.5">
                {inStockCount} available · {outOfStockCount > 0 ? `${outOfStockCount} out of stock · ` : ""}
                Total savings potential: <span className="text-white font-bold">₹{totalSaving.toLocaleString()}</span>
              </p>
            </div>

            {/* Move all to cart */}
            {inStockCount > 0 && (
              <button
                onClick={moveAllToCart}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm border border-white/25 text-white hover:bg-white/10 transition-all"
              >
                <ShoppingCart size={15} />
                Move All to Cart ({inStockCount})
              </button>
            )}
          </div>

          {/* Stat pills */}
          <div className="flex flex-wrap gap-2.5 mt-5">
            {[
              { icon: <Heart size={13} />,       label: `${items.length} Saved` },
              { icon: <Package size={13} />,     label: `${inStockCount} In Stock` },
              { icon: <Tag size={13} />,         label: `Up to ${Math.max(...items.map((i) => discPct(i.price, i.originalPrice) ?? 0))}% off` },
              { icon: <Sparkles size={13} />,    label: `${items.filter((i) => i.isFeatured).length} Bestsellers` },
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

      {/* ── UNDO SNACKBAR ── */}
      <AnimatePresence>
        {removed && (
          <motion.div
            initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 bg-[#3B2A35] text-white px-5 py-3 rounded-2xl shadow-2xl text-sm font-medium"
          >
            <Trash2 size={15} className="text-rose-300" />
            <span>Removed from wishlist</span>
            <button onClick={undoRemove}
              className="font-bold text-[#E8956D] hover:text-[#C2556A] transition-colors ml-2">
              UNDO
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 pb-16">

        {/* ── FILTER + SORT + VIEW BAR ── */}
        <div className="bg-white rounded-2xl border border-rose-100 shadow-sm mb-5 overflow-hidden">

          {/* Tag filter chips */}
          <div className="px-4 pt-4 pb-3 flex gap-2 overflow-x-auto scrollbar-hide">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setFilter(tag)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold border transition-all
                  ${filter === tag
                    ? "text-white border-transparent"
                    : "text-rose-900/50 border-rose-200 bg-white hover:border-[#C2556A] hover:text-[#C2556A]"
                  }`}
                style={filter === tag ? { background: "linear-gradient(135deg,#C2556A,#E8956D)", borderColor: "transparent" } : {}}
              >
                {tag === "all" ? "All Items" : tag}
                {tag === "all" && (
                  <span className="ml-1.5 text-xs">{items.length}</span>
                )}
              </button>
            ))}
          </div>

          {/* Sort + View toggle row */}
          <div className="flex items-center justify-between px-4 pb-3.5 border-t border-rose-50 pt-3 gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-sm text-rose-900/50">
              <SlidersHorizontal size={14} className="text-[#C2556A]" />
              <span className="font-semibold text-[#3B2A35]">Sort by:</span>
              {[
                { v: "recent",     l: "Recently Added" },
                { v: "price-low",  l: "Price: Low → High" },
                { v: "price-high", l: "Price: High → Low" },
                { v: "rating",     l: "Top Rated" },
              ].map((s) => (
                <button key={s.v} onClick={() => setSortBy(s.v)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all
                    ${sortBy === s.v ? "text-white" : "text-rose-900/50 hover:text-[#C2556A]"}`}
                  style={sortBy === s.v ? { background: "linear-gradient(135deg,#C2556A,#E8956D)" } : {}}>
                  {s.l}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1 border border-rose-200 rounded-xl p-1">
              {[
                { mode: "grid", icon: <Grid3X3 size={15} /> },
                { mode: "list", icon: <List size={15} /> },
              ].map(({ mode, icon }) => (
                <button key={mode} onClick={() => setViewMode(mode)}
                  className={`p-1.5 rounded-lg transition-all
                    ${viewMode === mode ? "text-white" : "text-rose-900/40 hover:text-[#C2556A]"}`}
                  style={viewMode === mode ? { background: "linear-gradient(135deg,#C2556A,#E8956D)" } : {}}>
                  {icon}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── RESULT COUNT ── */}
        <p className="text-sm text-rose-900/50 font-medium mb-4 px-1">
          Showing <span className="font-bold text-[#3B2A35]">{filtered.length}</span> items
          {filter !== "all" && <span> in <span className="text-[#C2556A] font-bold">"{filter}"</span></span>}
        </p>

        {/* ══════════════════════════════════════════
            GRID VIEW
        ══════════════════════════════════════════ */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            <AnimatePresence>
              {filtered.map((item, index) => {
                const disc     = discPct(item.price, item.originalPrice);
                const inStock  = (item.stock ?? 1) > 0;
                const lowStock = inStock && (item.stock ?? 99) <= 5;
                const isAdded  = addedIds.includes(item.id);

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, x: 30 }}
                    transition={{ delay: index * 0.04, duration: 0.3 }}
                    className={`group bg-white rounded-2xl border overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col
                      ${inStock ? "border-rose-100" : "border-rose-200 opacity-80"}`}
                  >
                    {/* Image */}
                    <div className="relative aspect-square bg-[#FFF8F6] overflow-hidden">
                      <img
                        src={Array.isArray(item.image) ? item.image[0] : item.image}
                        alt={item.title}
                        className="w-full h-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Discount badge */}
                      {disc && inStock && (
                        <span className="absolute top-2 left-2 text-[11px] font-extrabold text-white px-2 py-0.5 rounded-full"
                          style={{ background: "linear-gradient(135deg,#C2556A,#E8956D)" }}>
                          -{disc}%
                        </span>
                      )}

                      {/* Out of stock overlay */}
                      {!inStock && (
                        <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                          <span className="bg-white border border-rose-200 text-rose-500 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                            Out of Stock
                          </span>
                        </div>
                      )}

                      {/* Low stock badge */}
                      {lowStock && (
                        <span className="absolute bottom-2 left-2 text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                          Only {item.stock} left!
                        </span>
                      )}

                      {/* Bestseller badge */}
                      {item.isFeatured && (
                        <span className="absolute top-2 right-10 text-[10px] font-bold text-white bg-[#D4A847] px-2 py-0.5 rounded-full">
                          ★ Best
                        </span>
                      )}

                      {/* Remove button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white border border-rose-100 flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-50"
                      >
                        <X size={13} className="text-rose-400" />
                      </button>

                      {/* Share button */}
                      <button
                        onClick={() => setShowShare(showShare === item.id ? null : item.id)}
                        className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-white border border-rose-100 flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-50"
                      >
                        <Share2 size={12} className="text-rose-400" />
                      </button>
                    </div>

                    {/* Info */}
                    <div className="p-3 flex-1 flex flex-col">
                      <Link to={`/products/${item.id}`}>
                        <p className="text-sm font-bold text-[#3B2A35] line-clamp-2 leading-snug mb-1 hover:text-[#C2556A] transition-colors">
                          {item.title}
                        </p>
                      </Link>
                      <p className="text-xs text-rose-900/40 mb-1.5">by {item.sellerName}</p>

                      {/* Stars */}
                      {(item.rating ?? 0) > 0 && (
                        <div className="flex items-center gap-1 mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={10}
                                style={i < Math.floor(item.rating)
                                  ? { color: "#D4A847", fill: "#D4A847" }
                                  : { color: "#e5e7eb" }} />
                            ))}
                          </div>
                          <span className="text-[10px] text-rose-900/40">({item.reviews})</span>
                        </div>
                      )}

                      {/* Price */}
                      <div className="flex items-baseline gap-1.5 flex-wrap mb-1 mt-auto">
                        <span className="text-base font-extrabold text-[#3B2A35]">
                          ₹{item.price.toLocaleString()}
                        </span>
                        {item.originalPrice && item.originalPrice > item.price && (
                          <span className="text-xs text-rose-900/35 line-through">
                            ₹{item.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>

                      <p className="text-[10px] text-rose-900/30 mb-3">Added {item.addedOn}</p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {(item.tags ?? []).slice(0, 2).map((tag) => (
                          <span key={tag}
                            className="text-[10px] font-semibold bg-[#FFF0F3] text-[#C2556A] border border-rose-100 px-1.5 py-0.5 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="px-3 pb-3">
                      <button
                        onClick={() => inStock && moveToCart(item)}
                        disabled={!inStock}
                        className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all
                          ${inStock
                            ? "text-white hover:shadow-md hover:-translate-y-0.5"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                          }`}
                        style={inStock ? { background: "linear-gradient(135deg,#C2556A,#E8956D)" } : {}}
                      >
                        {isAdded
                          ? <><Check size={14} strokeWidth={3} /> Added!</>
                          : inStock
                          ? <><ShoppingCart size={14} /> Add to Cart</>
                          : "Out of Stock"}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* ══════════════════════════════════════════
            LIST VIEW
        ══════════════════════════════════════════ */}
        {viewMode === "list" && (
          <div className="space-y-3">
            <AnimatePresence>
              {filtered.map((item, index) => {
                const disc    = discPct(item.price, item.originalPrice);
                const inStock = (item.stock ?? 1) > 0;
                const lowStock = inStock && (item.stock ?? 99) <= 5;
                const isAdded = addedIds.includes(item.id);

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 40 }}
                    transition={{ delay: index * 0.04, duration: 0.3 }}
                    className={`bg-white rounded-2xl border shadow-sm hover:shadow-md transition-all overflow-hidden
                      ${inStock ? "border-rose-100" : "border-rose-200 opacity-80"}`}
                  >
                    <div className="flex gap-4 p-4">

                      {/* Image */}
                      <div className="relative shrink-0 w-28 h-28 sm:w-36 sm:h-36 rounded-xl overflow-hidden bg-[#FFF8F6]">
                        <img
                          src={Array.isArray(item.image) ? item.image[0] : item.image}
                          alt={item.title}
                          className="w-full h-full object-contain p-2"
                        />
                        {disc && inStock && (
                          <span className="absolute top-2 left-2 text-[10px] font-extrabold text-white px-1.5 py-0.5 rounded-full"
                            style={{ background: "linear-gradient(135deg,#C2556A,#E8956D)" }}>
                            -{disc}%
                          </span>
                        )}
                        {!inStock && (
                          <div className="absolute inset-0 bg-white/60 flex items-end justify-center pb-2">
                            <span className="text-[10px] font-bold text-rose-500 bg-white border border-rose-200 px-2 py-0.5 rounded-full">
                              Out of Stock
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <Link to={`/products/${item.id}`}>
                            <p className="text-base font-bold text-[#3B2A35] line-clamp-2 leading-snug hover:text-[#C2556A] transition-colors">
                              {item.title}
                            </p>
                          </Link>
                          <button onClick={() => removeItem(item.id)}
                            className="shrink-0 p-1.5 rounded-full hover:bg-rose-50 transition-colors">
                            <X size={15} className="text-rose-300 hover:text-rose-500" />
                          </button>
                        </div>

                        <p className="text-xs text-rose-900/40 mt-0.5 mb-1.5">
                          Sold by <span className="font-semibold text-[#C2556A]">{item.sellerName}</span>
                        </p>

                        {/* Stars */}
                        {(item.rating ?? 0) > 0 && (
                          <div className="flex items-center gap-1.5 mb-2">
                            <div className="flex items-center gap-0.5 bg-[#FFF0F3] border border-rose-100 rounded-full px-2 py-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} size={10}
                                  style={i < Math.floor(item.rating)
                                    ? { color: "#D4A847", fill: "#D4A847" }
                                    : { color: "#e5e7eb" }} />
                              ))}
                              <span className="text-[10px] font-semibold text-[#C2556A] ml-1">{item.rating}</span>
                            </div>
                            <span className="text-xs text-rose-900/40">({item.reviews} reviews)</span>
                          </div>
                        )}

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {(item.tags ?? []).map((tag) => (
                            <span key={tag}
                              className="text-xs font-semibold bg-[#FFF0F3] text-[#C2556A] border border-rose-100 px-2 py-0.5 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Price row + actions */}
                        <div className="flex items-end justify-between flex-wrap gap-3 mt-2">
                          <div>
                            <div className="flex items-baseline gap-2 flex-wrap">
                              <span className="text-xl font-extrabold text-[#3B2A35]">
                                ₹{item.price.toLocaleString()}
                              </span>
                              {item.originalPrice && item.originalPrice > item.price && (
                                <>
                                  <span className="text-sm text-rose-900/35 line-through">
                                    ₹{item.originalPrice.toLocaleString()}
                                  </span>
                                  <span className="text-sm font-bold text-[#6B8F71]">{disc}% off</span>
                                </>
                              )}
                            </div>
                            {lowStock && (
                              <p className="text-xs font-semibold text-amber-600 mt-0.5">
                                ⚡ Only {item.stock} left!
                              </p>
                            )}
                            <p className="text-xs text-rose-900/30 mt-0.5">Added {item.addedOn}</p>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setShowShare(showShare === item.id ? null : item.id)}
                              className="p-2 rounded-xl border border-rose-100 hover:bg-rose-50 transition-colors">
                              <Share2 size={15} className="text-rose-400" />
                            </button>
                            <button
                              onClick={() => inStock && moveToCart(item)}
                              disabled={!inStock}
                              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all
                                ${inStock
                                  ? "text-white hover:shadow-md hover:-translate-y-0.5"
                                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                }`}
                              style={inStock ? { background: "linear-gradient(135deg,#C2556A,#E8956D)" } : {}}
                            >
                              {inStock
                                ? <><ShoppingCart size={15} /> Add to Cart</>
                                : "Out of Stock"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom action strip */}
                    <div className="flex border-t border-rose-50 divide-x divide-rose-50">
                      <Link to={`/products/${item.id}`}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-medium text-rose-900/40 hover:text-[#C2556A] hover:bg-rose-50 transition-all">
                        <Package size={14} /> View Details
                      </Link>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-medium text-rose-400 hover:text-[#C2556A] hover:bg-rose-50 transition-all">
                        <Trash2 size={14} /> Remove
                      </button>
                      <Link to="/products"
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-medium text-rose-900/40 hover:text-[#C2556A] hover:bg-rose-50 transition-all">
                        <Gift size={14} /> Similar Items
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* No results for filter */}
        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-rose-100 p-12 text-center">
            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#FFF0F3,#FFF6EC)" }}>
              <Heart size={26} className="text-[#C2556A]" />
            </div>
            <p className="text-base font-bold text-[#3B2A35] mb-1">No items in "{filter}"</p>
            <p className="text-sm text-rose-900/40">Try selecting a different category above</p>
          </div>
        )}

        {/* ── RECOMMENDATIONS STRIP ── */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-[#3B2A35]">You might also like 💝</h3>
            <Link to="/products"
              className="text-sm font-semibold text-[#C2556A] hover:underline flex items-center gap-1">
              See all <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: "r1", title: "Get Well Soon Hamper",   price: 799,  orig: 1099, img: "https://images.unsplash.com/photo-1587070653367-c19b8f63f865?w=300" },
              { id: "r2", title: "Thank You Gift Box",     price: 649,  orig: 899,  img: "https://images.unsplash.com/photo-1516961642265-531546e84af2?w=300" },
              { id: "r3", title: "Baby Shower Hamper",     price: 1199, orig: 1599, img: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=300" },
              { id: "r4", title: "Corporate Gift Hamper",  price: 1899, orig: 2499, img: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=300" },
            ].map((s) => {
              const d = discPct(s.price, s.orig);
              return (
                <Link key={s.id} to={`/products/${s.id}`}>
                  <motion.div whileHover={{ y: -3 }}
                    className="bg-white rounded-2xl border border-rose-100 shadow-sm overflow-hidden hover:shadow-md transition-all">
                    <div className="relative aspect-square bg-[#FFF8F6] overflow-hidden">
                      <img src={s.img} alt={s.title}
                        className="w-full h-full object-contain p-3 transition-transform duration-300 hover:scale-105" />
                      {d && (
                        <span className="absolute top-2 left-2 text-[10px] font-extrabold text-white px-1.5 py-0.5 rounded-full"
                          style={{ background: "linear-gradient(135deg,#C2556A,#E8956D)" }}>
                          -{d}%
                        </span>
                      )}
                    </div>
                    <div className="p-3">
                      <p className="text-xs font-semibold text-[#3B2A35] line-clamp-2 mb-1">{s.title}</p>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-sm font-extrabold text-[#3B2A35]">₹{s.price.toLocaleString()}</span>
                        <span className="text-[11px] text-rose-900/35 line-through">₹{s.orig.toLocaleString()}</span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
