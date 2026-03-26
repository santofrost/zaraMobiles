import Image from "next/image";
import Link from "next/link";
import { Product } from "../types";
import { formatPrice } from "@/utils/formatPrice";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`} className="block">
      <article
        id={`product-card-${product.id}`}
        aria-labelledby={`product-heading-${product.id}`}
        className="group relative flex cursor-pointer flex-col overflow-hidden border border-gray-200 bg-white"
      >
        <div className="relative z-10 flex aspect-square items-center justify-center overflow-hidden p-4">
          <Image
            src={product.imageUrl}
            alt={`${product.brand} ${product.name}`}
            width={280}
            height={280}
            className="max-h-full w-auto object-contain"
          />
        </div>

        <div className="relative z-10 flex items-end justify-between gap-2 px-4 py-3">
          <div className="min-w-0">
            <p className="text-[10px] font-medium tracking-wider text-gray-400 uppercase transition-colors duration-700 group-hover:text-gray-300">
              {product.brand}
            </p>
            <h2
              id={`product-heading-${product.id}`}
              className="truncate text-xs font-semibold tracking-wide text-gray-900 uppercase transition-colors duration-700 group-hover:text-white sm:text-sm"
            >
              {product.name}
            </h2>
          </div>
          <span className="shrink-0 text-xs font-medium text-gray-500 transition-colors duration-700 group-hover:text-white sm:text-sm">
            {formatPrice(product.basePrice ?? product.price ?? 0)}
          </span>
        </div>

        <div className="absolute inset-0 translate-y-full bg-black transition-transform duration-700 ease-in-out group-hover:translate-y-0" />
      </article>
    </Link>
  );
}
