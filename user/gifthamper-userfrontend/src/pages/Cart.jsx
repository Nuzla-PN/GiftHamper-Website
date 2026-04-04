// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Trash2, Plus, Minus, ShoppingBag, Tag, ChevronRight,
//   Gift, Truck, Shield, RotateCcw, Heart, Star,
//   ChevronDown, ChevronUp, Info, Package, Sparkles, X
// } from "lucide-react";

// /* ─── MOCK CART DATA ─────────────────────────────────────────── */
// const INITIAL_ITEMS = [
//   {
//     id: "1",
//     title: "Luxury Birthday Celebration Hamper",
//     subtitle: "Premium chocolates, candles & greeting card",
//     sellerName: "GiftNest",
//     image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400",
//     price: 1499,
//     originalPrice: 2199,
//     qty: 1,
//     rating: 4.8,
//     reviews: 342,
//     inStock: true,
//     addons: [
//       { label: "Greeting Card 🎀", price: 49 },
//       { label: "Premium Gift Box 🎁", price: 99 },
//     ],
//   },
//   {
//     id: "2",
//     title: "Anniversary Special Hamper",
//     subtitle: "Rose petals, wine & personalised message",
//     sellerName: "BlossomGifts",
//     image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400",
//     price: 2299,
//     originalPrice: 2999,
//     qty: 2,
//     rating: 4.6,
//     reviews: 218,
//     inStock: true,
//     addons: [{ label: "Custom Wrapping ✨", price: 79 }],
//   },
//   {
//     id: "3",
//     title: "Diwali Festive Dry Fruit Hamper",
//     subtitle: "Assorted dry fruits in decorative tin box",
//     sellerName: "FestiveLane",
//     image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400",
//     price: 899,
//     originalPrice: 1299,
//     qty: 1,
//     rating: 4.5,
//     reviews: 156,
//     inStock: false,
//     addons: [],
//   },
// ];

// const SUGGESTED = [
//   {
//     id: "s1",
//     title: "Get Well Soon Hamper",
//     price: 799,
//     originalPrice: 1099,
//     image: "https://images.unsplash.com/photo-1587070653367-c19b8f63f865?w=300",
//   },
//   {
//     id: "s2",
//     title: "Thank You Gift Box",
//     price: 649,
//     originalPrice: 899,
//     image: "https://images.unsplash.com/photo-1516961642265-531546e84af2?w=300",
//   },
//   {
//     id: "s3",
//     title: "Baby Shower Hamper",
//     price: 1199,
//     originalPrice: 1599,
//     image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=300",
//   },
//   {
//     id: "s4",
//     title: "Corporate Gift Hamper",
//     price: 1899,
//     originalPrice: 2499,
//     image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=300",
//   },
// ];

// const COUPONS = [
//   { code: "GIFT10", desc: "10% off on orders above ₹1500", discount: 0.1 },
//   { code: "FIRST50", desc: "Flat ₹50 off on first order", discount: 50 },
// ];

// /* ─── HELPERS ────────────────────────────────────────────────── */
// function discount(p, op) {
//   return op && op > p ? Math.round(((op - p) / op) * 100) : null;
// }

// /* ════════════════════════════════════════════════════════════════
//    CART PAGE
// ════════════════════════════════════════════════════════════════ */
// export default function CartPage() {
//   const [items, setItems] = useState(INITIAL_ITEMS);
//   const [coupon, setCoupon] = useState("");
//   const [appliedCoupon, setAppliedCoupon] = useState(null);
//   const [couponError, setCouponError] = useState("");
//   const [showCoupons, setShowCoupons] = useState(false);
//   const [removingId, setRemovingId] = useState(null);
//   const [wishlistIds, setWishlistIds] = useState([]);

//   /* qty */
//   const changeQty = (id, delta) => {
//     setItems((prev) =>
//       prev.map((it) =>
//         it.id === id ? { ...it, qty: Math.max(1, it.qty + delta) } : it
//       )
//     );
//   };

//   /* remove */
//   const removeItem = (id) => {
//     setRemovingId(id);
//     setTimeout(() => {
//       setItems((prev) => prev.filter((it) => it.id !== id));
//       setRemovingId(null);
//     }, 350);
//   };

//   /* wishlist */
//   const toggleWishlist = (id) =>
//     setWishlistIds((prev) =>
//       prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
//     );

//   /* coupon */
//   const applyCoupon = () => {
//     const found = COUPONS.find((c) => c.code === coupon.toUpperCase().trim());
//     if (found) {
//       setAppliedCoupon(found);
//       setCouponError("");
//     } else {
//       setCouponError("Invalid coupon code. Try GIFT10 or FIRST50.");
//       setAppliedCoupon(null);
//     }
//   };

//   /* price calc */
//   const activeItems = items.filter((it) => it.inStock);
//   const subtotal = activeItems.reduce(
//     (s, it) => s + it.price * it.qty + it.addons.reduce((a, ad) => a + ad.price, 0) * it.qty,
//     0
//   );
//   const originalTotal = activeItems.reduce(
//     (s, it) => s + (it.originalPrice || it.price) * it.qty,
//     0
//   );
//   const savedAmount = originalTotal - subtotal;
//   const couponDiscount =
//     appliedCoupon
//       ? appliedCoupon.discount < 1
//         ? Math.round(subtotal * appliedCoupon.discount)
//         : appliedCoupon.discount
//       : 0;
//   const delivery = subtotal >= 999 ? 0 : 79;
//   const total = subtotal - couponDiscount + delivery;

//   const isEmpty = items.length === 0;

//   return (
//     <div className="min-h-screen bg-[#FEF9F5]">

//       {/* ── PAGE HEADER ── */}
//       <div className="bg-white border-b border-rose-100 sticky top-0 z-30">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3">
//           <ShoppingBag className="w-5 h-5 text-[#C2556A]" />
//           <h1 className="text-base sm:text-lg font-bold text-[#3B2A35]">
//             My Cart
//             {!isEmpty && (
//               <span className="ml-2 text-xs font-semibold text-white bg-[#C2556A] rounded-full px-2 py-0.5">
//                 {items.length}
//               </span>
//             )}
//           </h1>
//           <div className="ml-auto">
//             <Link to="/products" className="text-xs text-[#C2556A] font-semibold hover:underline flex items-center gap-1">
//               Continue Shopping <ChevronRight size={13} />
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* ── MAIN ── */}
//       {isEmpty ? (
//         /* EMPTY STATE */
//         <div className="flex flex-col items-center justify-center py-28 px-4 text-center">
//           <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
//             style={{ background: "linear-gradient(135deg,#FFF0F3,#FFF6EC)" }}>
//             <ShoppingBag className="w-10 h-10 text-[#C2556A]" />
//           </div>
//           <h2 className="text-xl font-bold text-[#3B2A35] mb-2">Your cart is empty 🎁</h2>
//           <p className="text-sm text-rose-900/50 mb-6 max-w-xs">
//             Looks like you haven't added any hampers yet. Let's find something special!
//           </p>
//           <Link
//             to="/products"
//             className="px-8 py-3 rounded-full font-bold text-sm text-white hover:shadow-lg hover:-translate-y-0.5 transition-all"
//             style={{ background: "linear-gradient(135deg,#C2556A,#E8956D)" }}
//           >
//             Browse Hampers ✨
//           </Link>
//         </div>
//       ) : (
//         <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 pb-32 lg:pb-10">

