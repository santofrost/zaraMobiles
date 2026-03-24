"use client";

import { CartProvider } from "@/features/cart/context/CartContext";
import Toolbar from "@/components/layout/Toolbar";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <CartProvider>
            <Toolbar />
            {children}
        </CartProvider>
    );
}
