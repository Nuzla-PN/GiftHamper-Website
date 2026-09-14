export default function OrderSummaryContent() {
    
  return (
    <>
      <h3 className="text-2xl font-semibold mb-6 text-[#8B3A62]">
        Order Summary
      </h3>

      <div className="space-y-5 mb-6">

        {/* BOX */}
        <div className="pb-4 border-b">
          <p className="text-sm font-semibold text-gray-700 mb-2">
            Gift Box
          </p>

          {selectedBoxData ? (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
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
          <div className="flex justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">
              Items
            </span>

            <span className="text-xs bg-[#F7E3DC] px-2 py-1 rounded text-[#8B3A62]">
              {selectedItemsData.length} selected
            </span>
          </div>

          {selectedItemsData.length > 0 ? (
            <div className="space-y-2">
              {selectedItemsData.slice(0, 3).map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="truncate">{item.title}</span>
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
        <div className="pb-4 border-b flex justify-between">
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
      </div>

      {/* TOTAL */}
      <div className="pt-4 border-t">
        <div className="flex justify-between items-center mb-3">
          <span className="text-lg font-semibold text-[#8B3A62]">
            Total
          </span>

          <span className="text-xl font-bold text-[#8B3A62]">
            ₹{calculateTotal().toFixed(2)}
          </span>
        </div>

        <div className="bg-[#FFF8F6] text-center text-xs text-gray-600 p-3 rounded-lg">
          Free shipping on orders above ₹999
        </div>
      </div>
    </>
  );
}