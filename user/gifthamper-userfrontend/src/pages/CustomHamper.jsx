// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Check, Gift, Package, MessageSquare, ShoppingCart } from "lucide-react";
// import ProductCard from "../components/ProductCard";

// export default function StepProgress() {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [selectedBox, setSelectedBox] = useState(null);
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [customMessage, setCustomMessage] = useState("");
//   const steps = [
//     { number: 1, title: "Select Box", icon: Package },
//     { number: 2, title: "Choose Items", icon: Gift },
//     { number: 3, title: "Add Message", icon: MessageSquare },
//     { number: 4, title: "Checkout", icon: ShoppingCart },
//   ];

//   const boxes = [
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
//       // image: "https://images.unsplash.com/photo-1759563871371-eb0ec31824a6?w=400",
//     },
//     {
//       id: "Large",
//       name: "Large Box",
//       size: '16" x 8"',
//       capacity: "15-20 items",
//       price: 1000,
//       // image: "https://images.unsplash.com/photo-1759563871371-eb0ec31824a6?w=400",
//     },
//   ];

//   const products = [
//     { id:'1',title: "Product Name", sellerName:"Seller Name",image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400',price:1000,category:"occasion"},
//     { id:'2',title: "Product Name", sellerName:"Seller Name" },
//     { id:'4',title: "Product Name", sellerName:"Seller Name"},
//     { id:'5',title: "Product Name", sellerName:"Seller Name" },
//     { id:'6',title: "Product Name", sellerName:"Seller Name" },
//   ];

//   // ✅ FUNCTIONS
//   const toggleItem = (id) => {
//     setSelectedItems((prev) =>
//       prev.includes(id)
//         ? prev.filter((i) => i !== id)
//         : [...prev, id]
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Main Content Container with proper spacing for sidebar */}
//         <div className="lg:pr-96">
//           {/* Header */}
//           <div className="text-center mb-12 mt-8">
//             <h1 className="text-5xl mb-4 " style={{ fontFamily: 'var(--font-heading)', color: '#8B3A62' }}>
//               Build Your Custom Hamper
//             </h1>
//             <p className="text-xl text-gray-600">
//               Create a personalized gift hamper in 4 easy steps
//             </p>
//           </div>
//     <div className="mb-12">
//       <div className="flex items-center justify-center">
//         {steps.map((step, index) => (
//           <div key={step.number} className="flex items-center">

//             {/* Step Circle */}
//             <div className="flex flex-col items-center">
//               <motion.div
//                 whileHover={{ scale: 1.1 }}
//                 className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
//                   currentStep >= step.number
//                     ? "bg-[#8B3A62] text-white"
//                     : "bg-gray-200 text-gray-500"
//                 }`}
//               >
//                 {currentStep > step.number ? (
//                   <Check className="w-8 h-8" />
//                 ) : (
//                   <step.icon className="w-8 h-8" />
//                 )}
//               </motion.div>

//               <span
//                 className={`mt-2 text-sm ${
//                   currentStep >= step.number
//                     ? "font-semibold text-[#8B3A62]"
//                     : "text-gray-500"
//                 }`}
//               >
//                 {step.title}
//               </span>
//             </div>

//             {/* Connector Line */}
//             {index < steps.length - 1 && (
//               <div
//                 className={`w-24 h-1 mx-4 transition-all ${
//                   currentStep > step.number
//                     ? "bg-[#8B3A62]"
//                     : "bg-gray-200"
//                 }`}
//               />
//             )}
//           </div>
//         ))}
//       </div>
//       {/* Step Content */}
// <AnimatePresence mode="wait">
//   <motion.div
//     key={currentStep}
//     initial={{ opacity: 0, x: 50 }}
//     animate={{ opacity: 1, x: 0 }}
//     exit={{ opacity: 0, x: -50 }}
//     transition={{ duration: 0.3 }}
//   >

//     {/* Step 1: Select Box */}
//     {currentStep === 1 && (
//       <div>
//         <h2 className="text-3xl text-center mt-8 mb-8 text-[#8B3A62]">
//           Choose Your Gift Box
//         </h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
//                 <h3 className="text-xl mb-2 text-[#8B3A62]">
//                   {box.name}
//                 </h3>
//                 <p className="text-sm text-gray-600 mb-1">
//                   Size: {box.size}
//                 </p>
//                 <p className="text-sm text-gray-600 mb-3">
//                   Capacity: {box.capacity}
//                 </p>
//                 <p className="text-2xl text-[#8B3A62] font-semibold">
//                   ₹ {box.price.toFixed(2)}
//                 </p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     )}

