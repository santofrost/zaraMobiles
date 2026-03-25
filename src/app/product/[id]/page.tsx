"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import BackButton from "@/components/ui/BackButton";
import StorageSelector from "@/features/products/components/StorageSelector";
import ColorSelector from "@/features/products/components/ColorSelector";
import SpecificationsTable from "@/features/products/components/SpecificationsTable";
import SimilarProducts from "@/features/products/components/SimilarProducts";
import { mockProductDetail } from "@/features/products/data/mockProductDetail";
import { useCart } from "@/features/cart/context/CartContext";
import { formatPrice } from "@/utils/formatPrice";

export default function ProductDetailPage() {
  const product = mockProductDetail;

  const [selectedStorage, setSelectedStorage] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const { addItem } = useCart();

  const isAddEnabled = selectedStorage !== null && selectedColor !== null;

  const currentPrice = useMemo(
    () =>
      selectedStorage !== null
        ? product.storageOptions[selectedStorage].price
        : product.basePrice,
    [product, selectedStorage]
  );

  const currentImage = useMemo(
    () =>
      selectedColor !== null
        ? product.colorOptions[selectedColor].imageUrl
        : product.colorOptions[0].imageUrl,
    [product, selectedColor]
  );

  return (
    <div className="min-h-screen bg-white">
      <BackButton />

      <section className="flex flex-col pt-4 pl-16 pr-4 sm:pl-24 sm:pr-8 lg:flex-row lg:gap-16 lg:pt-8">
        <div className="flex items-center justify-center lg:w-1/2">
          <div className="relative w-full max-w-md aspect-square">
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
              From {formatPrice(currentPrice)}
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
            }}
            className={`w-full py-4 text-xs font-medium tracking-widest uppercase transition-colors ${isAddEnabled
              ? "bg-primary text-gray-800 hover:bg-primary/80 cursor-pointer"
              : "bg-gray-100 text-gray-300 cursor-not-allowed"
              }`}
          >
            Añadir
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
