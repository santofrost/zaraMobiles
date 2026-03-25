"use client";

import {
    createContext,
    useContext,
    useState,
    useCallback,
    useMemo,
    ReactNode,
} from "react";
import { CartItem } from "@/features/products/types";

interface CartContextValue {
    items: CartItem[];
    addItem: (item: Omit<CartItem, "cartId" | "quantity">) => void;
    removeItem: (cartId: string) => void;
    updateQuantity: (cartId: string, quantity: number) => void;
    itemCount: number;
    total: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    const addItem = useCallback(
        (newItem: Omit<CartItem, "cartId" | "quantity">) => {
            setItems((prev) => {
                const existing = prev.find(
                    (item) =>
                        item.productId === newItem.productId &&
                        item.storage === newItem.storage &&
                        item.color === newItem.color
                );

                if (existing) {
                    return prev.map((item) =>
                        item.cartId === existing.cartId
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    );
                }

                return [
                    ...prev,
                    {
                        ...newItem,
                        cartId: `${newItem.productId}-${newItem.storage}-${newItem.color}`,
                        quantity: 1,
                    },
                ];
            });
        },
        []
    );

    const removeItem = useCallback((cartId: string) => {
        setItems((prev) => prev.filter((item) => item.cartId !== cartId));
    }, []);

    const updateQuantity = useCallback((cartId: string, quantity: number) => {
        if (quantity <= 0) {
            setItems((prev) => prev.filter((item) => item.cartId !== cartId));
            return;
        }
        setItems((prev) =>
            prev.map((item) =>
                item.cartId === cartId ? { ...item, quantity } : item
            )
        );
    }, []);

    const itemCount = useMemo(
        () => items.reduce((sum, item) => sum + item.quantity, 0),
        [items]
    );

    const total = useMemo(
        () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
        [items]
    );

    const value = useMemo(
        () => ({ items, addItem, removeItem, updateQuantity, itemCount, total }),
        [items, addItem, removeItem, updateQuantity, itemCount, total]
    );

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
