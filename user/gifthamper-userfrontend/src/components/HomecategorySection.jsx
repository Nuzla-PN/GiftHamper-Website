// import { Link } from "react-router-dom";
// import {
//   Cake, Heart, Sparkles, Baby, GraduationCap, Home,
//   Users, Briefcase, Crown, Gift, ArrowRight
// } from "lucide-react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import { motion } from "framer-motion";
// import CategoryCard from "./CategoryCard.jsx";
// import ProductCard from "./ProductCard.jsx";
// import { useState } from "react";
// import SellerCard from "./SellerCard.jsx";
// import { useSelector } from "react-redux";
// import { categoryConfig, priceConfig } from "../data/dataConfig.js";


// export default function HomeSections() {
// // const [filters, setFilters] = useState({});
// //  const [view, setView] = useState("grid-3");

// //--THIS WAS HARDCODED DATA-------
// //   const occasions = [
// //     { id :'1',title: "Birthday", icon: Cake,image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400' },
// //     { id :'2',title: "Anniversary", icon: Heart, image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400' },
// //     { id :'3',title: "Wedding", icon: Sparkles,image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400' },
// //     { id :'4',title: "Baby Shower", icon: Baby,image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400' },
// //     { id :'5',title: "Graduation", icon: GraduationCap,image: 'https://images.unsplash.com/photo-1623461487986-9400110de28e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
// //     { id :'6',title: "Housewarming", icon: Home,image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400' },
// //   ];

// //   const recipients = [
// //     { id:'1',title: "For Him", icon: Users,image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400'  },
// //     { id:'2',title: "For Her", icon: Users,image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400'  },
// //     { id:'3',title: "For Kids", icon: Baby,image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400'   },
// //     { id:'4',title: "For Parents", icon: Users, image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400'},
// //     { id:'5',title: "For Couples", icon: Heart,image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400' },
// //     { id:'6',title: "Corporate", icon: Briefcase,image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400' },
// //   ];
  
// //   const festivals = [
// //     { id:'1',title: "Christmas", icon: Users,image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400'  },
// //     { id:'2',title: "New year", icon: Users,image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400'  },
// //     { id:'3',title: "Mothers Day", icon: Baby,image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400'  },
// //     { id:'4',title: "Diwali", icon: Users,image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400'},
// //     { id:'5',title: "Valentines Day", icon: Heart,image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400' },
// //     { id:'6',title: "Fathers Day", icon: Briefcase,image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400' },
// //   ];

// const occasions = categoryConfig.Occasion.items.map((item) => ({
//   ...item,
//   link: `/products?category=Occasion&sub=${item.id}`,
// }));

// const recipients = categoryConfig.Recipient.items.map((item)=>({
//     ...item,
//     link: `/products?category=Recipient&sub=${item.id}`,
// }));

// const festivals = categoryConfig.Festival.items.map((item)=>({
//     ...item,
//     link:`/products?category=Festival$sub=${item.id}`,
// }));

// // const priceRanges = priceConfig.map((item)=>({ // not using it now in home section used only in navbar now
// //     ...item,
// //     link:`products?price=${item.value}`, 
// // }));

//   const products = useSelector((state) => state.products.items);

//   const sellers = [
//     { id: '1', name: 'jjkjkj', rating: 5, reviews: 450, productsCount: 85 },
//     { id: '2', name: 'bjkjhkj', rating: 5, reviews: 320, productsCount: 42 },
//     { id: '3', name: 'ft5ghyh.', rating: 5, reviews: 510, productsCount: 128 },
//     { id: '4', name: 'yhuju', rating: 5, reviews: 680, productsCount: 156 },
//   ];    //static data make dynamic later(ie backend)

 
//   return (
//     <div className="space-y-16 sm:space-y-20 lg:space-y-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

//                          {/* SHOP BY OCCASION  */}
//       <motion.section
//         data-section="occasions"
//         initial={{ opacity: 0, y: 50 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true, margin: "-80px" }}
//         transition={{ duration: 0.6 }}
//         className="mt-16 sm:mt-20 lg:mt-24 px-4 sm:px-6 lg:px-8"
//         >
//         <div className="relative mb-10 sm:mb-12 lg:mb-14">
//         <div className="text-center max-w-2xl mx-auto">
             
