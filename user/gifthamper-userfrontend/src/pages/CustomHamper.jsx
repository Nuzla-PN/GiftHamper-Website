
// import { useState,useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Check,
//   Gift,
//   Package,
//   MessageSquare,
//   ShoppingCart,
//   ChevronDown,
//   X,
// } from "lucide-react";

// import ProductCard from "../components/ProductCard";
// import OrderSummaryContent from "../components/Ordersummarycard";

// export default function StepProgress() {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [selectedBox, setSelectedBox] = useState(null);
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [customMessage, setCustomMessage] = useState("");

//   // ✅ FILTER STATES
//   const [mainCategory, setMainCategory] = useState("All");
//   const [subCategory, setSubCategory] = useState("All");
//   const [showFilters, setShowFilters] = useState(false);

//   // ✅ STEPS
//   const steps = [
//     { number: 1, title: "Select Box", icon: Package },
//     { number: 2, title: "Choose Items", icon: Gift },
//     { number: 3, title: "Add Message", icon: MessageSquare },
//     { number: 4, title: "Checkout", icon: ShoppingCart },
//   ];

//   // ✅ BOXES
//    const boxes = [
//     {
//       id: "small",
//       name: "Small Box",
//       size: '8" x 6"',
//       capacity: "3-5 items",
//       price: 200,
//       image: "https://images.unsplash.com/photo-1759563871371-eb0ec31824a6?w=400",
//     },
//     {
//       id: "medium",
//       name: "Medium Box",
//       size: '12" x 8"',
//       capacity: "6-10 items",
//       price: 300,
//       image: "https://images.unsplash.com/photo-1759563871371-eb0ec31824a6?w=400",
//     },
//     {
//       id: "Large",
//       name: "Large Box",
//       size: '16" x 8"',
//       capacity: "15-20 items",
//       price: 1000,
//       image: "https://images.unsplash.com/photo-1759563871371-eb0ec31824a6?w=400",
//     },
//     {
//       id: "Premium Box",
//       name: "Premium Box",
//       size: '20" x 10"',
//       capacity: "20-35 items",
//       price: 2000,
//       image: "https://images.unsplash.com/photo-1759563871371-eb0ec31824a6?w=400",
//     },
    
//   ];

//   // ✅ CATEGORY MAP
//   const categoryMap = {
//     Occasion: ["Birthday", "Anniversary", "Wedding","Baby shower","Graduation","House warming","Engagement","Get Well Soon"],
//     Recipients: ["Him", "Her", "Kids","parents","couples","corporate gifts"],
//     Festival: ["Christmas", "Diwali","New Year","Valentines Day","Mothers Day","Fathers Day"],
//     GiftType: ["Luxury", "Handmade","Chocolate Hamper","Snack Hamper","Dry Fruits Hamper","Self Care Hamper","coffee & Tea Hamper"],
//     };

//   // ✅ PRODUCTS (IMPORTANT: FULL DATA)
//   const products = [
//     {
//       id: "1",
//       title: "Product Name",
//       sellerName: "Seller Shop",
//       image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400",
      
//       price: 1000,
//       rating: 4.5,
//       reviews: 120,
//       mainCategory: "Occasion",
//       subCategory: "Birthday"
//     },
//     {
//       id: "2",
//       title: "Product Name",
//       sellerName: "Seller shop",
//       image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400",
//       // image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400",
//       price: 2000,
//       rating: 4.8,
//       reviews: 80,
//       mainCategory: "GiftType",
//       subCategory: "Luxury",
//     },
//     {
//       id: "1",
//       title: "Product Name",
//       sellerName: "Seller Shop",
//       image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400",
      
//       price: 1000,
//       rating: 4.5,
//       reviews: 120,
//       mainCategory: "Occasion",
//       subCategory: "Birthday"
//     },
//   ];

//   // ✅ FILTER LOGIC
//   const [tempFilters, setTempFilters] = useState({});
//   const [appliedFilters, setAppliedFilters] = useState({});
//   const [priceRange, setPriceRange] = useState([0, 5000]);
//   const handleFilterChange = (category, value) => {
//   setTempFilters((prev) => {
//     const current = prev[category] || [];

//     if (current.includes(value)) {
//       return {
//         ...prev,
//         [category]: current.filter((v) => v !== value),
//       };
//     } else {
//       return {
//         ...prev,
//         [category]: [...current, value],
//       };
//     }
//   });
// };
//   const filteredProducts = products.filter((p) => {
//   const selectedValues = Object.values(appliedFilters).flat();

//   const categoryMatch =
//     selectedValues.length === 0 ||
//     selectedValues.includes(p.subCategory);

//   const priceMatch =
//     p.price >= priceRange[0] && p.price <= priceRange[1];

//   return categoryMatch && priceMatch;
//   });
  
//   const stepRefs = useRef([]);

//     useEffect(() => {
//       if (stepRefs.current[currentStep - 1]) {
//         stepRefs.current[currentStep - 1].scrollIntoView({
//           behavior: "smooth",
//           inline: "center",
//           block: "nearest",
//         });
//       }
//     }, [currentStep]);

//   // ✅ SELECT ITEM
//   const toggleItem = (id) => {
//     setSelectedItems((prev) =>
//       prev.includes(id)
//         ? prev.filter((i) => i !== id)
//         : [...prev, id]
//     );
//   };

//   const canProceed = () => {
//   if (currentStep === 1) return selectedBox !== null;
//   if (currentStep === 2) return selectedItems.length > 0;
//   return true;
// };

// //order summary
// const selectedBoxData = boxes.find((b) => b.id === selectedBox);

// const selectedItemsData = selectedItems
//   .map((id) => products.find((p) => p.id === id))
//   .filter(Boolean);

//   const calculateTotal = () => {
//   const boxPrice = selectedBoxData?.price || 0;

//   const itemsTotal = selectedItemsData.reduce(
//     (sum, item) => sum + item.price,
//     0
//   );

//   return boxPrice + itemsTotal;
// };
  
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 py-8 lg:pr-20 ">

//         {/* HEADER */}
//         <div className="text-center mb-10">
//           <h1 className="text-4xl font-bold text-[#8B3A62]">
//             Build Your Custom Hamper
//           </h1>
//           <p className="text-gray-600">
//             Create a personalized gift hamper
//           </p>
//         </div>


//         {/* STEP PROGRESS */}
        
//         <div className="mb-10 overflow-x-auto">
//         <div className="flex items-center justify-start md:justify-center w-full gap-4 px-2">

//         {steps.map((step, index) => (
//           <div
//             key={step.number}
//             ref={(el) => (stepRefs.current[index] = el)}
//             className="flex items-center flex-shrink-0"
//           >

//             {/* STEP ITEM */}
//             <div className="flex flex-col items-center w-20 mt-3">

//               {/* CIRCLE */}
//               <div
//                 className={`w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
//                   currentStep >= step.number
//                     ? "bg-[#8B3A62] text-white"
//                     : "bg-gray-200"
//                 } ${
//                   currentStep === step.number
//                     ? "scale-110 shadow-lg"
//                     : ""
//                 }`}
//               >
//                 {currentStep > step.number ? (
//                   <Check className="w-4 h-4 md:w-5 md:h-5" />
//                 ) : (
//                   <step.icon className="w-4 h-4 md:w-5 md:h-5" />
//                 )}
//               </div>

//               {/* TEXT */}
//               <span className="text-xs md:text-sm mt-1 text-center">
//                 {step.title}
//               </span>
//             </div>

//             {/* LINE */}
//             {index < steps.length - 1 && (
//               <div className="w-6 md:w-10 h-1 bg-gray-300 mx-1 md:mx-2" />
//             )}
//           </div>
//         ))}
//         </div>
//       </div>

//         {/* STEP CONTENT */}
//       <AnimatePresence mode="wait">
//       <motion.div key={currentStep}>

//           {/* STEP 1: Select Box  */}
//           {currentStep === 1 && (
//             <div>
//               <h2 className="text-3xl text-center mt-8 mb-8 text-[#8B3A62]">
//                 Choose Your Gift Box
//               </h2>

//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                 {boxes.map((box) => (
//                   <motion.div
//                     key={box.id}
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={() => setSelectedBox(box.id)}
//                     className={`bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-all ${
//                       selectedBox === box.id ? "ring-4 ring-[#8B3A62]" : ""
//                     }`}
//                   >
//                     <div className="relative h-48 bg-[#F7E3DC]">
//                       <img
//                         src={box.image}
//                         alt={box.name}
//                         className="w-full h-full object-cover opacity-80"
//                       />

//                       {selectedBox === box.id && (
//                         <div className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white bg-[#8B3A62]">
//                           <Check className="w-5 h-5" />
//                         </div>
//                       )}
//                     </div>

//                     <div className="p-6">
//                       <h3 className="text-xl mb-2 text-[#8B3A62]">
//                         {box.name}
//                       </h3>
//                       <p className="text-sm text-gray-600 mb-1">
//                         Size: {box.size}
//                       </p>
//                       <p className="text-sm text-gray-600 mb-3">
//                         Capacity: {box.capacity}
//                       </p>
//                       <p className="text-2xl text-[#8B3A62] font-semibold">
//                         ₹ {box.price.toFixed(2)}
//                       </p>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
            
//           )}

//             {/* STEP 2 */}
            
//             {currentStep === 2 && (
//               <div>
//               <div className="text-center mb-8 mt-8">
//                 <h2 className="text-3xl text-[#8B3A62] mb-2">
//                   Select Your Items
//                 </h2>

//                 <p className="text-gray-600">
//                   Selected: {selectedItems.length} items
//                 </p>
//               </div>
              
              
//               <div className="flex flex-col lg:flex-row gap-6">

//                 {/* FILTER BUTTON (MOBILE) */}
//                 <button
//                   onClick={() => setShowFilters(true)}
//                   className="lg:hidden bg-[#8B3A62] text-white px-4 py-2 rounded mb-4"
//                 >
//                   Filters
//                 </button>

//                 {/* OVERLAY (MOBILE) */}
//                 {showFilters && (
//                   <div
//                     className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
//                     onClick={() => setShowFilters(false)}
//                   />
//                 )}

//                 {/* SIDEBAR */}
//                 <div
//                   className={`
//                     fixed lg:sticky 
//                     top-16 lg:top-20 
//                     h-[calc(100%-4rem)] lg:h-fit
//                     w-72 bg-white z-40
//                     transform transition-transform duration-300
//                     ${showFilters ? "translate-x-0" : "-translate-x-full"}
//                     lg:translate-x-0 lg:block
//                   `}
//                 >
//                   <div className="h-full flex flex-col">

//                     {/* HEADER */}
//                     <div className="flex justify-between items-center p-4 border-b">
//                       <h3 className="font-semibold text-lg">Filters</h3>

//                       {/* CLOSE BUTTON (MOBILE) */}
//                       <button
//                         onClick={() => setShowFilters(false)}
//                         className="lg:hidden"
//                       >
//                         ✕
//                       </button>
//                     </div>

//                     {/* CONTENT */}
//                     <div className="p-4 overflow-y-auto flex-1">

//                       {/* CATEGORY FILTER */}
//                       {Object.entries(categoryMap).map(([category, subs]) => (
//                         <div key={category} className="mb-5">
                          
