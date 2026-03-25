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

import { useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import { ChevronDown } from "lucide-react";
import { useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import FilterSidebar from "../components/Filtersidebar";

const formatTitle = (text) => {
  if (!text) return "";
  return text
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function ProductListing() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const selectedCategory = params.get("category");
  const subCategory = params.get("sub");

  const products = useSelector((state) => state.products.items);

  // 🔥 STATES
  const [showFilters, setShowFilters] = useState(false);
  const [tempFilters, setTempFilters] = useState({});
  const [appliedFilters, setAppliedFilters] = useState({});
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [rating, setRating] = useState(0);
  const [sortBy, setSortBy] = useState("popular");

  

  // 🔥 CATEGORY MAP
  const categoryMap = {
    Occasion: ["Birthday", "Anniversary", "Wedding", "Baby shower","Graduation","Housewarming"],
    Recipient: ["For Him", "For Her", "For Kids", "For Parents","For Couples","Corporate Gifts"],
    Festival: ["Christmas", "Diwali", "New Year","Mothers Day","Valentines Day","Fathers Day"],
    GiftType: ["Luxury", "Handmade", "Chocolate Hamper","Snack Hamper","Dry Fruit Hamper","Coffee & Tea","Self Care","Personalized","Wellness"],
  };

 // ✅ HIDE FILTERS IF SUBCATEGORY EXISTS
  const hideFilters = !!subCategory;
   // ✅ SHOW ONLY RELEVANT FILTERS
  const visibleFilters = selectedCategory
    ? { [selectedCategory]: categoryMap[selectedCategory],
    GiftType: categoryMap.GiftType|| [],
    }: categoryMap;

  // 🔥 HANDLE FILTER CHANGE
  const handleFilterChange = (category, value) => {
    setTempFilters((prev) => {
      const current = prev[category] || [];

      return {
        ...prev,
        [category]: current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });
  };

  // 🔥 FILTER LOGIC
  const selectedValues = Object.values(appliedFilters)
    .flat()
    .map((v) => v.toLowerCase());

  let filteredProducts = products.filter((product) => {
    const productMain = product.mainCategory?.toLowerCase();
    const productSub = product.subCategory?.toLowerCase();

    // URL filter
    let urlMatch = true;

    if (selectedCategory && subCategory) {
      urlMatch =
        productMain === selectedCategory.toLowerCase() &&
        productSub === subCategory.toLowerCase();
    } else if (selectedCategory) {
      urlMatch = productMain === selectedCategory.toLowerCase();
    }

    // Sidebar filter
    const categoryMatch =
      selectedValues.length === 0 ||
      selectedValues.includes(productSub);

    const priceMatch =
      product.price >= priceRange[0] &&
      product.price <= priceRange[1];

    const ratingMatch =
      rating === 0 || product.rating >= rating;

    return urlMatch && categoryMatch && priceMatch && ratingMatch;
  });

  // 🔥 SORTING
  if (sortBy === "price-low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">

      {/* 🔥 BREADCRUMB */}
      <div className="text-sm text-gray-500 mb-4">
        <Link to="/">Home</Link>

        {selectedCategory && (
          <>
            {" > "}
            <Link to={`/products?category=${selectedCategory}`}>
              {formatTitle(selectedCategory)}
            </Link>
          </>
        )}

        {subCategory && (
          <>
            {" > "}
            <span className="text-[#8B3A62] font-medium">
              {formatTitle(subCategory)}
            </span>
          </>
        )}
      </div>

      {/* 🔥 HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl text-[#8B3A62] mb-2">
          {subCategory
            ? `${formatTitle(subCategory)} Hampers`
            : selectedCategory
            ? `${formatTitle(selectedCategory)} Hampers`
            : "All Gift Hampers"}
        </h1>

        <p className="text-gray-600">
          Explore our premium collection
        </p>
      </div>

      {/* 🔥 MOBILE FILTER BUTTON */}
      {!hideFilters && (
        <button
          onClick={() => setShowFilters(true)}
          className="lg:hidden bg-[#8B3A62] text-white px-4 py-2 rounded mb-4"
        >
          Filters
        </button>
      )}

      {/* 🔥 MOBILE OVERLAY */}
      {!hideFilters && showFilters && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setShowFilters(false)}
        />
      )}

      {/* 🔥 MOBILE SIDEBAR */}
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
          onApply={() => {
            setAppliedFilters(tempFilters);
            setShowFilters(false);
          }}
          onClear={() => {
            setTempFilters({});
            setAppliedFilters({});
            setPriceRange([0, 5000]);
            setRating(0);
          }}
        />
      )}

      {/* 🔥 MAIN GRID */}
      <div className={`grid ${hideFilters ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-4"} gap-6`}>
        {/* DESKTOP FILTER */}
        {!hideFilters && (
          <div className="hidden lg:block">
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
              onClear={() => {
                setTempFilters({});
                setAppliedFilters({});
                setPriceRange([0, 5000]);
                setRating(0);
              }}
            />
          </div>
        )}

        {/* PRODUCTS */}
        <div className={hideFilters ? "" : "lg:col-span-3"}>

          {/* TOOLBAR */}
          <div className="flex justify-between mb-4">
            <p>{filteredProducts.length} products</p>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border px-2 py-1 rounded"
            >
              <option value="popular">Popular</option>
              <option value="price-low">Low → High</option>
              <option value="price-high">High → Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          {/* GRID */}
          {filteredProducts.length === 0 ? (
            <p className="text-center mt-10">No products found</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ProductCard {...product} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}