//           {/* FREE DELIVERY BANNER */}
//           {delivery > 0 && (
//             <motion.div
//               initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
//               className="mb-4 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 flex items-center gap-2 text-xs font-medium text-amber-800"
//             >
//               <Truck size={14} className="text-amber-500 shrink-0" />
//               Add <span className="font-bold">₹{(999 - subtotal).toLocaleString()}</span> more for FREE delivery 🎀
//             </motion.div>
//           )}
//           {delivery === 0 && (
//             <motion.div
//               initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
//               className="mb-4 bg-[#F3FBF4] border border-green-200 rounded-xl px-4 py-2.5 flex items-center gap-2 text-xs font-medium text-green-800"
//             >
//               <Truck size={14} className="text-green-500 shrink-0" />
//               🎉 Yay! You get FREE delivery on this order!
//             </motion.div>
//           )}

          // <div className="flex flex-col lg:flex-row gap-5 items-start">

          //   {/* ════ LEFT — CART ITEMS ════ */}
          //   <div className="flex-1 min-w-0 space-y-3">

          //     {/* Out of stock warning */}
          //     {items.some((it) => !it.inStock) && (
          //       <div className="bg-rose-50 border border-rose-200 rounded-xl px-4 py-3 flex items-start gap-2 text-xs text-rose-700">
          //         <Info size={14} className="shrink-0 mt-0.5 text-rose-400" />
          //         <span>Some items in your cart are out of stock and won't be included in your order.</span>
          //       </div>
          //     )}

          //     <AnimatePresence>
          //       {items.map((item) => {
          //         const disc = discount(item.price, item.originalPrice);
          //         const isRemoving = removingId === item.id;
          //         const addonTotal = item.addons.reduce((a, ad) => a + ad.price, 0);

          //         return (
          //           <motion.div
          //             key={item.id}
          //             layout
          //             initial={{ opacity: 0, y: 12 }}
          //             animate={{ opacity: isRemoving ? 0 : 1, x: isRemoving ? 60 : 0, y: 0 }}
          //             exit={{ opacity: 0, x: 60 }}
          //             transition={{ duration: 0.3 }}
          //             className={`bg-white rounded-2xl border shadow-sm overflow-hidden
          //               ${item.inStock ? "border-rose-100" : "border-rose-200 opacity-70"}`}
          //           >
          //             {/* Out of stock ribbon */}
          //             {!item.inStock && (
          //               <div className="bg-rose-50 border-b border-rose-100 px-4 py-1.5 text-xs font-semibold text-rose-500 flex items-center gap-1.5">
          //                 <X size={12} /> Out of Stock — removed from total
          //               </div>
          //             )}

          //             <div className="flex gap-3 p-4">

          //               {/* Image */}
          //               <div className="relative shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-[#FFF0F3]">
          //                 <img
          //                   src={item.image} alt={item.title}
          //                   className="w-full h-full object-contain p-2"
          //                 />
          //                 {disc && item.inStock && (
          //                   <span className="absolute top-1.5 left-1.5 text-[9px] font-extrabold text-white px-1.5 py-0.5 rounded-full"
          //                     style={{ background: "linear-gradient(135deg,#C2556A,#E8956D)" }}>
          //                     -{disc}%
          //                   </span>
          //                 )}
          //               </div>

          //               {/* Info */}
          //               <div className="flex-1 min-w-0">
          //                 <div className="flex items-start justify-between gap-2">
          //                   <div className="min-w-0">
          //                     <Link to={`/products/${item.id}`}>
          //                       <p className="text-sm font-bold text-[#3B2A35] line-clamp-2 leading-snug hover:text-[#C2556A] transition-colors">
          //                         {item.title}
          //                       </p>
          //                     </Link>
          //                     <p className="text-[11px] text-rose-900/40 mt-0.5">{item.subtitle}</p>
          //                     <p className="text-[11px] text-rose-900/40 mt-0.5">
          //                       Sold by <span className="font-medium text-[#C2556A]">{item.sellerName}</span>
          //                     </p>
          //                   </div>

          //                   {/* Wishlist */}
          //                   <button
          //                     onClick={() => toggleWishlist(item.id)}
          //                     className="shrink-0 p-1.5 rounded-full hover:bg-rose-50 transition-colors"
          //                   >
          //                     <Heart
          //                       size={16}
          //                       style={wishlistIds.includes(item.id)
          //                         ? { color: "#C2556A", fill: "#C2556A" }
          //                         : { color: "#d1a0ab" }}
          //                     />
          //                   </button>
          //                 </div>

          //                 {/* Rating */}
          //                 <div className="flex items-center gap-1 mt-1.5 mb-2">
          //                   {[...Array(5)].map((_, i) => (
          //                     <Star key={i} className="w-2.5 h-2.5"
          //                       style={i < Math.floor(item.rating)
          //                         ? { color: "#D4A847", fill: "#D4A847" }
          //                         : { color: "#e5e7eb" }} />
          //                   ))}
          //                   <span className="text-[10px] text-rose-900/40 ml-0.5">({item.reviews})</span>
          //                 </div>

          //                 {/* Add-ons */}
          //                 {item.addons.length > 0 && (
          //                   <div className="flex flex-wrap gap-1.5 mb-2">
          //                     {item.addons.map((ad) => (
          //                       <span key={ad.label}
          //                         className="inline-flex items-center gap-1 text-[10px] font-semibold bg-[#FFF0F3] text-[#C2556A] border border-rose-100 px-2 py-0.5 rounded-full">
          //                         {ad.label} +₹{ad.price}
          //                       </span>
          //                     ))}
          //                   </div>
          //                 )}

          //                 {/* Price + Qty row */}
          //                 <div className="flex items-center justify-between flex-wrap gap-2 mt-1">
          //                   {/* Price */}
          //                   <div className="flex items-baseline gap-1.5 flex-wrap">
          //                     <span className="text-base font-extrabold text-[#3B2A35]">
          //                       ₹{(item.price + addonTotal).toLocaleString()}
          //                     </span>
          //                     {item.originalPrice && item.originalPrice > item.price && (
          //                       <span className="text-xs text-rose-900/35 line-through">
          //                         ₹{item.originalPrice.toLocaleString()}
          //                       </span>
          //                     )}
          //                     {disc && (
          //                       <span className="text-xs font-bold text-[#6B8F71]">{disc}% off</span>
          //                     )}
          //                   </div>

          //                   {/* Qty stepper */}
          //                   {item.inStock && (
          //                     <div className="flex items-center gap-0 border border-rose-200 rounded-full overflow-hidden">
          //                       <button
          //                         onClick={() => changeQty(item.id, -1)}
          //                         className="w-7 h-7 flex items-center justify-center text-[#C2556A] hover:bg-rose-50 transition-colors"
          //                       >
          //                         <Minus size={12} strokeWidth={3} />
          //                       </button>
          //                       <span className="w-7 h-7 flex items-center justify-center text-xs font-bold text-[#3B2A35] border-x border-rose-100">
          //                         {item.qty}
          //                       </span>
          //                       <button
          //                         onClick={() => changeQty(item.id, 1)}
          //                         className="w-7 h-7 flex items-center justify-center text-[#C2556A] hover:bg-rose-50 transition-colors"
          //                       >
          //                         <Plus size={12} strokeWidth={3} />
          //                       </button>
          //                     </div>
          //                   )}
          //                 </div>
          //               </div>
          //             </div>

          //             {/* Action row */}
          //             <div className="flex items-center gap-0 border-t border-rose-50 divide-x divide-rose-50">
          //               <button
          //                 onClick={() => removeItem(item.id)}
          //                 className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-rose-400 hover:text-[#C2556A] hover:bg-rose-50 transition-all"
          //               >
          //                 <Trash2 size={13} /> Remove
          //               </button>
          //               <button
          //                 onClick={() => { toggleWishlist(item.id); removeItem(item.id); }}
          //                 className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-rose-900/40 hover:text-[#C2556A] hover:bg-rose-50 transition-all"
          //               >
          //                 <Heart size={13} /> Save for Later
          //               </button>
          //               <Link
          //                 to={`/products/${item.id}`}
          //                 className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-rose-900/40 hover:text-[#C2556A] hover:bg-rose-50 transition-all"
          //               >
          //                 <Package size={13} /> View Details
          //               </Link>
          //             </div>
          //           </motion.div>
          //         );
          //       })}
          //     </AnimatePresence>

//               {/* COUPON SECTION */}
//               <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-4">
//                 <button
//                   onClick={() => setShowCoupons(!showCoupons)}
//                   className="w-full flex items-center justify-between text-sm font-bold text-[#3B2A35]"
//                 >
//                   <span className="flex items-center gap-2">
//                     <Tag size={15} className="text-[#C2556A]" />
//                     Apply Coupon Code
//                   </span>
//                   {showCoupons ? <ChevronUp size={15} className="text-rose-300" /> : <ChevronDown size={15} className="text-rose-300" />}
//                 </button>

//                 <AnimatePresence>
//                   {showCoupons && (
//                     <motion.div
//                       initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
//                       exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
//                       className="overflow-hidden"
//                     >
//                       <div className="mt-3 flex gap-2">
//                         <input
//                           value={coupon}
//                           onChange={(e) => setCoupon(e.target.value)}
//                           onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
//                           placeholder="Enter coupon code"
//                           className="flex-1 border border-rose-200 rounded-xl px-3 py-2 text-sm text-[#3B2A35] bg-[#FEF9F5] focus:outline-none focus:ring-2 focus:ring-[#C2556A]/30 focus:border-[#C2556A] placeholder:text-rose-300"
//                         />
//                         <button
//                           onClick={applyCoupon}
//                           className="px-5 py-2 rounded-xl text-sm font-bold text-white transition-all hover:shadow-md"
//                           style={{ background: "linear-gradient(135deg,#C2556A,#E8956D)" }}
//                         >
//                           Apply
//                         </button>
//                       </div>

//                       {couponError && (
//                         <p className="text-xs text-rose-400 mt-2 flex items-center gap-1">
//                           <X size={11} /> {couponError}
//                         </p>
//                       )}
//                       {appliedCoupon && (
//                         <p className="text-xs text-[#6B8F71] font-semibold mt-2 flex items-center gap-1">
//                           ✓ Coupon applied! You save ₹{couponDiscount}
//                         </p>
//                       )}

//                       {/* available coupons */}
//                       <div className="mt-3 space-y-2">
//                         <p className="text-[10px] text-rose-900/40 font-semibold uppercase tracking-wide">Available Coupons</p>
//                         {COUPONS.map((c) => (
//                           <button
//                             key={c.code}
//                             onClick={() => { setCoupon(c.code); setAppliedCoupon(c); setCouponError(""); }}
//                             className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl border text-left transition-all
//                               ${appliedCoupon?.code === c.code
//                                 ? "border-[#C2556A] bg-rose-50"
//                                 : "border-rose-100 bg-[#FEF9F5] hover:border-[#E8956D]"}`}
//                           >
//                             <div>
//                               <p className="text-xs font-bold text-[#C2556A]">{c.code}</p>
//                               <p className="text-[11px] text-rose-900/50">{c.desc}</p>
//                             </div>
//                             {appliedCoupon?.code === c.code
//                               ? <span className="text-[10px] font-bold text-[#6B8F71] bg-green-50 px-2 py-0.5 rounded-full">Applied ✓</span>
//                               : <span className="text-[10px] font-bold text-[#C2556A]">Tap to apply</span>}
//                           </button>
//                         ))}
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>

//               {/* TRUST BADGES */}
//               <div className="grid grid-cols-3 gap-2.5">
//                 {[
//                   { icon: Truck,    label: "Free Delivery",   sub: "Orders above ₹999" },
//                   { icon: Shield,   label: "Secure Payment",  sub: "100% Safe & Encrypted" },
//                   { icon: RotateCcw, label: "Easy Returns",   sub: "7-day hassle-free" },
//                 ].map(({ icon: Icon, label, sub }) => (
//                   <div key={label} className="bg-white rounded-xl border border-rose-50 p-3 text-center shadow-sm">
//                     <div className="w-8 h-8 rounded-full mx-auto mb-1.5 flex items-center justify-center"
//                       style={{ background: "linear-gradient(135deg,#FFF0F3,#FFF6EC)" }}>
//                       <Icon size={14} className="text-[#C2556A]" />
//                     </div>
//                     <p className="text-[11px] font-bold text-[#3B2A35]">{label}</p>
//                     <p className="text-[9px] text-rose-900/40">{sub}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* ════ RIGHT — ORDER SUMMARY ════ */}
//             <div className="w-full lg:w-80 xl:w-96 shrink-0 space-y-3 lg:sticky lg:top-20">

