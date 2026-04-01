// import { useState } from "react";
// import { useNavigate, useParams, useSearchParams } from "react-router-dom";
// import { ChevronLeft, Check, Mail } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { setGiftCard } from "../features/addson/addsonSlice";

// const greetingCards = [
//   {
//     id: "birthday",
//     name: "Birthday Celebration",
//     price: 49,
//     description: "Happy Birthday wishes with balloons",
//     image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400",
//     defaultMessage:
//       "Wishing you a very Happy Birthday! May your day be filled with joy and happiness.",
//   },
//   {
//     id: "thankyou",
//     name: "Thank You",
//     price: 49,
//     description: "Express your gratitude",
//     image: "https://images.unsplash.com/photo-1516961642265-531546e84af2?w=400",
//     defaultMessage:
//       "Thank you for being so wonderful! Your kindness means the world to me.",
//   },
//   {
//     id: "celebration",
//     name: "Celebration",
//     price: 49,
//     description: "General celebration card",
//     image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400",
//     defaultMessage:
//       "Congratulations! Wishing you all the best in this special moment.",
//   },
//   {
//     id: "love",
//     name: "With Love",
//     price: 59,
//     description: "Share your love and affection",
//     image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400",
//     defaultMessage:
//       "Sending you love and warm wishes. You mean so much to me!",
//   },
//   {
//     id: "getwell",
//     name: "Get Well Soon",
//     price: 49,
//     description: "Wishes for speedy recovery",
//     image: "https://images.unsplash.com/photo-1587070653367-c19b8f63f865?w=400",
//     defaultMessage:
//       "Wishing you a speedy recovery! Get well soon and take care.",
//   },
// ];

// export default function GreetingCardSelection() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
  
//   const { id } = useParams();
   

//   const giftcardfromRedux = useSelector((state) => state.addons.giftCard);
//   const [selectedCard, setSelectedCard] = useState(giftcardfromRedux?.id || null);
  
//   const [cardMessage, setCardMessage] = useState("");

//   const handleSelect = (cardId) => {
//     setSelectedCard(cardId);
//     const card = greetingCards.find((c) => c.id === cardId);
//     if (card) setCardMessage(card.defaultMessage);
//   };

//   const handleApply = () => {
//     const selectedOption = greetingCards.find((card) => card.id === selectedCard);

//      if (selectedOption) {
//          dispatch(setGiftCard(selectedOption));
//        }
     
//        navigate(-1); // go back to product page
//      };

//  const handleSkip = () => {
//   dispatch(setGiftCard(null));
//   navigate(-1);
// };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#faf7fb] to-white">

//       <div className="max-w-7xl mx-auto px-4 py-6 sm:py-10">

//         {/* BACK */}
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#8B3A62] mb-4"
//         >
//           <ChevronLeft className="w-4 h-4" />
//           Back to Product
//         </button>

//         {/* HEADER */}
//         <div className="flex items-center gap-3 mb-8">
//           <div className="p-3 rounded-full bg-[#8B3A62]/10">
//             <Mail className="w-6 h-6 text-[#8B3A62]" />
//           </div>

//           <div>
//             <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
//               Choose Greeting Card
//             </h1>
//             <p className="text-sm text-gray-500">
//               Add a personal touch to your gift 💌
//             </p>
//           </div>
//         </div>

//         {/* GRID */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {greetingCards.map((card) => (
//             <div
//               key={card.id}
//               onClick={() => handleSelect(card.id)}
//               className={`cursor-pointer bg-white rounded-2xl border transition hover:shadow-lg
//                 ${selectedCard === card.id ? "ring-2 ring-[#8B3A62]" : ""}
//               `}
//             >
//               <div className="relative aspect-[4/3]">
//                 <img
//                   src={card.image}
//                   className="w-full h-full object-cover rounded-t-2xl"
//                 />