//                             {/* CATEGORY TITLE */}
//                         <p className="font-medium text-gray-800 mb-2">
//                           {category}
//                         </p>

//                         {/* SUBCATEGORY CHECKBOXES */}
//                         <div className="space-y-1 ml-2">
//                           {subs.map((sub) => (
//                             <label key={sub} className="flex items-center gap-2 text-sm cursor-pointer">
                              
//                               <input
//                                 type="checkbox"
//                                 checked={tempFilters[category]?.includes(sub) || false}
//                                 onChange={() => handleFilterChange(category, sub)}
//                                 className="accent-[#8B3A62]"
//                               />

//                               <span
//                                 className={`${
//                                   tempFilters[category]?.includes(sub)
//                                     ? "text-[#8B3A62] font-medium"
//                                     : "text-gray-600"
//                                 }`}
//                               >
//                                 {sub}
//                               </span>

//                             </label>
//                           ))}
//                         </div>
//                       </div>
//                     ))}

//                       {/* PRICE FILTER */}
//                       <div className="mb-6">
//                         <h4 className="font-medium mb-3">Price Range</h4>

//                         <input
//                           type="range"
//                           min="0"
//                           max="5000"
//                           step="100"
//                           value={priceRange[1]}
//                           onChange={(e) =>
//                             setPriceRange([priceRange[0], Number(e.target.value)])
//                           }
//                           className="w-full accent-[#8B3A62]"
//                         />

//                         <div className="flex justify-between text-sm text-gray-600 mt-2">
//                           <span>₹{priceRange[0]}</span>
//                           <span>₹{priceRange[1]}</span>
//                         </div>
//                       </div>

//                     </div>

//                     {/* FOOTER ACTIONS */}
//                     <div className="p-4 border-t flex gap-2">

//                       <button
//                         onClick={() => {
//                           setTempFilters({});
//                           setAppliedFilters({});
//                           setPriceRange([0, 5000]);
//                         }}
//                         className="flex-1 border border-gray-300 py-2 rounded text-sm"
//                       >
//                         Clear
//                       </button>

//                       <button
//                        onClick={() => {
//                           setAppliedFilters(tempFilters); 
//                           setShowFilters(false);//closes side bar
//                         }}
//                         className="flex-1 bg-[#8B3A62] text-white py-2 rounded text-sm"
//                       >
//                         Apply
//                       </button>

//                     </div>
//                   </div>
//                 </div>

//                 {/* PRODUCTS GRID */}
//                 <div className="flex-1">
//             {filteredProducts.length === 0 ? (
//               <p className="text-center text-gray-500 text-base mt-10">
//                 No products found in this price range
//               </p>
//             ) : (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {filteredProducts.map((item) => {
//                   const isSelected = selectedItems.includes(item.id);

//                   return (
//                     <ProductCard
//                       key={item.id}
//                       id={item.id}
//                       image={item.image}
//                       title={item.title}
//                       sellerName={item.sellerName}
//                       price={item.price}
//                       rating={item.rating}
//                       reviews={item.reviews}
//                       subCategory={item.subCategory}
//                       showSelect={true}
//                       isSelected={isSelected}
//                       onSelect={toggleItem}
//                     />
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         </div>
//         </div>
//       )}


//             {/* STEP 3 */}
//             {/* {currentStep === 3 && (  //SIMPLE MESSAGE BOX
//               <textarea
//                 className="w-full border p-4"
//                 placeholder="Message..."
//                 value={customMessage}
//                 onChange={(e) => setCustomMessage(e.target.value)}
//               />
//             )} */}
//             {currentStep === 3 && (
//               <div className="max-w-3xl mx-auto mt-8">
//                 <h2 className="text-3xl text-center mb-8 text-[#8B3A62]">
//                   Add a Personal Message
//                 </h2>

//                 <div className="bg-white rounded-xl shadow-md p-8">
//                   <div className="mb-6">
//                     <label className="block text-lg mb-3 text-[#8B3A62]">
//                       Your Message (Optional)
//                     </label>

//                     <textarea
//                       value={customMessage}
//                       onChange={(e) => setCustomMessage(e.target.value)}
//                       placeholder="Write a heartfelt message..."
//                       rows={6}
//                       maxLength={250}
//                       className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B3A62] resize-none"
//                     />

//                     <p className="text-sm text-gray-500 mt-2 text-right">
//                       {customMessage.length}/250 characters
//                     </p>
//                   </div>

//                   {/* Preview */}
//                   <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-[#FFF8F6]">
//                     <h3 className="text-lg mb-3 text-[#8B3A62]">
//                       Preview
//                     </h3>

//                     <div className="bg-white rounded-lg p-6 shadow-sm">
//                       <div className="mb-4 pb-4 border-b border-gray-200">
//                         <Gift className="w-8 h-8 mb-2 text-[#D4AF37]" />
//                       </div>

//                       <p className="text-gray-700 italic min-h-[60px]">
//                         {customMessage || "Your message will appear here..."}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
  
//     {/* STEP 4-CHECKOUT */}
//           {currentStep === 4 && (
//               <div className="max-w-4xl mx-auto px-2 sm:px-4">
//                 <h2 className="text-2xl sm:text-3xl text-center mb-6 sm:mb-8 text-[#8B3A62]">
//                   Review Your Custom Hamper
//                 </h2>

//                 <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 space-y-6">

//                   {/* BOX */}
//                   <div>
//                     <h3 className="text-lg sm:text-xl mb-3 text-[#8B3A62] font-semibold">
//                       Selected Box
//                     </h3>

//                     {selectedBox ? (
//                       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-[#F7E3DC] rounded-xl">
                        
//                         <div>
//                           <p className="font-semibold text-sm sm:text-base">
//                             {boxes.find(b => b.id === selectedBox)?.name}
//                           </p>
//                           <p className="text-xs sm:text-sm text-gray-600">
//                             {boxes.find(b => b.id === selectedBox)?.size}
//                           </p>
//                         </div>

//                         <p className="text-lg sm:text-xl font-semibold text-[#8B3A62]">
//                           ₹ {boxes.find(b => b.id === selectedBox)?.price.toFixed(2)}
//                         </p>

//                       </div>
//                     ) : (
//                       <p className="text-gray-400 text-sm">No box selected</p>
//                     )}
//                   </div>

//                   {/* ITEMS */}
//                   <div>
//                     <h3 className="text-lg sm:text-xl mb-3 text-[#8B3A62] font-semibold">
//                       Selected Items ({selectedItems.length})
//                     </h3>

//                     {selectedItems.length > 0 ? (
//                       <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
//                         {selectedItems.map((itemId) => {
//                           const item = products.find((i) => i.id === itemId);

//                           return item ? (
//                             <div
//                               key={item.id}
//                               className="flex items-center justify-between gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl"
//                             >
//                               {/* LEFT */}
//                               <div className="flex items-center gap-3">
//                                 <img
//                                   src={item.image}
//                                   alt={item.title}
//                                   className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg"
//                                 />

//                                 <div>
//                                   <p className="font-medium text-sm sm:text-base">
//                                     {item.title}
//                                   </p>
//                                   <p className="text-xs sm:text-sm text-gray-500">
//                                     {item.subCategory}
//                                   </p>
//                                 </div>
//                               </div>

//                               {/* PRICE */}
//                               <p className="text-sm sm:text-lg font-semibold text-[#8B3A62]">
//                                 ₹{item.price}
//                               </p>
//                             </div>
//                           ) : null;
//                         })}
//                       </div>
//                     ) : (
//                       <p className="text-gray-400 text-sm">No items selected</p>
//                     )}
//                   </div>

//                   {/* MESSAGE */}
//                   {customMessage && (
//                     <div>
//                       <h3 className="text-lg sm:text-xl mb-3 text-[#8B3A62] font-semibold">
//                         Your Message
//                       </h3>

//                       <div className="p-4 bg-[#FFF8F6] rounded-xl border border-dashed">
//                         <p className="text-gray-700 italic text-sm sm:text-base">
//                           {customMessage}
//                         </p>
//                       </div>
//                     </div>
//                   )}

//                   {/* TOTAL */}
//                   <div className="border-t pt-4 flex items-center justify-between">
//                     <span className="text-lg sm:text-2xl font-semibold text-[#8B3A62]">
//                       Total
//                     </span>

//                     <span className="text-xl sm:text-3xl font-bold text-[#8B3A62]">
//                       ₹{calculateTotal().toFixed(2)}
//                     </span>
//                   </div>
//                 </div>
//             </div>
//             )}

//           </motion.div>
//         </AnimatePresence>

//         {/* BUTTONS */}      
//       <div className="flex justify-center gap-4 mt-6">

//         {/* PREV */}
//         <button
//           onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
//           className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-[#8B3A62] text-[#8B3A62] hover:bg-[#F7E3DC]"
//         >
//           Prev
//         </button>

//         {/* NEXT / ADD TO CART */}
//         {currentStep < 4 ? (
//           <button
//             onClick={() => {
//               if (canProceed()) {
//                 setCurrentStep((prev) => prev + 1);
//               }
//             }}
//             disabled={!canProceed()}
//             className={`w-full sm:w-auto flex items-center justify-center gap-2
//               px-6 py-2.5 rounded-lg transition-all
//               ${
//                 canProceed()
//                   ? "bg-[#8B3A62] text-white hover:shadow-md"
//                   : "bg-gray-200 text-gray-400 cursor-not-allowed"
//               }`}
//           >
//             Next
//           </button>
//         ) : (
//           <button
//             onClick={() => {
//               console.log("Add to Cart clicked");
//               // 👉 your cart logic here
//             }}
//             disabled={!selectedBoxData || selectedItemsData.length === 0}
//             className={`w-full sm:w-auto flex items-center justify-center gap-2
//               px-6 py-2.5 rounded-lg transition-all
//               ${
//                 selectedBoxData && selectedItemsData.length > 0
//                   ? "bg-[#8B3A62] text-white hover:shadow-md"
//                   : "bg-gray-200 text-gray-400 cursor-not-allowed"
//               }`}
//           >
//             Add to Cart
//           </button>
//         )}
//       </div>
//       </div>

//       {/* DESKTOP SIDEBAR */}
// <motion.div
//   initial={{ x: 100, opacity: 0 }}
//   animate={{ x: 0, opacity: 1 }}
//   className="hidden lg:block fixed right-6 top-24 w-80 bg-white rounded-2xl shadow-xl p-6 border"
//   style={{ maxHeight: "calc(100vh - 6rem)", overflowY: "auto" }}
// >
//   <OrderSummaryContent />
// </motion.div>

// {/* ✅ mobile view summary page */}
// <div className="lg:hidden w-full mt-6">
//   <div className="bg-white shadow-md border-t border-b p-5">

//     <h3 className="text-lg font-semibold mb-4 text-[#8B3A62]">
//       Order Summary
//     </h3>

//     {/* BOX */}
//     <div className="flex justify-between text-sm mb-2">
//       <span className="text-gray-600">Box</span>
//       <span className="font-medium">
//         {selectedBoxData?.name || "Not selected"}
//       </span>
//     </div>

