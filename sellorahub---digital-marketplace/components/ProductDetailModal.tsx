'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  X,
  Star,
  ShoppingCart,
  Heart,
  CheckCircle2,
  Download,
  ShieldCheck,
  FileText,
  ExternalLink,
  Share2,
  ArrowRight,
  MessageSquare,
  Lock,
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    t,
    addToCart,
    isItemInCart,
    toggleWishlist,
    isInWishlist,
    reviews,
    addReview,
    products,
    setSelectedAuthor,
    setActiveView,
    setIsCheckoutOpen,
    setIsCartOpen,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');
  const [newRating, setNewRating] = useState<number>(5);
  const [newComment, setNewComment] = useState<string>('');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  if (!selectedProduct) return null;

  const product = selectedProduct;
  const inCart = isItemInCart(product.id);
  const inWishlist = isInWishlist(product.id);
  const productReviews = reviews.filter((r) => r.productId === product.id);

  // Related products from the same category
  const relatedProducts = products
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id && p.status === 'published')
    .slice(0, 3);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    addReview(product.id, newRating, newComment);
    setNewComment('');
  };

  const handleBuyNow = () => {
    if (!inCart) {
      addToCart(product);
    }
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleViewAuthor = () => {
    setSelectedAuthor({
      id: product.authorId,
      name: product.authorName,
      authorName: product.authorName,
      email: `${product.authorId}@sellorahub.com`,
      role: 'seller',
      avatar: product.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      bio: product.authorBio || 'Verified creator on SelloraHub.',
      joinedDate: '2024-01-15',
    });
    setSelectedProduct(null);
    setActiveView('author_detail');
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard! 📋', 'success');
    }
  };

  const previewImages = product.previewImages?.length ? product.previewImages : [product.thumbnail];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-5xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2.5 py-1 rounded-md">
              {product.categoryName}
            </span>
            {product.subcategory && (
              <span className="text-xs text-zinc-500 font-medium">/ {product.subcategory}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              aria-label="Share product"
              className="p-2 rounded-xl text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSelectedProduct(null)}
              aria-label="Close modal"
              className="p-2 rounded-xl text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 flex-1">
          {/* Main Grid: Images left, Purchasing details right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Gallery Column (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800">
                <img
                  src={previewImages[selectedImageIndex] || product.thumbnail}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                {product.discountPercent > 0 && (
                  <div className="absolute top-4 left-4 bg-rose-600 text-white text-xs font-black px-3 py-1 rounded-lg shadow-md uppercase tracking-wider">
                    {product.discountPercent}% OFF
                  </div>
                )}
              </div>

              {/* Thumbnails row if multiple */}
              {previewImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {previewImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`w-20 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                        selectedImageIndex === idx
                          ? 'border-indigo-600 shadow-md'
                          : 'border-zinc-200 dark:border-zinc-800 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="preview" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Live Preview Button if available */}
              {product.previewDemoUrl && (
                <a
                  href={product.previewDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-xs font-bold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-indigo-500" />
                  <span>{t('previewDemo')}: External Resource Link</span>
                </a>
              )}
            </div>

            {/* Product Buying Column (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-50 leading-tight mb-3">
                  {product.title}
                </h1>

                {/* Rating & Sales */}
                <div className="flex items-center gap-3 text-xs mb-4">
                  {product.rating > 0 && (
                    <div className="flex items-center gap-1 text-amber-500 font-bold bg-amber-50 dark:bg-amber-950/60 px-2 py-1 rounded-md">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{product.rating}</span>
                      <span className="text-zinc-400 font-normal">({product.reviewCount} reviews)</span>
                    </div>
                  )}
                  <span className="text-zinc-400">•</span>
                  <span className="text-zinc-500 font-semibold">{product.salesCount} purchases</span>
                </div>

                {/* Price Display */}
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 mb-6">
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-3xl font-black text-zinc-900 dark:text-zinc-50">
                      ₹{product.price}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-base text-zinc-400 line-through">
                        ₹{product.originalPrice}
                      </span>
                    )}
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full ml-auto">
                      Save ₹{product.originalPrice - product.price}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500 flex items-center gap-1.5 mt-2">
                    <Lock className="w-3 h-3 text-emerald-500" />
                    One-time payment • Lifetime updates & commercial usage
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleBuyNow}
                    className="w-full py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 group"
                  >
                    <span>{t('buyNow')} (₹{product.price})</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        if (inCart) {
                          setIsCartOpen(true);
                        } else {
                          addToCart(product);
                        }
                      }}
                      className={`py-3 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
                        inCart
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950 dark:border-emerald-800'
                          : 'border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                      }`}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>{inCart ? t('addedToCart') : t('addToCart')}</span>
                    </button>

                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className={`py-3 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
                        inWishlist
                          ? 'bg-rose-50 text-rose-600 border-rose-300 dark:bg-rose-950 dark:border-rose-800'
                          : 'border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
                      <span>{inWishlist ? 'Saved' : t('wishlist')}</span>
                    </button>
                  </div>
                </div>

                {/* Instant Guarantee bullet points */}
                <div className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-800 space-y-2.5 text-xs text-zinc-600 dark:text-zinc-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Instant download unlocked immediately after payment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span>Full commercial license for personal & client projects</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Includes: {product.downloadFileName} ({product.downloadFileSize})</span>
                  </div>
                </div>
              </div>

              {/* Author Card Snippet */}
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                    {t('creatorBio')}
                  </span>
                  <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded">
                    Verified Seller
                  </span>
                </div>
                <div className="flex items-center gap-3 mb-2">
                  {product.authorAvatar && (
                    <img
                      src={product.authorAvatar}
                      alt={product.authorName}
                      className="w-10 h-10 rounded-xl object-cover"
                    />
                  )}
                  <div>
                    <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                      {product.authorName}
                    </h4>
                    <p className="text-xs text-zinc-500 line-clamp-1">{product.authorBio}</p>
                  </div>
                </div>
                <button
                  onClick={handleViewAuthor}
                  className="w-full mt-2 py-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 rounded-lg transition-colors flex items-center justify-center gap-1"
                >
                  <span>{t('viewCreatorProfile')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Description & Specs Tabs */}
          <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-3 mb-6 text-sm font-bold">
              <button
                onClick={() => setActiveTab('description')}
                className={`pb-2 transition-colors relative ${
                  activeTab === 'description'
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-zinc-500 hover:text-zinc-900'
                }`}
              >
                {t('description')}
                {activeTab === 'description' && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-full" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-2 transition-colors relative ${
                  activeTab === 'specs'
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-zinc-500 hover:text-zinc-900'
                }`}
              >
                {t('fileInfo')}
                {activeTab === 'specs' && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-full" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-2 transition-colors relative ${
                  activeTab === 'reviews'
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-zinc-500 hover:text-zinc-900'
                }`}
              >
                {t('reviews')} ({productReviews.length})
                {activeTab === 'reviews' && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-full" />
                )}
              </button>
            </div>

            {/* Tab: Description */}
            {activeTab === 'description' && (
              <div className="prose dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed whitespace-pre-line">
                {product.description}
                {product.tags && product.tags.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2 not-prose">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab: File Specs */}
            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700">
                  <span className="text-zinc-400 font-bold block mb-1">FILE NAME</span>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">{product.downloadFileName}</span>
                </div>
                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700">
                  <span className="text-zinc-400 font-bold block mb-1">FORMAT</span>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">{product.fileFormat}</span>
                </div>
                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700">
                  <span className="text-zinc-400 font-bold block mb-1">DOWNLOAD SIZE</span>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">{product.downloadFileSize}</span>
                </div>
                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700">
                  <span className="text-zinc-400 font-bold block mb-1">COMMERCIAL LICENSE</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">Personal & Commercial Included</span>
                </div>
              </div>
            )}

            {/* Tab: Reviews */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {/* Submit Review Form */}
                <form onSubmit={handleReviewSubmit} className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 space-y-3">
                  <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-indigo-500" />
                    {t('writeReview')}
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-500">{t('rating')}:</span>
                    <div className="flex gap-1 text-amber-500">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setNewRating(star)}
                          className="hover:scale-125 transition-transform"
                        >
                          <Star className={`w-5 h-5 ${star <= newRating ? 'fill-current' : 'text-zinc-300'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your experience with this digital download..."
                    rows={2}
                    className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    required
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                  >
                    {t('submitReview')}
                  </button>
                </form>

                {/* Review List */}
                <div className="space-y-3">
                  {productReviews.length === 0 ? (
                    <p className="text-xs text-zinc-400 italic py-4">{t('noReviewsYet')}</p>
                  ) : (
                    productReviews.map((rev) => (
                      <div
                        key={rev.id}
                        className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-zinc-800 dark:text-zinc-200">
                              {rev.customerName}
                            </span>
                            <div className="flex text-amber-500">
                              {Array.from({ length: rev.rating }).map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-current" />
                              ))}
                            </div>
                          </div>
                          <span className="text-[10px] text-zinc-400">{rev.createdAt}</span>
                        </div>
                        <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                          {rev.comment}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
              <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100 mb-4">
                {t('relatedProducts')}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => setSelectedProduct(rel)}
                    className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500 cursor-pointer transition-all group flex items-center gap-3 bg-zinc-50 dark:bg-zinc-800/40"
                  >
                    <img
                      src={rel.thumbnail}
                      alt={rel.title}
                      className="w-14 h-14 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 line-clamp-1 group-hover:text-indigo-600">
                        {rel.title}
                      </p>
                      <p className="text-xs font-black text-zinc-900 dark:text-zinc-100 mt-0.5">
                        ₹{rel.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
