// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// export function HamperCartCard({
//   item,
//   globalIndex,
//   dispatch,
//   removeFromCart,
// }) {
//     const navigate = useNavigate();
//   return (
//     <motion.div
//       key={`hamper-${globalIndex}`}
//       layout
//       initial={{ opacity: 0, y: 12 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0, x: 60 }}
//       className="bg-white rounded-2xl border border-rose-100 shadow-sm overflow-hidden"
//     >
//       {/* HEADER */}
//       <div className="bg-gradient-to-r from-[#FFF0F3] to-[#FFF6EC] px-4 py-2 flex items-center gap-2">
//         <span className="text-sm font-bold text-[#C2556A] flex items-center gap-1">
//           🎁 Custom Hamper
//         </span>
//       </div>

//       <div className="p-4 space-y-3">

//         {/* BOX NAME */}
//         <div className="text-sm font-semibold text-[#3B2A35] flex items-center gap-2">
//           <span className="text-[#C2556A]">🎁</span>
//           {item.box?.name || "Gift Box"}
//         </div>

//         {/* PRODUCTS */}
//         <div className="space-y-2">
//           {item.items?.map((prod, i) => (
//             <div
//               key={i}
//               className="flex items-center gap-3 bg-[#FEF9F5] border border-rose-100 rounded-xl p-2"
//             >
//               <img
//                 src={Array.isArray(prod.image) ? prod.image[0] : prod.image}
//                 className="w-12 h-12 object-contain rounded-lg"
//               />

//               <div className="flex-1 min-w-0">
//                 <p className="text-xs font-semibold text-[#3B2A35] line-clamp-1">
//                   {prod.name}
//                 </p>
//                 <p className="text-[10px] text-rose-900/40 line-clamp-1">
//                   {prod.description}
//                 </p>

//                 <p className="text-[10px] text-[#C2556A] font-medium">
//                   {prod.sellerName}
//                 </p>
//               </div>

//               <span className="text-xs font-bold text-[#3B2A35]">
//                 ₹{prod.price}
//               </span>
            
//                               <button
//                                 onClick={() => {
//                                   navigate("/custom-hamper", {
//                                     state: {
//                                       editMode: true,
//                                       hamperData: item,
//                                       hamperIndex: globalIndex,
//                                     },
//                                   });
//                                 }}
//                                 className="text-[11px] text-blue-500 hover:underline mt-1"
//                               >
//                                 Edit Hamper
//                               </button>
                            
//             </div>
//           ))}
//         </div>

//         {/* MESSAGE */}
//         {item.message && (
//           <div className="bg-amber-50 border border-amber-200 rounded-xl p-2 text-xs text-amber-800">
//             💌 "{item.message}"
//           </div>
//         )}

//         {/* TOTAL */}
//         <div className="flex justify-between items-center pt-2 border-t border-rose-50">
//           <span className="text-sm font-bold text-[#3B2A35]">
//             Total
//           </span>
//           <span className="text-base font-extrabold text-[#3B2A35]">
//             ₹{item.totalPrice}
//           </span>
//         </div>
//       </div>

//       {/* ACTION */}
//       <div className="flex border-t border-rose-50">
//         <button
//           onClick={() => dispatch(removeFromCart(globalIndex))}
//           className="flex-1 py-2 text-xs text-rose-400 hover:text-[#C2556A] hover:bg-rose-50"
//         >
//           Remove
//         </button>
//       </div>
//     </motion.div>
//   );
// }

import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Trash2, Package, Gift, ChevronDown, ChevronUp,
  Star, Pencil, MessageCircle,
} from "lucide-react";

