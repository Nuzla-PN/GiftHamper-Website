// import { useState } from "react";
// import { motion } from "framer-motion";
// import { FilterSidebar } from "../components/FilterSidebar";
// import ProductCard from "../components/ProductCard";
// import { SlidersHorizontal, X, ChevronDown } from "lucide-react";

// export default function ProductListing() {
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [sortBy, setSortBy] = useState("popular");

//   const products = [/* your products */];

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

//       {/* HEADER */}
//       <div className="mb-6">
//         <h1 className="text-2xl sm:text-3xl lg:text-4xl text-[#8B3A62] mb-2">
//           All Gift Hampers
//         </h1>
//         <p className="text-gray-600 text-sm sm:text-base">
//           Explore our complete collection of premium gift hampers
//         </p>
//       </div>

//       {/* 👉 CATEGORY CARDS (PLACE YOUR COMPONENT HERE) */}
//       {/* <div className="mb-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
//         <CategoryCard />
//       </div> */}

//       <div className="flex gap-6">

//         {/* ✅ DESKTOP FILTER */}
//         <div className="hidden lg:block w-72 xl:w-80 flex-shrink-0">
//           <div className="sticky top-24">
//             <FilterSidebar />
//           </div>
//         </div>

//         {/* ✅ MAIN CONTENT */}
//         <div className="flex-1">

//           {/* 🔥 TOOLBAR */}
//           <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-6 bg-white rounded-lg shadow-sm p-4">

//             {/* LEFT */}
//             <div className="flex items-center justify-between sm:justify-start gap-3">

//               {/* MOBILE FILTER BUTTON */}
//               <button
//                 onClick={() => setIsFilterOpen(true)}
//                 className="lg:hidden flex items-center gap-2 px-3 py-2 border rounded-lg text-[#8B3A62] border-[#8B3A62]"
//               >
//                 <SlidersHorizontal className="w-4 h-4" />
//                 Filters
//               </button>

//               <p className="text-gray-600 text-sm">
//                 {products.length} products
//               </p>
//             </div>

//             {/* SORT */}
//             <div className="flex items-center gap-2">
//               <span className="text-sm text-gray-600">Sort:</span>

//               <div className="relative">
//                 <select
//                   value={sortBy}
//                   onChange={(e) => setSortBy(e.target.value)}
//                   className="appearance-none pl-3 pr-8 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#8B3A62]"
//                 >
//                   <option value="popular">Popular</option>
//                   <option value="newest">Newest</option>
//                   <option value="price-low">Low → High</option>
//                   <option value="price-high">High → Low</option>
//                   <option value="rating">Top Rated</option>
//                 </select>

//                 <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//               </div>
//             </div>
//           </div>

//           {/* 🔥 MOBILE FILTER DRAWER */}
//           {isFilterOpen && (
//             <>
//               {/* Overlay */}
//               <div
//                 className="fixed inset-0 bg-black/40 z-40"
//                 onClick={() => setIsFilterOpen(false)}
//               />

//               {/* Drawer */}
//               <div className="fixed left-0 top-0 h-full w-72 bg-white z-50 shadow-lg p-4 overflow-y-auto">

//                 <div className="flex justify-between items-center mb-4">
//                   <h3 className="font-semibold text-lg">Filters</h3>
//                   <button onClick={() => setIsFilterOpen(false)}>
//                     <X />
//                   </button>
//                 </div>

//                 <FilterSidebar />
//               </div>
//             </>
//           )}

//           {/* 🔥 PRODUCTS GRID */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
//             {products.map((product, index) => (
//               <motion.div
//                 key={product.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.05 }}
//               >
//                 <ProductCard {...product} />
//               </motion.div>
//             ))}
//           </div>

//           {/* 🔥 PAGINATION */}
//           <div className="mt-10 flex justify-center">
//             <div className="flex flex-wrap gap-2 justify-center">

//               <button className="px-3 py-2 border rounded-lg text-sm hover:bg-[#F7E3DC]">
//                 Prev
//               </button>

//               {[1, 2, 3, 4, 5].map((page) => (
//                 <button
//                   key={page}
//                   className={`w-9 h-9 rounded-lg text-sm ${
//                     page === 1
//                       ? "bg-[#8B3A62] text-white"
//                       : "border hover:bg-[#F7E3DC]"
//                   }`}
//                 >
//                   {page}
//                 </button>
//               ))}

//               <button className="px-3 py-2 border rounded-lg text-sm hover:bg-[#F7E3DC]">
//                 Next
//               </button>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }

//code 2
// import { useState } from "react";
// import { motion } from "framer-motion";
// import ProductCard from "../components/ProductCard";
// import { ChevronDown } from "lucide-react";
// import { useSelector } from "react-redux";
// import { useLocation } from "react-router-dom";

// const formatTitle = (text) => {
//   if (!text) return "";

