import { ThemeProvider } from '@/components/theme-provider';
import { CartProvider } from '@/lib/cart-count-context';
import { LanguageProvider } from '@/lib/language-context';
import { WishlistProvider } from '@/lib/wishlist-context';
import { ReactQueryProvider } from '@/provider/ReactQueryProvider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type React from 'react';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'INOYÁ',
  description: 'Luxury Fashion Brand',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <LanguageProvider>
              <WishlistProvider>
                <CartProvider>{children}</CartProvider>
                <Toaster />
              </WishlistProvider>
            </LanguageProvider>
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
