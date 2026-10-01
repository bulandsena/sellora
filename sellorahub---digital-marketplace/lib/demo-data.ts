import { Category, Product, User, Order, Withdrawal, Review } from './types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-ebooks',
    slug: 'ebooks',
    name: 'eBooks',
    iconName: 'BookOpen',
    description: 'Bestselling eBooks, PDF guides, technical handbooks & storybooks in English, Hindi & Marathi.',
    itemCount: 42,
    subcategories: ['Business & Finance', 'Tech & Coding', 'Self Help & Productivity', 'Regional Literature', 'Marketing & Sales'],
  },
  {
    id: 'cat-images',
    slug: 'images-photos',
    name: 'Images & Photos',
    iconName: 'Camera',
    description: 'High-res stock photography, Indian cultural imagery, textures, and commercial RAW photography.',
    itemCount: 65,
    subcategories: ['Indian Culture & Festivals', 'Portraits & Lifestyle', 'Architecture & Travel', 'Food & Spices', 'Abstract Backgrounds'],
  },
  {
    id: 'cat-graphics',
    slug: 'graphics-design',
    name: 'Graphics & Design',
    iconName: 'Palette',
    description: 'Vector illustrations, SVG bundles, 3D icons, logo marks, and Photoshop action brushes.',
    itemCount: 54,
    subcategories: ['Vector Illustrations', '3D Icon Packs', 'Typography & Fonts', 'Badge & Logo Assets', 'Textures & Overlays'],
  },
  {
    id: 'cat-templates',
    slug: 'templates',
    name: 'Templates',
    iconName: 'LayoutTemplate',
    description: 'Ready-to-use Canva templates, Notion workspaces, PowerPoint & Google Slides decks.',
    itemCount: 78,
    subcategories: ['Canva Presentations', 'Notion Systems', 'Pitch Decks', 'Brochures & Flyers', 'Resume & CV Templates'],
  },
  {
    id: 'cat-social-media',
    slug: 'social-media',
    name: 'Social Media',
    iconName: 'Share2',
    description: 'Viral Instagram carousel kits, Reels/Shorts hooks, YouTube thumbnail packs, and LinkedIn grids.',
    itemCount: 92,
    subcategories: ['Instagram Carousels', 'Reels Hooks & Scripts', 'YouTube Thumbnails', 'LinkedIn Banners', 'Festival Post Packs'],
  },
  {
    id: 'cat-videos',
    slug: 'videos',
    name: 'Videos',
    iconName: 'Video',
    description: '4K B-roll footage, Premiere Pro transitions, After Effects mockups, and animated lower thirds.',
    itemCount: 31,
    subcategories: ['Stock B-Roll', 'Premiere Transitions', 'After Effects Templates', 'Vertical Video Bundles', 'Motion Backgrounds'],
  },
  {
    id: 'cat-audio',
    slug: 'audio',
    name: 'Audio',
    iconName: 'Music',
    description: 'Royalty-free Indian cinematic themes, podcast intros, ambient meditation soundscapes, and SFX.',
    itemCount: 28,
    subcategories: ['Cinematic & Traditional', 'Podcast Intros & Stingers', 'Meditation & Binaural', 'Sound Effects Library', 'Lo-Fi Beats'],
  },
  {
    id: 'cat-documents',
    slug: 'documents',
    name: 'Documents',
    iconName: 'FileSpreadsheet',
    description: 'Automated Excel sheets, Google Sheets financial trackers, legal agreements, and contract templates.',
    itemCount: 45,
    subcategories: ['Financial Excel Trackers', 'Freelancer Contract Templates', 'GST & Invoice Formats', 'HR & Policy Docs', 'Checklists'],
  },
  {
    id: 'cat-software',
    slug: 'software',
    name: 'Software',
    iconName: 'Code',
    description: 'Production-ready Next.js boilerplates, Python automation bots, Flutter apps, and browser scripts.',
    itemCount: 38,
    subcategories: ['Next.js / React Starters', 'Python Automation Scripts', 'Flutter Mobile App Kits', 'Chrome Extensions', 'APIs & Microservices'],
  },
  {
    id: 'cat-courses',
    slug: 'courses',
    name: 'Courses',
    iconName: 'GraduationCap',
    description: 'Masterclasses on digital marketing, graphic design, stock trading, and full-stack development.',
    itemCount: 36,
    subcategories: ['Freelancing Mastery', 'Canva Pro Design Course', 'Web Development Bootcamp', 'Social Media Monetization', 'AI Tools Mastery'],
  },
  {
    id: 'cat-website-resources',
    slug: 'website-resources',
    name: 'Website Resources',
    iconName: 'Globe',
    description: 'WordPress Elementor templates, Tailwind UI components, Shopify liquid sections, and HTML5 themes.',
    itemCount: 49,
    subcategories: ['Tailwind CSS Kits', 'Elementor Landing Pages', 'Framer Templates', 'Webflow Components', 'Email HTML Templates'],
  },
  {
    id: 'cat-digital-services',
    slug: 'digital-services',
    name: 'Digital Services',
    iconName: 'Briefcase',
    description: 'Fixed-scope digital audits, custom logo design slots, website speed optimization, and SEO checks.',
    itemCount: 19,
    subcategories: ['SEO Website Audits', 'Custom Brand Identity Slot', 'Speed Optimization', 'Design Consultation', 'Copywriting Review'],
  },
  {
    id: 'cat-business',
    slug: 'business',
    name: 'Business',
    iconName: 'TrendingUp',
    description: 'Pitch decks for Indian angel investors, market research databases, and startup operating systems.',
    itemCount: 52,
    subcategories: ['Investor Pitch Decks', 'Market Research Reports', 'Sales CRM Sheets', 'Brand Guidelines Deck', 'SOPs Library'],
  },
  {
    id: 'cat-education',
    slug: 'education',
    name: 'Education',
    iconName: 'BookCheck',
    description: 'Curated competitive exam flashcards, school worksheets, university notes, and teacher planners.',
    itemCount: 44,
    subcategories: ['UPSC & MPSC Notes', 'School Activity Worksheets', 'College Formula Sheets', 'Language Learning Flashcards', 'Teacher Planners'],
  },
  {
    id: 'cat-other',
    slug: 'other-digital-products',
    name: 'Other Digital Products',
    iconName: 'Layers',
    description: '3D printing STL files, digital planners for iPad GoodNotes, digital stickers, and custom brushes.',
    itemCount: 23,
    subcategories: ['iPad GoodNotes Planners', 'Procreate Brush Sets', '3D Print STLs', 'Wallpaper Art Packs', 'Miscellaneous'],
  },
];

