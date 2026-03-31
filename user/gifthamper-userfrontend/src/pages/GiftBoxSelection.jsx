import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ChevronLeft, Check, Gift } from "lucide-react";



const giftBoxOptions = [
  { 
    id: "basic", 
    name: "Basic Gift Box", 
    price: 99, 
    description: "Simple elegant box with tissue paper",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400",
    features: ["xxxxxxxx", "xxxxxxx", "xxxxxxxxx"]
  },
  { 
    id: "Normal", 
    name: "Normal Gift Box", 
    price: 199, 
    description: "Luxury gift box with ribbon",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400",
    // image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400",
    features: ["xxxxxxxx", "xxxxxxx", "xxxxxxxxx"]
  },
  { 
    id: "Premium", 
    name: "Premium Gift Box", 
    price: 299, 
    description: "Premium box with custom message card",
    image: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=400",
    features: ["xxxxxxxx", "xxxxxxx", "xxxxxxxxx"]
  },
  { 
    id: "luxury", 
    name: "Luxury Gift Box", 
    price: 499, 
    description: "Ultimate branded gift box",
    image: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=400",
    // image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400",
    features: ["xxxxxxxx", "xxxxxxx", "xxxxxxxxx"]
  },
];

export default function GiftBoxSelection() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const productId = searchParams.get("productId");
  const currentSelection = searchParams.get("giftBox");

  const [selectedBox, setSelectedBox] = useState(currentSelection || null);

    const handleSelect = (boxId) => {
    setSelectedBox(boxId);
  };

  const handleApply = () => {
  const selectedOption = giftBoxOptions.find(
    (box) => box.id === selectedBox
  );

  const params = new URLSearchParams();

  params.set("productId", productId);

  // ✅ Preserve wrapping
  const wrapping = searchParams.get("wrapping");
  const wrappingPrice = searchParams.get("wrappingPrice");

  if (wrapping) params.set("wrapping", wrapping);
  if (wrappingPrice) params.set("wrappingPrice", wrappingPrice);

  // ❌ REMOVE giftCard completely (since not implemented)
  // DO NOT include giftCard at all

  // ✅ Add gift box
  if (selectedOption) {
    params.set("giftBox", selectedBox);
    params.set("giftBoxPrice", selectedOption.price);
  }

  navigate(`/products/${productId}?${params.toString()}`);
};

const handleSkip = () => {
  const params = new URLSearchParams(searchParams);

  // ❌ Remove ONLY gift box
  params.delete("giftBox");
  params.delete("giftBoxPrice");

  navigate(`/products/${productId}?${params.toString()}`);
};

return (
  <div className="min-h-screen bg-gradient-to-br from-[#faf7fb] to-white">
   

    <div className="max-w-7xl mx-auto px-4 py-6 sm:py-10">

      {/* 🔙 Back */}
      <button
        onClick={() => navigate(`/products/${productId}`)}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#8B3A62] transition mb-4"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Product
      </button>

      {/* 🎁 Header */}
      <div className="flex items-center gap-3 mb-6 sm:mb-8">
        <div className="p-3 rounded-full bg-[#8B3A62]/10">
          <Gift className="w-6 h-6 text-[#8B3A62]" />
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
            Choose Gift Box
          </h1>
          <p className="text-sm text-gray-500">
            Make your gift presentation more special ✨
          </p>
        </div>
      </div>

      {/* 🧱 GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">

        {giftBoxOptions.map((box) => (
          <div
            key={box.id}
            onClick={() => handleSelect(box.id)}
            className={`group cursor-pointer rounded-2xl overflow-hidden border bg-white transition-all duration-300 
              hover:shadow-xl hover:-translate-y-1
              ${selectedBox === box.id ? "ring-2 ring-[#8B3A62] shadow-lg" : ""}
            `}
          >
            {/* 🖼 IMAGE */}
            <div className="relative aspect-square overflow-hidden">
              <img
                src={box.image}
                alt={box.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />

              {/* PRICE BADGE */}
              <span className="absolute top-2 left-2 bg-[#8B3A62] text-white text-xs px-2 py-1 rounded-full shadow">
                ₹{box.price}
              </span>

              {/* SELECTED ICON */}
              {selectedBox === box.id && (
                <div className="absolute top-2 right-2 bg-green-600 text-white rounded-full p-1.5 shadow">
                  <Check className="w-4 h-4" />
                </div>
              )}
            </div>

            {/* 📦 CONTENT */}
            <div className="p-4 flex flex-col gap-2">
              <h3 className="font-semibold text-gray-800 text-base">
                {box.name}
              </h3>

              <p className="text-xs text-gray-500 line-clamp-2">
                {box.description}
              </p>

              {/* FEATURES */}
              <div className="space-y-1 mt-1">
                {box.features.slice(0, 3).map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                    <span className="w-1 h-1 bg-[#8B3A62] rounded-full mt-1.5"></span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* BUTTON */}
            <div className="p-4 pt-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(box.id);
                }}
                className={`w-full py-2 rounded-lg text-sm font-medium transition
                  ${
                    selectedBox === box.id
                      ? "bg-[#8B3A62] text-white"
                      : "border text-gray-700 hover:border-[#8B3A62] hover:text-[#8B3A62]"
                  }
                `}
              >
                {selectedBox === box.id ? "Selected ✓" : "Select"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 📌 STICKY ACTION BAR */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-lg p-4 sm:p-5">
        <div className="max-w-3xl mx-auto flex gap-3">

          <button
            onClick={handleSkip}
            className="flex-1 py-3 rounded-full border text-gray-700 hover:border-[#8B3A62] hover:text-[#8B3A62] transition"
          >
            Skip
          </button>

          <button
            onClick={handleApply}
            disabled={!selectedBox}
            className={`flex-1 py-3 rounded-full font-medium text-white transition
              ${
                selectedBox
                  ? "bg-[#8B3A62] hover:bg-[#732d52]"
                  : "bg-gray-300 cursor-not-allowed"
              }
            `}
          >
            Apply Selection
          </button>
        </div>
      </div>

    </div>
  </div>
);
}