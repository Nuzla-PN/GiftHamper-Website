export default function FilterSidebar({ onFilterChange }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md space-y-6">

      {/* PRICE */}
      <div>
        <h3 className="font-semibold mb-2">Price</h3>
        <input type="range" className="w-full" />
      </div>

      {/* GIFT TYPE */}
      <div>
        <h3 className="font-semibold mb-2">Product Type</h3>
        <div className="space-y-2 text-sm">
          <label className="flex gap-2">
            <input type="checkbox" /> Premium
          </label>
          <label className="flex gap-2">
            <input type="checkbox" /> Budget
          </label>
          <label className="flex gap-2">
            <input type="checkbox" /> Luxury
          </label>
        </div>
      </div>

    </div>
  );
}