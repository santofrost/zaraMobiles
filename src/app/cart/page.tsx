"use client";

import { useCart } from "@/features/cart/context/CartContext";
import CartItemRow from "@/features/cart/components/CartItemRow";
import { formatPrice } from "@/utils/formatPrice";

export default function CartPage() {
    const { items, itemCount, removeItem, updateQuantity, total } = useCart();

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

                    <div className="sticky bottom-0 mt-8 border-t border-gray-200 bg-white py-6">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium tracking-wider text-gray-500 uppercase">
                                Total
                            </span>
                            <span className="text-xl font-bold text-gray-900">
                                {formatPrice(total)}
                            </span>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