//     {/* ITEMS */}
//     <div className="mb-3">
//       <p className="text-sm text-gray-600 mb-1">
//         Items ({selectedItemsData.length})
//       </p>

//       {selectedItemsData.length > 0 ? (
//         selectedItemsData.slice(0, 3).map((item) => (
//           <div key={item.id} className="flex justify-between text-sm">
//             <span className="truncate">{item.title}</span>
//             <span className="text-[#8B3A62] font-medium">
//               ₹{item.price}
//             </span>
//           </div>
//         ))
//       ) : (
//         <p className="text-gray-400 text-sm">No items selected</p>
//       )}
//     </div>

//     {/* MESSAGE */}
//     <div className="flex justify-between text-sm mb-3">
//       <span className="text-gray-600">Message</span>
//       <span
//             className={`text-xs px-2 py-1 rounded ${
//               customMessage
//                 ? "bg-green-100 text-green-700"
//                 : "bg-gray-100 text-gray-500"
//             }`}
//           >
//             {customMessage ? "Added" : "Optional"}
//           </span>
//     </div>

//     {/* TOTAL */}
//     <div className="border-t pt-3 flex justify-between font-semibold text-[#8B3A62]">
//       <span>Total</span>
//       <span>₹{calculateTotal().toFixed(2)}</span>
//     </div>

//   </div>
// </div>
//     </div>
//   );

// //Order summary box for selected item
// function OrderSummaryContent() {
    
//   return (
//     <>
//       <h3 className="text-2xl font-semibold mb-6 text-[#8B3A62] mt-14">
//         Order Summary
//       </h3>

//       <div className="space-y-5 mb-6">

//         {/* BOX */}
//         <div className="pb-4 border-b">
//           <p className="text-sm font-semibold text-gray-700 mb-2">
//             Gift Box
//           </p>

//           {selectedBoxData ? (
//             <div className="flex justify-between text-sm">
//               <span className="text-gray-600">
//                 {selectedBoxData.name}
//               </span>
//               <span className="font-semibold text-[#8B3A62]">
//                 ₹{selectedBoxData.price}
//               </span>
//             </div>
//           ) : (
//             <p className="text-gray-400 italic text-sm">
//               Not selected
//             </p>
//           )}
//         </div>

//         {/* ITEMS */}
//         <div className="pb-4 border-b">
//           <div className="flex justify-between mb-2">
//             <span className="text-sm font-semibold text-gray-700">
//               Items
//             </span>

//             <span className="text-xs bg-[#F7E3DC] px-2 py-1 rounded text-[#8B3A62]">
//               {selectedItemsData.length} selected
//             </span>
//           </div>

//           {selectedItemsData.length > 0 ? (
//             <div className="space-y-2">
//               {selectedItemsData.slice(0, 3).map((item) => (
//                 <div key={item.id} className="flex justify-between text-sm">
//                   <span className="truncate">{item.title}</span>
//                   <span className="text-[#8B3A62] font-medium">
//                     ₹{item.price}
//                   </span>
//                 </div>
//               ))}

//               {selectedItemsData.length > 3 && (
//                 <p className="text-xs text-gray-400 italic">
//                   +{selectedItemsData.length - 3} more items
//                 </p>
//               )}
//             </div>
//           ) : (
//             <p className="text-gray-400 italic text-sm">
//               No items selected
//             </p>
//           )}
//         </div>

//         {/* MESSAGE */}
//         <div className="pb-4 border-b flex justify-between">
//           <span className="text-sm font-semibold text-gray-700">
//             Message
//           </span>

//           <span
//             className={`text-xs px-2 py-1 rounded ${
//               customMessage
//                 ? "bg-green-100 text-green-700"
//                 : "bg-gray-100 text-gray-500"
//             }`}
//           >
//             {customMessage ? "Added" : "Optional"}
//           </span>
//         </div>
//       </div>

//       {/* TOTAL */}
//       <div className="pt-4 border-t">
//         <div className="flex justify-between items-center mb-3">
//           <span className="text-lg font-semibold text-[#8B3A62]">
//             Total
//           </span>

//           <span className="text-xl font-bold text-[#8B3A62]">
//             ₹{calculateTotal().toFixed(2)}
//           </span>
//         </div>

//         <div className="bg-[#FFF8F6] text-center text-xs text-gray-600 p-3 rounded-lg">
//           Free shipping on orders above ₹999
//         </div>
//       </div>
//     </>
//   );
// }
// }


// import { useState,useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Check,
//   Gift,
//   Package,
//   MessageSquare,
//   ShoppingCart,
//   ChevronDown,
//   X,
// } from "lucide-react";

// import ProductCard from "../components/ProductCard";
// import OrderSummaryContent from "../components/Ordersummarycard";
// import { useDispatch, useSelector } from "react-redux";
// import FilterSidebar from "../components/Filtersidebar";
// import { useLocation, useNavigate } from "react-router-dom";
// import { addtoCart, updateCartItem } from "../features/cart/cartSlice";

// /* ─── palette constants ──────────────────────────────────────── */
// const ROSE      = "#C2556A";
// const PEACH     = "#E8956D";
// const MULBERRY  = "#3B2A35";
// const CREAM     = "#FEF9F5";
// const BLUSH_BG  = "linear-gradient(135deg,#FFF0F3,#FFF6EC)";
// const CTA_BG    = "linear-gradient(135deg,#C2556A,#E8956D)";

// export default function StepProgress() {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [selectedBox, setSelectedBox] = useState(null);
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [customMessage, setCustomMessage] = useState("");

//   // ✅ FILTER STATES
//   const [mainCategory, setMainCategory] = useState("All");
//   const [subCategory, setSubCategory] = useState("All");
//   const [showFilters, setShowFilters] = useState(false);
//   const [rating, setRating] = useState(0);

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const { editMode, hamperData, hamperIndex } = location.state || {};
//   const {fromCart,cartItems} = location.state || {};

//   // ✅ STEPS
//   const steps = [
//     { number: 1, title: "Select Box", icon: Package },
//     { number: 2, title: "Choose Items", icon: Gift },
//     { number: 3, title: "Add Message", icon: MessageSquare },
//     { number: 4, title: "Checkout", icon: ShoppingCart },
//   ];

//   // ✅ BOXES
//    const boxes = [
//     {
//       id: "small",
//       name: "Small Box",
//       size: '8" x 6"',
//       capacity: "3-5 items",
//       price: 200,
//       image: "https://images.unsplash.com/photo-1759563871371-eb0ec31824a6?w=400",
//     },
//     {
//       id: "medium",
//       name: "Medium Box",
//       size: '12" x 8"',
//       capacity: "6-10 items",
//       price: 300,
//       image: "https://images.unsplash.com/photo-1759563871371-eb0ec31824a6?w=400",
//     },
//     {
//       id: "Large",
//       name: "Large Box",
//       size: '16" x 8"',
//       capacity: "15-20 items",
//       price: 1000,
//       image: "https://images.unsplash.com/photo-1759563871371-eb0ec31824a6?w=400",
//     },
//     {
//       id: "Premium Box",
//       name: "Premium Box",
//       size: '20" x 10"',
//       capacity: "20-35 items",
//       price: 2000,
//       image: "https://images.unsplash.com/photo-1759563871371-eb0ec31824a6?w=400",
//     },
    
//   ];

//   // ✅ CATEGORY MAP
//   const categoryMap = {
//     Occasion: ["Birthday", "Anniversary", "Wedding","Baby shower","Graduation","House warming","Engagement","Get Well Soon"],
//     Recipients: ["For Him", "For Her", "Kids","parents","couples","corporate gifts"],
//     Festival: ["Christmas", "Diwali","New Year","Valentines Day","Mothers Day","Fathers Day"],
//     GiftType: ["Luxury","HomeDecor","NamePlates","Stationary", "Handmade", "Chocolate Hamper", "Snack Hamper", "Dry Fruit Hamper", "Coffee & Tea", "Self Care", "Personalized", "Wellness"],
//     };

//   // ✅ PRODUCTS (IMPORTANT: FULL DATA)
//   const products = useSelector((state) => state.products.items);

//   // ✅ FILTER LOGIC
//   const [tempFilters, setTempFilters] = useState({});
//   const [appliedFilters, setAppliedFilters] = useState({});
//   const [priceRange, setPriceRange] = useState([0, 5000]);
//   const handleFilterChange = (category, value) => {
//   setTempFilters((prev) => {
//     const current = prev[category] || [];

//     if (current.includes(value)) {
//       return {
//         ...prev,
//         [category]: current.filter((v) => v !== value),
//       };
//     } else {
//       return {
//         ...prev,
//         [category]: [...current, value],
//       };
//     }
//   });
// };

//   const matchesFilter = (product, value) => {
//   const val = value.toLowerCase();

//   return (
//     product.subCategory?.toLowerCase() === val ||
//     product.mainCategory?.toLowerCase() === val ||
//     product.giftTypes?.some(
//       (type) => type.toLowerCase() === val
//     )
//   );
// };

//   const selectedValues = Object.values(appliedFilters).flat().map((v) => v.toLowerCase());
//   // const filteredProducts = products.filter((p) => {
//   // const productSub = p.subCategory?.toLowerCase();
//   // const categoryMatch =
//   //   selectedValues.length === 0 ||
//   //   selectedValues.includes(productSub);

//   // const priceMatch =
//   //   p.price >= priceRange[0] && p.price <= priceRange[1];

//   // return categoryMatch && priceMatch;
//   // });

//   // STRICT FILTER (AND logic)
// let filteredProducts = products.filter((product) =>{
//   const filterMatch =
//     selectedValues.length === 0 ||
//     selectedValues.every((value) => matchesFilter(product, value));

//   const priceMatch =
//     product.price >= priceRange[0] &&
//     product.price <= priceRange[1];

//   const ratingMatch =
//     rating === 0 || product.rating >= rating;

//   return filterMatch && priceMatch && ratingMatch;
// });

// // //  FALLBACK → if nothing found → OR logic
// // if (filteredProducts.length === 0 && selectedValues.length > 0) {
// //   filteredProducts = products.filter((product) =>
// //     selectedValues.some((value) => matchesFilter(product, value))
// //   );
// // }

// // //  PRICE FILTER
// // filteredProducts = filteredProducts.filter(
// //   (p) =>
// //     p.price >= priceRange[0] &&
// //     p.price <= priceRange[1]
// // );
  
//   const stepRefs = useRef([]);

//     useEffect(() => {
//       if (stepRefs.current[currentStep - 1]) {
//         stepRefs.current[currentStep - 1].scrollIntoView({
//           behavior: "smooth",
//           inline: "center",
//           block: "nearest",
//         });
//       }
//     }, [currentStep]);

//  useEffect(() => {
//   if (fromCart && cartItems && currentStep === 2) {
//     const ids = cartItems
//       .filter(item => item.type !== "hamper") // ✅ IMPORTANT
//       .map(item => item.id);

//     setSelectedItems(ids);
//   }
// }, [fromCart, cartItems, currentStep]);

// useEffect(() => {
//   if (editMode && hamperData) {
//     // Set box
//     setSelectedBox(
//       boxes.find((b) => b.name === hamperData.box?.name)?.id
//     );

//     // Set items
//     const ids = hamperData.items.map((item) => item.id);
//     setSelectedItems(ids);

