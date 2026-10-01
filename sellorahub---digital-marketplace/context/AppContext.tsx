'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  User,
  UserRole,
  Product,
  Category,
  CartItem,
  Order,
  Withdrawal,
  Review,
  CommissionConfig,
} from '@/lib/types';
import { translations, TranslationKey } from '@/lib/translations';
import {
  INITIAL_CATEGORIES,
  DEMO_AUTHORS,
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_WITHDRAWALS,
  INITIAL_REVIEWS,
} from '@/lib/demo-data';

export type ActiveView =
  | 'home'
  | 'shop'
  | 'categories'
  | 'authors'
  | 'author_detail'
  | 'seller_dashboard'
  | 'customer_dashboard'
  | 'admin_panel'
  | 'about'
  | 'contact'
  | 'faq'
  | 'terms'
  | 'privacy'
  | 'refund'
  | 'seller_terms'
  | 'dmca'
  | 'commission_policy'
  | 'setup_guide';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
  currentUser: User;
  setCurrentUser: (user: User) => void;
  switchRole: (role: UserRole) => void;
  products: Product[];
  categories: Category[];
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  withdrawals: Withdrawal[];
  reviews: Review[];
  commissionConfig: CommissionConfig;
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  selectedAuthor: User | null;
  setSelectedAuthor: (author: User | null) => void;
  selectedCategorySlug: string | null;
  setSelectedCategorySlug: (slug: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
  
  // Admin Authentication & Personal Information
  isAdminAuthenticated: boolean;
  setIsAdminAuthenticated: (auth: boolean) => void;
  adminUser: User;
  updateAdminProfile: (updates: Partial<User>) => void;
  loginAdmin: (username: string, password: string) => boolean;
  logoutAdmin: () => void;

  // Actions
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  isItemInCart: (productId: string) => boolean;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  addProduct: (productData: Partial<Product>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  approveProduct: (id: string) => void;
  rejectProduct: (id: string, reason?: string) => void;
  updateCommissionConfig: (config: Partial<CommissionConfig>) => void;
  createOrder: (orderData: Omit<Order, 'id' | 'createdAt'>) => Order;
  requestWithdrawal: (amount: number, method: 'upi' | 'bank_transfer', details: { upiId?: string; bankDetails?: any }) => boolean;
  updateWithdrawalStatus: (id: string, status: Withdrawal['status'], notes?: string) => void;
  downloadProductFile: (product: Product, orderId?: string) => void;
  addReview: (productId: string, rating: number, comment: string) => void;
}

const DEMO_CUSTOMER: User = {
  id: 'cust-1',
  name: 'Sanjay Kulkarni',
  authorName: 'Sanjay K',
  email: 'sanjay.kulkarni@gmail.com',
  phone: '+91 98234 56789',
  role: 'customer',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
  joinedDate: '2024-04-12',
};

const PARDESHI_ADMIN: User = {
  id: 'admin-pardeshi',
  name: 'Pardeshi',
  authorName: 'Pardeshi (Super Admin & Platform Owner)',
  email: 'pardeshi@sellorahub.com',
  phone: '+91 98230 19790',
  role: 'admin',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
  bio: 'Owner, creator, and chief administrator of SelloraHub digital marketplace platform.',
  upiId: 'pardeshi@okhdfcbank',
  bankAccountNumber: '50100918237492',
  bankIfsc: 'HDFC0001979',
  bankBranch: 'Fort Branch, Mumbai',
  accountHolderName: 'Pardeshi',
  panNumber: 'ABCDE1979P',
  address: 'Mumbai, Maharashtra, India',
  emergencyContact: '+91 98230 19790',
  adminPassword: 'Raju@1979',
  joinedDate: '2023-10-01',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const toastIdRef = React.useRef(0);
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedLang = localStorage.getItem('sellorahub_lang') as Language;
        if (savedLang && (savedLang === 'en' || savedLang === 'hi' || savedLang === 'mr')) {
          return savedLang;
        }
      } catch {}
    }
    return 'en';
  });

  const [currentUser, setCurrentUser] = useState<User>(DEMO_AUTHORS[0]); // Starts as Rohit Sharma (seller) for rich exploration
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedCart = localStorage.getItem('sellorahub_cart');
        if (savedCart) {
          return JSON.parse(savedCart);
        }
      } catch {}
    }
    return [];
  });

  const [wishlist, setWishlist] = useState<string[]>(['prod-1', 'prod-3']);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>(INITIAL_WITHDRAWALS);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [commissionConfig, setCommissionConfig] = useState<CommissionConfig>({
    platformCommissionPercent: 20,
    sellerCommissionPercent: 80,
    minWithdrawalAmount: 500,
  });

  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedAuthor, setSelectedAuthor] = useState<User | null>(null);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Admin authentication state & Pardeshi profile
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      try {
        return localStorage.getItem('sellorahub_admin_auth') === 'true';
      } catch {}
    }
    return false;
  });

  const [adminUser, setAdminUser] = useState<User>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('sellorahub_admin_profile');
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return PARDESHI_ADMIN;
  });

  const loginAdmin = (username: string, password: string): boolean => {
    const validUsername = 'pardeshi';
    const validPassword = adminUser.adminPassword || 'Raju@1979';

    if (username.trim().toLowerCase() === validUsername && password === validPassword) {
      setIsAdminAuthenticated(true);
      setCurrentUser(adminUser);
      try {
        localStorage.setItem('sellorahub_admin_auth', 'true');
      } catch {}
      showToast('Welcome, Super Admin Pardeshi! Access authorized. 🛡️', 'success');
      return true;
    } else {
      showToast('Access Denied: Invalid Admin username or password', 'error');
      return false;
    }
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    try {
      localStorage.removeItem('sellorahub_admin_auth');
    } catch {}
    setCurrentUser(DEMO_AUTHORS[0]);
    setActiveView('home');
    showToast('Admin session locked. Logged out successfully.', 'info');
  };

  const updateAdminProfile = (updates: Partial<User>) => {
    setAdminUser((prev) => {
      const updated = { ...prev, ...updates };
      try {
        localStorage.setItem('sellorahub_admin_profile', JSON.stringify(updated));
      } catch {}
      if (currentUser.role === 'admin') {
        setCurrentUser(updated);
      }
      return updated;
    });
    showToast('Admin personal information saved successfully! ✅', 'success');
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('sellorahub_lang', lang);
    } catch {
      // ignore
    }
    const langNames: Record<Language, string> = {
      en: 'Language changed to English 🇬🇧',
      hi: 'भाषा बदलकर हिंदी कर दी गई है 🇮🇳',
      mr: 'भाषा मराठी मध्ये बदलली आहे 🇮🇳',
    };
    showToast(langNames[lang], 'info');
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    toastIdRef.current += 1;
    const id = `toast-${toastIdRef.current}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Translation helper
  const t = (key: TranslationKey, vars?: Record<string, string | number>): string => {
    const dict = translations[language] || translations.en;
    let str: string = (dict as any)[key] || (translations.en as any)[key] || key;
    if (vars) {
      Object.entries(vars).forEach(([k, v]) => {
        str = str.replace(`{${k}}`, String(v));
      });
    }
    return str;
  };

  const switchRole = (role: UserRole) => {
    if (role === 'customer') {
      setCurrentUser(DEMO_CUSTOMER);
      showToast('Switched to Customer account (Sanjay Kulkarni)', 'info');
    } else if (role === 'seller') {
      setCurrentUser(DEMO_AUTHORS[0]);
      showToast('Switched to Creator account (Rohit Sharma / PixelCraft Studio)', 'info');
    } else if (role === 'admin') {
      if (isAdminAuthenticated) {
        setCurrentUser(adminUser);
        setActiveView('admin_panel');
        showToast('Switched to SelloraHub Admin Panel (Pardeshi)', 'info');
      } else {
        setActiveView('admin_panel');
        showToast('Restricted: Please enter credentials for Admin Pardeshi', 'info');
      }
    }
  };

  // Cart operations
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const exists = prev.some((item) => item.product.id === product.id);
      if (exists) {
        showToast(`"${product.title.slice(0, 30)}..." is already in your cart`, 'info');
        return prev;
      }
      const updated = [...prev, { product, quantity: 1 }];
      try {
        localStorage.setItem('sellorahub_cart', JSON.stringify(updated));
      } catch {}
      showToast(`Added "${product.title.slice(0, 25)}..." to cart`, 'success');
      return updated;
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => {
      const updated = prev.filter((item) => item.product.id !== productId);
      try {
        localStorage.setItem('sellorahub_cart', JSON.stringify(updated));
      } catch {}
      showToast('Item removed from cart', 'info');
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
    try {
      localStorage.removeItem('sellorahub_cart');
    } catch {}
  };

  const isItemInCart = (productId: string) => {
    return cart.some((item) => item.product.id === productId);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to wishlist ❤️', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Product Operations
  const addProduct = (productData: Partial<Product>): Product => {
    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      title: productData.title || 'Untitled Digital Product',
      slug: (productData.title || 'untitled-product')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, ''),
      description: productData.description || '',
      shortDescription: productData.shortDescription || (productData.description?.slice(0, 100) ?? ''),
      authorId: currentUser.id,
      authorName: currentUser.authorName || currentUser.name,
      authorAvatar: currentUser.avatar,
      authorBio: currentUser.bio,
      categoryId: productData.categoryId || 'cat-ebooks',
      categoryName:
        categories.find((c) => c.id === productData.categoryId)?.name || 'eBooks',
      subcategory: productData.subcategory || 'General',
      price: Number(productData.price) || 299,
      discountPercent: Number(productData.discountPercent) || 0,
      originalPrice:
        Number(productData.price) && productData.discountPercent
          ? Math.round(Number(productData.price) / (1 - Number(productData.discountPercent) / 100))
          : Number(productData.price) || 299,
      thumbnail:
        productData.thumbnail ||
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      previewImages: productData.previewImages?.length
        ? productData.previewImages
        : [
            productData.thumbnail ||
              'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
          ],
      previewDemoUrl: productData.previewDemoUrl || '',
      downloadFileName: productData.downloadFileName || `${productData.title || 'product'}.zip`,
      downloadFileSize: productData.downloadFileSize || '15.4 MB',
      fileFormat: productData.fileFormat || 'ZIP / PDF / Digital Assets',
      downloadPayload: productData.downloadPayload || 'Thank you for your purchase from SelloraHub!',
      tags: productData.tags || ['Digital Product', 'SelloraHub'],
      seoTitle: productData.seoTitle || `${productData.title} - SelloraHub`,
      seoDescription: productData.seoDescription || productData.shortDescription || '',
      seoKeywords: productData.seoKeywords || ['digital marketplace', 'sellorahub'],
      status: 'pending_approval', // Prompt requirement: Admin must approve products before publishing
      salesCount: 0,
      rating: 0,
      reviewCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };

    setProducts((prev) => [newProduct, ...prev]);
    showToast('Product submitted for Admin approval! ✨', 'success');
    return newProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString().split('T')[0] } : p))
    );
    showToast('Product updated successfully', 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product removed from catalog', 'info');
  };

  const approveProduct = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'published' } : p))
    );
    showToast('Product approved and published to store! 🚀', 'success');
  };

  const rejectProduct = (id: string, reason: string = 'Needs higher resolution preview & detailed description.') => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'rejected', rejectionReason: reason } : p))
    );
    showToast('Product marked as rejected', 'info');
  };

  const updateCommissionConfig = (config: Partial<CommissionConfig>) => {
    setCommissionConfig((prev) => {
      const updated = { ...prev, ...config };
      if (config.platformCommissionPercent !== undefined) {
        updated.sellerCommissionPercent = 100 - config.platformCommissionPercent;
      }
      return updated;
    });
    showToast('Platform commission settings updated', 'success');
  };

  // Orders & Purchase flow
  const createOrder = (orderData: Omit<Order, 'id' | 'createdAt'>): Order => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      createdAt: new Date().toISOString(),
      paymentStatus: 'completed',
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Update product sales count
    newOrder.items.forEach((item) => {
      setProducts((prev) =>
        prev.map((p) => (p.id === item.productId ? { ...p, salesCount: p.salesCount + 1 } : p))
      );
    });

    clearCart();
    showToast('Order confirmed! Access your downloads below.', 'success');
    return newOrder;
  };

  // Withdrawals
  const requestWithdrawal = (
    amount: number,
    method: 'upi' | 'bank_transfer',
    details: { upiId?: string; bankDetails?: any }
  ): boolean => {
    // Check available balance
    // Calculate seller's total earnings minus already withdrawn
    const sellerSalesEarnings = orders.reduce((sum, order) => {
      const sellerItems = order.items.filter((it) => it.authorId === currentUser.id);
      const itemsEarnings = sellerItems.reduce((iSum, it) => iSum + it.sellerEarnings, 0);
      return sum + itemsEarnings;
    }, 0);

    const totalWithdrawnOrPending = withdrawals
      .filter((w) => w.sellerId === currentUser.id && w.status !== 'rejected')
      .reduce((sum, w) => sum + w.amount, 0);

    const availableBalance = Math.max(0, sellerSalesEarnings - totalWithdrawnOrPending);

    if (amount < commissionConfig.minWithdrawalAmount) {
      showToast(`Minimum withdrawal is ₹${commissionConfig.minWithdrawalAmount}`, 'error');
      return false;
    }

    if (amount > availableBalance) {
      showToast(`Insufficient balance. Available: ₹${availableBalance.toFixed(2)}`, 'error');
      return false;
    }

    const newWithdrawal: Withdrawal = {
      id: `WTH-${Math.floor(100 + Math.random() * 900)}`,
      sellerId: currentUser.id,
      sellerName: `${currentUser.authorName || currentUser.name} (${currentUser.name})`,
      amount,
      platformFee: 0,
      netPayout: amount,
      method,
      upiId: details.upiId,
      bankDetails: details.bankDetails,
      status: 'pending',
      requestDate: new Date().toISOString().split('T')[0],
      adminNotes: 'Automated transfer queued',
    };

    setWithdrawals((prev) => [newWithdrawal, ...prev]);
    showToast('Withdrawal request submitted! Admin will process within 24 business hours.', 'success');
    return true;
  };

  const updateWithdrawalStatus = (id: string, status: Withdrawal['status'], notes?: string) => {
    setWithdrawals((prev) =>
      prev.map((w) =>
        w.id === id
          ? {
              ...w,
              status,
              adminNotes: notes || w.adminNotes,
              processedDate: status === 'paid' ? new Date().toISOString().split('T')[0] : w.processedDate,
            }
          : w
      )
    );
    showToast(`Withdrawal #${id} marked as ${status.toUpperCase()}`, 'success');
  };

  // Secure instant file download generator
  const downloadProductFile = (product: Product, orderId?: string) => {
    const licKey = `LIC-${product.slug.toUpperCase().slice(0, 8)}-${Math.floor(100000 + Math.random() * 900000)}`;
    const timestamp = new Date().toLocaleString();

    const fileContent = `========================================================================
SELLORAHUB DIGITAL MARKETPLACE — OFFICIAL PRODUCT DOWNLOAD CERTIFICATE
========================================================================
Platform: SelloraHub (https://sellorahub.com)
Tagline: Create • Sell • Download • Earn
Verified Transaction & Commercial License Certificate
------------------------------------------------------------------------
PRODUCT TITLE    : ${product.title}
PRODUCT ID       : ${product.id}
CATEGORY         : ${product.categoryName} (${product.subcategory || 'General'})
AUTHOR / CREATOR : ${product.authorName}
FILE FORMAT      : ${product.fileFormat}
ESTIMATED SIZE   : ${product.downloadFileSize}
BUYER NAME       : ${currentUser.name}
BUYER EMAIL      : ${currentUser.email}
ORDER ID         : ${orderId || 'ORD-DIRECT-VERIFIED'}
LICENSE KEY      : ${licKey}
DOWNLOAD DATE    : ${timestamp}
------------------------------------------------------------------------
TERMS OF COMMERCIAL LICENSE:
This digital license grants the authorized holder non-exclusive, worldwide
rights to use, deploy, and adapt this asset for personal and commercial client
projects. Re-distributing the raw master files on public torrents, free forums,
or unauthorized reselling as a standalone raw asset is strictly prohibited.
------------------------------------------------------------------------
CREATOR'S DIGITAL ACCESS CONTENT & DOWNLOAD PAYLOAD:
${product.downloadPayload || 'Instant digital package link verified: https://sellorahub.internal/vault/asset-' + product.id}
========================================================================
CUSTOMER SUPPORT & AUTHOR INQUIRIES:
If you have questions regarding this product or need technical assistance,
please contact the creator or email support@sellorahub.com.
Thank you for supporting independent creators on SelloraHub!
========================================================================`;

    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${product.slug}-SelloraHub-License.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast(`Downloaded: ${product.title.slice(0, 30)}...`, 'success');
  };

  const addReview = (productId: string, rating: number, comment: string) => {
    const newRev: Review = {
      id: `rev-${Date.now()}`,
      productId,
      customerId: currentUser.id,
      customerName: currentUser.name,
      customerAvatar: currentUser.avatar,
      rating,
      comment,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setReviews((prev) => [newRev, ...prev]);

    // Recalculate product rating
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const productRevs = [...reviews.filter((r) => r.productId === productId), newRev];
          const avg = productRevs.reduce((s, r) => s + r.rating, 0) / productRevs.length;
          return {
            ...p,
            rating: Number(avg.toFixed(1)),
            reviewCount: productRevs.length,
          };
        }
        return p;
      })
    );
    showToast('Your review has been submitted!', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        currentUser,
        setCurrentUser,
        switchRole,
        products,
        categories,
        cart,
        wishlist,
        orders,
        withdrawals,
        reviews,
        commissionConfig,
        activeView,
        setActiveView,
        selectedProduct,
        setSelectedProduct,
        selectedAuthor,
        setSelectedAuthor,
        selectedCategorySlug,
        setSelectedCategorySlug,
        searchQuery,
        setSearchQuery,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        toasts,
        showToast,
        removeToast,
        addToCart,
        removeFromCart,
        clearCart,
        isItemInCart,
        toggleWishlist,
        isInWishlist,
        addProduct,
        updateProduct,
        deleteProduct,
        approveProduct,
        rejectProduct,
        updateCommissionConfig,
        createOrder,
        requestWithdrawal,
        updateWithdrawalStatus,
        downloadProductFile,
        addReview,
        isAdminAuthenticated,
        setIsAdminAuthenticated,
        adminUser,
        updateAdminProfile,
        loginAdmin,
        logoutAdmin,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
