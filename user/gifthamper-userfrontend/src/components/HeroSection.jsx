import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";

import "swiper/css/pagination";

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

                      <button className="bg-white text-black px-6 py-3 rounded-full text-sm md:text-base hover:bg-gray-200 transition shadow-lg">
                        Build Custom Hamper
                      </button>

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
}