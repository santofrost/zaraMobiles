"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/features/cart/context/CartContext";
import CartModal from "@/features/cart/components/CartModal";
import { useLanguage } from "@/features/i18n/LanguageContext";

export default function Toolbar() {
  const { itemCount } = useCart();
  const { language, setLanguage, t } = useLanguage();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  return (
    <header className="h-toolbar sticky top-0 z-50 flex w-full items-center justify-between bg-[var(--toolbar-bg)] px-4 sm:px-8">
      <Link
        href="/"
        className="text-2xl font-extrabold tracking-tighter text-black transition-opacity hover:opacity-80"
      >
        Mobile Store
      </Link>

      <div className="flex items-center gap-6">
        <div className="relative flex items-center">
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex cursor-pointer items-center gap-1 text-2xl transition-opacity hover:opacity-80"
            aria-label={t("toolbar.language")}
            aria-expanded={isLangOpen}
            aria-haspopup="menu"
          >
            {language === "es" ? "🇪🇸" : "🇺🇸"}
          </button>

          {isLangOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsLangOpen(false)}
                aria-hidden="true"
              />
              <div className="absolute top-full right-0 z-50 w-24 pt-2">
                <div
                  role="menu"
                  className="flex flex-col overflow-hidden rounded border border-gray-100 bg-white shadow-xl"
                >
                  <button
                    role="menuitem"
                    onClick={() => {
                      setLanguage("es");
                      setIsLangOpen(false);
                    }}
                    className={`flex items-center gap-2 px-4 py-3 text-sm transition-colors hover:bg-gray-50 ${language === "es" ? "bg-gray-50 font-bold" : ""}`}
                  >
                    🇪🇸 ES
                  </button>
                  <button
                    role="menuitem"
                    onClick={() => {
                      setLanguage("en");
                      setIsLangOpen(false);
                    }}
                    className={`flex items-center gap-2 px-4 py-3 text-sm transition-colors hover:bg-gray-50 ${language === "en" ? "bg-gray-50 font-bold" : ""}`}
                  >
                    🇺🇸 EN
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="flex cursor-pointer items-center gap-1.5 text-black transition-opacity hover:opacity-80"
            aria-haspopup="dialog"
            aria-expanded={isCartOpen}
            aria-label={t("cart.title")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            <span className="text-sm font-medium" aria-hidden="true">
              {itemCount}
            </span>
          </button>

          <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
      </div>
    </header>
  );
}
