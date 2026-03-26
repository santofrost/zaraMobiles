"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import BackButton from "@/components/ui/BackButton";
import StorageSelector from "@/features/products/components/StorageSelector";
import ColorSelector from "@/features/products/components/ColorSelector";
import SpecificationsTable from "@/features/products/components/SpecificationsTable";
import SimilarProducts from "@/features/products/components/SimilarProducts";
import { useCart } from "@/features/cart/context/CartContext";
import { formatPrice } from "@/utils/formatPrice";
import { useParams } from "next/navigation";
import { useProduct } from "@/hooks/useProduct";
import { useLanguage } from "@/features/i18n/LanguageContext";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const { data: product, isLoading, error } = useProduct(id);
  const { t } = useLanguage();

  const [selectedStorage, setSelectedStorage] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const { addItem } = useCart();

  const isAddEnabled = selectedStorage !== null && selectedColor !== null;

  const currentPrice = useMemo(() => {
    if (!product) return 0;
    return selectedStorage !== null
      ? product.storageOptions[selectedStorage].price
      : product.basePrice;
  }, [product, selectedStorage]);

  const currentImage = useMemo(() => {
    if (!product) return "";
    return selectedColor !== null
      ? product.colorOptions[selectedColor].imageUrl
      : product.colorOptions[0].imageUrl;
  }, [product, selectedColor]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <BackButton />
        <div className="flex h-[60vh] items-center justify-center">
          <span className="text-sm tracking-widest text-gray-400 uppercase">
            {t("detail.loading_details")}
          </span>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white">
        <BackButton />
        <div className="flex h-[60vh] items-center justify-center">
          <span className="text-sm tracking-widest text-red-400 uppercase">
            {t("detail.error")}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <BackButton />

      <section className="flex flex-col pt-4 pr-4 pl-16 sm:pr-8 sm:pl-24 lg:flex-row lg:gap-16 lg:pt-8">
        <div className="flex items-center justify-center lg:w-1/2">
          <div className="relative aspect-square w-full max-w-md">
            <Image
              src={currentImage}
              alt={`${product.brand} ${product.name}`}
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        <div className="flex flex-col gap-8 py-8 lg:w-1/2 lg:py-0">
          <div>
            <h1 className="text-2xl font-semibold tracking-wide text-gray-900 uppercase sm:text-3xl">
              {product.name}
            </h1>
            <p className="mt-1 text-base text-gray-600">
              {t("detail.from")} {formatPrice(currentPrice)}
            </p>
          </div>

          <StorageSelector
            options={product.storageOptions}
            selectedIndex={selectedStorage}
            onSelect={setSelectedStorage}
          />

          <ColorSelector
            options={product.colorOptions}
            selectedIndex={selectedColor}
            onSelect={setSelectedColor}
          />

          <button
            id="add-to-cart-button"
            disabled={!isAddEnabled}
            onClick={() => {
              if (selectedStorage === null || selectedColor === null) return;
              addItem({
                productId: product.id,
                brand: product.brand,
                name: product.name,
                imageUrl: product.colorOptions[selectedColor].imageUrl,
                storage: product.storageOptions[selectedStorage].capacity,
                color: product.colorOptions[selectedColor].name,
                price: product.storageOptions[selectedStorage].price,
              });
              setSelectedStorage(null);
            }}
            className={`w-full py-4 text-xs font-medium tracking-widest uppercase transition-colors ${
              isAddEnabled
                ? "cursor-pointer bg-black text-white hover:bg-gray-800"
                : "cursor-not-allowed bg-gray-100 text-gray-300"
            }`}
          >
            {t("detail.add")}
          </button>
        </div>
      </section>

      <SpecificationsTable
        brand={product.brand}
        name={product.name}
        description={product.description}
        specs={product.specs}
      />

      <SimilarProducts products={product.similarProducts} />
    </div>
  );
}