//   return text
//     .split("-")
//     .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(" ");
// };
// export default function ProductListing() {
//   const location = useLocation();
//   const params = new URLSearchParams(location.search);

//   const selectedCategory = params.get("category"); // Occasion
//   const subCategory = params.get("sub"); // Birthday

//   const [sortBy, setSortBy] = useState("popular");

//   const products = useSelector((state) => state.products.items);

//   // ✅ FILTER LOGIC
//   const filteredProducts = products.filter((product) => {
//     if (selectedCategory && subCategory) {
//       return (
//         product.mainCategory?.toLowerCase() === selectedCategory.toLowerCase() &&
//         product.subCategory?.toLowerCase() === subCategory.toLowerCase()
//       );
//     }

//     if (selectedCategory) {
//       return (
//         product.mainCategory?.toLowerCase() === selectedCategory.toLowerCase()
//       );
//     }

//     return true;
//   });

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

//       {/* 🔥 HEADER */}
//       <div className="mb-6">
//         <h1 className="text-2xl sm:text-3xl lg:text-4xl text-[#8B3A62] mb-2">
//           {subCategory
//             ? `${formatTitle(subCategory)} Hampers`
//             : selectedCategory
//             ? `${formatTitle(selectedCategory)} Hampers`
//             : "All Gift Hampers"}
//         </h1>

//         <p className="text-gray-600 text-sm sm:text-base">
//            Explore our complete collection of premium gift hampers
//         </p>
//       </div>

//       {/* 🔥 TOOLBAR */}
//       <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-6 bg-white rounded-lg shadow-sm p-4">

//         {/* PRODUCT COUNT */}
//         <p className="text-gray-600 text-sm">
//           {filteredProducts.length} products
//         </p>

//         {/* SORT */}
//         <div className="flex items-center gap-2">
//           <span className="text-sm text-gray-600">Sort:</span>

//           <div className="relative">
//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               className="appearance-none pl-3 pr-8 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#8B3A62]"
//             >
//               <option value="popular">Popular</option>
//               <option value="newest">Newest</option>
//               <option value="price-low">Low → High</option>
//               <option value="price-high">High → Low</option>
//               <option value="rating">Top Rated</option>
//             </select>

//             <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//           </div>
//         </div>
//       </div>

//       {/* 🔥 PRODUCTS GRID */}
//       <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">

//         {filteredProducts.length === 0 ? (
//           <p className="col-span-full text-center text-gray-500 mt-10">
//             No products found
//           </p>
//         ) : (
//           filteredProducts.map((product, index) => (
//             <motion.div
//               key={product.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.05 }}
//             >
//               <ProductCard {...product} />
//             </motion.div>
//           ))
//         )}

//       </div>

//       {/* 🔥 PAGINATION (UI ONLY) */}
//       <div className="mt-10 flex justify-center">
//         <div className="flex flex-wrap gap-2">

//           <button className="px-3 py-2 border rounded-lg text-sm hover:bg-[#F7E3DC]">
//             Prev
//           </button>

//           {[1, 2, 3, 4, 5].map((page) => (
//             <button
//               key={page}
//               className={`w-9 h-9 rounded-lg text-sm ${
//                 page === 1
//                   ? "bg-[#8B3A62] text-white"
//                   : "border hover:bg-[#F7E3DC]"
//               }`}
//             >
//               {page}
//             </button>
//           ))}

//           <button className="px-3 py-2 border rounded-lg text-sm hover:bg-[#F7E3DC]">
//             Next
//           </button>

//         </div>
//       </div>

//     </div>
//   );
// }

//code 3

// import { useState } from "react";
// import { motion } from "framer-motion";
// import ProductCard from "../components/ProductCard";
// import { ChevronDown } from "lucide-react";
// import { useSelector } from "react-redux";
// import { useLocation, Link, useSearchParams } from "react-router-dom";
// import FilterSidebar from "../components/Filtersidebar";

// const formatTitle = (text) => {
//   if (!text) return "";
//   return text
//     .split("-")
//     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(" ");
// };

// export default function ProductListing() {
//   const location = useLocation();
//   const params = new URLSearchParams(location.search);

//   const selectedCategory = params.get("category");
//   const subCategory = params.get("sub");

//   const products = useSelector((state) => state.products.items);

//   const [searchParams] = useSearchParams();
//   const isFeatured = searchParams.get("featured") === "true";
//   let filteredProd = products;
//   if (isFeatured) {
//   filteredProd = filteredProd.filter((p) => p.isFeatured);
//   }
  
//   // STATES
//   const [showFilters, setShowFilters] = useState(false);
//   const [tempFilters, setTempFilters] = useState({});
//   const [appliedFilters, setAppliedFilters] = useState({});
//   const [priceRange, setPriceRange] = useState([0, 5000]);
//   const [rating, setRating] = useState(0);
//   const [sortBy, setSortBy] = useState("popular");

  

