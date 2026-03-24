import Image from "next/image";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article
      id={`product-card-${product.id}`}
      className="group relative flex flex-col border border-gray-200 bg-white overflow-hidden cursor-pointer"
    >
      <div className="relative flex items-center justify-center aspect-square overflow-hidden p-4 z-10">
        <Image
          src={product.imageUrl}
          alt={`${product.brand} ${product.name}`}
          width={280}
          height={280}
          className="object-contain max-h-full w-auto"
        />
      </div>

      <div className="relative flex items-end justify-between gap-2 px-4 py-3 z-10">
        <div className="min-w-0">
          <p className="text-[10px] font-medium tracking-wider text-gray-400 uppercase transition-colors duration-700 group-hover:text-gray-300">
            {product.brand}
          </p>
          <h2 className="text-xs font-semibold tracking-wide text-gray-900 uppercase truncate sm:text-sm transition-colors duration-700 group-hover:text-white">
            {product.name}
          </h2>
        </div>
        <span className="shrink-0 text-xs font-medium text-gray-500 sm:text-sm transition-colors duration-700 group-hover:text-white">
          {product.price} {product.currency}
        </span>
      </div>

      <div className="absolute inset-0 bg-black translate-y-full transition-transform duration-700 ease-in-out group-hover:translate-y-0" />
    </article>
  );
}
