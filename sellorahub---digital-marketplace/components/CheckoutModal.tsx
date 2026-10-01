'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  X,
  CreditCard,
  QrCode,
  Building2,
  Lock,
  CheckCircle2,
  Download,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Smartphone,
  ExternalLink,
} from 'lucide-react';
import { OrderItem } from '@/lib/types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    currentUser,
    commissionConfig,
    createOrder,
    t,
    setActiveView,
    downloadProductFile,
  } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiOption, setUpiOption] = useState<'qr' | 'id'>('qr');
  const [upiIdInput, setUpiIdInput] = useState('');
  
  // Buyer form fields
  const [fullName, setFullName] = useState(currentUser.name || 'Sanjay Kulkarni');
  const [email, setEmail] = useState(currentUser.email || 'buyer@sellorahub.com');
  const [phone, setPhone] = useState(currentUser.phone || '+91 98234 56789');

  // Payment execution state
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<any>(null);

  if (!isCheckoutOpen) return null;

  // Calculate cart pricing
  const subtotal = cart.reduce((sum, it) => sum + it.product.price, 0);
  const totalAmount = subtotal > 0 ? subtotal : 499; // Fallback if direct buy

  const handlePayNow = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate instant Razorpay payment authorization and server verification
    setTimeout(() => {
      // Build order items with 20% platform fee and 80% seller earnings
      const orderItems: OrderItem[] = (cart.length > 0 ? cart : []).map((it) => {
        const platformCut = (it.product.price * commissionConfig.platformCommissionPercent) / 100;
        const sellerCut = it.product.price - platformCut;
        return {
          productId: it.product.id,
          productTitle: it.product.title,
          productThumbnail: it.product.thumbnail,
          authorId: it.product.authorId,
          authorName: it.product.authorName,
          price: it.product.price,
          sellerEarnings: Number(sellerCut.toFixed(2)),
          platformFee: Number(platformCut.toFixed(2)),
          licenseKey: `LIC-${it.product.slug.toUpperCase().slice(0, 6)}-${Math.floor(100000 + Math.random() * 900000)}`,
          fileName: it.product.downloadFileName,
          fileSize: it.product.downloadFileSize,
        };
      });

      const order = createOrder({
        customerId: currentUser.id,
        customerName: fullName,
        customerEmail: email,
        customerPhone: phone,
        items: orderItems,
        totalAmount,
        discountAmount: 0,
        finalAmount: totalAmount,
        paymentMethod,
        paymentId: `pay_RZP_${Math.floor(100000000 + Math.random() * 900000000)}`,
        paymentStatus: 'completed',
      });

      setIsProcessing(false);
      setCompletedOrder(order);
    }, 1200);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setCompletedOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
              {completedOrder ? t('paymentSuccessTitle') : t('checkoutTitle')}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="overflow-y-auto p-6 sm:p-8 flex-1">
          {completedOrder ? (
            /* Order Success View */
            <div className="text-center space-y-6 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-3xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/10">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-50">
                  {t('paymentSuccessTitle')}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-500 max-w-md mx-auto mt-1">
                  {t('paymentSuccessSub')}
                </p>
              </div>

              {/* Order Details Card */}
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="flex justify-between">
                  <span className="text-zinc-400">{t('orderId')}:</span>
                  <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    {completedOrder.id}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Payment ID:</span>
                  <span className="font-mono text-zinc-700 dark:text-zinc-300">
                    {completedOrder.paymentId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">{t('total')}:</span>
                  <span className="font-black text-zinc-900 dark:text-zinc-100">
                    ₹{completedOrder.finalAmount}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Platform Commission (20%):</span>
                  <span className="text-emerald-600 font-semibold">
                    ₹{((completedOrder.finalAmount * commissionConfig.platformCommissionPercent) / 100).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Instant Download Triggers */}
              <div className="space-y-3 max-w-md mx-auto">
                <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                  Your Digital Files (Instant Download)
                </p>
                {completedOrder.items.map((item: any, i: number) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 flex items-center justify-between gap-3 text-left"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">
                        {item.productTitle}
                      </p>
                      <p className="text-[10px] text-zinc-400">
                        License: <span className="font-mono text-indigo-600">{item.licenseKey}</span>
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        downloadProductFile(
                          {
                            id: item.productId,
                            title: item.productTitle,
                            slug: item.productTitle.toLowerCase().replace(/\s+/g, '-'),
                            categoryName: 'Digital Item',
                            authorName: item.authorName,
                            downloadFileName: item.fileName,
                            downloadFileSize: item.fileSize,
                            fileFormat: 'Instant Digital Asset',
                          } as any,
                          completedOrder.id
                        )
                      }
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shrink-0 shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                ))}
              </div>

              {/* Navigation Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                <button
                  onClick={() => {
                    handleClose();
                    setActiveView('customer_dashboard');
                  }}
                  className="px-6 py-3 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-bold shadow-md flex items-center justify-center gap-2"
                >
                  <span>{t('viewDownloadsBtn')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={handleClose}
                  className="px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handlePayNow} className="space-y-6">
              {/* Buyer Information */}
              <div>
                <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
                  1. {t('billingDetails')}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="sm:col-span-2">
                    <label className="block font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                      {t('fullName')} *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                      {t('emailAddress')} *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                      {t('mobileNumber')} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                    2. {t('paymentGatewayTitle')}
                  </h3>
                  <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded">
                    Razorpay Gateway Simulator
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      paymentMethod === 'upi'
                        ? 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold'
                        : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 text-zinc-600 dark:text-zinc-400'
                    }`}
                  >
                    <Smartphone className="w-5 h-5" />
                    <span className="text-xs">UPI / QR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      paymentMethod === 'card'
                        ? 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold'
                        : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 text-zinc-600 dark:text-zinc-400'
                    }`}
                  >
                    <CreditCard className="w-5 h-5" />
                    <span className="text-xs">Cards</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      paymentMethod === 'netbanking'
                        ? 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold'
                        : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 text-zinc-600 dark:text-zinc-400'
                    }`}
                  >
                    <Building2 className="w-5 h-5" />
                    <span className="text-xs">Net Banking</span>
                  </button>
                </div>

                {/* Sub-view based on method */}
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 space-y-3">
                  {paymentMethod === 'upi' && (
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setUpiOption('qr')}
                          className={`px-3 py-1.5 text-xs font-semibold rounded-lg ${
                            upiOption === 'qr'
                              ? 'bg-indigo-600 text-white'
                              : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
                          }`}
                        >
                          Scan QR Code
                        </button>
                        <button
                          type="button"
                          onClick={() => setUpiOption('id')}
                          className={`px-3 py-1.5 text-xs font-semibold rounded-lg ${
                            upiOption === 'id'
                              ? 'bg-indigo-600 text-white'
                              : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
                          }`}
                        >
                          Enter UPI ID
                        </button>
                      </div>

                      {upiOption === 'qr' ? (
                        <div className="flex items-center gap-4 p-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-700">
                          <div className="w-24 h-24 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center p-1 border">
                            <QrCode className="w-20 h-20 text-zinc-800 dark:text-zinc-200" />
                          </div>
                          <div className="text-xs space-y-1">
                            <p className="font-bold text-zinc-800 dark:text-zinc-200">
                              Scan with any UPI App
                            </p>
                            <p className="text-zinc-500 text-[11px]">
                              Google Pay, PhonePe, Paytm, BHIM, Navi, CRED
                            </p>
                            <span className="inline-block text-[10px] text-emerald-600 font-mono font-bold bg-emerald-50 dark:bg-emerald-950 px-1.5 py-0.5 rounded">
                              sellorahub@icici
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                            {t('upiIdLabel')}
                          </label>
                          <input
                            type="text"
                            placeholder="yourname@okaxis"
                            value={upiIdInput}
                            onChange={(e) => setUpiIdInput(e.target.value)}
                            className="w-full p-2.5 text-xs rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {paymentMethod === 'card' && (
                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                          {t('cardNumber')}
                        </label>
                        <input
                          type="text"
                          defaultValue="4532 •••• •••• 8821"
                          className="w-full p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 font-mono"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                            {t('cardExpiry')}
                          </label>
                          <input
                            type="text"
                            defaultValue="11 / 28"
                            className="w-full p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 font-mono"
                          />
                        </div>
                        <div>
                          <label className="block font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                            {t('cardCvv')}
                          </label>
                          <input
                            type="password"
                            defaultValue="•••"
                            className="w-full p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'netbanking' && (
                    <div className="text-xs space-y-2">
                      <label className="block font-medium text-zinc-700 dark:text-zinc-300">
                        Popular Indian Banks
                      </label>
                      <select className="w-full p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
                        <option>State Bank of India (SBI)</option>
                        <option>HDFC Bank</option>
                        <option>ICICI Bank</option>
                        <option>Axis Bank</option>
                        <option>Kotak Mahindra Bank</option>
                        <option>Bank of Baroda</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>

              {/* Commission & Earnings Transparency Note */}
              <div className="p-3 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-[11px] text-indigo-900 dark:text-indigo-200">
                <p className="font-semibold mb-0.5">Platform Split Breakdown:</p>
                <div className="flex justify-between">
                  <span>Author / Creator Earnings (80%):</span>
                  <span className="font-bold">₹{((totalAmount * 80) / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>SelloraHub Platform Fee (20%):</span>
                  <span className="font-bold">₹{((totalAmount * 20) / 100).toFixed(2)}</span>
                </div>
              </div>

              {/* Submit Payment Button */}
              <div className="space-y-2 pt-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>{t('processingPayment')}</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>{t('payNowBtn')}{totalAmount}</span>
                    </>
                  )}
                </button>
                <p className="text-[10px] text-center text-zinc-400">
                  {t('mockPaymentNotice')}
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