//   //  CATEGORY MAP
//   const categoryMap = {
//     Occasion: ["Birthday", "Anniversary", "Wedding", "Baby shower","Graduation","Housewarming"],
//     Recipient: ["For Him", "For Her", "For Kids", "For Parents","For Couples","Corporate Gifts"],
//     Festival: ["Christmas", "Diwali", "New Year","Mothers Day","Valentines Day","Fathers Day"],
//     GiftType: ["Luxury", "Handmade", "Chocolate Hamper","Snack Hamper","Dry Fruit Hamper","Coffee & Tea","Self Care","Personalized","Wellness"],
//   };

//  // ✅ HIDE FILTERS IF SUBCATEGORY EXISTS
//   const hideFilters = !!subCategory;
//    // ✅ SHOW ONLY RELEVANT FILTERS
//   const visibleFilters = selectedCategory
//     ? { [selectedCategory]: categoryMap[selectedCategory],
//     GiftType: categoryMap.GiftType|| [],
//     }: categoryMap;

//   //  HANDLE FILTER CHANGE
//   const handleFilterChange = (category, value) => {
//     setTempFilters((prev) => {
//       const current = prev[category] || [];

//       return {
//         ...prev,
//         [category]: current.includes(value)
//           ? current.filter((v) => v !== value)
//           : [...current, value],
//       };
//     });
//   };

//   //  FILTER LOGIC
//   const selectedValues = Object.values(appliedFilters)
//     .flat()
//     .map((v) => v.toLowerCase());

//   let filteredProducts = products.filter((product) => {
//     const productMain = product.mainCategory?.toLowerCase();
//     const productSub = product.subCategory?.toLowerCase();

//     // URL filter
//     let urlMatch = true;

//     if (selectedCategory && subCategory) {
//       urlMatch =
//         productMain === selectedCategory.toLowerCase() &&
//         productSub === subCategory.toLowerCase();
//     } else if (selectedCategory) {
//       urlMatch = productMain === selectedCategory.toLowerCase();
//     }

//     // Sidebar filter
//     const categoryMatch =
//       selectedValues.length === 0 ||
//       selectedValues.includes(productSub);

//     const priceMatch =
//       product.price >= priceRange[0] &&
//       product.price <= priceRange[1];

//     const ratingMatch =
//       rating === 0 || product.rating >= rating;

//     return urlMatch && categoryMatch && priceMatch && ratingMatch;
//   });

//   //  SORTING
//   if (sortBy === "price-low") {
//     filteredProducts.sort((a, b) => a.price - b.price);
//   } else if (sortBy === "price-high") {
//     filteredProducts.sort((a, b) => b.price - a.price);
//   } else if (sortBy === "rating") {
//     filteredProducts.sort((a, b) => b.rating - a.rating);
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-6">

//       {/*  BREADCRUMB */}
//       <div className="text-sm text-gray-500 mb-4">
//         <Link to="/">Home</Link>

//         {selectedCategory && (
//           <>
//             {" > "}
//             <Link to={`/products?category=${selectedCategory}`}>
//               {formatTitle(selectedCategory)}
//             </Link>
//           </>
//         )}

//         {subCategory && (
//           <>
//             {" > "}
//             <span className="text-[#8B3A62] font-medium">
//               {formatTitle(subCategory)}
//             </span>
//           </>
//         )}
//       </div>

//       {/*  HEADER */}
//       <div className="mb-6">
//         <h1 className="text-3xl text-[#8B3A62] mb-2">
//           {subCategory
//             ? `${formatTitle(subCategory)} Hampers`
//             : selectedCategory
//             ? `${formatTitle(selectedCategory)} Hampers`
//             : "All Gift Hampers"}
//         </h1>

//         <p className="text-gray-600">
//           Explore our premium collection
//         </p>
//       </div>

//       {/*  MOBILE FILTER BUTTON */}
//       {!hideFilters && (
//         <button
//           onClick={() => setShowFilters(true)}
//           className="lg:hidden bg-[#8B3A62] text-white px-4 py-2 rounded mb-4"
//         >
//           Filters
//         </button>
//       )}

//       {/* MOBILE OVERLAY */}
//       {!hideFilters && showFilters && (
//         <div
//           className="fixed inset-0 bg-black/40 z-40"
//           onClick={() => setShowFilters(false)}
//         />
//       )}

//       {/*  MOBILE SIDEBAR */}
//       {!hideFilters && (
//         <FilterSidebar
//           isOpen={showFilters}
//           onClose={() => setShowFilters(false)}
//           categoryMap={visibleFilters}
//           tempFilters={tempFilters}
//           setTempFilters={setTempFilters}
//           priceRange={priceRange}
//           setPriceRange={setPriceRange}
//           rating={rating}
//           setRating={setRating}
//           onApply={() => {
//             setAppliedFilters(tempFilters);
//             setShowFilters(false);
//           }}
//           onClear={() => {
//             setTempFilters({});
//             setAppliedFilters({});
//             setPriceRange([0, 5000]);
//             setRating(0);
//           }}
//         />
//       )}

