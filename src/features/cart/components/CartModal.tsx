"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/features/cart/context/CartContext";
import { formatPrice } from "@/utils/formatPrice";
import { useLanguage } from "@/features/i18n/LanguageContext";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items, itemCount, total } = useCart();
  const { t } = useLanguage();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/5 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className={`absolute top-full right-0 z-50 w-80 border border-gray-200 bg-white shadow-lg transition-all duration-300 sm:w-96 ${
          isOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label={t("cart.title")}
      >
        {items.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-sm text-gray-400">{t("cart.empty")}</p>
          </div>
        ) : (
          <>
            <div className="max-h-80 divide-y divide-gray-100 overflow-y-auto">
              {items.map((item) => (
                <Link
                  href={`/product/${item.productId}`}
                  onClick={onClose}
                  key={item.cartId}
                  className="flex gap-3 p-4 transition-colors hover:bg-gray-50"
                >
                  <div className="relative h-16 w-16 shrink-0">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      sizes="64px"
                      className="object-contain"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-gray-900 uppercase">
                      {item.name}
                    </p>
                    <p className="text-[10px] text-gray-400">
                      {item.storage} | {item.color}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-sm font-bold text-gray-900">x{item.quantity}</span>
                      <span className="text-xs font-medium text-gray-700">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="border-t border-gray-200 p-4">
              <div className="mb-3 flex justify-between">
                <span className="text-xs font-medium text-gray-500 uppercase">
                  {t("cart.total")} ({itemCount}{" "}
                  {itemCount === 1 ? t("cart.item") : t("cart.items")})
                </span>
                <span className="text-sm font-semibold text-gray-900">{formatPrice(total)}</span>
              </div>
              <Link
                href="/cart"
                onClick={onClose}
                className="block w-full bg-black py-4 text-center text-xs font-medium tracking-widest text-white uppercase transition-colors hover:bg-gray-800"
              >
                {t("cart.view")}
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
