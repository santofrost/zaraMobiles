"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    try {
      const storedData = localStorage.getItem("mobileStore_cart");
      if (storedData) {
        const parsed = JSON.parse(storedData);
        if (Array.isArray(parsed)) {
          // por si alguien todavia tiene el carrito guardado de la forma antigua
          setItems(parsed);
        } else if (parsed && parsed.items && parsed.updatedAt) {
          // calculamos si han pasado 7 dias justos en milisegundos
          const now = Date.now();
          const oneWeek = 7 * 24 * 60 * 60 * 1000;
          if (now - parsed.updatedAt < oneWeek) {
            setItems(parsed.items);
          } else {
            // si el carrito esta muy viejo, lo vaciamos sin decirle nada
            localStorage.removeItem("mobileStore_cart");
          }
        }
      }
    } catch (error) {
      console.error("Failed to load cart from local storage", error);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      const cartData = {
        items,
        updatedAt: Date.now(),
      };
      localStorage.setItem("mobileStore_cart", JSON.stringify(cartData));
    }
  }, [items, isMounted]);

  const addItem = useCallback((newItem: Omit<CartItem, "cartId" | "quantity">) => {
    setItems((prev) => {
      const existing = prev.find(
        (item) =>
          item.productId === newItem.productId &&
          item.storage === newItem.storage &&
          item.color === newItem.color
      );

      if (existing) {
        return prev.map((item) =>
          item.cartId === existing.cartId ? { ...item, quantity: item.quantity + 1 } : item
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
  }, []);

  const removeItem = useCallback((cartId: string) => {
    setItems((prev) => prev.filter((item) => item.cartId !== cartId));
  }, []);

  const updateQuantity = useCallback((cartId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.cartId !== cartId));
      return;
    }
    setItems((prev) => prev.map((item) => (item.cartId === cartId ? { ...item, quantity } : item)));
  }, []);

  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

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