//       {/*  MAIN GRID */}
//       <div className={`grid ${hideFilters ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-4"} gap-6`}>
//         {/* DESKTOP FILTER */}
//         {!hideFilters && (
//           <div className="hidden lg:block">
//             <FilterSidebar
//               isOpen={true}
//               categoryMap={visibleFilters}
//               tempFilters={tempFilters}
//               setTempFilters={setTempFilters}
//               priceRange={priceRange}
//               setPriceRange={setPriceRange}
//               rating={rating}
//               setRating={setRating}
//               onApply={() => setAppliedFilters(tempFilters)}
//               onClear={() => {
//                 setTempFilters({});
//                 setAppliedFilters({});
//                 setPriceRange([0, 5000]);
//                 setRating(0);
//               }}
//             />
//           </div>
//         )}

//         {/* PRODUCTS */}
//         <div className={hideFilters ? "" : "lg:col-span-3"}>

//           {/* TOOLBAR */}
//           <div className="flex justify-between mb-4">
//             <p>{filteredProducts.length} products</p>

//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               className="border px-2 py-1 rounded"
//             >
//               <option value="popular">Popular</option>
//               <option value="price-low">Low → High</option>
//               <option value="price-high">High → Low</option>
//               <option value="rating">Top Rated</option>
//             </select>
//           </div>

//           {/* GRID */}
//           {filteredProducts.length === 0 ? (
//             <p className="text-center mt-10">No products found</p>
//           ) : (
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
//               {filteredProducts.map((product, index) => (
//                 <motion.div
//                   key={product.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.05 }}
//                 >
//                   <ProductCard {...product} />
//                 </motion.div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

//code 4

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import ProductCard from "../components/ProductCard";
// import { useSelector } from "react-redux";
// import { useLocation, Link, useSearchParams } from "react-router-dom";
// import FilterSidebar from "../components/Filtersidebar";
// import { SlidersHorizontal, ArrowUpDown } from "lucide-react";
// import { categoryMapConfig } from "../data/dataConfig";

// // ✅ FORMAT TITLE
// const formatTitle = (text) => {
//   if (!text) return "";
//   return text
//     .split("-")
//     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(" ");
// };

// export default function ProductListing() {
  
//   const location = useLocation();
//   const params = new URLSearchParams(location.search);

//   const selectedCategory = params.get("category");
//   const subCategory = params.get("sub");

//   const products = useSelector((state) => state.products.items);

//   const [searchParams] = useSearchParams();
//   const isFeatured = searchParams.get("featured") === "true";

//   let filteredProd = products;
//   if (isFeatured) {
//     filteredProd = filteredProd.filter((p) => p.isFeatured);
//   }

//   // ✅ STATES
//   const [showFilters, setShowFilters] = useState(false);
//   const [showSort, setShowSort] = useState(false);

//   const [tempFilters, setTempFilters] = useState({});
//   const [appliedFilters, setAppliedFilters] = useState({});
//   const [priceRange, setPriceRange] = useState([0, 5000]);
//   const [rating, setRating] = useState(0);
//   const [sortBy, setSortBy] = useState("popular");

//   // ✅ CATEGORY MAP
//   const categoryMap = {
//     Occasion: ["Birthday", "Anniversary", "Wedding", "Baby shower", "Graduation", "Housewarming"],
//     Recipient: ["For Him", "For Her", "For Kids", "For Parents", "For Couples", "Corporate Gifts"],
//     Festival: ["Christmas", "Diwali", "New Year", "Mothers Day", "Valentines Day", "Fathers Day"],
//     GiftType: ["Luxury","HomeDecor","NamePlates","Stationary", "Handmade", "Chocolate Hamper", "Snack Hamper", "Dry Fruit Hamper", "Coffee & Tea", "Self Care", "Personalized", "Wellness"],
//   };

//   // ✅ HIDE FILTERS IF SUBCATEGORY EXISTS
//   const hideFilters = !!subCategory;

//   // ✅ VISIBLE FILTERS
//   const visibleFilters = selectedCategory
//     ? {
//         [selectedCategory]: categoryMap[selectedCategory],
//         GiftType: categoryMap.GiftType || [],
//       }
//     : categoryMap;
//       console.log("selected Category",selectedCategory)
//       console.log("visiblefilters", visibleFilters)

//   //  FILTER LOGIC
//   const selectedValues = Object.values(appliedFilters)
//     .flat()
//     .map((v) => v.toLowerCase());

//   const matchesFilter = (product, value) => {
//   const val = value.toLowerCase();

//   return (
//     product.subCategory?.toLowerCase() === val ||
//     product.mainCategory?.toLowerCase() === val ||
//     (product.giftTypes || []).some(
//       (type) => type.toLowerCase() === val
//     )
//   );
// };

