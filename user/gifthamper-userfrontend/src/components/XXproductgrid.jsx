export default function ProductGrid({ view }) {

  const gridClass =
    view === "grid-2"
      ? "grid-cols-2"
      : view === "grid-4"
      ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
      : "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`grid ${gridClass} gap-4 mt-6`}>
      
      {/* ProductCard here */}
      {/* <ProductCard /> */}

    </div>
  );
}