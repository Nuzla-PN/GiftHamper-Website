import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";

export default function ProductCard({
  id,
  image,
  title,
  sellerName,
  price,
  rating,
  reviews = 0,
}) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  // const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      // onHoverStart={() => setIsHovered(true)}
      // onHoverEnd={() => setIsHovered(false)}
      className="
        bg-white rounded-xl sm:rounded-2xl 
        shadow-md hover:shadow-xl 
        overflow-hidden 
        transition-all duration-300 
        group relative
      "
    >
      {/* IMAGE SECTION */}
      <Link to={`/products/${id}`}>
        <div className="relative overflow-hidden h-40 sm:h-52 lg:h-60">
          
          <img
            src={image}
            alt={title}
            className="
              w-full h-full object-cover 
              transition-transform duration-500 
              group-hover:scale-110
            "
          />

          {/* Wishlist */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsWishlisted(!isWishlisted);
            }}
            className={`
              absolute top-2 right-2 sm:top-3 sm:right-3 
              w-8 h-8 sm:w-10 sm:h-10 
              rounded-full flex items-center justify-center 
              shadow-md transition-all duration-300 
              hover:scale-110
              ${isWishlisted ? "bg-[#8B3A62]" : "bg-white"}
            `}
          >
            <Heart
              className={`
                w-4 h-4 sm:w-5 sm:h-5
                ${isWishlisted ? "text-white fill-white" : "text-gray-600"}
              `}
            />
          </button>

          {/* Add to Cart */}
          <div
            className="
              absolute bottom-0 left-0 right-0 
              translate-y-0 sm:translate-y-full
              sm:group-hover:translate-y-0
              transition-transform duration-300
            "
          >
            <button
              onClick={(e) => e.preventDefault()}
              className="
                w-full bg-[#8B3A62] text-white 
                py-2 sm:py-3 
                flex items-center justify-center gap-2 
                text-sm sm:text-base 
                font-medium 
                hover:opacity-90
              "
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
              Add to Cart
            </button>
          </div>

        </div>
      </Link>

      {/* CONTENT */}
      <div className="p-3 sm:p-4">

        {/* TITLE */}
        <Link to={`/products/${id}`}>
          <h3 className="
            text-sm sm:text-base lg:text-lg 
            font-medium 
            mb-1 
            line-clamp-2 
            hover:text-[#8B3A62] 
            transition-colors
          ">
            {title}
          </h3>
        </Link>

        {/* SELLER */}
        <p className="text-xs sm:text-sm text-gray-500 mb-2">
          {sellerName}
        </p>

        {/* RATING */}
        <div className="flex items-center gap-1 mb-2 sm:mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`
                  w-3 h-3 sm:w-4 sm:h-4 
                  ${
                    i < Math.floor(rating)
                      ? "text-[#D4AF37] fill-[#D4AF37]"
                      : "text-gray-300"
                  }
                `}
              />
            ))}
          </div>

          <span className="text-[10px] sm:text-xs text-gray-600">
            ({reviews})
          </span>
        </div>

        {/* PRICE */}
        <div className="flex items-center justify-between">
          <span className="
            text-base sm:text-lg lg:text-xl 
            font-semibold 
            text-[#8B3A62]
          ">
            ₹{price}
          </span>
        </div>

      </div>
    </motion.div>
  );
}