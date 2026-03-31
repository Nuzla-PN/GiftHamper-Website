//------------------------------------------------code 3--------------------------------------------------// 
import { ChevronDown, ChevronUp, Star, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

function FilterSection({ title, children }) {
  const [open, setOpen] = useState(true);

  return (
    <div style={{ borderBottom: "1px solid #f0f0f0" }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        <span
          className="font-medium text-[#8B3A62]"
          style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: "0.4px" }}
        >
          {title}
        </span>
        {open ? <ChevronUp size={14} color="#888" /> : <ChevronDown size={14} color="#888" />}
      </button>
      {open && <div className="px-4 pb-3">{children}</div>}
    </div>
  );
}
export default function FilterSidebar({
  isOpen,
  onClose,
  categoryMap,
  tempFilters,
  setTempFilters,
  priceRange,
  setPriceRange,
  rating,
  setRating,
  onApply,
  onClear,
}) {
  const toggleCategory = (category, value) => {
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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/*  MOBILE OVERLAY */}
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={onClose}
          />

          {/*  SIDEBAR */}
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            // transition={{ duration: 0.3 }}
            className="fixed lg:static top-0 left-0 h-full lg:h-auto w-72 lg:w-full bg-white z-50 shadow-lg lg:shadow-none overflow-y-auto pb-4"
          >
            {/*  HEADER */}
            {/* HEADER — only show on mobile */}
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100 lg:border-b-0">
              <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                Filters
              </h2>
              <button onClick={onClose} className="lg:hidden text-gray-600">
                <X />
              </button>
            </div>

            {/*  CATEGORY */}
            {Object.entries(categoryMap).map(([cat, subs]) => (
              <FilterSection key={cat} title={cat}className="mb-6 text-sm font-semibold mb-3 text-[#8B3A62] tracking-tight">
                
                {(subs || []).map((sub) => (
                  // <label
                  //   key={sub}
                  //   className="flex items-center justify-between text-sm mb-2 cursor-pointer group"
                  // >
                  //   <span className="text-gray-700 group-hover:text-[#8B3A62] transition">
                  //     {sub}
                  //   </span>

                  //   <input
                  //     type="checkbox"
                  //     checked={tempFilters[cat]?.includes(sub) || false}
                  //     onChange={() => toggleCategory(cat, sub)}
                  //     className="w-4 h-4 accent-[#8B3A62] cursor-pointer"
                  //   />
                  // </label>
                  <label
                    key={sub}
                    onClick={() => toggleCategory(cat, sub)}
                    className="flex items-center justify-between text-sm mb-2 cursor-pointer group"
                  >
                    {/* TEXT */}
                    <span className="text-gray-700 group-hover:text-[#8B3A62] transition">
                      {sub}
                    </span>

                    {/* CUSTOM CHECKBOX */}
                    <div
                      className={`w-5 h-5 flex items-center justify-center rounded border transition-all duration-200
                        ${
                          tempFilters[cat]?.includes(sub)
                            ? "bg-[#8B3A62] border-[#8B3A62]"
                            : "border-gray-300"
                        }
                      `}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className={`w-3.5 h-3.5 text-white transition-all duration-200 ${
                          tempFilters[cat]?.includes(sub)
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-75"
                        }`}
                      >
                        <path
                          fill="currentColor"
                          d="M20.285 6.708l-11.4 11.4-5.17-5.17 1.414-1.414 3.756 3.756 9.986-9.986z"
                        />
                      </svg>
                    </div>
                  </label>
                ))}
              
            </FilterSection>
            ))}

            {/*  PRICE */}
            <FilterSection  title="Price" className="mb-6 text-sm font-semibold mb-3 text-[#8B3A62]">
              

              <input
                type="range"
                min="0"
                max="5000"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([0, Number(e.target.value)])
                }
                className="w-full accent-[#8B3A62]"
              />

              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>₹{priceRange[0]}</span>
                <span className="text-[#8B3A62] font-medium">
                  ₹{priceRange[1]}
                </span>
              </div>
           </FilterSection>

            {/*  RATING */}
            <FilterSection title="Ratings" className="mb-6 text-sm font-semibold mb-3 text-[#8B3A62]">
            

              {[5, 4, 3, 2, 1].map((r) => (
                <label
                  key={r}
                  className="flex items-center justify-between mb-2 cursor-pointer group"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={rating === r}
                      onChange={() => setRating(r)}
                      className="accent-[#8B3A62]"
                    />

                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < r
                              ? "text-[#D4AF37] fill-[#D4AF37]"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* <span className="text-xs text-gray-500">& up</span> */}
                </label>
              ))}
           </FilterSection>

            {/*  ACTION BUTTONS */}
            <div className="flex gap-3 pt-3 border-t">
              <button
                onClick={onClear}
                className="flex-1 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition"
              >
                Clear
              </button>

              <button
                onClick={onApply}
                className="flex-1 py-2.5 bg-[#8B3A62] text-white rounded-lg text-sm font-medium shadow-md hover:opacity-90 transition"
              >
                Apply
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}


