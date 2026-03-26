"use client";

import { useState, useCallback, useEffect } from "react";
import SearchBar from "@/features/products/components/SearchBar";
import ProductList from "@/features/products/components/ProductList";
import { useProducts } from "@/hooks/useProducts";
import { useLanguage } from "@/features/i18n/LanguageContext";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const { t } = useLanguage();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  const handleSearch = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  const { data: products = [], isLoading, error } = useProducts(debouncedSearch);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white">
        <SearchBar value={searchQuery} onChange={handleSearch} resultsCount={0} />
        <div className="flex items-center justify-center py-20">
          <span className="text-sm tracking-widest text-gray-400 uppercase">
            {t("list.loading")}
          </span>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-white">
        <SearchBar value={searchQuery} onChange={handleSearch} resultsCount={0} />
        <div className="flex items-center justify-center py-20">
          <span className="text-sm tracking-widest text-red-400 uppercase">{t("list.error")}</span>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <SearchBar value={searchQuery} onChange={handleSearch} resultsCount={products.length} />
      <ProductList products={products} />
    </main>
  );
}
