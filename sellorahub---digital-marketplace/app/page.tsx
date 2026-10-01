'use client';

import React from 'react';
import { AppProvider, useApp } from '@/context/AppContext';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { CategoryGrid } from '@/components/CategoryGrid';
import { ProductCard } from '@/components/ProductCard';
import { ProductDetailModal } from '@/components/ProductDetailModal';
import { CartDrawer } from '@/components/CartDrawer';
import { CheckoutModal } from '@/components/CheckoutModal';
import { ToastContainer } from '@/components/ToastContainer';
import { SellerDashboard } from '@/components/SellerDashboard';
import { CustomerDashboard } from '@/components/CustomerDashboard';
import { AdminPanel } from '@/components/AdminPanel';
import { AuthorProfileModal } from '@/components/AuthorProfileModal';
import { ShopView } from '@/components/ShopView';
import { InformationalPages } from '@/components/InformationalPages';
import { SetupGuideModal } from '@/components/SetupGuideModal';
import { Footer } from '@/components/Footer';
import {
  Sparkles,
  ArrowRight,
  Star,
  CheckCircle2,
  TrendingUp,
  Award,
  Zap,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { DEMO_AUTHORS } from '@/lib/demo-data';

function MainContent() {
  const {
    activeView,
    setActiveView,
    products,
    t,
    setSelectedAuthor,
    setSelectedCategorySlug,
    switchRole,
  } = useApp();

  // Published products for marketplace display
  const publishedProducts = products.filter((p) => p.status === 'published');
  const featuredProducts = publishedProducts.filter((p) => p.isFeatured).slice(0, 4);
  const popularProducts = [...publishedProducts].sort((a, b) => b.salesCount - a.salesCount).slice(0, 8);
  const newReleases = [...publishedProducts]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors">
      <Navbar />

      <main className="flex-1">
        {/* Route switcher based on activeView */}
        {activeView === 'home' && (
          <>
            {/* Hero Section */}
            <HeroSection />

            {/* 15 Digital Categories */}
            <CategoryGrid />

            {/* Featured Products */}
            <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    Handpicked Assets
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                    {t('featuredProducts')}
                  </h2>
                </div>
                <button
                  onClick={() => setActiveView('shop')}
                  className="inline-flex items-center gap-1 text-sm font-bold text-indigo-600 hover:text-indigo-700 group self-start sm:self-auto"
                >
                  <span>{t('exploreProducts')}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>

            {/* Special Creator Offers Banner */}
            <section className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white p-8 sm:p-12 shadow-xl">
                <div className="relative z-10 max-w-2xl space-y-4">
                  <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider">
                    {t('specialOffers')}
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-black leading-tight">
                    Use Coupon Code <span className="text-amber-300 font-mono">SELLORA20</span> for 20% OFF
                  </h3>
                  <p className="text-xs sm:text-sm text-indigo-200">
                    Get extra discounts on all eBooks, Canva bundles, Notion life workspaces, and Next.js SaaS starter kits. Instant delivery in ₹ INR.
                  </p>
                  <button
                    onClick={() => setActiveView('shop')}
                    className="px-6 py-3 bg-white text-indigo-900 font-bold text-xs rounded-xl shadow-lg hover:bg-indigo-50 transition-all flex items-center gap-2"
                  >
                    <span>Claim Your Discount</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>

            {/* Popular & Trending Products */}
            <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 mb-2">
                    <TrendingUp className="w-3.5 h-3.5" />
                    Top Sellers
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                    {t('popularProducts')}
                  </h2>
                </div>
                <button
                  onClick={() => setActiveView('shop')}
                  className="inline-flex items-center gap-1 text-sm font-bold text-indigo-600 hover:text-indigo-700 group self-start sm:self-auto"
                >
                  <span>View All Bestsellers</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {popularProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>

            {/* Top Verified Authors / Creators */}
            <section className="py-14 bg-zinc-50/60 dark:bg-zinc-900/40 border-y border-zinc-200/60 dark:border-zinc-800/60">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-10">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 mb-2">
                    <Award className="w-3.5 h-3.5" />
                    {t('topAuthors')}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                    Meet Our Premier Indian & Global Creators
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-500 mt-2">
                    Every author is manually verified for high asset quality, commercial originality, and customer support.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {DEMO_AUTHORS.slice(0, 3).map((author) => {
                    const authorProds = publishedProducts.filter(
                      (p) => p.authorId === author.id || p.authorName === author.authorName
                    );
                    return (
                      <div
                        key={author.id}
                        className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center gap-3.5 mb-3">
                            <img
                              src={author.avatar}
                              alt={author.authorName || author.name}
                              className="w-14 h-14 rounded-2xl object-cover ring-2 ring-indigo-500/20"
                            />
                            <div>
                              <div className="flex items-center gap-1.5">
                                <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-50">
                                  {author.authorName || author.name}
                                </h3>
                                <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                              </div>
                              <span className="text-xs text-zinc-400 font-medium">
                                Real: {author.name}
                              </span>
                            </div>
                          </div>
                          <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-4 leading-relaxed">
                            {author.bio}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                          <span className="text-xs text-zinc-500 font-semibold">
                            {authorProds.length} Published Assets
                          </span>
                          <button
                            onClick={() => {
                              setSelectedAuthor(author);
                              setActiveView('author_detail');
                            }}
                            className="px-3.5 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 text-xs font-bold transition-colors"
                          >
                            View Store →
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Why Creators & Buyers Choose SelloraHub */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
                  {t('whySelloraHub')}
                </h2>
                <p className="text-xs sm:text-sm text-zinc-500">
                  {t('creatorPitch')}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-50">
                    Instant Download Guarantee
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    No waiting for email attachments. Immediately upon successful UPI or card authorization, your files, Notion links, and commercial licenses appear in your account.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-50">
                    80% Direct Creator Earnings
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    Sellers keep 80% of every rupee transacted. With zero listing fees, fair platform policies, and payouts directly to Indian UPI VPAs and bank accounts.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-50">
                    Multilingual Inclusivity
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    Seamlessly switch between English, Hindi (हिंदी), and Marathi (मराठी) with a single click. Designed to celebrate regional content creators and entrepreneurs.
                  </p>
                </div>
              </div>
            </section>

            {/* Customer Testimonials */}
            <section className="py-14 bg-zinc-50/60 dark:bg-zinc-900/40 border-t border-zinc-200/60 dark:border-zinc-800/60">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-xl mx-auto mb-10">
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                    {t('customerReviewsHeading')}
                  </h2>
                  <p className="text-xs text-zinc-500 mt-1">Verified reviews from builders and entrepreneurs across India</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
                  <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-3">
                    <div className="flex text-amber-500">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-300 italic leading-relaxed">
                      &ldquo;Purchased the 500+ Canva festival templates for my digital agency. The Hindi &amp; English posts saved us hours during Diwali and Ganesh Chaturthi!&rdquo;
                    </p>
                    <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
                      <p className="font-bold text-zinc-900 dark:text-zinc-100">Aditi Rao</p>
                      <p className="text-[11px] text-zinc-400">Marketing Agency Owner, Pune</p>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-3">
                    <div className="flex text-amber-500">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-300 italic leading-relaxed">
                      &ldquo;मराठी फॉन्ट्सचे बंडल अप्रतिम आहे. लग्नपत्रिका आणि बॅनर डिझाइनसाठी मला खूप मदत झाली. डाउनलोड देखील क्षणात झाले!&rdquo;
                    </p>
                    <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
                      <p className="font-bold text-zinc-900 dark:text-zinc-100">Mangesh Patil</p>
                      <p className="text-[11px] text-zinc-400">Graphic Designer, Kolhapur</p>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-3">
                    <div className="flex text-amber-500">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-300 italic leading-relaxed">
                      &ldquo;The Next.js 15 + Supabase SaaS kit saved me 3 weeks of boilerplate code. The Razorpay webhook integration is rock solid.&rdquo;
                    </p>
                    <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
                      <p className="font-bold text-zinc-900 dark:text-zinc-100">Siddharth Nair</p>
                      <p className="text-[11px] text-zinc-400">Indie Hacker, Bengaluru</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* Other Page Views */}
        {activeView === 'shop' && <ShopView />}
        {activeView === 'seller_dashboard' && <SellerDashboard />}
        {activeView === 'customer_dashboard' && <CustomerDashboard />}
        {activeView === 'admin_panel' && <AdminPanel />}
        {activeView === 'author_detail' && <AuthorProfileModal />}
        {activeView === 'setup_guide' && <SetupGuideModal />}
        {['about', 'contact', 'faq', 'terms', 'privacy', 'refund', 'seller_terms', 'dmca', 'commission_policy'].includes(activeView) && (
          <InformationalPages />
        )}
      </main>

      {/* Persistent Modals & Drawers */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <ToastContainer />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function Page() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
