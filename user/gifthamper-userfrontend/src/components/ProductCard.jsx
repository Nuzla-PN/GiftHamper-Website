// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Heart, ShoppingCart, Star } from "lucide-react";
// import { useState } from "react";

// export default function ProductCard({
//   id,
//   image,
//   title,
//   sellerName,
//   price,
//   rating,
//   reviews = 0,
// }) {
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   // const [isHovered, setIsHovered] = useState(false);

//   return (
//     <motion.div
//       whileHover={{ y: -6 }}
//       // onHoverStart={() => setIsHovered(true)}
//       // onHoverEnd={() => setIsHovered(false)}
//       className="
//         bg-white rounded-xl sm:rounded-2xl 
//         shadow-md hover:shadow-xl 
//         overflow-hidden 
//         transition-all duration-300 
//         group relative
//       "
//     >
//       {/* IMAGE SECTION */}
//       <Link to={`/products/${id}`}>
//         <div className="relative overflow-hidden h-40 sm:h-52 lg:h-60">
          
//           <img
//             src={image}
//             alt={title}
//             className="
//               w-full h-full object-cover 
//               transition-transform duration-500 
//               group-hover:scale-110
//             "
//           />

//           {/* Wishlist */}
//           <button
//             onClick={(e) => {
//               e.preventDefault();
//               setIsWishlisted(!isWishlisted);
//             }}
//             className={`
//               absolute top-2 right-2 sm:top-3 sm:right-3 
//               w-8 h-8 sm:w-10 sm:h-10 
//               rounded-full flex items-center justify-center 
//               shadow-md transition-all duration-300 
//               hover:scale-110
//               ${isWishlisted ? "bg-[#8B3A62]" : "bg-white"}
//             `}
//           >
//             <Heart
//               className={`
//                 w-4 h-4 sm:w-5 sm:h-5
//                 ${isWishlisted ? "text-white fill-white" : "text-gray-600"}
//               `}
//             />
//           </button>

//           {/* Add to Cart */}
//           <div
//             className="
//               absolute bottom-0 left-0 right-0 
//               translate-y-0 sm:translate-y-full
//               sm:group-hover:translate-y-0
//               transition-transform duration-300
//             "
//           >
//             <button
//               onClick={(e) => e.preventDefault()}
//               className="
//                 w-full bg-[#8B3A62] text-white 
//                 py-2 sm:py-3 
//                 flex items-center justify-center gap-2 
//                 text-sm sm:text-base 
//                 font-medium 
//                 hover:opacity-90
//               "
//             >
//               <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
//               Add to Cart
//             </button>
//           </div>

//         </div>
//       </Link>

//       {/* CONTENT */}
//       <div className="p-3 sm:p-4">

//         {/* TITLE */}
//         <Link to={`/products/${id}`}>
//           <h3 className="
//             text-sm sm:text-base lg:text-lg 
//             font-medium 
//             mb-1 
//             line-clamp-2 
//             hover:text-[#8B3A62] 
//             transition-colors
//           ">
//             {title}
//           </h3>
//         </Link>

//         {/* SELLER */}
//         <p className="text-xs sm:text-sm text-gray-500 mb-2">
//           {sellerName}
//         </p>

//         {/* RATING */}
//         <div className="flex items-center gap-1 mb-2 sm:mb-3">
//           <div className="flex">
//             {[...Array(5)].map((_, i) => (
//               <Star
//                 key={i}
//                 className={`
//                   w-3 h-3 sm:w-4 sm:h-4 
//                   ${
//                     i < Math.floor(rating)
//                       ? "text-[#D4AF37] fill-[#D4AF37]"
//                       : "text-gray-300"
//                   }
//                 `}
//               />
//             ))}
//           </div>

//           <span className="text-[10px] sm:text-xs text-gray-600">
//             ({reviews})
//           </span>
//         </div>

//         {/* PRICE */}
//         <div className="flex items-center justify-between">
//           <span className="
//             text-base sm:text-lg lg:text-xl 
//             font-semibold 
//             text-[#8B3A62]
//           ">
//             ₹{price}
//           </span>
//         </div>

//       </div>
//     </motion.div>
//   );
// }

// //code 2
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Heart, ShoppingCart, Star, Check } from "lucide-react";
// import { useState } from "react";

// export default function ProductCard({
//   id,
//   image,
//   title,
//   sellerName,
//   price,
//   rating,
//   reviews = 0,
//   mainCategory,
//   subCategory,
//   showSelect = false,   // 👉 builder mode
//   isSelected = false,
//   onSelect
// }) {
//   const [isWishlisted, setIsWishlisted] = useState(false);

