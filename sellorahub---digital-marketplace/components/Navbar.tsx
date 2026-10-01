'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Sparkles,
  Layers,
  ChevronDown,
  LayoutDashboard,
  ShieldCheck,
  Download,
  BookOpen,
  Code,
  Menu,
  X,
  Store,
  Terminal,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    t,
    currentUser,
    switchRole,
    categories,
    cart,
    wishlist,
    setIsCartOpen,
    activeView,
    setActiveView,
    searchQuery,
    setSearchQuery,
    setSelectedCategorySlug,
  } = useApp();

  const [isCatOpen, setIsCatOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const catRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (catRef.current && !catRef.current.contains(e.target as Node)) {
        setIsCatOpen(false);
      }
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    setActiveView('shop');
    setIsMobileMenuOpen(false);
  };

  const handleCategoryClick = (slug: string) => {
    setSelectedCategorySlug(slug);
    setActiveView('shop');
    setIsCatOpen(false);
    setIsMobileMenuOpen(false);
  };

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 transition-colors">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2 flex-wrap">
        <Sparkles className="w-3.5 h-3.5 animate-pulse shrink-0" />
        <span>
          {t('tagline')} — <strong>20% Platform Commission | 80% Direct to Creator</strong>
        </span>
        <div className="inline-flex items-center gap-2 ml-2">
          <button
            onClick={() => setActiveView('setup_guide')}
            className="underline font-semibold hover:text-indigo-100 inline-flex items-center gap-1"
          >
            <Terminal className="w-3 h-3" />
            Deploy to Netlify 🚀
          </button>
          <span className="text-indigo-300">•</span>
          <button
            onClick={() => setActiveView('admin_panel')}
            className="underline font-semibold hover:text-indigo-100 inline-flex items-center gap-1 text-purple-200"
          >
            <ShieldCheck className="w-3 h-3" />
            Admin Panel (Pardeshi)
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3 sm:gap-6">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setActiveView('home');
                setSelectedCategorySlug(null);
                setSearchQuery('');
              }}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <Store className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Sellora<span className="text-zinc-900 dark:text-zinc-100">Hub</span>
                </span>
                <span className="hidden sm:block text-[10px] uppercase font-bold tracking-widest text-zinc-400 dark:text-zinc-500 -mt-1">
                  Digital Marketplace
                </span>
              </div>
            </button>

            {/* Categories Dropdown (Desktop) */}
            <div className="relative hidden md:block" ref={catRef}>
              <button
                onClick={() => setIsCatOpen(!isCatOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              >
                <Layers className="w-4 h-4 text-indigo-500" />
                <span>{t('allCategories')}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isCatOpen ? 'rotate-180' : ''}`} />
              </button>

              {isCatOpen && (
                <div className="absolute left-0 mt-2 w-72 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 p-2 z-50 max-h-[75vh] overflow-y-auto animate-in fade-in zoom-in-95">
                  <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                    {t('browseByCategory')}
                  </div>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryClick(cat.slug)}
                      className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg text-left text-zinc-700 dark:text-zinc-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group"
                    >
                      <span className="font-medium group-hover:translate-x-0.5 transition-transform">
                        {t(`cat_${cat.id.replace('cat-', '').replace(/-/g, '_')}` as any) || cat.name}
                      </span>
                      <span className="text-xs bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full text-zinc-500">
                        {cat.itemCount}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Search Bar (Desktop & Tablet) */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex-1 max-w-lg hidden sm:flex items-center relative"
          >
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full pl-10 pr-20 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 transition-all shadow-inner"
            />
            <button
              type="submit"
              className="absolute right-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
            >
              Search
            </button>
          </form>

          {/* Right Header Navigation & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Creator / Seller Action */}
            {currentUser.role === 'seller' ? (
              <button
                onClick={() => setActiveView('seller_dashboard')}
                className={`hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  activeView === 'seller_dashboard'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>{t('sellerDashboard')}</span>
              </button>
            ) : currentUser.role === 'admin' ? (
              <button
                onClick={() => setActiveView('admin_panel')}
                className={`hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  activeView === 'admin_panel'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 hover:bg-purple-100'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{t('adminPanel')}</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  switchRole('seller');
                  setActiveView('seller_dashboard');
                }}
                className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t('becomeSeller')}</span>
              </button>
            )}

            {/* Wishlist Button */}
            <button
              onClick={() => setActiveView('customer_dashboard')}
              aria-label="Wishlist"
              className="relative p-2.5 rounded-xl text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
            >
              <Heart className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Open Shopping Cart"
              className="relative p-2.5 rounded-xl bg-indigo-50 dark:bg-zinc-900 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[11px] font-bold px-1.5 h-5 min-w-[20px] rounded-full flex items-center justify-center animate-bounce">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* User Profile & Role Switcher Menu */}
            <div className="relative" ref={userRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1.5 pl-2 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-indigo-400 transition-colors"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-lg object-cover ring-1 ring-zinc-300 dark:ring-zinc-700"
                />
                <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 hidden sm:inline-block max-w-[90px] truncate">
                  {currentUser.authorName || currentUser.name}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 p-3 z-50 animate-in fade-in zoom-in-95">
                  {/* User Profile Header */}
                  <div className="flex items-center gap-3 p-2 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl mb-3">
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-10 h-10 rounded-xl object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">
                        {currentUser.authorName || currentUser.name}
                      </p>
                      <p className="text-xs text-zinc-400 truncate">{currentUser.email}</p>
                      <span className="inline-block mt-0.5 px-2 py-0.2 text-[10px] font-bold rounded-md uppercase tracking-wider bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
                        {currentUser.role}
                      </span>
                    </div>
                  </div>

                  {/* Role Switcher (Crucial for testing all requirements) */}
                  <div className="mb-3">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 px-1 mb-1.5">
                      {t('switchRole')}
                    </p>
                    <div className="grid grid-cols-3 gap-1 bg-zinc-100 dark:bg-zinc-800/80 p-1 rounded-xl">
                      <button
                        onClick={() => {
                          switchRole('customer');
                          setIsUserMenuOpen(false);
                          setActiveView('customer_dashboard');
                        }}
                        className={`py-1 text-[11px] font-semibold rounded-lg transition-all ${
                          currentUser.role === 'customer'
                            ? 'bg-white dark:bg-zinc-900 text-indigo-600 shadow-xs font-bold'
                            : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'
                        }`}
                      >
                        Buyer
                      </button>
                      <button
                        onClick={() => {
                          switchRole('seller');
                          setIsUserMenuOpen(false);
                          setActiveView('seller_dashboard');
                        }}
                        className={`py-1 text-[11px] font-semibold rounded-lg transition-all ${
                          currentUser.role === 'seller'
                            ? 'bg-white dark:bg-zinc-900 text-indigo-600 shadow-xs font-bold'
                            : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'
                        }`}
                      >
                        Creator
                      </button>
                      <button
                        onClick={() => {
                          switchRole('admin');
                          setIsUserMenuOpen(false);
                          setActiveView('admin_panel');
                        }}
                        className={`py-1 text-[11px] font-semibold rounded-lg transition-all ${
                          currentUser.role === 'admin'
                            ? 'bg-white dark:bg-zinc-900 text-purple-600 shadow-xs font-bold'
                            : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'
                        }`}
                      >
                        Admin
                      </button>
                    </div>
                  </div>

                  {/* Menu Links */}
                  <div className="space-y-1 text-sm">
                    <button
                      onClick={() => {
                        setActiveView('customer_dashboard');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-left"
                    >
                      <Download className="w-4 h-4 text-indigo-500" />
                      <span>{t('myDownloads')} & {t('myOrders')}</span>
                    </button>
                    <button
                      onClick={() => {
                        setActiveView('seller_dashboard');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-left"
                    >
                      <LayoutDashboard className="w-4 h-4 text-emerald-500" />
                      <span>{t('sellerDashboard')}</span>
                    </button>
                    <button
                      onClick={() => {
                        setActiveView('admin_panel');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-left"
                    >
                      <ShieldCheck className="w-4 h-4 text-purple-500" />
                      <span>{t('adminPanel')}</span>
                    </button>
                    <button
                      onClick={() => {
                        setActiveView('setup_guide');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-left"
                    >
                      <Terminal className="w-4 h-4 text-amber-500" />
                      <span>Supabase & Architecture Guide</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 sm:hidden rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100"
              aria-label="Open mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search input bar */}
        <div className="pb-3 sm:hidden">
          <form onSubmit={handleSearchSubmit} className="flex items-center relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full pl-9 pr-16 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100"
            />
            <button
              type="submit"
              className="absolute right-1 px-2.5 py-1 bg-indigo-600 text-white text-xs font-semibold rounded-lg"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="sm:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 space-y-3 animate-in slide-in-from-top-4">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800">
            <span className="text-xs font-bold text-zinc-400 uppercase">{t('currentRole')}: {currentUser.role}</span>
            <div className="flex gap-1">
              <button
                onClick={() => switchRole('customer')}
                className={`px-2 py-0.5 text-xs rounded ${currentUser.role === 'customer' ? 'bg-indigo-600 text-white' : 'bg-zinc-100'}`}
              >
                Buyer
              </button>
              <button
                onClick={() => switchRole('seller')}
                className={`px-2 py-0.5 text-xs rounded ${currentUser.role === 'seller' ? 'bg-indigo-600 text-white' : 'bg-zinc-100'}`}
              >
                Creator
              </button>
              <button
                onClick={() => switchRole('admin')}
                className={`px-2 py-0.5 text-xs rounded ${currentUser.role === 'admin' ? 'bg-purple-600 text-white' : 'bg-zinc-100'}`}
              >
                Admin
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            <button
              onClick={() => {
                setActiveView('home');
                setIsMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-left"
            >
              Home
            </button>
            <button
              onClick={() => {
                setActiveView('shop');
                setIsMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-left"
            >
              Shop All
            </button>
            <button
              onClick={() => {
                setActiveView('seller_dashboard');
                setIsMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 text-left"
            >
              {t('sellerDashboard')}
            </button>
            <button
              onClick={() => {
                setActiveView('admin_panel');
                setIsMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-lg bg-purple-50 dark:bg-purple-950 text-purple-600 text-left"
            >
              {t('adminPanel')}
            </button>
            <button
              onClick={() => {
                setActiveView('customer_dashboard');
                setIsMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-left"
            >
              {t('myDownloads')}
            </button>
            <button
              onClick={() => {
                setActiveView('setup_guide');
                setIsMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950 text-amber-700 text-left"
            >
              Setup Guide
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