// //----------------------------------code cloude---------------------------------------------------------// 

// import { Star, X, ChevronDown, ChevronUp } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useState } from "react";

// function FilterSection({ title, children }) {
//   const [open, setOpen] = useState(true);

//   return (
//     <div style={{ borderBottom: "1px solid #f0f0f0" }}>
//       <button
//         onClick={() => setOpen(!open)}
//         className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
//         style={{ background: "none", border: "none", cursor: "pointer" }}
//       >
//         <span
//           className="font-medium text-gray-800"
//           style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: "0.4px" }}
//         >
//           {title}
//         </span>
//         {open ? <ChevronUp size={14} color="#888" /> : <ChevronDown size={14} color="#888" />}
//       </button>
//       {open && <div className="px-4 pb-3">{children}</div>}
//     </div>
//   );
// }

// export default function FilterSidebar({
//   isOpen,
//   onClose,
//   categoryMap,
//   tempFilters,
//   setTempFilters,
//   priceRange,
//   setPriceRange,
//   rating,
//   setRating,
//   onApply,
//   onClear,
// }) {
//   const toggleCategory = (category, value) => {
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

//   const sidebar = (
//     <div
//       className="bg-white h-full overflow-y-auto"
//       style={{ borderRight: "1px solid #e0e0e0" }}
//     >
//       {/* HEADER */}
//       <div
//         className="flex items-center justify-between px-4 py-3 sticky top-0 bg-white z-10"
//         style={{ borderBottom: "1px solid #e0e0e0" }}
//       >
//         <span className="font-semibold text-gray-800" style={{ fontSize: 14 }}>
//           Filters
//         </span>
//         <div className="flex items-center gap-3">
//           <button
//             onClick={onClear}
//             className="text-xs font-medium hover:opacity-80 transition"
//             style={{ color: "#8B3A62", background: "none", border: "none", cursor: "pointer" }}
//           >
//             Clear All
//           </button>
//           <button onClick={onClose} className="lg:hidden text-gray-500">
//             <X size={18} />
//           </button>
//         </div>
//       </div>

//       {/* CATEGORY FILTERS */}
//       {Object.entries(categoryMap).map(([cat, subs]) => (
//         <FilterSection key={cat} title={cat}>
//           <div className="flex flex-col gap-2">
//             {(subs || []).map((sub) => {
//               const checked = tempFilters[cat]?.includes(sub) || false;
//               return (
//                 <label
//                   key={sub}
//                   className="flex items-center gap-2 cursor-pointer group"
//                   style={{ fontSize: 13 }}
//                 >
//                   <input
//                     type="checkbox"
//                     checked={checked}
//                     onChange={() => toggleCategory(cat, sub)}
//                     style={{ accentColor: "#8B3A62", width: 14, height: 14, cursor: "pointer" }}
//                   />
//                   <span
//                     className="transition-colors"
//                     style={{ color: checked ? "#8B3A62" : "#444" }}
//                   >
//                     {sub}
//                   </span>
//                 </label>
//               );
//             })}
//           </div>
//         </FilterSection>
//       ))}

