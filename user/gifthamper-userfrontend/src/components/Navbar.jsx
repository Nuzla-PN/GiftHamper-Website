import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Heart,
  ShoppingCart,
  Menu,
  X,
  User,
  ChevronDown,
  Gift,
  Sparkles,
  Baby,
  GraduationCap,
  Home as HomeIcon,
  Briefcase,
  Users,
  PartyPopper,
  Cake,
  Flower2,
  TreePine,
  Zap,
  Cookie,
  Grape,
  Coffee,
  Sparkle,
  Crown,
  Type,
  Leaf,
  IndianRupee
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { categoryConfig, priceConfig } from '../data/dataConfig';
import { useSelector } from 'react-redux';


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState(null);
  const navigate = useNavigate();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const wishlistCount = wishlistItems.length;
  
 
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

 useEffect(() => {
  const handleClickOutside = (e) => {
    setActiveDropdown(null);
  };

  document.addEventListener("click", handleClickOutside);
  return () => document.removeEventListener("click", handleClickOutside);
}, []);

//THIS IS HARDCODED DATA---------------------

//  const occasionsCategories = [
//     { title: "Birthday", icon: Cake, link: "/products?category=Occasion&sub=birthday" },
//     { title: "Anniversary", icon: Heart, link: "/products?category=Occasion&sub=anniversary" },
//     { title: "Wedding", icon: Sparkles, link: "/products?category=Occasion&sub=wedding" },
//     { title: "Baby Shower", icon: Baby, link: "/products?category=Occasion&sub=baby-shower" },
//     { title: "Graduation", icon: GraduationCap, link: "/products?category=Occasion&sub=graduation" },
//     { title: "Housewarming", icon: HomeIcon, link: "/products?category=Occasion&sub=housewarming" },
//     { title: "Engagement", icon: Heart, link: "/products?category=Occasion&sub=engagement" },
//     { title: "Get Well Soon", icon: Flower2, link: "/products?category=Occasion&sub=get-well" }
//   ];

//   const recipientsCategories = [
//     { title: "Gifts for Him", icon: User, link: "/products?category=Recipient&sub=For Him" },
//     { title: "Gifts for Her", icon: User, link: "/products?category=Recipient&sub=for her" },
//     { title: "Gifts for Kids", icon: Baby, link: "/products?category=Recipient&sub=kids" },
//     { title: "Gifts for Parents", icon: Users, link: "/products?category=Recipient&sub=parents" },
//     { title: "Gifts for Couples", icon: Heart, link: "/products?category=Recipient&sub=couples" },
//     { title: "Corporate Gifts", icon: Briefcase, link: "/products?category=Recipient&sub=corporate" }
//   ];

//   const festivalsCategories = [
//     { title: "Christmas", icon: TreePine, link: "/products?category=Festival&sub=christmas" },
//     { title: "Diwali", icon: Zap, link: "/products?category=Festival&sub=diwali" },
//     { title: "New Year", icon: PartyPopper, link: "/products?category=Festival&sub=new-year" },
//     { title: "Valentine's Day", icon: Heart, link: "/products?category=Festival&sub=valentines" },
//     { title: "Mother's Day", icon: Heart, link: "/products?category=Festival&sub=mothers-day" },
//     { title: "Father's Day", icon: User, link: "/products?category=Festival&sub=fathers-day" }
//   ];

//   const giftTypeCategories = [
//     { title: "Chocolate Hamper", icon: Cookie, link: "/products?type=chocolate" },
//     { title: "Snack Hamper", icon: Cookie, link: "/products?type=snacks" },
//     { title: "Dry Fruit Hamper", icon: Grape, link: "/products?type=dry-fruits" },
//     { title: "Coffee & Tea", icon: Coffee, link: "/products?type=coffee-tea" },
//     { title: "Self Care", icon: Sparkle, link: "/products?type=self-care" },
//     { title: "Luxury", icon: Crown, link: "/products?type=luxury" },
//     { title: "Personalized", icon: Type, link: "/products?type=personalized" },
//     { title: "Wellness", icon: Leaf, link: "/products?type=wellness" }
//   ];