// let filteredProducts = filteredProd.filter((product) => {
//   const productMain = product.mainCategory?.toLowerCase();
//   const productSub = product.subCategory?.toLowerCase();

//   //  URL MATCH (keep this)
//   let urlMatch = true;

//   if (selectedCategory && subCategory) {
//     urlMatch =
//       productMain === selectedCategory.toLowerCase() &&
//       productSub === subCategory.toLowerCase();
//   } else if (selectedCategory) {
//     urlMatch = productMain === selectedCategory.toLowerCase();
//   }

//   return urlMatch;
// });

// // //  STRICT (AND)
// // if (selectedValues.length > 0) {
// //   let strictFiltered = filteredProducts.filter((product) =>
// //     selectedValues.every((value) => matchesFilter(product, value))
// //   );
  
// //OR LOGIC
//   if (selectedValues.length > 0) {
//   filteredProducts = filteredProducts.filter((product) =>
//     selectedValues.some((value) => matchesFilter(product, value))
//   );
//   // }

//   //  FALLBACK → OR logic
//   // if (strictFiltered.length === 0) {
//   //   strictFiltered = filteredProducts.filter((product) =>
//   //     selectedValues.some((value) => matchesFilter(product, value))
//   //   );
//   // }

//   // filteredProducts = strictFiltered;
// }

// // ✅ PRICE + RATING
// filteredProducts = filteredProducts.filter(
//   (product) =>
//     product.price >= priceRange[0] &&
//     product.price <= priceRange[1] &&
//     (rating === 0 || product.rating >= rating)
// );


//   // let filteredProducts = filteredProd.filter((product) => {
//   //   const productMain = product.mainCategory?.toLowerCase();
//   //   const productSub = product.subCategory?.toLowerCase();

//   //   let urlMatch = true;

//   //   if (selectedCategory && subCategory) {
//   //     urlMatch =
//   //       productMain === selectedCategory.toLowerCase() &&
//   //       productSub === subCategory.toLowerCase();
//   //   } else if (selectedCategory) {
//   //     urlMatch = productMain === selectedCategory.toLowerCase();
//   //   }

//   //   const categoryMatch =
//   //     selectedValues.length === 0 ||
//   //     selectedValues.every((value) =>
//   //       productSub === value ||
//   //       productMain === value ||
//   //       product.giftTypes?.some(
//   //         (type) => type.toLowerCase() === value
//   //       )
//   // );

//   //   const priceMatch =
//   //     product.price >= priceRange[0] &&
//   //     product.price <= priceRange[1];

//   //   const ratingMatch =
//   //     rating === 0 || product.rating >= rating;

//   //   return urlMatch && categoryMatch && priceMatch && ratingMatch;
//   // });

//   //  SORTING
//   if (sortBy === "price-low") {
//     filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
//   } else if (sortBy === "price-high") {
//     filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
//   } else if (sortBy === "rating") {
//     filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
//   }

//   useEffect(() => {
//   setTempFilters({});
//   setAppliedFilters({});
//   setPriceRange([0, 5000]);
//   setRating(0);
// }, [selectedCategory, subCategory]);

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-6 pb-24">

//       {/*  BREADCRUMB */}
//       <div className="text-sm text-gray-500 mb-4">
//         <Link to="/">Home</Link>

//         {selectedCategory && (
//           <>
//             {" > "}
//             <Link to={`/products?category=${selectedCategory}`}>
//               {formatTitle(selectedCategory)}
//             </Link>
//           </>
//         )}

//         {subCategory && (
//           <>
//             {" > "}
//             <span className="text-[#8B3A62] font-medium">
//               {formatTitle(subCategory)}
//             </span>
//           </>
//         )}
//       </div>

//       {/*  HEADER */}
//       <div className="mb-6">
//         <h1 className="text-2xl md:text-3xl text-[#8B3A62] mb-2">
//           {subCategory
//             ? `${formatTitle(subCategory)} Hampers`
//             : selectedCategory
//             ? `${formatTitle(selectedCategory)} Hampers`
//             : "All Gift Hampers"}
//         </h1>

//         <p className="text-gray-600 text-sm md:text-base">
//           Explore our premium collection
//         </p>
//       </div>

//       {/*  MOBILE FILTER OVERLAY */}
//       {!hideFilters && showFilters && (
//         <div
//           className="fixed inset-0 bg-black/40 z-40"
//           onClick={() => setShowFilters(false)}
//         />
//       )}

//       {/*  FILTER SIDEBAR */}
//       {!hideFilters && (
//         <FilterSidebar
//           isOpen={showFilters}
//           onClose={() => setShowFilters(false)}
//           categoryMap={visibleFilters}
//           tempFilters={tempFilters}
//           setTempFilters={setTempFilters}
//           priceRange={priceRange}
//           setPriceRange={setPriceRange}
//           rating={rating}
//           setRating={setRating}
//           onApply={() => {
//             setAppliedFilters(tempFilters);
//             setShowFilters(false);
//           }}
//           onClear={() => {
//             setTempFilters({});
//             setAppliedFilters({});
//             setPriceRange([0, 5000]);
//             setRating(0);
//           }}
//         />
//       )}

