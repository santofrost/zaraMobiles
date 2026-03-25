"use client";

import { CartProvider } from "@/features/cart/context/CartContext";
import Toolbar from "@/components/layout/Toolbar";
import QueryProvider from "@/providers/QueryProvider";
import { LanguageProvider } from "@/features/i18n/LanguageContext";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <QueryProvider>
            <LanguageProvider>
                <CartProvider>
                    <Toolbar />
                    {children}
                </CartProvider>
            </LanguageProvider>
        </QueryProvider>
    );
}
