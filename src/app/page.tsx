"use client";

import { useState, useCallback, useEffect } from "react";
import SearchBar from "@/features/products/components/SearchBar";
import ProductList from "@/features/products/components/ProductList";
import { useProducts } from "@/hooks/useProducts";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

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
        <div className="flex justify-center items-center py-20">
          <span className="text-gray-400 text-sm tracking-widest uppercase">Loading products...</span>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-white">
        <SearchBar value={searchQuery} onChange={handleSearch} resultsCount={0} />
        <div className="flex justify-center items-center py-20">
          <span className="text-red-400 text-sm tracking-widest uppercase">Error loading products</span>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <SearchBar
        value={searchQuery}
        onChange={handleSearch}
        resultsCount={products.length}
      />
      <ProductList products={products} />
    </main>
  );
}
