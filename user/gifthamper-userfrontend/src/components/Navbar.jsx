import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Heart, ShoppingCart, Menu, X, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Occasions", path: "/products?category=occasion" },
    { name: "Recipients", path: "/products?category=recipient" },
    { name: "Festivals", path: "/products?category=festival" },
    { name: "Corporate Gifts", path: "/products?category=corporate" },
  ];

  // Framer Motion variants for hover effect
  const linkHover = {
    hover: { scale: 1.1, color: "#8B3A62", transition: { duration: 0.2 } },
  };

  const iconHover = {
    hover: { scale: 1.2, color: "#8B3A62", transition: { duration: 0.2 } },
  };

  return (
    <nav
      className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-[#8B3A62]">
              <span className="text-white text-lg sm:text-xl"></span>
            </div>
            <span className="text-lg sm:text-xl lg:text-2xl font-semibold text-[#8B3A62] tracking-tight">
              GiftHamper
            </span>
          </Link>

          {/* Desktop Menu Links */}
          <div className="hidden lg:flex items-center space-x-8 text-sm xl:text-base font-medium flex-1 ml-8">
            {navLinks.map((link) => (
              <motion.div key={link.name} variants={linkHover} whileHover="hover">
                <Link
                  to={link.path}
                  className="text-gray-700 transition-colors duration-200"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Desktop Icons */}
          <div className="hidden lg:flex items-center space-x-5">
            {/* Search */}
            <motion.div variants={iconHover} whileHover="hover" className="relative">
              <input
                type="text"
                placeholder="Search gifts..."
                className="w-48 xl:w-64 pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-full bg-[#FFF8F6] focus:outline-none focus:ring-2 focus:ring-[#8B3A62]"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            </motion.div>

            {/* Wishlist */}
            <motion.button
              variants={iconHover}
              whileHover="hover"
              className="relative p-2 text-gray-700 transition"
            >
              <Heart size={22} />
              <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {/* Optional count */}
              </span>
            </motion.button>

            {/* Cart */}
            <motion.button
              variants={iconHover}
              whileHover="hover"
              className="relative p-2 text-gray-700 transition"
            >
              <ShoppingCart size={22} />
              <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {/* Optional count */}
              </span>
            </motion.button>

            {/* Login */}
            <motion.button
              variants={iconHover}
              whileHover="hover"
              className="flex items-center space-x-2 bg-[#8B3A62] text-white px-5 py-2 rounded-full text-sm hover:shadow-lg transition"
            >
              <User size={16} />
              <span>Login</span>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 ml-2"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-4 border-t">
                {/* Mobile Search */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search gifts..."
                    className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-full bg-[#FFF8F6] focus:outline-none focus:ring-2 focus:ring-[#8B3A62]"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>

                {/* Mobile Links */}
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-gray-700 hover:text-[#8B3A62] py-2 text-sm font-medium transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                ))}

                {/* Mobile Icons */}
                <div className="flex justify-between pt-4 border-t text-sm">
                  <button className="flex items-center gap-2 text-gray-700">
                    <Heart size={18} /> Wishlist
                  </button>
                  <button className="flex items-center gap-2 text-gray-700">
                    <ShoppingCart size={18} /> Cart
                  </button>
                </div>

                {/* Mobile Login */}
                <button className="w-full flex items-center justify-center gap-2 bg-[#8B3A62] text-white py-3 rounded-full text-sm font-medium">
                  <User size={16} /> Login / Register
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}