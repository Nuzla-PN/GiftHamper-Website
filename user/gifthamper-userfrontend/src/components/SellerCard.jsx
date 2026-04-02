// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Star, Store } from "lucide-react";

// export default function SellerCard({
//   id,
//   name,
//   logo,
//   rating = 0,
//   reviews = 0,
//   productsCount = 0,
// }) {
//   return (
//     <motion.div
//       whileHover={{ y: -6 }}
//       whileTap={{ scale: 0.98 }}
//       className="
//         bg-white 
//         rounded-2xl 
//         shadow-md 
//         hover:shadow-xl 
//         transition-all duration-300 
//         p-4 sm:p-5 lg:p-6
//         flex flex-col items-center
//         text-center
//         group
//       "
//     >
      
//       <div
//         className="
//           w-16 h-16 
//           sm:w-18 sm:h-18 
//           lg:w-20 lg:h-20 
//           rounded-full 
//           mb-3 sm:mb-4 
//           overflow-hidden 
//           flex items-center justify-center
//         "
//         style={{ backgroundColor: "#F7E3DC" }}
//       >
//         {logo ? (
//           <img
//             src={logo}
//             alt={name}
//             className="w-full h-full object-cover"
//           />
//         ) : (
//           <Store className="w-8 h-8 sm:w-9 sm:h-9" style={{ color: "#8B3A62" }} />
//         )}
//       </div>

     
//       <h3
//         className="
//           text-sm sm:text-base lg:text-lg 
//           font-medium 
//           mb-1 sm:mb-2 
//           line-clamp-1
//         "
//         style={{ color: "#8B3A62" }}
//       >
//         {name}
//       </h3>

    
//       <div className="flex items-center gap-1 mb-1 sm:mb-2">
//         <div className="flex">
//           {[...Array(5)].map((_, i) => (
//             <Star
//               key={i}
//               className={`
//                 w-3.5 h-3.5 sm:w-4 sm:h-4
//                 ${
//                   i < Math.floor(rating)
//                     ? "text-[#D4AF37] fill-[#D4AF37]"
//                     : "text-gray-300"
//                 }
//               `}
//             />
//           ))}
//         </div>

//         <span className="text-xs sm:text-sm text-gray-500">
//           ({reviews})
//         </span>
//       </div>

     
//       {productsCount > 0 && (
//         <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
//           {productsCount} Products
//         </p>
//       )}

      
//       <Link
//         to={`/products?seller=${id}`}
//         className="
//           w-full 
//           text-xs sm:text-sm lg:text-base
//           px-4 sm:px-5 lg:px-6 
//           py-2 sm:py-2.5 
//           rounded-full 
//           text-white 
//           font-medium 
//           transition-all duration-300 
//           hover:shadow-md 
//           hover:scale-[1.02]
//         "
//         style={{ backgroundColor: "#8B3A62" }}
//       >
//         Visit Shop
//       </Link>
//     </motion.div>
//   );
// }

//cl cd

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Store, ArrowRight } from "lucide-react";

export default function SellerCard({
  id,
  name,
  logo,
  rating = 0,
  reviews = 0,
  productsCount = 0,
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="relative bg-white rounded-2xl border border-rose-100 shadow-sm hover:shadow-lg transition-all duration-300 p-5 flex flex-col items-center text-center overflow-hidden group"
    >
      {/* soft blush bg blob */}
      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-rose-50 group-hover:bg-rose-100 transition-colors duration-300 pointer-events-none" />
      <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-amber-50 pointer-events-none" />

      {/* Avatar */}
      <div className="relative z-10 w-16 h-16 sm:w-18 sm:h-18 rounded-full mb-3 overflow-hidden flex items-center justify-center border-2 border-rose-100 shadow-sm"
        style={{ background: "linear-gradient(135deg, #FFF0F3, #FFF6EC)" }}>
        {logo ? (
          <img src={logo} alt={name} className="w-full h-full object-cover" />
        ) : (
          <Store className="w-7 h-7 text-[#C2556A]" />
        )}
      </div>

      {/* Name */}
      <h3 className="relative z-10 text-sm sm:text-base font-bold text-[#3B2A35] mb-1 line-clamp-1">
        {name}
      </h3>

      {/* Stars */}
      <div className="relative z-10 flex items-center gap-1 mb-1">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="w-3 h-3 sm:w-3.5 sm:h-3.5"
              style={i < Math.floor(rating)
                ? { color: "#D4A847", fill: "#D4A847" }
                : { color: "#e5e7eb" }}
            />
          ))}
        </div>
        <span className="text-[11px] text-rose-900/40 font-medium">({reviews})</span>
      </div>

      {/* Products count */}
      {productsCount > 0 && (
        <p className="relative z-10 text-[11px] text-rose-900/40 mb-4">
          {productsCount} Products
        </p>
      )}

      {/* CTA */}
      <Link
        to={`/products?seller=${id}`}
        className="relative z-10 w-full flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold py-2.5 rounded-full text-white transition-all duration-300 hover:shadow-md hover:gap-2.5 group/btn"
        style={{ background: "linear-gradient(135deg, #C2556A, #E8956D)" }}
      >
        Visit Shop
        <ArrowRight size={13} className="group-hover/btn:translate-x-0.5 transition-transform" />
      </Link>
    </motion.div>
  );
}
