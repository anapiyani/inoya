'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';
import { useCart } from '@/lib/cart-count-context';
import { useWishlist } from '@/lib/wishlist-context';
import { Heart, Menu, Search, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AuthModal } from '../auth/auth-modal';
import { UserMenu } from '../auth/user-menu';
import { MobileMenu } from '../{admin,search,lookbook,cart,checkout,profile,journal}/mobile-menu';

export function Header() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [openInput, setOpenInput] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { wishlistItems } = useWishlist();
  const { getCartCount } = useCart();
  const { user, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlHeader);
    return () => window.removeEventListener('scroll', controlHeader);
  }, [lastScrollY]);

  const cartCount = getCartCount();

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-30 border-b border-gray-200 bg-white transition-transform duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>

          <h1
            className="cursor-pointer text-2xl font-bold tracking-wider"
            onClick={() => {
              router.push('/');
            }}
          >
            INOYÁ
          </h1>

          <div className="flex items-center space-x-2">
            {openInput ? (
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Поиск..."
                  className="h-9 w-48 rounded-full border border-gray-300 px-4 pr-10 text-sm shadow-sm transition-all focus:border-black focus:outline-none"
                  onBlur={() => setOpenInput(false)}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const query = (e.target as HTMLInputElement).value;
                      router.push(
                        `/catalog?search=${encodeURIComponent(query)}`
                      );
                    }
                  }}
                />
                <Search className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-gray-100"
                onClick={() => setOpenInput(true)}
              >
                <Search className="h-5 w-5" />
              </Button>
            )}
            <Link href="/wishlist">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    {wishlistItems.length}
                  </span>
                )}
              </Button>
            </Link>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
            {!isLoading &&
              (isAuthenticated ? (
                <UserMenu />
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsAuthModalOpen(true)}
                  className="text-sm"
                >
                  Войти
                </Button>
              ))}
          </div>
        </div>
      </header>
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}
