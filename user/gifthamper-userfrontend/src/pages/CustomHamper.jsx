
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


import { useState,useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Gift,
  Package,
  MessageSquare,
  ShoppingCart,
  ChevronDown,
  X,
} from "lucide-react";

import ProductCard from "../components/ProductCard";
import OrderSummaryContent from "../components/Ordersummarycard";
import { useSelector } from "react-redux";

export default function StepProgress() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedBox, setSelectedBox] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [customMessage, setCustomMessage] = useState("");

  // ✅ FILTER STATES
  const [mainCategory, setMainCategory] = useState("All");
  const [subCategory, setSubCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  // ✅ STEPS
  const steps = [
    { number: 1, title: "Select Box", icon: Package },
    { number: 2, title: "Choose Items", icon: Gift },
    { number: 3, title: "Add Message", icon: MessageSquare },
    { number: 4, title: "Checkout", icon: ShoppingCart },
  ];

  // ✅ BOXES
   const boxes = [
    {
      id: "small",
      name: "Small Box",
      size: '8" x 6"',
      capacity: "3-5 items",
      price: 200,
      image: "https://images.unsplash.com/photo-1759563871371-eb0ec31824a6?w=400",
    },
    {
      id: "medium",
      name: "Medium Box",
      size: '12" x 8"',
      capacity: "6-10 items",
      price: 300,
      image: "https://images.unsplash.com/photo-1759563871371-eb0ec31824a6?w=400",
    },
    {
      id: "Large",
      name: "Large Box",
      size: '16" x 8"',
      capacity: "15-20 items",
      price: 1000,
      image: "https://images.unsplash.com/photo-1759563871371-eb0ec31824a6?w=400",
    },
    {
      id: "Premium Box",
      name: "Premium Box",
      size: '20" x 10"',
      capacity: "20-35 items",
      price: 2000,
      image: "https://images.unsplash.com/photo-1759563871371-eb0ec31824a6?w=400",
    },
    
  ];

  // ✅ CATEGORY MAP
  const categoryMap = {
    Occasion: ["Birthday", "Anniversary", "Wedding","Baby shower","Graduation","House warming","Engagement","Get Well Soon"],
    Recipients: ["For Him", "For Her", "Kids","parents","couples","corporate gifts"],
    Festival: ["Christmas", "Diwali","New Year","Valentines Day","Mothers Day","Fathers Day"],
    GiftType: ["Luxury", "Handmade","Chocolate Hamper","Snack Hamper","Dry Fruits Hamper","Self Care Hamper","coffee & Tea Hamper"],
    };

  // ✅ PRODUCTS (IMPORTANT: FULL DATA)
  const products = useSelector((state) => state.products.items);

  // ✅ FILTER LOGIC
  const [tempFilters, setTempFilters] = useState({});
  const [appliedFilters, setAppliedFilters] = useState({});
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const handleFilterChange = (category, value) => {
  setTempFilters((prev) => {
    const current = prev[category] || [];

    if (current.includes(value)) {
      return {
        ...prev,
        [category]: current.filter((v) => v !== value),
      };
    } else {
      return {
        ...prev,
        [category]: [...current, value],
      };
    }
  });
};

  const selectedValues = Object.values(appliedFilters).flat().map((v) => v.toLowerCase());
  const filteredProducts = products.filter((p) => {
  const productSub = p.subCategory?.toLowerCase();
  const categoryMatch =
    selectedValues.length === 0 ||
    selectedValues.includes(productSub);

  const priceMatch =
    p.price >= priceRange[0] && p.price <= priceRange[1];

  return categoryMatch && priceMatch;
  });
  
  const stepRefs = useRef([]);

    useEffect(() => {
      if (stepRefs.current[currentStep - 1]) {
        stepRefs.current[currentStep - 1].scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    }, [currentStep]);

  // ✅ SELECT ITEM
  const toggleItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  const canProceed = () => {
  if (currentStep === 1) return selectedBox !== null;
  if (currentStep === 2) return selectedItems.length > 0;
  return true;
};

//order summary
const selectedBoxData = boxes.find((b) => b.id === selectedBox);

const selectedItemsData = selectedItems
  .map((id) => products.find((p) => p.id === id))
  .filter(Boolean);

  const calculateTotal = () => {
  const boxPrice = selectedBoxData?.price || 0;

  const itemsTotal = selectedItemsData.reduce(
    (sum, item) => sum + item.price,
    0
  );

  return boxPrice + itemsTotal;
};
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 lg:pr-20 ">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-[#8B3A62]">
            Build Your Custom Hamper
          </h1>
          <p className="text-gray-600">
            Create a personalized gift hamper
          </p>
        </div>


        {/* STEP PROGRESS */}
        
        <div className="mb-10 overflow-x-auto">
        <div className="flex items-center justify-start md:justify-center w-full gap-4 px-2">

        {steps.map((step, index) => (
          <div
            key={step.number}
            ref={(el) => (stepRefs.current[index] = el)}
            className="flex items-center flex-shrink-0"
          >

            {/* STEP ITEM */}
            <div className="flex flex-col items-center w-20 mt-3">

              {/* CIRCLE */}
              <div
                className={`w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                  currentStep >= step.number
                    ? "bg-[#8B3A62] text-white"
                    : "bg-gray-200"
                } ${
                  currentStep === step.number
                    ? "scale-110 shadow-lg"
                    : ""
                }`}
              >
                {currentStep > step.number ? (
                  <Check className="w-4 h-4 md:w-5 md:h-5" />
                ) : (
                  <step.icon className="w-4 h-4 md:w-5 md:h-5" />
                )}
              </div>

              {/* TEXT */}
              <span className="text-xs md:text-sm mt-1 text-center">
                {step.title}
              </span>
            </div>

            {/* LINE */}
            {index < steps.length - 1 && (
              <div className="w-6 md:w-10 h-1 bg-gray-300 mx-1 md:mx-2" />
            )}
          </div>
        ))}
        </div>
      </div>

        {/* STEP CONTENT */}
      <AnimatePresence mode="wait">
      <motion.div key={currentStep}>

          {/* STEP 1: Select Box */}
{currentStep === 1 && (
  <div>
    <h2 className="text-3xl text-center mt-8 mb-8 text-[#8B3A62]">
      Choose Your Gift Box
    </h2>

    {/* ✅ MAIN LAYOUT */}
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

      {/* 🔹 LEFT SIDE (BOXES) */}
      <div className="lg:col-span-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {boxes.map((box) => (
            <motion.div
              key={box.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedBox(box.id)}
              className={`bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-all ${
                selectedBox === box.id ? "ring-4 ring-[#8B3A62]" : ""
              }`}
            >
              <div className="relative h-48 bg-[#F7E3DC]">
                <img
                  src={box.image}
                  alt={box.name}
                  className="w-full h-full object-cover opacity-80"
                />

                {selectedBox === box.id && (
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white bg-[#8B3A62]">
                    <Check className="w-5 h-5" />
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl mb-2 text-[#8B3A62]">
                  {box.name}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  Size: {box.size}
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  Capacity: {box.capacity}
                </p>
                <p className="text-2xl text-[#8B3A62] font-semibold">
                  ₹ {box.price.toFixed(2)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 🔹 RIGHT SIDE (ORDER SUMMARY) */}
      <div className="hidden lg:block lg:col-span-1 ">
        <div className="sticky top-28">
          <OrderSummaryContent
            selectedBoxData={selectedBoxData}
            selectedItemsData={selectedItemsData}
            customMessage={customMessage}
            calculateTotal={calculateTotal}
          />
        </div>
      </div>

    </div>
  </div>
)}

           {currentStep === 2 && (
  <div>
    {/* HEADER */}
    <div className="text-center mb-8 mt-8">
      <h2 className="text-3xl text-[#8B3A62] mb-2">
        Select Your Items
      </h2>
      <p className="text-gray-600">
        Selected: {selectedItems.length} items
      </p>
    </div>

    {/* MOBILE FILTER BUTTON */}
    <button
      onClick={() => setShowFilters(true)}
      className="lg:hidden bg-[#8B3A62] text-white px-4 py-2 rounded mb-4"
    >
      Filters
    </button>

    {/* MOBILE OVERLAY */}
    {showFilters && (
      <div
        className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
        onClick={() => setShowFilters(false)}
      />
    )}

    {/* MOBILE SIDEBAR */}
    <div
      className={`
        fixed top-0 left-0 h-full w-72 bg-white z-50
        transform transition-transform duration-300
        ${showFilters ? "translate-x-0" : "-translate-x-full"}
        lg:hidden
      `}
    >
      <div className="h-full flex flex-col">
        {/* HEADER */}
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-semibold text-lg">Filters</h3>
          <button onClick={() => setShowFilters(false)}>✕</button>
        </div>

        {/* CONTENT */}
        <div className="p-4 overflow-y-auto flex-1">
          {Object.entries(categoryMap).map(([category, subs]) => (
            <div key={category} className="mb-5">
              <p className="font-medium text-gray-800 mb-2">{category}</p>

              <div className="space-y-1 ml-2">
                {subs.map((sub) => (
                  <label
                    key={sub}
                    className="flex items-center gap-2 text-sm cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={
                        tempFilters[category]?.includes(sub) || false
                      }
                      onChange={() =>
                        handleFilterChange(category, sub)
                      }
                      className="accent-[#8B3A62]"
                    />
                    <span
                      className={`${
                        tempFilters[category]?.includes(sub)
                          ? "text-[#8B3A62] font-medium"
                          : "text-gray-600"
                      }`}
                    >
                      {sub}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          {/* PRICE FILTER */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Price Range</h4>
            <input
              type="range"
              min="0"
              max="5000"
              step="100"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([
                  priceRange[0],
                  Number(e.target.value),
                ])
              }
              className="w-full accent-[#8B3A62]"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>₹{priceRange[0]}</span>
              <span>₹{priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="p-4 border-t flex gap-2">
          <button
            onClick={() => {
              setTempFilters({});
              setAppliedFilters({});
              setPriceRange([0, 5000]);
            }}
            className="flex-1 border border-gray-300 py-2 rounded text-sm"
          >
            Clear
          </button>

          <button
            onClick={() => {
              setAppliedFilters(tempFilters);
              setShowFilters(false);
            }}
            className="flex-1 bg-[#8B3A62] text-white py-2 rounded text-sm"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
    

    {/* MAIN GRID */}
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

      {/* DESKTOP SIDEBAR */}
      <div className="hidden lg:block lg:col-span-1">
        <div className="sticky top-24 bg-white p-4 border rounded-xl">
          <h2 className="text-xl font-semibold text-[#8B3A62]">
                Filters
              </h2>
          {Object.entries(categoryMap).map(([category, subs]) => (
            
            <div key={category} className="mb-5">
              
              <p className="font-medium text-gray-800 mb-2 mt-5">{category}</p>

              <div className="space-y-1 ml-2">
                {subs.map((sub) => (
                  <label
                    key={sub}
                    className="flex items-center gap-2 text-sm cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={
                        tempFilters[category]?.includes(sub) || false
                      }
                      onChange={() =>
                        handleFilterChange(category, sub)
                      }
                      className="accent-[#8B3A62]"
                    />
                    <span
                      className={`${
                        tempFilters[category]?.includes(sub)
                          ? "text-[#8B3A62] font-medium"
                          : "text-gray-600"
                      }`}
                    >
                      {sub}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          {/* PRICE */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Price Range</h4>
            <input
              type="range"
              min="0"
              max="5000"
              step="100"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([
                  priceRange[0],
                  Number(e.target.value),
                ])
              }
              className="w-full accent-[#8B3A62]"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>₹{priceRange[0]}</span>
              <span>₹{priceRange[1]}</span>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => {
                setTempFilters({});
                setAppliedFilters({});
                setPriceRange([0, 5000]);
              }}
              className="flex-1 border border-gray-300 py-2 rounded text-sm"
            >
              Clear
            </button>

            <button
              onClick={() => setAppliedFilters(tempFilters)}
              className="flex-1 bg-[#8B3A62] text-white py-2 rounded text-sm"
            >
              Apply
            </button>
          </div>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="lg:col-span-2">
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">
            No products found
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-6">
            {filteredProducts.map((item) => {
              const isSelected = selectedItems.includes(item.id);

              return (
                <ProductCard
                  key={item.id}
                  {...item}
                  showSelect={true}
                  isSelected={isSelected}
                  onSelect={toggleItem}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* ORDER SUMMARY */}
      <div className="hidden lg:block lg:col-span-1">
        <div className="sticky top-28">
          <OrderSummaryContent
            selectedBoxData={selectedBoxData}
            selectedItemsData={selectedItemsData}
            customMessage={customMessage}
            calculateTotal={calculateTotal}
          />
        </div>
      </div>
    </div>
  </div>
)}

            {/* STEP 3 */}
            {/* {currentStep === 3 && (  //SIMPLE MESSAGE BOX
              <textarea
                className="w-full border p-4"
                placeholder="Message..."
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
              />
            )} */}
            {currentStep === 3 && (
  <div>
    <h2 className="text-3xl text-center mt-8 mb-8 text-[#8B3A62]">
      Add a Personal Message
    </h2>

    {/* ✅ MAIN LAYOUT (same as Step 1) */}
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

      {/* 🔹 LEFT SIDE (MESSAGE + PREVIEW) */}
      <div className="lg:col-span-3">
        <div className="max-w-3xl mx-auto">

          <div className="bg-white rounded-xl shadow-md p-8">
            
            <div className="mb-6">
              <label className="block text-lg mb-3 text-[#8B3A62]">
                Your Message (Optional)
              </label>

              <textarea
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Write a heartfelt message..."
                rows={6}
                maxLength={250}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B3A62] resize-none"
              />

              <p className="text-sm text-gray-500 mt-2 text-right">
                {customMessage?.length || 0}/250 characters
              </p>
            </div>

            {/* Preview */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-[#FFF8F6]">
              <h3 className="text-lg mb-3 text-[#8B3A62]">
                Preview
              </h3>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <Gift className="w-8 h-8 mb-2 text-[#D4AF37]" />
                </div>

                <p className="text-gray-700 italic min-h-[60px]">
                  {customMessage || "Your message will appear here..."}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 🔹 RIGHT SIDE (ORDER SUMMARY - SAME AS STEP 1) */}
      <div className="hidden lg:block lg:col-span-1">
        <div className="sticky top-28">
          <OrderSummaryContent
            selectedBoxData={selectedBoxData}
            selectedItemsData={selectedItemsData}
            customMessage={customMessage}
            calculateTotal={calculateTotal}
          />
        </div>
      </div>

    </div>
  </div>
)}
            
  
    {currentStep === 4 && (
  <div>
    <h2 className="text-2xl sm:text-3xl text-center mb-6 sm:mb-8 text-[#8B3A62]">
      Review Your Custom Hamper
    </h2>

    {/* ✅ MAIN LAYOUT */}
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

      {/* 🔹 LEFT SIDE (REVIEW CONTENT) */}
      <div className="lg:col-span-3">
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 space-y-6">

          {/* BOX */}
          <div>
            <h3 className="text-lg sm:text-xl mb-3 text-[#8B3A62] font-semibold">
              Selected Box
            </h3>

            {selectedBox ? (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-[#F7E3DC] rounded-xl">

                <div>
                  <p className="font-semibold text-sm sm:text-base">
                    {boxes.find(b => b.id === selectedBox)?.name}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {boxes.find(b => b.id === selectedBox)?.size}
                  </p>
                </div>

                <p className="text-lg sm:text-xl font-semibold text-[#8B3A62]">
                  ₹ {boxes.find(b => b.id === selectedBox)?.price.toFixed(2)}
                </p>

              </div>
            ) : (
              <p className="text-gray-400 text-sm">No box selected</p>
            )}
          </div>

          {/* ITEMS */}
          <div>
            <h3 className="text-lg sm:text-xl mb-3 text-[#8B3A62] font-semibold">
              Selected Items ({selectedItems.length})
            </h3>

            {selectedItems.length > 0 ? (
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {selectedItems.map((itemId) => {
                  const item = products.find((i) => i.id === itemId);

                  return item ? (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg"
                        />

                        <div>
                          <p className="font-medium text-sm sm:text-base">
                            {item.title}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-500">
                            {item.subCategory}
                          </p>
                        </div>
                      </div>

                      <p className="text-sm sm:text-lg font-semibold text-[#8B3A62]">
                        ₹{item.price}
                      </p>
                    </div>
                  ) : null;
                })}
              </div>
            ) : (
              <p className="text-gray-400 text-sm">No items selected</p>
            )}
          </div>

          {/* MESSAGE */}
          {customMessage && (
            <div>
              <h3 className="text-lg sm:text-xl mb-3 text-[#8B3A62] font-semibold">
                Your Message
              </h3>

              <div className="p-4 bg-[#FFF8F6] rounded-xl border border-dashed">
                <p className="text-gray-700 italic text-sm sm:text-base">
                  {customMessage}
                </p>
              </div>
            </div>
          )}

          {/* TOTAL */}
          <div className="border-t pt-4 flex items-center justify-between">
            <span className="text-lg sm:text-2xl font-semibold text-[#8B3A62]">
              Total
            </span>

            <span className="text-xl sm:text-3xl font-bold text-[#8B3A62]">
              ₹{calculateTotal().toFixed(2)}
            </span>
          </div>

        </div>
      </div>

      {/* 🔹 RIGHT SIDE (STICKY ORDER SUMMARY) */}
      <div className="hidden lg:block lg:col-span-1">
        <div className="sticky top-28">
          <OrderSummaryContent
            selectedBoxData={selectedBoxData}
            selectedItemsData={selectedItemsData}
            customMessage={customMessage}
            calculateTotal={calculateTotal}
          />
        </div>
      </div>

    </div>
  </div>
)}

          </motion.div>
        </AnimatePresence>

        {/* BUTTONS */}      
      <div className="flex justify-center gap-4 mt-6">

        {/* PREV */}
        <button
          onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
          className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-[#8B3A62] text-[#8B3A62] hover:bg-[#F7E3DC]"
        >
          Prev
        </button>

        {/* NEXT / ADD TO CART */}
        {currentStep < 4 ? (
          <button
            onClick={() => {
              if (canProceed()) {
                setCurrentStep((prev) => prev + 1);
              }
            }}
            disabled={!canProceed()}
            className={`w-full sm:w-auto flex items-center justify-center gap-2
              px-6 py-2.5 rounded-lg transition-all
              ${
                canProceed()
                  ? "bg-[#8B3A62] text-white hover:shadow-md"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
          >
            Next
          </button>
        ) : (
          <button
            onClick={() => {
              console.log("Add to Cart clicked");
              // 👉 your cart logic here
            }}
            disabled={!selectedBoxData || selectedItemsData.length === 0}
            className={`w-full sm:w-auto flex items-center justify-center gap-2
              px-6 py-2.5 rounded-lg transition-all
              ${
                selectedBoxData && selectedItemsData.length > 0
                  ? "bg-[#8B3A62] text-white hover:shadow-md"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
          >
            Add to Cart
          </button>
        )}
      </div>
      </div>

      {/* DESKTOP SIDEBAR
<motion.div
  initial={{ x: 100, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  className="hidden lg:block fixed right-6 top-24 w-80 bg-white rounded-2xl shadow-xl p-6 border"
  style={{ maxHeight: "calc(100vh - 6rem)", overflowY: "auto" }}
>
  <OrderSummaryContent />
</motion.div> */}

{/* ✅ mobile view summary page */}
<div className="lg:hidden w-full mt-6">
  <div className="bg-white shadow-md border-t border-b p-5">

    <h3 className="text-lg font-semibold mb-4 text-[#8B3A62]">
      Order Summary
    </h3>

    {/* BOX */}
    <div className="flex justify-between text-sm mb-2">
      <span className="text-gray-600">Box</span>
      <span className="font-medium">
        {selectedBoxData?.name || "Not selected"}
      </span>
    </div>

    {/* ITEMS */}
    <div className="mb-3">
      <p className="text-sm text-gray-600 mb-1">
        Items ({selectedItemsData.length})
      </p>

      {selectedItemsData.length > 0 ? (
        selectedItemsData.slice(0, 3).map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span className="truncate">{item.title}</span>
            <span className="text-[#8B3A62] font-medium">
              ₹{item.price}
            </span>
          </div>
        ))
      ) : (
        <p className="text-gray-400 text-sm">No items selected</p>
      )}
    </div>

    {/* MESSAGE */}
    <div className="flex justify-between text-sm mb-3">
      <span className="text-gray-600">Message</span>
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
    <div className="border-t pt-3 flex justify-between font-semibold text-[#8B3A62]">
      <span>Total</span>
      <span>₹{calculateTotal().toFixed(2)}</span>
    </div>

  </div>
</div>
    </div>
  );

function OrderSummaryContent({
  selectedBoxData,
  selectedItemsData,
  customMessage,
  calculateTotal,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 border space-y-5">
      
      {/* TITLE */}
      <h3 className="text-lg font-semibold text-gray-800 border-b pb-3">
        Order Summary
      </h3>

      {/* BOX */}
      <div className="pb-4 border-b">
        <p className="text-sm font-semibold text-gray-700 mb-2">
          Gift Box
        </p>

        {selectedBoxData ? (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 truncate max-w-[140px]">
              {selectedBoxData.name}
            </span>
            <span className="font-semibold text-[#8B3A62]">
              ₹{selectedBoxData.price}
            </span>
          </div>
        ) : (
          <p className="text-gray-400 italic text-sm">
            Not selected
          </p>
        )}
      </div>

      {/* ITEMS */}
      <div className="pb-4 border-b">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-semibold text-gray-700">
            Items
          </span>

          <span className="text-xs bg-[#F7E3DC] px-2 py-1 rounded text-[#8B3A62]">
            {selectedItemsData.length} selected
          </span>
        </div>

        {selectedItemsData.length > 0 ? (
          <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
            {selectedItemsData.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center text-sm"
              >
                <span className="truncate max-w-[140px] text-gray-600">
                  {item.title}
                </span>

                <span className="text-[#8B3A62] font-medium">
                  ₹{item.price}
                </span>
              </div>
            ))}

            {selectedItemsData.length > 3 && (
              <p className="text-xs text-gray-400 italic">
                +{selectedItemsData.length - 3} more items
              </p>
            )}
          </div>
        ) : (
          <p className="text-gray-400 italic text-sm">
            No items selected
          </p>
        )}
      </div>

      {/* MESSAGE */}
      <div className="pb-4 border-b flex justify-between items-center">
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
      <div className="pt-2">
        <div className="flex justify-between items-center mb-3">
          <span className="text-lg font-semibold text-[#8B3A62]">
            Total
          </span>

          <span className="text-xl font-bold text-[#8B3A62]">
            ₹{calculateTotal().toFixed(2)}
          </span>
        </div>

        {/* INFO BOX */}
        <div className="bg-[#FFF8F6] text-center text-xs text-gray-600 p-3 rounded-lg">
          Free shipping on orders above ₹999
        </div>

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
}