//     // Set message
//     setCustomMessage(hamperData.message || "");

//     // Go to last step
//     setCurrentStep(4);
//   }
// }, [editMode, hamperData]);


//   // ✅ SELECT ITEM
//   const toggleItem = (id) => {
//     setSelectedItems((prev) =>
//       prev.includes(id)
//         ? prev.filter((i) => i !== id)
//         : [...prev, id]
//     );
//   };

//   const canProceed = () => {
//   if (currentStep === 1) return selectedBox !== null;
//   if (currentStep === 2) return selectedItems.length > 0;
//   return true;
// };

// useEffect(() => {
//   setTempFilters({});
//   setAppliedFilters({});
// }, [mainCategory, subCategory]);

// //order summary
// const selectedBoxData = boxes.find((b) => b.id === selectedBox);

// // const validSelectedItems = selectedItems.filter(id =>
// //   products.some(p => p.id === id)
// // );

// const selectedItemsData = selectedItems
//   .map((id) => products.find((p) => p.id === id))
//   .filter(Boolean);

//   const calculateTotal = () => {
//   const boxPrice = selectedBoxData?.price || 0;

//   const itemsTotal = selectedItemsData.reduce(
//     (sum, item) => sum + item.price,
//     0
//   );

//   return boxPrice + itemsTotal;
// };
  
//   return (
//     <div className="min-h-screen bg-gray-50 w-full">
//       <div className="w-full px-4 py-6">

//         {/* HEADER */}
//         <div className="text-center mb-10">
//           <h1 className="text-4xl font-bold text-[#8B3A62]">
//             Build Your Custom Hamper
//           </h1>
//           <p className="text-gray-600">Create a personalized gift hamper</p>
//         </div>


//         {/* STEP PROGRESS */}   
//         <div className="mb-10 overflow-x-auto">
//         <div className="flex items-center justify-start md:justify-center w-full gap-4 px-2">

//         {steps.map((step, index) => (
//           <div
//             key={step.number}
//             ref={(el) => (stepRefs.current[index] = el)}
//             className="flex items-center flex-shrink-0"
//           >

//             {/* STEP ITEM */}
//             <div className="flex flex-col items-center w-20 mt-3">

//               {/* CIRCLE */}
//               <div
//                 className={`w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
//                   currentStep >= step.number
//                     ? "bg-[#8B3A62] text-white"
//                     : "bg-gray-200"
//                 } ${
//                   currentStep === step.number
//                     ? "scale-110 shadow-lg"
//                     : ""
//                 }`}
//               >
//                 {currentStep > step.number ? (
//                   <Check className="w-4 h-4 md:w-5 md:h-5" />
//                 ) : (
//                   <step.icon className="w-4 h-4 md:w-5 md:h-5" />
//                 )}
//               </div>

//               {/* TEXT */}
//               <span className="text-xs md:text-sm mt-1 text-center">
//                 {step.title}
//               </span>
//             </div>

//             {/* LINE */}
//             {index < steps.length - 1 && (
//               <div className="w-6 md:w-10 h-1 bg-gray-300 mx-1 md:mx-2" />
//             )}
//           </div>
//         ))}
//         </div>
//       </div>

//         {/* STEP CONTENT */}
//       <AnimatePresence mode="wait">
//       <motion.div key={currentStep}>

//           {/* STEP 1: Select Box */}
// {currentStep === 1 && (
//   <div>
//     <h2 className="text-3xl text-center mt-8 mb-8 text-[#8B3A62]">
//       Choose Your Gift Box
//     </h2>

//     {/* ✅ MAIN LAYOUT */}
//     <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

//       {/* 🔹 LEFT SIDE (BOXES) */}
//       <div className="lg:col-span-3">
//         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
//           {boxes.map((box) => (
//             <motion.div
//               key={box.id}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() => setSelectedBox(box.id)}
//               className={`bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-all ${
//                 selectedBox === box.id ? "ring-4 ring-[#8B3A62]" : ""
//               }`}
//             >
//               <div className="relative h-48 bg-[#F7E3DC]">
//                 <img
//                   src={box.image}
//                   alt={box.name}
//                   className="w-full h-full object-cover opacity-80"
//                 />

//                 {selectedBox === box.id && (
//                   <div className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white bg-[#8B3A62]">
//                     <Check className="w-5 h-5" />
//                   </div>
//                 )}
//               </div>

//               <div className="p-6">
//                 <h3 className="text-xl mb-2 text-[#8B3A62]">{box.name}</h3>
//                 <p className="text-sm text-gray-600 mb-1">Size: {box.size}</p>
//                 <p className="text-sm text-gray-600 mb-3">Capacity: {box.capacity}</p>
//                 <p className="text-2xl text-[#8B3A62] font-semibold">₹ {box.price.toFixed(2)}</p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       {/* 🔹 RIGHT SIDE (ORDER SUMMARY) */}
//       <div className="hidden lg:block lg:col-span-1 ">
//         <div className="sticky top-28">
//           <OrderSummaryContent
//             selectedBoxData={selectedBoxData}
//             selectedItemsData={selectedItemsData}
//             customMessage={customMessage}
//             calculateTotal={calculateTotal}
//           />
//         </div>
//       </div>

//     </div>
//   </div>
// )}

//      {currentStep === 2 && (
//               <div>
//                 <div className="text-center mb-8 mt-8">
//                   <h2 className="text-3xl text-[#8B3A62] mb-2">Select Your Items</h2>
//                   {fromCart && (
//                     <p className="text-sm text-green-600 text-center mb-4">
//                       Items from your cart are already selected 🎁
//                     </p>
//                   )}
//                   <p className="text-gray-600">Selected: {selectedItemsData.length} items</p>
//                 </div>

//                 {/* MOBILE FILTER BUTTON */}
//                 <button
//                   onClick={() => setShowFilters(true)}
//                   className="lg:hidden bg-[#8B3A62] text-white px-4 py-2 rounded mb-4"
//                 >
//                   Filters
//                 </button>

//                 {/* MOBILE OVERLAY */}
//                 {showFilters && (
//                   <div
//                     className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
//                     onClick={() => setShowFilters(false)}
//                   />
//                 )}

//                 {/* MOBILE SIDEBAR */}
//                 <div
//                   className={`fixed top-0 left-0 h-full w-72 bg-white z-50 transform transition-transform duration-300 lg:hidden ${
//                     showFilters ? "translate-x-0" : "-translate-x-full"
//                   }`}
//                 >
//                   <div className="h-full flex flex-col">
//                     <div className="flex justify-between items-center p-4 border-b">
//                       <h3 className="font-semibold text-lg">Filters</h3>
//                       <button onClick={() => setShowFilters(false)}>
//                         <X size={20} />
//                       </button>
//                     </div>
//                     <div className="overflow-y-auto flex-1">
//                       <FilterSidebar
//                         isOpen={showFilters}
//                         onClose={() => setShowFilters(false)}
//                         categoryMap={categoryMap}
//                         tempFilters={tempFilters}
//                         setTempFilters={setTempFilters}
//                         priceRange={priceRange}
//                         setPriceRange={setPriceRange}
//                         rating={rating}
//                         setRating={setRating}
//                         onApply={() => {
//                           setAppliedFilters(tempFilters);
//                           setShowFilters(false);
//                         }}
//                         onClear={() => {
//                           setTempFilters({});
//                           setAppliedFilters({});
//                           setPriceRange([0, 5000]);
//                         }}
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* MAIN 3-COLUMN LAYOUT */}
//                 <div className="flex gap-3 items-start w-full">

//                   {/* DESKTOP FILTER SIDEBAR */}
//                   <div className="hidden lg:flex flex-col w-56 flex-shrink-0 sticky top-36 h-fit max-h-[calc(200vh-6rem)] overflow-y-auto"
//                     >
//                   <div className="bg-white border border-gray-200 rounded-xl p-4">
//                     <FilterSidebar
//                       isOpen={true}
//                       categoryMap={categoryMap}
//                       tempFilters={tempFilters}
//                       setTempFilters={setTempFilters}
//                       priceRange={priceRange}
//                       setPriceRange={setPriceRange}
//                       rating={rating}
//                       setRating={setRating}
//                       onApply={() => setAppliedFilters(tempFilters)}
//                       onClear={() => {
//                         setTempFilters({});
//                         setAppliedFilters({});
//                         setPriceRange([0, 5000]);
//                       }}
//                     />
//                   </div>
//                   </div>

//                   {/* PRODUCTS */}
//                   <div className="flex-1 min-w-0 bg-white border border-gray-200  p-4">
//                     {filteredProducts.length === 0 ? (
//                       <p className="text-center text-gray-500 mt-10">No products found</p>
//                     ) : (
//                       <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
//                         {filteredProducts.map((item) => {
//                           const isSelected = selectedItems.includes(item.id);
//                           return (
//                             <ProductCard
//                               key={item.id}
//                               {...item}
//                               showSelect={true}
//                               isSelected={isSelected}
//                               onSelect={toggleItem}
//                             />
//                           );
//                         })}
//                       </div>
//                     )}
//                   </div>

//       {/* ORDER SUMMARY */}
//       <div className="hidden lg:flex flex-col w-64 flex-shrink-0 self-start sticky top-36"
//        style={{ maxHeight: "calc(100vh - 2rem)", overflowY: "auto" }}>
//           <OrderSummaryContent
//             selectedBoxData={selectedBoxData}
//             selectedItemsData={selectedItemsData}
//             customMessage={customMessage}
//             calculateTotal={calculateTotal}
//           />
//         </div>
//       </div>
//     </div>
  
// )}

//             {/* STEP 3 */}
//             {/* {currentStep === 3 && (  //SIMPLE MESSAGE BOX
//               <textarea
//                 className="w-full border p-4"
//                 placeholder="Message..."
//                 value={customMessage}
//                 onChange={(e) => setCustomMessage(e.target.value)}
//               />
//             )} */}
//             {currentStep === 3 && (
//   <div>
//     <h2 className="text-3xl text-center mt-8 mb-8 text-[#8B3A62]">
//       Add a Personal Message
//     </h2>

//     {/* ✅ MAIN LAYOUT (same as Step 1) */}
//     <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

//       {/*  LEFT SIDE (MESSAGE + PREVIEW) */}
//       <div className="lg:col-span-3">
//         <div className="max-w-3xl mx-auto">

//           <div className="bg-white rounded-xl shadow-md p-8">
            
//             <div className="mb-6">
//               <label className="block text-lg mb-3 text-[#8B3A62]">
//                 Your Message (Optional)
//               </label>

//               <textarea
//                 value={customMessage}
//                 onChange={(e) => setCustomMessage(e.target.value)}
//                 placeholder="Write a heartfelt message..."
//                 rows={6}
//                 maxLength={250}
//                 className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B3A62] resize-none"
//               />

//               <p className="text-sm text-gray-500 mt-2 text-right">
//                 {customMessage?.length || 0}/250 characters
//               </p>
//             </div>

//             {/* Preview */}
//             <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-[#FFF8F6]">
//               <h3 className="text-lg mb-3 text-[#8B3A62]">
//                 Preview
//               </h3>