export function HamperCartCard({ item, globalIndex, dispatch, removeFromCart }) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(true);

  const itemCount    = item.items?.length ?? 0;
  const wrapping     = item.wrapping;
  const box          = item.box;
  const message      = item.message;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, x: 60 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl border border-rose-100 shadow-sm overflow-hidden"
    >
      {/* ── HAMPER HEADER RIBBON ── */}
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{ background: "linear-gradient(90deg,#FFF0F3,#FFF6EC)" }}
      >
        <div className="flex items-center gap-2">
          <Gift size={14} className="text-[#C2556A]" />
          <span className="text-xs font-extrabold text-[#C2556A] tracking-wide uppercase">
            Custom Hamper
          </span>
          <span className="text-[10px] bg-[#C2556A]/10 text-[#C2556A] border border-rose-100 px-2 py-0.5 rounded-full font-semibold">
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </span>
        </div>

        {/* Edit + collapse toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              navigate("/custom-hamper", {
                state: { editMode: true, hamperData: item, hamperIndex: globalIndex },
              })
            }
            className="flex items-center gap-1 text-[11px] font-semibold text-[#C2556A] hover:underline"
          >
            <Pencil size={11} /> Edit
          </button>
          <button
            onClick={() => setExpanded((p) => !p)}
            className="p-1 rounded-full hover:bg-rose-100 transition-colors"
          >
            {expanded
              ? <ChevronUp  size={14} className="text-rose-400" />
              : <ChevronDown size={14} className="text-rose-400" />}
          </button>
        </div>
      </div>

      {/* ── MAIN BODY ── */}
      <div className="flex gap-3 p-4">

        {/* Left thumbnail stack */}
        <div className="shrink-0">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28">
            {item.items?.slice(0, 3).map((prod, i) => {
              const src = Array.isArray(prod.image) ? prod.image[0] : prod.image;
              return (
                <div
                  key={i}
                  className="absolute rounded-xl overflow-hidden border-2 border-white shadow-sm bg-[#FFF0F3]"
                  style={{
                    width: 56, height: 56,
                    top:  i * 10,
                    left: i * 10,
                    zIndex: item.items.length - i,
                  }}
                >
                  <img src={src} alt={prod.name} className="w-full h-full object-contain p-1" />
                </div>
              );
            })}
            {itemCount > 3 && (
              <div
                className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#C2556A] text-white text-[10px] font-bold flex items-center justify-center border-2 border-white shadow"
                style={{ zIndex: 10 }}
              >
                +{itemCount - 3}
              </div>
            )}
          </div>
        </div>

        {/* Right info */}
        <div className="flex-1 min-w-0">

          {/* Box name + gift options row */}
          <p className="text-sm font-bold text-[#3B2A35] line-clamp-1 leading-snug mb-1">
            {box?.name || "Custom Gift Hamper"}
          </p>

          {/* Gift option pills */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {box && (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-[#FFF0F3] text-[#C2556A] border border-rose-100 px-2 py-0.5 rounded-full">
                🎁 {box.name} +₹{box.price ?? 0}
              </span>
            )}
            {wrapping && (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-[#FFF0F3] text-[#C2556A] border border-rose-100 px-2 py-0.5 rounded-full">
                🎀 {wrapping.name} +₹{wrapping.price ?? 0}
              </span>
            )}
            {message && (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-100 px-2 py-0.5 rounded-full">
                <MessageCircle size={9} /> Message added
              </span>
            )}
          </div>

          {/* Price row */}
          <div className="flex items-center justify-between flex-wrap gap-2 mt-1">
            <span className="text-base font-extrabold text-[#3B2A35]">
              ₹{(item.totalPrice ?? 0).toLocaleString()}
            </span>
            <span className="text-[10px] text-rose-900/40">
              {itemCount} product{itemCount !== 1 ? "s" : ""} · 1 hamper
            </span>
          </div>
        </div>
      </div>

      {/* ── EXPANDED PRODUCT LIST ── */}
      <AnimateHeight open={expanded}>
        {/* Message */}
        {message && (
          <div className="mx-4 mb-3 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2 text-xs text-amber-800 flex items-start gap-1.5">
            <MessageCircle size={12} className="shrink-0 mt-0.5 text-amber-500" />
            <span>"{message}"</span>
          </div>
        )}

        <div className="px-4 pb-3 space-y-2">
          <p className="text-[10px] font-bold text-rose-900/40 uppercase tracking-widest mb-1">
            Items in this hamper
          </p>

          {item.items?.map((prod, i) => {
            const src = Array.isArray(prod.image) ? prod.image[0] : prod.image;
            return (
              <div
                key={i}
                className="flex items-center gap-3 bg-[#FEF9F5] border border-rose-100 rounded-xl p-2.5"
              >
                <div className="w-11 h-11 rounded-lg overflow-hidden bg-[#FFF0F3] shrink-0">
                  <img src={src} alt={prod.name} className="w-full h-full object-contain p-1" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[#3B2A35] line-clamp-1">{prod.name}</p>
                  {prod.sellerName && (
                    <p className="text-[10px] text-[#C2556A] font-medium">by {prod.sellerName}</p>
                  )}
                  {prod.rating > 0 && (
                    <div className="flex items-center gap-0.5 mt-0.5">
                      {[...Array(5)].map((_, si) => (
                        <Star key={si} size={9}
                          style={si < Math.floor(prod.rating)
                            ? { color: "#D4A847", fill: "#D4A847" }
                            : { color: "#e5e7eb" }} />
                      ))}
                    </div>
                  )}
                </div>

                <span className="text-xs font-extrabold text-[#3B2A35] shrink-0">
                  ₹{(prod.price ?? 0).toLocaleString()}
                </span>
              </div>
            );
          })}
        </div>
      </AnimateHeight>

      {/* ── ACTION ROW ── */}
      <div className="flex items-center border-t border-rose-50 divide-x divide-rose-50">
        <button
          onClick={() => dispatch(removeFromCart(globalIndex))}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-rose-400 hover:text-[#C2556A] hover:bg-rose-50 transition-all"
        >
          <Trash2 size={13} /> Remove
        </button>
        <button
          onClick={() =>
            navigate("/custom-hamper", {
              state: { editMode: true, hamperData: item, hamperIndex: globalIndex },
            })
          }
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-rose-900/40 hover:text-[#C2556A] hover:bg-rose-50 transition-all"
        >
          <Pencil size={13} /> Edit Hamper
        </button>
        <button
          onClick={() => setExpanded((p) => !p)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-rose-900/40 hover:text-[#C2556A] hover:bg-rose-50 transition-all"
        >
          <Package size={13} /> {expanded ? "Hide Items" : "View Items"}
        </button>
      </div>
    </motion.div>
  );
}

/* ── tiny animated height helper (no framer needed) ── */
function AnimateHeight({ open, children }) {
  return (
    <div
      style={{
        overflow:   "hidden",
        maxHeight:  open ? 1000 : 0,
        transition: "max-height 0.3s ease",
      }}
    >
      {children}
    </div>
  );
}
