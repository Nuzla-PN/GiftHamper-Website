// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ChevronLeft, Check, Sparkles } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { setWrapping } from "../features/addson/addsonSlice";
// import { wrappingStylesConfig } from "../data/dataConfig";

// export default function WrappingSelection() {
//   const navigate = useNavigate();
//   const dispatch= useDispatch();
//   const wrappingFromRedux = useSelector((state) => state.addons.wrapping);

//   const [selectedWrapping, setSelectedWrapping] = useState(wrappingFromRedux?.id || null);

//   const handleSelect = (id) => setSelectedWrapping(id);

//   const handleApply = () => {
//   const selectedOption = wrappingStylesConfig.find((wrap) => wrap.id === selectedWrapping);

//  if (selectedOption) {
//     dispatch(setWrapping(selectedOption));
//   }

//   navigate(-1); // go back to product page
// };

//   const handleSkip = () => {
//   dispatch(setWrapping(null));
//   navigate(-1);
// };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#faf7fb] to-white">
//       <div className="max-w-7xl mx-auto px-4 py-6 sm:py-10">

//         {/* 🔙 Back */}
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#8B3A62] transition mb-4"
//         >
//           <ChevronLeft className="w-4 h-4" />
//           Back to Product
//         </button>

//         {/* 🎁 Header */}
//         <div className="flex items-center gap-3 mb-6 sm:mb-8">
//           <div className="p-3 rounded-full bg-[#8B3A62]/10">
//             <Sparkles className="w-6 h-6 text-[#8B3A62]" />
//           </div>

//           <div>
//             <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
//               Choose Wrapping Style
//             </h1>
//             <p className="text-sm text-gray-500">
//               Make your gift presentation more special ✨
//             </p>
//           </div>
//         </div>

//         {/* 🧱 GRID */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
//           {wrappingStylesConfig.map((wrap) => (
//             <div
//               key={wrap.id}
//               onClick={() => handleSelect(wrap.id)}
//               className={`group cursor-pointer rounded-2xl overflow-hidden border bg-white transition-all duration-300
//                 hover:shadow-xl hover:-translate-y-1
//                 ${selectedWrapping === wrap.id ? "ring-2 ring-[#8B3A62] shadow-lg" : ""}
//               `}
//             >
//               {/* 🖼 IMAGE */}
//               <div className="relative aspect-square overflow-hidden">
//                 <img
//                   src={wrap.image}
//                   alt={wrap.name}
//                   className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
//                 />

//                 {/* PRICE BADGE */}
//                 <span className="absolute top-2 left-2 bg-[#8B3A62] text-white text-xs px-2 py-1 rounded-full shadow">
//                   ₹{wrap.price}
//                 </span>

//                 {/* SELECTED ICON */}
//                 {selectedWrapping === wrap.id && (
//                   <div className="absolute top-2 right-2 bg-green-600 text-white rounded-full p-1.5 shadow">
//                     <Check className="w-4 h-4" />
//                   </div>
//                 )}
//               </div>

//               {/* 📦 CONTENT */}
//               <div className="p-4 flex flex-col gap-2">
//                 <h3 className="font-semibold text-gray-800 text-base">{wrap.name}</h3>
//                 <p className="text-xs text-gray-500 line-clamp-2">{wrap.description}</p>

