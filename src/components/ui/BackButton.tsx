"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      id="back-button"
      onClick={() => router.back()}
      className="fixed top-16 left-4 z-50 flex items-center gap-1 text-xs font-medium tracking-wider text-gray-900 uppercase hover:text-gray-600 transition-colors sm:left-8"
    >
      <span className="text-sm">&#8249;</span>
      BACK
    </button>
  );
}
