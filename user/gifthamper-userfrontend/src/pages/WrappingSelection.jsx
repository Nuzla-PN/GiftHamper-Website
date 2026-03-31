import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ChevronLeft, Check, Sparkles } from "lucide-react";

const wrappingStyles = [
  { 
    id: 'Basic', 
    name: 'Basic Wrapping', 
    price: 100, 
    description: 'Traditional wrapping paper',
    image: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=400',
    features: ['wrapping styling', 'elegent Design', 'Attractive design']
  },
  { 
    id: 'floral', 
    name: 'Floral Wrapping', 
    price: 120, 
    description: 'Beautiful floral pattern design',
    image: 'https://images.unsplash.com/photo-1530103043960-ef38714abb15?w=400',
    features: ['wrapping styling', 'elegent Design', 'Attractive design']
  },
  { 
    id: 'modern', 
    name: 'Modern Wrapping', 
    price: 130, 
    description: 'Contemporary pattern Wrapping',
    image: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=400',
    // image: 'https://images.unsplash.com/photo-1544435253-f0ead49638fa?w=400',
   features: ['wrapping styling', 'elegent Design', 'Attractive design']
  },
  { 
    id: 'festive', 
    name: 'Festive Wrapping', 
    price: 150, 
    description: 'Colorful celebration themed wrap',
    image: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=400',
    // image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400',
    features: ['wrapping styling', 'elegent Design', 'Attractive design']
  },
  { 
    id: 'elegant', 
    name: 'Elegant Wrapping', 
    price: 200, 
    description: 'Elegent wrapping Style for gift',
    image: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=400',
    // image: 'https://images.unsplash.com/photo-1606762254160-b1b6b0c18aaa?w=400',
    features: ['wrapping styling', 'elegent Design', 'Attractive design']
  },
  { 
    id: 'Natural', 
    name: 'Natural Wrapping', 
    price: 210, 
    description: 'Natural Wrapping Style',
    image: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=400',
    // image: 'https://images.unsplash.com/photo-1574169411236-be48359ce5d9?w=400',
    features: ['wrapping styling', 'elegent Design', 'Attractive design']
  },
];

export default function WrappingSelection() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const productId = searchParams.get("productId");
  const currentSelection = searchParams.get("wrapping");

  const [selectedWrapping, setSelectedWrapping] = useState(currentSelection || null);

  const handleSelect = (id) => setSelectedWrapping(id);

  const handleApply = () => {
  const selectedOption = wrappingStyles.find(
    (wrap) => wrap.id === selectedWrapping
  );

  const params = new URLSearchParams();

  params.set("productId", productId);

  // ✅ Preserve gift box
  const giftBox = searchParams.get("giftBox");
  const giftBoxPrice = searchParams.get("giftBoxPrice");

  if (giftBox) params.set("giftBox", giftBox);
  if (giftBoxPrice) params.set("giftBoxPrice", giftBoxPrice);

  // ❌ REMOVE giftCard logic completely

  // ✅ Add wrapping
  if (selectedOption) {
    params.set("wrapping", selectedWrapping);
    params.set("wrappingPrice", selectedOption.price);
  }

  navigate(`/products/${productId}?${params.toString()}`);
};

  const handleSkip = () => {
  const params = new URLSearchParams(searchParams);

  // ❌ Remove ONLY wrapping
  params.delete("wrapping");
  params.delete("wrappingPrice");

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
            <Sparkles className="w-6 h-6 text-[#8B3A62]" />
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
              Choose Wrapping Style
            </h1>
            <p className="text-sm text-gray-500">
              Make your gift presentation more special ✨
            </p>
          </div>
        </div>

        {/* 🧱 GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {wrappingStyles.map((wrap) => (
            <div
              key={wrap.id}
              onClick={() => handleSelect(wrap.id)}
              className={`group cursor-pointer rounded-2xl overflow-hidden border bg-white transition-all duration-300
                hover:shadow-xl hover:-translate-y-1
                ${selectedWrapping === wrap.id ? "ring-2 ring-[#8B3A62] shadow-lg" : ""}
              `}
            >
              {/* 🖼 IMAGE */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={wrap.image}
                  alt={wrap.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />

                {/* PRICE BADGE */}
                <span className="absolute top-2 left-2 bg-[#8B3A62] text-white text-xs px-2 py-1 rounded-full shadow">
                  ₹{wrap.price}
                </span>

                {/* SELECTED ICON */}
                {selectedWrapping === wrap.id && (
                  <div className="absolute top-2 right-2 bg-green-600 text-white rounded-full p-1.5 shadow">
                    <Check className="w-4 h-4" />
                  </div>
                )}
              </div>

              {/* 📦 CONTENT */}
              <div className="p-4 flex flex-col gap-2">
                <h3 className="font-semibold text-gray-800 text-base">{wrap.name}</h3>
                <p className="text-xs text-gray-500 line-clamp-2">{wrap.description}</p>

                {/* FEATURES */}
                <div className="space-y-1 mt-1">
                  {wrap.features.slice(0, 3).map((feature, idx) => (
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
                  onClick={(e) => { e.stopPropagation(); handleSelect(wrap.id); }}
                  className={`w-full py-2 rounded-lg text-sm font-medium transition
                    ${selectedWrapping === wrap.id
                      ? "bg-[#8B3A62] text-white"
                      : "border text-gray-700 hover:border-[#8B3A62] hover:text-[#8B3A62]"
                    }
                  `}
                >
                  {selectedWrapping === wrap.id ? "Selected ✓" : "Select"}
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
              disabled={!selectedWrapping}
              className={`flex-1 py-3 rounded-full font-medium text-white transition
                ${selectedWrapping
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