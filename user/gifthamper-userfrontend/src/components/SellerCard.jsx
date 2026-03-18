import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Store } from "lucide-react";

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
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      className="
        bg-white 
        rounded-2xl 
        shadow-md 
        hover:shadow-xl 
        transition-all duration-300 
        p-4 sm:p-5 lg:p-6
        flex flex-col items-center
        text-center
        group
      "
    >
      
      <div
        className="
          w-16 h-16 
          sm:w-18 sm:h-18 
          lg:w-20 lg:h-20 
          rounded-full 
          mb-3 sm:mb-4 
          overflow-hidden 
          flex items-center justify-center
        "
        style={{ backgroundColor: "#F7E3DC" }}
      >
        {logo ? (
          <img
            src={logo}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <Store className="w-8 h-8 sm:w-9 sm:h-9" style={{ color: "#8B3A62" }} />
        )}
      </div>

     
      <h3
        className="
          text-sm sm:text-base lg:text-lg 
          font-medium 
          mb-1 sm:mb-2 
          line-clamp-1
        "
        style={{ color: "#8B3A62" }}
      >
        {name}
      </h3>

    
      <div className="flex items-center gap-1 mb-1 sm:mb-2">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`
                w-3.5 h-3.5 sm:w-4 sm:h-4
                ${
                  i < Math.floor(rating)
                    ? "text-[#D4AF37] fill-[#D4AF37]"
                    : "text-gray-300"
                }
              `}
            />
          ))}
        </div>

        <span className="text-xs sm:text-sm text-gray-500">
          ({reviews})
        </span>
      </div>

     
      {productsCount > 0 && (
        <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
          {productsCount} Products
        </p>
      )}

      
      <Link
        to={`/products?seller=${id}`}
        className="
          w-full 
          text-xs sm:text-sm lg:text-base
          px-4 sm:px-5 lg:px-6 
          py-2 sm:py-2.5 
          rounded-full 
          text-white 
          font-medium 
          transition-all duration-300 
          hover:shadow-md 
          hover:scale-[1.02]
        "
        style={{ backgroundColor: "#8B3A62" }}
      >
        Visit Shop
      </Link>
    </motion.div>
  );
}