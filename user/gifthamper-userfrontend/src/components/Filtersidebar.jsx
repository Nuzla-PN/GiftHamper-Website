
import { Star, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
          {/* MOBILE OVERLAY */}
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={onClose}
          />

          {/* SIDEBAR */}
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="fixed lg:static top-0 left-0 h-full lg:h-auto w-72 lg:w-full bg-white z-50 shadow-lg lg:shadow-none p-5 overflow-y-auto"
          >
            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-[#8B3A62]">
                Filters
              </h2>
              <button onClick={onClose} className="lg:hidden">
                <X />
              </button>
            </div>

            {/* CATEGORY */}
            {Object.entries(categoryMap).map(([cat, subs]) => (
              <div key={cat} className="mb-6">
                <h3 className="text-md font-medium mb-3 text-[#8B3A62]">
                  {cat}
                </h3>

                {(subs || []).map((sub) => (
                  <label key={sub} className="flex gap-2 text-sm mb-1">
                    <input
                      type="checkbox"
                      checked={tempFilters[cat]?.includes(sub) || false}
                      onChange={() => toggleCategory(cat, sub)}
                      className="accent-[#8B3A62]"
                    />
                    {sub}
                  </label>
                ))}
              </div>
            ))}

            {/* PRICE */}
            <div className="mb-6">
              <h3 className="text-md font-medium mb-3 text-[#8B3A62]">
                Price
              </h3>

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

              <div className="flex justify-between text-sm mt-2">
                <span>₹{priceRange[0]}</span>
                <span>₹{priceRange[1]}</span>
              </div>
            </div>

            {/* RATING */}
            <div className="mb-6">
              <h3 className="text-md font-medium mb-3 text-[#8B3A62]">
                Rating
              </h3>

              {[5, 4, 3, 2, 1].map((r) => (
                <label key={r} className="flex items-center gap-2 mb-1">
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
                </label>
              ))}
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2">
              <button
                onClick={onClear}
                className="flex-1 border py-2 rounded"
              >
                Clear
              </button>

              <button
                onClick={onApply}
                className="flex-1 bg-[#8B3A62] text-white py-2 rounded"
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