//                 <span className="absolute top-2 left-2 bg-[#8B3A62] text-white text-xs px-2 py-1 rounded-full">
//                   ₹{card.price}
//                 </span>

//                 {selectedCard === card.id && (
//                   <div className="absolute top-2 right-2 bg-green-600 text-white p-1 rounded-full">
//                     <Check className="w-4 h-4" />
//                   </div>
//                 )}
//               </div>

//               <div className="p-4">
//                 <h3 className="font-semibold">{card.name}</h3>
//                 <p className="text-xs text-gray-500">{card.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* MESSAGE BOX */}
//         {selectedCard && (
//           <div className="mt-8 bg-white border rounded-xl p-5 max-w-2xl mx-auto">
//             <h3 className="font-semibold mb-2">Your Message</h3>
//             <textarea
//               className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B3A62]"
//               rows={4}
//               value={cardMessage}
//               onChange={(e) =>
//                 setCardMessage(e.target.value.slice(0, 300))
//               }
//             />
//             <p className="text-xs text-gray-400 mt-1">
//               {cardMessage.length}/300
//             </p>
//           </div>
//         )}

//       </div>

//       {/* ACTION BAR */}
//       <div className="fixed bottom-0 left-0 w-full bg-white border-t p-4 shadow-lg">
//         <div className="max-w-3xl mx-auto flex gap-3">
//           <button
//             onClick={handleSkip}
//             className="flex-1 border py-3 rounded-full text-gray-700 hover:border-[#8B3A62]"
//           >
//             Skip
//           </button>

//           <button
//             onClick={handleApply}
//             disabled={!selectedCard}
//             className={`flex-1 py-3 rounded-full text-white
//               ${
//                 selectedCard
//                   ? "bg-[#8B3A62] hover:bg-[#732d52]"
//                   : "bg-gray-300"
//               }
//             `}
//           >
//             Apply Selection
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


//cluad code2 

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Check, Mail, Sparkles } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setGiftCard } from "../features/addson/addsonSlice";

const greetingCards = [
  {
    id: "birthday",
    name: "Birthday Celebration",
    price: 49,
    description: "Happy Birthday wishes with balloons",
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600",
    defaultMessage:
      "Wishing you a very Happy Birthday! May your day be filled with joy and happiness.",
  },
  {
    id: "thankyou",
    name: "Thank You",
    price: 49,
    description: "Express your gratitude",
    image: "https://images.unsplash.com/photo-1516961642265-531546e84af2?w=600",
    defaultMessage:
      "Thank you for being so wonderful! Your kindness means the world to me.",
  },
  {
    id: "celebration",
    name: "Celebration",
    price: 49,
    description: "General celebration card",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600",
    defaultMessage:
      "Congratulations! Wishing you all the best in this special moment.",
  },
  {
    id: "love",
    name: "With Love",
    price: 59,
    description: "Share your love and affection",
    image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600",
    defaultMessage:
      "Sending you love and warm wishes. You mean so much to me!",
  },
  {
    id: "getwell",
    name: "Get Well Soon",
    price: 49,
    description: "Wishes for speedy recovery",
    image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600",
    defaultMessage:
      "Wishing you a speedy recovery! Get well soon and take care.",
  },
];

const DOT_PATTERN_BG = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Ccircle cx='30' cy='30' r='20'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;