//       {/*  MAIN GRID */}
//       <div className={`grid ${hideFilters ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-4"} gap-6`}>

//         {/* DESKTOP FILTER */}
//         {!hideFilters && (
//           <div className="hidden lg:block">
//             <FilterSidebar
//               isOpen={true}
//               categoryMap={visibleFilters}
//               tempFilters={tempFilters}
//               setTempFilters={setTempFilters}
//               priceRange={priceRange}
//               setPriceRange={setPriceRange}
//               rating={rating}
//               setRating={setRating}
//               onApply={() => setAppliedFilters(tempFilters)}
//               onClear={() => {
//                 setTempFilters({});
//                 setAppliedFilters({});
//                 setPriceRange([0, 5000]);
//                 setRating(0);
//               }}
//             />
//           </div>
//         )}

//         {/* PRODUCTS */}
//         <div className={hideFilters ? "" : "lg:col-span-3"}>

//           {/* DESKTOP SORT */}
//           <div className="hidden lg:flex items-center justify-between mb-6 border-b pb-4">

//             {/* LEFT: PRODUCT COUNT */}
//             <div>
//               <p className="text-sm text-gray-600">
//                 Showing{" "}
//                 <span className="font-semibold text-gray-900">
//                   {filteredProducts.length}
//                 </span>{" "}
//                 results
//               </p>
//             </div>

//             {/* RIGHT: SORT */}
//             <div className="flex items-center gap-3">

//               <span className="text-sm text-gray-600">
//                 Sort by:
//               </span>

//               <div className="relative">
//                 <select
//                   value={sortBy}
//                   onChange={(e) => setSortBy(e.target.value)}
//                   className="appearance-none bg-white border border-gray-300 text-sm rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-[#8B3A62] focus:border-[#8B3A62] cursor-pointer hover:border-[#8B3A62] transition"
//                 >
//                   <option value="popular">Popular</option>
//                   <option value="price-low">Price: Low → High</option>
//                   <option value="price-high">Price: High → Low</option>
//                   <option value="rating">Top Rated</option>
//                 </select>

//                 {/* CUSTOM DROPDOWN ICON */}
//                 <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
//                   ▼
//                 </span>
//               </div>

//             </div>
//           </div>

//           {/* MOBILE COUNT */}
//           <p className="lg:hidden mb-3 text-sm text-gray-500">
//             {filteredProducts.length} products
//           </p>

//           {/* GRID */}
//           {filteredProducts.length === 0 ? (
//             <p className="text-center text-gray-500 mt-10">No products found</p>
//           ) : (
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
//               {filteredProducts.map((product, index) => (
//                 <motion.div
//                   key={product.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.05 }}
//                 >
//                   <ProductCard {...product} />
//                 </motion.div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
      

//       {/*  MOBILE BOTTOM BAR */}
//       {!hideFilters && !showFilters && !showSort && (
//         <div className="fixed bottom-0 left-0 w-full bg-white border-t z-50 flex lg:hidden shadow-md">
//           <button
//             onClick={() => setShowSort(true)}
//             className="w-1/2 py-3 flex items-center justify-center gap-2 font-medium"
//           >
//             <ArrowUpDown size={18} /> Sort
//           </button>

//           <button
//             onClick={() => setShowFilters(true)}
//             className="w-1/2 py-3 flex items-center justify-center gap-2 border-l font-medium"
//           >
//             <SlidersHorizontal size={18} /> Filter
//           </button>
//         </div>
//       )}

//       {/*  SORT BOTTOM SHEET */}
//       {showSort && (
//         <>
//           <div
//             className="fixed inset-0 bg-black/40 z-40"
//             onClick={() => setShowSort(false)}
//           />

//           <div className="fixed bottom-0 left-0 w-full bg-white z-50 rounded-t-2xl p-5 animate-slideUp">
//             <h3 className="text-lg font-semibold mb-4">Sort By</h3>

//             {[
//               { label: "Popular", value: "popular" },
//               { label: "Price: Low to High", value: "price-low" },
//               { label: "Price: High to Low", value: "price-high" },
//               { label: "Top Rated", value: "rating" },
//             ].map((item) => (
//               <button
//                 key={item.value}
//                 onClick={() => {
//                   setSortBy(item.value);
//                   setShowSort(false);
//                 }}
//                 className={`block w-full text-left py-3 border-b ${
//                   sortBy === item.value
//                     ? "text-[#8B3A62] font-semibold"
//                     : ""
//                 }`}
//               >
//                 {item.label}
//               </button>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }


