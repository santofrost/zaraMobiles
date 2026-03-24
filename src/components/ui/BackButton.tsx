"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <div className="sticky top-toolbar z-40 bg-white py-3 pl-4 sm:pl-8">
      <button
        id="back-button"
        onClick={() => router.back()}
        className="flex items-center gap-1 text-xs font-medium tracking-wider text-gray-900 uppercase hover:text-gray-600 transition-colors"
      >
        <span className="text-sm">&#8249;</span>
        BACK
      </button>
    </div>
  );
}
