# SelloraHub — Digital Marketplace

> **Tagline:** Create • Sell • Download • Earn  
> **Currency:** ₹ INR (Indian Rupee)  
> **Default Platform Commission:** 20% | **Seller Earnings:** 80%  
> **Multilingual Engine:** 🇬🇧 English | 🇮🇳 हिंदी (Hindi) | 🇮🇳 मराठी (Marathi)

---

## 📁 PROJECT FILE STRUCTURE

```text
sellorahub/
├── app/
│   ├── globals.css                # Tailwind CSS v4 styling & typography
│   ├── layout.tsx                 # Root layout with OpenGraph, SEO meta & fonts
│   └── page.tsx                   # Main marketplace assembly, routing & state
├── components/
│   ├── Navbar.tsx                 # Header navigation, search bar, language switcher, cart badge
│   ├── LanguageSwitcher.tsx       # Real-time English / Hindi / Marathi switcher
│   ├── HeroSection.tsx            # Hero with live search, tags, trust badges
│   ├── CategoryGrid.tsx           # 15 digital categories grid with icon maps
│   ├── ProductCard.tsx            # Product cards with ₹ pricing, discounts, author link, buy now
│   ├── ProductDetailModal.tsx     # Full product page modal with specs, reviews, live preview
│   ├── CartDrawer.tsx             # Slide-over cart with coupon (SELLORA20) and pricing
│   ├── CheckoutModal.tsx          # Indian payment simulator (UPI, Cards, Netbanking)
│   ├── SellerDashboard.tsx        # Creator studio (Stats, Add Product, My Products, Withdrawals)
│   ├── CustomerDashboard.tsx      # Customer account (My Downloads, Orders, Wishlist)
│   ├── AdminPanel.tsx             # Moderation queue, Commission settings, Payout approvals
│   ├── AuthorProfileModal.tsx     # Public creator portfolio, bio, ratings, and catalog
│   ├── InformationalPages.tsx     # FAQ, About, Contact, Policies (Terms, Refund, Commission)
│   ├── SetupGuideModal.tsx        # In-app interactive copy-paste guide for Supabase & Razorpay
│   ├── ToastContainer.tsx         # Floating feedback alerts
│   └── Footer.tsx                 # Multilingual footer with payment badges & legal links
├── context/
│   └── AppContext.tsx             # Core state, cart, wishlist, orders, commission calculations
├── lib/
│   ├── types.ts                   # Full TypeScript definitions (Product, Order, Withdrawal, User)
│   ├── translations.ts            # Dictionaries for English, Hindi, and Marathi
│   ├── demo-data.ts               # Realistic demo products, authors, orders, categories
│   └── utils.ts                   # Tailwind utility helpers (cn)
├── .env.example                   # Environment variables template
├── package.json                   # Dependencies and scripts
├── tsconfig.json                  # TypeScript compiler settings
└── README.md                      # Comprehensive deployment and setup manual
```

---

## 🗄️ DATABASE TABLE STRUCTURE (Supabase PostgreSQL)

Run the following SQL in your Supabase project's **SQL Editor**:

```sql
-- 1. PROFILES (Customers, Creators/Authors, Admins)
CREATE TABLE public.profiles (
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

-- 2. CATEGORIES
CREATE TABLE public.categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  icon_name TEXT DEFAULT 'Layers',
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. PRODUCTS
CREATE TABLE public.products (
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

-- 4. ORDERS
CREATE TABLE public.orders (
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

-- 5. ORDER ITEMS
CREATE TABLE public.order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id TEXT REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  product_title TEXT NOT NULL,
  author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  seller_earnings NUMERIC(10, 2) NOT NULL, -- 80% share
  platform_fee NUMERIC(10, 2) NOT NULL,    -- 20% share
  license_key TEXT UNIQUE NOT NULL
);

-- 6. WITHDRAWALS
CREATE TABLE public.withdrawals (
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

-- 7. REVIEWS
CREATE TABLE public.reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  customer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  customer_name TEXT NOT NULL,
  rating INT CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  comment TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public products viewable by everyone" ON public.products FOR SELECT USING (status = 'published');
CREATE POLICY "Authors can view & manage own products" ON public.products FOR ALL USING (auth.uid() = author_id);
```

---

## ⚡ SUPABASE SETUP