//               {/* Summary card */}
//               <div className="bg-white rounded-2xl border border-rose-100 shadow-sm overflow-hidden">
//                 <div className="px-5 py-4 border-b border-rose-50">
//                   <h2 className="text-sm font-bold text-[#3B2A35] flex items-center gap-2">
//                     <Sparkles size={14} className="text-[#C2556A]" />
//                     Order Summary
//                   </h2>
//                 </div>

//                 <div className="px-5 py-4 space-y-3 text-sm">
//                   <div className="flex justify-between text-rose-900/60">
//                     <span>Price ({activeItems.length} {activeItems.length === 1 ? "item" : "items"})</span>
//                     <span className="font-medium text-[#3B2A35]">₹{originalTotal.toLocaleString()}</span>
//                   </div>
//                   <div className="flex justify-between text-[#6B8F71]">
//                     <span>Discount</span>
//                     <span className="font-semibold">-₹{savedAmount.toLocaleString()}</span>
//                   </div>
//                   {couponDiscount > 0 && (
//                     <div className="flex justify-between text-[#6B8F71]">
//                       <span className="flex items-center gap-1">
//                         <Tag size={11} /> Coupon ({appliedCoupon?.code})
//                         <button onClick={() => { setAppliedCoupon(null); setCoupon(""); }}
//                           className="text-rose-300 hover:text-rose-500 ml-1">
//                           <X size={11} />
//                         </button>
//                       </span>
//                       <span className="font-semibold">-₹{couponDiscount}</span>
//                     </div>
//                   )}
//                   <div className="flex justify-between text-rose-900/60">
//                     <span className="flex items-center gap-1">
//                       Delivery
//                       {delivery === 0 && <span className="text-[10px] text-[#6B8F71] font-bold">(FREE)</span>}
//                     </span>
//                     {delivery === 0
//                       ? <span className="font-semibold text-[#6B8F71]">FREE</span>
//                       : <span className="font-medium text-[#3B2A35]">₹{delivery}</span>}
//                   </div>

//                   <div className="border-t border-rose-50 pt-3 flex justify-between items-center">
//                     <span className="font-bold text-[#3B2A35]">Total Amount</span>
//                     <span className="text-lg font-extrabold text-[#3B2A35]">₹{total.toLocaleString()}</span>
//                   </div>

//                   {savedAmount + couponDiscount > 0 && (
//                     <div className="bg-[#F3FBF4] border border-green-100 rounded-xl px-3 py-2 text-xs font-semibold text-[#6B8F71] text-center">
//                       🎉 You're saving ₹{(savedAmount + couponDiscount).toLocaleString()} on this order!
//                     </div>
//                   )}
//                 </div>

//                 <div className="px-5 pb-5">
//                   <Link
//                     to="/checkout"
//                     className="block w-full text-center py-3.5 rounded-full font-bold text-sm text-white transition-all hover:shadow-xl hover:-translate-y-0.5"
//                     style={{ background: "linear-gradient(135deg,#C2556A,#E8956D)" }}
//                   >
//                     Proceed to Checkout →
//                   </Link>
//                   <p className="text-[10px] text-center text-rose-900/35 mt-2 flex items-center justify-center gap-1">
//                     <Shield size={10} /> Secured by 256-bit SSL encryption
//                   </p>
//                 </div>
//               </div>

//               {/* Gift wrap upsell */}
//               <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-4 flex items-center gap-3">
//                 <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
//                   style={{ background: "linear-gradient(135deg,#FFF0F3,#FFF6EC)" }}>
//                   <Gift size={18} className="text-[#C2556A]" />
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-xs font-bold text-[#3B2A35]">Add Gift Wrapping 🎀</p>
//                   <p className="text-[11px] text-rose-900/40">Make it extra special</p>
//                 </div>
//                 <button className="shrink-0 text-[11px] font-bold text-[#C2556A] border border-rose-200 rounded-full px-3 py-1 hover:bg-rose-50 transition-colors">
//                   + ₹49
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* ════ YOU MAY ALSO LIKE ════ */}
//           <div className="mt-8">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-base font-bold text-[#3B2A35]">You may also like 💝</h3>
//               <Link to="/products" className="text-xs text-[#C2556A] font-semibold hover:underline flex items-center gap-0.5">
//                 See all <ChevronRight size={13} />
//               </Link>
//             </div>
//             <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
//               {SUGGESTED.map((s) => {
//                 const d = discount(s.price, s.originalPrice);
//                 return (
//                   <Link key={s.id} to={`/products/${s.id}`}>
//                     <motion.div
//                       whileHover={{ y: -3 }}
//                       className="bg-white rounded-2xl border border-rose-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
//                     >
//                       <div className="relative aspect-square bg-[#FFF8F6] overflow-hidden">
//                         <img src={s.image} alt={s.title}
//                           className="w-full h-full object-contain p-3 transition-transform duration-300 hover:scale-105" />
//                         {d && (
//                           <span className="absolute top-2 left-2 text-[9px] font-extrabold text-white px-1.5 py-0.5 rounded-full"
//                             style={{ background: "linear-gradient(135deg,#C2556A,#E8956D)" }}>
//                             -{d}%
//                           </span>
//                         )}
//                       </div>
//                       <div className="p-3">
//                         <p className="text-[11px] font-semibold text-[#3B2A35] line-clamp-2 leading-snug mb-1">{s.title}</p>
//                         <div className="flex items-baseline gap-1.5">
//                           <span className="text-xs font-extrabold text-[#3B2A35]">₹{s.price.toLocaleString()}</span>
//                           {s.originalPrice && (
//                             <span className="text-[10px] text-rose-900/35 line-through">₹{s.originalPrice.toLocaleString()}</span>
//                           )}
//                         </div>
//                       </div>
//                     </motion.div>
//                   </Link>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ── MOBILE STICKY CHECKOUT BAR ── */}
//       {!isEmpty && (
//         <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden"
//           style={{ background: "rgba(254,249,245,0.97)", backdropFilter: "blur(12px)", borderTop: "1px solid #fce4e8" }}>
//           <div className="px-4 py-3 flex items-center gap-3">
//             <div>
//               <p className="text-[10px] text-rose-900/40 font-medium">Total Amount</p>
//               <p className="text-base font-extrabold text-[#3B2A35]">₹{total.toLocaleString()}</p>
//             </div>
//             {savedAmount + couponDiscount > 0 && (
//               <span className="text-[10px] font-semibold text-[#6B8F71] bg-green-50 px-2 py-0.5 rounded-full">
//                 Save ₹{(savedAmount + couponDiscount).toLocaleString()}
//               </span>
//             )}
//             <Link
//               to="/checkout"
//               className="ml-auto px-7 py-3 rounded-full font-bold text-sm text-white transition-all hover:shadow-lg"
//               style={{ background: "linear-gradient(135deg,#C2556A,#E8956D)" }}
//             >
//               Checkout →
//             </Link>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// import { useMemo, useState } from "react";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   removeFromCart,
//   increaseQty,
//   decreaseQty,
//   clearCart,
// } from "../features/cart/cartSlice";
// import {
//   Trash2, Plus, Minus, ShoppingBag, Tag, ChevronRight,
//   Gift, Truck, Shield, RotateCcw, Heart, Star,
//   ChevronDown, ChevronUp, Package, Sparkles, X, Store,
//   PackageOpen, Info,
// } from "lucide-react";
// import { couponsConfig } from "../data/dataConfig";

// /* ─── CONSTANTS ──────────────────────────────────────────────── */
// const FREE_DELIVERY_THRESHOLD = 999;
// const DELIVERY_FEE            = 79;
// const COMBINE_PACKING_CHARGE  = 99;

// /* ─── HELPER ─────────────────────────────────────────────────── */
// function discountPct(price, originalPrice) {
//   if (!originalPrice || originalPrice <= price) return null;
//   return Math.round(((originalPrice - price) / originalPrice) * 100);
// }

// /* ════════════════════════════════════════════════════════════════
//    CART PAGE
// ════════════════════════════════════════════════════════════════ */
// export default function CartPage() {
//   const dispatch   = useDispatch();
//   const cartItems  = useSelector((state) => state.cart.items);

//   /* ── LOCAL STATE ── */
//   const [couponInput,    setCouponInput]    = useState("");
//   const [appliedCoupon,  setAppliedCoupon]  = useState(null);
//   const [couponError,    setCouponError]    = useState("");
//   const [showCouponBox,  setShowCouponBox]  = useState(false);
//   const [wishlistIds,    setWishlistIds]    = useState([]);
//   const [deliveryMode,   setDeliveryMode]   = useState("separate"); // "separate" | "combined"

//   /* ── GROUP BY SELLER ──────────────────────────────────────────
//      Each cart item must have sellerId + sellerName from addToCart
//   ─────────────────────────────────────────────────────────────── */
//   const groupedBySeller = useMemo(() => {
//     return cartItems.reduce((acc, item, globalIndex) => {
//       const sid = item.sellerId || "unknown";
//       if (!acc[sid]) {
//         acc[sid] = {
//           sellerId:   sid,
//           sellerName: item.sellerName || "Unknown Seller",
//           items:      [],
//         };
//       }
//       acc[sid].items.push({ ...item, _globalIndex: globalIndex });
//       return acc;
//     }, {});
//   }, [cartItems]);

//   const sellerGroups   = Object.values(groupedBySeller);
//   const isMultiSeller  = sellerGroups.length > 1;
//   const isEmpty        = cartItems.length === 0;

//   /* ── PRICE MATH ───────────────────────────────────────────────
//      totalPrice per item is already stored in slice (price * qty + addons)
//   ─────────────────────────────────────────────────────────────── */
//   const itemsTotal    = cartItems.reduce((s, i) => s + i.totalPrice, 0);

//   const originalTotal = cartItems.reduce(
//     (s, i) => s + (i.originalPrice || i.price) * i.quantity,
//     0
//   );
//   const savedAmount   = Math.max(0, originalTotal - itemsTotal);

//   // coupon
//   const couponDiscount = appliedCoupon
//     ? appliedCoupon.type === "percentage"
//       ? Math.round(itemsTotal * (appliedCoupon.discountValue / 100))
//       : appliedCoupon.discountValue
//     : 0;

//   // packing charge only when combined & multi-seller
//   const packingCharge  = isMultiSeller && deliveryMode === "combined" ? COMBINE_PACKING_CHARGE : 0;

