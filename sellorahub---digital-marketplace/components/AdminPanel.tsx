'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  ShieldCheck,
  PackageCheck,
  Percent,
  CreditCard,
  Layers,
  Users,
  TrendingUp,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Settings,
  Plus,
  Trash2,
  ExternalLink,
  DollarSign,
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Key,
  LogOut,
  User,
  Smartphone,
  Building,
  FileText,
  Sparkles,
  ShieldAlert,
  CloudUpload,
  Copy,
  Check,
  Terminal,
  Globe,
} from 'lucide-react';
import { Product, Withdrawal } from '@/lib/types';

export const AdminPanel: React.FC = () => {
  const {
    t,
    products,
    categories,
    orders,
    withdrawals,
    commissionConfig,
    updateCommissionConfig,
    approveProduct,
    rejectProduct,
    updateWithdrawalStatus,
    setSelectedProduct,
    showToast,
    isAdminAuthenticated,
    adminUser,
    updateAdminProfile,
    loginAdmin,
    logoutAdmin,
  } = useApp();

  // Authentication gate state
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');

  // Active tab inside authorized panel
  const [activeTab, setActiveTab] = useState<
    'moderation' | 'profile' | 'netlify' | 'commission' | 'withdrawals' | 'categories' | 'orders'
  >('moderation');

  // Copy helper for Netlify snippets
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  // Commission input state
  const [commRateInput, setCommRateInput] = useState<number>(
    commissionConfig.platformCommissionPercent
  );
  const [minWithdrawInput, setMinWithdrawInput] = useState<number>(
    commissionConfig.minWithdrawalAmount
  );

  // New Category input state
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');

  // Rejection modal state
  const [rejectingProdId, setRejectingProdId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('Needs higher resolution preview and clearer documentation.');

  // Personal Information space inputs for Admin Pardeshi
  const [personalName, setPersonalName] = useState(adminUser.name || 'Pardeshi');
  const [personalAuthorName, setPersonalAuthorName] = useState(adminUser.authorName || 'Pardeshi (Super Admin & Platform Owner)');
  const [personalEmail, setPersonalEmail] = useState(adminUser.email || 'pardeshi@sellorahub.com');
  const [personalPhone, setPersonalPhone] = useState(adminUser.phone || '+91 98230 19790');
  const [personalBio, setPersonalBio] = useState(adminUser.bio || 'Owner, creator, and chief administrator of SelloraHub digital marketplace platform.');
  const [personalPan, setPersonalPan] = useState(adminUser.panNumber || 'ABCDE1979P');
  const [personalUpi, setPersonalUpi] = useState(adminUser.upiId || 'pardeshi@okhdfcbank');
  const [personalAccountHolder, setPersonalAccountHolder] = useState(adminUser.accountHolderName || 'Pardeshi');
  const [personalBankAcc, setPersonalBankAcc] = useState(adminUser.bankAccountNumber || '50100918237492');
  const [personalBankIfsc, setPersonalBankIfsc] = useState(adminUser.bankIfsc || 'HDFC0001979');
  const [personalBankBranch, setPersonalBankBranch] = useState(adminUser.bankBranch || 'Fort Branch, Mumbai');
  const [personalAddress, setPersonalAddress] = useState(adminUser.address || 'Mumbai, Maharashtra, India');
  const [personalEmergency, setPersonalEmergency] = useState(adminUser.emergencyContact || '+91 98230 19790');
  const [personalPasscode, setPersonalPasscode] = useState(adminUser.adminPassword || 'Raju@1979');

  // Financial aggregates
  const totalGrossRevenue = orders.reduce((sum, o) => sum + o.finalAmount, 0);
  const totalPlatformCommission = (totalGrossRevenue * commissionConfig.platformCommissionPercent) / 100;
  const totalSellerEarnings = totalGrossRevenue - totalPlatformCommission;

  const pendingProducts = products.filter((p) => p.status === 'pending_approval');
  const pendingWithdrawals = withdrawals.filter((w) => w.status === 'pending');
  const completedWithdrawals = withdrawals.filter((w) => w.status === 'paid');

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const success = loginAdmin(usernameInput, passwordInput);
    if (!success) {
      setAuthError('Authentication failed. Only authorized admin (Pardeshi) is allowed.');
    }
  };

  const handleAutofillCredentials = () => {
    setUsernameInput('Pardeshi');
    setPasswordInput(adminUser.adminPassword || 'Raju@1979');
    setAuthError('');
  };

  const handleUpdateCommission = (e: React.FormEvent) => {
    e.preventDefault();
    updateCommissionConfig({
      platformCommissionPercent: commRateInput,
      minWithdrawalAmount: minWithdrawInput,
    });
  };

  const handleConfirmReject = () => {
    if (rejectingProdId) {
      rejectProduct(rejectingProdId, rejectReason);
      setRejectingProdId(null);
    }
  };

  const handleSavePersonalInfo = (e: React.FormEvent) => {
    e.preventDefault();
    updateAdminProfile({
      name: personalName,
      authorName: personalAuthorName,
      email: personalEmail,
      phone: personalPhone,
      bio: personalBio,
      panNumber: personalPan,
      upiId: personalUpi,
      accountHolderName: personalAccountHolder,
      bankAccountNumber: personalBankAcc,
      bankIfsc: personalBankIfsc,
      bankBranch: personalBankBranch,
      address: personalAddress,
      emergencyContact: personalEmergency,
      adminPassword: personalPasscode,
    });
  };

  const copyToClipboard = (text: string, id: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedSnippet(id);
      showToast('Copied to clipboard! 📋', 'success');
      setTimeout(() => setCopiedSnippet(null), 2500);
    }
  };

  // If not authenticated as Admin Pardeshi, display restricted login gate
  if (!isAdminAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 animate-in fade-in duration-300">
        <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-purple-800 text-white flex items-center justify-center mx-auto shadow-lg shadow-purple-600/30">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <span className="text-[11px] font-black uppercase tracking-widest text-purple-600 bg-purple-50 dark:bg-purple-950/80 px-3 py-1 rounded-full">
              Restricted Area
            </span>
            <h1 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 mt-2">
              Admin Authentication
            </h1>
            <p className="text-xs text-zinc-500 mt-1">
              Access is restricted exclusively to Platform Owner &amp; Super Admin (<strong>Pardeshi</strong>).
            </p>
          </div>

          {authError && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2 text-left">
              <ShieldAlert className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4 text-xs text-left">
            <div>
              <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Admin Username *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-zinc-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  placeholder="Username (e.g. Pardeshi)"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Admin Security Password *
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-zinc-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Security Password"
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-mono focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black text-sm shadow-lg shadow-purple-600/25 transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Authenticate as Admin Pardeshi</span>
            </button>
          </form>

          {/* Authorized Credentials Display & Autofill */}
          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 text-center space-y-2">
            <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-[11px] text-zinc-600 dark:text-zinc-300">
              <span className="font-bold text-purple-700 dark:text-purple-300 block mb-0.5">Authorized Credentials:</span>
              <span>Username: <code className="font-bold font-mono text-zinc-900 dark:text-white">Pardeshi</code></span>
              <span className="mx-2">•</span>
              <span>Password: <code className="font-bold font-mono text-zinc-900 dark:text-white">Raju@1979</code></span>
            </div>
            <button
              type="button"
              onClick={handleAutofillCredentials}
              className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Autofill Authorized Admin Credentials</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard view
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Admin Top Header with Owner Info & Logout */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-zinc-200 dark:border-zinc-800 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 dark:bg-purple-950 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Platform Owner: {adminUser.name}</span>
            </span>
            <span className="text-xs text-zinc-400">
              Platform Cut: {commissionConfig.platformCommissionPercent}% | Creator Cut: {commissionConfig.sellerCommissionPercent}%
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-50">
            {t('adminDashboardTitle')}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">
            Logged in as <strong>{adminUser.authorName}</strong> ({adminUser.email}).
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('profile')}
            className="px-3.5 py-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 hover:bg-purple-100 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <User className="w-3.5 h-3.5" />
            <span>Personal Information Spaces</span>
          </button>
          <button
            onClick={logoutAdmin}
            className="px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 text-zinc-700 dark:text-zinc-300 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Lock Admin</span>
          </button>
        </div>
      </div>

      {/* Admin Statistics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mb-8">
        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
          <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">{t('totalRevenue')}</p>
          <p className="text-2xl font-black text-zinc-900 dark:text-zinc-50 mt-1">₹{totalGrossRevenue.toFixed(0)}</p>
          <span className="text-[10px] text-zinc-400">Gross GMV</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
          <p className="text-[11px] font-bold text-purple-600 uppercase tracking-wider">{t('adminCommissionEarned')}</p>
          <p className="text-2xl font-black text-purple-600 dark:text-purple-400 mt-1">₹{totalPlatformCommission.toFixed(0)}</p>
          <span className="text-[10px] text-purple-500">{commissionConfig.platformCommissionPercent}% Platform cut</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">{t('sellerEarningsPaid')}</p>
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">₹{totalSellerEarnings.toFixed(0)}</p>
          <span className="text-[10px] text-emerald-500">{commissionConfig.sellerCommissionPercent}% Creator share</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
          <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">{t('totalOrders')}</p>
          <p className="text-2xl font-black text-zinc-900 dark:text-zinc-50 mt-1">{orders.length}</p>
          <span className="text-[10px] text-zinc-400">Paid purchases</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
          <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">{t('totalProducts')}</p>
          <p className="text-2xl font-black text-zinc-900 dark:text-zinc-50 mt-1">{products.length}</p>
          <span className="text-[10px] text-zinc-400">{products.filter((p) => p.status === 'published').length} Live</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
          <p className="text-[11px] font-bold text-amber-500 uppercase tracking-wider">{t('pendingWithdrawals')}</p>
          <p className="text-2xl font-black text-amber-500 mt-1">{pendingWithdrawals.length}</p>
          <span className="text-[10px] text-zinc-400">{completedWithdrawals.length} Dispatched</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-zinc-200 dark:border-zinc-800 mb-8 text-xs font-bold">
        {[
          { id: 'moderation', label: `${t('pendingModeration')} (${pendingProducts.length})`, icon: <PackageCheck className="w-4 h-4" /> },
          { id: 'profile', label: 'Admin Personal Information Spaces', icon: <User className="w-4 h-4 text-purple-500" /> },
          { id: 'netlify', label: 'Deploy to Netlify 🚀', icon: <CloudUpload className="w-4 h-4 text-emerald-500" /> },
          { id: 'commission', label: t('commissionSettingsTitle'), icon: <Percent className="w-4 h-4" /> },
          { id: 'withdrawals', label: `${t('pendingWithdrawals')} (${pendingWithdrawals.length})`, icon: <CreditCard className="w-4 h-4" /> },
          { id: 'categories', label: t('categoriesManager'), icon: <Layers className="w-4 h-4" /> },
          { id: 'orders', label: `Marketplace Orders (${orders.length})`, icon: <TrendingUp className="w-4 h-4" /> },
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

      {/* Tab: Admin Personal Information Spaces */}
      {activeTab === 'profile' && (
        <div className="max-w-3xl mx-auto bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6 text-xs">
          <div className="border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 dark:bg-purple-950 px-2.5 py-0.5 rounded-full">
              Super Admin Profile
            </span>
            <h2 className="text-xl font-black text-zinc-900 dark:text-zinc-50 mt-1">
              Admin Personal Information Spaces (Pardeshi)
            </h2>
            <p className="text-zinc-500 text-xs mt-1">
              Official personal details, payout deposit spaces, identity credentials, and security passcode for the platform administrator.
            </p>
          </div>

          <form onSubmit={handleSavePersonalInfo} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Full Legal Name *
                </label>
                <input
                  type="text"
                  required
                  value={personalName}
                  onChange={(e) => setPersonalName(e.target.value)}
                  className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 font-bold text-zinc-900 dark:text-zinc-100"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Administrator Display Role *
                </label>
                <input
                  type="text"
                  required
                  value={personalAuthorName}
                  onChange={(e) => setPersonalAuthorName(e.target.value)}
                  className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Official Admin Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={personalEmail}
                  onChange={(e) => setPersonalEmail(e.target.value)}
                  className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Admin Mobile / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  value={personalPhone}
                  onChange={(e) => setPersonalPhone(e.target.value)}
                  className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Admin Bio / Platform Mission Statement Space
              </label>
              <textarea
                rows={2}
                value={personalBio}
                onChange={(e) => setPersonalBio(e.target.value)}
                placeholder="Chief administrator and platform owner bio..."
                className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
              />
            </div>

            {/* Payout & Revenue Deposit Spaces */}
            <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/40 space-y-4">
              <h3 className="font-black text-xs text-purple-900 dark:text-purple-200 uppercase tracking-wider flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-purple-600" />
                <span>Platform Commission (20%) Deposit Spaces</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                    Primary UPI ID (VPA)
                  </label>
                  <input
                    type="text"
                    value={personalUpi}
                    onChange={(e) => setPersonalUpi(e.target.value)}
                    placeholder="pardeshi@okhdfcbank"
                    className="w-full p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                    Account Holder Legal Name
                  </label>
                  <input
                    type="text"
                    value={personalAccountHolder}
                    onChange={(e) => setPersonalAccountHolder(e.target.value)}
                    placeholder="Pardeshi"
                    className="w-full p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 font-semibold text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                    Bank Account Number
                  </label>
                  <input
                    type="text"
                    value={personalBankAcc}
                    onChange={(e) => setPersonalBankAcc(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                    Bank IFSC Code
                  </label>
                  <input
                    type="text"
                    value={personalBankIfsc}
                    onChange={(e) => setPersonalBankIfsc(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 font-mono uppercase text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                    Bank Branch Name
                  </label>
                  <input
                    type="text"
                    value={personalBankBranch}
                    onChange={(e) => setPersonalBankBranch(e.target.value)}
                    placeholder="Fort Branch, Mumbai"
                    className="w-full p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Identity & Office Spaces */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Tax / Identity Number (PAN / GSTIN / Aadhaar)
                </label>
                <input
                  type="text"
                  value={personalPan}
                  onChange={(e) => setPersonalPan(e.target.value)}
                  placeholder="e.g. ABCDE1979P"
                  className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 font-mono uppercase"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Emergency / Secondary Contact
                </label>
                <input
                  type="text"
                  value={personalEmergency}
                  onChange={(e) => setPersonalEmergency(e.target.value)}
                  className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Office / Operational Address Space
              </label>
              <textarea
                rows={2}
                value={personalAddress}
                onChange={(e) => setPersonalAddress(e.target.value)}
                placeholder="Business registration address"
                className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800"
              />
            </div>

            {/* Security Passcode changer space */}
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 space-y-2">
              <label className="block font-bold text-zinc-700 dark:text-zinc-300">
                Admin Security Password (Passcode)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={personalPasscode}
                  onChange={(e) => setPersonalPasscode(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 font-mono font-bold text-xs"
                />
              </div>
              <p className="text-[11px] text-zinc-400">
                Current authorization password for username <strong>Pardeshi</strong>. Default: <code className="text-purple-600 font-bold">Raju@1979</code>.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-black text-sm shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Save Personal Information Spaces</span>
            </button>
          </form>
        </div>
      )}

      {/* Tab: Deploy to Netlify 🚀 */}
      {activeTab === 'netlify' && (
        <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 w-fit">
                <CloudUpload className="w-3.5 h-3.5" />
                <span>Netlify Deployment Center</span>
              </span>
              <h2 className="text-xl font-black text-zinc-900 dark:text-zinc-50 mt-1">
                Deploy SelloraHub to Netlify
              </h2>
              <p className="text-zinc-500 text-xs mt-0.5">
                Complete, automated configuration for deploying your marketplace directly to Netlify CDN.
              </p>
            </div>

            <a
              href="https://app.netlify.com/start"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs shadow-md shadow-emerald-600/20 flex items-center gap-2 self-start sm:self-auto transition-transform active:scale-95"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Open Netlify &amp; Deploy Now</span>
            </a>
          </div>

          {/* Configuration Health Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 space-y-1">
              <span className="text-[10px] font-bold uppercase text-zinc-400">Config File</span>
              <div className="flex items-center gap-1.5 font-bold text-zinc-900 dark:text-zinc-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="font-mono text-xs">netlify.toml</span>
              </div>
              <p className="text-[10px] text-emerald-600 dark:text-emerald-400">Pre-configured &amp; Verified</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 space-y-1">
              <span className="text-[10px] font-bold uppercase text-zinc-400">Next.js Plugin</span>
              <div className="flex items-center gap-1.5 font-bold text-zinc-900 dark:text-zinc-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-xs">@netlify/plugin-nextjs</span>
              </div>
              <p className="text-[10px] text-emerald-600 dark:text-emerald-400">Installed in package.json</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 space-y-1">
              <span className="text-[10px] font-bold uppercase text-zinc-400">Build Command</span>
              <div className="flex items-center gap-1.5 font-bold text-zinc-900 dark:text-zinc-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="font-mono text-xs">npm run build</span>
              </div>
              <p className="text-[10px] text-zinc-400">Publish: .next</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 space-y-1">
              <span className="text-[10px] font-bold uppercase text-zinc-400">Node Runtime</span>
              <div className="flex items-center gap-1.5 font-bold text-zinc-900 dark:text-zinc-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-xs">Node.js 20 LTS</span>
              </div>
              <p className="text-[10px] text-zinc-400">App Router Ready</p>
            </div>
          </div>

          {/* Deployment Method A: GitHub to Netlify (Recommended) */}
          <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/80 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <Globe className="w-4 h-4 text-indigo-500" />
                <span>Method 1: Connect GitHub to Netlify (Continuous Deployment)</span>
              </h3>
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 rounded-md">
                Recommended
              </span>
            </div>

            <ol className="list-decimal list-inside space-y-2 text-zinc-600 dark:text-zinc-300 leading-relaxed">
              <li>
                <strong>Push this repository to GitHub:</strong>
                <div className="mt-1 relative">
                  <pre className="p-3 rounded-xl bg-zinc-950 text-zinc-200 font-mono text-[11px] overflow-x-auto">
{`git init
git add .
git commit -m "Deploy SelloraHub on Netlify"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/sellorahub.git
git push -u origin main`}
                  </pre>
                  <button
                    onClick={() => copyToClipboard(`git init\ngit add .\ngit commit -m "Deploy SelloraHub on Netlify"\ngit branch -M main\ngit remote add origin https://github.com/YOUR_USERNAME/sellorahub.git\ngit push -u origin main`, 'git-commands')}
                    className="absolute right-2 top-2 p-1.5 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white"
                    title="Copy Git Commands"
                  >
                    {copiedSnippet === 'git-commands' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </li>
              <li>
                Visit <a href="https://app.netlify.com/start" target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-bold underline">Netlify Dashboard &rarr; Add new site</a> &rarr; <strong>Import an existing project</strong>.
              </li>
              <li>
                Select <strong>GitHub</strong> and choose your repository.
              </li>
              <li>
                Netlify will automatically detect <code className="font-mono text-purple-600 font-bold">netlify.toml</code> and fill the build parameters.
              </li>
              <li>
                Click <strong>Deploy SelloraHub</strong>. Netlify will build and provide your live URL (e.g. <code className="font-mono text-emerald-600">sellorahub.netlify.app</code>).
              </li>
            </ol>
          </div>

          {/* Deployment Method B: Netlify CLI Terminal */}
          <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/80 space-y-3">
            <h3 className="text-sm font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-500" />
              <span>Method 2: Direct CLI Deployment from Your Terminal</span>
            </h3>

            <div className="relative">
              <pre className="p-3 rounded-xl bg-zinc-950 text-zinc-200 font-mono text-[11px] overflow-x-auto leading-relaxed">
{`# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Login to your Netlify account
netlify login

# 3. Build & Deploy to production immediately
netlify deploy --build --prod`}
              </pre>
              <button
                onClick={() => copyToClipboard(`npm install -g netlify-cli\nnetlify login\nnetlify deploy --build --prod`, 'cli-commands')}
                className="absolute right-2 top-2 p-1.5 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white"
                title="Copy CLI Commands"
              >
                {copiedSnippet === 'cli-commands' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* View netlify.toml */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-xs text-zinc-700 dark:text-zinc-300">
                Included <code className="font-mono text-purple-600">netlify.toml</code> File in Your Project:
              </h4>
              <button
                onClick={() => copyToClipboard(`[build]\n  command = "npm run build"\n  publish = ".next"\n\n[build.environment]\n  NODE_VERSION = "20"\n  NEXT_USE_NETLIFY_EDGE = "false"\n\n[[plugins]]\n  package = "@netlify/plugin-nextjs"\n\n[[headers]]\n  for = "/*"\n  [headers.values]\n    X-Frame-Options = "SAMEORIGIN"\n    X-Content-Type-Options = "nosniff"\n    X-XSS-Protection = "1; mode=block"\n    Referrer-Policy = "strict-origin-when-cross-origin"\n\n[[headers]]\n  for = "/_next/static/*"\n  [headers.values]\n    cache-control = "public, max-age=31536000, immutable"`, 'toml-code')}
                className="px-2.5 py-1 rounded-lg bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 text-zinc-700 dark:text-zinc-300 font-bold text-[11px] flex items-center gap-1"
              >
                {copiedSnippet === 'toml-code' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                <span>Copy netlify.toml</span>
              </button>
            </div>
            <pre className="p-3.5 rounded-2xl bg-zinc-950 text-zinc-200 font-mono text-[11px] overflow-x-auto leading-relaxed border border-zinc-800">
{`[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "20"
  NEXT_USE_NETLIFY_EDGE = "false"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/_next/static/*"
  [headers.values]
    cache-control = "public, max-age=31536000, immutable"`}
            </pre>
          </div>
        </div>
      )}

      {/* Tab: Moderation Queue */}
      {activeTab === 'moderation' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Product Review &amp; Approval Queue
            </h2>
            <span className="text-xs text-zinc-400">
              {pendingProducts.length} pending • {products.filter((p) => p.status === 'published').length} approved
            </span>
          </div>

          {pendingProducts.length === 0 ? (
            <div className="text-center py-16 p-8 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800 space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
              <h3 className="font-bold text-sm text-zinc-800 dark:text-zinc-200">
                Moderation Queue Clear!
              </h3>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                All author product uploads have been reviewed. New submissions from creators will automatically appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <img
                      src={prod.thumbnail}
                      alt={prod.title}
                      className="w-20 h-20 rounded-xl object-cover shrink-0"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded">
                          {prod.categoryName}
                        </span>
                        <span className="text-xs text-zinc-400">
                          Uploaded: {prod.createdAt}
                        </span>
                      </div>
                      <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                        {prod.title}
                      </h3>
                      <p className="text-xs text-zinc-500">
                        Creator: <strong className="text-zinc-700 dark:text-zinc-300">{prod.authorName}</strong> • Price: <strong className="text-zinc-900 dark:text-zinc-100">₹{prod.price}</strong>
                      </p>
                      <p className="text-[11px] text-zinc-400 line-clamp-1">{prod.shortDescription}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                    <button
                      onClick={() => setSelectedProduct(prod)}
                      className="px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 text-zinc-700 dark:text-zinc-300 text-xs font-semibold flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Review</span>
                    </button>
                    <button
                      onClick={() => setRejectingProdId(prod.id)}
                      className="px-3.5 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 hover:bg-rose-100 text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>{t('rejectBtn')}</span>
                    </button>
                    <button
                      onClick={() => approveProduct(prod.id)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{t('approveBtn')}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* All published products listing */}
          <div className="pt-8">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-3">
              Published Store Products ({products.filter((p) => p.status === 'published').length})
            </h3>
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-zinc-50 dark:bg-zinc-800/60 text-zinc-400 uppercase tracking-wider font-bold">
                  <tr>
                    <th className="p-3">Product</th>
                    <th className="p-3">Creator</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {products
                    .filter((p) => p.status === 'published')
                    .map((p) => (
                      <tr key={p.id} className="hover:bg-zinc-50/50">
                        <td className="p-3 font-semibold text-zinc-800 dark:text-zinc-200 max-w-[220px] truncate">
                          {p.title}
                        </td>
                        <td className="p-3 text-zinc-500">{p.authorName}</td>
                        <td className="p-3 font-bold">₹{p.price}</td>
                        <td className="p-3 text-zinc-500">{p.categoryName}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            PUBLISHED
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => setSelectedProduct(p)}
                            className="text-indigo-600 hover:underline font-bold"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Commission Settings */}
      {activeTab === 'commission' && (
        <div className="max-w-xl mx-auto bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-black text-zinc-900 dark:text-zinc-50">
              {t('commissionSettingsTitle')}
            </h2>
            <p className="text-xs text-zinc-500 mt-1">
              Adjust the platform percentage fee taken on each digital product transaction. The remaining percentage is automatically credited to the creator.
            </p>
          </div>

          <form onSubmit={handleUpdateCommission} className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 space-y-2">
              <label className="block font-bold text-zinc-700 dark:text-zinc-300">
                {t('currentCommission')} (%) *
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min={0}
                  max={50}
                  required
                  value={commRateInput}
                  onChange={(e) => setCommRateInput(Number(e.target.value))}
                  className="w-24 p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 font-bold text-lg text-center"
                />
                <span className="text-sm font-bold text-zinc-500">% Platform cut</span>
              </div>
              <p className="text-[11px] text-zinc-400">
                Creator receives: <strong className="text-emerald-600">{100 - commRateInput}%</strong> of every sale.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 space-y-2">
              <label className="block font-bold text-zinc-700 dark:text-zinc-300">
                Minimum Withdrawal Threshold (₹) *
              </label>
              <input
                type="number"
                min={100}
                required
                value={minWithdrawInput}
                onChange={(e) => setMinWithdrawInput(Number(e.target.value))}
                className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 font-bold text-base"
              />
              <p className="text-[11px] text-zinc-400">
                Creators cannot request payouts lower than this threshold.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-colors"
            >
              {t('updateCommission')}
            </button>
          </form>
        </div>
      )}

      {/* Tab: Withdrawal Requests Management */}
      {activeTab === 'withdrawals' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Creator Payout Requests Management
            </h2>
          </div>

          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-zinc-50 dark:bg-zinc-800/60 text-zinc-400 uppercase tracking-wider font-bold">
                <tr>
                  <th className="p-3">Ref ID</th>
                  <th className="p-3">Creator Name</th>
                  <th className="p-3">Amount (₹)</th>
                  <th className="p-3">Method &amp; Account</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Date</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {withdrawals.map((w) => (
                  <tr key={w.id} className="hover:bg-zinc-50/50">
                    <td className="p-3 font-mono font-bold text-indigo-600">{w.id}</td>
                    <td className="p-3 font-semibold text-zinc-800 dark:text-zinc-200">{w.sellerName}</td>
                    <td className="p-3 font-black text-zinc-900 dark:text-zinc-50">₹{w.amount}</td>
                    <td className="p-3">
                      <span className="font-mono text-zinc-600 dark:text-zinc-400">
                        {w.upiId || w.bankDetails?.accountNumber || 'UPI / IMPS'}
                      </span>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
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
                    <td className="p-3 text-right">
                      {w.status === 'pending' && (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => updateWithdrawalStatus(w.id, 'paid', 'Dispatched via UPI')}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold"
                          >
                            Mark Paid
                          </button>
                          <button
                            onClick={() => updateWithdrawalStatus(w.id, 'rejected', 'Invalid UPI ID')}
                            className="px-2.5 py-1 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg font-bold"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Categories Manager */}
      {activeTab === 'categories' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Manage Digital Categories ({categories.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((c) => (
              <div
                key={c.id}
                className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs flex justify-between items-start"
              >
                <div>
                  <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">{c.name}</h4>
                  <p className="text-zinc-500 mt-1 line-clamp-2">{c.description}</p>
                  <span className="inline-block mt-2 text-[10px] font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded">
                    Slug: /{c.slug}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            Marketplace All Orders Log ({orders.length})
          </h2>

          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-zinc-50 dark:bg-zinc-800/60 text-zinc-400 uppercase tracking-wider font-bold">
                <tr>
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Items Count</th>
                  <th className="p-3">Gross (₹)</th>
                  <th className="p-3">Platform Cut</th>
                  <th className="p-3">Payment Method</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-zinc-50/50">
                    <td className="p-3 font-mono font-bold text-indigo-600">{ord.id}</td>
                    <td className="p-3">{ord.customerName}</td>
                    <td className="p-3">{ord.items.length} file(s)</td>
                    <td className="p-3 font-black">₹{ord.finalAmount}</td>
                    <td className="p-3 text-purple-600 font-bold">
                      ₹{((ord.finalAmount * commissionConfig.platformCommissionPercent) / 100).toFixed(0)}
                    </td>
                    <td className="p-3 uppercase font-medium">{ord.paymentMethod}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        SUCCESS
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Rejection Reason Modal */}
      {rejectingProdId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl max-w-md w-full border border-zinc-200 dark:border-zinc-800 space-y-4">
            <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">
              {t('rejectionReasonPrompt')}
            </h3>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows={3}
              className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs bg-zinc-50 dark:bg-zinc-800"
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setRejectingProdId(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold border border-zinc-200 dark:border-zinc-700"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReject}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 text-white"
              >
                Confirm Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