// //------------------------------------------code 5 cloude-----------------------------------------(previos code 4)------------// 

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import { useSelector } from "react-redux";
import { useLocation, Link, useSearchParams } from "react-router-dom";
import FilterSidebar from "../components/Filtersidebar";
import { SlidersHorizontal, LayoutGrid, List } from "lucide-react";
import { categoryMapConfig } from "../data/dataConfig";

const formatTitle = (text) => {
  if (!text) return "";
  return text
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const SORT_OPTIONS = [
  { label: "Relevance", value: "popular" },
  { label: "Price: Low to High", value: "price-low" },
  { label: "Price: High to Low", value: "price-high" },
  { label: "Top Rated", value: "rating" },
];

export default function ProductListing() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedCategory = params.get("category");
  const subCategory = params.get("sub");

  const products = useSelector((state) => state.products.items);
  const [searchParams] = useSearchParams();
  const isFeatured = searchParams.get("featured") === "true";

  let filteredProd = products;
  if (isFeatured) filteredProd = filteredProd.filter((p) => p.isFeatured);

  // ── STATE ──────────────────────────────────────────────────────────────────
  const [showFilters, setShowFilters] = useState(false);
  const [tempFilters, setTempFilters] = useState({});
  const [appliedFilters, setAppliedFilters] = useState({});
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [rating, setRating] = useState(0);
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState("list"); // "list" | "grid"

  // ── CATEGORY MAP ────────────────────────────────────────────────────────────
  const categoryMap = {
    Occasion: ["Birthday", "Anniversary", "Wedding", "Baby shower", "Graduation", "Housewarming"],
    Recipient: ["For Him", "For Her", "For Kids", "For Parents", "For Couples", "Corporate Gifts"],
    Festival: ["Christmas", "Diwali", "New Year", "Mothers Day", "Valentines Day", "Fathers Day"],
    GiftType: ["Luxury", "HomeDecor", "NamePlates", "Stationary", "Handmade", "Chocolate Hamper", "Snack Hamper", "Dry Fruit Hamper", "Coffee & Tea", "Self Care", "Personalized", "Wellness"],
  };

  const hideFilters = !!subCategory;

  const visibleFilters = selectedCategory
    ? { [selectedCategory]: categoryMap[selectedCategory], GiftType: categoryMap.GiftType || [] }
    : categoryMap;

  // ── FILTER LOGIC ────────────────────────────────────────────────────────────
  const selectedValues = Object.values(appliedFilters).flat().map((v) => v.toLowerCase());

  const matchesFilter = (product, value) => {
    const val = value.toLowerCase();
    return (
      product.subCategory?.toLowerCase() === val ||
      product.mainCategory?.toLowerCase() === val ||
      (product.giftTypes || []).some((type) => type.toLowerCase() === val)
    );
  };

  let filteredProducts = filteredProd.filter((product) => {
    const productMain = product.mainCategory?.toLowerCase();
    const productSub = product.subCategory?.toLowerCase();
    let urlMatch = true;
    if (selectedCategory && subCategory) {
      urlMatch = productMain === selectedCategory.toLowerCase() && productSub === subCategory.toLowerCase();
    } else if (selectedCategory) {
      urlMatch = productMain === selectedCategory.toLowerCase();
    }
    return urlMatch;
  });

  if (selectedValues.length > 0) {
    filteredProducts = filteredProducts.filter((product) =>
      selectedValues.some((value) => matchesFilter(product, value))
    );
  }

  filteredProducts = filteredProducts.filter(
    (product) =>
      product.price >= priceRange[0] &&
      product.price <= priceRange[1] &&
      (rating === 0 || product.rating >= rating)
  );

  // ── SORTING ─────────────────────────────────────────────────────────────────
  if (sortBy === "price-low") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
  }

  useEffect(() => {
    setTempFilters({});
    setAppliedFilters({});
    setPriceRange([0, 5000]);
    setRating(0);
  }, [selectedCategory, subCategory]);

  // ── RENDER ──────────────────────────────────────────────────────────────────
  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 pb-24">

      {/* BREADCRUMB */}
      <div className="text-xs text-gray-500 mb-3">
        <Link to="/" className="hover:underline">Home</Link>
        {selectedCategory && (
          <>
            {" › "}
            <Link to={`/products?category=${selectedCategory}`} className="hover:underline">
              {formatTitle(selectedCategory)}
            </Link>
          </>
        )}
        {subCategory && (
          <> {" › "}<span className="text-[#8B3A62] font-medium">{formatTitle(subCategory)}</span></>
        )}
      </div>

      {/* MOBILE OVERLAY */}
      {!hideFilters && showFilters && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setShowFilters(false)} />
      )}

      {/* MOBILE FILTER SIDEBAR */}
      {!hideFilters && (
        <FilterSidebar
          isOpen={showFilters}
          onClose={() => setShowFilters(false)}
          categoryMap={visibleFilters}
          tempFilters={tempFilters}
          setTempFilters={setTempFilters}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          rating={rating}
          setRating={setRating}
          onApply={() => { setAppliedFilters(tempFilters); setShowFilters(false); }}
          onClear={() => { setTempFilters({}); setAppliedFilters({}); setPriceRange([0, 5000]); setRating(0); }}
        />
      )}

      {/* MAIN LAYOUT */}
      <div className={`flex gap-0 ${hideFilters ? "" : ""}`}>

        {/* DESKTOP SIDEBAR */}
        {!hideFilters && (
          <div className="hidden lg:block w-56 flex-shrink-0 mr-4">
            <FilterSidebar
              isOpen={true}
              categoryMap={visibleFilters}
              tempFilters={tempFilters}
              setTempFilters={setTempFilters}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              rating={rating}
              setRating={setRating}
              onApply={() => setAppliedFilters(tempFilters)}
              onClear={() => { setTempFilters({}); setAppliedFilters({}); setPriceRange([0, 5000]); setRating(0); }}
            />
          </div>
        )}

        {/* PRODUCTS COLUMN */}
        <div className="flex-1 min-w-0">

          {/* SORT BAR + VIEW TOGGLE — Desktop */}