//   return (
//     <motion.div
//       whileHover={{ y: -6 }}
//       onClick={() => showSelect && onSelect(id)}
//       className={`
//         bg-white rounded-xl sm:rounded-2xl 
//         shadow-md hover:shadow-xl 
//         overflow-hidden 
//         transition-all duration-300 
//         group relative cursor-pointer
//         ${isSelected ? "ring-4 ring-[#8B3A62]" : ""}
//       `}
//     >
//       {/* IMAGE SECTION */}
//       {showSelect ? (
//         <div className="relative overflow-hidden h-40 sm:h-52 lg:h-60">
          
//           <img
//             src={image}
//             alt={title}
//             className="w-full h-full object-cover"
//           />

//           {/* CATEGORY */}
//           <div className="absolute top-2 left-2 bg-[#D4AF37] text-white text-xs px-2 py-1 rounded-full">
//             {subCategory}
//           </div>

//           {/* SELECTED TICK */}
//           {isSelected && (
//             <div className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-[#8B3A62] text-white">
//               <Check className="w-5 h-5" />
//             </div>
//           )}
//         </div>
//       ) : (
//         <Link to={`/products/${id}`}>
//           <div className="relative overflow-hidden h-40 sm:h-52 lg:h-60">
            
//             <img
//               src={image}
//               alt={title}
//               className="
//                 w-full h-full object-cover 
//                 transition-transform duration-500 
//                 group-hover:scale-110
//               "
//             />

//             {/* CATEGORY */}
//             {/* <div className="absolute top-2 left-2 bg-[#D4AF37] text-white text-xs px-2 py-1 rounded-full">
//               {subCategory}
//             </div> */}

//             {/* WISHLIST */}
//             <button
//               onClick={(e) => {
//                 e.preventDefault();
//                 setIsWishlisted(!isWishlisted);
//               }}
//               className={`
//                 absolute top-2 right-2 
//                 w-8 h-8 sm:w-10 sm:h-10 
//                 rounded-full flex items-center justify-center 
//                 shadow-md transition-all duration-300 
//                 hover:scale-110
//                 ${isWishlisted ? "bg-[#8B3A62]" : "bg-white"}
//               `}
//             >
//               <Heart
//                 className={`
//                   w-4 h-4 sm:w-5 sm:h-5
//                   ${isWishlisted ? "text-white fill-white" : "text-gray-600"}
//                 `}
//               />
//             </button>

//             {/* ADD TO CART */}
//             <div
//               className="
//                 absolute bottom-0 left-0 right-0 
//                 translate-y-0 sm:translate-y-full
//                 sm:group-hover:translate-y-0
//                 transition-transform duration-300
//               "
//             >
//               <button
//                 onClick={(e) => e.preventDefault()}
//                 className="
//                   w-full bg-[#8B3A62] text-white 
//                   py-2 sm:py-3 
//                   flex items-center justify-center gap-2 
//                   text-sm sm:text-base 
//                   font-medium 
//                   hover:opacity-90
//                 "
//               >
//                 <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
//                 Add to Cart
//               </button>
//             </div>

//           </div>
//         </Link>
//       )}

//       {/* CONTENT */}
//       <div className="p-3 sm:p-4">
        
//         {/* TITLE */}
//         {showSelect ? (
//           <h3 className="text-sm sm:text-base lg:text-lg font-medium mb-1 line-clamp-2">
//             {title}
//           </h3>
//         ) : (
//           <Link to={`/products/${id}`}>
//             <h3 className="
//               text-sm sm:text-base lg:text-lg 
//               font-medium mb-1 
//               line-clamp-2 
//               hover:text-[#8B3A62] 
//               transition-colors
//             ">
//               {title}
//             </h3>
//           </Link>
//         )}

//         {/* SELLER */}
//         {!showSelect && (
//           <p className="text-xs sm:text-sm text-gray-500 mb-2">
//             {sellerName}
//           </p>
//         )}

//         {/* RATING */}
//         {!showSelect && (
//           <div className="flex items-center gap-1 mb-2 sm:mb-3">
//             <div className="flex">
//               {[...Array(5)].map((_, i) => (
//                 <Star
//                   key={i}
//                   className={`
//                     w-3 h-3 sm:w-4 sm:h-4 
//                     ${
//                       i < Math.floor(rating)
//                         ? "text-[#D4AF37] fill-[#D4AF37]"
//                         : "text-gray-300"
//                     }
//                   `}
//                 />
//               ))}
//             </div>

//             <span className="text-[10px] sm:text-xs text-gray-600">
//               ({reviews})
//             </span>
//           </div>
//         )}

//         {/* PRICE */}
//         <div className="flex items-center justify-between">
//           <span className="text-base sm:text-lg lg:text-xl font-semibold text-[#8B3A62]">
//             ₹{price}
//           </span>
//         </div>

//       </div>
//     </motion.div>
//   );
// }


