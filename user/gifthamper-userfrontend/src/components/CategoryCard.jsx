// 

//cl cd

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function CategoryCard({
  id,
  title,
  icon: Icon,
  href = "/products",
  image,
  className = "",
}) {
  return (
    <Link to={href} className="block">
      <motion.div
        whileHover={{ y: -5, scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`relative rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300 group ${className}`}
        style={{ height: "clamp(140px, 22vw, 200px)" }}
      >
        {image ? (
          <>
            {/* Image */}
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Gradient overlay — warm rose at bottom */}
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(59,42,53,0.78) 0%, rgba(59,42,53,0.2) 55%, transparent 100%)" }}
            />

            {/* Soft shimmer on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "linear-gradient(135deg, rgba(194,85,106,0.15) 0%, rgba(232,149,109,0.1) 100%)" }}
            />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-4 px-2 text-center">
              {Icon && (
                <motion.div
                  className="mb-1.5 opacity-90 group-hover:opacity-100"
                  whileHover={{ scale: 1.2, y: -2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 12 }}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-md" />
                </motion.div>
              )}
              <h3 className="text-xs sm:text-sm font-bold text-white drop-shadow-md leading-tight">
                {title}
              </h3>
            </div>
          </>
        ) : (
          /* No-image fallback — pastel gradient card */
          <div
            className="flex flex-col items-center justify-center h-full px-3 text-center"
            style={{ background: "linear-gradient(135deg, #FFF0F3, #FFF6EC)" }}
          >
            <div
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mb-2.5 shadow-sm transition-transform duration-300 group-hover:scale-110"
              style={{ background: "linear-gradient(135deg, #C2556A, #E8956D)" }}
            >
              {Icon && <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-[#3B2A35] leading-tight">{title}</h3>
          </div>
        )}
      </motion.div>
    </Link>
  );
}