//     {/* Step 2: Choose Items */}
//     {currentStep === 2 && (
//       <div>
//         <h2 className="text-3xl text-center mb-4 text-[#8B3A62]">
//           Select Your Items
//         </h2>

//         <p className="text-center text-gray-600 mb-8">
//           Selected: {selectedItems.length} items
//         </p>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {products.map((item) => {
//             const isSelected = selectedItems.includes(item.id);

//             return (
//               <ProductCard
//             key={item.id}
//             id={item.id}
//             image={item.image}
//             title={item.title}
//             sellerName={item.sellerName}
//             price={item.price}
//             category={item.category}
            
//             showSelect={true}
//             isSelected={isSelected}
//             onSelect={toggleItem}
//           />
//         );
//       })}
//     </div>
//   </div>
// )}

//     {/* Step 3: Add Message */}
//     {currentStep === 3 && (
//       <div className="max-w-3xl mx-auto">
//         <h2 className="text-3xl text-center mb-8 text-[#8B3A62]">
//           Add a Personal Message
//         </h2>

//         <div className="bg-white rounded-xl shadow-md p-8">
//           <div className="mb-6">
//             <label className="block text-lg mb-3 text-[#8B3A62]">
//               Your Message (Optional)
//             </label>

//             <textarea
//               value={customMessage}
//               onChange={(e) => setCustomMessage(e.target.value)}
//               placeholder="Write a heartfelt message..."
//               rows={6}
//               maxLength={250}
//               className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B3A62] resize-none"
//             />

//             <p className="text-sm text-gray-500 mt-2 text-right">
//               {customMessage.length}/250 characters
//             </p>
//           </div>

//           {/* Preview */}
//           <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-[#FFF8F6]">
//             <h3 className="text-lg mb-3 text-[#8B3A62]">
//               Preview
//             </h3>

//             <div className="bg-white rounded-lg p-6 shadow-sm">
//               <div className="mb-4 pb-4 border-b border-gray-200">
//                 <Gift className="w-8 h-8 mb-2 text-[#D4AF37]" />
//               </div>

//               <p className="text-gray-700 italic min-h-[60px]">
//                 {customMessage || "Your message will appear here..."}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     )}

//   </motion.div>
// </AnimatePresence>

//       {/* Buttons to test step change */}
//       <div className="flex justify-center gap-4 mt-6">
//         <button
//           onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
//           className="px-4 py-2 bg-gray-300 rounded"
//         >
//           Prev
//         </button>

