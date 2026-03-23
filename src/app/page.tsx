"use client";

import { useState, useMemo, useCallback } from "react";
import SearchBar from "@/features/products/components/SearchBar";
import ProductList from "@/features/products/components/ProductList";
import { mockProducts } from "@/features/products/data/mockProducts";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return mockProducts;

    const query = searchQuery.toLowerCase();
    return mockProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <main className="min-h-screen bg-white">
      <SearchBar
        value={searchQuery}
        onChange={handleSearch}
        resultsCount={filteredProducts.length}
      />
      <ProductList products={filteredProducts} />
    </main>
  );
}