// //-----------------------------code 3 cloude---------------------------------------------(previous code 2)//

// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Heart, ShoppingCart, Star, Check } from "lucide-react";
// import { useState } from "react";

// export default function ProductCard({
//   id,
//   image,
//   title,
//   sellerName,
//   price,
//   originalPrice,
//   rating,
//   reviews = 0,
//   mainCategory,
//   subCategory,
//   showSelect = false,
//   isSelected = false,
//   onSelect,
//   viewMode = "grid", // "grid" | "list"
// }) {
//   const [isWishlisted, setIsWishlisted] = useState(false);

//   const discountPercent =
//     originalPrice && originalPrice > price
//       ? Math.round(((originalPrice - price) / originalPrice) * 100)
//       : null;

//   const ratingColor =
//     rating >= 4 ? "#388e3c" : rating >= 3 ? "#ff9f00" : "#f44336";

//   // ─── LIST ROW ───────────────────────────────────────────────
//   if (viewMode === "list" && !showSelect) {
//     return (
//       <motion.div
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-white hover:shadow-md transition-shadow duration-200"
//         style={{ borderBottom: "1px solid #f0f0f0" }}
//       >
//         <Link
//           to={`/products/${id}`}
//           className="flex gap-4 p-4 group"
//           style={{ textDecoration: "none", color: "inherit" }}
//         >
//           {/* IMAGE */}
//           <div className="relative flex-shrink-0" style={{ width: 160, height: 160 }}>
//             <img
//               src={image}
//               alt={title}
//               className="w-full h-full object-cover rounded"
//               style={{ borderRadius: 4 }}
//             />
//             {discountPercent && (
//               <span
//                 className="absolute top-1 left-1 text-white text-xs font-medium px-1.5 py-0.5 rounded"
//                 style={{ background: "#388e3c", fontSize: 11 }}
//               >
//                 {discountPercent}% off
//               </span>
//             )}
//             <button
//               onClick={(e) => {
//                 e.preventDefault();
//                 setIsWishlisted(!isWishlisted);
//               }}
//               className="absolute top-1 right-1 w-7 h-7 rounded-full flex items-center justify-center"
//               style={{
//                 background: isWishlisted ? "#8B3A62" : "white",
//                 border: "1px solid #eee",
//               }}
//             >
//               <Heart
//                 style={{ width: 13, height: 13 }}
//                 className={isWishlisted ? "text-white fill-white" : "text-gray-500"}
//               />
//             </button>
//           </div>

//           {/* DETAILS */}
//           <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
//             <div>
//               <h3
//                 className="font-medium mb-0.5 line-clamp-2 group-hover:text-[#8B3A62] transition-colors"
//                 style={{ fontSize: 15 }}
//               >
//                 {title}
//               </h3>
//               {sellerName && (
//                 <p style={{ fontSize: 12, color: "#888", marginBottom: 6 }}>
//                   by {sellerName}
//                 </p>
//               )}

//               {/* RATING BADGE */}
//               {rating > 0 && (
//                 <div className="flex items-center gap-1.5 mb-2">
//                   <span
//                     className="text-white font-medium px-1.5 py-0.5 rounded text-xs"
//                     style={{ background: ratingColor, fontSize: 11 }}
//                   >
//                     {rating} ★
//                   </span>
//                   {reviews > 0 && (
//                     <span style={{ fontSize: 12, color: "#888" }}>
//                       ({reviews.toLocaleString()})
//                     </span>
//                   )}
//                 </div>
//               )}

//               {/* TAGS */}
//               {subCategory && (
//                 <span
//                   className="inline-block text-xs px-2 py-0.5 rounded-full mr-1 mb-2"
//                   style={{ background: "#fdf0f7", color: "#8B3A62", border: "1px solid #f5c7df" }}
//                 >
//                   {subCategory}
//                 </span>
//               )}
//             </div>

//             {/* PRICE ROW */}
//             <div className="flex items-baseline gap-2">
//               <span className="font-semibold text-xl text-[#8B3A62]">₹{price}</span>
//               {originalPrice && originalPrice > price && (
//                 <span style={{ fontSize: 13, color: "#999", textDecoration: "line-through" }}>
//                   ₹{originalPrice}
//                 </span>
//               )}
//               {discountPercent && (
//                 <span style={{ fontSize: 13, color: "#388e3c", fontWeight: 500 }}>
//                   {discountPercent}% off
//                 </span>
//               )}
//             </div>
//           </div>