//   // delivery
//   const deliveryFee    = itemsTotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;

//   const grandTotal     = itemsTotal - couponDiscount + packingCharge + deliveryFee;

//   /* ── ACTIONS ── */
//   const toggleWishlist = (id) =>
//     setWishlistIds((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);

//   const applyCoupon = () => {
//     const found = couponsConfig.find(
//       (c) => c.code.toUpperCase() === couponInput.toUpperCase().trim()
//     );
//     if (found) {
//       if (itemsTotal < found.minAmount) {
//         setCouponError(`Minimum order ₹${found.minAmount} required for this coupon.`);
//         setAppliedCoupon(null);
//       } else {
//         setAppliedCoupon(found);
//         setCouponError("");
//       }
//     } else {
//       setCouponError("Invalid coupon code. Please try again.");
//       setAppliedCoupon(null);
//     }
//   };

//   /* ════════════════════════════════════════════════════════════
//      EMPTY STATE
//   ════════════════════════════════════════════════════════════ */
//   if (isEmpty) {
//     return (
//       <div className="min-h-screen bg-[#FEF9F5] flex flex-col items-center justify-center py-28 px-4 text-center">
//         <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
//           style={{ background: "linear-gradient(135deg,#FFF0F3,#FFF6EC)" }}>
//           <ShoppingBag className="w-10 h-10 text-[#C2556A]" />
//         </div>
//         <h2 className="text-xl font-bold text-[#3B2A35] mb-2">Your cart is empty 🎁</h2>
//         <p className="text-sm text-rose-900/50 mb-6 max-w-xs">
//           Looks like you haven't added any hampers yet. Let's find something special!
//         </p>
//         <Link to="/products"
//           className="px-8 py-3 rounded-full font-bold text-sm text-white hover:shadow-lg hover:-translate-y-0.5 transition-all"
//           style={{ background: "linear-gradient(135deg,#C2556A,#E8956D)" }}>
//           Browse Hampers ✨
//         </Link>
//       </div>
//     );
//   }

//   /* ════════════════════════════════════════════════════════════
//      MAIN RENDER
//   ════════════════════════════════════════════════════════════ */
//   return (
//     <div className="min-h-screen bg-[#FEF9F5]">

//       {/* ── STICKY HEADER ── */}
//       <div className="bg-white border-b border-rose-100 sticky top-0 z-30">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3">
//           <ShoppingBag className="w-5 h-5 text-[#C2556A]" />
//           <h1 className="text-base sm:text-lg font-bold text-[#3B2A35]">
//             My Cart
//             <span className="ml-2 text-xs font-semibold text-white bg-[#C2556A] rounded-full px-2 py-0.5">
//               {cartItems.length}
//             </span>
//           </h1>
//           <Link to="/products"
//             className="ml-auto text-xs text-[#C2556A] font-semibold hover:underline flex items-center gap-1">
//             Continue Shopping <ChevronRight size={13} />
//           </Link>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 pb-32 lg:pb-10">

//         {/* FREE DELIVERY NUDGE */}
//         {deliveryFee > 0 ? (
//           <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
//             className="mb-4 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 flex items-center gap-2 text-xs font-medium text-amber-800">
//             <Truck size={14} className="text-amber-500 shrink-0" />
//             Add <span className="font-bold mx-1">₹{(FREE_DELIVERY_THRESHOLD - itemsTotal).toLocaleString()}</span> more for FREE delivery 🎀
//           </motion.div>
//         ) : (
//           <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
//             className="mb-4 bg-[#F3FBF4] border border-green-200 rounded-xl px-4 py-2.5 flex items-center gap-2 text-xs font-medium text-green-800">
//             <Truck size={14} className="text-green-500 shrink-0" />
//             🎉 You get FREE delivery on this order!
//           </motion.div>
//         )}

//         <div className="flex flex-col lg:flex-row gap-5 items-start">

//           {/* ══════════════════════════════════════════════
//               LEFT — SELLER GROUPS + ITEMS
//           ══════════════════════════════════════════════ */}
//           <div className="flex-1 min-w-0 space-y-4">

//             {sellerGroups.map((group) => (
//               <div key={group.sellerId} className="bg-white rounded-2xl border border-rose-100 shadow-sm overflow-hidden">

//                 {/* Seller header */}
//                 <div className="flex items-center gap-2.5 px-4 py-3 border-b border-rose-50 bg-[#FFF8F6]">
//                   <div className="w-8 h-8 rounded-full flex items-center justify-center"
//                     style={{ background: "linear-gradient(135deg,#FFF0F3,#FFF6EC)" }}>
//                     <Store size={14} className="text-[#C2556A]" />
//                   </div>
//                   <div>
//                     <p className="text-xs font-bold text-[#3B2A35]">{group.sellerName}</p>
//                     <p className="text-[10px] text-rose-900/40">{group.items.length} {group.items.length === 1 ? "item" : "items"}</p>
//                   </div>
//                 </div>

//                 {/* Items in this seller group */}
//                 <div className="divide-y divide-rose-50">
//                   <AnimatePresence>
//                     {group.items.map((item) => {
//                       const disc = discountPct(item.price, item.originalPrice);
//                       const idx  = item._globalIndex;

//                       return (
//                         <motion.div
//                           key={`${item.id}-${idx}`}
//                           layout
//                           initial={{ opacity: 0, x: -10 }}
//                           animate={{ opacity: 1, x: 0 }}
//                           exit={{ opacity: 0, x: 60 }}
//                           transition={{ duration: 0.3 }}
//                         >
//                           <div className="flex gap-3 p-4">

//                             {/* Image */}
//                             <div className="relative shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-[#FFF0F3]">
//                               <img
//                                 src={Array.isArray(item.image) ? item.image[0] : item.image}
//                                 alt={item.name || item.title}
//                                 className="w-full h-full object-contain p-2"
//                               />
//                               {disc && (
//                                 <span className="absolute top-1.5 left-1.5 text-[9px] font-extrabold text-white px-1.5 py-0.5 rounded-full"
//                                   style={{ background: "linear-gradient(135deg,#C2556A,#E8956D)" }}>
//                                   -{disc}%
//                                 </span>
//                               )}
//                             </div>

//                             {/* Info */}
//                             <div className="flex-1 min-w-0">
//                               <div className="flex items-start justify-between gap-2">
//                                 <Link to={`/products/${item.id}`}>
//                                   <p className="text-sm font-bold text-[#3B2A35] line-clamp-2 leading-snug hover:text-[#C2556A] transition-colors">
//                                     {item.name || item.title}
//                                   </p>
//                                 </Link>
//                                 <button onClick={() => toggleWishlist(item.id)}
//                                   className="shrink-0 p-1.5 rounded-full hover:bg-rose-50 transition-colors">
//                                   <Heart size={15}
//                                     style={wishlistIds.includes(item.id)
//                                       ? { color: "#C2556A", fill: "#C2556A" }
//                                       : { color: "#d1a0ab" }} />
//                                 </button>
//                               </div>

//                               {/* Addons */}
//                               {item.addons && item.addons.length > 0 && (
//                                 <div className="flex flex-wrap gap-1.5 mt-1.5 mb-2">
//                                   {item.addons.map((ad, i) => (
//                                     <span key={i}
//                                       className="inline-flex items-center gap-1 text-[10px] font-semibold bg-[#FFF0F3] text-[#C2556A] border border-rose-100 px-2 py-0.5 rounded-full">
//                                       {typeof ad === "string" ? ad : ad.name || ad.label}
//                                       {(ad.price) ? ` +₹${ad.price}` : ""}
//                                     </span>
//                                   ))}
//                                 </div>
//                               )}

//                               {/* Customizations */}
//                               {item.customizations && Object.keys(item.customizations).length > 0 && (
//                                 <div className="flex flex-wrap gap-1.5 mt-1 mb-2">
//                                   {Object.entries(item.customizations).map(([k, v]) => (
//                                     <span key={k}
//                                       className="text-[10px] bg-amber-50 text-amber-700 border border-amber-100 px-2 py-0.5 rounded-full font-medium">
//                                       {k}: {v}
//                                     </span>
//                                   ))}
//                                 </div>
//                               )}

//                               {/* Price + Qty */}
//                               <div className="flex items-center justify-between flex-wrap gap-2 mt-2">
//                                 <div className="flex items-baseline gap-1.5 flex-wrap">
//                                   <span className="text-base font-extrabold text-[#3B2A35]">
//                                     ₹{item.totalPrice?.toLocaleString() ?? (item.price * item.quantity).toLocaleString()}
//                                   </span>
//                                   {item.originalPrice && item.originalPrice > item.price && (
//                                     <span className="text-xs text-rose-900/35 line-through">
//                                       ₹{(item.originalPrice * item.quantity).toLocaleString()}
//                                     </span>
//                                   )}
//                                   {disc && (
//                                     <span className="text-xs font-bold text-[#6B8F71]">{disc}% off</span>
//                                   )}
//                                 </div>

//                                 {/* Qty stepper */}
//                                 <div className="flex items-center border border-rose-200 rounded-full overflow-hidden">
//                                   <button onClick={() => dispatch(decreaseQty(idx))}
//                                     className="w-7 h-7 flex items-center justify-center text-[#C2556A] hover:bg-rose-50 transition-colors">
//                                     <Minus size={12} strokeWidth={3} />
//                                   </button>
//                                   <span className="w-7 h-7 flex items-center justify-center text-xs font-bold text-[#3B2A35] border-x border-rose-100">
//                                     {item.quantity}
//                                   </span>
//                                   <button onClick={() => dispatch(increaseQty(idx))}
//                                     className="w-7 h-7 flex items-center justify-center text-[#C2556A] hover:bg-rose-50 transition-colors">
//                                     <Plus size={12} strokeWidth={3} />
//                                   </button>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>

