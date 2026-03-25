"use client";

import { useCart } from "@/features/cart/context/CartContext";
import CartItemRow from "@/features/cart/components/CartItemRow";
import { formatPrice } from "@/utils/formatPrice";
import Link from "next/link";
import { useLanguage } from "@/features/i18n/LanguageContext";
import { useEffect } from "react";

export default function CartPage() {
    const { items, itemCount, removeItem, updateQuantity, total } = useCart();
    const { t } = useLanguage();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-white px-4 py-8 sm:px-8">
            <h1 className="text-xl font-semibold tracking-wide uppercase">
                {t("cart.title")} ({itemCount})
            </h1>

            {items.length === 0 ? (
                <div className="flex items-center justify-center py-20">
                    <p className="text-sm text-gray-400">{t("cart.empty")}</p>
                </div>
            ) : (
                <>
                    <div className="mt-8">
                        {items.map((item) => (
                            <CartItemRow
                                key={item.cartId}
                                item={item}
                                onRemove={removeItem}
                                onUpdateQuantity={updateQuantity}
                            />
                        ))}
                    </div>

                    <div className="sticky bottom-0 mt-8 border-t border-gray-200 bg-white py-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-sm font-medium tracking-wider text-gray-500 uppercase">
                                {t("cart.total")}
                            </span>
                            <span className="text-xl font-bold text-gray-900">
                                {formatPrice(total)}
                            </span>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/" className="flex-1 text-center py-4 text-xs font-medium tracking-widest text-black uppercase border border-black hover:bg-gray-50 transition-colors">
                                {t("cart.continue")}
                            </Link>
                            <button className="flex-1 py-4 text-xs font-medium tracking-widest text-white uppercase bg-black hover:bg-gray-800 transition-colors">
                                {t("cart.pay")}
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
