'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { ProductCard } from './ProductCard';
import {
  Search,
  Filter,
  SlidersHorizontal,
  X,
  Star,
  Layers,
  ArrowUpDown,
  Tag,
} from 'lucide-react';

export const ShopView: React.FC = () => {
  const {
    products,
    categories,
    searchQuery,
    setSearchQuery,
    selectedCategorySlug,
    setSelectedCategorySlug,
    t,
  } = useApp();

  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'price_low' | 'price_high'>('popular');
  const [minRating, setMinRating] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(3000);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => p.status === 'published') // Customer shop shows published products
      .filter((p) => {
        // Search query filter (matches title, author, category, tags, description)
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesTitle = p.title.toLowerCase().includes(q);
          const matchesAuthor = p.authorName.toLowerCase().includes(q);
          const matchesCat = p.categoryName.toLowerCase().includes(q);
          const matchesDesc = p.description.toLowerCase().includes(q);
          const matchesTags = p.tags.some((tag) => tag.toLowerCase().includes(q));
          if (!matchesTitle && !matchesAuthor && !matchesCat && !matchesDesc && !matchesTags) {
            return false;
          }
        }

        // Category filter
        if (selectedCategorySlug) {
          const cat = categories.find((c) => c.slug === selectedCategorySlug);
          if (cat && p.categoryId !== cat.id) {
            return false;
          }
        }

        // Rating filter
        if (minRating > 0 && p.rating < minRating) {
          return false;
        }

        // Price filter
        if (p.price > maxPrice) {
          return false;
        }

        // Tag filter
        if (selectedTag && !p.tags.includes(selectedTag)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'popular') return b.salesCount - a.salesCount;
        if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        if (sortBy === 'price_low') return a.price - b.price;
        if (sortBy === 'price_high') return b.price - a.price;
        return 0;
      });
  }, [products, searchQuery, selectedCategorySlug, minRating, maxPrice, selectedTag, sortBy, categories]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategorySlug(null);
    setMinRating(0);
    setMaxPrice(3000);
    setSelectedTag(null);
  };

  const activeCategoryObj = categories.find((c) => c.slug === selectedCategorySlug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      {/* Title & Active Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-8 border-b border-zinc-200 dark:border-zinc-800 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            {activeCategoryObj ? activeCategoryObj.name : 'All Digital Assets'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-50">
            {searchQuery ? `Search Results for "${searchQuery}"` : activeCategoryObj ? activeCategoryObj.name : 'Digital Marketplace'}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Instant downloads • Verified creator assets • Commercial licenses included
          </p>
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <span className="text-xs font-medium text-zinc-400 flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5" />
            Sort:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-semibold text-zinc-800 dark:text-zinc-200"
          >
            <option value="popular">Most Popular</option>
            <option value="newest">Newest Releases</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Main Grid: Left Filters sidebar (desktop) + Right Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                <SlidersHorizontal className="w-4 h-4 text-indigo-500" />
                Filters
              </span>
              {(searchQuery || selectedCategorySlug || minRating > 0 || maxPrice < 3000 || selectedTag) && (
                <button
                  onClick={clearAllFilters}
                  className="text-[11px] font-bold text-rose-500 hover:underline"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Category selection */}
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                Category
              </label>
              <div className="space-y-1 max-h-48 overflow-y-auto text-xs pr-1">
                <button
                  onClick={() => setSelectedCategorySlug(null)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex justify-between ${
                    !selectedCategorySlug
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 font-bold'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  <span>All Categories</span>
                  <span>{products.filter((p) => p.status === 'published').length}</span>
                </button>
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategorySlug(c.slug)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex justify-between ${
                      selectedCategorySlug === c.slug
                        ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 font-bold'
                        : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                    }`}
                  >
                    <span className="truncate">{c.name}</span>
                    <span className="text-[10px] text-zinc-400">{c.itemCount}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price slider */}
            <div>
              <div className="flex justify-between text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                <span>Max Price</span>
                <span className="text-indigo-600 font-black">₹{maxPrice}</span>
              </div>
              <input
                type="range"
                min={199}
                max={3000}
                step={50}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                Minimum Rating
              </label>
              <div className="flex gap-1">
                {[0, 4, 4.5, 4.8].map((rt) => (
                  <button
                    key={rt}
                    onClick={() => setMinRating(rt)}
                    className={`flex-1 py-1 rounded-lg text-xs font-bold border transition-colors ${
                      minRating === rt
                        ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 text-amber-600'
                        : 'border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400'
                    }`}
                  >
                    {rt === 0 ? 'All' : `${rt}★+`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid (3 cols on large) */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 p-8 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800 space-y-3 bg-white dark:bg-zinc-900">
              <Search className="w-10 h-10 text-zinc-400 mx-auto" />
              <h3 className="text-base font-bold text-zinc-800 dark:text-zinc-200">
                No matching digital products found
              </h3>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                Try searching for different keywords like &quot;Canva&quot;, &quot;eBook&quot;, &quot;Next.js&quot;, or clear active filters.
              </p>
              <button
                onClick={clearAllFilters}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-xs"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
