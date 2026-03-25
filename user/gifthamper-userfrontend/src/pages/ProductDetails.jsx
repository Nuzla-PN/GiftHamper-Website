import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProductDetails() {
  const { id } = useParams();
  const products = useSelector((state) => state.products.items);

  const product = products.find((p) => p.id === id);

  if (!product) return <div>Product not found</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl">{product.title}</h1>
      <img src={product.image} alt={product.title} />
      <p>₹{product.price}</p>
    </div>
  );
}