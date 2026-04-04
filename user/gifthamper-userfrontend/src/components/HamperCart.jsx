import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
export function HamperCartCard({
  item,
  globalIndex,
  dispatch,
  removeFromCart,
}) {
    const navigate = useNavigate();
  return (
    <motion.div
      key={`hamper-${globalIndex}`}
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: 60 }}
      className="bg-white rounded-2xl border border-rose-100 shadow-sm overflow-hidden"
    >
      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#FFF0F3] to-[#FFF6EC] px-4 py-2 flex items-center gap-2">
        <span className="text-sm font-bold text-[#C2556A] flex items-center gap-1">
          🎁 Custom Hamper
        </span>
      </div>

      <div className="p-4 space-y-3">

        {/* BOX NAME */}
        <div className="text-sm font-semibold text-[#3B2A35] flex items-center gap-2">
          <span className="text-[#C2556A]">🎁</span>
          {item.box?.name || "Gift Box"}
        </div>

        {/* PRODUCTS */}
        <div className="space-y-2">
          {item.items?.map((prod, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-[#FEF9F5] border border-rose-100 rounded-xl p-2"
            >
              <img
                src={Array.isArray(prod.image) ? prod.image[0] : prod.image}
                className="w-12 h-12 object-contain rounded-lg"
              />

              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-[#3B2A35] line-clamp-1">
                  {prod.name}
                </p>
                <p className="text-[10px] text-rose-900/40 line-clamp-1">
                  {prod.description}
                </p>

                <p className="text-[10px] text-[#C2556A] font-medium">
                  {prod.sellerName}
                </p>
              </div>

              <span className="text-xs font-bold text-[#3B2A35]">
                ₹{prod.price}
              </span>
            
                              <button
                                onClick={() => {
                                  navigate("/custom-hamper", {
                                    state: {
                                      editMode: true,
                                      hamperData: item,
                                      hamperIndex: globalIndex,
                                    },
                                  });
                                }}
                                className="text-[11px] text-blue-500 hover:underline mt-1"
                              >
                                Edit Hamper
                              </button>
                            
            </div>
          ))}
        </div>

        {/* MESSAGE */}
        {item.message && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-2 text-xs text-amber-800">
            💌 "{item.message}"
          </div>
        )}

        {/* TOTAL */}
        <div className="flex justify-between items-center pt-2 border-t border-rose-50">
          <span className="text-sm font-bold text-[#3B2A35]">
            Total
          </span>
          <span className="text-base font-extrabold text-[#3B2A35]">
            ₹{item.totalPrice}
          </span>
        </div>
      </div>

      {/* ACTION */}
      <div className="flex border-t border-rose-50">
        <button
          onClick={() => dispatch(removeFromCart(globalIndex))}
          className="flex-1 py-2 text-xs text-rose-400 hover:text-[#C2556A] hover:bg-rose-50"
        >
          Remove
        </button>
      </div>
    </motion.div>
  );
}