export const DEMO_AUTHORS: User[] = [
  {
    id: 'author-1',
    name: 'Rohit Sharma',
    authorName: 'PixelCraft Studio',
    email: 'rohit@pixelcraft.in',
    phone: '+91 98765 43210',
    role: 'seller',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    bio: 'Creator of high-converting Canva templates and modern UI design assets. 12,000+ sales across India with a 4.9-star average rating.',
    socialLinks: {
      instagram: 'https://instagram.com/pixelcraft',
      twitter: 'https://twitter.com/rohitcraft',
      website: 'https://pixelcraft.in',
    },
    upiId: 'rohitcraft@okhdfcbank',
    bankAccountNumber: '918237492837',
    bankIfsc: 'HDFC0001234',
    joinedDate: '2024-03-12',
    isSellerApproved: true,
  },
  {
    id: 'author-2',
    name: 'Pooja Deshmukh',
    authorName: 'Marathi Kala Vani',
    email: 'pooja@marathikala.in',
    phone: '+91 98220 11223',
    role: 'seller',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    bio: 'प्रसिद्ध मराठी सुलेखनकार (Calligrapher) आणि ग्राफिक डिझायनर. प्रामाणिक मराठी फॉन्ट बंडल्स आणि सणांचे सोशल मीडिया पोस्ट्सचे निर्माते.',
    socialLinks: {
      instagram: 'https://instagram.com/poojadeshmukh',
      youtube: 'https://youtube.com/@marathikalavani',
    },
    upiId: 'poojakala@okaxis',
    bankAccountNumber: '501004382910',
    bankIfsc: 'UTIB0000456',
    joinedDate: '2024-05-18',
    isSellerApproved: true,
  },
  {
    id: 'author-3',
    name: 'Aarav Singhania',
    authorName: 'CodeVelocity Labs',
    email: 'aarav@codevelocity.io',
    phone: '+91 98111 22334',
    role: 'seller',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    bio: 'Full-stack software engineer & indie hacker. Building production-ready Next.js boilerplate templates, SaaS starters, and automation scripts.',
    socialLinks: {
      github: 'https://github.com/aaravsingh',
      twitter: 'https://twitter.com/aaravcode',
      website: 'https://codevelocity.io',
    },
    upiId: 'aaravcode@icici',
    bankAccountNumber: '001205012345',
    bankIfsc: 'ICIC0000012',
    joinedDate: '2024-01-10',
    isSellerApproved: true,
  },
  {
    id: 'author-4',
    name: 'Dr. Vivek Joshi',
    authorName: 'FinGrowth Bharat',
    email: 'vivek@fingrowth.org',
    phone: '+91 99200 33445',
    role: 'seller',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    bio: 'सीए (Chartered Accountant) आणि बिझनेस मार्गदर्शक. भारतीय उद्योजक आणि स्टार्टअप्ससाठी सोपे फायनान्शियल मॉडेल्स आणि ईबुक्सचे लेखक.',
    socialLinks: {
      twitter: 'https://twitter.com/vivekjoshi_ca',
      website: 'https://fingrowth.org',
    },
    upiId: 'vivekfin@paytm',
    bankAccountNumber: '30291823749',
    bankIfsc: 'SBIN0001122',
    joinedDate: '2024-02-20',
    isSellerApproved: true,
  },
  {
    id: 'author-5',
    name: 'Meera Sen',
    authorName: 'VocalVibe India',
    email: 'meera@vocalvibe.com',
    phone: '+91 97654 99887',
    role: 'seller',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    bio: 'Indian classical and fusion music producer. Providing copyright-free cinematic background music, podcast jingles, and sitar/tabla loops.',
    socialLinks: {
      instagram: 'https://instagram.com/vocalvibe_india',
      youtube: 'https://youtube.com/@vocalvibe',
    },
    upiId: 'meerasen@okhdfcbank',
    bankAccountNumber: '123456789012',
    bankIfsc: 'HDFC0009999',
    joinedDate: '2024-06-01',
    isSellerApproved: true,
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: '500+ Indian Festive & Business Canva Social Media Templates',
    slug: '500-indian-festive-canva-templates',
    description: `Complete bundle of 500+ professionally crafted Canva templates designed specifically for Indian brands, creators, and local businesses. 
    
Includes editable designs for:
- Diwali, Holi, Ganesh Chaturthi, Eid, Christmas, Independence Day & Makar Sankranti
- Weekly promo offers, discount announcements & flash sale stories
- Testimonial highlights, customer reviews, and FAQ carousels
- Ready in both English and Hindi text layers with full commercial resell & usage rights!`,
    shortDescription: 'Ready-to-use Canva templates with Hindi and English text for 25+ Indian festivals and business promos.',
    authorId: 'author-1',
    authorName: 'PixelCraft Studio',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    authorBio: 'Creator of high-converting Canva templates and modern UI design assets.',
    categoryId: 'cat-templates',
    categoryName: 'Templates',
    subcategory: 'Canva Presentations',
    price: 499,
    discountPercent: 50,
    originalPrice: 999,
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=800&q=80',
    ],
    previewDemoUrl: 'https://canva.com',
    downloadFileName: 'SelloraHub_500_Canva_Templates_Bundle.pdf',
    downloadFileSize: '24.5 MB',
    fileFormat: 'Canva Pro Links + PDF Guide',
    downloadPayload: `====================================================
SELLORAHUB DIGITAL PRODUCT DOWNLOAD LICENSE & ACCESS
====================================================
Product: 500+ Indian Festive & Business Canva Templates
Author: PixelCraft Studio (Rohit Sharma)
Access Instructions:
1. Open the private Canva master template links below:
   - Festive Collection (200 Posts): https://canva.com/design/sample-access-1
   - Business & Promo Kit (150 Posts): https://canva.com/design/sample-access-2
   - Reels & Stories Cover Kit (150 Designs): https://canva.com/design/sample-access-3
2. Click "Use Template" in Canva to duplicate to your own free or pro Canva account.
Commercial License: Included for personal & client projects.
Support: rohit@pixelcraft.in
====================================================`,
    tags: ['Canva', 'Social Media', 'Diwali', 'Indian Business', 'Marketing', 'Templates'],
    seoTitle: '500+ Indian Festive Canva Templates Bundle - SelloraHub',
    seoDescription: 'Download 500+ editable Canva templates for Indian festivals and business marketing. Instant download in ₹ INR.',
    seoKeywords: ['canva templates india', 'festival social media posts', 'diwali canva design', 'sellorahub'],
    status: 'published',
    salesCount: 148,
    rating: 4.9,
    reviewCount: 38,
    createdAt: '2025-01-15',
    updatedAt: '2025-02-10',
    isFeatured: true,
  },
  {
    id: 'prod-2',
    title: 'The Indian Freelancer Blueprint (Hindi & English eBook)',
    slug: 'indian-freelancer-blueprint-ebook',
    description: `A battle-tested 180-page step-by-step handbook for freelancers in India. Learn how to earn $1,000 to $5,000+ per month working with international clients from home.

Key Chapters:
1. Finding High-Paying International Clients without Upwork Bidding Wars
2. Setting Up GST, Invoicing, and Wise / Wire Transfer Payments with Minimum Fees
3. Cold Outreach Email & LinkedIn Templates That Actually Convert
4. Contract & Scope-of-Work Agreements Customized for Indian Law
5. Time Management & Scaling into a Micro-Agency`,
    shortDescription: '180-page comprehensive guide to landing global clients, receiving USD/INR payments, and legal setups for Indian freelancers.',
    authorId: 'author-4',
    authorName: 'FinGrowth Bharat',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    authorBio: 'सीए आणि बिझनेस मार्गदर्शक. सोपे फायनान्शियल मॉडेल्स आणि ईबुक्सचे लेखक.',
    categoryId: 'cat-ebooks',
    categoryName: 'eBooks',
    subcategory: 'Business & Finance',
    price: 299,
    discountPercent: 40,
    originalPrice: 499,
    thumbnail: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    ],
    downloadFileName: 'The_Indian_Freelancer_Blueprint_v3.pdf',
    downloadFileSize: '12.8 MB',
    fileFormat: 'PDF + ePUB + Notion Checklist',
    downloadPayload: `====================================================
SELLORAHUB DIGITAL PRODUCT DOWNLOAD LICENSE & ACCESS
====================================================
Product: The Indian Freelancer Blueprint (Hindi & English)
Author: FinGrowth Bharat (Dr. Vivek Joshi)
Files Included:
- eBook PDF (High-Res Printable & Mobile-Optimized)
- Contract Template & Scope of Work (Word .docx + Google Docs)
- Client Outreach Email Scripts (Notion Dashboard)
Download Link: https://sellorahub.internal/secure-vault/freelancer-blueprint.pdf
License: Single User Lifetime Commercial Reading License
Support: vivek@fingrowth.org
====================================================`,
    tags: ['Freelancing', 'eBook', 'Business', 'Career', 'Remote Work', 'India'],
    seoTitle: 'The Indian Freelancer Blueprint eBook - Complete Roadmap',
    seoDescription: 'Master international client acquisition, GST compliance, and high-ticket freelancing from India.',
    seoKeywords: ['freelancing india ebook', 'how to freelance in india', 'remote work guide', 'sellorahub ebook'],
    status: 'published',
    salesCount: 312,
    rating: 4.8,
    reviewCount: 74,
    createdAt: '2025-01-10',
    updatedAt: '2025-01-28',
    isFeatured: true,
  },
  {
    id: 'prod-3',
    title: 'Marathi Pro Calligraphy Fonts & Typography Bundle (मराठी फॉन्ट्स)',
    slug: 'marathi-pro-calligraphy-fonts-bundle',
    description: `महाराष्ट्र आणि जगभरातील ग्राफिक डिझायनर्ससाठी २५+ प्रीमियम मराठी सुलेखन आणि कॅलिग्राफी फॉन्ट्सचा भव्य संग्रह!

वैशिष्ट्ये:
- युनिकोड आणि नॉन-युनिकोड दोन्ही प्रकारांमध्ये उपलब्ध
- लग्नपत्रिका, बॅनर डिझाईन, युट्यूब थंबनेल, राजकीय पोस्टर आणि पुस्तकांच्या कव्हरसाठी अत्यंत उपयुक्त
- CorelDraw, Photoshop, Illustrator, आणि Canva मध्ये सहजपणे कार्यक्षम
- सविस्तर इंस्टॉलेशन गाईड व कीबोर्ड मॅपिंग पीडीएफ सोबत`,
    shortDescription: '२५+ अस्सल मराठी सुलेखन फॉन्ट्स (मराठी कॅलिग्राफी), लग्नपत्रिका आणि बॅनर डिझाइनसाठी सर्वोत्तम संच.',
    authorId: 'author-2',
    authorName: 'Marathi Kala Vani',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    authorBio: 'प्रसिद्ध मराठी सुलेखनकार आणि ग्राफिक डिझायनर.',
    categoryId: 'cat-graphics',
    categoryName: 'Graphics & Design',
    subcategory: 'Typography & Fonts',
    price: 349,
    discountPercent: 30,
    originalPrice: 499,
    thumbnail: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=800&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=800&q=80',
    ],
    downloadFileName: 'Marathi_Calligraphy_Fonts_Pack_25.zip',
    downloadFileSize: '48.2 MB',
    fileFormat: 'TTF + OTF + Unicode Support + PDF Guide',
    downloadPayload: `====================================================
SELLORAHUB DIGITAL PRODUCT DOWNLOAD LICENSE & ACCESS
====================================================
Product: Marathi Pro Calligraphy Fonts Bundle (मराठी फॉन्ट्स)
Author: Marathi Kala Vani (Pooja Deshmukh)
Package Contents:
- 25 TTF & OTF Calligraphy Fonts
- Unicode & ShreeLipi conversion mapping chart
- 10 Ready PSD Invitation & Festival Banners
License: Full Commercial Unlimited Usage
Contact: pooja@marathikala.in
====================================================`,
    tags: ['Marathi Fonts', 'Calligraphy', 'Typography', 'Lagnapatrika', 'Banners', 'Photoshop'],
    seoTitle: 'Marathi Calligraphy Fonts Bundle 25+ TTF/OTF - SelloraHub',
    seoDescription: 'Download 25+ professional Marathi calligraphy fonts for banners, invitation cards and Photoshop.',
    seoKeywords: ['marathi fonts download', 'marathi calligraphy font', 'lagnapatrika font', 'sellorahub'],
    status: 'published',
    salesCount: 220,
    rating: 5.0,
    reviewCount: 52,
    createdAt: '2025-02-01',
    updatedAt: '2025-02-20',
    isFeatured: true,
  },
  {
    id: 'prod-4',
    title: 'Next.js 15 & Supabase SaaS Starter Kit (Tailwind + Razorpay + Auth)',
    slug: 'nextjs-supabase-saas-starter-kit',
    description: `Launch your web app or software product in 48 hours instead of 4 months. Complete production-grade SaaS boilerplate built with modern Next.js App Router, Supabase Database, Auth, Storage, and Indian Razorpay + Stripe payments pre-integrated.

Includes:
- Authentication with Google OAuth & Email/Password Magic Links
- Multi-tenant Organization & Team Membership architecture
- Automated Subscription Billing & One-time Digital Checkout webhooks
- Role-Based Access Control (Admin, Editor, Member)
- Dark / Light theme engine with Tailwind CSS & Lucide icons
- Clean TypeScript code with 100% test coverage structure`,
    shortDescription: 'Production-ready Next.js 15 SaaS boilerplate with Supabase, Razorpay payments, User Auth and admin dashboard.',
    authorId: 'author-3',
    authorName: 'CodeVelocity Labs',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    authorBio: 'Full-stack software engineer & indie hacker. Building production-ready Next.js boilerplate templates.',
    categoryId: 'cat-software',
    categoryName: 'Software',
    subcategory: 'Next.js / React Starters',
    price: 1499,
    discountPercent: 40,
    originalPrice: 2499,
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    ],
    previewDemoUrl: 'https://github.com',
    downloadFileName: 'nextjs15-supabase-saas-starter-v2.zip',
    downloadFileSize: '8.4 MB',
    fileFormat: 'ZIP (Full Source Code + GitHub Invite)',
    downloadPayload: `====================================================
SELLORAHUB DIGITAL PRODUCT DOWNLOAD LICENSE & ACCESS
====================================================
Product: Next.js 15 & Supabase SaaS Starter Kit
Author: CodeVelocity Labs (Aarav Singhania)
Repository Access:
- Private GitHub Repo Invite link: https://github.com/codevelocity-labs/saas-boilerplate-pro
- License Token: LIC-NXT15-SUPA-884920
Instructions:
1. Clone the repository: git clone https://github.com/...
2. Copy .env.example to .env.local
3. Run npm install && npm run dev
4. Follow the included SETUP.md for Supabase SQL schema migrations and Razorpay keys.
License: Unlimited Commercial Projects (Single Developer)
====================================================`,
    tags: ['Next.js', 'React', 'TypeScript', 'SaaS', 'Supabase', 'Code', 'Razorpay'],
    seoTitle: 'Next.js 15 & Supabase SaaS Starter Kit - SelloraHub',
    seoDescription: 'Production-ready Next.js SaaS starter code with Supabase auth and Razorpay integration.',
    seoKeywords: ['nextjs saas starter', 'nextjs boilerplate', 'supabase react template', 'sellorahub'],
    status: 'published',
    salesCount: 89,
    rating: 4.9,
    reviewCount: 24,
    createdAt: '2025-01-20',
    updatedAt: '2025-02-18',
    isFeatured: true,
  },
  {
    id: 'prod-5',
    title: 'Indian Business Financial Projections & Valuation Excel Model',
    slug: 'indian-business-financial-model-excel',
    description: `Dynamic 5-year financial projection model tailored for Indian businesses, D2C brands, and tech startups.

Highlights:
- Integrated Income Statement, Balance Sheet, and Cash Flow Statement
- Automated GST, TDS, and Indian Corporate Tax calculation formulas
- Cap Table & Equity dilution calculator for Seed and Series A rounds
- Unit economics (CAC, LTV, Payback Period) and Burn Rate tracker
- Pre-built pitch-ready charts ready to copy-paste directly into your pitch deck`,
    shortDescription: '5-year dynamic financial model with GST formulas, startup valuation, and investor-ready charts in Microsoft Excel.',
    authorId: 'author-4',
    authorName: 'FinGrowth Bharat',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    authorBio: 'सीए आणि बिझनेस मार्गदर्शक.',
    categoryId: 'cat-documents',
    categoryName: 'Documents',
    subcategory: 'Financial Excel Trackers',
    price: 399,
    discountPercent: 50,
    originalPrice: 799,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    ],
    downloadFileName: '5Year_Financial_Model_Startup_India.xlsx',
    downloadFileSize: '5.2 MB',
    fileFormat: 'XLSX + Google Sheets Link',
    downloadPayload: `====================================================
SELLORAHUB DIGITAL PRODUCT DOWNLOAD LICENSE & ACCESS
====================================================
Product: Indian Business Financial Projections Excel Model
Author: FinGrowth Bharat
File Link: https://sellorahub.internal/vault/financial-model-5yr.xlsx
Google Sheets Editable Copy: https://docs.google.com/spreadsheets/d/sample-view
Instructions: Change the blue highlighted assumption cells to automatically update the entire 5-year P&L.
License: Unlimited Commercial Use for your business/clients.
====================================================`,
    tags: ['Excel', 'Finance', 'Startup', 'Valuation', 'Pitch Deck', 'Business'],
    seoTitle: 'Startup Financial Model Excel Template India - SelloraHub',
    seoDescription: 'Download 5-year financial projection model for Indian startups and businesses.',
    seoKeywords: ['financial model excel', 'startup valuation template india', 'excel sheets', 'sellorahub'],
    status: 'published',
    salesCount: 165,
    rating: 4.8,
    reviewCount: 31,
    createdAt: '2025-01-25',
    updatedAt: '2025-02-12',
    isFeatured: false,
  },
  {
    id: 'prod-6',
    title: 'Royalty-Free Indian Cinematic Fusion Audio Tracks (FLAC & MP3)',
    slug: 'indian-cinematic-fusion-audio-tracks',
    description: `15 original, master-quality Indian fusion music tracks featuring live Sitar, Bansuri flute, Tabla, and modern cinematic ambient synthesizers.

Perfect for:
- YouTube documentaries, travel vlogs & regional podcasts
- Corporate brand films, TVCs, and promotional videos
- Meditation, wellness, and yoga apps
- 100% royalty-free with no YouTube Content ID strike risk (commercial certificate included)`,
    shortDescription: '15 high-fidelity Indian instrumental fusion tracks (Bansuri, Sitar & Tabla) for YouTube, podcasts and films.',
    authorId: 'author-5',
    authorName: 'VocalVibe India',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    authorBio: 'Indian classical and fusion music producer.',
    categoryId: 'cat-audio',
    categoryName: 'Audio',
    subcategory: 'Cinematic & Traditional',
    price: 599,
    discountPercent: 40,
    originalPrice: 999,
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    ],
    downloadFileName: 'Indian_Cinematic_Tracks_Vol1_FLAC_MP3.zip',
    downloadFileSize: '340 MB',
    fileFormat: '24-bit WAV + 320kbps MP3 + License PDF',
    downloadPayload: `====================================================
SELLORAHUB DIGITAL PRODUCT DOWNLOAD LICENSE & ACCESS
====================================================
Product: Royalty-Free Indian Cinematic Fusion Audio Tracks
Author: VocalVibe India (Meera Sen)
Download Vault: https://sellorahub.internal/vault/audio-vol1-cinematic.zip
YouTube Whitelist Certificate Included: Certificate ID #VV-IND-88219
License: Lifetime Worldwide Commercial Synchronization Rights
Support: meera@vocalvibe.com
====================================================`,
    tags: ['Music', 'Audio', 'Sitar', 'Flute', 'YouTube Music', 'Background Score'],
    seoTitle: 'Indian Cinematic Fusion Royalty-Free Music - SelloraHub',
    seoDescription: 'Download 15 royalty-free Indian fusion instrumental tracks for videos and podcasts.',
    seoKeywords: ['royalty free indian music', 'sitar background score', 'youtube audio tracks', 'sellorahub'],
    status: 'published',
    salesCount: 94,
    rating: 4.9,
    reviewCount: 22,
    createdAt: '2025-02-05',
    updatedAt: '2025-02-15',
    isFeatured: false,
  },
  {
    id: 'prod-7',
    title: 'Ultimate Notion Life OS & Habit Architecture (Hindi & English Guide)',
    slug: 'notion-life-os-habit-tracker',
    description: `Transform your daily chaos into effortless clarity. The Ultimate Notion Life OS connects your goals, daily habits, tasks, finances, reading list, and journal into a single unified aesthetic dashboard.

Includes:
- Goal setting framework based on OKRs
- Daily habit streak tracker with visual progress bars
- Second Brain notes archive based on the PARA method
- Personal budget & subscription reminder database
- Mobile-friendly quick capture view for your smartphone`,
    shortDescription: 'An all-in-one Notion workspace connecting habits, projects, finances and daily tasks with video setup guide.',
    authorId: 'author-1',
    authorName: 'PixelCraft Studio',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    authorBio: 'Creator of high-converting Canva templates and modern UI design assets.',
    categoryId: 'cat-templates',
    categoryName: 'Templates',
    subcategory: 'Notion Systems',
    price: 349,
    discountPercent: 30,
    originalPrice: 499,
    thumbnail: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80',
    ],
    downloadFileName: 'Notion_Life_OS_Template_Access.pdf',
    downloadFileSize: '4.1 MB',
    fileFormat: 'Notion Template Duplicate Link + Video Walkthrough',
    downloadPayload: `====================================================
SELLORAHUB DIGITAL PRODUCT DOWNLOAD LICENSE & ACCESS
====================================================
Product: Ultimate Notion Life OS & Habit Architecture
Author: PixelCraft Studio
Notion Duplicate Link: https://notion.so/sellorahub-life-os-template
Video Setup Guide: https://youtube.com/watch?v=sample-notion-guide
Support: rohit@pixelcraft.in
====================================================`,
    tags: ['Notion', 'Productivity', 'Habit Tracker', 'Life OS', 'Templates', 'Organization'],
    seoTitle: 'Ultimate Notion Life OS Template - SelloraHub',
    seoDescription: 'Organize your entire life, projects and habits in one clean Notion workspace.',
    seoKeywords: ['notion life os', 'notion templates india', 'productivity workspace', 'sellorahub'],
    status: 'published',
    salesCount: 180,
    rating: 4.9,
    reviewCount: 47,
    createdAt: '2025-02-08',
    updatedAt: '2025-02-22',
    isFeatured: true,
  },
  {
    id: 'prod-8',
    title: 'Python Web Scraping & Instagram Automation Bot Toolkit',
    slug: 'python-web-scraping-automation-toolkit',
    description: `Complete source code package of 12 production-ready Python automation scripts and scraping bots.

Scripts Included:
- Google Maps Local Business Lead Scraper (extracts phone, name, email)
- Instagram Profile & Hashtag analytics collector
- Amazon & Flipkart price tracker with instant Telegram alerts
- Automated PDF invoice generator and batch email dispatcher
- Clean code with step-by-step video instructions for non-programmers`,
    shortDescription: '12 ready-to-run Python scripts for lead generation, price monitoring, and data scraping with Telegram alerts.',
    authorId: 'author-3',
    authorName: 'CodeVelocity Labs',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    authorBio: 'Full-stack software engineer & indie hacker.',
    categoryId: 'cat-software',
    categoryName: 'Software',
    subcategory: 'Python Automation Scripts',
    price: 799,
    discountPercent: 50,
    originalPrice: 1599,
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    ],
    downloadFileName: 'Python_Automation_Bots_Master_Pack.zip',
    downloadFileSize: '18.7 MB',
    fileFormat: 'Python .py source files + Requirements + Video tutorial',
    downloadPayload: `====================================================
SELLORAHUB DIGITAL PRODUCT DOWNLOAD LICENSE & ACCESS
====================================================
Product: Python Web Scraping & Automation Bot Toolkit
Author: CodeVelocity Labs
Download Archive: https://sellorahub.internal/vault/python-toolkit-v2.zip
Setup:
1. Ensure Python 3.10+ is installed
2. Run pip install -r requirements.txt
3. Configure your config.json with your Telegram bot token.
Support: aarav@codevelocity.io
====================================================`,
    tags: ['Python', 'Automation', 'Bots', 'Web Scraping', 'Code', 'Tools'],
    seoTitle: 'Python Web Scraping & Automation Bot Toolkit - SelloraHub',
    seoDescription: 'Download Python automation scripts for lead generation and business scraping.',
    seoKeywords: ['python scripts download', 'lead generation python bot', 'web scraping code', 'sellorahub'],
    status: 'published',
    salesCount: 112,
    rating: 4.8,
    reviewCount: 29,
    createdAt: '2025-01-30',
    updatedAt: '2025-02-14',
    isFeatured: false,
  },
  {
    id: 'prod-9',
    title: 'Maharashtra Tourism 4K Stock Footage & Drone Clips Pack',
    slug: 'maharashtra-tourism-4k-stock-footage',
    description: `30 cinematic 4K drone and gimbal clips showcasing iconic landmarks of Maharashtra:
- Sahyadri mountain forts (Raigad, Sinhagad, Rajgad)
- Konkan beaches & sunset coastlines
- Gateway of India & Mumbai heritage architecture
- Graded in Rec.709 with flat LOG files included for custom color grading`,
    shortDescription: '30 cinematic 4K stock video clips of Maharashtra forts, Konkan beaches and Mumbai heritage.',
    authorId: 'author-2',
    authorName: 'Marathi Kala Vani',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    authorBio: 'प्रसिद्ध मराठी सुलेखनकार आणि ग्राफिक डिझायनर.',
    categoryId: 'cat-videos',
    categoryName: 'Videos',
    subcategory: 'Stock B-Roll',
    price: 899,
    discountPercent: 40,
    originalPrice: 1499,
    thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    ],
    downloadFileName: 'Maharashtra_4K_Drone_Footage_Clips.zip',
    downloadFileSize: '1.2 GB',
    fileFormat: 'ProRes 422 & MP4 (4K 60fps)',
    downloadPayload: `====================================================
SELLORAHUB DIGITAL PRODUCT DOWNLOAD LICENSE & ACCESS
====================================================
Product: Maharashtra Tourism 4K Stock Footage
Author: Marathi Kala Vani
High-Speed Direct Google Drive Mirror: https://drive.google.com/sample-stock-pack
License: Commercial Royalty-Free Unlimited Video Production License
====================================================`,
    tags: ['Video', '4K Footage', 'Drone', 'Maharashtra', 'Tourism', 'Cinematic'],
    seoTitle: 'Maharashtra 4K Stock Drone Footage Pack - SelloraHub',
    seoDescription: 'Download 30 cinematic 4K drone video clips of Sahyadri forts and Konkan coast.',
    seoKeywords: ['maharashtra stock footage 4k', 'drone b-roll india', 'sellorahub videos'],
    status: 'published',
    salesCount: 43,
    rating: 4.9,
    reviewCount: 11,
    createdAt: '2025-02-14',
    updatedAt: '2025-02-25',
    isFeatured: false,
  },
  {
    id: 'prod-10',
    title: 'E-commerce High-Converting Landing Page Figma & Tailwind Kit',
    slug: 'ecommerce-high-converting-landing-page-kit',
    description: `A battle-tested e-commerce direct response landing page template engineered to maximize conversions. Based on analysis of over 50+ successful Indian D2C brands.

Includes:
- Figma component library with Auto-Layout 5.0
- Pre-coded responsive Tailwind CSS & React JSX components
- High-converting sticky mobile CTA bar and bundle-pricing selector
- Customer trust badges, countdown timer component, and verified buyer reviews section`,
    shortDescription: 'Conversion-optimized D2C e-commerce landing page design in Figma with ready React/Tailwind code.',
    authorId: 'author-1',
    authorName: 'PixelCraft Studio',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    authorBio: 'Creator of high-converting Canva templates and modern UI design assets.',
    categoryId: 'cat-website-resources',
    categoryName: 'Website Resources',
    subcategory: 'Tailwind CSS Kits',
    price: 649,
    discountPercent: 35,
    originalPrice: 999,
    thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    ],
    downloadFileName: 'D2C_Conversion_Landing_Page_Figma_Tailwind.zip',
    downloadFileSize: '15.3 MB',
    fileFormat: 'Figma File + Tailwind CSS / Next.js Source Code',
    downloadPayload: `====================================================
SELLORAHUB DIGITAL PRODUCT DOWNLOAD LICENSE & ACCESS
====================================================
Product: E-commerce Landing Page Figma & Tailwind Kit
Author: PixelCraft Studio
Figma Community Access: https://figma.com/file/sample-d2c-kit
GitHub Code Bundle: https://sellorahub.internal/vault/landing-page-tailwind.zip
License: Commercial License for up to 5 client stores
Support: rohit@pixelcraft.in
====================================================`,
    tags: ['Figma', 'UI Kit', 'Tailwind CSS', 'Ecommerce', 'D2C', 'Landing Page'],
    seoTitle: 'E-commerce Landing Page Figma & Tailwind Kit - SelloraHub',
    seoDescription: 'High-converting D2C landing page design for Figma and Tailwind CSS.',
    seoKeywords: ['ecommerce landing page figma', 'tailwind d2c template', 'sellorahub'],
    status: 'published',
    salesCount: 77,
    rating: 4.9,
    reviewCount: 19,
    createdAt: '2025-02-18',
    updatedAt: '2025-02-26',
    isFeatured: true,
  },
  {
    id: 'prod-11',
    title: '1,000+ Viral Reels & Shorts Hook Scripts (Hindi + English)',
    slug: '1000-viral-reels-shorts-hooks-scripts',
    description: `Never run out of content ideas again. 1,000 viral hook scripts tested across Instagram Reels and YouTube Shorts.

Categorized into:
- Controversy & Curiosity Hooks
- "Stop Doing This" Warning Hooks
- Relatable Indian Corporate & College Humor
- Money, Career & Finance Story starters
- Includes exact pacing formulas and caption generator prompts!`,
    shortDescription: '1,000 proven opening hooks and scripts for viral Instagram Reels and YouTube Shorts with Hindi translations.',
    authorId: 'author-1',
    authorName: 'PixelCraft Studio',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    authorBio: 'Creator of high-converting Canva templates and modern UI design assets.',
    categoryId: 'cat-social-media',
    categoryName: 'Social Media',
    subcategory: 'Reels Hooks & Scripts',
    price: 199,
    discountPercent: 50,
    originalPrice: 399,
    thumbnail: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80',
    ],
    downloadFileName: '1000_Viral_Reels_Hooks_Vault.pdf',
    downloadFileSize: '3.6 MB',
    fileFormat: 'PDF + Notion Database + Excel Sheet',
    downloadPayload: `====================================================
SELLORAHUB DIGITAL PRODUCT DOWNLOAD LICENSE & ACCESS
====================================================
Product: 1,000+ Viral Reels & Shorts Hook Scripts
Author: PixelCraft Studio
Notion Database Link: https://notion.so/sellorahub-reels-hooks-vault
PDF Guide: https://sellorahub.internal/vault/1000-hooks.pdf
License: Personal & Agency Use
====================================================`,
    tags: ['Reels', 'Instagram', 'Shorts', 'Social Media', 'Content Creation', 'Hooks'],
    seoTitle: '1,000 Viral Reels Hook Scripts PDF - SelloraHub',
    seoDescription: 'Download 1,000 viral hook scripts for Instagram Reels and YouTube Shorts.',
    seoKeywords: ['reels hooks pdf', 'viral content scripts india', 'sellorahub'],
    status: 'published',
    salesCount: 420,
    rating: 4.9,
    reviewCount: 88,
    createdAt: '2025-01-05',
    updatedAt: '2025-02-19',
    isFeatured: true,
  },
  {
    id: 'prod-12',
    title: 'Modern Indian Fintech Mobile App UI Kit (Flutter & Figma)',
    slug: 'modern-indian-fintech-mobile-app-ui-kit',
    description: `A pending submission awaiting review! Complete 65+ screen UI kit designed specifically for UPI payments, investment tracking, mutual funds, and digital gold in India.

Features:
- Full support for light and dark modes
- Complete UPI QR scanning, PIN input, and transaction receipt states
- Clean Flutter widget components with customizable themes
- Ready-to-use Figma design system with design tokens`,
    shortDescription: '65+ screen fintech mobile app design with UPI payments and investment tracking in Figma and Flutter.',
    authorId: 'author-3',
    authorName: 'CodeVelocity Labs',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    authorBio: 'Full-stack software engineer & indie hacker.',
    categoryId: 'cat-software',
    categoryName: 'Software',
    subcategory: 'Flutter Mobile App Kits',
    price: 999,
    discountPercent: 30,
    originalPrice: 1499,
    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    ],
    downloadFileName: 'Fintech_India_UI_Kit_Flutter_Figma.zip',
    downloadFileSize: '54.1 MB',
    fileFormat: 'Figma + Flutter Source Code',
    downloadPayload: `====================================================
SELLORAHUB DIGITAL PRODUCT DOWNLOAD LICENSE & ACCESS
====================================================
Product: Modern Indian Fintech Mobile App UI Kit
Author: CodeVelocity Labs
Repository: https://github.com/codevelocity-labs/fintech-india-ui
License: Single Commercial App License
====================================================`,
    tags: ['Flutter', 'Figma', 'Fintech', 'UPI', 'Mobile App', 'UI Kit'],
    seoTitle: 'Indian Fintech Mobile App UI Kit Flutter - SelloraHub',
    seoDescription: 'Fintech and UPI app design system in Flutter and Figma.',
    seoKeywords: ['flutter fintech ui kit', 'upi app figma design', 'sellorahub'],
    status: 'pending_approval', // Notice: Pending approval so admin can test the approval flow!
    salesCount: 0,
    rating: 0,
    reviewCount: 0,
    createdAt: '2025-02-28',
    updatedAt: '2025-02-28',
    isFeatured: false,
  },
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-78291',
    customerId: 'cust-1',
    customerName: 'Sanjay Kulkarni',
    customerEmail: 'sanjay.kulkarni@gmail.com',
    customerPhone: '+91 98234 56789',
    items: [
      {
        productId: 'prod-1',
        productTitle: '500+ Indian Festive & Business Canva Social Media Templates',
        productThumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
        authorId: 'author-1',
        authorName: 'PixelCraft Studio',
        price: 499,
        sellerEarnings: 399.2,
        platformFee: 99.8,
        licenseKey: 'LIC-CANVA-78291-XY',
        fileName: 'SelloraHub_500_Canva_Templates_Bundle.pdf',
        fileSize: '24.5 MB',
      },
    ],
    totalAmount: 499,
    discountAmount: 0,
    finalAmount: 499,
    paymentMethod: 'upi',
    paymentId: 'pay_RAZORPAY_982348123',
    paymentStatus: 'completed',
    createdAt: '2025-02-24T14:32:00Z',
  },
  {
    id: 'ORD-78104',
    customerId: 'cust-1',
    customerName: 'Sanjay Kulkarni',
    customerEmail: 'sanjay.kulkarni@gmail.com',
    customerPhone: '+91 98234 56789',
    items: [
      {
        productId: 'prod-2',
        productTitle: 'The Indian Freelancer Blueprint (Hindi & English eBook)',
        productThumbnail: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
        authorId: 'author-4',
        authorName: 'FinGrowth Bharat',
        price: 299,
        sellerEarnings: 239.2,
        platformFee: 59.8,
        licenseKey: 'LIC-BOOK-78104-AZ',
        fileName: 'The_Indian_Freelancer_Blueprint_v3.pdf',
        fileSize: '12.8 MB',
      },
    ],
    totalAmount: 299,
    discountAmount: 0,
    finalAmount: 299,
    paymentMethod: 'card',
    paymentId: 'pay_RAZORPAY_102938475',
    paymentStatus: 'completed',
    createdAt: '2025-02-20T11:15:00Z',
  },
];