//             <h2
//             className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-3 text-[#8B3A62]"
//             style={{ fontFamily: "var(--font-heading)" }}
//             >
//             Shop by Occasion
//             </h2>

//             <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed">
//             Find the perfect gift for every celebration
//             </p>
//                         {/* desktop */}
//             <Link
//             to= "/products?category=Occasion" 
//             // to ="/products"
//             className="mt-4 flex sm:hidden justify-center items-center text-[#8B3A62] font-medium text-sm hover:underline"
//             >
//             View All
//             <ArrowRight className="ml-2 w-4 h-4" />
//             </Link>
//         </div>
//                          {/* mobile */}
//             <Link
//                  to= "/products?category=Occasion" 
//                 // to ="/products"
//                 className="hidden sm:flex items-center absolute right-4 top-1/2 -translate-y-1/2 text-[#8B3A62] font-medium text-sm hover:underline"
//             >
//                 View All
//                 <ArrowRight className="ml-2 w-4 h-4" />
//             </Link>
//         </div>
//                 {/* grid */}
        
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 lg:gap-6">
            
//             {occasions.map((occasion, index) => (
            
//             <motion.div
//                 key={occasion.id}
//                 initial={{ opacity: 0, y: 25 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{
//                 duration: 0.4,
//                 delay: index * 0.08,
//                 ease: "easeOut",
//                 }}
//             >
//                 <CategoryCard
//                 title={occasion.title}
//                 icon={occasion.icon}
//                 image={occasion.image}
//                 href={`/products?category=Occasion&sub=${occasion.id}`}
//                 />
//             </motion.div>
//             ))}
//         </div>
//         </motion.section>

//                     {/* SHOP BY RECIPIENT */}
//       <motion.section
//             data-section="recipients"
//             initial={{ opacity: 0, y: 50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="mt-20"
//             >
            
//             <div className="relative mb-10 sm:mb-12 lg:mb-14">
//             <div className="text-center max-w-2xl mx-auto">
//                 <h2 className="text-3xl sm:text-4xl mb-4 text-[#8B3A62] font-semibold">
//                 Shop by Recipient
//                 </h2>
//                 <p className="text-gray-600 text-base sm:text-lg">
//                 Curated gifts for everyone you care about
//                 </p>

//                             {/* desktop */}
//             <Link
//             to="/products?category=Recipient"
//             // to ="/products"
//             className="mt-4 flex sm:hidden justify-center items-center text-[#8B3A62] font-medium text-sm hover:underline"
//             >
//             View All
//             <ArrowRight className="ml-2 w-4 h-4" />
//             </Link>
//             </div>
            
//                          {/* mobile */}
//             <Link
//                 to="/products?category=Recipient"
//                 // to ="/products"
//                 className="hidden sm:flex items-center absolute right-4 top-1/2 -translate-y-1/2 text-[#8B3A62] font-medium text-sm hover:underline"
//             >
//                 View All
//                 <ArrowRight className="ml-2 w-4 h-4" />
//             </Link>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {recipients.map((item, index) => (
//                 <motion.div
//                     key={item.id}
//                     initial={{ opacity: 0, y: 20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     transition={{ delay: index * 0.1 }}
//                 >
//                     <CategoryCard {...item} href={`/products?category=Recipient&sub=${item.id}`}/>
                    
//                 </motion.div>
//                 ))}
//             </div>
//     </motion.section>

     
//                          {/*  FEATURED HAMPERS */}
//       <motion.section
//         data-section="featured"
//         initial={{ opacity: 0, y: 50 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="mt-20"
//         >
            
//         <div className="flex justify-between items-center mb-10">
//             <h2 className="text-3xl sm:text-4xl text-[#8B3A62] font-semibold">
//             Featured Hampers
//             </h2>
            