1. Go to [supabase.com](https://supabase.com) and create a free project.
2. In **Project Settings** → **API**, copy your `URL` and `anon key`.
3. In **Storage**, create a private bucket named `digital-downloads` (for paid assets) and a public bucket `product-thumbnails`.
4. Add the keys to `.env.local`:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
   SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
   ```

---

## 💳 RAZORPAY SETUP (₹ INR Payments)

1. Sign up on [razorpay.com](https://razorpay.com) and activate your test/live account.
2. In **Settings** → **API Keys**, generate your **Key ID** and **Key Secret**.
3. Add to your server environment variables (never expose secret keys in client-side code):
   ```bash
   RAZORPAY_KEY_ID="rzp_test_xxxxxx"
   RAZORPAY_KEY_SECRET="your_secret_key"
   ```
4. Verification endpoint runs server-side:
   ```ts
   import crypto from "crypto";
   
   const signature = crypto
     .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
     .update(razorpay_order_id + "|" + razorpay_payment_id)
     .digest("hex");
   ```

---

## 👑 ADMIN ACCESS & AUTHORIZATION (Pardeshi Only)

Access to the SelloraHub Admin Panel is strictly restricted to authorized administrators:

* **Admin Username:** `Pardeshi`
* **Admin Password:** `Raju@1979`
* **Admin Role:** Platform Owner & Super Administrator

### 🔐 How to Access the Admin Panel:
1. In the header navigation or footer, click on **Admin Panel** (or use the account role menu and select **Admin**).
2. Enter the authorized credentials:
   - **Username:** `Pardeshi`
   - **Password:** `Raju@1979`
3. Click **Authenticate as Admin Pardeshi** (or click the one-click **Autofill Authorized Admin Credentials** button).
4. Once authenticated, navigate to the **Admin Personal Information Spaces** tab to review or edit:
   - **Full Legal Name:** Pardeshi
   - **Administrator Display Role:** Pardeshi (Super Admin & Platform Owner)
   - **Official Email Address:** `pardeshi@sellorahub.com`
   - **Mobile / WhatsApp:** `+91 98230 19790`
   - **Admin Bio / Platform Mission Statement**
   - **Platform Commission (20%) Deposit Spaces:**
     - Primary UPI ID (VPA): `pardeshi@okhdfcbank`
     - Account Holder Legal Name: `Pardeshi`
     - Bank Account Number: `50100918237492`
     - Bank IFSC Code: `HDFC0001979`
     - Bank Branch Name: `Fort Branch, Mumbai`
   - **Tax / Identity Number (PAN / GSTIN / Aadhaar):** `ABCDE1979P`
   - **Emergency / Secondary Contact**
   - **Office / Operational Address Space**
   - **Admin Security Password (Passcode):** (Default: `Raju@1979`)
5. Changes are persisted automatically to local storage and active session.

---

## 🚀 LOCAL TESTING

1. Make sure Node.js (v18+) is installed:
   ```bash
   node -v
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.
5. Use the role switcher in the top right menu to switch between:
   - **Buyer** (Test cart, checkout, downloads)
   - **Creator** (Upload product, request withdrawal)
   - **Admin** (Approve product, update commission %, payout withdrawals)

---

## 📦 GITHUB UPLOAD & DEPLOYMENT

### Step 1: Push Code to GitHub
```bash
git init
git add .
git commit -m "feat: SelloraHub digital marketplace"
git branch -M main
git remote add origin https://github.com/your-username/sellorahub.git
git push -u origin main
```

---

### 🌐 Deploy to Netlify (Recommended)

SelloraHub includes a pre-configured `netlify.toml` file with the `@netlify/plugin-nextjs` plugin optimized for Next.js 15 App Router.

#### Option A: Deploy via Netlify Web UI
1. Go to [app.netlify.com](https://app.netlify.com) and click **Add new site** → **Import an existing project**.
2. Connect your **GitHub** account and choose your `sellorahub` repository.
3. Netlify will auto-detect settings from `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
   - **Next.js Plugin:** `@netlify/plugin-nextjs`
4. In **Site configuration** → **Environment variables**, add:
   ```text
   NODE_VERSION=20
   RAZORPAY_KEY_ID=your_razorpay_key
   RAZORPAY_KEY_SECRET=your_razorpay_secret
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
5. Click **Deploy sellorahub**. Your marketplace will be live on `https://<site-name>.netlify.app` within 60 seconds!

#### Option B: Deploy via Netlify CLI (Terminal)
```bash
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Login to your Netlify account
netlify login

# 3. Initialize site and link to GitHub
netlify init

# 4. Trigger production build and deployment
netlify deploy --build --prod
```

---

### 🌐 Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and click **Add New Project**.
2. Select your `sellorahub` repository.
3. Enter your environment variables (`RAZORPAY_KEY_SECRET`, `GEMINI_API_KEY`, etc.).
4. Click **Deploy**.

---

## 🌐 CUSTOM DOMAIN & FREE SSL CONNECTION

### Connecting your Domain on Netlify:
1. In the Netlify Dashboard, navigate to **Site configuration** → **Domain management** → **Add domain**.
2. Type your domain: `sellorahub.com` or `shop.yourbrand.com`.
3. In your domain provider (GoDaddy, Namecheap, Cloudflare, BigRock), add a DNS record:
   - **Type:** `CNAME`
   - **Host / Name:** `www` (or subdomain)
   - **Value / Target:** `<your-site-name>.netlify.app`
4. Netlify will automatically generate and renew a free Let's Encrypt SSL certificate.
