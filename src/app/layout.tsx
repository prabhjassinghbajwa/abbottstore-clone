import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { CartProvider } from '@/contexts/cart-context';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Abbott Store - Nutritional Products for Every Stage of Life',
  description: 'Shop Abbott nutritional products including Ensure, Glucerna, Similac, Pedialyte, and more. Free shipping on orders over $35.',
  keywords: 'Abbott, nutrition, Ensure, Glucerna, Similac, Pedialyte, PediaSure, EleCare, Nepro, Juven, BinaxNOW, FreeStyle',
  authors: [{ name: 'Abbott Laboratories' }],
  creator: 'Abbott Laboratories',
  publisher: 'Abbott Laboratories',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://abbottstore.com'),
  openGraph: {
    title: 'Abbott Store - Nutritional Products for Every Stage of Life',
    description: 'Shop Abbott nutritional products including Ensure, Glucerna, Similac, Pedialyte, and more.',
    url: 'https://abbottstore.com',
    siteName: 'Abbott Store',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abbott Store - Nutritional Products for Every Stage of Life',
    description: 'Shop Abbott nutritional products including Ensure, Glucerna, Similac, Pedialyte, and more.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
