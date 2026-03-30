import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Star, Package, MessageCircle, Clock, Heart, Mail, Phone, MapPin } from "lucide-react";
import ProductCard from "../components/ProductCard";

export default function SellerPage() {
  const { sellerName } = useParams();
  const decodedSeller = decodeURIComponent(sellerName);

  const products = useSelector((state) => state.products.items);

  // Filter seller products
  const sellerProducts = products.filter(
    (p) => p.sellerName === decodedSeller
  );

  const seller = sellerProducts[0];

//   const [isFollowing, setIsFollowing] = useState(false);

  if (!seller) {
    return <div className="text-center py-20">Seller not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
{/* 🔹 SELLER HERO BANNER
<div className="rounded-2xl overflow-hidden mb-8 shadow-sm border">

 
  <div className="bg-gradient-to-r from-[#8B3A62] to-[#a64d79] text-white px-5 sm:px-8 py-10 sm:py-14">
    
    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">

      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white flex items-center justify-center shadow-lg">
        <Package className="w-10 h-10 text-[#8B3A62]" />
      </div>

      
      <div className="flex-1 text-center md:text-left">

     
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 justify-center md:justify-start">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
            {decodedSeller}
          </h1>

          <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-medium">
            Verified Seller
          </span>
        </div>

    
        <div className="flex flex-wrap justify-center md:justify-start gap-4 sm:gap-6 mt-4 text-sm sm:text-base">

          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-[#FFD700] fill-[#FFD700]" />
            <span className="font-medium">
              {seller?.sellerRating || 4.5} Rating
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            <span>{sellerProducts.length} Products</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span>2 hrs Response</span>
          </div>
        </div>

      
        <p className="text-white/90 text-sm sm:text-base mt-4 max-w-xl mx-auto md:mx-0">
          Premium curated gift hampers crafted with love. Perfect for every occasion and celebration.
        </p>
      </div>

  
      <div className="flex gap-3">

     
        <button className="bg-white text-[#8B3A62] px-4 sm:px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-100 transition flex items-center gap-2">
          <MessageCircle className="w-4 h-4" />
          Chat
        </button>

        {/* Follow Button (optional future) */}
        
        {/* <button className="border border-white px-4 sm:px-6 py-2.5 rounded-full text-sm font-medium hover:bg-white hover:text-[#8B3A62] transition">
          Follow
        </button>
       
      </div>

    </div>
  </div>
</div> */} 
      {/* 🔹 SELLER HEADER */}
      <div className="bg-white border rounded-2xl p-5 sm:p-6 shadow-sm mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">

          {/* Seller Icon */}
          <div className="w-16 h-16 rounded-full bg-[#F7E3DC] flex items-center justify-center">
            <Package className="w-8 h-8 text-[#8B3A62]" />
          </div>

          {/* Seller Info */}
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                {sellerName}
              </h1>

              {/* Trusted Badge */}
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                Trusted
              </span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2">
              <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
              <span className="text-sm text-gray-600">
                {seller.sellerRating || 4.5} • {seller.sellerReviews || 120} reviews
              </span>
            </div>

            {/* Response Time */}
            <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              Responds within 2 hours
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-3">

            {/* Follow Button
            <button
              onClick={() => setIsFollowing(!isFollowing)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                isFollowing
                  ? "bg-gray-200 text-gray-700"
                  : "bg-[#8B3A62] text-white hover:bg-[#732d52]"
              }`}
            >
              <Heart className="w-4 h-4 inline mr-1" />
              {isFollowing ? "Following" : "Follow"}
            </button> */}

            {/* Chat Button */}
            <button className="px-4 py-2 rounded-lg text-sm font-medium border border-[#8B3A62] text-[#8B3A62] hover:bg-[#8B3A62] hover:text-white transition">
              <MessageCircle className="w-4 h-4 inline mr-1" />
              Chat
            </button>
          </div>
        </div>
      </div>

      {/*  SELLER STATS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 mt-6">
        <div className="bg-white border rounded-xl p-4 text-center">
          <p className="text-lg font-semibold text-gray-900">
            {sellerProducts.length}
          </p>
          <p className="text-sm text-gray-500">Products</p>
        </div>

        <div className="bg-white border rounded-xl p-4 text-center">
          <p className="text-lg font-semibold text-gray-900">{seller.sellerRating}</p>
          <p className="text-sm text-gray-500">Rating</p>
        </div>

        <div className="bg-white border rounded-xl p-4 text-center">
          <p className="text-lg font-semibold text-gray-900">{seller.sellerReviews}+</p>
          <p className="text-sm text-gray-500">Reviews</p>
        </div>

        <div className="bg-white border rounded-xl p-4 text-center">
          <p className="text-lg font-semibold text-gray-900">2 hrs</p>
          <p className="text-sm text-gray-500">Response Time</p>
        </div>
      </div>

      {/*  PRODUCTS */}
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
          Products by {sellerName}
        </h2>

        {sellerProducts.length === 0 ? (
          <p className="text-gray-500">No products found</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {sellerProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        )}
      </div>

{/*  STORE INFO SIDEBAR */}
<div className="lg:col-span-1 mt-6">
  <div className="bg-white border rounded-2xl p-5 sm:p-6 shadow-sm lg:sticky lg:top-24">

    {/* Title */}
    <h3 className="text-lg font-semibold text-[#8B3A62] mb-5">
      Store Information
    </h3>

    {/* Info List */}
    <div className="space-y-5">

      {/* Location */}
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#F7E3DC]">
          <MapPin className="w-4 h-4 text-[#8B3A62]" />
        </div>
        <div>
          <p className="text-xs text-gray-500">Location</p>
          <p className="text-sm font-medium text-gray-800">
            xxxxxx,xxxxxxxxxxxx
          </p>
        </div>
      </div>

      {/* Phone */}
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#F7E3DC]">
          <Phone className="w-4 h-4 text-[#8B3A62]" />
        </div>
        <div>
          <p className="text-xs text-gray-500">Phone</p>
          <p className="text-sm font-medium text-gray-800">
            +91 8888888888
          </p>
        </div>
      </div>

      {/* Email */}
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#F7E3DC]">
          <Mail className="w-4 h-4 text-[#8B3A62]" />
        </div>
        <div>
          <p className="text-xs text-gray-500">Email</p>
          <p className="text-sm font-medium text-gray-800 break-all">
            contact@
            {decodedSeller.toLowerCase().replace(/\s+/g, "")}
            .com
          </p>
        </div>
      </div>
    </div>

    {/* Divider */}
    <div className="border-t my-6" />

    {/* Quick Stats
    <div>
      <h4 className="text-sm font-semibold text-[#8B3A62] mb-4">
        Quick Stats
      </h4>

      <div className="space-y-3 text-sm">

        <div className="flex justify-between">
          <span className="text-gray-500">Response Time</span>
          <span className="font-medium text-gray-800">~2 hrs</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Delivery Time</span>
          <span className="font-medium text-gray-800">2–4 days</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Positive Reviews</span>
          <span className="font-medium text-green-600">98%</span>
        </div>

      </div>
    </div> */}

    {/* Divider
    <div className="border-t my-6" /> */}

    {/* Certifications */}
    <div>
      <h4 className="text-sm font-semibold text-[#8B3A62] mb-3">
        Certifications
      </h4>

      <div className="flex flex-wrap gap-2">
        <span className="text-xs bg-[#F7E3DC] text-[#8B3A62] px-3 py-1 rounded-full">
          Verified Seller
        </span>
        <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
          Quality Assured
        </span>
        <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
          Trusted Store
        </span>
      </div>
    </div>

  </div>
</div>


      {/*  ABOUT SELLER */}
<div className="mt-12 sm:mt-16">
  <div className="bg-white border rounded-2xl p-6 sm:p-8 shadow-sm">

    {/* Heading */}
    <h3 className="text-xl sm:text-2xl font-semibold text-[#a7788f] mb-4">
      About {sellerName}
    </h3>

    {/* Content */}
    <div className="space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed">

      <p>
        <span className="font-medium  text-gray-600">{sellerName}</span> is a trusted seller on our platform, known for delivering thoughtfully curated gift hampers for every occasion.known for delivering thoughtfully curated gift hampers for every occasion 
      </p>

      <p>
        Each product is carefully designed using premium quality items to ensure a memorable gifting experience. From birthdays to festivals, every hamper is crafted with attention to detail.
      </p>

      <p>
        Whether you're looking for something elegant, personalized, or budget-friendly, {sellerName} offers a wide variety of options to suit every need.
      </p>

    </div>

    {/* Divider */}
    <div className="border-t mt-6 pt-6 flex flex-wrap gap-4 text-sm text-gray-500">

      <div>
        <span className="font-medium text-gray-800">Experience:</span> xxxxx
      </div>

      <div>
        <span className="font-medium text-gray-800">Speciality:</span> xxxxxx
      </div>

      <div>
        <span className="font-medium text-gray-800">Orders Delivered:</span> xxxx
      </div>

    </div>

  </div>
</div>

{/* CUSTOMER REVIEWS SUMMARY */}
<div className="mt-12 sm:mt-16">
  <div className="bg-white border rounded-2xl p-6 sm:p-8 shadow-sm">

    {/* Heading */}
    <h3 className="text-xl sm:text-2xl font-semibold text-[#8B3A62] mb-6">
      Customer Reviews
    </h3>

    {/* Stats Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">

      {/*  Rating */}
      <div className="text-center p-5 rounded-xl bg-[#F9F5F7] border">
        <div className="text-3xl font-bold text-gray-900 mb-2">
          {seller.sellerRating || 4.5}
        </div>

        <div className="flex items-center justify-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(seller.sellerRating || 4.5)
                  ? "fill-[#D4AF37] text-[#D4AF37]"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>

        <p className="text-xs sm:text-sm text-gray-500">
          Overall Rating
        </p>
      </div>

      {/*  Total Reviews */}
      <div className="text-center p-5 rounded-xl bg-[#F9F5F7] border">
        <div className="text-3xl font-bold text-gray-900 mb-2">
          {sellerProducts.reduce((sum, p) => sum + (p.reviews || 0), 0)}
        </div>

        <p className="text-xs sm:text-sm text-gray-500">
          Total Reviews
        </p>
      </div>

      {/* Positive */}
      <div className="text-center p-5 rounded-xl bg-[#F9F5F7] border">
        <div className="text-3xl font-bold text-gray-900 mb-2">
          98%
        </div>

        <p className="text-xs sm:text-sm text-gray-500">
          Positive Feedback
        </p>
      </div>

    </div>

    {/* Footer Note */}
    <p className="text-xs sm:text-sm text-gray-500 text-center">
      Reviews are collected from verified purchases across all products
    </p>

  </div>
</div>
    </div>
  );
}

//----------------code 2--------------------------------------//

// import {
//   Star,
//   MapPin,
//   Phone,
//   Mail,
//   Award,
//   Package,
// } from "lucide-react";
// import ProductCard from "../components/ProductCard";
// import { useParams } from "react-router-dom";

// export default function SellerShop() {
//   const { sellerName } = useParams();
//   const products = useSelector((state) => state.products.items);

//   const decodedSeller = decodeURIComponent(sellerName);

//   const sellerProducts = products.filter(
//     (p) => p.sellerName === decodedSeller
//   );

//   if (!sellerProducts.length) {
//     return <div>Seller not found</div>;
//   }

//   const seller = sellerProducts[0];

//   return (
//     <div className="bg-[#FAFAFA] min-h-screen">

//       {/* 🔹 HEADER */}
//       <div className="bg-gradient-to-r from-[#8B3A62] to-[#a44d76] text-white py-12 sm:py-16">
//         <div className="max-w-7xl mx-auto px-4">

//           <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">

//             {/* Logo */}
//             <div className="w-24 h-24 sm:w-28 sm:h-28 bg-white rounded-full flex items-center justify-center text-4xl sm:text-5xl shadow-xl">
//               {seller.logo}
//             </div>

//             {/* Info */}
//             <div className="flex-1 text-center md:text-left">

//               <h1 className="text-2xl sm:text-4xl font-semibold mb-3">
//                 {seller.name}
//               </h1>

//               <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm sm:text-base mb-3">

//                 <div className="flex items-center gap-1">
//                   <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
//                   {seller.rating}
//                 </div>

//                 <div className="flex items-center gap-1">
//                   <Package className="w-4 h-4" />
//                   {sellerProducts.length} Products
//                 </div>

//                 <div className="flex items-center gap-1">
//                   <Award className="w-4 h-4 text-[#D4AF37]" />
//                   Trusted Seller
//                 </div>
//               </div>

//               <p className="text-white/90 text-sm sm:text-base max-w-xl">
//                 Premium curated gift hampers crafted with care and love.
//               </p>
//             </div>

//             {/* Button */}
//             <button className="bg-white text-[#8B3A62] px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition">
//               Contact Seller
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* 🔹 MAIN */}
//       <div className="max-w-7xl mx-auto px-4 py-10">

