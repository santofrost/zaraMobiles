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
        <div className="flex gap-6 py-8 border-b border-gray-100">
            <Link href={`/product/${item.productId}`} className="relative h-48 w-40 shrink-0 block hover:opacity-80 transition-opacity">
                <Image
                    src={item.imageUrl}
                    alt={`${item.brand} ${item.name}`}
                    fill
                    className="object-contain"
                />
            </Link>

            <div className="flex flex-col justify-between flex-1 py-2">
                <div>
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                        {item.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                        {item.storage} | {item.color}
                    </p>
                    <p className="text-sm text-gray-700 mt-3">
                        {formatPrice(item.price * item.quantity)}
                    </p>

                    <div className="flex items-center gap-3 mt-4">
                        <button
                            onClick={() => onUpdateQuantity(item.cartId, item.quantity - 1)}
                            className="flex h-8 w-8 items-center justify-center border border-gray-300 text-gray-600 hover:border-gray-500 transition-colors cursor-pointer"
                            aria-label={`${t("cart.decrease")} ${item.name}`}
                        >
                            <span aria-hidden="true">−</span>
                        </button>
                        <span className="text-sm font-semibold text-gray-900 w-6 text-center" aria-live="polite">
                            {item.quantity}
                        </span>
                        <button
                            onClick={() => onUpdateQuantity(item.cartId, item.quantity + 1)}
                            className="flex h-8 w-8 items-center justify-center border border-gray-300 text-gray-600 hover:border-gray-500 transition-colors cursor-pointer"
                            aria-label={`${t("cart.increase")} ${item.name}`}
                        >
                            <span aria-hidden="true">+</span>
                        </button>
                    </div>
                </div>

                <button
                    onClick={() => onRemove(item.cartId)}
                    className="self-start text-xs text-red-400 hover:text-red-600 transition-colors underline"
                    aria-label={`${t("cart.remove")} ${item.name}`}
                >
                    {t("cart.remove")}
                </button>
            </div>
        </div>
    );
}
