"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/features/i18n/LanguageContext";

export default function BackButton() {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <div className="sticky top-toolbar z-40 bg-white py-3 pl-4 sm:pl-8">
      <button
        id="back-button"
        onClick={() => router.back()}
        aria-label={t("detail.back")}
        className="flex items-center gap-1 text-xs font-medium tracking-wider text-gray-900 uppercase hover:text-gray-600 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
        <span className="text-xs font-medium tracking-widest uppercase">{t("detail.back")}</span>
      </button>
    </div>
  );
}