//   const priceRangeCategories = [
//     { title: "Under ₹500", icon: IndianRupee, link: "/products?price=0-500" },
//     { title: "₹500 - ₹1,000", icon: IndianRupee, link: "/products?price=500-1000" },
//     { title: "₹1,000 - ₹2,000", icon: IndianRupee, link: "/products?price=1000-2000" },
//     { title: "₹2,000 - ₹5,000", icon: Crown, link: "/products?price=2000-5000" },
//     { title: "Above ₹5,000", icon: Crown, link: "/products?price=5000-plus" }
//   ];

const occasionsCategories = categoryConfig.Occasion.items.map((item) => ({
  title: item.title,
  icon: item.icon,
  link: `/products?category=Occasion&sub=${item.id}`,
}));

const recipientsCategories = categoryConfig.Recipient.items.map((item)=>({
  title: item.title,
  icon:item.icon,
  link: `/products?category=Recipient&sub=${item.id}`,
}));

const festivalsCategories = categoryConfig.Festival.items.map((item) => ({
  title: item.title,
  icon: item.icon,
  link: `/products?category=Festival&sub=${item.id}`,
}));

const giftTypeCategories = categoryConfig.GiftType.items.map((item) => ({
  title: item.title,
  icon: item.icon,
  link: `/products?type=${item.id}`,
}));

const priceRangeCategories = priceConfig.map((item) => ({
  title: item.title,
  icon: item.icon,
  link: `/products?price=${item.value}`,
}));

