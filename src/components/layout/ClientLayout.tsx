"use client";

import { CartProvider } from "@/features/cart/context/CartContext";
import Toolbar from "@/components/layout/Toolbar";
import QueryProvider from "@/providers/QueryProvider";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <QueryProvider>
            <CartProvider>
                <Toolbar />
                {children}
            </CartProvider>
        </QueryProvider>
    );
}
