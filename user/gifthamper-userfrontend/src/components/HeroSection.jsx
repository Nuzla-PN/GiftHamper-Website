import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import "swiper/css";

import "swiper/css/pagination";
import { Link } from "react-router-dom";

export default function HeroSection() {

  const slides = [
    {
      id: 1,
      title: "Luxury Gift Hampers",
      subtitle: "Curated premium gifts for every celebration",
      image:
        "https://images.unsplash.com/photo-1607082349566-187342175e2f",
    },
    {
      id: 2,
      title: "Create Custom Hampers",
      subtitle: "Build your own personalized gift box",
      image:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    },
    {
      id: 3,
      title: "Perfect Gifts for Loved Ones",
      subtitle: "Discover unique hampers from top sellers",
      image:
        "https://images.unsplash.com/photo-1522673607200-164d1b6ce486",
    },
  ];

  return (
    <section className="w-full">

      <Swiper
        modules={[Pagination, Autoplay]}
        loop
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: false
        }}
        className="rounded-2xl overflow-hidden shadow-lg"
      >

        {slides.map((slide) => (

          <SwiperSlide key={slide.id}>

            <div className="relative w-full h-[350px] sm:h-[420px] md:h-[520px] lg:h-[600px]">

              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/40"></div>

              <div className="absolute inset-0 flex items-center">

                <div className="max-w-7xl mx-auto px-6 w-full">

                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-xl text-white"
                  >

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                      {slide.title}
                    </h1>

                    <p className="mt-4 text-sm sm:text-base md:text-lg lg:text-xl text-gray-200">
                      {slide.subtitle}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-4">

                      <button className="bg-[#8B3A62] hover:bg-[#742e52] text-white px-6 py-3 rounded-full text-sm md:text-base transition shadow-lg">
                        Shop Now
                      </button>

                      <Link to="/custom-hamper">
                      <button className="bg-white text-black px-6 py-3 rounded-full text-sm md:text-base hover:bg-gray-200 transition shadow-lg">
                        Build Custom Hamper
                      </button>
                      </Link>

                    </div>

                  </motion.div>

                </div>

              </div>

            </div>

          </SwiperSlide>

        ))}

      </Swiper>

    </section>
  );
};



export function HomeFilters({ onFilterChange }) {
  const [giftType, setGiftType] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [sort, setSort] = useState("");

  const handleChange = (type, value) => {
    const updated = {
      giftType: type === "giftType" ? value : giftType,
      priceRange: type === "priceRange" ? value : priceRange,
      sort: type === "sort" ? value : sort,
    };

    setGiftType(updated.giftType);
    setPriceRange(updated.priceRange);
    setSort(updated.sort);

    onFilterChange(updated); // send to parent
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 mt-6">
      
      <div className="
        bg-white rounded-xl shadow-md 
        p-4 sm:p-5 
        flex flex-col sm:flex-row 
        gap-3 sm:gap-4 
        items-stretch sm:items-center 
        justify-between
      ">

        {/* LEFT SIDE */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">

          {/* Gift Type */}
          <select
            value={giftType}
            onChange={(e) => handleChange("giftType", e.target.value)}
            className="
              w-full sm:w-auto 
              border rounded-lg px-3 py-2 
              text-sm sm:text-base 
              focus:outline-none focus:ring-2 focus:ring-[#8B3A62]
            "
          >
            <option value="">Gift Type</option>
            <option value="premium">Premium</option>
            <option value="budget">Budget</option>
            <option value="luxury">Luxury</option>
          </select>

          {/* Price */}
          <select
            value={priceRange}
            onChange={(e) => handleChange("priceRange", e.target.value)}
            className="
              w-full sm:w-auto 
              border rounded-lg px-3 py-2 
              text-sm sm:text-base 
              focus:outline-none focus:ring-2 focus:ring-[#8B3A62]
            "
          >
            <option value="">Price Range</option>
            <option value="0-500">Below ₹500</option>
            <option value="500-1000">₹500 - ₹1000</option>
            <option value="1000-2000">₹1000 - ₹2000</option>
            <option value="2000+">Above ₹2000</option>
          </select>

        </div>

        {/* SORT */}
        <div className="w-full sm:w-auto">
          <select
            value={sort}
            onChange={(e) => handleChange("sort", e.target.value)}
            className="
              w-full sm:w-auto 
              border rounded-lg px-3 py-2 
              text-sm sm:text-base 
              focus:outline-none focus:ring-2 focus:ring-[#8B3A62]
            "
          >
            <option value="">Sort By</option>
            <option value="popular">Most Popular</option>
            <option value="low-high">Price Low → High</option>
            <option value="high-low">Price High → Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>

      </div>
    </div>
  );
}