//               <div className="bg-white rounded-lg p-6 shadow-sm">
//                 <div className="mb-4 pb-4 border-b border-gray-200">
//                   <Gift className="w-8 h-8 mb-2 text-[#D4AF37]" />
//                 </div>

//                 <p className="text-gray-700 italic min-h-[60px]">
//                   {customMessage || "Your message will appear here..."}
//                 </p>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>

//       {/* 🔹 RIGHT SIDE (ORDER SUMMARY - SAME AS STEP 1) */}
//       <div className="hidden lg:block lg:col-span-1">
//         <div className="sticky top-28">
//           <OrderSummaryContent
//             selectedBoxData={selectedBoxData}
//             selectedItemsData={selectedItemsData}
//             customMessage={customMessage}
//             calculateTotal={calculateTotal}
//           />
//         </div>
//       </div>

//     </div>
//   </div>
// )}
            
  
//     {currentStep === 4 && (
//   <div>
//     <h2 className="text-2xl sm:text-3xl text-center mb-6 sm:mb-8 text-[#8B3A62]">
//       Review Your Custom Hamper
//     </h2>

//     {/* ✅ MAIN LAYOUT */}
//     <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

//       {/* 🔹 LEFT SIDE (REVIEW CONTENT) */}
//       <div className="lg:col-span-3">
//         <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 space-y-6">

//           {/* BOX */}
//           <div>
//             <h3 className="text-lg sm:text-xl mb-3 text-[#8B3A62] font-semibold">
//               Selected Box
//             </h3>

//             {selectedBox ? (
//               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-[#F7E3DC] rounded-xl">

//                 <div>
//                   <p className="font-semibold text-sm sm:text-base">
//                     {boxes.find(b => b.id === selectedBox)?.name}
//                   </p>
//                   <p className="text-xs sm:text-sm text-gray-600">
//                     {boxes.find(b => b.id === selectedBox)?.size}
//                   </p>
//                 </div>

//                 <p className="text-lg sm:text-xl font-semibold text-[#8B3A62]">
//                   ₹ {boxes.find(b => b.id === selectedBox)?.price.toFixed(2)}
//                 </p>

//               </div>
//             ) : (
//               <p className="text-gray-400 text-sm">No box selected</p>
//             )}
//           </div>

//           {/* ITEMS */}
//           <div>
//             <h3 className="text-lg sm:text-xl mb-3 text-[#8B3A62] font-semibold">
//               Selected Items ({selectedItems.length})
//             </h3>

//             {selectedItems.length > 0 ? (
//               <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
//                 {selectedItems.map((itemId) => {
//                   const item = products.find((i) => i.id === itemId);

//                   return item ? (
//                     <div
//                       key={item.id}
//                       className="flex items-center justify-between gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl"
//                     >
//                       <div className="flex items-center gap-3">
//                         <img
//                           src={item.image}
//                           alt={item.title}
//                           className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg"
//                         />

//                         <div>
//                           <p className="font-medium text-sm sm:text-base">
//                             {item.title}
//                           </p>
//                           <p className="text-xs sm:text-sm text-gray-500">
//                             {item.subCategory}
//                           </p>
//                         </div>
//                       </div>

//                       <p className="text-sm sm:text-lg font-semibold text-[#8B3A62]">
//                         ₹{item.price}
//                       </p>
//                     </div>
//                   ) : null;
//                 })}
//               </div>
//             ) : (
//               <p className="text-gray-400 text-sm">No items selected</p>
//             )}
//           </div>

//           {/* MESSAGE */}
//           {customMessage && (
//             <div>
//               <h3 className="text-lg sm:text-xl mb-3 text-[#8B3A62] font-semibold">
//                 Your Message
//               </h3>

//               <div className="p-4 bg-[#FFF8F6] rounded-xl border border-dashed">
//                 <p className="text-gray-700 italic text-sm sm:text-base">
//                   {customMessage}
//                 </p>
//               </div>
//             </div>
//           )}

//           {/* TOTAL */}
//           <div className="border-t pt-4 flex items-center justify-between">
//             <span className="text-lg sm:text-2xl font-semibold text-[#8B3A62]">
//               Total
//             </span>

//             <span className="text-xl sm:text-3xl font-bold text-[#8B3A62]">
//               ₹{calculateTotal().toFixed(2)}
//             </span>
//           </div>

//         </div>
//       </div>

//       {/* 🔹 RIGHT SIDE (STICKY ORDER SUMMARY) */}
//       <div className="hidden lg:block lg:col-span-1">
//         <div className="sticky top-28">
//           <OrderSummaryContent
//             selectedBoxData={selectedBoxData}
//             selectedItemsData={selectedItemsData}
//             customMessage={customMessage}
//             calculateTotal={calculateTotal}
//           />
//         </div>
//       </div>

//     </div>
//   </div>
// )}

//           </motion.div>
//         </AnimatePresence>

//         {/* BUTTONS */}      
//       <div className="flex justify-center gap-4 mt-6">

//         {/* PREV */}
//         <button
//           onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
//           className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-[#8B3A62] text-[#8B3A62] hover:bg-[#F7E3DC]"
//         >
//           Prev
//         </button>

//         {/* NEXT / ADD TO CART */}
//         {/* {currentStep < 4 ? (
//           <button
//             onClick={() => {
//               if (canProceed()) {
//                 setCurrentStep((prev) => prev + 1);
//               }
//             }}
//             disabled={!canProceed()}
//             className={`w-full sm:w-auto flex items-center justify-center gap-2
//               px-6 py-2.5 rounded-lg transition-all
//               ${
//                 canProceed()
//                   ? "bg-[#8B3A62] text-white hover:shadow-md"
//                   : "bg-gray-200 text-gray-400 cursor-not-allowed"
//               }`}
//           >
//             Next
//           </button>
//         ) : (
//           <button
//             onClick={() => {
//               console.log("Add to Cart clicked");
//               // 👉 your cart logic here
//             }}
//             disabled={!selectedBoxData || selectedItemsData.length === 0}
//             className={`w-full sm:w-auto flex items-center justify-center gap-2
//               px-6 py-2.5 rounded-lg transition-all
//               ${
//                 selectedBoxData && selectedItemsData.length > 0
//                   ? "bg-[#8B3A62] text-white hover:shadow-md"
//                   : "bg-gray-200 text-gray-400 cursor-not-allowed"
//               }`}
//           >
//             Add to Cart
//           </button>
//         )} */}

//         {currentStep < 4 ? (
//           <button
//             onClick={() => {
//               if (canProceed()) {
//                 setCurrentStep((prev) => prev + 1);
//               }
//             }}
//             disabled={!canProceed()}
//             className={`w-full sm:w-auto flex items-center justify-center gap-2
//               px-6 py-2.5 rounded-lg transition-all
//               ${
//                 canProceed()
//                   ? "bg-[#8B3A62] text-white hover:shadow-md"
//                   : "bg-gray-200 text-gray-400 cursor-not-allowed"
//               }`}
//           >
//             Next
//           </button>
//         ) : (
//           <button
//             onClick={() => {
//               const hamperItem = {
//                 id: editMode ? hamperData.id : Date.now(),
//                 type: "hamper",

//                 box: {
//                   name: selectedBoxData?.name,
//                   price: selectedBoxData?.price,
//                 },

//                 items: selectedItemsData,

//                 message: customMessage,

//                 totalPrice: calculateTotal(), // ✅ FIXED
//               };

//               if (editMode) {
//                 dispatch(updateCartItem({
//                   index: hamperIndex,
//                   item: hamperItem,
//                 }));
//               } else {
//                 dispatch(addtoCart(hamperItem));
//               }

//               navigate("/cart");
//             }}
// //   disabled={!selectedBoxData || selectedItemsData.length === 0}
// //   className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#8B3A62] text-white"
// // >
// //   {editMode ? "Update Hamper" : "Add to Cart"}
  
//            disabled={
//               fromCart || !selectedBoxData || selectedItemsData.length === 0
//             }
//             className={`w-full sm:w-auto flex items-center justify-center gap-2
//               px-6 py-2.5 rounded-lg transition-all
//               ${
//                 fromCart
//                   ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                   : selectedBoxData && selectedItemsData.length > 0
//                   ? "bg-[#8B3A62] text-white hover:shadow-md"
//                   : "bg-gray-200 text-gray-400 cursor-not-allowed"
//               }`}
//           >
//             {fromCart ? "Already in cart" : "Add to Cart"}
//           </button>

//         )}
//       </div>
//       </div>

//       {/* DESKTOP SIDEBAR
// <motion.div
//   initial={{ x: 100, opacity: 0 }}
//   animate={{ x: 0, opacity: 1 }}
//   className="hidden lg:block fixed right-6 top-24 w-80 bg-white rounded-2xl shadow-xl p-6 border"
//   style={{ maxHeight: "calc(100vh - 6rem)", overflowY: "auto" }}
// >
//   <OrderSummaryContent />
// </motion.div> */}

// {/* ✅ mobile view summary page */}
// <div className="lg:hidden w-full mt-6">
//   <div className="bg-white shadow-md border-t border-b p-5">

//     <h3 className="text-lg font-semibold mb-4 text-[#8B3A62]">
//       Order Summary
//     </h3>

//     {/* BOX */}
//     <div className="flex justify-between text-sm mb-2">
//       <span className="text-gray-600">Box</span>
//       <span className="font-medium">
//         {selectedBoxData?.name || "Not selected"}
//       </span>
//     </div>

//     {/* ITEMS */}
//     <div className="mb-3">
//       <p className="text-sm text-gray-600 mb-1">
//         Items ({selectedItemsData.length})
//       </p>

//       {selectedItemsData.length > 0 ? (
//         selectedItemsData.slice(0, 3).map((item) => (
//           <div key={item.id} className="flex justify-between text-sm">
//             <span className="truncate">{item.title}</span>
//             <span className="text-[#8B3A62] font-medium">
//               ₹{item.price}
//             </span>
//           </div>
//         ))
//       ) : (
//         <p className="text-gray-400 text-sm">No items selected</p>
//       )}
//     </div>

//     {/* MESSAGE */}
//     <div className="flex justify-between text-sm mb-3">
//       <span className="text-gray-600">Message</span>
//       <span
//             className={`text-xs px-2 py-1 rounded ${
//               customMessage
//                 ? "bg-green-100 text-green-700"
//                 : "bg-gray-100 text-gray-500"
//             }`}
//           >
//             {customMessage ? "Added" : "Optional"}
//           </span>
//     </div>

//     {/* TOTAL */}
//     <div className="border-t pt-3 flex justify-between font-semibold text-[#8B3A62]">
//       <span>Total</span>
//       <span>₹{calculateTotal().toFixed(2)}</span>
//     </div>

//   </div>
// </div>
//     </div>
//   );

// function OrderSummaryContent({
//   selectedBoxData,
//   selectedItemsData,
//   customMessage,
//   calculateTotal,
// }) {
//   return (
//     <div className="bg-white rounded-2xl shadow-sm p-5 border border-rose-100 space-y-5 overflow-hidden">
      
//       {/* TITLE */}
//       <div className="px-4 py-3 border-b border-rose-50 flex items-center gap-2" style={{ background: BLUSH_BG }}>
//       <h3 className="text-lg font-semibold text-gray-800 border-b pb-3">
//         Order Summary
//       </h3>
//       </div>

