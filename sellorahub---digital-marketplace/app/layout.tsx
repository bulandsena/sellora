import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'SelloraHub | Create • Sell • Download • Earn',
  description: 'SelloraHub is a premier multi-vendor digital marketplace for eBooks, templates, graphics, code, and courses with ₹ INR payments, author dashboards, and English/Hindi/Marathi translations.',
  openGraph: {
    title: 'SelloraHub | Create • Sell • Download • Earn',
    description: 'SelloraHub is a premier multi-vendor digital marketplace for eBooks, templates, graphics, code, and courses with ₹ INR payments, author dashboards, and English/Hindi/Marathi translations.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SelloraHub | Create • Sell • Download • Earn',
    description: 'SelloraHub is a premier multi-vendor digital marketplace for eBooks, templates, graphics, code, and courses with ₹ INR payments, author dashboards, and English/Hindi/Marathi translations.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
