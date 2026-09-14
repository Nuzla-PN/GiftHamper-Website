export default function ProductToolbar({ setView }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">

      {/* PRODUCT COUNT */}
      <p className="text-sm text-gray-600">
        767 products
      </p>

      <div className="flex items-center gap-3">

        {/* SORT */}
        <select className="border px-3 py-2 rounded-lg text-sm">
          <option>Featured</option>
          <option>Price Low → High</option>
          <option>Price High → Low</option>
        </select>

        {/* VIEW OPTIONS */}
        <div className="flex gap-2">
          <button onClick={() => setView("grid-2")}>⬜⬜</button>
          <button onClick={() => setView("grid-3")}>⬜⬜⬜</button>
          <button onClick={() => setView("grid-4")}>⬜⬜⬜⬜</button>
        </div>

      </div>
    </div>
  );
}