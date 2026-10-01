'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Search, Sparkles, ShieldCheck, Zap, Users, ArrowRight, CheckCircle2 } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { t, setSearchQuery, setActiveView, switchRole } = useApp();
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchQuery(searchInput);
      setActiveView('shop');
    }
  };

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
    setActiveView('shop');
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-indigo-50/70 via-white to-white dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 pt-8 pb-16 sm:pt-16 sm:pb-20 border-b border-zinc-200/60 dark:border-zinc-800/60">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-indigo-400/10 via-purple-400/10 to-transparent blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Creator Guarantee pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100/80 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-300 text-xs sm:text-sm font-semibold mb-6 shadow-xs animate-in fade-in zoom-in-95">
          <Sparkles className="w-4 h-4 text-indigo-600 animate-spin" style={{ animationDuration: '6s' }} />
          <span>{t('tagline')}</span>
          <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-indigo-500" />
          <span className="hidden sm:inline-block text-xs font-normal">80% Creator Payout • 20% Platform Fee</span>
        </div>

        {/* Hero Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight leading-tight sm:leading-none mb-6">
          {t('heroTitle')}
        </h1>

        {/* Hero Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-zinc-600 dark:text-zinc-300 font-normal leading-relaxed mb-8">
          {t('heroSubtitle')}
        </p>

        {/* Big Search Bar */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-5 relative group">
          <div className="relative flex items-center shadow-xl shadow-indigo-500/5 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-indigo-500/20 group-hover:border-indigo-500 focus-within:border-indigo-600 transition-all p-1.5">
            <Search className="w-5 h-5 text-indigo-500 ml-3 shrink-0" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full px-3 py-3 text-sm sm:text-base bg-transparent text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none"
            />
            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-sm shadow-md transition-all shrink-0"
            >
              Search
            </button>
          </div>
        </form>

        {/* Popular Search Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-xl mx-auto text-xs mb-10">
          <span className="text-zinc-400 font-medium">Trending:</span>
          {['Canva', 'Marathi Fonts', 'Next.js SaaS', 'Freelancing eBook', 'Reels Hooks', 'Financial Model'].map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950 transition-colors font-medium"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-12">
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveView('shop');
            }}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold text-sm hover:scale-[1.02] shadow-lg transition-transform flex items-center justify-center gap-2"
          >
            <span>{t('exploreProducts')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              switchRole('seller');
              setActiveView('seller_dashboard');
            }}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{t('startSelling')}</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-zinc-200/80 dark:border-zinc-800 text-left">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{t('instantDownloadBadge')}</p>
              <p className="text-[11px] text-zinc-500">Direct file access & license key right after payment</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{t('trustedCreatorsBadge')}</p>
              <p className="text-[11px] text-zinc-500">Verified Indian and international authors</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{t('safePaymentsBadge')}</p>
              <p className="text-[11px] text-zinc-500">Razorpay, UPI, Netbanking & Cards in ₹ INR</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
