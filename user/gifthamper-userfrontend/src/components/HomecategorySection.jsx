import { Link } from "react-router-dom";
import {
  Cake, Heart, Sparkles, Baby, GraduationCap, Home,
  Users, Briefcase, Crown, Gift, ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";
import CategoryCard from "./CategoryCard.jsx";
import ProductCard from "./ProductCard.jsx";

export default function HomeSections() {

  const occasions = [
    { title: "Birthday", icon: Cake },
    { title: "Anniversary", icon: Heart },
    { title: "Wedding", icon: Sparkles },
    { title: "Baby Shower", icon: Baby },
    { title: "Graduation", icon: GraduationCap },
    { title: "Housewarming", icon: Home },
  ];

  const recipients = [
    { title: "For Him", icon: Users },
    { title: "For Her", icon: Users },
    { title: "For Kids", icon: Baby },
    { title: "For Parents", icon: Users },
    { title: "For Couples", icon: Heart },
    { title: "Corporate", icon: Briefcase },
  ];

  const products = [1, 2, 3, 4];

 
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
        
        <div className="text-center mb-10 sm:mb-12 lg:mb-14 max-w-2xl mx-auto">
            
            <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-3 text-[#8B3A62]"
            style={{ fontFamily: "var(--font-heading)" }}
            >
            Shop by Occasion
            </h2>

            <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed">
            Find the perfect gift for every celebration
            </p>

        </div>

        
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
                {/* <CategoryCard
                title={occasion.title}
                icon={occasion.icon}
                /> */}
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
            <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl mb-4 text-[#8B3A62] font-semibold">
                Shop by Recipient
                </h2>
                <p className="text-gray-600 text-base sm:text-lg">
                Curated gifts for everyone you care about
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipients.map((item, index) => (
                <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    {/* <CategoryCard title={item.title} icon={item.icon} /> */}
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

            <button className="text-[#8B3A62] font-medium hover:underline">
            View All →
            </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
            <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
            >
                {/* <ProductCard product={product} /> */}
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
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
            <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
            >
                {/* <ProductCard product={product} /> */}
            </motion.div>
            ))}
        </div>
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
            {/* {sellers.map((seller, index) => ( */}
            <motion.div
                // key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                // transition={{ delay: index * 0.1 }}
            >
                {/* <SellerCard seller={seller} /> */}
            </motion.div>
            {/* ))} */}
        </div>
        </motion.section>

                              {/*CUSTOM HAMPER CTA  */}
      {/* <motion.section
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

            <button className="bg-white text-[#8B3A62] px-6 py-3 rounded-full font-medium hover:scale-105 transition">
            Start Building
            </button>

        </div>
        </motion.section> */}

    </div>
  );
}