//           {/* ADD TO CART (right side on desktop) */}
//           <div className="hidden md:flex items-end pb-1">
//             <button
//               onClick={(e) => e.preventDefault()}
//               className="flex items-center gap-1.5 px-4 py-2 rounded text-white text-sm font-medium hover:opacity-90 transition"
//               style={{ background: "#8B3A62", whiteSpace: "nowrap" }}
//             >
//               <ShoppingCart style={{ width: 15, height: 15 }} />
//               Add to Cart
//             </button>
//           </div>
//         </Link>
//       </motion.div>
//     );
//   }

//   // ─── GRID CARD (original style) ─────────────────────────────────────────────
//   return (
//     <motion.div
//       whileHover={{ y: -6 }}
//       onClick={() => showSelect && onSelect(id)}
//       className={`bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl overflow-hidden transition-all duration-300 group relative cursor-pointer ${
//         isSelected ? "ring-4 ring-[#8B3A62]" : ""
//       }`}
//     >
//       {showSelect ? (
//         <div className="relative overflow-hidden h-40 sm:h-52 lg:h-60">
//           <img src={image} alt={title} className="w-full h-full object-cover" />
//           <div className="absolute top-2 left-2 bg-[#D4AF37] text-white text-xs px-2 py-1 rounded-full">
//             {subCategory}
//           </div>
//           {isSelected && (
//             <div className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-[#8B3A62] text-white">
//               <Check className="w-5 h-5" />
//             </div>
//           )}
//         </div>
//       ) : (
//         <Link to={`/products/${id}`}>
//           <div className="relative overflow-hidden h-40 sm:h-52 lg:h-60">
//             <img
//               src={image}
//               alt={title}
//               className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//             />
//             <button
//               onClick={(e) => {
//                 e.preventDefault();
//                 setIsWishlisted(!isWishlisted);
//               }}
//               className={`absolute top-2 right-2 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-md transition-all duration-300 hover:scale-110 ${
//                 isWishlisted ? "bg-[#8B3A62]" : "bg-white"
//               }`}
//             >
//               <Heart
//                 className={`w-4 h-4 sm:w-5 sm:h-5 ${
//                   isWishlisted ? "text-white fill-white" : "text-gray-600"
//                 }`}
//               />
//             </button>
//             <div className="absolute bottom-0 left-0 right-0 translate-y-0 sm:translate-y-full sm:group-hover:translate-y-0 transition-transform duration-300">
//               <button
//                 onClick={(e) => e.preventDefault()}
//                 className="w-full bg-[#8B3A62] text-white py-2 sm:py-3 flex items-center justify-center gap-2 text-sm sm:text-base font-medium hover:opacity-90"
//               >
//                 <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         </Link>
//       )}

//       <div className="p-3 sm:p-4">
//         {showSelect ? (
//           <h3 className="text-sm sm:text-base lg:text-lg font-medium mb-1 line-clamp-2">{title}</h3>
//         ) : (
//           <Link to={`/products/${id}`}>
//             <h3 className="text-sm sm:text-base lg:text-lg font-medium mb-1 line-clamp-2 hover:text-[#8B3A62] transition-colors">
//               {title}
//             </h3>
//           </Link>
//         )}
//         {!showSelect && (
//           <p className="text-xs sm:text-sm text-gray-500 mb-2">{sellerName}</p>
//         )}
//         {!showSelect && (
//           <div className="flex items-center gap-1 mb-2 sm:mb-3">
//             <div className="flex">
//               {[...Array(5)].map((_, i) => (
//                 <Star
//                   key={i}
//                   className={`w-3 h-3 sm:w-4 sm:h-4 ${
//                     i < Math.floor(rating)
//                       ? "text-[#D4AF37] fill-[#D4AF37]"
//                       : "text-gray-300"
//                   }`}
//                 />
//               ))}
//             </div>
//             <span className="text-[10px] sm:text-xs text-gray-600">({reviews})</span>
//           </div>
//         )}
//         <div className="flex items-center justify-between">
//           <span className="text-base sm:text-lg lg:text-xl font-semibold text-[#8B3A62]">
//             ₹{price}
//           </span>
//           {discountPercent && (
//             <span className="text-xs text-green-600 font-medium">{discountPercent}% off</span>
//           )}
//         </div>
//       </div>
//     </motion.div>
//   );
// }


// /// code 4 cloude -------------------------------------------------------------------//

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Check, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addtoCart } from "../features/cart/cartSlice";
import { clearAddons } from "../features/addson/addsonSlice";
import { toggleWishlist } from "../features/wishlist/wishlistSlice";

