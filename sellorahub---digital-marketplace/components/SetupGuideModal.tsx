'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Database,
  Terminal,
  CreditCard,
  Lock,
  GitBranch,
  CloudUpload,
  Globe,
  Copy,
  Check,
  CheckCircle2,
  BookOpen,
} from 'lucide-react';

export const SetupGuideModal: React.FC = () => {
  const { activeView, setActiveView, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'supabase' | 'razorpay' | 'local' | 'netlify'>('netlify');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  if (activeView !== 'setup_guide') return null;

  const copyCode = (code: string, id: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedSection(id);
      showToast('SQL / Code snippet copied to clipboard! 📋', 'success');
      setTimeout(() => setCopiedSection(null), 2500);
    }
  };

  const netlifyTomlSnippet = `[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "20"
  NEXT_USE_NETLIFY_EDGE = "false"

[[plugins]]
  package = "@netlify/plugin-nextjs"`;

  const supabaseSqlSchema = `-- ==============================================================================
-- SELLORAHUB DATABASE TABLE STRUCTURE (SUPABASE POSTGRESQL DDL)
-- ==============================================================================

-- 1. Profiles Table (Customers, Authors/Sellers, Admins)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name TEXT NOT NULL,
  author_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'seller', 'admin')),
  avatar_url TEXT,
  bio TEXT,
  upi_id TEXT,
  bank_account_number TEXT,
  bank_ifsc TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  icon_name TEXT DEFAULT 'Layers',
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Products Table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  category_id UUID REFERENCES public.categories(id) ON DELETE RESTRICT NOT NULL,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  short_description TEXT,
  price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  discount_percent INT DEFAULT 0,
  thumbnail_url TEXT NOT NULL,
  preview_demo_url TEXT,
  download_file_name TEXT NOT NULL,
  download_file_size TEXT,
  file_format TEXT NOT NULL,
  storage_file_path TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  seo_title TEXT,
  seo_description TEXT,
  status TEXT DEFAULT 'pending_approval' CHECK (status IN ('draft', 'pending_approval', 'published', 'rejected')),
  rejection_reason TEXT,
  sales_count INT DEFAULT 0,
  rating NUMERIC(2, 1) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY,
  customer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  total_amount NUMERIC(10, 2) NOT NULL,
  payment_method TEXT NOT NULL,
  payment_id TEXT UNIQUE NOT NULL,
  payment_status TEXT DEFAULT 'completed' CHECK (payment_status IN ('completed', 'pending', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Order Items Table
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id TEXT REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  product_title TEXT NOT NULL,
  author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  seller_earnings NUMERIC(10, 2) NOT NULL, -- 80%
  platform_fee NUMERIC(10, 2) NOT NULL,    -- 20%
  license_key TEXT UNIQUE NOT NULL
);

-- 6. Withdrawals Table
CREATE TABLE IF NOT EXISTS public.withdrawals (
  id TEXT PRIMARY KEY,
  seller_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  amount NUMERIC(10, 2) NOT NULL CHECK (amount >= 500),
  payout_method TEXT CHECK (payout_method IN ('upi', 'bank_transfer')),
  payout_destination TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'processing', 'paid', 'rejected')),
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  processed_at TIMESTAMP WITH TIME ZONE
);

-- Row Level Security (RLS) policies
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public products viewable by everyone" ON public.products FOR SELECT USING (status = 'published');
CREATE POLICY "Authors can view own products" ON public.products FOR ALL USING (auth.uid() = author_id);`;

  const razorpayCode = `// app/api/payment/verify/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    // Verify cryptographic HMAC SHA256 signature using your secret key
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    // 1. Mark order as completed in database
    // 2. Generate secure download license key
    // 3. Credit 80% to author's available balance
    // 4. Retain 20% platform commission

    return NextResponse.json({ success: true, orderId: razorpay_order_id });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}`;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      {/* Header */}
      <button
        onClick={() => setActiveView('home')}
        className="mb-4 text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
      >
        ← Return to Marketplace
      </button>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-zinc-200 dark:border-zinc-800 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 dark:bg-amber-950 px-2.5 py-0.5 rounded-full">
            Beginner & Production Guide
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-50 mt-1">
            SelloraHub Architecture & Setup Guide
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Complete copy-and-paste guides for Supabase PostgreSQL, Razorpay Indian Payments, Local Dev & Vercel deployment.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-zinc-200 dark:border-zinc-800 mb-6 text-xs font-bold overflow-x-auto pb-2">
        {[
          { id: 'netlify', label: '1. Netlify Deployment (Live Ready)', icon: <CloudUpload className="w-4 h-4 text-emerald-500" /> },
          { id: 'supabase', label: '2. Supabase PostgreSQL Schema', icon: <Database className="w-4 h-4 text-blue-500" /> },
          { id: 'razorpay', label: '3. Razorpay Indian Payments', icon: <CreditCard className="w-4 h-4 text-indigo-500" /> },
          { id: 'local', label: '4. Local Dev & Testing', icon: <Terminal className="w-4 h-4 text-amber-500" /> },
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

      {/* Tab: Netlify */}
      {activeTab === 'netlify' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950 font-black text-sm">
                  Netlify
                </span>
                <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                  Deploy SelloraHub to Netlify in 3 Simple Steps
                </h3>
              </div>
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-full">
                Next.js 15 App Router Compatible
              </span>
            </div>

            {/* Method 1: Git-Connected Deploy (Recommended) */}
            <div className="space-y-2">
              <h4 className="font-bold text-xs text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                Method A: One-Click Git Connection (Recommended)
              </h4>
              <ol className="list-decimal list-inside space-y-2 text-zinc-600 dark:text-zinc-400">
                <li>
                  Push this project to your GitHub repository:
                  <pre className="mt-1 p-2.5 rounded-xl bg-zinc-950 text-zinc-200 font-mono text-[11px]">
                    git init && git add . && git commit -m &quot;Deploy SelloraHub&quot;{'\n'}git branch -M main{'\n'}git remote add origin https://github.com/YOUR_USERNAME/sellorahub.git{'\n'}git push -u origin main
                  </pre>
                </li>
                <li>
                  Log in to <a href="https://app.netlify.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-bold underline">Netlify Dashboard</a> and click <strong>Add new site</strong> &rarr; <strong>Import an existing project</strong>.
                </li>
                <li>
                  Select <strong>GitHub</strong> and choose your <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded font-mono">sellorahub</code> repository.
                </li>
                <li>
                  Netlify automatically detects <code className="font-mono text-emerald-600 font-bold">netlify.toml</code> and uses the following build configuration:
                  <div className="mt-1.5 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 grid grid-cols-2 gap-2 text-[11px]">
                    <div><strong>Build Command:</strong> <code className="font-mono">npm run build</code></div>
                    <div><strong>Publish Directory:</strong> <code className="font-mono">.next</code></div>
                    <div><strong>Plugin:</strong> <code className="font-mono">@netlify/plugin-nextjs</code></div>
                    <div><strong>Node Version:</strong> <code className="font-mono">20</code></div>
                  </div>
                </li>
                <li>
                  In <strong>Site configuration</strong> &rarr; <strong>Environment variables</strong>, add:
                  <div className="mt-1.5 p-2.5 rounded-xl bg-zinc-950 text-zinc-200 font-mono text-[11px] space-y-1">
                    <div>RAZORPAY_KEY_ID = rzp_test_xxxxxxx</div>
                    <div>RAZORPAY_KEY_SECRET = your_razorpay_secret</div>
                    <div>NEXT_PUBLIC_SUPABASE_URL = https://your-project.supabase.co</div>
                    <div>NEXT_PUBLIC_SUPABASE_ANON_KEY = your_supabase_anon_key</div>
                  </div>
                </li>
                <li>
                  Click <strong>Deploy site</strong>. Netlify will build and publish your digital marketplace in ~60 seconds!
                </li>
              </ol>
            </div>

            {/* Method 2: Netlify CLI */}
            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
              <h4 className="font-bold text-xs text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                Method B: Direct Terminal Deploy via Netlify CLI
              </h4>
              <p className="text-zinc-600 dark:text-zinc-400">
                You can also deploy directly from your local terminal using the Netlify CLI:
              </p>
              <pre className="p-3 rounded-xl bg-zinc-950 text-zinc-200 font-mono text-[11px] leading-relaxed">
                # 1. Install Netlify CLI globally{'\n'}npm install -g netlify-cli{'\n\n'}# 2. Authorize your Netlify account{'\n'}netlify login{'\n\n'}# 3. Initialize site and link{'\n'}netlify init{'\n\n'}# 4. Deploy production build to Netlify CDN{'\n'}netlify deploy --build --prod
              </pre>
            </div>

            {/* Custom Domain & HTTPS */}
            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
              <h4 className="font-bold text-xs text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                Custom Domain & Free SSL on Netlify
              </h4>
              <p className="text-zinc-600 dark:text-zinc-400">
                1. Go to <strong>Site configuration</strong> &rarr; <strong>Domain management</strong> &rarr; <strong>Add a domain</strong>.<br />
                2. Enter your domain (e.g. <code className="font-mono">sellorahub.com</code>).<br />
                3. Point your domain CNAME record to <code className="font-mono text-emerald-600 font-bold">&lt;your-site-name&gt;.netlify.app</code>.<br />
                4. Netlify will automatically generate a free Let&apos;s Encrypt SSL certificate within minutes.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Supabase */}
      {activeTab === 'supabase' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex justify-between items-center text-xs">
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">
              Paste this into your Supabase Dashboard → <strong>SQL Editor</strong> → Click <strong>Run</strong>:
            </span>
            <button
              onClick={() => copyCode(supabaseSqlSchema, 'supabase')}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-bold flex items-center gap-1.5 shrink-0 shadow-xs"
            >
              {copiedSection === 'supabase' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSection === 'supabase' ? 'Copied!' : 'Copy SQL'}</span>
            </button>
          </div>

          <pre className="p-4 rounded-2xl bg-zinc-950 text-zinc-200 font-mono text-[11px] overflow-x-auto leading-relaxed border border-zinc-800 max-h-[500px]">
            {supabaseSqlSchema}
          </pre>
        </div>
      )}

      {/* Tab: Razorpay */}
      {activeTab === 'razorpay' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex justify-between items-center text-xs">
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">
              Server-side Payment Verification Webhook Handler (Zero Frontend Secrets Exposed):
            </span>
            <button
              onClick={() => copyCode(razorpayCode, 'razorpay')}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-bold flex items-center gap-1.5 shrink-0 shadow-xs"
            >
              {copiedSection === 'razorpay' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSection === 'razorpay' ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>

          <pre className="p-4 rounded-2xl bg-zinc-950 text-zinc-200 font-mono text-[11px] overflow-x-auto leading-relaxed border border-zinc-800">
            {razorpayCode}
          </pre>
        </div>
      )}

      {/* Tab: Local */}
      {activeTab === 'local' && (
        <div className="space-y-4 text-xs">
          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
            <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
              Step-by-Step Local Running Guide
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-zinc-600 dark:text-zinc-400">
              <li>Install Node.js 18+ on your machine.</li>
              <li>Clone or download your repository and open in VS Code.</li>
              <li>Install dependencies by running: <code className="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded font-mono">npm install</code></li>
              <li>Copy <code className="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded font-mono">.env.example</code> to <code className="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded font-mono">.env.local</code></li>
              <li>Run the local development server: <code className="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded font-mono">npm run dev</code></li>
              <li>Open <code className="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded font-mono">http://localhost:3000</code> in your browser.</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};