//         <button
//           onClick={() => setCurrentStep((prev) => Math.min(4, prev + 1))}
//           className="px-4 py-2 bg-[#8B3A62] text-white rounded"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//     </div>
//     </div>
//     </div>
//   );
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
  ];

  // ✅ CATEGORY MAP
  const categoryMap = {
    Occasion: ["Birthday", "Anniversary", "Wedding","Baby shower","Graduation","House warming","Engagement","Get Well Soon"],
    Recipients: ["Him", "Her", "Kids","parents","couples","corporate gifts"],
    Festival: ["Christmas", "Diwali","New Year","Valentines Day","Mothers Day","Fathers Day"],
    GiftType: ["Luxury", "Handmade","Chocolate Hamper","Snack Hamper","Dry Fruits Hamper","Self Care Hamper","coffee & Tea Hamper"],
    };

  // ✅ PRODUCTS (IMPORTANT: FULL DATA)
  const products = [
    {
      id: "1",
      title: "Product Name",
      sellerName: "Seller Shop",
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400",
      
      price: 1000,
      rating: 4.5,
      reviews: 120,
      mainCategory: "Occasion",
      subCategory: "Birthday"
    },
    {
      id: "2",
      title: "Product Name",
      sellerName: "Seller shop",
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400",
      // image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400",
      price: 2000,
      rating: 4.8,
      reviews: 80,
      mainCategory: "GiftType",
      subCategory: "Luxury",
    },
  ];

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
  const filteredProducts = products.filter((p) => {
  const selectedValues = Object.values(appliedFilters).flat();

  const categoryMatch =
    selectedValues.length === 0 ||
    selectedValues.includes(p.subCategory);

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">

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

          {/* STEP 1: Select Box  */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-3xl text-center mt-8 mb-8 text-[#8B3A62]">
                Choose Your Gift Box
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
            
          )}

            {/* STEP 2 */}
            
            {currentStep === 2 && (
              <div>
              <div className="text-center mb-8 mt-8">
                <h2 className="text-3xl text-[#8B3A62] mb-2">
                  Select Your Items
                </h2>

                <p className="text-gray-600">
                  Selected: {selectedItems.length} items
                </p>
              </div>
              
              
              <div className="flex flex-col lg:flex-row gap-6">

                {/* FILTER BUTTON (MOBILE) */}
                <button
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden bg-[#8B3A62] text-white px-4 py-2 rounded mb-4"
                >
                  Filters
                </button>

                {/* OVERLAY (MOBILE) */}
                {showFilters && (
                  <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
                    onClick={() => setShowFilters(false)}
                  />
                )}

                {/* SIDEBAR */}
                <div
                  className={`
                    fixed lg:sticky 
                    top-16 lg:top-20 
                    h-[calc(100%-4rem)] lg:h-fit
                    w-72 bg-white z-40
                    transform transition-transform duration-300
                    ${showFilters ? "translate-x-0" : "-translate-x-full"}
                    lg:translate-x-0 lg:block
                  `}
                >
                  <div className="h-full flex flex-col">

                    {/* HEADER */}
                    <div className="flex justify-between items-center p-4 border-b">
                      <h3 className="font-semibold text-lg">Filters</h3>

                      {/* CLOSE BUTTON (MOBILE) */}
                      <button
                        onClick={() => setShowFilters(false)}
                        className="lg:hidden"
                      >
                        ✕
                      </button>
                    </div>

                    {/* CONTENT */}
                    <div className="p-4 overflow-y-auto flex-1">

                      {/* CATEGORY FILTER */}
                      {Object.entries(categoryMap).map(([category, subs]) => (
                        <div key={category} className="mb-5">
                          
                            {/* CATEGORY TITLE */}
                        <p className="font-medium text-gray-800 mb-2">
                          {category}
                        </p>

                        {/* SUBCATEGORY CHECKBOXES */}
                        <div className="space-y-1 ml-2">
                          {subs.map((sub) => (
                            <label key={sub} className="flex items-center gap-2 text-sm cursor-pointer">
                              
                              <input
                                type="checkbox"
                                checked={tempFilters[category]?.includes(sub) || false}
                                onChange={() => handleFilterChange(category, sub)}
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
                            setPriceRange([priceRange[0], Number(e.target.value)])
                          }
                          className="w-full accent-[#8B3A62]"
                        />

                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                          <span>₹{priceRange[0]}</span>
                          <span>₹{priceRange[1]}</span>
                        </div>
                      </div>

                    </div>

                    {/* FOOTER ACTIONS */}
                    <div className="p-4 border-t flex gap-2">

                      <button
                        onClick={() => {
                          setMainCategory("All");
                          setSubCategory("All");
                          setPriceRange([0, 5000]);
                        }}
                        className="flex-1 border border-gray-300 py-2 rounded text-sm"
                      >
                        Clear
                      </button>

                      <button
                       onClick={() => {
                          setTempFilters({});
                          setAppliedFilters({});
                          setPriceRange([0, 5000]);
                        }}
                        className="flex-1 bg-[#8B3A62] text-white py-2 rounded text-sm"
                      >
                        Apply
                      </button>

                    </div>
                  </div>
                </div>

                {/* PRODUCTS GRID */}
                <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <p className="text-center text-gray-500 text-base mt-10">
                No products found in this price range
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((item) => {
                  const isSelected = selectedItems.includes(item.id);

                  return (
                    <ProductCard
                      key={item.id}
                      id={item.id}
                      image={item.image}
                      title={item.title}
                      sellerName={item.sellerName}
                      price={item.price}
                      rating={item.rating}
                      reviews={item.reviews}
                      subCategory={item.subCategory}
                      showSelect={true}
                      isSelected={isSelected}
                      onSelect={toggleItem}
                    />
                  );
                })}
              </div>
            )}
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
              <div className="max-w-3xl mx-auto mt-8">
                <h2 className="text-3xl text-center mb-8 text-[#8B3A62]">
                  Add a Personal Message
                </h2>

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
                      {customMessage.length}/250 characters
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
            )}

          </motion.div>
        </AnimatePresence>

        {/* BUTTONS */}
        <div className="flex justify-center gap-4 mt-6">
         <button
          onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Prev
        </button>

        <button
          onClick={() => {if (canProceed()) {setCurrentStep((prev) => prev + 1);}
        }}
        disabled={!canProceed()}
          className={`px-4 py-2 rounded text-white ${canProceed()
      ? "bg-[#8B3A62] hover:opacity-90"
      : "bg-gray-300 cursor-not-allowed"
        }`}
        >
          Next
        </button>
      </div>
      </div>
    </div>
  );
}