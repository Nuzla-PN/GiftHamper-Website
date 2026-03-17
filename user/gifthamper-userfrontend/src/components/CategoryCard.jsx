import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function CategoryCard({
  title,
  icon: Icon,
  href = "/products",
  image,
}) {
  return (
    <Link to={href} className="block">
      <motion.div
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="
          relative rounded-xl sm:rounded-2xl 
          shadow-md hover:shadow-xl 
          overflow-hidden cursor-pointer 
          transition-all duration-300 
          h-36 sm:h-44 lg:h-48 
          group bg-[#F7E3DC]
        "
      >
        
        {image ? (
          <div className="relative h-full w-full">
            
            <img
              src={image}
              alt={title}
              className="
                w-full h-full object-cover 
                transition-transform duration-500 
                group-hover:scale-110
              "
            />

           
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

           
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 lg:p-5">
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-white">
                {title}
              </h3>
            </div>
          </div>
        ) : (
          
          <div className="flex flex-col items-center justify-center h-full px-3 sm:px-4 text-center">
            
            <div
              className="
                w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 
                rounded-full flex items-center justify-center 
                mb-2 sm:mb-3 
                bg-[#8B3A62] 
                transition-transform duration-300 
                group-hover:scale-110
              "
            >
              <Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
            </div>

            <h3 className="
              text-xs sm:text-sm lg:text-base 
              font-medium 
              text-[#8B3A62]
            ">
              {title}
            </h3>
          </div>
        )}
      </motion.div>
    </Link>
  );
}