export default function ProductCard({
  id,
  image,
  title,
  sellerName,
  price,
  originalPrice,
  rating,
  reviews = 0,
  mainCategory,
  subCategory,
  showSelect = false,
  isSelected = false,
  onSelect,
  viewMode = "grid",
}) {
  
  const [hovered, setHovered] = useState(false);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const products = useSelector((state) => state.products.items);
  const product = products.find((p) => String(p.id) === String(id));
  const wishlistItems = useSelector((state) => state.wishlist?.items || []);
  const isWishlisted = wishlistItems.some((item) => item.id === product.id);

  
  const discountPercent =
    originalPrice && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : null;

  const ratingBg =
    rating >= 4 ? "#388e3c" : rating >= 3.5 ? "#689f38" : rating >= 3 ? "#ff9f00" : "#f44336";

  // ─── LIST ROW ───────────────────────────────────────────────────────────────
  if (viewMode === "list" && !showSelect) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ borderBottom: "1px solid #f0f0f0", background: "#fff" }}
      >
        <Link
          to={`/products/${id}`}
          style={{ display: "flex", gap: 16, padding: 16, textDecoration: "none", color: "inherit" }}
          className="group"
        >
          <div style={{ position: "relative", width: 160, height: 160, flexShrink: 0, background: "#f5f5f5" }}>
            <img src={image} alt={title} style={{ width: "100%", height: "100%", objectFit: "contain", padding: 8 }} />
          </div>
          <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 500, color: "#212121", marginBottom: 4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{title}</div>
              {sellerName && <div style={{ fontSize: 12, color: "#878787", marginBottom: 8 }}>by {sellerName}</div>}
              {rating > 0 && (
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                  <span style={{ background: ratingBg, color: "#fff", fontSize: 11, fontWeight: 600, padding: "2px 6px", borderRadius: 3 }}>{rating} ★</span>
                  {reviews > 0 && <span style={{ fontSize: 12, color: "#878787" }}>({reviews.toLocaleString()})</span>}
                </div>
              )}
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
              <span style={{ fontSize: 18, fontWeight: 700, color: "#212121" }}>₹{price.toLocaleString()}</span>
              {originalPrice && originalPrice > price && (
                <span style={{ fontSize: 13, color: "#878787", textDecoration: "line-through" }}>₹{originalPrice.toLocaleString()}</span>
              )}
              {discountPercent && (
                <span style={{ fontSize: 13, color: "#388e3c", fontWeight: 600 }}>{discountPercent}% off</span>
              )}
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  // ─── BUILDER / SELECT MODE ──────────────────────────────────────────────────
  if (showSelect) {
    return (
      <div
        onClick={() => onSelect(id)}
        style={{
          background: "#fff",
          border: isSelected ? "2px solid #8B3A62" : "1px solid #e0e0e0",
          cursor: "pointer",
          position: "relative",
        }}
      >
        <div style={{ position: "relative", width: "100%", paddingBottom: "100%", background: "#f5f5f5", overflow: "hidden" }}>
          <img src={image} alt={title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", padding: 8 }} />
          {isSelected && (
            <div style={{ position: "absolute", top: 8, right: 8, width: 28, height: 28, borderRadius: "50%", background: "#8B3A62", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Check style={{ width: 16, height: 16, color: "#fff" }} />
            </div>
          )}
        </div>
        <div style={{ padding: "10px 12px" }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: "#212121", marginBottom: 6, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{title}</div>
          <span style={{ fontSize: 15, fontWeight: 700, color: "#212121" }}>₹{price.toLocaleString()}</span>
        </div>
      </div>
    );
  }

  // ─── FLIPKART GRID CARD ─────────────────────────────────────────────────────
  return (
    <Link
      to={`/products/${id}`}
      style={{ textDecoration: "none", color: "inherit", display: "block" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          background: "#fff",
          border: "1px solid #f0f0f0",
          cursor: "pointer",
          boxShadow: hovered
            ? "0 2px 16px rgba(0,0,0,0.14)"
            : "0 1px 2px rgba(0,0,0,0.06)",
          transition: "box-shadow 0.18s",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* ── IMAGE BLOCK ── */}
        <div
          style={{
            position: "relative",
            width: "100%",
            paddingBottom: "100%",
            background: "#f5f5f5",
            overflow: "hidden",
          }}
        >
          <img
            src={image}
            alt={title}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
              padding: 12,
              transform: hovered ? "scale(1.05)" : "scale(1)",
              transition: "transform 0.3s ease",
            }}
          />

          {/* DISCOUNT BADGE — left ribbon style */}
          {discountPercent && (
            <div
              style={{
                position: "absolute",
                top: 10,
                left: 0,
                background: "#D4AF37",
                color: "#fff",
                fontSize: 10,
                fontWeight: 700,
                padding: "3px 9px 3px 6px",
                borderRadius: "0 3px 3px 0",
                letterSpacing: 0.3,
              }}
            >
              {discountPercent}% off
            </div>
          )}

           {/* WISHLIST HEART */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // setIsWishlisted(!isWishlisted);
              dispatch(toggleWishlist(product))
            }}
            style={{
              position: "absolute",
              top: 6,
              right: 8,
              background: isWishlisted ? "none" : "#fff",
              border: "none",
              cursor: "pointer",
              borderRadius: "50%",
              width: 34,
              height: 34,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              
              boxShadow: "0 1px 5px rgba(0,0,0,0.15)",
              // transition: "background 0.2s",
              padding: 4,
              opacity: hovered || isWishlisted ? 1 : 0,
              transition: "opacity 0.15s",
              lineHeight: 0,
            }}
          >
             <Heart
              style={{
                width: 16,
                height: 16,
                color: isWishlisted ? "#ff4081" : "#9e9e9e",
                fill: isWishlisted ? "#ff4081" : "none",
                strokeWidth: 2,
              }} 
            />
          </button>

            {/* ADD TO CART — slides up on hover */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              transform: hovered ? "translateY(0)" : "translateY(100%)",
              transition: "transform 0.3s ease",
            }}
          >
           
            <button
            disabled={product.stock === 0}
              onClick={(e) => {e.preventDefault()
                const cartItem = {
                              id: product.id,
                                 // FIXED FIELDS
                              name: product.title,
                              description:  product.description,
                              // image: product.image[0],
                               image:        Array.isArray(product.image)
                                              ? product.image[0]
                                              : product.image,
                              price: product.price,
                              originalPrice: product.originalPrice || null,
                              quantity,
                              stock: product.stock,
                              rating:  product.rating  || 0,
                              reviews: product.reviews || 0,
            
                              //  IMPORTANT (THIS FIXES YOUR MULTI-SELLER ISSUE)
                              sellerId: product.sellerId,
                              sellerName: product.sellerName,
            
                              
                            };
                            dispatch(addtoCart(cartItem));
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-white transition-all"
              style={{ background: "linear-gradient(90deg,#C2556A,#E8956D)" }}
            >
              <ShoppingCart style={{ width: 15, height: 15 }} />
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
              
            </button>
          </div>
         </div>

        {/* ── CONTENT BLOCK ── */}
        <div style={{ padding: "10px 12px 14px" }}>

          {/* TITLE — 2 lines max, same as Flipkart */}
          <p
            style={{
              fontSize: 13,
              color: "#212121",
              fontWeight: 400,
              lineHeight: 1.45,
              margin: "0 0 2px",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {title}
          </p>

          {/* SELLER */}
          {sellerName && (
            <p style={{ fontSize: 11, color: "#878787", margin: "0 0 6px" }}>
              {sellerName}
            </p>
          )}

          {/* RATING BADGE + COUNT */}
          {rating > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 7 }}>
              <span
                style={{
                  background: ratingBg,
                  color: "#fff",
                  fontSize: 11,
                  fontWeight: 600,
                  padding: "1px 5px",
                  borderRadius: 3,
                  lineHeight: 1.6,
                }}
              >
                {rating} ★
              </span>
              {reviews > 0 && (
                <span style={{ fontSize: 11, color: "#878787" }}>
                  {reviews >= 1000
                    ? `(${(reviews / 1000).toFixed(1)}k)`
                    : `(${reviews})`}
                </span>
              )}
            </div>
          )}

          {/* PRICE ROW */}
          <div style={{ display: "flex", alignItems: "baseline", gap: 5, flexWrap: "wrap" }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: "#212121" }}>
              ₹{price.toLocaleString()}
            </span>
            {originalPrice && originalPrice > price && (
              <span
                style={{
                  fontSize: 12,
                  color: "#878787",
                  textDecoration: "line-through",
                  fontWeight: 400,
                }}
              >
                ₹{originalPrice.toLocaleString()}
              </span>
            )}
            {discountPercent && (
              <span style={{ fontSize: 12, color: "#388e3c", fontWeight: 600 }}>
                {discountPercent}% off
              </span>
            )}
          </div>

        </div>
      </div>
    </Link>
  );
}