//                 {/* FEATURES */}
//                 <div className="space-y-1 mt-1">
//                   {wrap.features.slice(0, 3).map((feature, idx) => (
//                     <div key={idx} className="flex items-start gap-2 text-xs text-gray-600">
//                       <span className="w-1 h-1 bg-[#8B3A62] rounded-full mt-1.5"></span>
//                       <span>{feature}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* BUTTON */}
//               <div className="p-4 pt-0">
//                 <button
//                   onClick={(e) => { e.stopPropagation(); handleSelect(wrap.id); }}
//                   className={`w-full py-2 rounded-lg text-sm font-medium transition
//                     ${selectedWrapping === wrap.id
//                       ? "bg-[#8B3A62] text-white"
//                       : "border text-gray-700 hover:border-[#8B3A62] hover:text-[#8B3A62]"
//                     }
//                   `}
//                 >
//                   {selectedWrapping === wrap.id ? "Selected ✓" : "Select"}
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* 📌 STICKY ACTION BAR */}
//         <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-lg p-4 sm:p-5">
//           <div className="max-w-3xl mx-auto flex gap-3">
//             <button
//               onClick={handleSkip}
//               className="flex-1 py-3 rounded-full border text-gray-700 hover:border-[#8B3A62] hover:text-[#8B3A62] transition"
//             >
//               Skip
//             </button>

//             <button
//               onClick={handleApply}
//               disabled={!selectedWrapping}
//               className={`flex-1 py-3 rounded-full font-medium text-white transition
//                 ${selectedWrapping
//                   ? "bg-[#8B3A62] hover:bg-[#732d52]"
//                   : "bg-gray-300 cursor-not-allowed"
//                 }
//               `}
//             >
//               Apply Selection
//             </button>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

//cl code

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Check, Sparkles } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setWrapping } from "../features/addson/addsonSlice";
import { wrappingStylesConfig } from "../data/dataConfig";

const DOT_PATTERN_BG = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Ccircle cx='30' cy='30' r='20'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;

