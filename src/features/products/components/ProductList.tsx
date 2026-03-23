import { Product } from "../types";
import ProductCard from "./ProductCard";

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center py-20 px-4">
        <p className="text-sm text-gray-400">No products found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 px-4 pb-8 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
