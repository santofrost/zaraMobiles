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
    <section className="px-4 py-12 border-t border-gray-100 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="mb-8 text-sm font-semibold tracking-widest text-gray-900 uppercase">
          {t("detail.similar")}
        </h2>
        <div className="flex gap-0 overflow-x-auto pb-4">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group shrink-0 w-60 relative flex flex-col border border-gray-200 bg-white overflow-hidden cursor-pointer sm:w-72"
            >
              <div className="relative flex items-center justify-center aspect-square overflow-hidden p-4 z-10">
                <Image
                  src={product.imageUrl}
                  alt={`${product.brand} ${product.name}`}
                  width={200}
                  height={200}
                  className="object-contain max-h-full w-auto"
                />
              </div>
              <div className="relative flex items-end justify-between gap-2 px-4 py-3 z-10">
                <div className="min-w-0">
                  <p className="text-[10px] font-medium tracking-wider text-gray-400 uppercase transition-colors duration-700 group-hover:text-gray-300">
                    {product.brand}
                  </p>
                  <h4 className="text-xs font-semibold tracking-wide text-gray-900 uppercase truncate sm:text-sm transition-colors duration-700 group-hover:text-white">
                    {product.name}
                  </h4>
                </div>
                <span className="shrink-0 text-xs font-medium text-gray-500 sm:text-sm transition-colors duration-700 group-hover:text-white">
                  {formatPrice(product.basePrice)}
                </span>
              </div>

              <div className="absolute inset-0 bg-black translate-y-full transition-transform duration-700 ease-in-out group-hover:translate-y-0" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