//             <Link 
//             to="/products?featured=true"
//             // to ="/products?category=featured"
//             // to ="/products"
//             className="mt-4 flex sm:justify-center items-center text-[#8B3A62] font-medium text-sm hover:underline">
//             View All 
//             <ArrowRight className="ml-2 w-4 h-4"/>
//             </Link>
//         </div>
         
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
//             {products
//             .filter((p) => p.isFeatured)  
//             .slice(0, 8)
//             .map((product, index) => (
//             <motion.div
//                 key={product.id}
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 transition={{ delay: index * 0.1 }}
//             >
//                  <ProductCard {...product} href={`/products/${product.id}`}/> 
//             </motion.div>
//             ))}
//         </div>
//     </motion.section>
    

//                         {/* FESTIVAL SPECIALS*/}
//       <motion.section
//         data-section="festival"
//         initial={{ opacity: 0, y: 50 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="mt-20 bg-[#FFF8F6] py-12 px-4 sm:px-8 rounded-2xl"
//         >
            
//         <div className="text-center mb-10">
//             <h2 className="text-3xl sm:text-4xl text-[#8B3A62] font-semibold">
//             Festival Specials 
//             </h2>
            
//             <p className="text-gray-600 mt-2">
//             Celebrate every festival with love
//             </p>
//              <Link 
//             to ="/products?category=Festival"
//             // to ="/products"
//             className="mt-4 flex sm:justify-center items-center text-[#8B3A62] font-medium text-sm hover:underline">
//             View All 
//             <ArrowRight className="ml-2 w-4 h-4"/>
//             </Link>
//         </div>

//             <Swiper
//                 modules={[Autoplay ]}
               
//                 spaceBetween={16}
//                 slidesPerView={2}
//                 className="px-2 sm:px-4" 
//                 autoplay={{ delay: 3000, disableOnInteraction: false }}
//                 breakpoints={{
//                 640: { slidesPerView: 2 },
//                 768: { slidesPerView: 3 },
//                 1024: { slidesPerView: 4 },
//                 }}
//             >
//                 {festivals.map((item, index) => (
//                 <SwiperSlide key={item.title}>
                
//                 <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.05 }}
//                 >
//                 <CategoryCard
//                     title={item.title}
//                     icon={item.icon}
//                     image={item.image}
//                     href={`/products?category=Festival&sub=${item.title}`}
//                      className="h-48 sm:h-56 lg:h-64"
//                 />
//                 </motion.div>

//              </SwiperSlide>
//                 ))}
//             </Swiper>
//         </motion.section>

//                                 {/*  TOP SELLERS */}

//      <motion.section
//         data-section="sellers"
//         initial={{ opacity: 0, y: 50 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="mt-20"
//         >
//         <div className="text-center mb-12">
//             <h2 className="text-3xl sm:text-4xl text-[#8B3A62] font-semibold">
//             Top Sellers
//             </h2>
//             <p className="text-gray-600">
//             Trusted brands loved by customers
//             </p>
//         </div>

//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
//             {sellers.map((seller, index) => (
//             <motion.div
//                 key={seller.id}
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 transition={{ delay: index * 0.1 }}
//             >
//                 <SellerCard {...seller} />
//             </motion.div>
//              ))} 
//         </div>
//         </motion.section>

//                               {/*CUSTOM HAMPER CTA  */}
//        <motion.section
//         data-section="custom"
//         initial={{ opacity: 0, scale: 0.95 }}
//         whileInView={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.5 }}
//         className="mt-20"
//         >
        
//         <div className="bg-gradient-to-r from-[#8B3A62] to-[#D4AF37] rounded-3xl p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-6 text-white shadow-xl">
            
//             <div>
//             <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-3">
//                 Create Your Custom Hamper 
//             </h2>
//             <p className="text-sm sm:text-base opacity-90">
//                 Personalize your gift with hand-picked items
//             </p>
//             </div>

//             <Link to="/custom-hamper"
//             className="bg-white text-[#8B3A62] px-6 py-3 rounded-full font-medium hover:scale-105 transition"
//             >
//             Start Building
//             </Link>

