"use client";

import { useCart } from "@/features/cart/context/CartContext";
import CartItemRow from "@/features/cart/components/CartItemRow";

export default function CartPage() {
    const { items, itemCount, removeItem } = useCart();

    return (
        <div className="min-h-screen bg-white px-4 py-8 sm:px-8">
            <h1 className="text-xl font-semibold tracking-wide uppercase">
                Cart ({itemCount})
            </h1>

            {items.length === 0 ? (
                <div className="flex items-center justify-center py-20">
                    <p className="text-sm text-gray-400">Tu carrito está vacío</p>
                </div>
            ) : (
                <div className="mt-8">
                    {items.map((item) => (
                        <CartItemRow
                            key={item.cartId}
                            item={item}
                            onRemove={removeItem}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
