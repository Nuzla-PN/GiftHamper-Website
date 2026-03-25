import { useState } from "react";
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
} from "lucide-react";
import ProductCard from "../components/ProductCard";

export default function ProductDetails() {
  const { id } = useParams();

  const products = useSelector((state) => state.products.items);

  const product = products.find((p) => String(p.id) === String(id));

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [isWishlisted, setIsWishlisted] = useState(false);

  // fallback (avoid crash)
  if (!product) {
    return (
      <div className="text-center py-20 text-gray-500">
        Product not found
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:py-10">
      
      {/* 🔹 Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6 flex flex-wrap gap-1">
        <Link to="/" className="hover:text-[#8B3A62]">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-[#8B3A62]">Products</Link>
        <span>/</span>
        <span className="text-[#8B3A62]">{product.title}</span>
      </div>

      {/* 🔹 MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        
        {/* 🖼 IMAGE SECTION */}
        <div>
          <div className="relative rounded-xl overflow-hidden bg-gray-100">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
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
        </div>

        {/* 🛒 DETAILS */}
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl text-[#8B3A62] font-semibold mb-3">
            {product.title}
          </h1>

          {/* ⭐ Rating */}
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

          {/* 💰 Price */}
          <div className="mb-4">
            <span className="text-2xl sm:text-3xl text-[#8B3A62] font-bold">
              ₹{product.price}
            </span>
          </div>

          {/* 🧾 Seller */}
          <div className="bg-[#F7E3DC] p-4 rounded-lg mb-6 flex items-center gap-3">
            <Package className="text-[#8B3A62]" />
            <div>
              <p className="text-sm text-gray-600">Sold by</p>
              <p className="font-semibold text-[#8B3A62]">
                {product.sellerName}
              </p>
            </div>
          </div>

          {/* 🔢 Quantity */}
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

          {/* 🛒 Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button className="flex-1 bg-[#8B3A62] text-white py-3 rounded-full flex items-center justify-center gap-2">
              <ShoppingCart />
              Add to Cart
            </button>

            <button className="flex-1 border border-[#8B3A62] text-[#8B3A62] py-3 rounded-full">
              Buy Now
            </button>
          </div>

          {/* 🚚 Features */}
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

    {/* 🔸 REVIEWS */}
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
    )}

    {/* 🔸 SELLER */}
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

      {/* 🔹 RELATED PRODUCTS */}
      <div className="mt-16">
        <h2 className="text-2xl sm:text-3xl text-[#8B3A62] mb-6">
          Related Products
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      </div>
    </div>
  );
}