//       {/* BOX */}
//       <div className="px-4 py-4 space-y-4 text-sm border-b">
        
//         <p className="text-sm font-semibold text-gray-700 mb-2">
//           Gift Box
//         </p>

//         {selectedBoxData ? (
//           <div className="flex items-center justify-between bg-[#FEF9F5] border border-rose-100 rounded-xl px-3 py-2">
//             <span className="text-gray-600 truncate max-w-[140px]">
//               {selectedBoxData.name}
//             </span>
//             <span className=" text-base font-bold text-[#C2556A]">
//               ₹{selectedBoxData.price}
//             </span>
//           </div>
//         ) : (
//           <p className="text-gray-400 italic px-1 text-xs">
//             Not selected
//           </p>
//         )}
//       </div>

//       {/* ITEMS */}
//       <div className="px-4 py-4  pb-4 border-b">
//         <div className="flex justify-between items-center mb-3">
//           <span className="text-sm font-semibold text-gray-700">
//             Items
//           </span>

//           <span className="bg-[#F7E3DC]  text-[#8B3A62] px-2 py-0.5 rounded normal-case text-xs">
//             {selectedItemsData.length} selected
//           </span>
//         </div>

//         {selectedItemsData.length > 0 ? (
//           <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
//             {selectedItemsData.slice(0, 4).map((item) => (
//               <div
//                 key={item.id}
//                 className="flex justify-between items-center text-sm gap-2"
//               >
//                 <span className="text-xs text-rose-900/60 truncate flex-1">
//                   {item.title}
//                 </span>

//                 <span className="text-xs shrink-0 text-[#8B3A62] font-medium">
//                   ₹{item.price}
//                 </span>
//               </div>
//             ))}

//             {selectedItemsData.length > 4 && (
//               <p className="text-[10px] text-rose-900/50 italic">+{selectedItemsData.length - 4} more items</p>
//             )}
//           </div>
//         ) : (
//           <p className="text-gray-400 italic px-1 text-xs">
//             No items selected
//           </p>
//         )}
//       </div>

//       {/* MESSAGE */}
//       <div className="px-4 py-4 pb-4 border-b flex justify-between items-center">
//         <span className="text-sm font-semibold text-gray-700">
//           Message
//         </span>

//         <span
//           className={`text-xs px-2 py-1 rounded ${
//             customMessage
//               ? "bg-green-100 text-green-700"
//               : "bg-gray-100 text-gray-500"
//           }`}
//         >
//           {customMessage ? "Added" : "Optional"}
//         </span>
//       </div>

//       {/* TOTAL */}
//       <div className="px-4 py-4 pt-2">
//         <div className="flex justify-between items-center mb-3">
//           <span className="text-lg font-semibold text-[#8B3A62]">
//             Total
//           </span>

//           <span className="text-xl font-extrabold text-[#C2556A]">
//             ₹{calculateTotal().toFixed(2)}
//           </span>
//         </div>

//         {/* INFO BOX */}
//         {/* <div className="bg-[#FFF8F6] text-center text-xs text-gray-600 p-3 rounded-lg">
//           Free shipping on orders above ₹999
//         </div> */}
//         {calculateTotal() >= 999 ? (
//           <div className="bg-[#F3FBF4] border border-green-100 rounded-xl px-3 py-2 text-xs font-semibold text-green-700 text-center">
//              You qualify for FREE delivery!
//           </div>
//         ) : (
//           <div className="bg-amber-50 border border-amber-100 rounded-xl px-3 py-2 text-xs text-amber-700 text-center">
//             Add ₹{(999 - calculateTotal()).toFixed(0)} more for free delivery 🚚
//           </div>
//         )}

//         {/* CTA BUTTON (Optional but recommended) */}
//         <button onClick={() => {
//               if (selectedItemsData.length > 0) {
//                 setCurrentStep(3);
              
//               }
//             }}
//           disabled={selectedItemsData.length === 0}
//           className={`mt-4 w-full py-2 rounded-lg transition
//             ${
//               selectedItemsData.length > 0
//                 ? "bg-[#8B3A62] text-white hover:opacity-90 cursor-pointer"
//                 : "bg-gray-300 text-gray-500 cursor-not-allowed"
//             }
//           `}
//         >
//           Proceed to Checkout
//         </button>
//       </div>
//     </div>
//   );
// }
// }



import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check, Gift, Package, MessageSquare, ShoppingCart,
  X, Sparkles, ChevronRight, Star, Trash2, Filter,
} from "lucide-react";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import FilterSidebar from "../components/Filtersidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { addtoCart, removeFromCart, updateCartItem } from "../features/cart/cartSlice";
import { toast } from "react-hot-toast";

/* ─── palette constants ──────────────────────────────────────── */
const ROSE      = "#C2556A";
const PEACH     = "#E8956D";
const MULBERRY  = "#3B2A35";
const CREAM     = "#FEF9F5";
const BLUSH_BG  = "linear-gradient(135deg,#FFF0F3,#FFF6EC)";
const CTA_BG    = "linear-gradient(135deg,#C2556A,#E8956D)";

/* ─── step config ────────────────────────────────────────────── */
const STEPS = [
  { number: 1, title: "Pick Box",    icon: Package      },
  { number: 2, title: "Add Items",   icon: Gift         },
  { number: 3, title: "Message",     icon: MessageSquare },
  { number: 4, title: "Review",      icon: ShoppingCart  },
];

/* ─── box options ────────────────────────────────────────────── */
const BOXES = [
  { id: "small",   name: "Small Box",   size: '8"×6"',   capacity: "3–5 items",   price: 200, image: "https://images.unsplash.com/photo-1759563871371-eb0ec31824a6?w=400"},
  { id: "medium",  name: "Medium Box",  size: '12"×8"',  capacity: "6–10 items",  price: 300,  image: "https://images.unsplash.com/photo-1759563871371-eb0ec31824a6?w=400" },
  { id: "large",   name: "Large Box",   size: '16"×8"',  capacity: "15–20 items", price: 1000, image: "https://images.unsplash.com/photo-1759563871371-eb0ec31824a6?w=400" },
  { id: "premium", name: "Premium Box", size: '20"×10"', capacity: "20–35 items", price: 2000, image: "https://images.unsplash.com/photo-1759563871371-eb0ec31824a6?w=400" },
];

const CATEGORY_MAP = {
  Occasion:   ["Birthday","Anniversary","Wedding","Baby shower","Graduation","Housewarming","Engagement","Get Well Soon"],
  Recipients: ["For Him","For Her","Kids","Parents","Couples","Corporate Gifts"],
  Festival:   ["Christmas","Diwali","New Year","Valentines Day","Mothers Day","Fathers Day"],
  GiftType:   ["Luxury","HomeDecor","NamePlates","Stationary","Handmade","Chocolate Hamper","Snack Hamper","Dry Fruit Hamper","Coffee & Tea","Self Care","Personalized","Wellness"],
};

