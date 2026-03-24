"use client";

import Image from "next/image";
import { CartItem as CartItemType } from "@/features/products/types";

interface CartItemRowProps {
    item: CartItemType;
    onRemove: (cartId: string) => void;
}

export default function CartItemRow({ item, onRemove }: CartItemRowProps) {
    return (
        <div className="flex gap-6 py-8 border-b border-gray-100">
            <div className="relative h-48 w-40 shrink-0">
                <Image
                    src={item.imageUrl}
                    alt={`${item.brand} ${item.name}`}
                    fill
                    className="object-contain"
                />
            </div>

            <div className="flex flex-col justify-between flex-1 py-2">
                <div>
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                        {item.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                        {item.storage} | {item.color}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                        Cantidad: {item.quantity}
                    </p>
                    <p className="text-sm text-gray-700 mt-3">
                        {item.price * item.quantity} EUR
                    </p>
                </div>

                <button
                    onClick={() => onRemove(item.cartId)}
                    className="self-start text-xs text-red-400 hover:text-red-600 transition-colors underline"
                >
                    Eliminar
                </button>
            </div>
        </div>
    );
}