export const INITIAL_WITHDRAWALS: Withdrawal[] = [
  {
    id: 'WTH-101',
    sellerId: 'author-1',
    sellerName: 'PixelCraft Studio (Rohit Sharma)',
    amount: 5000,
    platformFee: 0,
    netPayout: 5000,
    method: 'upi',
    upiId: 'rohitcraft@okhdfcbank',
    status: 'paid',
    requestDate: '2025-02-15',
    processedDate: '2025-02-16',
    adminNotes: 'Transferred via IMPS/UPI ref #UTR88291029',
  },
  {
    id: 'WTH-102',
    sellerId: 'author-1',
    sellerName: 'PixelCraft Studio (Rohit Sharma)',
    amount: 3200,
    platformFee: 0,
    netPayout: 3200,
    method: 'upi',
    upiId: 'rohitcraft@okhdfcbank',
    status: 'pending',
    requestDate: '2025-02-27',
    adminNotes: 'Awaiting admin batch payout approval',
  },
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-1',
    customerId: 'user-c1',
    customerName: 'Aditi Rao',
    customerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'Saved me at least 40 hours of graphic design work for my boutique. The Hindi and English festival templates are truly stunning!',
    createdAt: '2025-02-18',
  },
  {
    id: 'rev-2',
    productId: 'prod-1',
    customerId: 'user-c2',
    customerName: 'Nitin Patel',
    customerAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'The Canva links worked instantly. Quality is premium and easily customizable. Value for money at ₹499.',
    createdAt: '2025-02-21',
  },
  {
    id: 'rev-3',
    productId: 'prod-3',
    customerId: 'user-c3',
    customerName: 'Mangesh Patil',
    customerAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'अतिशय सुंदर मराठी फॉन्ट्स! लग्नपत्रिका आणि वाढदिवसाच्या शुभेच्छा बॅनरसाठी खूप उपयोगी ठरले. धन्यवाद पूजा मॅडम!',
    createdAt: '2025-02-23',
  },
];