const cartItems = useSelector((state) => state.cart?.items || []);
// const cartCount = cartItems.reduce((total, item) => {
//   if (item.type === "hamper") {
//     return total + (item.items?.length || 0); // count items inside hamper
//   }
//   return total + 1;
// }, 0);
const cartCount = cartItems.length;


  return (
<nav className={`sticky top-0 z-50 bg-white overflow-visible transition-all ${isScrolled ? 'shadow-md' : 'border-b'}`}>
      
      
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
           
            <Link to="/" className="flex items-center flex-shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ backgroundColor: '#8B3A62' }}>
                  <span className="text-white text-xl">🎁</span>
                </div>
                <span className="text-2xl tracking-tight hidden sm:block" style={{ fontFamily: 'var(--font-heading)', color: '#8B3A62' }}>
                  GiftHaven
                </span>
              </div>
            </Link>

          
            <div className="hidden lg:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for gifts, occasions, recipients..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#8B3A62] focus:border-transparent bg-[#FFF8F6] transition-all"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>

            
            <div className="flex items-center space-x-2 sm:space-x-4">

             
              <button className="lg:hidden p-2 text-gray-700 hover:text-[#8B3A62] transition-colors" onClick={() => setSearchOpen(!searchOpen)}>
                <Search className="w-6 h-6" />
              </button>

              
              <button className="relative p-2 text-gray-700 hover:text-[#8B3A62] transition-colors">
                <Heart className="w-6 h-6" />
                {wishlistCount > 0 &&(
                  <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {wishlistCount}
                  </span>
                )}
                
              </button>

              
              <button onClick={() => 
              { navigate("/cart");}}
                className="relative p-2 text-gray-700 hover:text-[#8B3A62] transition-colors">
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount} 
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.3, 1] }} // bounce effect
                    transition={{
                      duration: 0.35,
                      ease: "easeOut",
                    }}
                    className="absolute -top-1 -right-1 bg-[#D4AF37] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-md"
                  >
                    {cartCount}
                  </motion.span>
                )}
                
              </button>

              
              <button className="hidden md:flex items-center space-x-2 px-6 py-2.5 rounded-full text-white transition-all hover:shadow-lg hover:scale-105" style={{ backgroundColor: '#8B3A62' }}>
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">Login</span>
              </button>

              
              <button className="lg:hidden p-2 text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      
      <AnimatePresence>
        {searchOpen && (
          <motion.div
          onClick={(e) => e.stopPropagation()} 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-b border-gray-100 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for gifts..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#8B3A62] focus:border-transparent bg-[#FFF8F6]"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-10 h-14">
            <Link to="/" className="text-sm font-medium text-gray-700 hover:text-[#8B3A62] transition-colors">Home</Link>

            
            {[
              { name: 'Occasions', items: occasionsCategories },
              { name: 'Recipients', items: recipientsCategories },
              { name: 'Festivals', items: festivalsCategories },
              { name: 'Gift Types', items: giftTypeCategories },
              { name: 'Price Range', items: priceRangeCategories }
            ].map((menu) => (
              <div key={menu.name} className="relative" onMouseEnter={() => !isMobile && setActiveDropdown(menu.name)} onMouseLeave={() => !isMobile && setActiveDropdown(null)}>
                <button 
                onClick={(e) => {
                    e.stopPropagation(); 
                    if (isMobile) {
                      setActiveDropdown(activeDropdown === menu.name ? null : menu.name);
                    }
                  }}
                  className="flex items-center space-x-1.5 text-sm font-medium text-gray-700 hover:text-[#8B3A62] transition-colors py-4">
                  <span>{menu.name}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === menu.name ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {activeDropdown === menu.name && (
                    <motion.div
                      onClick={(e) => e.stopPropagation()}  
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                     className={`absolute top-full z-[1000] w-[95vw] sm:w-[520px] max-w-[95vw] sm:max-w-[520px] bg-white rounded-xl shadow-2xl border border-gray-100 p-6
                          

                          ${ menu.name === "Gift Types" ? "right-0 sm:right-0" : menu.name === "Price Range" ? "right-0 sm:right-0" : "left-1/2 -translate-x-1/2" }
                                              `}
                        >
                      <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Shop by {menu.name}</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {menu.items.map((category) => (
                          <Link key={category.title} to={category.link} className="flex items-center space-x-4 p-4 rounded-lg hover:bg-[#FFF8F6] transition-all group/item">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#F7E3DC] group-hover/item:bg-[#8B3A62] transition-all shadow-sm">
                              <category.icon className="w-6 h-6 text-[#8B3A62] group-hover/item:text-white transition-colors" />
                            </div>
                            <span className="text-sm font-medium text-gray-700 group-hover/item:text-[#8B3A62] transition-colors">{category.title}</span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* <Link to="/products?category=corporate" className="text-sm font-medium text-gray-700 hover:text-[#8B3A62] transition-colors">Corporate Gifts</Link> */}

            <Link to="/custom-hamper" className="flex items-center space-x-1.5 text-sm font-medium text-white px-5 py-2 rounded-full transition-all hover:shadow-lg hover:scale-105" style={{ backgroundColor: '#D4AF37' }}>
              <Gift className="w-4 h-4" />
              <span>Build Hamper</span>
            </Link>
          </div>
        </div>
      </div>

     
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden border-t border-gray-100"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
              {[
    { name: 'Occasions', items: occasionsCategories },
    { name: 'Recipients', items: recipientsCategories },
    { name: 'Festivals', items: festivalsCategories },
    { name: 'Gift Types', items: giftTypeCategories },
    { name: 'Price Range', items: priceRangeCategories }
  ].map((menu) => (
    
    <div key={menu.name} className="border-b border-gray-100">
      
      {/* HEADER */}
      <button
        onClick={() =>
          setMobileActiveDropdown(
            mobileActiveDropdown === menu.name ? null : menu.name
          )
        }
        className="w-full flex items-center justify-between py-3 px-2 text-gray-700 font-medium"
      >
        <span>{menu.name}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            mobileActiveDropdown === menu.name ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* DROPDOWN */}
      <AnimatePresence>
        {mobileActiveDropdown === menu.name && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-2 pb-3 px-2">

              {menu.items.map((item) => (
                <Link
                  key={item.title}
                  to={item.link}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#FFF8F6]"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#F7E3DC]">
                    <item.icon className="w-4 h-4 text-[#8B3A62]" />
                  </div>
                  <span className="text-sm text-gray-700">
                    {item.title}
                  </span>
                </Link>
              ))}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  ))}
             
              <button className="w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-full text-white transition-all mt-4" style={{ backgroundColor: '#8B3A62' }}>
                <User className="w-4 h-4" />
                <span>Login / Register</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}