export default function GreetingCardSelection() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const giftcardfromRedux = useSelector((state) => state.addons.giftCard);
  const [selectedCard, setSelectedCard] = useState(giftcardfromRedux?.id || null);
  const [cardMessage, setCardMessage] = useState(giftcardfromRedux?.defaultMessage || "");

  const handleSelect = (cardId) => {
    setSelectedCard(cardId);
    const card = greetingCards.find((c) => c.id === cardId);
    if (card) setCardMessage(card.defaultMessage);
  };

  const handleApply = () => {
    const selectedOption = greetingCards.find((card) => card.id === selectedCard);
    if (selectedOption) {
      dispatch(setGiftCard({ ...selectedOption, customMessage: cardMessage }));
    }
    navigate(-1);
  };

  const handleSkip = () => {
    dispatch(setGiftCard(null));
    navigate(-1);
  };

  const activeCard = greetingCards.find((c) => c.id === selectedCard);

  return (
    <div className="min-h-screen bg-[#faf8f6] pb-24">

      <style>{`
        @keyframes popIn {
          from { transform: scale(0); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .anim-pop   { animation: popIn  0.3s cubic-bezier(0.34,1.56,0.64,1); }
        .anim-slide { animation: slideUp 0.35s ease; }
      `}</style>

      <div
        className="relative overflow-hidden px-6 pt-5 pb-10"
        style={{
          background: "linear-gradient(135deg, #2d1b35 0%, #8B3A62 60%, #c26b8a 100%)",
        }}
      >
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
            <h1
              className="text-white font-semibold leading-[1.1] text-2xl sm:text-3xl"
            >
              Choose Your
              <br />
              Greeting Card
            </h1>
            <p className="text-white/70 text-sm mt-1.5 font-light">
              Add a heartfelt personal touch to your gift 💌
            </p>
          </div>

          {/* Badge — replicates gc-badge */}
          <div
            className="flex items-center gap-1.5 text-white text-xs font-medium
                       rounded-full px-4 py-2 shrink-0 whitespace-nowrap
                       border border-white/20"
            style={{
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(8px)",
            }}
          >
            <Sparkles size={14} />
            {greetingCards.length} designs available
          </div>
        </div>
      </div>

      {/* ══════════════
          BODY
      ══════════════ */}
      <div className="max-w-[1100px] mx-auto px-4 py-8">

        {/* Section label */}
        <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#8B3A62] mb-4">
          Select a card style
        </p>

        {/* Card grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-5 max-sm:gap-3">
          {greetingCards.map((card) => {
            const isSelected = selectedCard === card.id;
            return (
              <div
                key={card.id}
                onClick={() => handleSelect(card.id)}
                className={`
                  group cursor-pointer bg-white rounded-[20px] overflow-hidden
                  border-2 transition-all duration-[250ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]
                  ${isSelected
                    ? "border-[#8B3A62] shadow-[0_8px_28px_rgba(139,58,98,0.22)] translate-y-0"
                    : "border-transparent shadow-[0_2px_12px_rgba(0,0,0,0.07)] hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(139,58,98,0.18)]"
                  }
                `}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.name}
                    loading="lazy"
                    className="w-full h-full object-cover block transition-transform duration-500 group-hover:scale-[1.06]"
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

                  {/* Price tag */}
                  <span className="absolute top-2.5 left-2.5 bg-[#8B3A62] text-white text-xs font-semibold px-2.5 py-1 rounded-full tracking-[0.02em]">
                    ₹{card.price}
                  </span>

                  {/* Check badge */}
                  {isSelected && (
                    <div className="anim-pop absolute top-2.5 right-2.5 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                      <Check size={14} color="#fff" strokeWidth={3} />
                    </div>
                  )}

                  {/* Emoji */}
                  <span className="absolute bottom-2.5 right-3 text-2xl drop-shadow-md">
                    {card.emoji}
                  </span>
                </div>

                {/* Info */}
                <div className="px-4 py-3.5">
                  <p className="font-semibold text-gray-800 text-base leading-snug">
                    {card.name}
                  </p>
                  <p className="text-xs text-[#888] mt-0.5">{card.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Message editor */}
        {selectedCard && (
          <div className="anim-slide mt-9">
            <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#8B3A62] mb-4">
              Personalize your message
            </p>

            <div className="bg-white rounded-[20px] p-6 shadow-[0_2px_16px_rgba(0,0,0,0.07)] border-l-4 border-[#8B3A62] max-w-[680px]">
              {/* Header */}
              <div className="flex items-center justify-between flex-wrap gap-2 mb-3.5">
                <div
                  className="flex items-center gap-2 text-gray-800 text-base font-semibold"
                >
                  <Mail size={18} color="#8B3A62" />
                  Your Message
                </div>
                <span className="bg-[#f3e8ef] text-[#8B3A62] text-[11px] font-semibold px-2.5 py-1 rounded-full tracking-[0.06em]">
                  {activeCard?.emoji} {activeCard?.name}
                </span>
              </div>

              {/* Textarea */}
              <textarea
                rows={4}
                value={cardMessage}
                placeholder="Write your heartfelt message here..."
                onChange={(e) => setCardMessage(e.target.value.slice(0, 300))}
                className="w-full resize-none outline-none text-sm text-gray-700 leading-relaxed rounded-xl p-3.5
                           bg-[#fdfbfc] border-[1.5px] border-[#e8d5de]
                           focus:border-[#8B3A62] focus:bg-white
                           transition-[border-color,box-shadow] duration-200"
                onFocus={(e) => (e.target.style.boxShadow = "0 0 0 3px rgba(139,58,98,0.1)")}
                onBlur={(e)  => (e.target.style.boxShadow = "none")}
              />
              <p className="text-right text-[11px] text-[#aaa] mt-2">
                {cardMessage.length} / 300
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════
          FIXED ACTION BAR — replicates gc-action-bar exactly
      ══════════════════════════════════════ */}
      <div
        className="fixed bottom-0 left-0 w-full border-t border-black/[0.07] px-4 py-3 z-[100]"
        style={{
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="max-w-[560px] mx-auto flex items-center gap-2.5">

          {/* Emoji preview */}
          {selectedCard && (
            <div className="flex items-center gap-1.5 text-[13px] text-[#8B3A62] font-medium mr-1 shrink-0">
              {activeCard?.emoji}
            </div>
          )}

          {/* Skip */}
          <button
            onClick={handleSkip}
            className="shrink-0 px-6 py-3.5 rounded-full bg-transparent cursor-pointer
                       border-[1.5px] border-[#ddd] text-[#666] text-sm font-medium whitespace-nowrap
                       hover:border-[#8B3A62] hover:text-[#8B3A62] transition-all duration-200"
          >
            Skip
          </button>

          {/* Apply */}
          <button
            onClick={handleApply}
            disabled={!selectedCard}
            className={`
              flex-1 flex items-center justify-center gap-2
              py-3.5 rounded-full border-0 cursor-pointer
              text-[15px] font-semibold transition-all duration-[250ms]
              ${selectedCard
                ? "text-white shadow-[0_4px_16px_rgba(139,58,98,0.35)] hover:-translate-y-px hover:shadow-[0_6px_22px_rgba(139,58,98,0.45)]"
                : "bg-[#e0d6da] text-[#b0a0a8] cursor-not-allowed shadow-none"
              }
            `}
            style={
              selectedCard
                ? { background: "linear-gradient(135deg, #8B3A62, #c26b8a)" }
                : undefined
            }
          >
            {selectedCard ? (
              <>
                <Check size={16} strokeWidth={3} />
                Apply Selection
              </>
            ) : (
              "Select a Card"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}



// //claude code

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ChevronLeft, Check, Mail, Sparkles } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { setGiftCard } from "../features/addson/addsonSlice";

// const greetingCards = [
//   {
//     id: "birthday",
//     name: "Birthday Celebration",
//     price: 49,
//     description: "Happy Birthday wishes with balloons",
//     image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600",
//     defaultMessage:
//       "Wishing you a very Happy Birthday! May your day be filled with joy and happiness.",
//   },
//   {
//     id: "thankyou",
//     name: "Thank You",
//     price: 49,
//     description: "Express your gratitude",
//     image: "https://images.unsplash.com/photo-1516961642265-531546e84af2?w=600",
//     defaultMessage:
//       "Thank you for being so wonderful! Your kindness means the world to me.",
//   },
//   {
//     id: "celebration",
//     name: "Celebration",
//     price: 49,
//     description: "General celebration card",
//     image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600",
//     defaultMessage:
//       "Congratulations! Wishing you all the best in this special moment.",
//   },
//   {
//     id: "love",
//     name: "With Love",
//     price: 59,
//     description: "Share your love and affection",
//     image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600",
//     defaultMessage:
//       "Sending you love and warm wishes. You mean so much to me!",
//   },
//   {
//     id: "getwell",
//     name: "Get Well Soon",
//     price: 49,
//     description: "Wishes for speedy recovery",
//     image: "https://images.unsplash.com/photo-1587070653367-c19b8f63f865?w=600",
//     defaultMessage:
//       "Wishing you a speedy recovery! Get well soon and take care.",
//   },
// ];

// export default function GreetingCardSelection() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const giftcardfromRedux = useSelector((state) => state.addons.giftCard);
//   const [selectedCard, setSelectedCard] = useState(giftcardfromRedux?.id || null);
//   const [cardMessage, setCardMessage] = useState(giftcardfromRedux?.defaultMessage || "");

//   const handleSelect = (cardId) => {
//     setSelectedCard(cardId);
//     const card = greetingCards.find((c) => c.id === cardId);
//     if (card) setCardMessage(card.defaultMessage);
//   };

//   const handleApply = () => {
//     const selectedOption = greetingCards.find((card) => card.id === selectedCard);
//     if (selectedOption) {
//       dispatch(setGiftCard({ ...selectedOption, customMessage: cardMessage }));
//     }
//     navigate(-1);
//   };

//   const handleSkip = () => {
//     dispatch(setGiftCard(null));
//     navigate(-1);
//   };

//   const activeCard = greetingCards.find((c) => c.id === selectedCard);

//   return (
//     <div className="min-h-screen bg-rose-50 pb-28 font-sans">

//       {/* ── HERO HEADER ── */}
//       <div className="bg-gradient-to-br from-[#2d1b35] via-[#8B3A62] to-[#c26b8a] px-4 pt-5 pb-10 relative overflow-hidden">
//         {/* decorative circles */}
//         <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white opacity-5" />
//         <div className="absolute bottom-0 left-1/3 w-32 h-32 rounded-full bg-white opacity-5" />

//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm font-medium transition-colors relative z-10"
//         >
//           <ChevronLeft className="w-4 h-4" />
//           Back to Product
//         </button>

//         <div className="mt-5 flex items-end justify-between gap-3 flex-wrap relative z-10">
//           <div>
//             <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight tracking-tight">
//               Choose Your<br />Greeting Card
//             </h1>
//             <p className="text-white/60 text-sm mt-2 font-light">
//               Add a heartfelt personal touch to your gift 💌
//             </p>
//           </div>

//           <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white text-xs font-semibold shrink-0">
//             <Sparkles className="w-3.5 h-3.5" />
//             {greetingCards.length} designs
//           </div>
//         </div>
//       </div>

//       {/* ── BODY ── */}
//       <div className="max-w-5xl mx-auto px-4 -mt-4">

//         {/* ── CARD GRID ── */}
//         <p className="text-[10px] font-bold tracking-widest uppercase text-[#8B3A62] mb-4 mt-6">
//           Select a card style
//         </p>

//         <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
//           {greetingCards.map((card) => {
//             const isSelected = selectedCard === card.id;
//             return (
//               <div
//                 key={card.id}
//                 onClick={() => handleSelect(card.id)}
//                 className={`
//                   group cursor-pointer bg-white rounded-2xl overflow-hidden
//                   border-2 transition-all duration-300
//                   hover:-translate-y-1 hover:shadow-xl hover:shadow-[#8B3A62]/15
//                   ${isSelected
//                     ? "border-[#8B3A62] shadow-lg shadow-[#8B3A62]/20"
//                     : "border-transparent shadow-sm"
//                   }
//                 `}
//               >
//                 {/* Image */}
//                 <div className="relative aspect-[4/3] overflow-hidden">
//                   <img
//                     src={card.image}
//                     alt={card.name}
//                     loading="lazy"
//                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//                   />
//                   {/* overlay */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

//                   {/* Price */}
//                   <span className="absolute top-2.5 left-2.5 bg-[#8B3A62] text-white text-xs font-semibold px-2.5 py-1 rounded-full">
//                     ₹{card.price}
//                   </span>

//                   {/* Check */}
//                   {isSelected && (
//                     <div className="absolute top-2.5 right-2.5 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center animate-bounce-once shadow-md">
//                       <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
//                     </div>
//                   )}
//                 </div>

//                 {/* Info */}
//                 <div className="p-3.5">
//                   <h3 className="font-semibold text-gray-800 text-sm leading-snug">
//                     {card.name}
//                   </h3>
//                   <p className="text-xs text-gray-400 mt-0.5">{card.description}</p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* ── MESSAGE BOX ── */}
//         {selectedCard && (
//           <div className="mt-8 animate-fade-in-up">
//             <p className="text-[10px] font-bold tracking-widest uppercase text-[#8B3A62] mb-4">
//               Personalize your message
//             </p>

//             <div className="bg-white rounded-2xl p-5 shadow-sm border-l-4 border-[#8B3A62] max-w-2xl">
//               {/* Header */}
//               <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
//                 <div className="flex items-center gap-2 text-[#2d1b35] font-semibold text-base">
//                   <Mail className="w-4 h-4 text-[#8B3A62]" />
//                   Your Message
//                 </div>
//                 <span className="bg-rose-50 text-[#8B3A62] text-xs font-semibold px-3 py-1 rounded-full">
//                   {activeCard?.emoji} {activeCard?.name}
//                 </span>
//               </div>

//               {/* Textarea */}
//               <textarea
//                 rows={4}
//                 value={cardMessage}
//                 placeholder="Write your heartfelt message here..."
//                 onChange={(e) => setCardMessage(e.target.value.slice(0, 300))}
//                 className="w-full border border-rose-100 rounded-xl p-3.5 text-sm text-gray-700 bg-rose-50/40 resize-none outline-none leading-relaxed
//                   focus:ring-2 focus:ring-[#8B3A62]/30 focus:border-[#8B3A62] transition-all"
//               />
//               <p className="text-right text-xs text-gray-400 mt-1.5">
//                 {cardMessage.length} / 300
//               </p>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* ── FIXED ACTION BAR ── */}
//       <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-gray-100 px-4 py-3 z-50 shadow-lg">
//         <div className="max-w-lg mx-auto flex items-center gap-3">

//           {/* Selected emoji indicator */}
//           {selectedCard && (
//             <span className="text-xl shrink-0">{activeCard?.emoji}</span>
//           )}

//           {/* Skip */}
//           <button
//             onClick={handleSkip}
//             className="shrink-0 px-5 py-3 rounded-full border border-gray-200 text-gray-600 text-sm font-medium
//               hover:border-[#8B3A62] hover:text-[#8B3A62] transition-all"
//           >
//             Skip
//           </button>

//           {/* Apply */}
//           <button
//             onClick={handleApply}
//             disabled={!selectedCard}
//             className={`
//               flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold transition-all duration-200
//               ${selectedCard
//                 ? "bg-gradient-to-r from-[#8B3A62] to-[#c26b8a] text-white shadow-lg shadow-[#8B3A62]/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#8B3A62]/40"
//                 : "bg-gray-100 text-gray-400 cursor-not-allowed"
//               }
//             `}
//           >
//             {selectedCard ? (
//               <>
//                 <Check className="w-4 h-4" strokeWidth={3} />
//                 Apply Selection
//               </>
//             ) : (
//               "Select a Card First"
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