//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

//           {/* 🔸 SIDEBAR */}
//           <div className="lg:col-span-1">

//             <div className="bg-white rounded-xl shadow-sm p-5 space-y-6 lg:sticky lg:top-24">

//               <h3 className="font-semibold text-lg text-[#8B3A62]">
//                 Store Info
//               </h3>

//               {/* Info */}
//               <div className="space-y-4 text-sm">

//                 <div className="flex gap-3">
//                   <MapPin className="text-[#8B3A62] w-5" />
//                   <span className="text-gray-600">
//                     Mumbai, India
//                   </span>
//                 </div>

//                 <div className="flex gap-3">
//                   <Phone className="text-[#8B3A62] w-5" />
//                   <span className="text-gray-600">
//                     +91 98765 43210
//                   </span>
//                 </div>

//                 <div className="flex gap-3">
//                   <Mail className="text-[#8B3A62] w-5" />
//                   <span className="text-gray-600 break-all">
//                     contact@seller.com
//                   </span>
//                 </div>
//               </div>

//               {/* Stats */}
//               <div className="border-t pt-4 space-y-2 text-sm">
//                 <p className="flex justify-between">
//                   <span className="text-gray-500">Response</span>
//                   <span className="font-medium">&lt; 2 hrs</span>
//                 </p>