/// code 6 cloude---------------------------------------------//

// import { Link } from "react-router-dom";
// import { Heart, ShoppingCart, Star, Check } from "lucide-react";
// import { useState } from "react";

// export default function ProductCard({
//   id,
//   image,
//   title,
//   sellerName,
//   price,
//   originalPrice,
//   rating,
//   reviews = 0,
//   mainCategory,
//   subCategory,
//   showSelect = false,
//   isSelected = false,
//   onSelect,
//   viewMode = "grid",
// }) {
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [hovered, setHovered] = useState(false);

//   const discountPercent =
//     originalPrice && originalPrice > price
//       ? Math.round(((originalPrice - price) / originalPrice) * 100)
//       : null;

//   const ratingBg =
//     rating >= 4 ? "#388e3c" : rating >= 3.5 ? "#689f38" : rating >= 3 ? "#ff9f00" : "#f44336";

//   // ─── LIST ROW ───────────────────────────────────────────────────────────────
//   if (viewMode === "list" && !showSelect) {
//     return (
//       <div style={{ borderBottom: "1px solid #f5e6f0", background: "#fff" }}>
//         <Link
//           to={`/products/${id}`}
//           style={{ display: "flex", gap: 16, padding: 16, textDecoration: "none", color: "inherit" }}
//         >
//           <div style={{ position: "relative", width: 160, height: 160, flexShrink: 0, background: "#fdf5f9" }}>
//             <img src={image} alt={title} style={{ width: "100%", height: "100%", objectFit: "contain", padding: 8 }} />
//           </div>
//           <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
//             <div>
//               <div style={{ fontSize: 15, fontWeight: 500, color: "#212121", marginBottom: 4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{title}</div>
//               {sellerName && <div style={{ fontSize: 12, color: "#878787", marginBottom: 8 }}>by {sellerName}</div>}
//               {rating > 0 && (
//                 <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
//                   <span style={{ background: ratingBg, color: "#fff", fontSize: 11, fontWeight: 600, padding: "2px 6px", borderRadius: 3 }}>{rating} ★</span>
//                   {reviews > 0 && <span style={{ fontSize: 12, color: "#878787" }}>({reviews.toLocaleString()})</span>}
//                 </div>
//               )}
//             </div>
//             <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
//               <span style={{ fontSize: 18, fontWeight: 700, color: "#8B3A62" }}>₹{price.toLocaleString()}</span>
//               {originalPrice && originalPrice > price && (
//                 <span style={{ fontSize: 13, color: "#878787", textDecoration: "line-through" }}>₹{originalPrice.toLocaleString()}</span>
//               )}
//               {discountPercent && (
//                 <span style={{ fontSize: 13, color: "#388e3c", fontWeight: 600 }}>{discountPercent}% off</span>
//               )}
//             </div>
//           </div>
//         </Link>
//       </div>
//     );
//   }

//   // ─── BUILDER / SELECT MODE ──────────────────────────────────────────────────
//   if (showSelect) {
//     return (
//       <div
//         onClick={() => onSelect(id)}
//         style={{
//           background: "#fff",
//           border: isSelected ? "2px solid #8B3A62" : "1px solid #f5e6f0",
//           borderRadius: 16,
//           cursor: "pointer",
//           overflow: "hidden",
//           position: "relative",
//         }}
//       >
//         <div style={{ position: "relative", width: "100%", paddingBottom: "100%", background: "#fdf5f9" }}>
//           <img src={image} alt={title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", padding: 8 }} />
//           <div style={{ position: "absolute", top: 8, left: 8, background: "#D4AF37", color: "#fff", fontSize: 10, padding: "2px 8px", borderRadius: 20 }}>{subCategory}</div>
//           {isSelected && (
//             <div style={{ position: "absolute", top: 8, right: 8, width: 28, height: 28, borderRadius: "50%", background: "#8B3A62", display: "flex", alignItems: "center", justifyContent: "center" }}>
//               <Check style={{ width: 16, height: 16, color: "#fff" }} />
//             </div>
//           )}
//         </div>
//         <div style={{ padding: "10px 12px" }}>
//           <div style={{ fontSize: 13, fontWeight: 500, color: "#212121", marginBottom: 6, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{title}</div>
//           <span style={{ fontSize: 15, fontWeight: 700, color: "#8B3A62" }}>₹{price.toLocaleString()}</span>
//         </div>
//       </div>
//     );
//   }

