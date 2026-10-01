'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Store, ShieldCheck, Heart, Sparkles, Terminal } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, setActiveView, setSelectedCategorySlug, categories, switchRole } = useApp();

  return (
    <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-800 text-xs transition-colors">
      {/* Top Banner inside Footer */}
      <div className="border-b border-zinc-900 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-3xl bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-zinc-900 border border-indigo-900/40">
            <div className="text-center md:text-left space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Earn 80% on Every Sale</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white">
                Are you a creator, developer or designer?
              </h3>
              <p className="text-zinc-400 text-xs max-w-xl">
                Start selling your Canva templates, eBooks, code boilerplates, and digital files. Zero listing fees, instant UPI payouts.
              </p>
            </div>
            <button
              onClick={() => {
                switchRole('seller');
                setActiveView('seller_dashboard');
              }}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all shrink-0"
            >
              {t('startSelling')}
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Col 1: Brand */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md">
                <Store className="w-5 h-5" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                Sellora<span className="text-indigo-400">Hub</span>
              </span>
            </div>
            <p className="text-zinc-400 text-xs max-w-sm leading-relaxed">
              {t('tagline')} — India’s premier multilingual digital marketplace for eBooks, templates, graphics, code, and courses with direct ₹ INR payouts.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Col 2: Top Categories */}
          <div className="space-y-3">
            <p className="font-bold text-white uppercase text-[11px] tracking-wider">
              {t('allCategories')}
            </p>
            <ul className="space-y-2 text-xs">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      setSelectedCategorySlug(cat.slug);
                      setActiveView('shop');
                    }}
                    className="hover:text-white transition-colors"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    setSelectedCategorySlug(null);
                    setActiveView('shop');
                  }}
                  className="text-indigo-400 font-bold hover:underline"
                >
                  View all 15 categories →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Information */}
          <div className="space-y-3">
            <p className="font-bold text-white uppercase text-[11px] tracking-wider">
              Explore
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveView('about')} className="hover:text-white transition-colors">
                  {t('aboutUs')}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('faq')} className="hover:text-white transition-colors">
                  {t('faq')}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('contact')} className="hover:text-white transition-colors">
                  {t('contactUs')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('setup_guide')}
                  className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Deploy to Netlify & Setup</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('admin_panel')}
                  className="text-purple-400 hover:text-purple-300 font-bold flex items-center gap-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Panel (Pardeshi)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Policies */}
          <div className="space-y-3">
            <p className="font-bold text-white uppercase text-[11px] tracking-wider">
              Policies
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveView('terms')} className="hover:text-white transition-colors">
                  {t('termsConditions')}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('privacy')} className="hover:text-white transition-colors">
                  {t('privacyPolicy')}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('refund')} className="hover:text-white transition-colors">
                  {t('refundPolicy')}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('seller_terms')} className="hover:text-white transition-colors">
                  {t('sellerTerms')}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('commission_policy')} className="hover:text-white transition-colors">
                  {t('commissionPolicy')} (80/20)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('dmca')} className="hover:text-white transition-colors">
                  {t('dmcaPolicy')}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Gateways & Bottom Copyright */}
        <div className="mt-12 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-center sm:text-left">
            © {new Date().getFullYear()} SelloraHub. {t('allRightsReserved')}
          </p>

          {/* Indian Payment Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] font-bold text-zinc-400">
            <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800">⚡ UPI</span>
            <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800">Google Pay</span>
            <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800">PhonePe</span>
            <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800">Paytm</span>
            <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800">RuPay</span>
            <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800">Net Banking</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
