"use client";

import Image from "next/image";
import Link from "next/link";
import { CartItem as CartItemType } from "@/features/products/types";
import { formatPrice } from "@/utils/formatPrice";
import { useLanguage } from "@/features/i18n/LanguageContext";

interface CartItemRowProps {
  item: CartItemType;
  onRemove: (cartId: string) => void;
  onUpdateQuantity: (cartId: string, quantity: number) => void;
}

export default function CartItemRow({ item, onRemove, onUpdateQuantity }: CartItemRowProps) {
  const { t } = useLanguage();

  return (
    <div className="flex gap-6 border-b border-gray-100 py-8">
      <Link
        href={`/product/${item.productId}`}
        className="relative block h-48 w-40 shrink-0 transition-opacity hover:opacity-80"
      >
        <Image
          src={item.imageUrl}
          alt={`${item.brand} ${item.name}`}
          fill
          sizes="160px"
          className="object-contain"
        />
      </Link>

      <div className="flex flex-1 flex-col justify-between py-2">
        <div>
          <h3 className="text-sm font-semibold tracking-wide text-gray-900 uppercase">
            {item.name}
          </h3>
          <p className="mt-1 text-xs text-gray-500">
            {item.storage} | {item.color}
          </p>
          <p className="mt-3 text-sm text-gray-700">{formatPrice(item.price * item.quantity)}</p>

          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={() => onUpdateQuantity(item.cartId, item.quantity - 1)}
              className="flex h-8 w-8 cursor-pointer items-center justify-center border border-gray-300 text-gray-600 transition-colors hover:border-gray-500"
              aria-label={`${t("cart.decrease")} ${item.name}`}
            >
              <span aria-hidden="true">−</span>
            </button>
            <span
              className="w-6 text-center text-sm font-semibold text-gray-900"
              aria-live="polite"
            >
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.cartId, item.quantity + 1)}
              className="flex h-8 w-8 cursor-pointer items-center justify-center border border-gray-300 text-gray-600 transition-colors hover:border-gray-500"
              aria-label={`${t("cart.increase")} ${item.name}`}
            >
              <span aria-hidden="true">+</span>
            </button>
          </div>
        </div>

        <button
          onClick={() => onRemove(item.cartId)}
          className="self-start text-xs text-red-400 underline transition-colors hover:text-red-600"
          aria-label={`${t("cart.remove")} ${item.name}`}
        >
          {t("cart.remove")}
        </button>
      </div>
    </div>
  );
}
