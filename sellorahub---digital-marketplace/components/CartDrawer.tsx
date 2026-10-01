'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Check, ShieldCheck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    clearCart,
    t,
    setIsCheckoutOpen,
    setActiveView,
    showToast,
  } = useApp();

  const [couponInput, setCouponInput] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponSuccess, setCouponSuccess] = useState(false);

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.product.price, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const totalAmount = subtotal - discountAmount;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim().toUpperCase() === 'SELLORA20') {
      setDiscountPercent(20);
      setCouponSuccess(true);
      showToast(t('couponApplied'), 'success');
    } else {
      showToast('Invalid coupon. Try "SELLORA20"', 'error');
    }
  };

  const handleProceed = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col">
          {/* Cart Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
                {t('shoppingCart')} ({cart.length})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-500 mx-auto flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-zinc-800 dark:text-zinc-200 text-lg">
                  {t('emptyCart')}
                </h3>
                <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                  {t('emptyCartSub')}
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setActiveView('shop');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-colors"
                >
                  {t('startShopping')}
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3.5 p-3 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-800/40 relative group"
                >
                  <img
                    src={item.product.thumbnail}
                    alt={item.product.title}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0 pr-6">
                    <h4 className="font-bold text-xs text-zinc-900 dark:text-zinc-100 line-clamp-1">
                      {item.product.title}
                    </h4>
                    <p className="text-[11px] text-zinc-500 mt-0.5">
                      {t('byAuthor')} {item.product.authorName}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-black text-zinc-900 dark:text-zinc-50">
                        ₹{item.product.price}
                      </span>
                      <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950 px-1.5 py-0.5 rounded">
                        Digital Delivery
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="absolute top-3 right-3 text-zinc-400 hover:text-rose-500 transition-colors p-1"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer & Order Summary */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60 space-y-4">
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Coupon: SELLORA20"
                    disabled={couponSuccess}
                    className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 uppercase font-mono"
                  />
                </div>
                <button
                  type="submit"
                  disabled={couponSuccess}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                    couponSuccess
                      ? 'bg-emerald-600 text-white'
                      : 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-indigo-600'
                  }`}
                >
                  {couponSuccess ? <Check className="w-4 h-4" /> : t('applyCoupon')}
                </button>
              </form>

              {/* Price Calculation */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                  <span>{t('subtotal')}</span>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">₹{subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>{t('discount')} (20%)</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-[11px] text-zinc-400">
                  <span>{t('platformFee')}</span>
                  <span>₹0 (Included)</span>
                </div>
                <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 flex justify-between text-base font-black text-zinc-900 dark:text-zinc-50">
                  <span>{t('total')}</span>
                  <span className="text-indigo-600 dark:text-indigo-400">₹{totalAmount}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleProceed}
                className="w-full py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2"
              >
                <span>{t('proceedToCheckout')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Encrypted 256-bit Indian Gateway Checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
