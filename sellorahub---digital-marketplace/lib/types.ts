export type Language = 'en' | 'hi' | 'mr';

export type UserRole = 'customer' | 'seller' | 'admin';

export interface User {
  id: string;
  name: string;
  authorName: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar: string;
  bio?: string;
  socialLinks?: {
    twitter?: string;
    instagram?: string;
    youtube?: string;
    website?: string;
    github?: string;
  };
  upiId?: string;
  bankAccountNumber?: string;
  bankIfsc?: string;
  bankBranch?: string;
  accountHolderName?: string;
  joinedDate: string;
  isSellerApproved?: boolean;
  panNumber?: string;
  address?: string;
  emergencyContact?: string;
  adminPassword?: string;
}

export type ProductStatus = 'draft' | 'pending_approval' | 'published' | 'rejected';

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  authorBio?: string;
  categoryId: string;
  categoryName: string;
  subcategory?: string;
  price: number;
  discountPercent: number;
  originalPrice: number;
  thumbnail: string;
  previewImages: string[];
  previewDemoUrl?: string;
  downloadFileName: string;
  downloadFileSize: string;
  fileFormat: string;
  downloadPayload?: string;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  status: ProductStatus;
  rejectionReason?: string;
  salesCount: number;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
  isFeatured?: boolean;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  iconName: string;
  description: string;
  itemCount: number;
  subcategories: string[];
}

export interface OrderItem {
  productId: string;
  productTitle: string;
  productThumbnail: string;
  authorId: string;
  authorName: string;
  price: number;
  sellerEarnings: number;
  platformFee: number;
  licenseKey: string;
  downloadUrl?: string;
  fileName: string;
  fileSize: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'wallet';
  paymentId: string;
  paymentStatus: 'completed' | 'pending' | 'failed';
  createdAt: string;
}

export type WithdrawalStatus = 'pending' | 'approved' | 'processing' | 'paid' | 'rejected';

export interface Withdrawal {
  id: string;
  sellerId: string;
  sellerName: string;
  amount: number;
  platformFee: number;
  netPayout: number;
  method: 'upi' | 'bank_transfer';
  upiId?: string;
  bankDetails?: {
    accountNumber: string;
    ifsc: string;
    bankName?: string;
  };
  status: WithdrawalStatus;
  requestDate: string;
  processedDate?: string;
  adminNotes?: string;
}

export interface Review {
  id: string;
  productId: string;
  customerId: string;
  customerName: string;
  customerAvatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface CommissionConfig {
  platformCommissionPercent: number; // e.g. 20
  sellerCommissionPercent: number;   // e.g. 80
  minWithdrawalAmount: number;       // e.g. 500
}

export interface CartItem {
  product: Product;
  quantity: number;
}
