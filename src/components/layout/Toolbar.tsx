"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/features/cart/context/CartContext";
import CartModal from "@/features/cart/components/CartModal";
import { useLanguage } from "@/features/i18n/LanguageContext";

export default function Toolbar() {
  const { itemCount } = useCart();
  const { language, setLanguage } = useLanguage();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex h-toolbar w-full items-center justify-between bg-[var(--toolbar-bg)] px-4 sm:px-8">
      <Link href="/" className="text-2xl font-extrabold tracking-tighter text-black hover:opacity-80 transition-opacity">
        Mobile Store
      </Link>

      <div className="flex items-center gap-6">
        <div className="relative group flex items-center">
          <button className="flex items-center gap-1 text-2xl hover:opacity-80 transition-opacity cursor-pointer">
            {language === "es" ? "🇪🇸" : "🇺🇸"}
          </button>
          <div className="absolute right-0 top-full pt-2 hidden group-hover:block w-24">
            <div className="flex flex-col bg-white border border-gray-100 shadow-xl rounded overflow-hidden">
              <button
                onClick={() => setLanguage("es")}
                className={`flex items-center gap-2 px-4 py-3 text-sm hover:bg-gray-50 transition-colors ${language === 'es' ? 'bg-gray-50 font-bold' : ''}`}
              >
                🇪🇸 ES
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`flex items-center gap-2 px-4 py-3 text-sm hover:bg-gray-50 transition-colors ${language === 'en' ? 'bg-gray-50 font-bold' : ''}`}
              >
                🇺🇸 EN
              </button>
            </div>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="flex items-center gap-1.5 text-black hover:opacity-80 transition-opacity cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            <span className="text-sm font-medium">{itemCount}</span>
          </button>

          <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
      </div>
    </header>
  );
}
