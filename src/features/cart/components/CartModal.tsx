"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/features/cart/context/CartContext";
import { formatPrice } from "@/utils/formatPrice";
import { useLanguage } from "@/features/i18n/LanguageContext";

interface CartModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
    const { items, itemCount, total } = useCart();
    const { t } = useLanguage();

    if (!isOpen) return null;

    return (
        <>
            <div
                className="fixed inset-0 z-40"
                onClick={onClose}
            />

            <div className="absolute right-0 top-full z-50 w-80 border border-gray-200 bg-white shadow-lg sm:w-96">
                {items.length === 0 ? (
                    <div className="p-6 text-center">
                        <p className="text-sm text-gray-400">{t("cart.empty")}</p>
                    </div>
                ) : (
                    <>
                        <div className="max-h-80 overflow-y-auto divide-y divide-gray-100">
                            {items.map((item) => (
                                <Link
                                    href={`/product/${item.productId}`}
                                    onClick={onClose}
                                    key={item.cartId}
                                    className="flex gap-3 p-4 hover:bg-gray-50 transition-colors"
                                >
                                    <div className="relative h-16 w-16 shrink-0">
                                        <Image
                                            src={item.imageUrl}
                                            alt={item.name}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs font-semibold text-gray-900 uppercase truncate">
                                            {item.name}
                                        </p>
                                        <p className="text-[10px] text-gray-400">
                                            {item.storage} | {item.color}
                                        </p>
                                        <div className="flex items-center justify-between mt-2">
                                            <span className="text-sm font-bold text-gray-900">
                                                x{item.quantity}
                                            </span>
                                            <span className="text-xs font-medium text-gray-700">
                                                {formatPrice(item.price * item.quantity)}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <div className="border-t border-gray-200 p-4">
                            <div className="flex justify-between mb-3">
                                <span className="text-xs font-medium text-gray-500 uppercase">
                                    {t("cart.total")} ({itemCount} {itemCount === 1 ? t("cart.item") : t("cart.items")})
                                </span>
                                <span className="text-sm font-semibold text-gray-900">
                                    {formatPrice(total)}
                                </span>
                            </div>
                            <Link
                                href="/cart"
                                onClick={onClose}
                                className="block w-full py-4 text-center text-xs font-medium tracking-widest text-white uppercase bg-black hover:bg-gray-800 transition-colors"
                            >
                                {t("cart.view")}
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