//                           {/* Action row */}
//                           <div className="flex divide-x divide-rose-50 border-t border-rose-50">
//                             <button onClick={() => dispatch(removeFromCart(idx))}
//                               className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-rose-400 hover:text-[#C2556A] hover:bg-rose-50 transition-all">
//                               <Trash2 size={12} /> Remove
//                             </button>
//                             <button onClick={() => { toggleWishlist(item.id); dispatch(removeFromCart(idx)); }}
//                               className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-rose-900/40 hover:text-[#C2556A] hover:bg-rose-50 transition-all">
//                               <Heart size={12} /> Save for Later
//                             </button>
//                             <Link to={`/products/${item.id}`}
//                               className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-rose-900/40 hover:text-[#C2556A] hover:bg-rose-50 transition-all">
//                               <Package size={12} /> View Item
//                             </Link>
//                           </div>
//                         </motion.div>
//                       );
//                     })}
//                   </AnimatePresence>
//                 </div>
//               </div>
//             ))}

//             {/* ── MULTI-SELLER DELIVERY MODE ─────────────────── */}
//             <AnimatePresence>
//               {isMultiSeller && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
//                   className="bg-white rounded-2xl border border-amber-200 shadow-sm overflow-hidden"
//                 >
//                   <div className="px-4 py-3 border-b border-amber-100 bg-amber-50 flex items-center gap-2">
//                     <Info size={14} className="text-amber-500 shrink-0" />
//                     <p className="text-xs font-bold text-amber-800">
//                       Items from {sellerGroups.length} different sellers — choose delivery preference
//                     </p>
//                   </div>

//                   <div className="p-4 space-y-3">
//                     {/* Separate delivery */}
//                     <label className={`flex items-start gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all
//                       ${deliveryMode === "separate" ? "border-[#C2556A] bg-rose-50" : "border-rose-100 hover:border-rose-200"}`}>
//                       <input
//                         type="radio" name="deliveryMode" value="separate"
//                         checked={deliveryMode === "separate"}
//                         onChange={() => setDeliveryMode("separate")}
//                         className="accent-[#C2556A] mt-0.5 shrink-0"
//                       />
//                       <div>
//                         <p className="text-sm font-bold text-[#3B2A35] flex items-center gap-1.5">
//                           <Truck size={13} className="text-[#C2556A]" />
//                           Deliver Separately
//                           <span className="text-[10px] font-bold text-[#6B8F71] bg-green-50 border border-green-100 px-2 py-0.5 rounded-full ml-1">FREE</span>
//                         </p>
//                         <p className="text-xs text-rose-900/50 mt-0.5">
//                           Each seller ships their item individually. Arrives at different times.
//                         </p>
//                       </div>
//                     </label>

//                     {/* Combined */}
//                     <label className={`flex items-start gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all
//                       ${deliveryMode === "combined" ? "border-[#C2556A] bg-rose-50" : "border-rose-100 hover:border-rose-200"}`}>
//                       <input
//                         type="radio" name="deliveryMode" value="combined"
//                         checked={deliveryMode === "combined"}
//                         onChange={() => setDeliveryMode("combined")}
//                         className="accent-[#C2556A] mt-0.5 shrink-0"
//                       />
//                       <div>
//                         <p className="text-sm font-bold text-[#3B2A35] flex items-center gap-1.5">
//                           <Gift size={13} className="text-[#C2556A]" />
//                           Combine into One Hamper
//                           <span className="text-[10px] font-bold text-[#C2556A] bg-rose-50 border border-rose-100 px-2 py-0.5 rounded-full ml-1">+₹{COMBINE_PACKING_CHARGE}</span>
//                         </p>
//                         <p className="text-xs text-rose-900/50 mt-0.5">
//                           All items packed into a single beautiful gift box. Perfect for gifting! 🎁
//                         </p>
//                       </div>
//                     </label>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             {/* ── COUPON ──────────────────────────────────────── */}
//             <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-4">
//               <button onClick={() => setShowCouponBox(!showCouponBox)}
//                 className="w-full flex items-center justify-between text-sm font-bold text-[#3B2A35]">
//                 <span className="flex items-center gap-2">
//                   <Tag size={15} className="text-[#C2556A]" />
//                   Apply Coupon Code
//                   {appliedCoupon && (
//                     <span className="text-[10px] font-bold text-[#6B8F71] bg-green-50 border border-green-100 px-2 py-0.5 rounded-full">
//                       {appliedCoupon.code} applied ✓
//                     </span>
//                   )}
//                 </span>
//                 {showCouponBox ? <ChevronUp size={15} className="text-rose-300" /> : <ChevronDown size={15} className="text-rose-300" />}
//               </button>

//               <AnimatePresence>
//                 {showCouponBox && (
//                   <motion.div
//                     initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
//                     exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
//                     className="overflow-hidden"
//                   >
//                     <div className="mt-3 flex gap-2">
//                       <input
//                         value={couponInput}
//                         onChange={(e) => setCouponInput(e.target.value)}
//                         onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
//                         placeholder="Enter coupon code"
//                         className="flex-1 border border-rose-200 rounded-xl px-3 py-2 text-sm text-[#3B2A35] bg-[#FEF9F5] focus:outline-none focus:ring-2 focus:ring-[#C2556A]/30 focus:border-[#C2556A] placeholder:text-rose-300"
//                       />
//                       <button onClick={applyCoupon}
//                         className="px-5 py-2 rounded-xl text-sm font-bold text-white transition-all hover:shadow-md"
//                         style={{ background: "linear-gradient(135deg,#C2556A,#E8956D)" }}>
//                         Apply
//                       </button>
//                     </div>

//                     {couponError && (
//                       <p className="text-xs text-rose-400 mt-2 flex items-center gap-1">
//                         <X size={11} /> {couponError}
//                       </p>
//                     )}
//                     {appliedCoupon && !couponError && (
//                       <p className="text-xs text-[#6B8F71] font-semibold mt-2 flex items-center gap-1">
//                         ✓ Coupon applied! You save ₹{couponDiscount}
//                       </p>
//                     )}

//                     {/* Available coupons from config */}
//                     {couponsConfig.length > 0 && (
//                       <div className="mt-3 space-y-2">
//                         <p className="text-[10px] text-rose-900/40 font-semibold uppercase tracking-wide">Available Coupons</p>
//                         {couponsConfig.map((c) => (
//                           <button key={c.id}
//                             onClick={() => { setCouponInput(c.code); setAppliedCoupon(c); setCouponError(""); }}
//                             className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl border text-left transition-all
//                               ${appliedCoupon?.id === c.id
//                                 ? "border-[#C2556A] bg-rose-50"
//                                 : "border-rose-100 bg-[#FEF9F5] hover:border-[#E8956D]"}`}
//                           >
//                             <div>
//                               <p className="text-xs font-bold text-[#C2556A]">{c.code}</p>
//                               <p className="text-[11px] text-rose-900/50">{c.description}</p>
//                             </div>
//                             {appliedCoupon?.id === c.id
//                               ? <span className="text-[10px] font-bold text-[#6B8F71] bg-green-50 px-2 py-0.5 rounded-full shrink-0">Applied ✓</span>
//                               : <span className="text-[10px] font-bold text-[#C2556A] shrink-0">Tap to apply</span>}
//                           </button>
//                         ))}
//                       </div>
//                     )}
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>

//             {/* ── TRUST BADGES ── */}
//             <div className="grid grid-cols-3 gap-2.5">
//               {[
//                 { icon: Truck,     label: "Free Delivery",  sub: "Orders above ₹999" },
//                 { icon: Shield,    label: "Secure Payment", sub: "256-bit SSL" },
//                 { icon: RotateCcw, label: "Easy Returns",   sub: "7-day hassle-free" },
//               ].map(({ icon: Icon, label, sub }) => (
//                 <div key={label} className="bg-white rounded-xl border border-rose-50 p-3 text-center shadow-sm">
//                   <div className="w-8 h-8 rounded-full mx-auto mb-1.5 flex items-center justify-center"
//                     style={{ background: "linear-gradient(135deg,#FFF0F3,#FFF6EC)" }}>
//                     <Icon size={14} className="text-[#C2556A]" />
//                   </div>
//                   <p className="text-[11px] font-bold text-[#3B2A35]">{label}</p>
//                   <p className="text-[9px] text-rose-900/40">{sub}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* ══════════════════════════════════════════════
//               RIGHT — ORDER SUMMARY
//           ══════════════════════════════════════════════ */}
//           <div className="w-full lg:w-80 xl:w-96 shrink-0 space-y-3 lg:sticky lg:top-20">

//             {/* Summary card */}
//             <div className="bg-white rounded-2xl border border-rose-100 shadow-sm overflow-hidden">
//               <div className="px-5 py-4 border-b border-rose-50">
//                 <h2 className="text-sm font-bold text-[#3B2A35] flex items-center gap-2">
//                   <Sparkles size={14} className="text-[#C2556A]" />
//                   Order Summary
//                 </h2>
//               </div>

//               <div className="px-5 py-4 space-y-3 text-sm">
//                 <div className="flex justify-between text-rose-900/60">
//                   <span>Price ({cartItems.length} {cartItems.length === 1 ? "item" : "items"})</span>
//                   <span className="font-medium text-[#3B2A35]">₹{originalTotal.toLocaleString()}</span>
//                 </div>

//                 {savedAmount > 0 && (
//                   <div className="flex justify-between text-[#6B8F71]">
//                     <span>Discount</span>
//                     <span className="font-semibold">-₹{savedAmount.toLocaleString()}</span>
//                   </div>
//                 )}

//                 {couponDiscount > 0 && (
//                   <div className="flex justify-between text-[#6B8F71]">
//                     <span className="flex items-center gap-1">
//                       <Tag size={11} /> Coupon ({appliedCoupon?.code})
//                       <button onClick={() => { setAppliedCoupon(null); setCouponInput(""); }}
//                         className="text-rose-300 hover:text-rose-500 ml-1">
//                         <X size={11} />
//                       </button>
//                     </span>
//                     <span className="font-semibold">-₹{couponDiscount}</span>
//                   </div>
//                 )}

//                 {packingCharge > 0 && (
//                   <div className="flex justify-between text-rose-900/60">
//                     <span className="flex items-center gap-1">
//                       <Gift size={11} className="text-[#C2556A]" /> Packing Charge
//                     </span>
//                     <span className="font-medium text-[#3B2A35]">₹{packingCharge}</span>
//                   </div>
//                 )}

