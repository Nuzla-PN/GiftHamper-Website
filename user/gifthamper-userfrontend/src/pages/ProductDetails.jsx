import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Heart,
  ShoppingCart,
  Star,
  Minus,
  Plus,
  Package,
  Truck,
  Shield,
  MessageCircle,
  ChevronRight,
  Tag,
  MapPin,
} from "lucide-react";
import ProductCard from "../components/ProductCard";
import { couponsConfig } from "../data/dataConfig";


export default function ProductDetails() {
  const { id } = useParams();

  const products = useSelector((state) => state.products.items);

  const product = products.find((p) => String(p.id) === String(id));

  useEffect(() => {
  if (!product) return;

  let stored = JSON.parse(localStorage.getItem("recentlyViewed")) || [];

  // remove if already exists (avoid duplicates)
  stored = stored.filter((item) => item.id !== product.id);

  // add current product at beginning
  stored.unshift(product);

  // limit to 6 products
  if (stored.length > 6) stored.pop();

  localStorage.setItem("recentlyViewed", JSON.stringify(stored));
  setRecentlyViewed(stored);
}, [product]);

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  const handleTouchStart = (e) => {
  setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    const distance = touchStartX - touchEndX;

    // swipe threshold
    if (distance > 50) {
      setSelectedImage((prev) =>
        prev < product.image.length - 1 ? prev + 1 : prev
      );
    }

    if (distance < -50) {
      setSelectedImage((prev) =>
        prev > 0 ? prev - 1 : prev
      );
    }
  };
  
  //simple code not needed
    // const getDeliveryDate = () => {
    //   const date = new Date();
    //   date.setDate(date.getDate() + 3);
    // };

//efficent code needed
    // const getDeliveryDate = () => {
    //   const today = new Date();

    //   const minDays = 2;
    //   const maxDays = 4;

    //   const startDate = new Date(today);
    //   startDate.setDate(today.getDate() + minDays);

    //   const endDate = new Date(today);
    //   endDate.setDate(today.getDate() + maxDays);

    //   const format = (date) =>
    //     date.toLocaleDateString("en-IN", {
    //       day: "numeric",
    //       month: "short",
    //     });

    //   return `${format(startDate)} - ${format(endDate)}`;
    // };

    const availableCoupons = couponsConfig.filter(
  (coupon) => product.price >= coupon.minAmount
);

  // fallback (avoid crash)
  if (!product) {
    return (
      <div className="text-center py-20 text-gray-500">
        Product not found
      </div>
    );
  }

 let relatedProducts = products.filter(
  (p) =>
    String(p.id) !== String(product.id) &&
    p.mainCategory === product.mainCategory &&
    p.subCategory === product.subCategory
);

// If no exact match → fallback
if (relatedProducts.length === 0) {
  relatedProducts = products.filter(
    (p) =>
      String(p.id) !== String(product.id) &&
      p.mainCategory === product.mainCategory
  );
}

//  Still empty → show featured
if (relatedProducts.length === 0) {
  relatedProducts = products.filter(
    (p) =>
      String(p.id) !== String(product.id) &&
      p.isFeatured
  );
}

//if no main,sub and featured prdt show some random product
if (relatedProducts.length === 0) {
  relatedProducts = products.filter(
    (p) => String(p.id) !== String(product.id)
  );
}

relatedProducts = relatedProducts.slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:py-10">
      
      {/*  Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6 flex flex-wrap gap-1">
        <Link to="/" className="hover:text-[#8B3A62]">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-[#8B3A62]">Products</Link>
        <span>/</span>
        <span className="text-[#8B3A62]">{product.title}</span>
      </div>

      {/*  MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        
        {/*  IMAGE SECTION */}
        <div>
          <div className="relative rounded-xl overflow-hidden bg-gray-100"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <img
              src={product.image[selectedImage]}
              alt={product.title}
              initial={{ opacity: 0.3, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover transition duration-300"
            />

            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="absolute top-4 right-4 bg-white p-3 rounded-full shadow"
            >
              <Heart
                className={`w-5 h-5 ${
                  isWishlisted ? "fill-red-500 text-red-500" : ""
                }`}
              />
            </button>

            
          </div>

          

          <div className="flex gap-2 mt-4 overflow-x-auto">
            {product.image.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.title} ${index + 1}`}
                className={`w-16 h-16 sm:w-20 sm:h-20 object-cover rounded cursor-pointer border-2 ${
                  selectedImage === index
                    ? "border-[#8B3A62]"
                    : "border-gray-200"
                }`}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>

        {/*  DETAILS */}
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl text-gray-900g font-semibold mb-3">
            {product.title}
          </h1>

          {/*  Rating */}
          <div className="flex items-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < product.rating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-gray-500 text-sm">
              ({product.reviews})
            </span>
          </div>

          {/* 🔹 Seller Info */}
<div className="mb-6">
  <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition">

    {/* Icon */}
    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center bg-[#F7E3DC]">
      <Package className="w-6 h-6 text-[#8B3A62]" />
    </div>

    {/* Seller Details */}
    <div className="flex-1 min-w-0">
      <p className="text-xs sm:text-sm text-gray-500">Sold by</p>

      <div className="flex items-center gap-2">
        <p className="font-semibold text-gray-900 truncate">
          {product.sellerName}
        </p>

        {/*  Trusted Badge */}
        <span className="text-[10px] sm:text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
          Trusted
        </span>
      </div>

      <div className="flex items-center gap-1 mt-1">
        <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
        <span className="text-xs sm:text-sm text-gray-600">
          {product.sellerRating || 4.5} • {product.sellerReviews || 120} reviews
        </span>
      </div>
    </div>

    {/* Visit Shop Button (inside same row always) */}
    <Link
      to={`/seller/${encodeURIComponent(product.sellerName)}`}
      className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium border border-[#8B3A62] text-[#8B3A62] hover:bg-[#8B3A62] hover:text-white transition whitespace-nowrap"
    >
      Visit Shop
    </Link>
  </div>
</div>

          {/*  Price */}
          <div className="mb-5">
            <div className="flex items-end gap-3 flex-wrap">

              {/* Final Price */}
              <span className="text-3xl sm:text-4xl font-bold text-[#8B3A62]">
                ₹{product.price}
              </span>

              {/* Original Price (if exists) */}
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through">
                  ₹{product.originalPrice}
                </span>
              )}

              {/* Discount % */}
              {product.originalPrice && (
                <span className="text-sm font-semibold text-green-600">
                  {Math.round(
                    ((product.originalPrice - product.price) / product.originalPrice) * 100
                  )}
                  % OFF
                </span>
              )}
            </div>

            {/* Savings text */}
            {product.originalPrice && (
              <p className="text-sm text-green-700 mt-1 font-medium">
                You save ₹{product.originalPrice - product.price}
              </p>
            )}
          </div>

          {/*  Quantity */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex border rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2"
              >
                <Minus />
              </button>
              <span className="px-4 py-2">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2"
              >
                <Plus />
              </button>
            </div>

            <span className="text-lg font-semibold text-[#8B3A62]">
              ₹{product.price * quantity}
            </span>
          </div>

          {/*  Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button className="flex-1 bg-[#8B3A62] text-white py-3 rounded-full flex items-center justify-center gap-2">
              <ShoppingCart />
              Add to Cart
            </button>

            <button className="flex-1 border border-[#8B3A62] text-[#8B3A62] py-3 rounded-full">
              Buy Now
            </button>
          </div>

          {/*  DELIVERY INFO */}
          <div className="bg-[#F3F6FF] border border-blue-100 rounded-xl p-4 mb-5 flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <Package className="w-5 h-5 text-[#8B3A62] mt-1" />
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Delivery by 
                   {/* Delivery by {getDeliveryDate()} */}
                </p>
                <p className="text-xs text-gray-600">
                  Free delivery on orders above ₹999
                </p>
              </div>
            </div>

            <button className="text-xs border px-3 py-1.5 rounded-md flex items-center gap-1 hover:border-[#8B3A62]">
              <MapPin className="w-3 h-3" />
              Change
            </button>
          </div>

          {/*  COUPONS */}
          <div className="border rounded-xl p-4 mb-5 bg-white">
            <div className="flex items-center gap-2 mb-3">
              <Tag className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-gray-800">
                Available Offers ({availableCoupons.length})
              </h3>
            </div>

            <div className="space-y-3">
              {availableCoupons.map((coupon) => (
                <div
                  key={coupon.id}
                  className="flex items-start justify-between gap-3 p-3 rounded-lg border bg-gradient-to-r from-green-50 to-gray-50"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded">
                        {coupon.title}
                      </span>

                      <code className="text-xs bg-white px-2 py-0.5 border rounded">
                        {coupon.code}
                      </code>
                    </div>

                    <p className="text-xs text-gray-700">
                      {coupon.description}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      Inclusive of all taxes
                    </p>
                  </div>

                  <button className="text-xs border px-3 py-1 rounded hover:border-[#8B3A62]">
                    Apply
                  </button>
                </div>
              ))}
            </div>

            <button className="text-sm text-[#8B3A62] mt-2 hover:underline">
              View all offers
            </button>
          </div>

          {/*  VIEW SIMILAR */}
          {relatedProducts.length > 0 && (
            <button
              onClick={() => {
                const el = document.getElementById("similar-products");
                el?.scrollIntoView({ behavior: "smooth",block: "start", });
              }}
              className="w-full border py-3 rounded-lg flex items-center justify-center gap-2 mb-5 hover:border-[#8B3A62]"
            >
              <ChevronRight className="w-4 h-4" />
              View Similar Products
            </button>
          )}

           {/* FEATURES CARD
          {product.features?.length > 0 && (
            <div className="border rounded-xl p-4 bg-white mb-5">
              <h3 className="font-semibold mb-3 text-gray-800">
                Key Features
              </h3>

              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="w-2 h-2 bg-[#8B3A62] rounded-full mt-2"></span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )} */}

          {/*  Features */}
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex gap-2 items-center">
              <Truck className="text-[#8B3A62]" /> Free Delivery
            </div>
            <div className="flex gap-2 items-center">
              <Shield className="text-[#8B3A62]" /> Secure Payment
            </div>
            <div className="flex gap-2 items-center">
              <MessageCircle className="text-[#8B3A62]" /> Custom Message
            </div>
          </div>
        </div>
      </div>


      {/* 🔹 Tabs Section */}
<div className="mt-16">
  
  {/* TAB HEADERS */}
  <div className="border-b border-gray-200 overflow-x-auto">
    <div className="flex gap-6 sm:gap-10 min-w-max">
      {["description", "reviews", "seller"].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`pb-3 text-sm sm:text-base capitalize whitespace-nowrap transition-all ${
            activeTab === tab
              ? "border-b-2 font-semibold text-[#8B3A62]"
              : "text-gray-500 hover:text-[#8B3A62]"
          }`}
          style={
            activeTab === tab ? { borderColor: "#8B3A62" } : {}
          }
        >
          {tab}
        </button>
      ))}
    </div>
  </div>

  {/* TAB CONTENT */}
  <div className="mt-6">
    
    {/* 🔸 DESCRIPTION */}
    {activeTab === "description" && (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
          {product.description || "No description available."}
        </p>

        {product.features?.length > 0 && (
          <>
            <h3 className="text-xl sm:text-2xl text-[#8B3A62] font-semibold">
              What's Included
            </h3>

            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-[#D4AF37] text-lg">✓</span>
                  <span className="text-gray-700 text-sm sm:text-base">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </motion.div>
    )}

    {/* 🔸 REVIEWS
    {activeTab === "reviews" && (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {product.reviewsData?.length > 0 ? (
          <div className="space-y-4 sm:space-y-6">
            {product.reviewsData.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-lg shadow p-4 sm:p-6"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                  
                  <div>
                    <h4 className="font-semibold text-base sm:text-lg">
                      {review.name}
                    </h4>

                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "text-[#D4AF37] fill-[#D4AF37]"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <span className="text-xs sm:text-sm text-gray-500">
                    {review.date}
                  </span>
                </div>

                <p className="text-gray-700 text-sm sm:text-base">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </motion.div>
    )} */}

    {/*  REVIEWS */}
{activeTab === "reviews" && (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    className="mt-6"
  >
    <div className="bg-white rounded-xl shadow p-4 sm:p-6">
      
      <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-[#0e0409]">
        Customer Reviews
      </h3>

      
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        
        
        <div className="text-3xl sm:text-4xl font-bold text-[#170910]">
          {product.rating || 0}
        </div>

        
        <div>
          <div className="flex items-center gap-1 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>

          <p className="text-sm text-gray-600">
            Based on {product.reviews || 0} reviews
          </p>
        </div>
      </div>

      {/*  Reviews List */}
      {product.reviewsData?.length > 0 ? (
        <div className="space-y-5">
          {product.reviewsData.map((review) => (
            <div key={review.id} className="border-t pt-4">
              
              {/* Rating + Title */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <span className="font-semibold text-sm sm:text-base">
                  {review.title || "Great product!"}
                </span>
              </div>

              {/* Comment */}
              <p className="text-sm sm:text-base text-gray-700 mb-2">
                {review.comment}
              </p>

              {/* User + Date */}
              <p className="text-xs text-gray-500">
                - {review.name} | {review.date}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm">
          No reviews yet.
        </p>
      )}
    </div>
  </motion.div>
)}

    {/*  SELLER */}
    {activeTab === "seller" && (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow p-5 sm:p-8"
      >
        <div className="flex flex-col sm:flex-row gap-6">
          
          {/* Seller Icon */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center bg-[#F7E3DC]">
            <Package className="w-10 h-10 text-[#8B3A62]" />
          </div>

          {/* Seller Info */}
          <div className="flex-1">
            <h3 className="text-xl sm:text-2xl text-[#8B3A62] font-semibold mb-2">
              {product.sellerName}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]"
                />
              ))}
              <span className="text-gray-600 text-sm">
                ({product.sellerReviews || 0} reviews)
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-700 text-sm sm:text-base mb-4">
              Trusted seller providing high-quality curated gift hampers.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to={`/products?seller=${product.sellerName}`}
                className="px-5 py-2.5 rounded-lg text-white text-sm text-center"
                style={{ backgroundColor: "#8B3A62" }}
              >
                View All Products
              </Link>

              <button className="px-5 py-2.5 rounded-lg border text-sm"
                style={{
                  borderColor: "#8B3A62",
                  color: "#8B3A62",
                }}
              >
                Contact Seller
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    )}
  </div>
</div>

      {/*  RELATED PRODUCTS */}
      <div id="similar-products" className="mt-16 scroll-mt-40">
        <h2 className="text-2xl sm:text-3xl text-[#8B3A62] mb-6 font-semibold">
          Related Products
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      </div>

      {/*  Customers Also Bought */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          
          {/*  Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#8B3A62]">
                Customers Also Bought
              </h2>
              <p className="text-gray-500 text-sm sm:text-base">
                Products frequently bought together
              </p>
            </div>

            <Link
              to="/products"
              className="hidden sm:flex items-center gap-1 text-sm font-medium text-[#8B3A62] hover:underline"
            >
              View All
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/*  Desktop Grid */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <div
                key={item.id}
                className="group transition-transform duration-300 hover:-translate-y-1"
              >
                <ProductCard {...item} />
              </div>
            ))}
          </div>

          {/*  Mobile Horizontal Scroll */}
          <div className="md:hidden relative">
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
              {relatedProducts.map((item) => (
                <div
                  key={item.id}
                  className="min-w-[260px] snap-start flex-shrink-0"
                >
                  <div className="group transition-transform duration-300 hover:scale-[1.02]">
                    <ProductCard {...item} />
                  </div>
                </div>
              ))}
            </div>

            {/* Fade Effect
            <div className="pointer-events-none absolute top-0 right-0 h-full w-3 bg-gradient-to-l from-white to-transparent" /> */}
          </div>
        </section>
      )}

      {/*  RECENTLY VIEWED */}
        {recentlyViewed.length > 1 && (
          <div className="mt-20">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold text-[#8B3A62]">
                  Recently Viewed
                </h2>
                <p className="text-gray-500 text-sm">
                  Your browsing history
                </p>
              </div>

              {/* Clear Button */}
              <button
                onClick={() => {
                  localStorage.removeItem("recentlyViewed");
                  setRecentlyViewed([]);
                }}
                className="hidden md:block text-sm text-gray-500 hover:text-red-500 transition"
              >
                Clear History
              </button>
            </div>

            {/* Desktop Grid */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recentlyViewed
                .filter((p) => p.id !== product.id) // remove current product
                .map((item) => (
                  <ProductCard key={item.id} {...item} />
                ))}
            </div>

            {/* Mobile Scroll */}
            <div className="md:hidden relative">
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
              {recentlyViewed
                .filter((p) => p.id !== product.id)
                .map((item) => (
                  <div
                    key={item.id}
                    className="min-w-[250px] snap-start"
                  >
                    <ProductCard {...item} />
                  </div>
                ))}
                </div>
                {/* Fade Effect
            <div className="pointer-events-none absolute top-0 right-0 h-full w-3 bg-gradient-to-l from-white to-transparent" /> */}
            </div>
            
          </div>
          
        )}
    </div>
  );
}