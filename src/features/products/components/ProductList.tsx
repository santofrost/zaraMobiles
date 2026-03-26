import { Product } from "../types";
import ProductCard from "./ProductCard";
import { useLanguage } from "@/features/i18n/LanguageContext";

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  const { t } = useLanguage();

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center py-20 px-4">
        <p className="text-sm text-gray-400">{t("list.empty")}</p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 px-4 pb-8 sm:grid-cols-2 sm:px-8 lg:grid-cols-5">
      {products.map((product, index) => (
        <li key={`${product.id}-${index}`}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
