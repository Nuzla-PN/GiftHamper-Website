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

import { useState } from "react";
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
      // image: "https://images.unsplash.com/photo-1759563871371-eb0ec31824a6?w=400",
    },
    {
      id: "Large",
      name: "Large Box",
      size: '16" x 8"',
      capacity: "15-20 items",
      price: 1000,
      // image: "https://images.unsplash.com/photo-1759563871371-eb0ec31824a6?w=400",
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
      image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400",
      price: 2000,
      rating: 4.8,
      reviews: 80,
      mainCategory: "GiftType",
      subCategory: "Luxury",
    },
  ];

  // ✅ FILTER LOGIC
  const [priceRange, setPriceRange] = useState([0, 5000]); // min, max
  const filteredProducts = products.filter((p) => {
  const categoryMatch =
    mainCategory === "All" ||
    (p.mainCategory === mainCategory &&
      (subCategory === "All" || p.subCategory === subCategory));

  const priceMatch =
    p.price >= priceRange[0] && p.price <= priceRange[1];

  return categoryMatch && priceMatch;
  });
  

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
        <div className="flex justify-center mb-10 flex-wrap gap-4">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center ${
                    currentStep >= step.number
                      ? "bg-[#8B3A62] text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {currentStep > step.number ? (
                    <Check />
                  ) : (
                    <step.icon />
                  )}
                </div>
                <span className="text-sm mt-1">{step.title}</span>
              </div>

              {index < steps.length - 1 && (
                <div className="w-10 h-1 bg-gray-300 mx-2" />
              )}
            </div>
          ))}
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
              <div className="text-center mb-8">
                <h2 className="text-3xl text-[#8B3A62] mb-2">
                  Select Your Items
                </h2>

                <p className="text-gray-600">
                  Selected: {selectedItems.length} items
                </p>
              </div>
              
              
              <div className="flex flex-col lg:flex-row gap-6">

                {/* MOBILE FILTER BUTTON */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden bg-[#8B3A62] text-white px-4 py-2 rounded"
                >
                  Filters
                </button>

                {/* FILTER SIDEBAR */}
                <div className={`${showFilters ? "block" : "hidden"} lg:block w-full lg:w-64`}>
                  <div className="bg-white p-4 rounded-xl shadow">
                    <h3 className="font-semibold mb-4">Filters</h3>

                    {Object.entries(categoryMap).map(
                      ([category, subs]) => (
                        <div key={category} className="mb-4">
                          <button 
                          onClick={() => {  setMainCategory(category);setSubCategory("All");}}
                          className="font-medium"
                          >
                            {category}
                          </button>

                          {mainCategory === category && (
                            <div className="ml-3 mt-2 space-y-1">
                              {subs.map((sub) => (
                                <button
                                  key={sub}
                                  onClick={() => setSubCategory(sub)}
                                  className={`block text-sm ${
                                    subCategory === sub
                                      ? "text-[#8B3A62]"
                                      : "text-gray-500"
                                  }`}
                                >
                                  {sub}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    )}

                    <div className="mb-4">
                    <h4 className="font-medium mb-2">Price Range</h4>

                    <input
                      type="range"
                      min="0"
                      max="5000"
                      step="100"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], Number(e.target.value)])
                      }
                      className="w-full"
                    />

                    <div className="flex justify-between text-sm text-gray-600 mt-1">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                  </div>

                    {/* CLEAR */}
                    <button onClick={() => {
                        setMainCategory("All");
                        setSubCategory("All");
                      }}
                      className="text-sm text-red-500"
                    >
                      Clear Filters
                    </button>
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
              <div className="max-w-3xl mx-auto">
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