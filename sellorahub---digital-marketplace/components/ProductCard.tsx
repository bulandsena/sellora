'use client';

import React from 'react';
import { Product } from '@/lib/types';
import { useApp } from '@/context/AppContext';
import { Star, ShoppingCart, Heart, DownloadCloud, Check, ArrowRight, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    t,
    addToCart,
    isItemInCart,
    toggleWishlist,
    isInWishlist,
    setSelectedProduct,
    setSelectedAuthor,
    setActiveView,
    setIsCheckoutOpen,
    setIsCartOpen,
  } = useApp();

  const inCart = isItemInCart(product.id);
  const inWishlist = isInWishlist(product.id);

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!inCart) {
      addToCart(product);
    }
    setIsCheckoutOpen(true);
  };

  const handleAuthorClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // find author or pass dummy
    setSelectedAuthor({
      id: product.authorId,
      name: product.authorName,
      authorName: product.authorName,
      email: `${product.authorId}@sellorahub.com`,
      role: 'seller',
      avatar: product.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      bio: product.authorBio || 'Verified creator on SelloraHub offering premium digital assets.',
      joinedDate: '2024-01-15',
    });
    setActiveView('author_detail');
  };

  return (
    <div
      onClick={() => setSelectedProduct(product)}
      className="group relative bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-xs hover:shadow-xl hover:border-indigo-500/50 transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Thumbnail Banner */}
      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Discount Badge */}
        {product.discountPercent > 0 && (
          <div className="absolute top-2.5 left-2.5 bg-rose-600 text-white text-[11px] font-black px-2 py-0.5 rounded-md shadow-md uppercase tracking-wider">
            {product.discountPercent}% OFF
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label="Save to Wishlist"
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
            inWishlist
              ? 'bg-rose-500 text-white shadow-md'
              : 'bg-black/40 text-white hover:bg-black/60'
          }`}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Overlay on Desktop Hover */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="px-3 py-1.5 bg-white/90 dark:bg-zinc-900/90 text-zinc-900 dark:text-zinc-100 rounded-xl text-xs font-bold shadow-lg flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5" />
            {t('viewDetails')}
          </span>
        </div>

        {/* File Format Tag */}
        <div className="absolute bottom-2 right-2 bg-zinc-900/80 backdrop-blur-xs text-zinc-200 text-[10px] font-semibold px-2 py-0.5 rounded">
          {product.fileFormat.split('+')[0].trim()}
        </div>
      </div>

      {/* Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-md uppercase tracking-wider truncate">
              {product.categoryName}
            </span>

            {product.rating > 0 && (
              <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{product.rating}</span>
                <span className="text-zinc-400 text-[10px] font-normal">({product.reviewCount})</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm line-clamp-2 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2">
            {product.title}
          </h3>

          {/* Author info */}
          <div
            onClick={handleAuthorClick}
            className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-3 group/author"
          >
            {product.authorAvatar && (
              <img
                src={product.authorAvatar}
                alt={product.authorName}
                className="w-4 h-4 rounded-full object-cover"
              />
            )}
            <span className="text-zinc-400 text-[11px]">{t('byAuthor')}</span>
            <span className="font-semibold text-zinc-700 dark:text-zinc-300 group-hover/author:underline truncate">
              {product.authorName}
            </span>
          </div>
        </div>

        {/* Pricing & Actions */}
        <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg font-black text-zinc-900 dark:text-zinc-50">
              ₹{product.price}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-zinc-400 line-through">
                ₹{product.originalPrice}
              </span>
            )}
            <span className="ml-auto text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded">
              ⚡ Instant
            </span>
          </div>

          {/* Button actions */}
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (inCart) {
                  setIsCartOpen(true);
                } else {
                  addToCart(product);
                }
              }}
              className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all ${
                inCart
                  ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              {inCart ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>{t('addedToCart')}</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>{t('addToCart')}</span>
                </>
              )}
            </button>

            <button
              onClick={handleBuyNow}
              className="py-2 px-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center gap-1 shadow-xs shadow-indigo-600/20 hover:shadow-indigo-600/40 transition-all"
            >
              <span>{t('buyNow')}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