//   // ─── MAIN GRID CARD ─────────────────────────────────────────────────────────
//   return (
//     <div
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       style={{
//         background: "#fff",
//         borderRadius: 16,
//         border: "1px solid #f5e6f0",
//         boxShadow: hovered
//           ? "0 8px 24px rgba(139,58,98,0.13)"
//           : "0 2px 6px rgba(0,0,0,0.06)",
//         transition: "box-shadow 0.25s, transform 0.25s",
//         transform: hovered ? "translateY(-6px)" : "translateY(0)",
//         position: "relative",
//         overflow: "hidden",
//         cursor: "pointer",
//       }}
//     >
//       <Link
//         to={`/products/${id}`}
//         style={{ textDecoration: "none", color: "inherit", display: "block" }}
//       >
//         {/* ── IMAGE BLOCK ── */}
//         <div
//           style={{
//             position: "relative",
//             width: "100%",
//             paddingBottom: "100%",
//             background: "#fdf5f9",
//             overflow: "hidden",
//           }}
//         >
//           <img
//             src={image}
//             alt={title}
//             style={{
//               position: "absolute",
//               top: 0,
//               left: 0,
//               width: "100%",
//               height: "100%",
//               objectFit: "cover",
//               transform: hovered ? "scale(1.08)" : "scale(1)",
//               transition: "transform 0.5s ease",
//             }}
//           />

//           {/* DISCOUNT BADGE — pill style matching brand */}
//           {discountPercent && (
//             <div
//               style={{
//                 position: "absolute",
//                 top: 10,
//                 left: 0,
//                 background: "#D4AF37",
//                 color: "#fff",
//                 fontSize: 10,
//                 fontWeight: 700,
//                 padding: "3px 9px 3px 6px",
//                 borderRadius: "0 20px 20px 0",
//                 letterSpacing: 0.3,
//               }}
//             >
//               {discountPercent}% off
//             </div>
//           )}

//           {/* WISHLIST BUTTON */}
//           <button
//             onClick={(e) => {
//               e.preventDefault();
//               e.stopPropagation();
//               setIsWishlisted(!isWishlisted);
//             }}
//             style={{
//               position: "absolute",
//               top: 8,
//               right: 10,
//               background: isWishlisted ? "#8B3A62" : "#fff",
//               border: "none",
//               borderRadius: "50%",
//               width: 34,
//               height: 34,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               cursor: "pointer",
//               boxShadow: "0 1px 5px rgba(0,0,0,0.15)",
//               transition: "background 0.2s",
//             }}
//           >
//             <Heart
//               style={{
//                 width: 16,
//                 height: 16,
//                 color: isWishlisted ? "#fff" : "#8B3A62",
//                 fill: isWishlisted ? "#fff" : "none",
//                 strokeWidth: 2,
//               }}
//             />
//           </button>

//           {/* ADD TO CART — slides up on hover */}
//           <div
//             style={{
//               position: "absolute",
//               bottom: 0,
//               left: 0,
//               right: 0,
//               transform: hovered ? "translateY(0)" : "translateY(100%)",
//               transition: "transform 0.3s ease",
//             }}
//           >
//             <button
//               onClick={(e) => e.preventDefault()}
//               style={{
//                 width: "100%",
//                 background: "#8B3A62",
//                 color: "#fff",
//                 border: "none",
//                 padding: "11px 0",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 gap: 7,
//                 fontSize: 13,
//                 fontWeight: 500,
//                 cursor: "pointer",
//                 letterSpacing: 0.2,
//               }}
//             >
//               <ShoppingCart style={{ width: 15, height: 15 }} />
//               Add to Cart
//             </button>
//           </div>
//         </div>

//         {/* ── CONTENT BLOCK ── */}
//         <div style={{ padding: "10px 12px 14px" }}>

//           {/* TITLE */}
//           <p
//             style={{
//               fontSize: 13,
//               color: "#212121",
//               fontWeight: 400,
//               lineHeight: 1.45,
//               margin: "0 0 3px",
//               display: "-webkit-box",
//               WebkitLineClamp: 2,
//               WebkitBoxOrient: "vertical",
//               overflow: "hidden",
//             }}
//           >
//             {title}
//           </p>

//           {/* SELLER */}
//           {sellerName && (
//             <p style={{ fontSize: 11, color: "#878787", margin: "0 0 6px" }}>
//               {sellerName}
//             </p>
//           )}

//           {/* RATING BADGE + COUNT */}
//           {rating > 0 && (
//             <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 7 }}>
//               <span
//                 style={{
//                   background: ratingBg,
//                   color: "#fff",
//                   fontSize: 11,
//                   fontWeight: 600,
//                   padding: "1px 5px",
//                   borderRadius: 3,
//                   lineHeight: 1.6,
//                 }}
//               >
//                 {rating} ★
//               </span>
//               {reviews > 0 && (
//                 <span style={{ fontSize: 11, color: "#878787" }}>
//                   {reviews >= 1000
//                     ? `(${(reviews / 1000).toFixed(1)}k)`
//                     : `(${reviews})`}
//                 </span>
//               )}
//             </div>
//           )}

//           {/* PRICE ROW */}
//           <div style={{ display: "flex", alignItems: "baseline", gap: 5, flexWrap: "wrap" }}>
//             <span style={{ fontSize: 15, fontWeight: 700, color: "#8B3A62" }}>
//               ₹{price.toLocaleString()}
//             </span>
//             {originalPrice && originalPrice > price && (
//               <span
//                 style={{
//                   fontSize: 12,
//                   color: "#878787",
//                   textDecoration: "line-through",
//                   fontWeight: 400,
//                 }}
//               >
//                 ₹{originalPrice.toLocaleString()}
//               </span>
//             )}
//             {discountPercent && (
//               <span style={{ fontSize: 12, color: "#388e3c", fontWeight: 600 }}>
//                 {discountPercent}% off
//               </span>
//             )}
//           </div>

//         </div>
//       </Link>
//     </div>
//   );
// }


