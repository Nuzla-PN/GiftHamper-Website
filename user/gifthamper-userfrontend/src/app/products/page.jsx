"use client";

import { Suspense } from "react";
import ProductList from "../../pages-bak/ProductList";

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-gray-500">Loading...</div>}>
      <ProductList />
    </Suspense>
  );
}
