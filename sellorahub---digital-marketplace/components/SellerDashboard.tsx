'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  LayoutDashboard,
  PlusCircle,
  Package,
  TrendingUp,
  CreditCard,
  History,
  DownloadCloud,
  UserCheck,
  Settings,
  AlertCircle,
  CheckCircle2,
  Clock,
  XCircle,
  DollarSign,
  ArrowUpRight,
  Sparkles,
  Building,
  Smartphone,
  ExternalLink,
  Edit,
  Trash2,
} from 'lucide-react';
import { Product } from '@/lib/types';

export const SellerDashboard: React.FC = () => {
  const {
    t,
    currentUser,
    setCurrentUser,
    products,
    categories,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    withdrawals,
    requestWithdrawal,
    commissionConfig,
    showToast,
    setSelectedProduct,
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'add_product' | 'my_products' | 'orders' | 'withdraw' | 'history' | 'profile'
  >('overview');

  // Filter products by this seller
  const sellerProducts = products.filter((p) => p.authorId === currentUser.id);

  // Calculate seller financial metrics
  const sellerOrders = orders.filter((order) =>
    order.items.some((it) => it.authorId === currentUser.id)
  );

  const totalSalesCount = sellerOrders.reduce((sum, order) => {
    return sum + order.items.filter((it) => it.authorId === currentUser.id).length;
  }, 0);

  const grossRevenue = sellerOrders.reduce((sum, order) => {
    const items = order.items.filter((it) => it.authorId === currentUser.id);
    return sum + items.reduce((iSum, it) => iSum + it.price, 0);
  }, 0);

  const totalPlatformCut = (grossRevenue * commissionConfig.platformCommissionPercent) / 100;
  const netEarnings = grossRevenue - totalPlatformCut;

  const totalWithdrawn = withdrawals
    .filter((w) => w.sellerId === currentUser.id && w.status === 'paid')
    .reduce((sum, w) => sum + w.amount, 0);

  const pendingWithdrawalsAmount = withdrawals
    .filter((w) => w.sellerId === currentUser.id && (w.status === 'pending' || w.status === 'processing'))
    .reduce((sum, w) => sum + w.amount, 0);

  const availableBalance = Math.max(0, netEarnings - totalWithdrawn - pendingWithdrawalsAmount);

  // New Product Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    shortDescription: '',
    categoryId: categories[0]?.id || 'cat-ebooks',
    subcategory: '',
    price: 499,
    discountPercent: 20,
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    previewDemoUrl: '',
    downloadFileName: 'master-package.zip',
    downloadFileSize: '18.4 MB',
    fileFormat: 'ZIP Archive + Commercial License',
    downloadPayload: 'Official digital package for SelloraHub customer.',
    tags: 'Digital Product, Templates, India',
    seoTitle: '',
    seoDescription: '',
  });

  // Withdrawal form state
  const [withdrawAmount, setWithdrawAmount] = useState<number>(500);
  const [withdrawMethod, setWithdrawMethod] = useState<'upi' | 'bank_transfer'>('upi');
  const [upiIdInput, setUpiIdInput] = useState(currentUser.upiId || 'rohitcraft@okhdfcbank');
  const [bankAccInput, setBankAccInput] = useState(currentUser.bankAccountNumber || '918237492837');
  const [bankIfscInput, setBankIfscInput] = useState(currentUser.bankIfsc || 'HDFC0001234');

  // Profile form state
  const [authorNameInput, setAuthorNameInput] = useState(currentUser.authorName || currentUser.name);
  const [bioInput, setBioInput] = useState(currentUser.bio || '');

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArray = formData.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    addProduct({
      title: formData.title,
      description: formData.description,
      shortDescription: formData.shortDescription || formData.description.slice(0, 100),
      categoryId: formData.categoryId,
      subcategory: formData.subcategory || 'General',
      price: Number(formData.price),
      discountPercent: Number(formData.discountPercent),
      thumbnail: formData.thumbnail,
      previewDemoUrl: formData.previewDemoUrl,
      downloadFileName: formData.downloadFileName,
      downloadFileSize: formData.downloadFileSize,
      fileFormat: formData.fileFormat,
      downloadPayload: formData.downloadPayload,
      tags: tagsArray,
      seoTitle: formData.seoTitle || formData.title,
      seoDescription: formData.seoDescription || formData.shortDescription,
    });

    // Reset form and switch to My Products
    setFormData({
      title: '',
      description: '',
      shortDescription: '',
      categoryId: categories[0]?.id || 'cat-ebooks',
      subcategory: '',
      price: 499,
      discountPercent: 20,
      thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      previewDemoUrl: '',
      downloadFileName: 'master-package.zip',
      downloadFileSize: '18.4 MB',
      fileFormat: 'ZIP Archive + Commercial License',
      downloadPayload: 'Official digital package for SelloraHub customer.',
      tags: 'Digital Product, Templates, India',
      seoTitle: '',
      seoDescription: '',
    });
    setActiveTab('my_products');
  };

  const handleWithdrawalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = requestWithdrawal(withdrawAmount, withdrawMethod, {
      upiId: withdrawMethod === 'upi' ? upiIdInput : undefined,
      bankDetails:
        withdrawMethod === 'bank_transfer'
          ? { accountNumber: bankAccInput, ifsc: bankIfscInput }
          : undefined,
    });
    if (success) {
      setActiveTab('history');
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentUser({
      ...currentUser,
      authorName: authorNameInput,
      bio: bioInput,
      upiId: upiIdInput,
      bankAccountNumber: bankAccInput,
      bankIfsc: bankIfscInput,
    });
    showToast('Author creator profile updated successfully! 🎉', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Banner & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-zinc-200 dark:border-zinc-800 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-0.5 rounded-full">
              Creator Hub
            </span>
            <span className="text-xs text-zinc-400">
              Platform Fee: {commissionConfig.platformCommissionPercent}% | Your Share: {commissionConfig.sellerCommissionPercent}%
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-50">
            {currentUser.authorName || currentUser.name}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">
            {currentUser.bio || 'Manage your digital inventory, track sales, and withdraw earnings in ₹ INR.'}
          </p>
        </div>

        <button
          onClick={() => setActiveTab('add_product')}
          className="self-start sm:self-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{t('addProduct')}</span>
        </button>
      </div>

      {/* 6 Key Financial & Activity Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 mb-8">
        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
          <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">{t('totalSales')}</p>
          <p className="text-2xl font-black text-zinc-900 dark:text-zinc-50 mt-1">{totalSalesCount}</p>
          <span className="text-[10px] text-zinc-400">Units sold</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">{t('totalEarnings')}</p>
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">₹{netEarnings.toFixed(0)}</p>
          <span className="text-[10px] text-emerald-500">80% Net share</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
          <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">{t('platformCommission')}</p>
          <p className="text-2xl font-black text-zinc-700 dark:text-zinc-300 mt-1">₹{totalPlatformCut.toFixed(0)}</p>
          <span className="text-[10px] text-zinc-400">20% fee</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
          <p className="text-[11px] font-bold text-amber-500 uppercase tracking-wider">{t('pendingBalance')}</p>
          <p className="text-2xl font-black text-amber-500 mt-1">₹{pendingWithdrawalsAmount.toFixed(0)}</p>
          <span className="text-[10px] text-amber-500">In review</span>
        </div>

        <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 shadow-xs">
          <p className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">{t('availableBalance')}</p>
          <p className="text-2xl font-black text-indigo-700 dark:text-indigo-300 mt-1">₹{availableBalance.toFixed(0)}</p>
          <button
            onClick={() => setActiveTab('withdraw')}
            className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 underline hover:text-indigo-800"
          >
            Withdraw now →
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
          <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">{t('withdrawnAmount')}</p>
          <p className="text-2xl font-black text-zinc-900 dark:text-zinc-50 mt-1">₹{totalWithdrawn.toFixed(0)}</p>
          <span className="text-[10px] text-zinc-400">Sent to UPI/Bank</span>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-zinc-200 dark:border-zinc-800 mb-8 text-xs font-bold">
        {[
          { id: 'overview', label: 'Dashboard Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
          { id: 'add_product', label: t('addProduct'), icon: <PlusCircle className="w-4 h-4" /> },
          { id: 'my_products', label: `${t('myProducts')} (${sellerProducts.length})`, icon: <Package className="w-4 h-4" /> },
          { id: 'orders', label: `${t('salesHistory')} (${sellerOrders.length})`, icon: <TrendingUp className="w-4 h-4" /> },
          { id: 'withdraw', label: t('requestPayout'), icon: <CreditCard className="w-4 h-4" /> },
          { id: 'history', label: t('payoutHistory'), icon: <History className="w-4 h-4" /> },
          { id: 'profile', label: 'Author Profile & UPI', icon: <UserCheck className="w-4 h-4" /> },
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

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Quick Notice about Commission */}
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between text-xs text-emerald-900 dark:text-emerald-200">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                <strong>SelloraHub 80/20 Creator Model:</strong> For every ₹100 product, you receive ₹80 directly into your withdrawable balance. Payouts are dispatched to UPI or Bank Accounts within 24 hours.
              </span>
            </div>
            <button
              onClick={() => setActiveTab('withdraw')}
              className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg font-bold shrink-0 shadow-xs"
            >
              Request Payout
            </button>
          </div>

          {/* Recent Products Row */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                Your Published Digital Inventory
              </h2>
              <button
                onClick={() => setActiveTab('my_products')}
                className="text-xs font-bold text-indigo-600 hover:underline"
              >
                View all ({sellerProducts.length}) →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sellerProducts.slice(0, 3).map((prod) => (
                <div
                  key={prod.id}
                  className="p-3.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex gap-3.5 items-center"
                >
                  <img src={prod.thumbnail} alt={prod.title} className="w-16 h-16 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        prod.status === 'published'
                          ? 'bg-emerald-100 text-emerald-700'
                          : prod.status === 'pending_approval'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-rose-100 text-rose-700'
                      }`}
                    >
                      {prod.status.toUpperCase()}
                    </span>
                    <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate mt-1">
                      {prod.title}
                    </h3>
                    <div className="flex items-center justify-between mt-1 text-xs">
                      <span className="font-black">₹{prod.price}</span>
                      <span className="text-zinc-400 text-[11px]">{prod.salesCount} sales</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders Table */}
          <div>
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-4">
              Recent Sales & Earnings Breakdown
            </h2>
            {sellerOrders.length === 0 ? (
              <p className="text-xs text-zinc-400 italic">No sales recorded yet. Your products will appear here once purchased.</p>
            ) : (
              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-zinc-50 dark:bg-zinc-800/60 text-zinc-400 uppercase tracking-wider font-bold border-b border-zinc-200 dark:border-zinc-800">
                    <tr>
                      <th className="p-3">Order / Date</th>
                      <th className="p-3">Product</th>
                      <th className="p-3">Gross Price</th>
                      <th className="p-3">SelloraHub (20%)</th>
                      <th className="p-3 text-emerald-600">Your Share (80%)</th>
                      <th className="p-3">License Key</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                    {sellerOrders.map((order) => {
                      const item = order.items.find((it) => it.authorId === currentUser.id);
                      if (!item) return null;
                      return (
                        <tr key={order.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30">
                          <td className="p-3">
                            <span className="font-mono font-bold text-indigo-600">{order.id}</span>
                            <span className="block text-[10px] text-zinc-400">
                              {order.createdAt.split('T')[0]}
                            </span>
                          </td>
                          <td className="p-3 font-semibold text-zinc-800 dark:text-zinc-200 max-w-[200px] truncate">
                            {item.productTitle}
                          </td>
                          <td className="p-3 font-bold">₹{item.price}</td>
                          <td className="p-3 text-zinc-500">₹{item.platformFee}</td>
                          <td className="p-3 font-black text-emerald-600 dark:text-emerald-400">
                            +₹{item.sellerEarnings}
                          </td>
                          <td className="p-3 font-mono text-[11px] text-zinc-400">{item.licenseKey}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Upload Product Form */}
      {activeTab === 'add_product' && (
        <div className="max-w-3xl mx-auto bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-black text-zinc-900 dark:text-zinc-50">{t('addProduct')}</h2>
            <p className="text-xs text-zinc-500 mt-1">
              {t('sellerCommissionNote', { sellerShare: ((formData.price * 80) / 100).toFixed(0) })}
            </p>
          </div>

          <form onSubmit={handleProductSubmit} className="space-y-5 text-xs">
            {/* Title */}
            <div>
              <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                {t('productTitle')} *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. 500+ Indian Festive & Business Canva Templates"
                className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            {/* Category & Subcategory */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  {t('selectCategory')} *
                </label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  {t('selectSubcategory')}
                </label>
                <input
                  type="text"
                  value={formData.subcategory}
                  onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                  placeholder="e.g. Social Media, Next.js, PDF Book"
                  className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                />
              </div>
            </div>

            {/* Pricing (INR ₹) */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50">
              <div>
                <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  {t('regularPrice')} *
                </label>
                <input
                  type="number"
                  required
                  min={49}
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 font-bold text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  {t('discountPercent')}
                </label>
                <input
                  type="number"
                  min={0}
                  max={90}
                  value={formData.discountPercent}
                  onChange={(e) => setFormData({ ...formData, discountPercent: Number(e.target.value) })}
                  className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 font-bold text-sm"
                />
              </div>
            </div>

            {/* Thumbnail URL */}
            <div>
              <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                {t('thumbnailUrl')} *
              </label>
              <input
                type="url"
                required
                value={formData.thumbnail}
                onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
              />
            </div>

            {/* Live Preview Demo Link */}
            <div>
              <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                {t('previewDemoLink')}
              </label>
              <input
                type="url"
                value={formData.previewDemoUrl}
                onChange={(e) => setFormData({ ...formData, previewDemoUrl: e.target.value })}
                placeholder="https://yourdemo.com or Canva view link"
                className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
              />
            </div>

            {/* Deliverable File Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">File Name</label>
                <input
                  type="text"
                  value={formData.downloadFileName}
                  onChange={(e) => setFormData({ ...formData, downloadFileName: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800"
                />
              </div>
              <div>
                <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">File Size</label>
                <input
                  type="text"
                  value={formData.downloadFileSize}
                  onChange={(e) => setFormData({ ...formData, downloadFileSize: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800"
                />
              </div>
              <div>
                <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">Format</label>
                <input
                  type="text"
                  value={formData.fileFormat}
                  onChange={(e) => setFormData({ ...formData, fileFormat: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800"
                />
              </div>
            </div>

            {/* Digital Payload (Links, Text, Vault info) */}
            <div>
              <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                {t('digitalFilePayload')} *
              </label>
              <textarea
                required
                rows={3}
                value={formData.downloadPayload}
                onChange={(e) => setFormData({ ...formData, downloadPayload: e.target.value })}
                placeholder="Include Canva duplicate links, Google Drive download links, GitHub invite token, or instructions for the buyer."
                className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-mono"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                {t('productDescription')} *
              </label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Detail what is included, benefits, compatibility, and features..."
                className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
              />
            </div>

            {/* Tags & SEO */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  {t('productTags')}
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="Canva, Festival, India"
                  className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800"
                />
              </div>
              <div>
                <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  {t('seoTitle')}
                </label>
                <input
                  type="text"
                  value={formData.seoTitle}
                  onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                  placeholder="SEO Title for Google search"
                  className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800"
                />
              </div>
            </div>

            {/* Admin Moderation Notice */}
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-xs flex items-center gap-2.5">
              <Clock className="w-5 h-5 shrink-0 text-amber-600" />
              <span>
                <strong>Approval Workflow:</strong> Submitted products undergo moderation. Once an administrator approves your item, it will immediately appear live in the store.
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t('submitForApproval')}</span>
            </button>
          </form>
        </div>
      )}

      {/* Tab 3: My Products */}
      {activeTab === 'my_products' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Manage Catalog ({sellerProducts.length} Items)
            </h2>
            <button
              onClick={() => setActiveTab('add_product')}
              className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-lg flex items-center gap-1"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              Upload Product
            </button>
          </div>

          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-zinc-50 dark:bg-zinc-800/60 text-zinc-400 uppercase tracking-wider font-bold border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="p-3">Product</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Sales</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {sellerProducts.map((prod) => (
                  <tr key={prod.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30">
                    <td className="p-3 flex items-center gap-3">
                      <img src={prod.thumbnail} alt={prod.title} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                      <div className="min-w-0">
                        <p className="font-bold text-zinc-800 dark:text-zinc-200 truncate max-w-[220px]">
                          {prod.title}
                        </p>
                        <span className="text-[10px] text-zinc-400 font-mono">{prod.downloadFileName}</span>
                      </div>
                    </td>
                    <td className="p-3 text-zinc-600 dark:text-zinc-400">{prod.categoryName}</td>
                    <td className="p-3 font-black">₹{prod.price}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          prod.status === 'published'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : prod.status === 'pending_approval'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                            : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                        }`}
                      >
                        {prod.status === 'published' ? 'Live' : prod.status === 'pending_approval' ? 'Pending Review' : 'Rejected'}
                      </span>
                    </td>
                    <td className="p-3 font-semibold">{prod.salesCount}</td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedProduct(prod)}
                          className="p-1 text-zinc-500 hover:text-indigo-600"
                          title="Preview"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteProduct(prod.id)}
                          className="p-1 text-zinc-400 hover:text-rose-600"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Orders & Sales */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            Customer Orders & Commission Log
          </h2>

          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-zinc-50 dark:bg-zinc-800/60 text-zinc-400 uppercase tracking-wider font-bold border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Product Title</th>
                  <th className="p-3">Gross</th>
                  <th className="p-3">SelloraHub Cut (20%)</th>
                  <th className="p-3 text-emerald-600">Creator Net (80%)</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {sellerOrders.map((ord) => {
                  const it = ord.items.find((item) => item.authorId === currentUser.id);
                  if (!it) return null;
                  return (
                    <tr key={ord.id} className="hover:bg-zinc-50/50">
                      <td className="p-3 font-mono font-bold text-indigo-600">{ord.id}</td>
                      <td className="p-3 font-medium">{ord.customerName}</td>
                      <td className="p-3 max-w-[200px] truncate">{it.productTitle}</td>
                      <td className="p-3 font-bold">₹{it.price}</td>
                      <td className="p-3 text-zinc-500">₹{it.platformFee}</td>
                      <td className="p-3 font-black text-emerald-600">+₹{it.sellerEarnings}</td>
                      <td className="p-3 text-zinc-400">{ord.createdAt.split('T')[0]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 5: Request Payout / Withdrawal */}
      {activeTab === 'withdraw' && (
        <div className="max-w-xl mx-auto bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-black text-zinc-900 dark:text-zinc-50">{t('withdrawTitle')}</h2>
            <p className="text-xs text-zinc-500 mt-1">
              Minimum withdrawal: ₹{commissionConfig.minWithdrawalAmount} • Dispatched via IMPS / UPI
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 flex justify-between items-center text-xs">
            <span className="font-semibold text-indigo-900 dark:text-indigo-200">
              {t('availableBalance')}:
            </span>
            <span className="text-xl font-black text-indigo-600 dark:text-indigo-400">
              ₹{availableBalance.toFixed(2)}
            </span>
          </div>

          <form onSubmit={handleWithdrawalSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                {t('withdrawAmount')} *
              </label>
              <input
                type="number"
                min={commissionConfig.minWithdrawalAmount}
                max={availableBalance}
                required
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 font-bold text-base"
              />
            </div>

            <div>
              <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                {t('payoutMethod')}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setWithdrawMethod('upi')}
                  className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-bold ${
                    withdrawMethod === 'upi'
                      ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950 text-indigo-600'
                      : 'border-zinc-200 dark:border-zinc-700'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span>UPI ID</span>
                </button>
                <button
                  type="button"
                  onClick={() => setWithdrawMethod('bank_transfer')}
                  className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-bold ${
                    withdrawMethod === 'bank_transfer'
                      ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950 text-indigo-600'
                      : 'border-zinc-200 dark:border-zinc-700'
                  }`}
                >
                  <Building className="w-4 h-4" />
                  <span>Bank Account</span>
                </button>
              </div>
            </div>

            {withdrawMethod === 'upi' ? (
              <div>
                <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  UPI ID (VPA) *
                </label>
                <input
                  type="text"
                  required
                  value={upiIdInput}
                  onChange={(e) => setUpiIdInput(e.target.value)}
                  placeholder="yourname@okhdfcbank"
                  className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 font-mono"
                />
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                    Bank Account Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={bankAccInput}
                    onChange={(e) => setBankAccInput(e.target.value)}
                    className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                    IFSC Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={bankIfscInput}
                    onChange={(e) => setBankIfscInput(e.target.value)}
                    className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 font-mono uppercase"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={availableBalance < commissionConfig.minWithdrawalAmount}
              className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow-lg shadow-indigo-600/20 transition-all disabled:opacity-50"
            >
              {t('submitWithdrawal')}
            </button>
          </form>
        </div>
      )}

      {/* Tab 6: Withdrawal History */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            {t('payoutHistory')}
          </h2>

          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-zinc-50 dark:bg-zinc-800/60 text-zinc-400 uppercase tracking-wider font-bold border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="p-3">Reference</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Method</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Requested Date</th>
                  <th className="p-3">Admin Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {withdrawals
                  .filter((w) => w.sellerId === currentUser.id)
                  .map((w) => (
                    <tr key={w.id} className="hover:bg-zinc-50/50">
                      <td className="p-3 font-mono font-bold text-indigo-600">{w.id}</td>
                      <td className="p-3 font-black text-zinc-900 dark:text-zinc-50">₹{w.amount}</td>
                      <td className="p-3 uppercase font-medium">{w.method}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            w.status === 'paid'
                              ? 'bg-emerald-100 text-emerald-800'
                              : w.status === 'pending'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {w.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-3 text-zinc-400">{w.requestDate}</td>
                      <td className="p-3 text-zinc-500">{w.adminNotes || '—'}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 7: Author Profile Settings */}
      {activeTab === 'profile' && (
        <div className="max-w-2xl mx-auto bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-black text-zinc-900 dark:text-zinc-50">Creator Profile Settings</h2>
            <p className="text-xs text-zinc-500 mt-1">
              Configure your public Author Name displayed on products, checkout receipts, and creator profile.
            </p>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Public Author / Creator Name *
              </label>
              <input
                type="text"
                required
                value={authorNameInput}
                onChange={(e) => setAuthorNameInput(e.target.value)}
                placeholder="e.g. PixelCraft Studio or Vikram Malhotra"
                className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Bio & Creator Introduction
              </label>
              <textarea
                rows={3}
                value={bioInput}
                onChange={(e) => setBioInput(e.target.value)}
                placeholder="Tell customers about your expertise, design philosophy, and portfolio..."
                className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Default UPI ID
                </label>
                <input
                  type="text"
                  value={upiIdInput}
                  onChange={(e) => setUpiIdInput(e.target.value)}
                  className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Bank IFSC Code
                </label>
                <input
                  type="text"
                  value={bankIfscInput}
                  onChange={(e) => setBankIfscInput(e.target.value)}
                  className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 font-mono uppercase"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all"
            >
              Save Profile Changes
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