//         </div>
//         </motion.section> 

//     </div>
//   );
// }

//cloude code

import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Star, Truck, Package, Heart } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import CategoryCard from "./CategoryCard.jsx";
import ProductCard from "./ProductCard.jsx";
import SellerCard from "./SellerCard.jsx";
import { useSelector } from "react-redux";
import { categoryConfig } from "../data/dataConfig.js";

/* ────────────────────────────────────────────────────────────────────
   PALETTE  — warm blush · soft peach · champagne cream · sage green
   Primary    #C2556A  (deep rose)
   Accent     #E8956D  (warm peach)
   Gold       #D4A847  (honey gold)
   Page bg    #FEF9F5  (warm cream)
   Dark bg    #3B2A35  (deep mulberry — only hero & CTA)
   Sage       #6B8F71  (sage green – subtle accents)
──────────────────────────────────────────────────────────────────── */

const CONFETTI_TEXTURE = `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='15' cy='20' r='2' fill='%23E8956D' opacity='0.18'/%3E%3Ccircle cx='75' cy='10' r='1.5' fill='%23C2556A' opacity='0.15'/%3E%3Ccircle cx='45' cy='60' r='2.5' fill='%23D4A847' opacity='0.12'/%3E%3Ccircle cx='90' cy='75' r='1.5' fill='%23E8956D' opacity='0.15'/%3E%3Ccircle cx='25' cy='85' r='2' fill='%23C2556A' opacity='0.12'/%3E%3Ccircle cx='60' cy='35' r='1' fill='%236B8F71' opacity='0.18'/%3E%3C/svg%3E")`;

/* ── animations ── */
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] } },
});
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

/* ── hero slides ── */
const slides = [
  {
    id: 1, tag: "New Collection",
    title: "Gifts That Feel\nLike Magic ",
    subtitle: "Curated premium hampers for every celebration",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400",
    cta: "Shop All Gifts", ctaLink: "/products",
  },
  {
    id: 2, tag: "Personalised",
    title: "Make It\nUnforgettably Yours",
    subtitle: "Build your own bespoke gift box, hand-packed with love",
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1400",
    cta: "Build Custom Hamper", ctaLink: "/custom-hamper",
  },
  {
    id: 3, tag: "For Every Moment",
    title: "Perfect Gifts\nfor Loved Ones ",
    subtitle: "Discover unique hampers from our top sellers",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1400",
    cta: "Explore Now", ctaLink: "/products",
  },
];

