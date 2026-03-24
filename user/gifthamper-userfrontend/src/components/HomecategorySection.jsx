import { Link } from "react-router-dom";
import {
  Cake, Heart, Sparkles, Baby, GraduationCap, Home,
  Users, Briefcase, Crown, Gift, ArrowRight
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { motion } from "framer-motion";
import CategoryCard from "./CategoryCard.jsx";
import ProductCard from "./ProductCard.jsx";
import { useState } from "react";
import SellerCard from "./SellerCard.jsx";
import { useSelector } from "react-redux";


export default function HomeSections() {
// const [filters, setFilters] = useState({});
//  const [view, setView] = useState("grid-3");

  const occasions = [
    { id :'1',title: "Birthday", icon: Cake,image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400' },
    { id :'2',title: "Anniversary", icon: Heart,image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400' },
    { id :'3',title: "Wedding", icon: Sparkles,image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400' },
    { id :'4',title: "Baby Shower", icon: Baby,image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400' },
    { id :'5',title: "Graduation", icon: GraduationCap,image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400' },
    { id :'6',title: "Housewarming", icon: Home,image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400' },
  ];

  const recipients = [
    { id:'1',title: "For Him", icon: Users,image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400'  },
    { id:'2',title: "For Her", icon: Users,image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400'  },
    { id:'3',title: "For Kids", icon: Baby,image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400'  },
    { id:'4',title: "For Parents", icon: Users,image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400'},
    { id:'5',title: "For Couples", icon: Heart,image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400' },
    { id:'6',title: "Corporate", icon: Briefcase,image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400' },
  ];

  const products = useSelector((state) => state.products.items);
  
  const festivals = [
    { id:'1',title: "Christmas", icon: Users,image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400'  },
    { id:'2',title: "New year", icon: Users,image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400'  },
    { id:'3',title: "Mothers Day", icon: Baby,image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400'  },
    { id:'4',title: "Diwali", icon: Users,image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400'},
    { id:'5',title: "Valentines Day", icon: Heart,image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400' },
    { id:'6',title: "Fathers Day", icon: Briefcase,image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400' },
  ];
  const sellers = [
    { id: '1', name: 'jjkjkj', rating: 5, reviews: 450, productsCount: 85 },
    { id: '2', name: 'bjkjhkj', rating: 5, reviews: 320, productsCount: 42 },
    { id: '3', name: 'ft5ghyh.', rating: 5, reviews: 510, productsCount: 128 },
    { id: '4', name: 'yhuju', rating: 5, reviews: 680, productsCount: 156 },
  ];    //static data make dynamic later(ie backend)

 
  return (
    <div className="space-y-16 sm:space-y-20 lg:space-y-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

                         {/* SHOP BY OCCASION  */}
      <motion.section
        data-section="occasions"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mt-16 sm:mt-20 lg:mt-24 px-4 sm:px-6 lg:px-8"
        >
        <div className="relative mb-10 sm:mb-12 lg:mb-14">
        <div className="text-center max-w-2xl mx-auto">
             
            <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-3 text-[#8B3A62]"
            style={{ fontFamily: "var(--font-heading)" }}
            >
            Shop by Occasion
            </h2>

            <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed">
            Find the perfect gift for every celebration
            </p>
                        {/* desktop */}
            <Link
            to= "/products?category=Occasion" 
            // to ="/products"
            className="mt-4 flex sm:hidden justify-center items-center text-[#8B3A62] font-medium text-sm hover:underline"
            >
            View All
            <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
        </div>
                         {/* mobile */}
            <Link
                 to= "/products?category=Occasion" 
                // to ="/products"
                className="hidden sm:flex items-center absolute right-4 top-1/2 -translate-y-1/2 text-[#8B3A62] font-medium text-sm hover:underline"
            >
                View All
                <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
        </div>
                {/* grid */}
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 lg:gap-6">
            
            {occasions.map((occasion, index) => (
            
            <motion.div
                key={occasion.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                duration: 0.4,
                delay: index * 0.08,
                ease: "easeOut",
                }}
            >
                <CategoryCard
                title={occasion.title}
                icon={occasion.icon}
                image={occasion.image}
                href={`/products?category=Occasion&sub=${occasion.title}`}
                />
            </motion.div>
            ))}
        </div>
        </motion.section>

                    {/* SHOP BY RECIPIENT */}
      <motion.section
            data-section="recipients"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20"
            >
            
            <div className="relative mb-10 sm:mb-12 lg:mb-14">
            <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-3xl sm:text-4xl mb-4 text-[#8B3A62] font-semibold">
                Shop by Recipient
                </h2>
                <p className="text-gray-600 text-base sm:text-lg">
                Curated gifts for everyone you care about
                </p>

                            {/* desktop */}
            <Link
            to="/products?category=Recipient"
            // to ="/products"
            className="mt-4 flex sm:hidden justify-center items-center text-[#8B3A62] font-medium text-sm hover:underline"
            >
            View All
            <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            </div>
            
                         {/* mobile */}
            <Link
                to="/products?category=Recipient"
                // to ="/products"
                className="hidden sm:flex items-center absolute right-4 top-1/2 -translate-y-1/2 text-[#8B3A62] font-medium text-sm hover:underline"
            >
                View All
                <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipients.map((item, index) => (
                <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <CategoryCard {...item} href={`/products?category=Recipient&sub=${item.title}`}/>
                    
                </motion.div>
                ))}
            </div>
    </motion.section>

     
                         {/*  FEATURED HAMPERS */}
      <motion.section
        data-section="featured"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-20"
        >
            
        <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl sm:text-4xl text-[#8B3A62] font-semibold">
            Featured Hampers
            </h2>
            
            <Link 
            to ="/products?category=featured"
            // to ="/products"
            className="mt-4 flex sm:justify-center items-center text-[#8B3A62] font-medium text-sm hover:underline">
            View All 
            <ArrowRight className="ml-2-w-4 h-4"/>
            </Link>
        </div>
         
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
            <motion.div
                key={product.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
            >
                 <ProductCard {...product}/> 
            </motion.div>
            ))}
        </div>
    </motion.section>
    

                        {/* FESTIVAL SPECIALS*/}
      <motion.section
        data-section="festival"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-20 bg-[#FFF8F6] py-12 px-4 sm:px-8 rounded-2xl"
        >
            
        <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl text-[#8B3A62] font-semibold">
            Festival Specials 
            </h2>
            
            <p className="text-gray-600 mt-2">
            Celebrate every festival with love
            </p>
             <Link 
            to ="/products?category=Festival"
            // to ="/products"
            className="mt-4 flex sm:justify-center items-center text-[#8B3A62] font-medium text-sm hover:underline">
            View All 
            <ArrowRight className="ml-2-w-4 h-4"/>
            </Link>
        </div>

            <Swiper
                modules={[Autoplay ]}
               
                spaceBetween={16}
                slidesPerView={2}
                className="px-2 sm:px-4" 
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
                }}
            >
                {festivals.map((item, index) => (
                <SwiperSlide key={item.title}>
                
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                >
                <CategoryCard
                    title={item.title}
                    icon={item.icon}
                    image={item.image}
                    href={`/products?category=Festival&sub=${item.title}`}
                     className="h-48 sm:h-56 lg:h-64"
                />
                </motion.div>

             </SwiperSlide>
                ))}
            </Swiper>
        </motion.section>

                                {/*  TOP SELLERS */}

     <motion.section
        data-section="sellers"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-20"
        >
        <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl text-[#8B3A62] font-semibold">
            Top Sellers
            </h2>
            <p className="text-gray-600">
            Trusted brands loved by customers
            </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {sellers.map((seller, index) => (
            <motion.div
                key={seller.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
            >
                <SellerCard {...seller} />
            </motion.div>
             ))} 
        </div>
        </motion.section>

                              {/*CUSTOM HAMPER CTA  */}
       <motion.section
        data-section="custom"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mt-20"
        >
        
        <div className="bg-gradient-to-r from-[#8B3A62] to-[#D4AF37] rounded-3xl p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-6 text-white shadow-xl">
            
            <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-3">
                Create Your Custom Hamper 
            </h2>
            <p className="text-sm sm:text-base opacity-90">
                Personalize your gift with hand-picked items
            </p>
            </div>

            <Link to="/custom-hamper"
            className="bg-white text-[#8B3A62] px-6 py-3 rounded-full font-medium hover:scale-105 transition"
            >
            Start Building
            </Link>

        </div>
        </motion.section> 

    </div>
  );
}