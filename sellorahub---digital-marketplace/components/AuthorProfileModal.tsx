'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { ProductCard } from './ProductCard';
import {
  X,
  Star,
  CheckCircle2,
  Globe,
  Twitter,
  Instagram,
  Youtube,
  Github,
  Mail,
  Share2,
  Package,
} from 'lucide-react';

export const AuthorProfileModal: React.FC = () => {
  const { selectedAuthor, setSelectedAuthor, products, t, activeView, setActiveView } = useApp();

  if (!selectedAuthor || activeView !== 'author_detail') return null;

  const author = selectedAuthor;
  const authorProducts = products.filter(
    (p) => (p.authorId === author.id || p.authorName === author.authorName) && p.status === 'published'
  );

  const totalSales = authorProducts.reduce((sum, p) => sum + p.salesCount, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      {/* Back button */}
      <div className="mb-6">
        <button
          onClick={() => setActiveView('shop')}
          className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
        >
          ← Back to Marketplace
        </button>
      </div>

      {/* Creator Profile Banner Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm mb-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <img
              src={author.avatar}
              alt={author.authorName || author.name}
              className="w-20 h-20 rounded-2xl object-cover ring-4 ring-indigo-500/10 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-50">
                  {author.authorName || author.name}
                </h1>
                <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">Real Name: {author.name}</p>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 mt-2 max-w-xl">
                {author.bio || 'Verified creator on SelloraHub offering premium digital downloads and resources.'}
              </p>
            </div>
          </div>

          {/* Creator Metrics */}
          <div className="flex gap-4 sm:border-l sm:border-zinc-200 dark:sm:border-zinc-800 sm:pl-6 text-center">
            <div>
              <p className="text-xl font-black text-zinc-900 dark:text-zinc-50">{authorProducts.length}</p>
              <span className="text-[11px] text-zinc-400">Products</span>
            </div>
            <div>
              <p className="text-xl font-black text-emerald-600 dark:text-emerald-400">{totalSales}+</p>
              <span className="text-[11px] text-zinc-400">Sales</span>
            </div>
            <div>
              <p className="text-xl font-black text-amber-500">4.9 ★</p>
              <span className="text-[11px] text-zinc-400">Avg Rating</span>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap items-center gap-3 text-xs">
          <span className="text-zinc-400 font-semibold">Connect:</span>
          {author.socialLinks?.twitter && (
            <a
              href={author.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:text-indigo-600 text-zinc-600 dark:text-zinc-400"
            >
              <Twitter className="w-4 h-4" />
            </a>
          )}
          {author.socialLinks?.instagram && (
            <a
              href={author.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:text-indigo-600 text-zinc-600 dark:text-zinc-400"
            >
              <Instagram className="w-4 h-4" />
            </a>
          )}
          {author.socialLinks?.youtube && (
            <a
              href={author.socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:text-indigo-600 text-zinc-600 dark:text-zinc-400"
            >
              <Youtube className="w-4 h-4" />
            </a>
          )}
          {author.socialLinks?.github && (
            <a
              href={author.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:text-indigo-600 text-zinc-600 dark:text-zinc-400"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          <span className="text-zinc-300 dark:text-zinc-700">|</span>
          <span className="text-zinc-500 font-medium">Joined {author.joinedDate}</span>
        </div>
      </div>

      {/* Author's Catalog */}
      <div>
        <h2 className="text-xl font-black text-zinc-900 dark:text-zinc-50 mb-6 flex items-center gap-2">
          <Package className="w-5 h-5 text-indigo-600" />
          <span>Products by {author.authorName || author.name} ({authorProducts.length})</span>
        </h2>

        {authorProducts.length === 0 ? (
          <p className="text-xs text-zinc-400 italic">No published products found for this author.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {authorProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
