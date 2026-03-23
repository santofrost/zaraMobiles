import Image from "next/image";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article
      id={`product-card-${product.id}`}
      className="flex flex-col border border-gray-200 bg-white"
    >
      <div className="relative flex items-center justify-center aspect-square overflow-hidden p-4">
        <Image
          src={product.imageUrl}
          alt={`${product.brand} ${product.name}`}
          width={280}
          height={280}
          className="object-contain max-h-full w-auto"
        />
      </div>

      <div className="flex items-end justify-between gap-2 px-4 py-3">
        <div className="min-w-0">
          <p className="text-[10px] font-medium tracking-wider text-gray-400 uppercase">
            {product.brand}
          </p>
          <h2 className="text-xs font-semibold tracking-wide text-gray-900 uppercase truncate sm:text-sm">
            {product.name}
          </h2>
        </div>
        <span className="shrink-0 text-xs font-medium text-gray-500 sm:text-sm">
          {product.price} {product.currency}
        </span>
      </div>
    </article>
  );
}