/* ── section header ── */
function SectionHeader({ eyebrow, title, linkTo, inverted = false }) {
  return (
    <div className="flex items-end justify-between gap-4 mb-8 sm:mb-10">
      <div>
        <p className={`text-[10px] tracking-[0.2em] uppercase font-bold mb-1.5 ${inverted ? "text-amber-300/70" : "text-[#C2556A]"}`}>
          ✦ {eyebrow}
        </p>
        <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight ${inverted ? "text-white" : "text-[#3B2A35]"}`}>
          {title}
        </h2>
      </div>
      {linkTo && (
        <Link to={linkTo} className={`group flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase shrink-0 transition-all ${inverted ? "text-amber-300 hover:text-white" : "text-[#C2556A] hover:text-[#3B2A35]"}`}>
          View all <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
}

function Rule() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-rose-100" />
        <Heart size={12} className="text-rose-200 fill-rose-200" />
        <div className="flex-1 h-px bg-rose-100" />
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════════════════════════ */
export default function HomePage() {
  const occasions  = categoryConfig.Occasion.items.map((item) => ({ ...item, link: `/products?category=Occasion&sub=${item.id}` }));
  const recipients = categoryConfig.Recipient.items.map((item) => ({ ...item, link: `/products?category=Recipient&sub=${item.id}` }));
  const festivals  = categoryConfig.Festival.items.map((item)  => ({ ...item, link: `/products?category=Festival&sub=${item.title}` }));
  const products   = useSelector((s) => s.products.items);

  const sellers = [
    { id: "1", name: "jjkjkj",   rating: 5, reviews: 450, productsCount: 85  },
    { id: "2", name: "bjkjhkj",  rating: 5, reviews: 320, productsCount: 42  },
    { id: "3", name: "ft5ghyh.", rating: 5, reviews: 510, productsCount: 128 },
    { id: "4", name: "yhuju",    rating: 5, reviews: 680, productsCount: 156 },
  ];

  return (
    <div className="bg-[#FEF9F5] overflow-x-hidden">

      {/* ════════════════════════════════════════════════════════
          §1  HERO SLIDER
      ════════════════════════════════════════════════════════ */}
      <section className="w-full">
        <style>{`
          .hero-swiper .swiper-pagination { bottom: 20px !important; }
          .hero-swiper .swiper-pagination-bullet {
            background: rgba(255,255,255,0.5); width:8px; height:8px; opacity:1; transition: all .3s;
          }
          .hero-swiper .swiper-pagination-bullet-active {
            background: #D4A847; width:26px; border-radius:4px;
          }
        `}</style>

        <Swiper
          modules={[Pagination, Autoplay]}
          loop pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          className="hero-swiper"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative w-full h-[460px] sm:h-[540px] md:h-[620px] lg:h-[700px] overflow-hidden">
                <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />

                {/* warm rose-to-mulberry overlay */}
                <div className="absolute inset-0" style={{ background: "linear-gradient(110deg, rgba(59,42,53,0.88) 0%, rgba(59,42,53,0.6) 50%, rgba(59,42,53,0.1) 100%)" }} />

                {/* soft confetti dots */}
                <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: CONFETTI_TEXTURE }} />

                {/* warm peach glow */}
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[130px] pointer-events-none" style={{ background: "rgba(232,149,109,0.2)" }} />

                <div className="absolute inset-0 flex items-center">
                  <div className="max-w-7xl mx-auto px-6 sm:px-10 w-full">
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                      className="max-w-2xl"
                    >
                      {/* tag */}
                      <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-[11px] font-bold tracking-[0.15em] uppercase border"
                        style={{ borderColor: "rgba(212,168,71,0.4)", color: "#D4A847", background: "rgba(212,168,71,0.08)" }}>
                        <Sparkles size={11} /> {slide.tag}
                      </div>

                      <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.05] tracking-tight whitespace-pre-line drop-shadow-sm">
                        {slide.title}
                      </h1>

                      <p className="mt-5 text-white/70 text-base sm:text-lg leading-relaxed max-w-md">
                        {slide.subtitle}
                      </p>

                      <div className="mt-8 flex flex-wrap gap-3">
                        <Link
                          to={slide.ctaLink}
                          className="px-7 py-3.5 rounded-full font-bold text-sm text-white transition-all hover:shadow-2xl hover:-translate-y-0.5"
                          style={{ background: "linear-gradient(135deg, #C2556A, #E8956D)" }}
                        >
                          {slide.cta}
                        </Link>
                        <Link
                          to="/products"
                          className="px-7 py-3.5 rounded-full font-medium text-sm text-white/90 border border-white/25 hover:bg-white/10 transition-all"
                        >
                          Browse All
                        </Link>
                      </div>

                      {/* trust */}
                      <div className="mt-8 flex flex-wrap gap-5">
                        {[{ icon: Star, text: "4.9 / 5 Rating" }, { icon: Truck, text: "Same-Day Dispatch" }, { icon: Package, text: "Premium Packaging" }]
                          .map(({ icon: Icon, text }) => (
                            <span key={text} className="flex items-center gap-1.5 text-white/50 text-xs">
                              <Icon size={12} className="text-[#D4A847]" /> {text}
                            </span>
                          ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      
      <div className="overflow-hidden py-3" style={{ background: "linear-gradient(90deg, #C2556A, #E8956D, #C2556A)" }}>
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap"
        >
          {Array(6).fill(null).map((_, i) => (
            <span key={i} className="text-white text-[11px] font-extrabold tracking-[0.18em] uppercase mx-8 inline-flex items-center gap-4">
              🎀Gift Wrapping  💌 10,000+ Happy Customers 🎁 Handpicked Quality ✨ Custom Hampers &nbsp;
            </span>
          ))}
        </motion.div>
      </div>

      
            {/* SHOP BY OCCASION */}
      
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={stagger}>
          <motion.div variants={fadeUp()}>
            <SectionHeader eyebrow="Shop by moment" title="Perfect for Every Occasion " linkTo="/products?category=Occasion" />
          </motion.div>

          {/* Desktop */}
          <div className="hidden sm:grid grid-cols-3 lg:grid-cols-6 gap-4">
            {occasions.map((o, i) => (
              <motion.div key={o.id} variants={fadeUp(i * 0.07)}>
                <CategoryCard title={o.title} icon={o.icon} image={o.image} href={`/products?category=Occasion&sub=${o.id}`} />
              </motion.div>
            ))}
          </div>

          {/* Mobile */}
          <div className="sm:hidden -mx-4">
            <Swiper spaceBetween={10} slidesPerView={2.4} className="px-4">
              {occasions.map((o) => (
                <SwiperSlide key={o.id}>
                  <CategoryCard title={o.title} icon={o.icon} image={o.image} href={`/products?category=Occasion&sub=${o.id}`} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </motion.div>
      </section>

      <Rule />

     
           {/* FEATURED HAMPERS  */}
     
      <section className="py-16 sm:py-20" style={{ background: "linear-gradient(135deg, #FDF0F0 0%, #FEF5EC 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={stagger}>
            <motion.div variants={fadeUp()}>
              <SectionHeader eyebrow="Handpicked for you" title="Featured Hampers " linkTo="/products?featured=true" />
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
              {products.filter((p) => p.isFeatured).slice(0, 8).map((product, i) => (
                <motion.div key={product.id} variants={fadeUp(i * 0.05)}>
                  <ProductCard {...product} href={`/products/${product.id}`} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      
          {/* WHY CHOOSE US  */}
     
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeUp()} className="text-center mb-10">
            <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#C2556A] mb-1.5">✦ Our promise</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#3B2A35]">Why Gift With Us 💕</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              { icon: "🎁", title: "Curated with Love",   desc: "Every item is handpicked and quality-checked before it reaches you.", color: "#FFF0F3" },
              { icon: "⚡", title: "Same-Day Dispatch",    desc: "Order before 2 PM for same-day shipping across major cities.",        color: "#FFF6EC" },
              { icon: "✍️", title: "Personal Touch",       desc: "Custom messages, cards, and premium wrapping on every order.",        color: "#F3FBF4" },
            ].map((item, i) => (
              <motion.div
                key={item.title} variants={fadeUp(i * 0.1)}
                className="group rounded-2xl p-6 sm:p-8 border border-rose-50 hover:shadow-lg hover:-translate-y-1 transition-all text-center"
                style={{ background: item.color }}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 className="font-bold text-[#3B2A35] text-base mb-2">{item.title}</h3>
                <p className="text-sm text-rose-900/50 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <Rule />

      
          {/* SHOP BY RECIPIENT */}
      
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={stagger}>
          <motion.div variants={fadeUp()}>
            <SectionHeader eyebrow="Gifts for everyone" title="Shop by Recipient " linkTo="/products?category=Recipient" />
          </motion.div>

          <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {recipients.map((item, i) => (
              <motion.div key={item.id} variants={fadeUp(i * 0.07)}>
                <CategoryCard {...item} href={`/products?category=Recipient&sub=${item.id}`} />
              </motion.div>
            ))}
          </div>

          <div className="sm:hidden -mx-4">
            <Swiper spaceBetween={10} slidesPerView={1.55} className="px-4">
              {recipients.map((item) => (
                <SwiperSlide key={item.id}>
                  <CategoryCard {...item} href={`/products?category=Recipient&sub=${item.id}`} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </motion.div>
      </section>

   
        {/* FESTIVAL SPECIALS  */}
    
      <section className="relative overflow-hidden py-16 sm:py-20" style={{ background: "linear-gradient(135deg, #3B2A35 0%, #6B3A4A 50%, #9B4A5A 100%)" }}>
        {/* soft sparkle dots */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: CONFETTI_TEXTURE }} />
        {/* warm glow */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px] pointer-events-none" style={{ background: "rgba(232,149,109,0.2)" }} />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-[100px] pointer-events-none" style={{ background: "rgba(212,168,71,0.12)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <SectionHeader eyebrow="Celebrate every festival" title="Festival Specials 🪔" linkTo="/products?category=Festival" inverted />
          </motion.div>

          <Swiper
            modules={[Autoplay]}
            spaceBetween={14} slidesPerView={1.6}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{ 480: { slidesPerView: 2.2 }, 768: { slidesPerView: 3.2 }, 1024: { slidesPerView: 4.2 } }}
          >
            {festivals.map((item, i) => (
              <SwiperSlide key={item.title}>
                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                  <CategoryCard title={item.title} icon={item.icon} image={item.image} href={`/products?category=Festival&sub=${item.title}`} />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

     
         {/* TOP SELLERS */}
    
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeUp()} className="text-center mb-10">
            <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#C2556A] mb-1.5">✦ Trusted brands</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#3B2A35]">Top Sellers ⭐</h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {sellers.map((seller, i) => (
              <motion.div key={seller.id} variants={fadeUp(i * 0.08)}>
                <SellerCard {...seller} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

  
          {/* CUSTOM HAMPER  */}
     
      <section className="pb-20 sm:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div
            className="relative overflow-hidden rounded-3xl"
            style={{ background: "linear-gradient(135deg, #3B2A35 0%, #6B3A4A 50%, #9B4A5A 100%)" }}
          >
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: CONFETTI_TEXTURE }} />
            <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full blur-[100px] pointer-events-none" style={{ background: "rgba(232,149,109,0.2)" }} />
            <div className="absolute -bottom-16 -left-16 w-60 h-60 rounded-full blur-[80px] pointer-events-none" style={{ background: "rgba(212,168,71,0.12)" }} />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 p-8 sm:p-12 lg:p-16">
              <div className="text-center lg:text-left max-w-lg">
                <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.15em] uppercase rounded-full px-4 py-1.5 mb-6 border"
                  style={{ borderColor: "rgba(212,168,71,0.4)", color: "#D4A847", background: "rgba(212,168,71,0.08)" }}>
                  <Sparkles size={11} /> Fully Personalised 
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
                  Build Your Own<br />
                  <span className=" font-light" style={{ color: "#D4A847" }}>Dream Hamper </span>
                </h2>
                <p className="text-white/60 text-base leading-relaxed">
                  Pick items you love, choose your wrapping, add a heartfelt note — all in one place.
                </p>

                {/* steps */}
                <div className="flex items-center gap-3 mt-6 flex-wrap justify-center lg:justify-start">
                  {["Pick Items 🛍️", "Choose Wrapping ", "Add Message "].map((step, i) => (
                    <div key={step} className="flex items-center gap-2 text-white/50 text-xs">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-[#3B2A35]"
                        style={{ background: "linear-gradient(135deg, #D4A847, #e8c96e)" }}>
                        {i + 1}
                      </span>
                      {step}
                      {i < 2 && <span className="text-white/20">›</span>}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                <Link
                  to="/custom-hamper"
                  className="px-8 py-4 rounded-full font-bold text-sm text-white transition-all hover:shadow-2xl hover:-translate-y-0.5 whitespace-nowrap text-center"
                  style={{ background: "linear-gradient(135deg, #C2556A, #E8956D)" }}
                >
                  Start Building 
                </Link>
                <Link
                  to="/products"
                  className="px-8 py-4 rounded-full font-medium text-sm text-white/60 border border-white/15 hover:border-white/30 hover:text-white/90 transition-all whitespace-nowrap text-center"
                >
                  Browse Ready-made
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