//                 <div className="flex justify-between text-rose-900/60">
//                   <span>Delivery</span>
//                   {deliveryFee === 0
//                     ? <span className="font-semibold text-[#6B8F71]">FREE 🎉</span>
//                     : <span className="font-medium text-[#3B2A35]">₹{deliveryFee}</span>}
//                 </div>

//                 <div className="border-t border-rose-50 pt-3 flex justify-between items-center">
//                   <span className="font-bold text-[#3B2A35]">Total Amount</span>
//                   <span className="text-lg font-extrabold text-[#3B2A35]">₹{grandTotal.toLocaleString()}</span>
//                 </div>

//                 {(savedAmount + couponDiscount) > 0 && (
//                   <div className="bg-[#F3FBF4] border border-green-100 rounded-xl px-3 py-2 text-xs font-semibold text-[#6B8F71] text-center">
//                     🎉 You're saving ₹{(savedAmount + couponDiscount).toLocaleString()} on this order!
//                   </div>
//                 )}
//               </div>

//               <div className="px-5 pb-5">
//                 <Link to="/checkout"
//                   className="block w-full text-center py-3.5 rounded-full font-bold text-sm text-white transition-all hover:shadow-xl hover:-translate-y-0.5"
//                   style={{ background: "linear-gradient(135deg,#C2556A,#E8956D)" }}>
//                   Proceed to Checkout →
//                 </Link>
//                 <p className="text-[10px] text-center text-rose-900/35 mt-2 flex items-center justify-center gap-1">
//                   <Shield size={10} /> Secured by 256-bit SSL encryption
//                 </p>
//               </div>
//             </div>

//             {/* Gift wrap upsell */}
//             <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-4 flex items-center gap-3">
//               <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
//                 style={{ background: "linear-gradient(135deg,#FFF0F3,#FFF6EC)" }}>
//                 <Gift size={18} className="text-[#C2556A]" />
//               </div>
//               <div className="flex-1 min-w-0">
//                 <p className="text-xs font-bold text-[#3B2A35]">Add Gift Wrapping 🎀</p>
//                 <p className="text-[11px] text-rose-900/40">Make it extra special</p>
//               </div>
//               <button className="shrink-0 text-[11px] font-bold text-[#C2556A] border border-rose-200 rounded-full px-3 py-1 hover:bg-rose-50 transition-colors">
//                 + ₹49
//               </button>
//             </div>

//             {/* Clear cart */}
//             <button onClick={() => dispatch(clearCart())}
//               className="w-full text-xs text-rose-300 hover:text-rose-400 font-medium py-2 transition-colors">
//               Clear entire cart
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ── MOBILE STICKY CHECKOUT BAR ── */}
//       <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden border-t border-rose-100"
//         style={{ background: "rgba(254,249,245,0.97)", backdropFilter: "blur(12px)" }}>
//         <div className="px-4 py-3 flex items-center gap-3">
//           <div>
//             <p className="text-[10px] text-rose-900/40 font-medium">Total Amount</p>
//             <p className="text-base font-extrabold text-[#3B2A35]">₹{grandTotal.toLocaleString()}</p>
//           </div>
//           {(savedAmount + couponDiscount) > 0 && (
//             <span className="text-[10px] font-semibold text-[#6B8F71] bg-green-50 px-2 py-0.5 rounded-full">
//               Save ₹{(savedAmount + couponDiscount).toLocaleString()}
//             </span>
//           )}
//           <Link to="/checkout"
//             className="ml-auto px-7 py-3 rounded-full font-bold text-sm text-white transition-all hover:shadow-lg"
//             style={{ background: "linear-gradient(135deg,#C2556A,#E8956D)" }}>
//             Checkout →
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} from "../features/cart/cartSlice";
import {
  Trash2, Plus, Minus, ShoppingBag, Tag, ChevronRight,
  Gift, Truck, Shield, RotateCcw, Heart, Star,
  ChevronDown, ChevronUp, Package, Sparkles, X, Store,
  PackageOpen, Info,
} from "lucide-react";
import { couponsConfig } from "../data/dataConfig";

/* ─── CONSTANTS ──────────────────────────────────────────────── */
const FREE_DELIVERY_THRESHOLD = 999;
const DELIVERY_FEE            = 79;
const COMBINE_PACKING_CHARGE  = 99;

