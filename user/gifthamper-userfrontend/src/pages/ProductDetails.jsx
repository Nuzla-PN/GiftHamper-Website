import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
  Gift,
  Check,
  Sparkles,
} from "lucide-react";
import ProductCard from "../components/ProductCard";
import { couponsConfig } from "../data/dataConfig";
import { addtoCart } from "../features/cart/cartSlice";


export default function ProductDetails() {
  const { id } = useParams();

  const products = useSelector((state) => state.products.items);

  const product = products.find((p) => String(p.id) === String(id));
  const [searchParams] = useSearchParams();

  useEffect(() => {
  const box = searchParams.get("giftBox");
  const boxPrice = searchParams.get("giftBoxPrice");

  if (box) {
    setGiftBox(box);
  }

  if (boxPrice) {
    setSelectedBox({
      id: box,
      price: Number(boxPrice),
    });
  }
}, [searchParams]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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

  const [selectedWrap, setSelectedWrap] = useState(null);
  const [selectedBox, setSelectedBox] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showCustomization, setShowCustomization] = useState(false);

  const [customText, setCustomText] = useState("");
  const [engravingText, setEngravingText] = useState("");
  const [customColor, setCustomColor] = useState("");
  const [hasCustomImage, setHasCustomImage] = useState(false);

  const hasAnyCustomizations =
  customText ||
  engravingText ||
  customColor ||
  hasCustomImage;

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

// Gift states
const [giftBox, setGiftBox] = useState(null);
const [wrapping, setWrapping] = useState(null);
const [giftCard, setGiftCard] = useState(null);
const [cardMessage, setCardMessage] = useState("");

const giftBoxPrice = selectedBox?.price || 0;
const wrappingPrice = selectedWrap?.price || 0;
const giftCardPrice = selectedCard ? 20 : 0;

const addonsTotal = giftBoxPrice + wrappingPrice + giftCardPrice;
const finalPrice = (product.price * quantity) + addonsTotal;

// const giftBoxOptions = [
//   { id: 'basic', name: 'Basic Gift Box', price: 4.99 },
//   { id: 'premium', name: 'Premium Gift Box', price: 9.99 },
//   { id: 'deluxe', name: 'Deluxe Gift Box', price: 14.99 },
//   { id: 'luxury', name: 'Luxury Gift Box', price: 19.99 },
// ];

// const wrappingStyles = [
//   { id: 'classic', name: 'Classic Gold', price: 2.99 },
//   { id: 'floral', name: 'Floral Garden', price: 3.99 },
//   { id: 'modern', name: 'Modern Geometric', price: 3.99 },
//   { id: 'festive', name: 'Festive Celebration', price: 4.99 },
//   { id: 'elegant', name: 'Elegant Silver', price: 4.99 },
//   { id: 'rustic', name: 'Rustic Kraft', price: 3.49 },
// ];

// const greetingCards = [
//   { id: 'birthday', name: 'Birthday Celebration', price: 2.49 },
//   { id: 'thankyou', name: 'Thank You', price: 2.49 },
//   { id: 'celebration', name: 'Celebration', price: 2.49 },
//   { id: 'love', name: 'With Love', price: 2.99 },
//   { id: 'getwell', name: 'Get Well Soon', price: 2.49 },
//   { id: 'custom', name: 'Custom Message', price: 3.99 },
// ];
const hasAnyGiftOptions =
  giftBox !== null ||
  wrapping !== null ||
  giftCard !== null ||
  cardMessage.trim() !== "";

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


  // //  TEMP DATA (later from DB)
  // const wrappingOptions = [
  //   { id: 1, name: "Birthday Wrap", price: 30, image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400", },
  //   { id: 2, name: "Luxury Wrap", price: 60, image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400", },
  // ];

  // const boxOptions = [
  //   { id: 1, name: "Standard", price: 0, image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400", },
  //   { id: 2, name: "Premium Box", price: 50, image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400", },
  // ];

  // const cardOptions = [
  //   { id: 1, name: "Birthday Card", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400", },
  //   { id: 2, name: "Love Card", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400", },
  // ];

  // const totalPrice =
  //   (product.price +
  //     (selectedWrap?.price || 0) +
  //     (selectedBox?.price || 0)) *
  //   quantity;
    
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
          {product.isFeatured && (
              <span className="inline-block bg-[#8B3A62] text-white text-xs px-2 py-1 rounded mb-2">
                Bestseller
              </span>
            )}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl text-gray-900 font-semibold mb-3">
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

          {/* Seller Info */}
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
                ₹{product.price * quantity + addonsTotal}
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

            {addonsTotal > 0 && (
              <p className="text-sm text-purple-600 mt-1">
                + ₹{addonsTotal} for gift options
              </p>
            )}
            <p className="text-xs text-gray-500 mt-1 italic">
              Add-ons are not included in discounts
            </p>
          </div>

          {/*  STOCK */}
          <div className="mb-4">
            {product.stock > 0 ? (
              <p className="text-sm font-medium text-green-600">
                In Stock ({product.stock} available)
              </p>
            ) : (
              <p className="text-sm font-medium text-red-500">
                Out of Stock
              </p>
            )}
          </div>

          {product.stock < 5 && product.stock > 0 && (
            <p className="text-xs text-red-500 mt-1">
              Hurry! Only {product.stock} left
            </p>
          )}

          {/*  Quantity */}
          <p className="text-sm font-medium text-gray-700 mb-2">
            Quantity
          </p>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex border rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 hover:bg-gray-100"
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

            {/* <span className="text-lg font-semibold text-[#8B3A62]">
              ₹{product.price * quantity}
            </span> */}
          </div>

        <div className="space-y-6 mt-6">

        {/* 🎁 GIFT OPTIONS */}
        {/* <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-2xl border bg-gradient-to-br from-rose-50  to-pink-50 p-4 sm:p-6 shadow-sm"
        > */}
        {/* ✨ Soft Glow */}
        {/* <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#8B3A62]/10 via-transparent to-[#D4AF37]/10 blur-xl pointer-events-none"></div> */}

        {/* HEADER */}
        {/* <div className="flex items-center gap-2 mb-5 relative z-10">
          <div className="p-2 rounded-full bg-[#8B3A62]/10">
            <Gift className="w-5 h-5 text-[#8B3A62]" />
          </div>
          <h3 className="font-semibold text-gray-800 text-base sm:text-lg">
            Make it Special
          </h3>
        </div> */}

        {/* OPTIONS */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative z-10"> */}
          

          {/* 🔹 CARD COMPONENT */}
          {/* {[
            {
              title: "Gift Box",
              value: giftBox,
              route: `/gift-box?productId=${id}`,
              color: "rose",
            },
            {
              title: "Wrapping",
              value: wrapping,
              route: `/wrapping?productId=${id}`,
              color: "purple",
            },
            {
              title: "Greeting Card",
              value: giftCard,
              route: `/greeting-card?productId=${id}`,
              color: "pink",
            },
          ].map((item, index) => (
            <motion.button
              key={index}
              onClick={() => navigate(item.route)}

              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}

              className="group relative p-[1px] rounded-xl overflow-hidden"
            > */}
              {/* 🔥 Gradient Border on Hover */}
              {/* <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300
                              bg-gradient-to-r from-[#8B3A62] to-[#D4AF37]"></div> */}

              {/* INNER CARD */}
              {/* <div className="relative bg-white rounded-xl p-4 flex items-center justify-between shadow-sm"> */}
                
                {/* LEFT */}
                {/* <div className="text-left">
                  <p className="text-sm font-semibold text-gray-800">
                    {item.title}
                  </p> */}

                  {/* STATUS */}
                  {/* {item.value ? (
                    <span className="inline-block mt-1 text-[11px] px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">
                      Added ✓
                    </span>
                  ) : (
                    <p className="text-xs text-gray-500 mt-1">
                      Tap to add
                    </p>
                  )}
                </div> */}

                {/* RIGHT ICON */}
                {/* <div>
                  {item.value ? (
                    <Check className="text-green-600 w-5 h-5" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition" />
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </div> */}

        {/* SUMMARY */}
        {/* {hasAnyGiftOptions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-5 border-t pt-4 text-sm space-y-2 relative z-10"
          >
            <p className="font-medium text-gray-700">Added to your gift:</p>

            {giftBox && (
              <div className="flex justify-between text-gray-600">
                <span>🎁 Gift Box</span>
                <span className="text-green-600 font-medium">Added</span>
              </div>
            )}

            {wrapping && (
              <div className="flex justify-between text-gray-600">
                <span>🎀 Wrapping</span>
                <span className="text-green-600 font-medium">Added</span>
              </div>
            )}

            {giftCard && (
              <div className="flex justify-between text-gray-600">
                <span>💌 Greeting Card</span>
                <span className="text-green-600 font-medium">Added</span>
              </div>
            )}
          </motion.div>
        )}
      </motion.div> */}


        {/* ✨ CUSTOMIZE BUTTON */}
          {product?.customizable && (
          <motion.button
            onClick={() => navigate(`/product/${id}/customize`)}

            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}

            className="relative w-full p-[2px] rounded-xl overflow-hidden group"
          >
            {/*  Animated Gradient Border */}
            <motion.div
              className="absolute inset-0 rounded-xl"
              animate={{
                background: [
                  "linear-gradient(90deg, #8B3A62, #D4AF37, #8B3A62)",
                  "linear-gradient(180deg, #8B3A62, #D4AF37, #8B3A62)",
                  "linear-gradient(270deg, #8B3A62, #D4AF37, #8B3A62)",
                ],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            />

            {/*  GLITTER SHIMMER SWEEP */}
            <motion.div
              className="absolute top-0 left-[-120%] w-[200%] h-full bg-gradient-to-r 
                        from-transparent via-white/60 to-transparent"
              animate={{ left: ["-120%", "120%"] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />

            {/*  FLOATING GLITTER DOTS */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 bg-yellow-300 rounded-full"
                initial={{
                  x: Math.random() * 200,
                  y: Math.random() * 60,
                  opacity: 0,
                }}
                animate={{
                  y: [null, -10, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2 + Math.random(),
                  repeat: Infinity,
                  delay: i * 0.4,
                }}
              />
            ))}

            {/* INNER CONTENT */}
            <div className="relative bg-white rounded-xl flex items-center justify-between px-5 py-4 z-10">
              
              {/* LEFT */}
              <div className="flex items-center gap-3">
                
                {/* ICON WITH SPARKLE ROTATION */}
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="bg-gradient-to-r from-[#8B3A62] to-[#D4AF37] p-2 rounded-full shadow-md"
                >
                  <Sparkles className="w-5 h-5 text-white" />
                </motion.div>

                {/* TEXT */}
                <div className="text-left">
                  <p className="font-semibold text-gray-800 text-sm sm:text-base">
                    Customize Your Product {" "}
                  <span className="text-gray-400 text-xs font-normal">
                    (optional)
                  </span>
                  </p>
                  <p className="text-xs text-gray-500">
                    Add your personal touch ✨
                  </p>
                </div>
              </div>

              {/* RIGHT ICON */}
              <div>
                {hasAnyCustomizations ? (
                  <Check className="text-green-600 w-5 h-5" />
                ) : (
                  <ChevronRight className="text-gray-400 group-hover:translate-x-1 transition" />
                )}
              </div>
            </div>

            {/*  SOFT GLOW PULSE */}
            <motion.div
              className="absolute inset-0 rounded-xl"
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              style={{
                background:
                  "radial-gradient(circle, rgba(212,175,55,0.2), transparent 70%)",
              }}
            />
          </motion.button>
        )}
      </div>

        {/* {/* CUSTOMIZATION BUTTON  */}
        {/* <div className="space-y-4 mt-6"></div>
        <button
        onClick={() => setShowCustomization(true)}
        className="w-full border border-[#8B3A62] text-[#8B3A62] py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-[#8B3A62]/10 transition"
      >
        🎁 Customize Your Gift
      </button>
        <p className="text-xs text-gray-500 mt-2 text-center leading-relaxed">
          Personalize with gift wrap, premium box & greeting card
        </p>

        {showCustomization && (
          <div className="mt-6 border rounded-2xl p-5 bg-white shadow-sm space-y-6">

            <h2 className="text-xl font-semibold text-[#8B3A62]">
              Customize Your Gift
            </h2>  */}

          {/* 🎁 GIFT BOX */}
          {/* <div>
            <h3 className="font-medium mb-3">Choose Gift Box</h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {boxOptions.map((box) => (
                <div
                  key={box.id}
                  onClick={() => setSelectedBox(box)}
                  className={`border rounded-xl p-3 cursor-pointer transition hover:shadow ${
                    selectedBox?.id === box.id
                      ? "border-[#8B3A62] ring-1 ring-[#8B3A62]"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={box.image}
                    className="w-full h-24 object-cover rounded-lg mb-2"
                  />
                  <p className="text-sm font-medium">{box.name}</p>
                  <p className="text-xs text-gray-500">
                    {box.price === 0 ? "Free" : `+₹${box.price}`}
                  </p>
                </div>
              ))}
            </div>
          </div> */}

          {/* 🎀 WRAPPING */}
          {/* <div>
            <h3 className="font-medium mb-3">Choose Wrapping</h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {wrappingOptions.map((wrap) => (
                <div
                  key={wrap.id}
                  onClick={() => setSelectedWrap(wrap)}
                  className={`border rounded-xl p-3 cursor-pointer transition hover:shadow ${
                    selectedWrap?.id === wrap.id
                      ? "border-[#8B3A62] ring-1 ring-[#8B3A62]"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={wrap.image}
                    className="w-full h-24 object-cover rounded-lg mb-2"
                  />
                  <p className="text-sm font-medium">{wrap.name}</p>
                  <p className="text-xs text-gray-500">+₹{wrap.price}</p>
                </div>
              ))}
            </div>
          </div> */}

          {/* 💌 GREETING CARD */}
          {/* <div>
            <h3 className="font-medium mb-3">Add Greeting Card</h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {cardOptions.map((card) => (
                <div
                  key={card.id}
                  onClick={() => setSelectedCard(card)}
                  className={`border rounded-xl p-3 cursor-pointer transition hover:shadow ${
                    selectedCard?.id === card.id
                      ? "border-[#8B3A62] ring-1 ring-[#8B3A62]"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={card.image}
                    className="w-full h-24 object-cover rounded-lg mb-2"
                  />
                  <p className="text-sm font-medium">{card.name}</p>
                </div>
              ))}
            </div> */}

            {/* Message Input */}
            {/* {selectedCard && (
              <textarea
                placeholder="Write your message..."
                className="w-full mt-3 border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B3A62]"
                value={cardMessage}
                onChange={(e) => setCardMessage(e.target.value)}
              />
            )}
          </div> */}

          {/* ✅ SUMMARY */}
          {/* <div className="border-t pt-4 text-sm text-gray-600 space-y-1">
            <p className="font-medium text-gray-800">Your Selection:</p>

            {selectedBox && <p>📦 Box: {selectedBox.name}</p>}
            {selectedWrap && <p>🎀 Wrap: {selectedWrap.name}</p>}
            {selectedCard && <p>💌 Card: {selectedCard.name}</p>}

            <p className="text-[#8B3A62] font-semibold mt-2">
              Total: ₹{totalPrice}
            </p>
          </div> */}

          {/* CLOSE BUTTON */}
          {/* <button
            onClick={() => setShowCustomization(false)}
            className="w-full border border-[#8B3A62] text-[#8B3A62] py-2 rounded-full hover:bg-[#8B3A62] hover:text-white transition"
          >
            Done
          </button>
        </div>
      )} */}

        {/*  GIFT OPTIONS */}
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative rounded-2xl p-[1.5px] overflow-hidden mt-6"
          >

            {/*  GLITTER ANIMATED BORDER */}
            <div className="absolute inset-0 rounded-2xl bg-[length:200%_200%] 
              bg-gradient-to-r from-[#8B3A62] via-pink-400 via-yellow-300 to-[#8B3A62]
              animate-[gradientMove_4s_linear_infinite] blur-[1px] opacity-80">
            </div>

            {/* INNER CONTAINER */}
            <div className="relative rounded-2xl bg-gradient-to-br from-rose-50 to-pink-50 p-4 sm:p-6">

              {/*  HEADER */}
              <div className="flex items-center gap-2 mb-5">

                {/*  BOUNCING ICON */}
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="p-2 rounded-full bg-[#8B3A62]/10"
                >
                  <Gift className="w-5 h-5 text-[#8B3A62]" />
                </motion.div>

                <h3 className="font-semibold text-gray-800 text-base sm:text-lg">
                  Make it Special {" "}
                  <span className="text-gray-400 text-xs font-normal">
                    (optional)
                  </span>
                </h3>
              </div>

              {/* OPTIONS */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                {[
                  { title: "Gift Box", value: giftBox, route: `/gift-box?productId=${id}` },
                  { title: "Wrapping", value: wrapping, route: `/wrapping?productId=${id}` },
                  { title: "Greeting Card", value: giftCard, route: `/greeting-card?productId=${id}` },
                ].map((item, index) => (
                  <motion.button
                    key={index}
                    onClick={() => navigate(item.route)}
                    whileHover={{ y: -4, scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="group relative p-[1px] rounded-xl overflow-hidden"
                  >
                    {/* Hover Gradient Border */}
                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition 
                      bg-gradient-to-r from-[#8B3A62] to-[#D4AF37]" />

                    <div className="relative bg-white rounded-xl p-4 flex items-center justify-between shadow-sm">

                      <div className="text-left">
                        <p className="text-sm font-semibold text-gray-800">
                          {item.title}
                        </p>

                        {item.value ? (
                          <span className="inline-block mt-1 text-[11px] px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">
                            Added ✓
                          </span>
                        ) : (
                          <p className="text-xs text-gray-500 mt-1">
                            Tap to add
                          </p>
                        )}
                      </div>

                      {item.value ? (
                        <Check className="text-green-600 w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>

              {/*  LIVE PRICE SECTION */}
              {addonsTotal > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-5 border-t pt-4"
                >
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Add-ons Total
                  </p>

                  <div className="space-y-1 text-sm">

                    { selectedBox && (
                      <div className="flex justify-between text-gray-600">
                        <span>🎁 Gift Box</span>
                        <span className="text-[#8B3A62] font-medium">+₹{giftBoxPrice}</span>
                      </div>
                    )}

                    {selectedWrap && (
                      <div className="flex justify-between text-gray-600">
                        <span>🎀 Wrapping</span>
                        <span className="text-[#8B3A62] font-medium">+₹{wrappingPrice}</span>
                      </div>
                    )}

                    {selectedCard && (
                      <div className="flex justify-between text-gray-600">
                        <span>💌 Card</span>
                        <span className="text-[#8B3A62] font-medium">+₹{giftCardPrice}</span>
                      </div>
                    )}

                    <div className="flex justify-between font-semibold text-[#8B3A62] pt-2 border-t">
                      <span>Total</span>
                      <span>₹{finalPrice}</span>
                    </div>
                  </div>
                </motion.div>
              )}

            </div>
          </motion.div>


          {/*  Buttons */}
          <div className="mt-8 space-y-3 sm:space-y-0 sm:flex sm:gap-4">

            {/* Add to Cart */}
            <button onClick={() => {
                const cartItem = {
                  id: product.id,
                  title: product.title,
                  image: product.image[0],
                  price: product.price,
                  quantity,

                  // ADD-ONS
                  giftBox,
                  wrapping,
                  giftCard,
                  cardMessage,

                  // PRICES
                  giftBoxPrice: giftBox ? 50 : 0,
                  wrappingPrice: wrapping ? 30 : 0,
                  giftCardPrice: giftCard ? 20 : 0,

                  totalPrice:
                    (product.price +
                      (giftBox ? 50 : 0) +
                      (wrapping ? 30 : 0) +
                      (giftCard ? 20 : 0)) * quantity,
                };

                dispatch(addtoCart(cartItem));
              }}
              className="w-full sm:flex-1 bg-[#8B3A62] text-white py-3 rounded-full font-medium hover:opacity-90 transition flex items-center justify-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>

            {/* Buy Now */}
            <button className="w-full sm:flex-1 border border-[#8B3A62] text-[#8B3A62] py-3 rounded-full font-medium hover:bg-[#8B3A62] hover:text-white transition">
              Buy Now
            </button>

          </div>

          {/*  DELIVERY INFO */}
          <div className="bg-[#F3F6FF] border border-blue-100 rounded-xl p-4 mb-5 flex items-start justify-between gap-4 mt-6">
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
                // to={`/products?seller=${product.sellerName}`}
                to={`/seller/${encodeURIComponent(product.sellerName)}`}
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