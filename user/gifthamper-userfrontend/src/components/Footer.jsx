import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#FFF8F6] border-t border-gray-200 mt-16">
      
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* 🟣 BRAND */}
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#8B3A62] flex items-center justify-center text-white text-lg">
              🎁
            </div>
            <h2 className="text-xl font-semibold text-[#8B3A62]">
              GiftHaven
            </h2>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed">
            Curated gift hampers for every occasion. Make every moment special with thoughtful gifting.
          </p>

          {/* SOCIAL */}
          <div className="flex gap-4 mt-5">
            {[Facebook, Instagram, Twitter].map((Icon, i) => (
              <div
                key={i}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow hover:bg-[#8B3A62] hover:text-white cursor-pointer transition"
              >
                <Icon size={16} />
              </div>
            ))}
          </div>
        </div>

        {/* 🟣 QUICK LINKS */}
        <div>
          <h3 className="text-sm font-semibold text-gray-800 mb-4 uppercase">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><Link to="/" className="hover:text-[#8B3A62]">Home</Link></li>
            <li><Link to="/products" className="hover:text-[#8B3A62]">Shop</Link></li>
            <li><Link to="/wishlist" className="hover:text-[#8B3A62]">Wishlist</Link></li>
            <li><Link to="/cart" className="hover:text-[#8B3A62]">Cart</Link></li>
            <li><Link to="/custom-hamper" className="hover:text-[#8B3A62]">Build Hamper</Link></li>
          </ul>
        </div>

        {/* 🟣 CATEGORIES */}
        <div>
          <h3 className="text-sm font-semibold text-gray-800 mb-4 uppercase">
            Categories
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><Link to="/products?category=Occasion&sub=birthday" className="hover:text-[#8B3A62]">Birthday</Link></li>
            <li><Link to="/products?category=Occasion&sub=anniversary" className="hover:text-[#8B3A62]">Anniversary</Link></li>
            <li><Link to="/products?category=Festival&sub=diwali" className="hover:text-[#8B3A62]">Diwali</Link></li>
            <li><Link to="/products?type=luxury" className="hover:text-[#8B3A62]">Luxury Hampers</Link></li>
            <li><Link to="/products?type=handmade" className="hover:text-[#8B3A62]">Handmade Gifts</Link></li>
          </ul>
        </div>

        {/* 🟣 CONTACT + NEWSLETTER */}
        <div>
          <h3 className="text-sm font-semibold text-gray-800 mb-4 uppercase">
            Contact
          </h3>

          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>Kerala, India</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} />
              <span>support@gifthaven.com</span>
            </div>
          </div>

          {/* NEWSLETTER */}
          <div className="mt-5">
            <p className="text-xs text-gray-500 mb-2">
              Subscribe for updates
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-l-lg focus:outline-none"
              />
              <button className="px-4 bg-[#8B3A62] text-white text-sm rounded-r-lg hover:opacity-90">
                Join
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* 🟣 BOTTOM */}
      <div className="border-t border-gray-200 text-center py-4 text-xs text-gray-500">
        © {new Date().getFullYear()} GiftHaven. All rights reserved.
      </div>
    </footer>
  );
}