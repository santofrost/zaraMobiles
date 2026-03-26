import Image from "next/image";
import Link from "next/link";
import { Product } from "../types";
import { formatPrice } from "@/utils/formatPrice";
import { useLanguage } from "@/features/i18n/LanguageContext";

interface SimilarProductsProps {
  products: Product[];
}

export default function SimilarProducts({ products }: SimilarProductsProps) {
  const { t } = useLanguage();

  if (!products || products.length === 0) return null;

  return (
    <section className="border-t border-gray-100 px-4 py-12 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-8 text-sm font-semibold tracking-widest text-gray-900 uppercase">
          {t("detail.similar")}
        </h2>
        <div className="flex gap-0 overflow-x-auto pb-4">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group relative flex w-60 shrink-0 cursor-pointer flex-col overflow-hidden border border-gray-200 bg-white sm:w-72"
            >
              <div className="relative z-10 flex aspect-square items-center justify-center overflow-hidden p-4">
                <Image
                  src={product.imageUrl}
                  alt={`${product.brand} ${product.name}`}
                  width={200}
                  height={200}
                  className="max-h-full w-auto object-contain"
                />
              </div>
              <div className="relative z-10 flex items-end justify-between gap-2 px-4 py-3">
                <div className="min-w-0">
                  <p className="text-[10px] font-medium tracking-wider text-gray-400 uppercase transition-colors duration-700 group-hover:text-gray-300">
                    {product.brand}
                  </p>
                  <h4 className="truncate text-xs font-semibold tracking-wide text-gray-900 uppercase transition-colors duration-700 group-hover:text-white sm:text-sm">
                    {product.name}
                  </h4>
                </div>
                <span className="shrink-0 text-xs font-medium text-gray-500 transition-colors duration-700 group-hover:text-white sm:text-sm">
                  {formatPrice(product.basePrice)}
                </span>
              </div>

              <div className="absolute inset-0 translate-y-full bg-black transition-transform duration-700 ease-in-out group-hover:translate-y-0" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
