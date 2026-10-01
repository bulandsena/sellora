'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  HelpCircle,
  Mail,
  Shield,
  FileText,
  DollarSign,
  Copyright,
  ChevronDown,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Send,
} from 'lucide-react';

export const InformationalPages: React.FC = () => {
  const { activeView, setActiveView, t, showToast } = useApp();

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    showToast('Your message has been received! Our support team will reply within 12 hours.', 'success');
  };

  const faqs = [
    {
      q: 'How does instant digital download work on SelloraHub?',
      q_hi: 'SelloraHub पर डिजिटल डाउनलोड तुरंत कैसे काम करता है?',
      q_mr: 'SelloraHub वर डिजिटल डाउनलोड तात्काळ कसे कार्य करते?',
      a: 'Immediately after completing your purchase through UPI, Card, or Netbanking, your order is verified and you receive an official commercial license certificate along with direct download links in your "My Downloads" library.',
    },
    {
      q: 'How much commission does SelloraHub charge creators?',
      q_hi: 'SelloraHub रचनाकारों से कितना कमीशन लेता है?',
      q_mr: 'SelloraHub निर्मात्यांकडून किती कमिशन आकारते?',
      a: 'SelloraHub charges a standard 20% platform commission to cover payment gateway processing, cloud hosting, and marketplace security. Creators keep 80% of every sale, with zero monthly listing fees.',
    },
    {
      q: 'What is the minimum withdrawal amount for sellers?',
      q_hi: 'विक्रेताओं के लिए न्यूनतम निकासी राशि क्या है?',
      q_mr: 'विक्रेत्यांसाठी किमान पैसे काढण्याची रक्कम किती आहे?',
      a: 'The default minimum withdrawal threshold is ₹500. Earnings can be withdrawn directly to your Indian bank account via IMPS or to any UPI ID (GPay, PhonePe, Paytm).',
    },
    {
      q: 'Can I sell Hindi and Marathi content on SelloraHub?',
      q_hi: 'क्या मैं SelloraHub पर हिंदी और मराठी सामग्री बेच सकता हूँ?',
      q_mr: 'मी SelloraHub वर हिंदी आणि मराठी साहित्य किंवा फॉन्ट्स विकू शकतो का?',
      a: 'Yes! SelloraHub is built from the ground up for India’s multilingual creator economy. You can sell Marathi calligraphy fonts, Hindi eBooks, regional festival templates, video assets, and study notes.',
    },
    {
      q: 'What is the refund policy for digital files?',
      q_hi: 'डिजिटल फाइलों के लिए रिफंड नीति क्या है?',
      q_mr: 'डिजिटल फाइल्ससाठी परतावा धोरण काय आहे?',
      a: 'Because digital files cannot be physically returned, all purchases are generally final once downloaded. However, if a file is defective, corrupted, or misrepresented, buyers are protected by our 7-day verified refund guarantee.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in duration-200 text-zinc-800 dark:text-zinc-200">
      {/* Back button */}
      <button
        onClick={() => setActiveView('home')}
        className="mb-6 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
      >
        ← Return to Homepage
      </button>

      {/* About Us View */}
      {activeView === 'about' && (
        <div className="space-y-6">
          <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Our Story</span>
            <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-50 mt-1">About SelloraHub</h1>
            <p className="text-sm text-zinc-500">Create • Sell • Download • Earn</p>
          </div>
          <div className="prose dark:prose-invert max-w-none text-sm space-y-4 leading-relaxed">
            <p>
              <strong>SelloraHub</strong> is India’s next-generation digital marketplace crafted specifically for independent creators, designers, software engineers, educators, and authors.
            </p>
            <p>
              From viral Canva templates and Marathi calligraphy bundles to production-grade Next.js SaaS boilerplates and business financial models, we bridge the gap between creative producers and digital consumers with instant UPI payments and automated commercial licenses.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 not-prose">
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <p className="text-2xl font-black text-indigo-600">80%</p>
                <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300 mt-1">Direct Creator Share</p>
                <p className="text-[11px] text-zinc-500">Zero listing fees, keeping capital in creators&apos; hands.</p>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <p className="text-2xl font-black text-emerald-600">⚡ Instant</p>
                <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300 mt-1">Digital Delivery</p>
                <p className="text-[11px] text-zinc-500">Download keys and master files immediately after checkout.</p>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <p className="text-2xl font-black text-purple-600">3 Languages</p>
                <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300 mt-1">English, Hindi & Marathi</p>
                <p className="text-[11px] text-zinc-500">Localized experience for all creators across Bharat.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FAQ View */}
      {activeView === 'faq' && (
        <div className="space-y-6">
          <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Help Center</span>
            <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-50 mt-1">{t('faq')}</h1>
            <p className="text-sm text-zinc-500">Everything you need to know about purchasing and selling on SelloraHub.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-xs"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left font-bold text-sm text-zinc-900 dark:text-zinc-100"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="p-4 pt-0 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800/60 mt-1">
                    <p>{faq.a}</p>
                    <p className="mt-2 text-[11px] text-zinc-500 italic">🇮🇳 हिंदी: {faq.q_hi}</p>
                    <p className="text-[11px] text-zinc-500 italic">🇮🇳 मराठी: {faq.q_mr}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contact Us View */}
      {activeView === 'contact' && (
        <div className="space-y-6">
          <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Get in Touch</span>
            <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-50 mt-1">{t('contactUs')}</h1>
            <p className="text-sm text-zinc-500">Have questions about an order or author account? Reach our team.</p>
          </div>

          {contactSubmitted ? (
            <div className="p-8 rounded-3xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-base font-bold text-emerald-900 dark:text-emerald-100">
                Message Sent Successfully!
              </h3>
              <p className="text-xs text-emerald-700 dark:text-emerald-300">
                Thank you for writing to us. Our support team responds to all inquiries within 12 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Your Email *</label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Subject</label>
                <input
                  type="text"
                  required
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  placeholder="Order inquiry, author onboarding, or general question"
                  className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Message *</label>
                <textarea
                  required
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Inquiry</span>
              </button>
            </form>
          )}
        </div>
      )}

      {/* Policies: Terms, Privacy, Refund, Seller Terms, DMCA, Commission */}
      {['terms', 'privacy', 'refund', 'seller_terms', 'dmca', 'commission_policy'].includes(activeView) && (
        <div className="space-y-6">
          <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Legal Document</span>
            <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-50 mt-1">
              {activeView === 'terms' && t('termsConditions')}
              {activeView === 'privacy' && t('privacyPolicy')}
              {activeView === 'refund' && t('refundPolicy')}
              {activeView === 'seller_terms' && t('sellerTerms')}
              {activeView === 'dmca' && t('dmcaPolicy')}
              {activeView === 'commission_policy' && t('commissionPolicy')}
            </h1>
            <p className="text-xs text-zinc-400">Effective Date: January 2025 • Governing Law: India</p>
          </div>

          <div className="prose dark:prose-invert max-w-none text-xs space-y-4 leading-relaxed text-zinc-600 dark:text-zinc-300">
            {activeView === 'terms' && (
              <>
                <p>Welcome to SelloraHub. By accessing our marketplace or downloading any digital materials, you agree to comply with our Terms of Service.</p>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">1. Digital Licenses</h4>
                <p>All items purchased grant a worldwide, non-transferable commercial license to use the assets in client and personal projects. Re-selling or distributing the raw source files on torrents is strictly prohibited.</p>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">2. Payment & Verification</h4>
                <p>Payments are transacted in Indian Rupees (₹ INR). Once approved by the payment gateway, downloadable files are instantly provisioned to the buyer&apos;s account.</p>
              </>
            )}

            {activeView === 'commission_policy' && (
              <>
                <p>SelloraHub operates under a transparent, fair-share creator economic model.</p>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">1. 80/20 Distribution Formula</h4>
                <p>On every completed sale, 80% of the gross sale price is automatically credited to the verified Creator&apos;s available balance. 20% is retained as the SelloraHub platform fee to sustain hosting, automated download delivery, and gateway costs.</p>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">2. Payouts & Minimum Threshold</h4>
                <p>Creators may request payout of their available balance whenever it meets or exceeds the minimum threshold of ₹500. Payouts are executed via IMPS, NEFT, or UPI to the seller&apos;s registered details within 24 business hours.</p>
              </>
            )}

            {activeView === 'refund' && (
              <>
                <p>Because digital downloads are non-tangible irrevocable goods, sales are deemed final upon file delivery.</p>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">1. Defective or Corrupt Files</h4>
                <p>If a downloaded digital file is corrupt, materially differs from the preview description, or cannot be accessed, our support team will inspect the item and issue a 100% refund within 7 business days.</p>
              </>
            )}

            {activeView === 'privacy' && (
              <>
                <p>SelloraHub respects buyer and creator privacy. We collect only necessary billing data (Name, Email, Phone) required to generate official tax invoices and verify digital access.</p>
                <p>We do not store credit card details or bank passwords; all transactions are processed securely through certified PCI-DSS compliant Indian payment gateways.</p>
              </>
            )}

            {activeView === 'seller_terms' && (
              <>
                <p>By registering as an Author on SelloraHub, you certify that you own all copyrights and intellectual property rights to the items you upload.</p>
                <p>All products must be reviewed and approved by SelloraHub moderation before appearing in the public store.</p>
              </>
            )}

            {activeView === 'dmca' && (
              <>
                <p>SelloraHub respects the intellectual property rights of others. If you believe your copyrighted material is being infringed on our marketplace, please email dmca@sellorahub.com with proof of ownership.</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