//                 <p className="flex justify-between">
//                   <span className="text-gray-500">Shipping</span>
//                   <span className="font-medium">1–2 days</span>
//                 </p>

//                 <p className="flex justify-between">
//                   <span className="text-gray-500">Positive</span>
//                   <span className="font-medium">98%</span>
//                 </p>
//               </div>

//               {/* Tags */}
//               <div className="border-t pt-4 flex flex-wrap gap-2 text-xs">
//                 <span className="bg-[#F7E3DC] text-[#8B3A62] px-2 py-1 rounded">
//                   Verified
//                 </span>
//                 <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
//                   FSSAI
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* 🔸 PRODUCTS */}
//           <div className="lg:col-span-3">

//             {/* Header */}
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-xl sm:text-2xl font-semibold">
//                 Products by {seller.name}
//               </h2>

//               <span className="text-sm text-gray-500">
//                 {sellerProducts.length} items
//               </span>
//             </div>

//             {/* Grid */}
//             {sellerProducts.length > 0 ? (
//               <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
//                 {sellerProducts.map((product) => (
//                   <ProductCard key={product.id} {...product} />
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-16 bg-white rounded-xl shadow-sm">
//                 <Package className="mx-auto mb-3 text-gray-400" />
//                 <p className="text-gray-500">No products yet</p>
//               </div>
//             )}

//             {/* About */}
//             <div className="bg-white rounded-xl shadow-sm p-6 mt-10">
//               <h3 className="text-xl font-semibold mb-3 text-[#8B3A62]">
//                 About {seller.name}
//               </h3>

//               <p className="text-gray-600 text-sm leading-relaxed">
//                 Premium seller offering curated hampers for every occasion.
//               </p>
//             </div>

//             {/* Reviews */}
//             <div className="bg-white rounded-xl shadow-sm p-6 mt-6">

//               <h3 className="text-xl font-semibold mb-5 text-[#8B3A62]">
//                 Customer Reviews
//               </h3>

//               <div className="grid grid-cols-3 gap-4 text-center">

//                 <div>
//                   <p className="text-2xl font-semibold">
//                     {seller.rating}
//                   </p>
//                   <p className="text-xs text-gray-500">Rating</p>
//                 </div>

//                 <div>
//                   <p className="text-2xl font-semibold">
//                     {sellerProducts.length * 10}
//                   </p>
//                   <p className="text-xs text-gray-500">Reviews</p>
//                 </div>

//                 <div>
//                   <p className="text-2xl font-semibold">98%</p>
//                   <p className="text-xs text-gray-500">Positive</p>
//                 </div>

//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }