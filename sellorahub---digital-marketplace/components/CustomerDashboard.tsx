'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Download,
  ShoppingBag,
  Heart,
  Star,
  User,
  ExternalLink,
  ShieldCheck,
  Calendar,
  CreditCard,
  FileText,
  Key,
  Trash2,
  ShoppingCart,
  ArrowRight,
} from 'lucide-react';
import { Product } from '@/lib/types';

export const CustomerDashboard: React.FC = () => {
  const {
    t,
    currentUser,
    orders,
    products,
    wishlist,
    toggleWishlist,
    addToCart,
    isItemInCart,
    reviews,
    downloadProductFile,
    setSelectedProduct,
    setActiveView,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'downloads' | 'orders' | 'wishlist' | 'profile'>('downloads');

  // Customer orders
  const customerOrders = orders.filter((o) => o.customerId === currentUser.id);

  // All purchased items flattened for My Downloads
  const allPurchasedItems = customerOrders.flatMap((order) =>
    order.items.map((it) => ({
      ...it,
      orderId: order.id,
      purchaseDate: order.createdAt,
    }))
  );

  // Customer wishlist products
  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  // Customer reviews
  const customerReviews = reviews.filter((r) => r.customerId === currentUser.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-zinc-200 dark:border-zinc-800 gap-4">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-14 h-14 rounded-2xl object-cover ring-2 ring-indigo-500/20 shadow-md"
          />
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-50">
              {currentUser.name}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">
              {currentUser.email} • {allPurchasedItems.length} Digital Assets Owned
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveView('shop')}
          className="self-start sm:self-auto px-4 py-2 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Explore More Products</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-zinc-200 dark:border-zinc-800 mb-8 text-xs font-bold">
        {[
          { id: 'downloads', label: `${t('myDownloads')} (${allPurchasedItems.length})`, icon: <Download className="w-4 h-4" /> },
          { id: 'orders', label: `${t('myOrders')} (${customerOrders.length})`, icon: <ShoppingBag className="w-4 h-4" /> },
          { id: 'wishlist', label: `${t('wishlist')} (${wishlistProducts.length})`, icon: <Heart className="w-4 h-4" /> },
          { id: 'profile', label: 'Account & Security', icon: <User className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-md font-bold'
                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab 1: My Downloads */}
      {activeTab === 'downloads' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              {t('myDownloads')}
            </h2>
            <span className="text-xs text-zinc-400">{t('downloadCount')}</span>
          </div>

          {allPurchasedItems.length === 0 ? (
            <div className="text-center py-16 p-8 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800 space-y-3">
              <Download className="w-10 h-10 text-zinc-300 dark:text-zinc-700 mx-auto" />
              <h3 className="font-bold text-zinc-700 dark:text-zinc-300 text-base">
                No digital downloads yet
              </h3>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                Once you purchase eBooks, Canva templates, source code, or designs, your download links and license keys will stay here forever.
              </p>
              <button
                onClick={() => setActiveView('shop')}
                className="px-5 py-2.5 bg-indigo-600 text-white text-xs font-bold rounded-xl shadow-xs"
              >
                Browse Marketplace
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {allPurchasedItems.map((item, idx) => {
                const productObj = products.find((p) => p.id === item.productId);
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <img
                          src={item.productThumbnail}
                          alt={item.productTitle}
                          className="w-14 h-14 rounded-xl object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 line-clamp-1">
                            {item.productTitle}
                          </h3>
                          <p className="text-xs text-zinc-500 mt-0.5">
                            Author: <span className="font-semibold text-zinc-700 dark:text-zinc-300">{item.authorName}</span>
                          </p>
                          <span className="text-[10px] text-zinc-400">
                            Purchased: {item.purchaseDate.split('T')[0]}
                          </span>
                        </div>
                      </div>

                      {/* License Key & File Info */}
                      <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 space-y-1.5 text-xs mb-4">
                        <div className="flex items-center justify-between">
                          <span className="text-zinc-400 text-[11px] flex items-center gap-1">
                            <Key className="w-3 h-3 text-indigo-500" />
                            License Key:
                          </span>
                          <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                            {item.licenseKey}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-zinc-500">
                          <span>File: {item.fileName}</span>
                          <span>Size: {item.fileSize}</span>
                        </div>
                      </div>
                    </div>

                    {/* Download Button */}
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          downloadProductFile(
                            productObj || ({
                              id: item.productId,
                              title: item.productTitle,
                              slug: item.productTitle.toLowerCase().replace(/\s+/g, '-'),
                              categoryName: 'Digital File',
                              authorName: item.authorName,
                              downloadFileName: item.fileName,
                              downloadFileSize: item.fileSize,
                              fileFormat: 'Commercial Asset',
                            } as any),
                            item.orderId
                          )
                        }
                        className="flex-1 py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Asset</span>
                      </button>

                      {productObj && (
                        <button
                          onClick={() => setSelectedProduct(productObj)}
                          className="px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 text-zinc-600 dark:text-zinc-300 text-xs font-semibold"
                          title="View Product Page"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Purchase History (Orders) */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            {t('myOrders')} ({customerOrders.length})
          </h2>

          {customerOrders.length === 0 ? (
            <p className="text-xs text-zinc-400 italic">No orders yet.</p>
          ) : (
            <div className="space-y-4">
              {customerOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800 gap-2 text-xs">
                    <div>
                      <span className="font-mono font-bold text-indigo-600">{ord.id}</span>
                      <span className="text-zinc-400 ml-3">{ord.createdAt.split('T')[0]}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-black text-sm text-zinc-900 dark:text-zinc-50">
                        ₹{ord.finalAmount}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        PAID (Razorpay)
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {ord.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={item.productThumbnail}
                            alt={item.productTitle}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-bold text-zinc-800 dark:text-zinc-200">
                              {item.productTitle}
                            </p>
                            <p className="text-[11px] text-zinc-400">By {item.authorName}</p>
                          </div>
                        </div>
                        <span className="font-bold">₹{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Wishlist */}
      {activeTab === 'wishlist' && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            {t('wishlist')} ({wishlistProducts.length})
          </h2>

          {wishlistProducts.length === 0 ? (
            <p className="text-xs text-zinc-400 italic">Your wishlist is empty. Tap the heart icon on any product to save it here.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {wishlistProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <img
                      src={prod.thumbnail}
                      alt={prod.title}
                      className="w-full h-36 rounded-xl object-cover mb-3"
                    />
                    <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 line-clamp-1">
                      {prod.title}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-0.5">By {prod.authorName}</p>
                    <p className="text-base font-black text-zinc-900 dark:text-zinc-100 mt-2">
                      ₹{prod.price}
                    </p>
                  </div>

                  <div className="flex gap-2 mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                    <button
                      onClick={() => addToCart(prod)}
                      className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1.5"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>{isItemInCart(prod.id) ? 'In Cart' : 'Add to Cart'}</span>
                    </button>
                    <button
                      onClick={() => toggleWishlist(prod.id)}
                      className="p-2 text-zinc-400 hover:text-rose-500 rounded-xl border border-zinc-200 dark:border-zinc-700"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Account & Security */}
      {activeTab === 'profile' && (
        <div className="max-w-xl mx-auto bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4 text-xs">
          <h2 className="text-lg font-black text-zinc-900 dark:text-zinc-50">Customer Account Details</h2>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl space-y-1">
            <span className="text-zinc-400 font-bold">NAME</span>
            <p className="text-sm font-semibold">{currentUser.name}</p>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl space-y-1">
            <span className="text-zinc-400 font-bold">EMAIL ADDRESS</span>
            <p className="text-sm font-semibold">{currentUser.email}</p>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl space-y-1">
            <span className="text-zinc-400 font-bold">PHONE / UPI</span>
            <p className="text-sm font-semibold">{currentUser.phone || '+91 98234 56789'}</p>
          </div>
          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-500">
            SelloraHub account active since {currentUser.joinedDate}. All transactions are encrypted.
          </div>
        </div>
      )}
    </div>
  );
};