export default function WrappingSelection() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wrappingFromRedux = useSelector((state) => state.addons.wrapping);

  const [selectedWrapping, setSelectedWrapping] = useState(wrappingFromRedux?.id || null);

  const handleSelect = (id) => setSelectedWrapping(id);

  const handleApply = () => {
    const selectedOption = wrappingStylesConfig.find((wrap) => wrap.id === selectedWrapping);
    if (selectedOption) {
      dispatch(setWrapping(selectedOption));
    }
    navigate(-1);
  };

  const handleSkip = () => {
    dispatch(setWrapping(null));
    navigate(-1);
  };

  const activeWrap = wrappingStylesConfig.find((w) => w.id === selectedWrapping);

  return (
    <div className="min-h-screen bg-[#faf8f6] pb-24">

      {/* Keyframe animations */}
      <style>{`
        @keyframes popIn {
          from { transform: scale(0); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }
        .anim-pop { animation: popIn 0.3s cubic-bezier(0.34,1.56,0.64,1); }
      `}</style>

      {/* ── HERO ── */}
      <div
        className="relative overflow-hidden px-6 pt-5 pb-10"
        style={{
          background: "linear-gradient(135deg, #2d1b35 0%, #8B3A62 60%, #c26b8a 100%)",
        }}
      >
        {/* Dot pattern overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: DOT_PATTERN_BG }}
        />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="relative z-10 inline-flex items-center gap-1.5 bg-transparent border-0 p-0 cursor-pointer
                     text-white/75 hover:text-white text-[13px] font-medium transition-colors duration-200"
        >
          <ChevronLeft size={16} />
          Back to Product
        </button>

        {/* Hero row */}
        <div className="relative z-10 mt-4 flex items-end justify-between gap-3 flex-wrap">
          <div>
            <h1 className="text-white font-semibold leading-[1.1] text-2xl sm:text-3xl">
              Choose Your
              <br />
              Wrapping Style
            </h1>
            <p className="text-white/70 text-sm mt-1.5 font-light">
              Make your gift presentation more special ✨
            </p>
          </div>

          {/* Badge */}
          <div
            className="flex items-center gap-1.5 text-white text-xs font-medium
                       rounded-full px-4 py-2 shrink-0 whitespace-nowrap border border-white/20"
            style={{
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(8px)",
            }}
          >
            <Sparkles size={14} />
            {wrappingStylesConfig.length} styles available
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="max-w-[1100px] mx-auto px-4 py-8">

        {/* Section label */}
        <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#8B3A62] mb-4">
          Select a wrapping style
        </p>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 max-sm:gap-3">
          {wrappingStylesConfig.map((wrap) => {
            const isSelected = selectedWrapping === wrap.id;
            return (
              <div
                key={wrap.id}
                onClick={() => handleSelect(wrap.id)}
                className={`
                  group cursor-pointer bg-white rounded-2xl overflow-hidden
                  border-2 transition-all duration-300
                  hover:-translate-y-1 hover:shadow-xl hover:shadow-[#8B3A62]/15
                  ${isSelected
                    ? "border-[#8B3A62] shadow-[0_8px_28px_rgba(139,58,98,0.22)]"
                    : "border-transparent shadow-[0_2px_12px_rgba(0,0,0,0.07)]"
                  }
                `}
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={wrap.image}
                    alt={wrap.name}
                    className="w-full h-full object-cover block transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                  {/* Price badge */}
                  <span className="absolute top-2.5 left-2.5 bg-[#8B3A62] text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow">
                    ₹{wrap.price}
                  </span>

                  {/* Check badge */}
                  {isSelected && (
                    <div className="anim-pop absolute top-2.5 right-2.5 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                      <Check size={14} color="#fff" strokeWidth={3} />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col gap-1.5">
                  <h3 className="font-semibold text-gray-800 text-base">{wrap.name}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2">{wrap.description}</p>

                  {/* Features */}
                  <div className="space-y-1 mt-1">
                    {wrap.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                        <span className="w-1 h-1 bg-[#8B3A62] rounded-full mt-1.5 shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Select button */}
                <div className="px-4 pb-4">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleSelect(wrap.id); }}
                    className={`
                      w-full py-2 rounded-lg text-sm font-medium transition-all duration-200
                      ${isSelected
                        ? "bg-[#8B3A62] text-white"
                        : "border border-gray-200 text-gray-700 hover:border-[#8B3A62] hover:text-[#8B3A62]"
                      }
                    `}
                  >
                    {isSelected ? "Selected ✓" : "Select"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── FIXED ACTION BAR ── */}
      <div
        className="fixed bottom-0 left-0 w-full border-t border-black/[0.07] px-4 py-3 z-[100]"
        style={{
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="max-w-[560px] mx-auto flex items-center gap-2.5">

          {/* Selected preview
          {selectedWrapping && (
            <div className="text-sm text-[#8B3A62] font-medium shrink-0 mr-1 truncate max-w-[80px]">
              {activeWrap?.name}
            </div>
          )} */}

          {/* Skip */}
          <button
            onClick={handleSkip}
            className="shrink-0 px-6 py-3.5 rounded-full bg-transparent cursor-pointer
                       border-[1.5px] border-[#ddd] text-gray-600 text-sm font-medium whitespace-nowrap
                       hover:border-[#8B3A62] hover:text-[#8B3A62] transition-all duration-200"
          >
            Skip
          </button>

          {/* Apply */}
          <button
            onClick={handleApply}
            disabled={!selectedWrapping}
            className={`
              flex-1 flex items-center justify-center gap-2
              py-3.5 rounded-full border-0 cursor-pointer
              text-[15px] font-semibold transition-all duration-[250ms]
              ${selectedWrapping
                ? "text-white shadow-[0_4px_16px_rgba(139,58,98,0.35)] hover:-translate-y-px hover:shadow-[0_6px_22px_rgba(139,58,98,0.45)]"
                : "bg-[#e0d6da] text-[#b0a0a8] cursor-not-allowed shadow-none"
              }
            `}
            style={
              selectedWrapping
                ? { background: "linear-gradient(135deg, #8B3A62, #c26b8a)" }
                : undefined
            }
          >
            {selectedWrapping ? (
              <>
                <Check size={16} strokeWidth={3} />
                Apply Selection
              </>
            ) : (
              "Select a Style"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