//       {/* PRICE FILTER */}
//       <FilterSection title="Price">
//         <input
//           type="range"
//           min="0"
//           max="5000"
//           step="100"
//           value={priceRange[1]}
//           onChange={(e) => setPriceRange([0, Number(e.target.value)])}
//           className="w-full"
//           style={{ accentColor: "#8B3A62" }}
//         />
//         <div className="flex justify-between mt-1" style={{ fontSize: 12, color: "#888" }}>
//           <span>₹0</span>
//           <span style={{ color: "#8B3A62", fontWeight: 500 }}>₹{priceRange[1]}</span>
//         </div>

//         {/* PRESET PRICE RANGES */}
//         <div className="flex flex-col gap-1.5 mt-2">
//           {[
//             { label: "Under ₹500", max: 500 },
//             { label: "₹500 – ₹1,000", max: 1000 },
//             { label: "₹1,000 – ₹2,500", max: 2500 },
//             { label: "₹2,500 – ₹5,000", max: 5000 },
//           ].map((range) => (
//             <label key={range.max} className="flex items-center gap-2 cursor-pointer" style={{ fontSize: 13 }}>
//               <input
//                 type="radio"
//                 name="price-preset"
//                 checked={priceRange[1] === range.max}
//                 onChange={() => setPriceRange([0, range.max])}
//                 style={{ accentColor: "#8B3A62", width: 14, height: 14, cursor: "pointer" }}
//               />
//               <span style={{ color: priceRange[1] === range.max ? "#8B3A62" : "#444" }}>
//                 {range.label}
//               </span>
//             </label>
//           ))}
//         </div>
//       </FilterSection>

//       {/* RATING FILTER */}
//       <FilterSection title="Customer Ratings">
//         <div className="flex flex-col gap-2">
//           {[4, 3, 2, 1].map((r) => (
//             <label key={r} className="flex items-center gap-2 cursor-pointer" style={{ fontSize: 13 }}>
//               <input
//                 type="radio"
//                 checked={rating === r}
//                 onChange={() => setRating(r)}
//                 style={{ accentColor: "#8B3A62", width: 14, height: 14, cursor: "pointer" }}
//               />
//               <span
//                 className="inline-flex items-center gap-1"
//                 style={{ color: rating === r ? "#8B3A62" : "#444" }}
//               >
//                 <span
//                   className="text-white text-xs px-1.5 py-0.5 rounded font-medium"
//                   style={{ background: r >= 4 ? "#388e3c" : r >= 3 ? "#ff9f00" : "#f44336", fontSize: 11 }}
//                 >
//                   {r}★
//                 </span>
//                 &amp; above
//               </span>
//             </label>
//           ))}
//         </div>
//       </FilterSection>

//       {/* APPLY BUTTON (mobile) */}
//       <div className="lg:hidden p-4 sticky bottom-0 bg-white" style={{ borderTop: "1px solid #eee" }}>
//         <button
//           onClick={onApply}
//           className="w-full py-2.5 text-white font-medium text-sm rounded"
//           style={{ background: "#8B3A62" }}
//         >
//           Apply Filters
//         </button>
//       </div>
//     </div>
//   );

//   return (
//     <>
//       {/* DESKTOP: always visible, no animation */}
//       <div className="hidden lg:block h-fit sticky top-4">
//         {sidebar}
//       </div>

//       {/* MOBILE: animated slide-in */}
//       <AnimatePresence>
//         {isOpen && (
//           <>
//             <div
//               className="fixed inset-0 bg-black/40 z-40 lg:hidden"
//               onClick={onClose}
//             />
//             <motion.div
//               initial={{ x: -300 }}
//               animate={{ x: 0 }}
//               exit={{ x: -300 }}
//               transition={{ type: "tween", duration: 0.25 }}
//               className="fixed top-0 left-0 h-full w-72 z-50 shadow-xl lg:hidden"
//             >
//               {sidebar}
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }

//code 1 black text theame

// import { Star, X } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// export default function FilterSidebar({
//   isOpen,
//   onClose,
//   categoryMap,
//   tempFilters,
//   setTempFilters,
//   priceRange,
//   setPriceRange,
//   rating,
//   setRating,
//   onApply,
//   onClear,
// }) {
//   const toggleCategory = (category, value) => {
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

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           {/* MOBILE OVERLAY */}
//           <div
//             className="fixed inset-0 bg-black/40 z-40 lg:hidden"
//             onClick={onClose}
//           />

//           {/* SIDEBAR */}
//           <motion.div
//             initial={{ x: -300 }}
//             animate={{ x: 0 }}
//             exit={{ x: -300 }}
//             className="fixed lg:static top-0 left-0 h-full lg:h-auto w-72 lg:w-full bg-white z-50 shadow-lg lg:shadow-none p-5 overflow-y-auto pb-24"
//           >
//             {/* HEADER */}
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-xl font-semibold text-[#8B3A62]">
//                 Filters
//               </h2>
//               <button onClick={onClose} className="lg:hidden">
//                 <X />
//               </button>
//             </div>

//             {/* CATEGORY */}
//             {Object.entries(categoryMap).map(([cat, subs]) => (
//               <div key={cat} className="mb-6">
//                 <h3 className="text-md font-medium mb-3 text-[#8B3A62]">
//                   {cat}
//                 </h3>

//                 {(subs || []).map((sub) => (
//                   <label key={sub} className="flex gap-2 text-sm mb-1">
//                     <input
//                       type="checkbox"
//                       checked={tempFilters[cat]?.includes(sub) || false}
//                       onChange={() => toggleCategory(cat, sub)}
//                       className="accent-[#8B3A62]"
//                     />
//                     {sub}
//                   </label>
//                 ))}
//               </div>
//             ))}

//             {/* PRICE */}
//             <div className="mb-6">
//               <h3 className="text-md font-medium mb-3 text-[#8B3A62]">
//                 Price
//               </h3>

//               <input
//                 type="range"
//                 min="0"
//                 max="5000"
//                 value={priceRange[1]}
//                 onChange={(e) =>
//                   setPriceRange([0, Number(e.target.value)])
//                 }
//                 className="w-full accent-[#8B3A62]"
//               />

//               <div className="flex justify-between text-sm mt-2">
//                 <span>₹{priceRange[0]}</span>
//                 <span>₹{priceRange[1]}</span>
//               </div>
//             </div>

//             {/* RATING */}
//             <div className="mb-6">
//               <h3 className="text-md font-medium mb-3 text-[#8B3A62]">
//                 Rating
//               </h3>

//               {[5, 4, 3, 2, 1].map((r) => (
//                 <label key={r} className="flex items-center gap-2 mb-1">
//                   <input
//                     type="radio"
//                     checked={rating === r}
//                     onChange={() => setRating(r)}
//                     className="accent-[#8B3A62]"
//                   />

//                   <div className="flex">
//                     {[...Array(5)].map((_, i) => (
//                       <Star
//                         key={i}
//                         className={`w-4 h-4 ${
//                           i < r
//                             ? "text-[#D4AF37] fill-[#D4AF37]"
//                             : "text-gray-300"
//                         }`}
//                       />
//                     ))}
//                   </div>
//                 </label>
//               ))}
//             </div>

//             {/* ACTIONS */}
//             <div className="flex gap-2">
//               <button
//                 onClick={onClear}
//                 className="flex-1 border py-2 rounded"
//               >
//                 Clear
//               </button>

//               <button
//                 onClick={onApply}
//                 className="flex-1 bg-[#8B3A62] text-white py-2 rounded"
//               >
//                 Apply
//               </button>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// }

// ----------------------------------------------code 2 nyka style----------------------------------------------------- //

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// export default function FilterSidebar({
//   isOpen,
//   onClose,
//   categoryMap,
//   tempFilters,
//   setTempFilters,
//   priceRange,
//   setPriceRange,
//   rating,
//   setRating,
//   onApply,
//   onClear,
// }) {
//   const filterSections = [
//     "Category",
//     "Price",
//     "Rating",
//     ...Object.keys(categoryMap),
//   ];

//   const [activeSection, setActiveSection] = useState(filterSections[0]);

//   const toggleOption = (section, value) => {
//     setTempFilters((prev) => {
//       const current = prev[section] || [];

//       return {
//         ...prev,
//         [section]: current.includes(value)
//           ? current.filter((v) => v !== value)
//           : [...current, value],
//       };
//     });
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           {/* 🔹 OVERLAY */}
//           <motion.div
//             className="fixed inset-0 bg-black/40 z-40"
//             onClick={onClose}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           />

//           {/* 🔹 FILTER PANEL */}
//           <motion.div
//             initial={{ y: "100%" }}
//             animate={{ y: 0 }}
//             exit={{ y: "100%" }}
//             transition={{ duration: 0.3 }}
//             className="fixed bottom-0 left-0 w-full h-[85vh] bg-white z-50 rounded-t-2xl flex"
//           >
//             {/* 🔹 LEFT MENU */}
//             <div className="w-1/3 border-r bg-gray-50 overflow-y-auto">
//               {filterSections.map((section) => (
//                 <div
//                   key={section}
//                   onClick={() => setActiveSection(section)}
//                   className={`p-4 cursor-pointer text-sm ${
//                     activeSection === section
//                       ? "bg-white font-semibold text-[#8B3A62]"
//                       : "text-gray-600"
//                   }`}
//                 >
//                   {section}
//                 </div>
//               ))}
//             </div>

//             {/* 🔹 RIGHT PANEL */}
//             <div className="w-2/3 p-4 overflow-y-auto pb-28">
//               <h3 className="font-semibold mb-4">{activeSection}</h3>

//               {/* CATEGORY OPTIONS */}
//               {categoryMap[activeSection]?.map((item) => (
//                 <label
//                   key={item}
//                   className="flex items-center justify-between mb-3 text-sm"
//                 >
//                   {item}
//                   <input
//                     type="checkbox"
//                     checked={
//                       tempFilters[activeSection]?.includes(item) || false
//                     }
//                     onChange={() => toggleOption(activeSection, item)}
//                   />
//                 </label>
//               ))}

//               {/* PRICE */}
//               {activeSection === "Price" && (
//                 <div className="space-y-3">
//                   <input
//                     type="range"
//                     min={0}
//                     max={5000}
//                     value={priceRange[1]}
//                     onChange={(e) =>
//                       setPriceRange([0, Number(e.target.value)])
//                     }
//                     className="w-full"
//                   />
//                   <p className="text-sm">
//                     ₹0 - ₹{priceRange[1]}
//                   </p>
//                 </div>
//               )}

//               {/* RATING */}
//               {activeSection === "Rating" && (
//                 <div className="space-y-2">
//                   {[4, 3, 2, 1].map((r) => (
//                     <div
//                       key={r}
//                       onClick={() => setRating(r)}
//                       className={`cursor-pointer text-sm ${
//                         rating === r
//                           ? "text-[#8B3A62] font-semibold"
//                           : ""
//                       }`}
//                     >
//                       {r}★ & above
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* 🔥 BOTTOM ACTION BAR */}
//             <div className="absolute bottom-0 left-0 w-full bg-white border-t p-4 flex gap-3 shadow-[0_-4px_10px_rgba(0,0,0,0.08)]">
              
//               <button
//                 onClick={onClear}
//                 className="w-1/2 py-3 border rounded-lg text-gray-700"
//               >
//                 Clear All
//               </button>

//               <button
//                 onClick={onApply}
//                 className="w-1/2 py-3 bg-[#8B3A62] text-white rounded-lg shadow-md"
//               >
//                 Apply Filters
//               </button>

//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// }