/* ─── HELPER ─────────────────────────────────────────────────── */
function discountPct(price, originalPrice) {
  if (!originalPrice || originalPrice <= price) return null;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

/* ════════════════════════════════════════════════════════════════
   CART PAGE
════════════════════════════════════════════════════════════════ */
export default function CartPage() {
  const dispatch   = useDispatch();
  const cartItems  = useSelector((state) => state.cart.items);

  /* ── LOCAL STATE ── */
  const [couponInput,    setCouponInput]    = useState("");
  const [appliedCoupon,  setAppliedCoupon]  = useState(null);
  const [couponError,    setCouponError]    = useState("");
  const [showCouponBox,  setShowCouponBox]  = useState(false);
  const [wishlistIds,    setWishlistIds]    = useState([]);
  const [deliveryMode,   setDeliveryMode]   = useState("separate"); // "separate" | "combined"

  const navigate = useNavigate();

  const handleCombineHamper = ()=>{
    navigate("/custom-hamper",{
      state:{
        fromCart:true,
        cartItems:cartItems,
      },
    });
  };

  /* ── GROUP BY SELLER ──────────────────────────────────────────
     Each cart item must have sellerId + sellerName from addToCart
  ─────────────────────────────────────────────────────────────── */
  const groupedBySeller = useMemo(() => {
    return cartItems.reduce((acc, item, globalIndex) => {
      const sid = item.sellerId || "unknown";
      if (!acc[sid]) {
        acc[sid] = {
          sellerId:   sid,
          sellerName: item.sellerName || "Unknown Seller",
          items:      [],
        };
      }
      acc[sid].items.push({ ...item, _globalIndex: globalIndex });
      return acc;
    }, {});
  }, [cartItems]);

  const sellerGroups   = Object.values(groupedBySeller);
  const isMultiSeller  = sellerGroups.length > 1;
  const isEmpty        = cartItems.length === 0;

  /* ── PRICE MATH ───────────────────────────────────────────────
     totalPrice per item is already stored in slice (price * qty + addons)
  ─────────────────────────────────────────────────────────────── */
  const itemsTotal    = cartItems.reduce((s, i) => s + i.totalPrice, 0);

  const originalTotal = cartItems.reduce(
    (s, i) => s + (i.originalPrice || i.price) * i.quantity,
    0
  );
  const savedAmount   = Math.max(0, originalTotal - itemsTotal);

  // coupon
  const couponDiscount = appliedCoupon
    ? appliedCoupon.type === "percentage"
      ? Math.round(itemsTotal * (appliedCoupon.discountValue / 100))
      : appliedCoupon.discountValue
    : 0;

  // packing charge only when combined & multi-seller
  const packingCharge  = isMultiSeller && deliveryMode === "combined" ? COMBINE_PACKING_CHARGE : 0;

  // delivery
  const deliveryFee    = itemsTotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;

  const grandTotal     = itemsTotal - couponDiscount + packingCharge + deliveryFee;

  /* ── ACTIONS ── */
  const toggleWishlist = (id) =>
    setWishlistIds((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);

  const applyCoupon = () => {
    const found = couponsConfig.find(
      (c) => c.code.toUpperCase() === couponInput.toUpperCase().trim()
    );
    if (found) {
      if (itemsTotal < found.minAmount) {
        setCouponError(`Minimum order ₹${found.minAmount} required for this coupon.`);
        setAppliedCoupon(null);
      } else {
        setAppliedCoupon(found);
        setCouponError("");
      }
    } else {
      setCouponError("Invalid coupon code. Please try again.");
      setAppliedCoupon(null);
    }
  };

  /* ════════════════════════════════════════════════════════════
     EMPTY STATE
  ════════════════════════════════════════════════════════════ */
  if (isEmpty) {
    return (
      <div className="min-h-screen bg-[#FEF9F5] flex flex-col items-center justify-center py-28 px-4 text-center">
        <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
          style={{ background: "linear-gradient(135deg,#FFF0F3,#FFF6EC)" }}>
          <ShoppingBag className="w-10 h-10 text-[#C2556A]" />
        </div>
        <h2 className="text-xl font-bold text-[#3B2A35] mb-2">Your cart is empty 🎁</h2>
        <p className="text-sm text-rose-900/50 mb-6 max-w-xs">
          Looks like you haven't added any hampers yet. Let's find something special!
        </p>
        <Link to="/products"
          className="px-8 py-3 rounded-full font-bold text-sm text-white hover:shadow-lg hover:-translate-y-0.5 transition-all"
          style={{ background: "linear-gradient(135deg,#C2556A,#E8956D)" }}>
          Browse Hampers ✨
        </Link>
      </div>
    );
  }

  /* ════════════════════════════════════════════════════════════
     MAIN RENDER
  ════════════════════════════════════════════════════════════ */
  return (
    <div className="min-h-screen bg-[#FEF9F5]">

      {/* ── STICKY HEADER ── */}
      <div className="bg-white border-b border-rose-100 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3">
          <ShoppingBag className="w-5 h-5 text-[#C2556A]" />
          <h1 className="text-base sm:text-lg font-bold text-[#3B2A35]">
            My Cart
            <span className="ml-2 text-xs font-semibold text-white bg-[#C2556A] rounded-full px-2 py-0.5">
              {cartItems.length}
            </span>
          </h1>
          <Link to="/products"
            className="ml-auto text-xs text-[#C2556A] font-semibold hover:underline flex items-center gap-1">
            Continue Shopping <ChevronRight size={13} />
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 pb-32 lg:pb-10">

        {/* FREE DELIVERY NUDGE */}
        {deliveryFee > 0 ? (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            className="mb-4 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 flex items-center gap-2 text-xs font-medium text-amber-800">
            <Truck size={14} className="text-amber-500 shrink-0" />
            Add <span className="font-bold mx-1">₹{(FREE_DELIVERY_THRESHOLD - itemsTotal).toLocaleString()}</span> more for FREE delivery 🎀
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            className="mb-4 bg-[#F3FBF4] border border-green-200 rounded-xl px-4 py-2.5 flex items-center gap-2 text-xs font-medium text-green-800">
            <Truck size={14} className="text-green-500 shrink-0" />
            🎉 You get FREE delivery on this order!
          </motion.div>
        )}

        <div className="flex flex-col lg:flex-row gap-5 items-start">

          {/* ══════════════════════════════════════════════
              LEFT — CART ITEMS  (exact reference design)
          ══════════════════════════════════════════════ */}
          <div className="flex-1 min-w-0 space-y-3">

            {/* Out-of-stock warning — shown if any item has stock:0 in productSlice */}
            {cartItems.some((it) => it.stock === 0) && (
              <div className="bg-rose-50 border border-rose-200 rounded-xl px-4 py-3 flex items-start gap-2 text-xs text-rose-700">
                <Info size={14} className="shrink-0 mt-0.5 text-rose-400" />
                <span>Some items in your cart are out of stock and won't be included in your order.</span>
              </div>
            )}

            <AnimatePresence>
              {cartItems.map((item, globalIndex) => {
                const disc        = discountPct(item.price, item.originalPrice);
                const inStock     = item.stock > 0;
                const imgSrc      = Array.isArray(item.image) ? item.image[0] : item.image;

                // addons can be: undefined | null | [] | {giftCard:{...}, giftBox:{...}, wrapping:{...}}
                const addonsArray = Array.isArray(item.addons)
                  ? item.addons
                  : item.addons && typeof item.addons === "object"
                    ? Object.values(item.addons).filter(Boolean)
                    : [];

                const addonTotal = addonsArray.reduce(
                  (sum, ad) => sum + (ad?.price ?? 0), 0
                );
                const displayPrice = item.totalPrice ?? (item.price * item.quantity + addonTotal * item.quantity);

                return (
                  <motion.div
                    key={`${item.id}-${globalIndex}`}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    exit={{ opacity: 0, x: 60 }}
                    transition={{ duration: 0.3 }}
                    className={`bg-white rounded-2xl border shadow-sm overflow-hidden
                      ${inStock ? "border-rose-100" : "border-rose-200 opacity-70"}`}
                  >
                    {/* Out of stock ribbon */}
                    {!inStock && (
                      <div className="bg-rose-50 border-b border-rose-100 px-4 py-1.5 text-xs font-semibold text-rose-500 flex items-center gap-1.5">
                        <X size={12} /> Out of Stock — removed from total
                      </div>
                    )}

                    <div className="flex gap-3 p-4">

                      {/* Image */}
                      <div className="relative shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-[#FFF0F3]">
                        <img
                          src={imgSrc}
                          alt={item.name || item.title}
                          className="w-full h-full object-contain p-2"
                        />
                        {disc && inStock && (
                          <span
                            className="absolute top-1.5 left-1.5 text-[9px] font-extrabold text-white px-1.5 py-0.5 rounded-full"
                            style={{ background: "linear-gradient(135deg,#C2556A,#E8956D)" }}
                          >
                            -{disc}%
                          </span>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <Link to={`/products/${item.id}`}>
                              <p className="text-sm font-bold text-[#3B2A35] line-clamp-2 leading-snug hover:text-[#C2556A] transition-colors">
                                {item.name || item.title}
                              </p>
                            </Link>
                            {/* subtitle / description snippet */}
                            {item.description && (
                              <p className="text-[11px] text-rose-900/40 mt-0.5 line-clamp-1">{item.description}</p>
                            )}
                            <p className="text-[11px] text-rose-900/40 mt-0.5">
                              Sold by{" "}
                              <span className="font-medium text-[#C2556A]">{item.sellerName}</span>
                            </p>
                          </div>

                          {/* Wishlist */}
                          <button
                            onClick={() => toggleWishlist(item.id)}
                            className="shrink-0 p-1.5 rounded-full hover:bg-rose-50 transition-colors"
                          >
                            <Heart
                              size={16}
                              style={wishlistIds.includes(item.id)
                                ? { color: "#C2556A", fill: "#C2556A" }
                                : { color: "#d1a0ab" }}
                            />
                          </button>
                        </div>

                        {/* Star rating — from productSlice rating field */}
                        {item.rating > 0 && (
                          <div className="flex items-center gap-1 mt-1.5 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-2.5 h-2.5"
                                style={i < Math.floor(item.rating)
                                  ? { color: "#D4A847", fill: "#D4A847" }
                                  : { color: "#e5e7eb" }} />
                            ))}
                            {item.reviews > 0 && (
                              <span className="text-[10px] text-rose-900/40 ml-0.5">({item.reviews})</span>
                            )}
                          </div>
                        )}

                        {/* Add-ons — from cartSlice addons array */}
                        {/* Add-ons — normalized from array or object */}
                        {addonsArray.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-2">
                            {addonsArray.map((ad, i) => {
                              const label = typeof ad === "string" ? ad : (ad?.name || ad?.label || "Add-on");
                              const price = typeof ad === "string" ? null : ad?.price;
                              return (
                                <span key={i}
                                  className="inline-flex items-center gap-1 text-[10px] font-semibold bg-[#FFF0F3] text-[#C2556A] border border-rose-100 px-2 py-0.5 rounded-full">
                                  {label}{price ? ` +₹${price}` : ""}
                                </span>
                              );
                            })}
                          </div>
                        )}

                        {/* Customizations — from cartSlice customizations object */}
                        {item.customizations && Object.keys(item.customizations).length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-2">
                            {Object.entries(item.customizations).map(([k, v]) => v && (
                              <span key={k}
                                className="text-[10px] bg-amber-50 text-amber-700 border border-amber-100 px-2 py-0.5 rounded-full font-medium">
                                {k}: {v}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Price + Qty row */}
                        <div className="flex items-center justify-between flex-wrap gap-2 mt-1">
                          {/* Price */}
                          <div className="flex items-baseline gap-1.5 flex-wrap">
                            <span className="text-base font-extrabold text-[#3B2A35]">
                              ₹{displayPrice.toLocaleString()}
                            </span>
                            {item.originalPrice && item.originalPrice > item.price && (
                              <span className="text-xs text-rose-900/35 line-through">
                                ₹{(item.originalPrice * item.quantity).toLocaleString()}
                              </span>
                            )}
                            {disc && inStock && (
                              <span className="text-xs font-bold text-[#6B8F71]">{disc}% off</span>
                            )}
                          </div>

                          {/* Qty stepper — only if in stock */}
                          {inStock && (
                            <div className="flex items-center border border-rose-200 rounded-full overflow-hidden">
                              <button
                                onClick={() => dispatch(decreaseQty(globalIndex))}
                                className="w-7 h-7 flex items-center justify-center text-[#C2556A] hover:bg-rose-50 transition-colors"
                              >
                                <Minus size={12} strokeWidth={3} />
                              </button>
                              <span className="w-7 h-7 flex items-center justify-center text-xs font-bold text-[#3B2A35] border-x border-rose-100">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => dispatch(increaseQty(globalIndex))}
                                className="w-7 h-7 flex items-center justify-center text-[#C2556A] hover:bg-rose-50 transition-colors"
                              >
                                <Plus size={12} strokeWidth={3} />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action row */}
                    <div className="flex items-center border-t border-rose-50 divide-x divide-rose-50">
                      <button
                        onClick={() => dispatch(removeFromCart(globalIndex))}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-rose-400 hover:text-[#C2556A] hover:bg-rose-50 transition-all"
                      >
                        <Trash2 size={13} /> Remove
                      </button>
                      <button
                        onClick={() => { toggleWishlist(item.id); dispatch(removeFromCart(globalIndex)); }}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-rose-900/40 hover:text-[#C2556A] hover:bg-rose-50 transition-all"
                      >
                        <Heart size={13} /> Save for Later
                      </button>
                      <Link
                        to={`/products/${item.id}`}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-rose-900/40 hover:text-[#C2556A] hover:bg-rose-50 transition-all"
                      >
                        <Package size={13} /> View Details
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* ── MULTI-SELLER DELIVERY MODE ── */}
            <AnimatePresence>
              {isMultiSeller && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="bg-white rounded-2xl border border-amber-200 shadow-sm overflow-hidden"
                >
                  <div className="px-4 py-3 border-b border-amber-100 bg-amber-50 flex items-center gap-2">
                    <Info size={14} className="text-amber-500 shrink-0" />
                    <p className="text-xs font-bold text-amber-800">
                      Items from {sellerGroups.length} sellers — choose your delivery preference
                    </p>
                  </div>
                  <div className="p-4 space-y-3">
                    <label className={`flex items-start gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all
                      ${deliveryMode === "separate" ? "border-[#C2556A] bg-rose-50" : "border-rose-100 hover:border-rose-200"}`}>
                      <input type="radio" name="deliveryMode" value="separate"
                        checked={deliveryMode === "separate"}
                        onChange={() => setDeliveryMode("separate")}
                        className="accent-[#C2556A] mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-bold text-[#3B2A35] flex items-center gap-1.5">
                          <Truck size={13} className="text-[#C2556A]" />
                          Deliver Separately
                          <span className="text-[10px] font-bold text-[#6B8F71] bg-green-50 border border-green-100 px-2 py-0.5 rounded-full ml-1">FREE</span>
                        </p>
                        <p className="text-xs text-rose-900/50 mt-0.5">Each seller ships individually. May arrive at different times.</p>
                      </div>
                    </label>
                    <label className={`flex items-start gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all
                      ${deliveryMode === "combined" ? "border-[#C2556A] bg-rose-50" : "border-rose-100 hover:border-rose-200"}`}>
                      <input type="radio" name="deliveryMode" value="combined"
                        checked={deliveryMode === "combined"}
                        onChange={() => {
                          setDeliveryMode("combined");
    
                        }} 
                        className="accent-[#C2556A] mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-bold text-[#3B2A35] flex items-center gap-1.5">
                          <Gift size={13} className="text-[#C2556A]" />
                          Combine into One Hamper
                          <span className="text-[10px] font-bold text-[#C2556A] bg-rose-50 border border-rose-100 px-2 py-0.5 rounded-full ml-1">+₹{COMBINE_PACKING_CHARGE}</span>
                        </p>
                        <p className="text-xs text-rose-900/50 mt-0.5">All items packed into one beautiful gift box 🎁</p>
                      </div>
                    </label>

                    {deliveryMode === "combined" && (
                      <div className="flex justify-center mt-3">
                        <button
                          onClick={handleCombineHamper}
                          className="relative overflow-hidden rounded-full font-bold text-sm text-white px-6 py-2.5 
                                    transition-all duration-300 
                                    hover:scale-105 
                                    hover:shadow-[0_0_15px_rgba(194,85,106,0.5)]"
                          style={{ background: "linear-gradient(135deg,#C2556A,#E8956D)" }}
                        >
                          <span className="relative z-10">Build Combined Hamper →</span>

                          {/* shimmer */}
                          <span className="absolute inset-0 overflow-hidden rounded-full">
                            <span className="shimmer"></span>
                          </span>
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>



            {/* ── COUPON ──────────────────────────────────────── */}
            <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-4">
              <button onClick={() => setShowCouponBox(!showCouponBox)}
                className="w-full flex items-center justify-between text-sm font-bold text-[#3B2A35]">
                <span className="flex items-center gap-2">
                  <Tag size={15} className="text-[#C2556A]" />
                  Apply Coupon Code
                  {appliedCoupon && (
                    <span className="text-[10px] font-bold text-[#6B8F71] bg-green-50 border border-green-100 px-2 py-0.5 rounded-full">
                      {appliedCoupon.code} applied ✓
                    </span>
                  )}
                </span>
                {showCouponBox ? <ChevronUp size={15} className="text-rose-300" /> : <ChevronDown size={15} className="text-rose-300" />}
              </button>

              <AnimatePresence>
                {showCouponBox && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 flex gap-2">
                      <input
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                        placeholder="Enter coupon code"
                        className="flex-1 border border-rose-200 rounded-xl px-3 py-2 text-sm text-[#3B2A35] bg-[#FEF9F5] focus:outline-none focus:ring-2 focus:ring-[#C2556A]/30 focus:border-[#C2556A] placeholder:text-rose-300"
                      />
                      <button onClick={applyCoupon}
                        className="px-5 py-2 rounded-xl text-sm font-bold text-white transition-all hover:shadow-md"
                        style={{ background: "linear-gradient(135deg,#C2556A,#E8956D)" }}>
                        Apply
                      </button>
                    </div>

                    {couponError && (
                      <p className="text-xs text-rose-400 mt-2 flex items-center gap-1">
                        <X size={11} /> {couponError}
                      </p>
                    )}
                    {appliedCoupon && !couponError && (
                      <p className="text-xs text-[#6B8F71] font-semibold mt-2 flex items-center gap-1">
                        ✓ Coupon applied! You save ₹{couponDiscount}
                      </p>
                    )}

                    {/* Available coupons from config */}
                    {couponsConfig.length > 0 && (
                      <div className="mt-3 space-y-2">
                        <p className="text-[10px] text-rose-900/40 font-semibold uppercase tracking-wide">Available Coupons</p>
                        {couponsConfig.map((c) => (
                          <button key={c.id}
                            onClick={() => { setCouponInput(c.code); setAppliedCoupon(c); setCouponError(""); }}
                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl border text-left transition-all
                              ${appliedCoupon?.id === c.id
                                ? "border-[#C2556A] bg-rose-50"
                                : "border-rose-100 bg-[#FEF9F5] hover:border-[#E8956D]"}`}
                          >
                            <div>
                              <p className="text-xs font-bold text-[#C2556A]">{c.code}</p>
                              <p className="text-[11px] text-rose-900/50">{c.description}</p>
                            </div>
                            {appliedCoupon?.id === c.id
                              ? <span className="text-[10px] font-bold text-[#6B8F71] bg-green-50 px-2 py-0.5 rounded-full shrink-0">Applied ✓</span>
                              : <span className="text-[10px] font-bold text-[#C2556A] shrink-0">Tap to apply</span>}
                          </button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── TRUST BADGES ── */}
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { icon: Truck,     label: "Free Delivery",  sub: "Orders above ₹999" },
                { icon: Shield,    label: "Secure Payment", sub: "256-bit SSL" },
                { icon: RotateCcw, label: "Easy Returns",   sub: "7-day hassle-free" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="bg-white rounded-xl border border-rose-50 p-3 text-center shadow-sm">
                  <div className="w-8 h-8 rounded-full mx-auto mb-1.5 flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg,#FFF0F3,#FFF6EC)" }}>
                    <Icon size={14} className="text-[#C2556A]" />
                  </div>
                  <p className="text-[11px] font-bold text-[#3B2A35]">{label}</p>
                  <p className="text-[9px] text-rose-900/40">{sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ══════════════════════════════════════════════
              RIGHT — ORDER SUMMARY
          ══════════════════════════════════════════════ */}
          <div className="w-full lg:w-80 xl:w-96 shrink-0 space-y-3 lg:sticky lg:top-20">

            {/* Summary card */}
            <div className="bg-white rounded-2xl border border-rose-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-rose-50">
                <h2 className="text-sm font-bold text-[#3B2A35] flex items-center gap-2">
                  <Sparkles size={14} className="text-[#C2556A]" />
                  Order Summary
                </h2>
              </div>

              <div className="px-5 py-4 space-y-3 text-sm">
                <div className="flex justify-between text-rose-900/60">
                  <span>Price ({cartItems.length} {cartItems.length === 1 ? "item" : "items"})</span>
                  <span className="font-medium text-[#3B2A35]">₹{originalTotal.toLocaleString()}</span>
                </div>

                {savedAmount > 0 && (
                  <div className="flex justify-between text-[#6B8F71]">
                    <span>Discount</span>
                    <span className="font-semibold">-₹{savedAmount.toLocaleString()}</span>
                  </div>
                )}

                {couponDiscount > 0 && (
                  <div className="flex justify-between text-[#6B8F71]">
                    <span className="flex items-center gap-1">
                      <Tag size={11} /> Coupon ({appliedCoupon?.code})
                      <button onClick={() => { setAppliedCoupon(null); setCouponInput(""); }}
                        className="text-rose-300 hover:text-rose-500 ml-1">
                        <X size={11} />
                      </button>
                    </span>
                    <span className="font-semibold">-₹{couponDiscount}</span>
                  </div>
                )}

                {packingCharge > 0 && (
                  <div className="flex justify-between text-rose-900/60">
                    <span className="flex items-center gap-1">
                      <Gift size={11} className="text-[#C2556A]" /> Packing Charge
                    </span>
                    <span className="font-medium text-[#3B2A35]">₹{packingCharge}</span>
                  </div>
                )}

                <div className="flex justify-between text-rose-900/60">
                  <span>Delivery</span>
                  {deliveryFee === 0
                    ? <span className="font-semibold text-[#6B8F71]">FREE 🎉</span>
                    : <span className="font-medium text-[#3B2A35]">₹{deliveryFee}</span>}
                </div>

                <div className="border-t border-rose-50 pt-3 flex justify-between items-center">
                  <span className="font-bold text-[#3B2A35]">Total Amount</span>
                  <span className="text-lg font-extrabold text-[#3B2A35]">₹{grandTotal.toLocaleString()}</span>
                </div>

                {(savedAmount + couponDiscount) > 0 && (
                  <div className="bg-[#F3FBF4] border border-green-100 rounded-xl px-3 py-2 text-xs font-semibold text-[#6B8F71] text-center">
                    🎉 You're saving ₹{(savedAmount + couponDiscount).toLocaleString()} on this order!
                  </div>
                )}
              </div>

              <div className="px-5 pb-5">
                <Link to="/checkout"
                  className="block w-full text-center py-3.5 rounded-full font-bold text-sm text-white transition-all hover:shadow-xl hover:-translate-y-0.5"
                  style={{ background: "linear-gradient(135deg,#C2556A,#E8956D)" }}>
                  Proceed to Checkout →
                </Link>
                <p className="text-[10px] text-center text-rose-900/35 mt-2 flex items-center justify-center gap-1">
                  <Shield size={10} /> Secured by 256-bit SSL encryption
                </p>
              </div>
            </div>

            {/* Gift wrap upsell */}
            <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "linear-gradient(135deg,#FFF0F3,#FFF6EC)" }}>
                <Gift size={18} className="text-[#C2556A]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-[#3B2A35]">Add Gift Wrapping 🎀</p>
                <p className="text-[11px] text-rose-900/40">Make it extra special</p>
              </div>
              <button className="shrink-0 text-[11px] font-bold text-[#C2556A] border border-rose-200 rounded-full px-3 py-1 hover:bg-rose-50 transition-colors">
                + ₹49
              </button>
            </div>

            {/* Clear cart */}
            <button onClick={() => dispatch(clearCart())}
              className="w-full text-xs text-rose-300 hover:text-rose-400 font-medium py-2 transition-colors">
              Clear entire cart
            </button>
          </div>
        </div>
      </div>

      {/* ── MOBILE STICKY CHECKOUT BAR ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden border-t border-rose-100"
        style={{ background: "rgba(254,249,245,0.97)", backdropFilter: "blur(12px)" }}>
        <div className="px-4 py-3 flex items-center gap-3">
          <div>
            <p className="text-[10px] text-rose-900/40 font-medium">Total Amount</p>
            <p className="text-base font-extrabold text-[#3B2A35]">₹{grandTotal.toLocaleString()}</p>
          </div>
          {(savedAmount + couponDiscount) > 0 && (
            <span className="text-[10px] font-semibold text-[#6B8F71] bg-green-50 px-2 py-0.5 rounded-full">
              Save ₹{(savedAmount + couponDiscount).toLocaleString()}
            </span>
          )}
          <Link to="/checkout"
            className="ml-auto px-7 py-3 rounded-full font-bold text-sm text-white transition-all hover:shadow-lg"
            style={{ background: "linear-gradient(135deg,#C2556A,#E8956D)" }}>
            Checkout →
          </Link>
        </div>
      </div>
    </div>
  );
}