<div className="hidden lg:flex items-center justify-between flex-wrap gap-y-2 bg-white border border-gray-200 rounded-t px-4 py-0 mb-0">

  {/* LEFT: title + count */}
  <div className="py-3 min-w-0">
    <h1 className="text-base font-semibold text-gray-800 leading-tight truncate">
      {subCategory
        ? `${formatTitle(subCategory)} Hampers`
        : selectedCategory
        ? `${formatTitle(selectedCategory)} Hampers`
        : "All Gift Hampers"}
    </h1>
    <p className="text-xs text-gray-500">{filteredProducts.length} results</p>
  </div>

  {/* RIGHT: sort tabs + view toggle */}
  <div className="flex items-center flex-wrap gap-y-1 gap-x-0">
    <span className="text-xs text-gray-500 mr-2">Sort by</span>
    {SORT_OPTIONS.map((opt) => (
      <button
        key={opt.value}
        onClick={() => setSortBy(opt.value)}
        className="px-2 py-3 text-xs transition-colors border-b-2"
        style={{
          borderBottomColor: sortBy === opt.value ? "#8B3A62" : "transparent",
          color: sortBy === opt.value ? "#8B3A62" : "#555",
          fontWeight: sortBy === opt.value ? 500 : 400,
          background: "none",
          outline: "none",
          cursor: "pointer",
          whiteSpace: "nowrap",
        }}
      >
        {opt.label}
      </button>
    ))}

    {/* VIEW TOGGLE */}
    <div className="flex items-center gap-1 ml-3 border-l pl-3">
      <button
        onClick={() => setViewMode("list")}
        className="p-1.5 rounded transition-colors"
        style={{ background: viewMode === "list" ? "#f5e9f1" : "none", color: viewMode === "list" ? "#8B3A62" : "#888" }}
        title="List view"
      >
        <List size={16} />
      </button>
      <button
        onClick={() => setViewMode("grid")}
        className="p-1.5 rounded transition-colors"
        style={{ background: viewMode === "grid" ? "#f5e9f1" : "none", color: viewMode === "grid" ? "#8B3A62" : "#888" }}
        title="Grid view"
      >
        <LayoutGrid size={16} />
      </button>
    </div>
  </div>
</div>

          {/* MOBILE HEADER */}
          <div className="lg:hidden mb-3">
            <h1 className="text-lg font-semibold text-[#8B3A62] leading-tight">
              {subCategory
                ? `${formatTitle(subCategory)} Hampers`
                : selectedCategory
                ? `${formatTitle(selectedCategory)} Hampers`
                : "All Gift Hampers"}
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">{filteredProducts.length} products</p>
          </div>

          {/* PRODUCT LIST / GRID */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded p-12 text-center ">
              <p className="text-gray-400 text-sm">No products found</p>
            </div>
          ) : viewMode === "list" ? (
            /* LIST MODE */
            <div className="border border-gray-200 rounded overflow-hidden ">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <ProductCard {...product} viewMode="list" />
                </motion.div>
              ))}
            </div>
          ) : (
            /* GRID MODE */
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ProductCard {...product} viewMode="grid" />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MOBILE BOTTOM BAR */}
      {!hideFilters && (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t z-50 flex lg:hidden shadow-md">

          {/* SORT dropdown sheet trigger */}
          <div className="w-1/2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full py-3 text-sm text-center font-medium appearance-none bg-white focus:outline-none "
              style={{ borderRight: "1px solid #eee" }}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setShowFilters(true)}
            className="w-1/2 py-3 flex items-center justify-center gap-2 font-medium text-sm"
          >
            <SlidersHorizontal size={16} /> Filter
          </button>
        </div>
      )}
    </div>
  );
}