/* ════════════════════════════════════════════════════════════════
   ORDER SUMMARY SIDEBAR
════════════════════════════════════════════════════════════════ */
function OrderSummary({
  selectedBoxData,
  selectedItemsData,
  customMessage,
  total,
  currentStep, 
  onProceed
}) {
  return (
   
    <div className="bg-white rounded-2xl shadow-sm p-5 border border-rose-100 space-y-5 overflow-hidden">
      
      {/* TITLE */}
      <div className="px-4 py-3 border-b border-rose-50 flex items-center gap-2" style={{ background: BLUSH_BG }}>
      <h3 className="text-lg font-semibold text-gray-800 border-b pb-3">
        Order Summary
      </h3>
      </div>

      {/* BOX */}
      <div className="px-4 py-4 space-y-4 text-sm border-b">
        
        <p className="text-sm font-semibold text-gray-700 mb-2">
          Gift Box
        </p>

        {selectedBoxData ? (
          <div className="flex items-center justify-between bg-[#FEF9F5] border border-rose-100 rounded-xl px-3 py-2">
            <span className="text-gray-600 truncate max-w-[140px]">
              {selectedBoxData.name}
            </span>
            <span className=" text-base font-bold text-[#C2556A]">
              ₹{selectedBoxData.price}
            </span>
          </div>
        ) : (
          <p className="text-gray-400 italic px-1 text-xs">
            Not selected
          </p>
        )}
      </div>

      {/* ITEMS */}
      <div className="px-4 py-4  pb-4 border-b">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-semibold text-gray-700">
            Items
          </span>

          <span className="bg-[#F7E3DC]  text-[#8B3A62] px-2 py-0.5 rounded normal-case text-xs">
            {selectedItemsData.length} selected
          </span>
        </div>

        {selectedItemsData.length > 0 ? (
          <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
            {selectedItemsData.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center text-sm gap-2"
              >
                <span className="text-xs text-rose-900/60 truncate flex-1">
                  {item.title}
                </span>

                <span className="text-xs shrink-0 text-[#8B3A62] font-medium">
                  ₹{item.price}
                </span>
              </div>
            ))}

            {selectedItemsData.length > 4 && (
              <p className="text-[10px] text-rose-900/50 italic">+{selectedItemsData.length - 4} more items</p>
            )}
          </div>
        ) : (
          <p className="text-gray-400 italic px-1 text-xs">
            No items selected
          </p>
        )}
      </div>

      {/* MESSAGE */}
      <div className="px-4 py-4 pb-4 border-b flex justify-between items-center">
        <span className="text-sm font-semibold text-gray-700">
          Message
        </span>

        <span
          className={`text-xs px-2 py-1 rounded ${
            customMessage
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {customMessage ? "Added" : "Optional"}
        </span>
      </div>

      {/* TOTAL */}
      <div className="px-4 py-4 pt-2">
        <div className="flex justify-between items-center mb-3">
          <span className="text-lg font-semibold text-[#8B3A62]">
            Total
          </span>

          <span className="text-xl font-extrabold text-[#C2556A]">
            ₹{total.toFixed(2)}
          </span>
        </div>

        {/* INFO BOX */}
        {/* <div className="bg-[#FFF8F6] text-center text-xs text-gray-600 p-3 rounded-lg">
          Free shipping on orders above ₹999
        </div> */}
        {total >= 999 ? (
          <div className="bg-[#F3FBF4] border border-green-100 rounded-xl px-3 py-2 text-xs font-semibold text-green-700 text-center">
             You qualify for FREE delivery!
          </div>
        ) : (
          <div className="bg-amber-50 border border-amber-100 rounded-xl px-3 py-2 text-xs text-amber-700 text-center">
            Add ₹{(999 - total).toFixed(0)} more for free delivery 🚚
          </div>
        )}

        {/* CTA BUTTON (Optional but recommended) */}
        <button onClick={() => {
              if (selectedItemsData.length > 0) {
                setCurrentStep(3);
              
              }
            }}
          disabled={selectedItemsData.length === 0}
          className={`mt-4 w-full py-2 rounded-lg transition
            ${
              selectedItemsData.length > 0
                ? "bg-[#8B3A62] text-white hover:opacity-90 cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }
          `}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════════════════════════════ */
export default function CustomHamperPage() {
  const [currentStep,    setCurrentStep]    = useState(1);
  const [selectedBox,    setSelectedBox]    = useState(null);
  const [selectedItems,  setSelectedItems]  = useState([]);
  const [customMessage,  setCustomMessage]  = useState("");
  const [showFilters,    setShowFilters]    = useState(false);
  const [tempFilters,    setTempFilters]    = useState({});
  const [appliedFilters, setAppliedFilters] = useState({});
  const [priceRange,     setPriceRange]     = useState([0, 5000]);
  const [rating,         setRating]         = useState(0);

  const navigate   = useNavigate();
  const dispatch   = useDispatch();
  const location   = useLocation();
  const stepRefs   = useRef([]);

  const { editMode, hamperData, hamperIndex } = location.state || {};
  const { fromCart, cartItems: fromCartItems } = location.state || {};

  const products = useSelector((state) => state.products.items);

  /* ── selected data ── */
  const selectedBoxData   = BOXES.find((b) => b.id === selectedBox) ?? null;
  const selectedItemsData = selectedItems.map((id) => products.find((p) => p.id === id)).filter(Boolean);

  // const calculateTotal = () =>
  //   (selectedBoxData?.price ?? 0) + selectedItemsData.reduce((s, i) => s + i.price, 0);
  const calculateTotal = () =>
  (selectedBoxData?.price ?? 0) +
  selectedItemsData.reduce((s, i) => s + (i.price || 0), 0);

  /* ── filter logic ── */
  const selectedValues = Object.values(appliedFilters).flat().map((v) => v.toLowerCase());
  const filteredProducts = products.filter((product) => {
    const filterMatch =
      selectedValues.length === 0 ||
      selectedValues.every((val) =>
        product.subCategory?.toLowerCase() === val ||
        product.mainCategory?.toLowerCase() === val ||
        product.giftTypes?.some((t) => t.toLowerCase() === val)
      );
    const priceMatch  = product.price >= priceRange[0] && product.price <= priceRange[1];
    const ratingMatch = rating === 0 || product.rating >= rating;
    return filterMatch && priceMatch && ratingMatch;
  });

  /* ── scroll active step into view ── */
  useEffect(() => {
    stepRefs.current[currentStep - 1]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [currentStep]);

  /* ── populate from cart ── */
  useEffect(() => {
    if (fromCart && fromCartItems && currentStep === 2) {
      setSelectedItems(fromCartItems.filter((i) => i.type !== "hamper").map((i) => i.id));
    }
  }, [fromCart, fromCartItems, currentStep]);

  /* ── edit mode init ── */
  useEffect(() => {
    if (editMode && hamperData) {
      const box = BOXES.find((b) => b.name === hamperData.box?.name);
      if (box) setSelectedBox(box.id);
      setSelectedItems((hamperData.items ?? []).map((i) => i.id));
      setCustomMessage(hamperData.message ?? "");
      setCurrentStep(4);
    }
  }, [editMode, hamperData]);

  useEffect(() => {
    setTempFilters({});
    setAppliedFilters({});
  }, []);

  const canProceed = () => {
    if (currentStep === 1) return selectedBox !== null;
    if (currentStep === 2) return selectedItems.length > 0;
    return true;
  };

  const goNext = () => canProceed() && setCurrentStep((p) => Math.min(4, p + 1));
  const goPrev = () => setCurrentStep((p) => Math.max(1, p - 1));

  // const handleAddToCart = () => {
  //   const hamperItem = {
  //     id:         editMode ? hamperData.id : Date.now(),
  //     type:       "hamper",
  //     box:        { name: selectedBoxData?.name, price: selectedBoxData?.price },
  //     items:      selectedItemsData,
  //     message:    customMessage,
  //     totalPrice: calculateTotal(),
  //   };

  //   if (editMode) {
  //     dispatch(updateCartItem({ index: hamperIndex, item: hamperItem }));
  //   } else {
  //     dispatch(addtoCart(hamperItem));
  //   }
  //   navigate("/cart");
  // };

//   const handleAddToCart = () => {
//   const itemsTotal = selectedItemsData.reduce(
//     (sum, item) => sum + (item.price || 0),
//     0
//   );

//   const boxPrice = selectedBoxData?.price || 0;

//   const totalPrice = itemsTotal + boxPrice;

//   const hamperItem = {
//     id: editMode ? hamperData.id : Date.now(),
//     type: "hamper",

//     box: {
//       name: selectedBoxData?.name,
//       price: boxPrice,
//     },

//     items: selectedItemsData,
//     message: customMessage,

//     quantity: 1,              // ✅ REQUIRED
//     price: totalPrice,        // ✅ BASE PRICE (IMPORTANT)
//     totalPrice: totalPrice,   // ✅ USED IN CART
//   };

//   if (editMode) {
//     dispatch(updateCartItem({ index: hamperIndex, item: hamperItem }));
//   } else {
//     dispatch(addtoCart(hamperItem));
//   }

//   navigate("/cart");
// };

const handleAddToCart = () => {
  const itemsTotal = selectedItemsData.reduce(
    (sum, item) => sum + (item.price || 0),
    0
  );

  const boxPrice = selectedBoxData?.price || 0;
  const totalPrice = itemsTotal + boxPrice;

  const hamperItem = {
    id: editMode ? hamperData.id : Date.now(),
    type: "hamper",
    box: {
      name: selectedBoxData?.name,
      price: boxPrice,
    },
    items: selectedItemsData,
    message: customMessage,
    quantity: 1,
    price: totalPrice,
    totalPrice: totalPrice,
  };

  // ✅ ADD HAMPER
  if (editMode) {
    dispatch(updateCartItem({ index: hamperIndex, item: hamperItem }));
  } else {
    dispatch(addtoCart(hamperItem));
  }

  // 🔥 REMOVE ORIGINAL ITEMS (VERY IMPORTANT)
  if (fromCart && fromCartItems) {
    // remove from last index → first (to avoid shifting issue)
    const sorted = [...fromCartItems].sort((a, b) => b.index - a.index);

    sorted.forEach(item => {
      dispatch(removeFromCart(item.index));
    });
    toast.success("Items combined into hamper 🎁");
  }

  navigate("/cart");
};

  /* ── shared order summary props ── */
  const summaryProps = {
    selectedBoxData, selectedItemsData, customMessage,
    total: calculateTotal(), currentStep, onProceed: goNext,
  };

  /* ═══════════════════ RENDER ═══════════════════ */
  return (
    <div className="min-h-screen bg-[#FEF9F5]">

      {/* ── HERO HEADER ── */}
      <div
        className="relative overflow-hidden px-4 sm:px-6 pt-6 pb-10"
        style={{ background: "linear-gradient(135deg,#3B2A35 0%,#C2556A 60%,#E8956D 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Ccircle cx='30' cy='30' r='20'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />

        <div className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 border border-white/20 rounded-full px-4 py-1.5 text-white text-[11px] font-bold tracking-widest uppercase mb-4"
            style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)" }}>
            <Sparkles size={11} /> Personalised Just for You
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            Build Your <span className="font-light" style={{ color: "#FFD6E7" }}>Dream Hamper</span>
          </h1>
          <p className="text-white/65 text-sm mt-2">Pick a box, choose items, add a message — all in one place</p>
        </div>
      </div>

      {/* ── STEP PROGRESS ── */}
      <div className="bg-white border-b border-rose-100 sticky top-0 z-30">
        <div className="w-full px-4 py-3 overflow-x-auto">
          <div className="flex items-center justify-start sm:justify-center gap-2 min-w-max mx-auto">
            {STEPS.map((step, index) => {
              const done    = currentStep > step.number;
              const active  = currentStep === step.number;
              return (
                <div key={step.number} ref={(el) => (stepRefs.current[index] = el)}
                  className="flex items-center gap-2">
                  <button
                    onClick={() => done && setCurrentStep(step.number)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all
                      ${active  ? "text-white shadow-md"                                  : ""}
                      ${done    ? "cursor-pointer"                                        : "cursor-default"}
                      ${!active && !done ? "text-rose-900/40 bg-rose-50"                 : ""}
                      ${done    && !active ? "bg-green-50 text-green-700 border border-green-200" : ""}
                    `}
                    style={active ? { background: CTA_BG } : {}}
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-extrabold shrink-0
                      ${active ? "bg-white/30" : done ? "bg-green-500 text-white" : "bg-rose-100 text-rose-400"}`}>
                      {done ? <Check size={10} strokeWidth={3} /> : step.number}
                    </span>
                    <span className="whitespace-nowrap">{step.title}</span>
                  </button>

                  {index < STEPS.length - 1 && (
                    <ChevronRight size={12} className={done ? "text-green-400" : "text-rose-200"} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── PAGE BODY ── */}
      <div className="w-full px-4 lg:px-8 py-6 pb-32 lg:pb-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
          >

            {/* ════ STEP 1 — PICK BOX ════ */}
            {currentStep === 1 && (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
                <div className="lg:col-span-3 w-full">
                  <div className="mb-6">
                    <p className="text-[10px] font-bold text-[#C2556A] tracking-widest uppercase mb-1">Step 1</p>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#3B2A35]">Choose Your Gift Box 🎁</h2>
                    <p className="text-sm text-rose-900/50 mt-1">Select a box size that fits your items</p>
                  </div>

                  
                  <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
                    {BOXES.map((box) => {
                      const isSelected = selectedBox === box.id;
                      return (

                        <motion.div
                          key={box.id}
                          whileHover={{ y: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedBox(box.id)}
                          className={`cursor-pointer bg-white rounded-2xl border-2 shadow-md overflow-hidden transition-all 
                            ${isSelected ? "border-[#C2556A] shadow-[0_4px_20px_rgba(194,85,106,0.2)]" : "border-rose-100 hover:border-rose-300"}`}
                        >
                          {/* image area */}
                          <div className="relative h-48 overflow-hidden " 
                            style={{ background: "linear-gradient(135deg,#FFF0F3,#FFF6EC)" }}>
                            <div className="absolute inset-0 flex items-center justify-center">             
                            <img
                              src={box.image}
                              alt={box.name}
                              className="w-full h-full object-cover opacity-80"
                            />
                            </div>
                            {isSelected && (
                              <div className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center shadow-md"
                              
                                style={{ background: CTA_BG }}>
                                <Check size={14} className="text-white" strokeWidth={3} />
                              </div>
                            )}
                            <div className="absolute bottom-2 left-3">
                              <span className="text-[10px] font-bold text-white bg-[#C2556A] px-2 py-0.5 rounded-full">
                                {box.capacity}
                              </span>
                            </div>
                          </div>

                          {/* info */}
                          <div className="p-4">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-bold text-[#3B2A35] text-base">{box.name}</h3>
                              <span className="text-base font-extrabold text-[#C2556A]">₹{box.price}</span>
                            </div>
                            <p className="text-xs text-rose-900/50">{box.size}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                    </div>
                  
                </div>

 

                {/* sidebar */}
                <div className="hidden lg:block lg:col-span-1 w-72 xl:w-80 shrink-0 sticky top-40">
                  <OrderSummary {...summaryProps} />
                </div>
              </div>
            )}

            {/* ════ STEP 2 — CHOOSE ITEMS ════ */}
            {currentStep === 2 && (
              <div>
                <div className="mb-5 flex items-end justify-between flex-wrap gap-3">
                  <div>
                    <p className="text-[10px] font-bold text-[#C2556A] tracking-widest uppercase mb-1">Step 2</p>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#3B2A35]">Choose Your Items 🛍️</h2>
                    <p className="text-sm text-rose-900/50 mt-1">
                      {selectedItems.length} item{selectedItems.length !== 1 ? "s" : ""} selected
                      {fromCart && <span className="ml-2 text-green-600 font-semibold">· Pre-filled from cart 🎁</span>}
                    </p>
                  </div>

                  {/* mobile filter btn */}
                  <button
                    onClick={() => setShowFilters(true)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-white"
                    style={{ background: CTA_BG }}
                  >
                    <Filter size={13} /> Filters
                  </button>
                </div>

                {/* mobile filter overlay */}
                {showFilters && (
                  <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setShowFilters(false)} />
                )}
                <div className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-2xl transition-transform duration-300 lg:hidden
                  ${showFilters ? "translate-x-0" : "-translate-x-full"}`}>
                  <div className="flex justify-between items-center px-4 py-3 border-b border-rose-100">
                    <h3 className="font-bold text-[#3B2A35]">Filters</h3>
                    <button onClick={() => setShowFilters(false)} className="p-1 rounded-full hover:bg-rose-50">
                      <X size={18} className="text-rose-400" />
                    </button>
                  </div>
                  <div className="overflow-y-auto h-full pb-20">
                    <FilterSidebar isOpen={showFilters} onClose={() => setShowFilters(false)}
                      categoryMap={CATEGORY_MAP} tempFilters={tempFilters} setTempFilters={setTempFilters}
                      priceRange={priceRange} setPriceRange={setPriceRange} rating={rating} setRating={setRating}
                      onApply={() => { setAppliedFilters(tempFilters); setShowFilters(false); }}
                      onClear={() => { setTempFilters({}); setAppliedFilters({}); setPriceRange([0, 5000]); setRating(0); }} />
                  </div>
                </div>

                {/* 3-col layout */}
                <div className="flex gap-4 items-start">

                  {/* desktop filter sidebar */}
                  <div className="hidden lg:block w-56 shrink-0 sticky top-24 bg-white border border-rose-100 rounded-2xl overflow-hidden shadow-sm">
                    <FilterSidebar isOpen={true} categoryMap={CATEGORY_MAP}
                      tempFilters={tempFilters} setTempFilters={setTempFilters}
                      priceRange={priceRange} setPriceRange={setPriceRange}
                      rating={rating} setRating={setRating}
                      onApply={() => setAppliedFilters(tempFilters)}
                      onClear={() => { setTempFilters({}); setAppliedFilters({}); setPriceRange([0, 5000]); setRating(0); }} />
                  </div>

                  {/* products grid */}
                  <div className="flex-1 min-w-0">
                    {filteredProducts.length === 0 ? (
                      <div className="bg-white rounded-2xl border border-rose-100 p-12 text-center shadow-sm">
                        <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                          style={{ background: "linear-gradient(135deg,#FFF0F3,#FFF6EC)" }}>
                          <Package size={24} className="text-[#C2556A]" />
                        </div>
                        <p className="text-sm font-semibold text-[#3B2A35]">No products found</p>
                        <p className="text-xs text-rose-900/40 mt-1">Try adjusting your filters</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {filteredProducts.map((item) => (
                          <ProductCard key={item.id} {...item}
                            showSelect={true}
                            isSelected={selectedItems.includes(item.id)}
                            onSelect={(id) => setSelectedItems((p) =>
                              p.includes(id) ? p.filter((i) => i !== id) : [...p, id]
                            )} />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* order summary */}
                  <div className="hidden lg:block w-64 xl:w-72 shrink-0 sticky top-24">
                    <OrderSummary {...summaryProps} />
                  </div>
                </div>
              </div>
            )}

            {/* ════ STEP 3 — MESSAGE ════ */}
            {currentStep === 3 && (
              <div className="flex flex-col lg:flex-row gap-5 items-start">
                <div className="flex-1 min-w-0">
                  <div className="mb-6">
                    <p className="text-[10px] font-bold text-[#C2556A] tracking-widest uppercase mb-1">Step 3</p>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#3B2A35]">Add a Personal Message 💌</h2>
                    <p className="text-sm text-rose-900/50 mt-1">Optional — make your gift extra heartfelt</p>
                  </div>

                  <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-6 max-w-2xl">
                    <label className="block text-sm font-bold text-[#3B2A35] mb-2">Your Message</label>
                    <textarea
                      value={customMessage}
                      onChange={(e) => setCustomMessage(e.target.value)}
                      placeholder="Write something heartfelt... e.g. 'Happy Birthday! Wishing you all the love 🎉'"
                      rows={5}
                      maxLength={250}
                      className="w-full border border-rose-200 rounded-xl px-4 py-3 text-sm text-[#3B2A35] resize-none focus:outline-none focus:ring-2 focus:border-[#C2556A] bg-[#FEF9F5] placeholder:text-rose-300 leading-relaxed transition-all"
                      style={{ "--tw-ring-color": "rgba(194,85,106,0.25)" }}
                    />
                    <p className="text-right text-xs text-rose-900/35 mt-1">{customMessage.length}/250</p>

                    {/* Preview */}
                    {customMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                        className="mt-4 border-2 border-dashed border-rose-100 rounded-xl p-5 bg-[#FFF8F6]"
                      >
                        <p className="text-[10px] font-bold text-rose-900/40 uppercase tracking-widest mb-2">Preview</p>
                        <div className="bg-white rounded-xl px-4 py-4 shadow-sm">
                          <p className="text-sm text-[#3B2A35] italic leading-relaxed">"{customMessage}"</p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* sidebar */}
                <div className="hidden lg:block w-72 xl:w-80 shrink-0 sticky top-24">
                  <OrderSummary {...summaryProps} />
                </div>
              </div>
            )}

            {/* ════ STEP 4 — REVIEW ════ */}
            {currentStep === 4 && (
              <div className="flex flex-col lg:flex-row gap-5 items-start">
                <div className="flex-1 min-w-0 space-y-4">
                  <div className="mb-2">
                    <p className="text-[10px] font-bold text-[#C2556A] tracking-widest uppercase mb-1">Step 4</p>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#3B2A35]">Review Your Hamper 🎀</h2>
                    <p className="text-sm text-rose-900/50 mt-1">Everything look good? Add to cart!</p>
                  </div>

                  {/* Selected box */}
                  <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-5">
                    <p className="text-[10px] font-bold text-rose-900/40 uppercase tracking-widest mb-3 flex items-center gap-1">
                      <Package size={10} /> Gift Box
                    </p>
                    {selectedBoxData ? (
                      <div className="flex items-center justify-between bg-[#FEF9F5] border border-rose-100 rounded-xl px-4 py-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{selectedBoxData.emoji}</span>
                          <div>
                            <p className="font-bold text-sm text-[#3B2A35]">{selectedBoxData.name}</p>
                            <p className="text-xs text-rose-900/40">{selectedBoxData.size} · {selectedBoxData.capacity}</p>
                          </div>
                        </div>
                        <span className="text-base font-extrabold text-[#C2556A]">₹{selectedBoxData.price}</span>
                      </div>
                    ) : (
                      <p className="text-xs text-rose-900/30 italic">No box selected</p>
                    )}
                  </div>

                  {/* Selected items */}
                  <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-5">
                    <p className="text-[10px] font-bold text-rose-900/40 uppercase tracking-widest mb-3 flex items-center justify-between">
                      <span className="flex items-center gap-1"><Gift size={10} /> Items</span>
                      <span className="bg-[#C2556A]/10 text-[#C2556A] px-2 py-0.5 rounded-full normal-case text-[10px]">
                        {selectedItemsData.length} selected
                      </span>
                    </p>

                    {selectedItemsData.length > 0 ? (
                      <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                        {selectedItemsData.map((item) => (
                          <div key={item.id}
                            className="flex items-center gap-3 bg-[#FEF9F5] border border-rose-100 rounded-xl p-3">
                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#FFF0F3] shrink-0">
                              <img
                                src={Array.isArray(item.image) ? item.image[0] : item.image}
                                alt={item.title}
                                className="w-full h-full object-contain p-1"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-[#3B2A35] line-clamp-1">{item.title}</p>
                              <p className="text-[10px] text-rose-900/40">{item.subCategory}</p>
                              {(item.rating ?? 0) > 0 && (
                                <div className="flex gap-0.5 mt-0.5">
                                  {[...Array(5)].map((_, si) => (
                                    <Star key={si} size={9}
                                      style={si < Math.floor(item.rating)
                                        ? { color: "#D4A847", fill: "#D4A847" }
                                        : { color: "#e5e7eb" }} />
                                  ))}
                                </div>
                              )}
                            </div>
                            <span className="text-sm font-extrabold text-[#3B2A35] shrink-0">₹{item.price}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-rose-900/30 italic">No items selected</p>
                    )}
                  </div>

                  {/* Message */}
                  {customMessage && (
                    <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-5">
                      <p className="text-[10px] font-bold text-rose-900/40 uppercase tracking-widest mb-2 flex items-center gap-1">
                        <MessageSquare size={10} /> Your Message
                      </p>
                      <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 text-sm text-amber-800 italic">
                        "{customMessage}"
                      </div>
                    </div>
                  )}

                  {/* Total row */}
                  <div className="bg-white rounded-2xl border border-rose-100 shadow-sm px-5 py-4 flex items-center justify-between">
                    <span className="font-bold text-[#3B2A35]">Grand Total</span>
                    <span className="text-xl font-extrabold text-[#C2556A]">₹{calculateTotal().toFixed(2)}</span>
                  </div>
                </div>

                {/* sidebar */}
                <div className="hidden lg:block w-72 xl:w-80 shrink-0 sticky top-24">
                  <OrderSummary {...summaryProps} />
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>

        {/* ── MOBILE ORDER SUMMARY ── */}
        <div className="lg:hidden mt-5">
          <OrderSummary {...summaryProps} />
        </div>

        {/* ── NAV BUTTONS ── */}
        <div className="flex gap-3 mt-6 max-w-sm mx-auto lg:max-w-none lg:justify-start">
          {currentStep > 1 && (
            <button
              onClick={goPrev}
              className="px-6 py-3 rounded-full border-2 border-rose-200 text-sm font-semibold text-[#C2556A] hover:bg-rose-50 transition-all"
            >
              ← Back
            </button>
          )}

          {currentStep < 4 ? (
            <button
              onClick={goNext}
              disabled={!canProceed()}
              className="flex-1 py-3 rounded-full text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0"
              style={{ background: CTA_BG }}
            >
              {currentStep === 1 ? "Choose Items →" :
               currentStep === 2 ? "Add Message →" :
               "Review Hamper →"}
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              disabled={!selectedBoxData || selectedItemsData.length === 0}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0"
              style={{ background: CTA_BG }}
            >
              <ShoppingCart size={16} />
              {editMode ? "Update Hamper" : "Add to Cart 🎁"}
            </button>
          )}
          
        </div>
      </div>
    </div>
    
  );
}

