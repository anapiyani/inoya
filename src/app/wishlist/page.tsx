'use client';

import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/{admin,search,lookbook,cart,checkout,profile,journal}/product-card';
import { useLanguage } from '@/lib/language-context';
import { useWishlist } from '@/lib/wishlist-context';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function WishlistPage() {
  const { wishlistItems, clearWishlist, removeFromWishlist } = useWishlist();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="mb-4 flex items-center gap-3 text-3xl font-bold">
              <Heart className="h-8 w-8 text-red-500" />
              {t('wishlist')}
            </h1>
            <p className="text-gray-600">
              {wishlistItems.length === 0
                ? t('empty_wishlist')
                : `${wishlistItems.length} ${wishlistItems.length === 1 ? t('one_item') : t('multiple_items')} ${t('in_wishlist')}`}
            </p>
          </div>

          {wishlistItems.length === 0 ? (
            <div className="py-16 text-center">
              <div className="mb-6">
                <Heart className="mx-auto mb-4 h-24 w-24 text-gray-300" />
                <h2 className="mb-2 text-2xl font-semibold text-gray-700">
                  {t('empty_wishlist')}
                </h2>
                <p className="mx-auto max-w-md text-gray-500">
                  {t('add_to_wishlist')}
                </p>
              </div>
              <div className="gap-3 space-y-4">
                <Link href="/catalog">
                  <Button className="bg-black px-8 py-3 text-white hover:bg-gray-800">
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    {t('go_to_shopping')}
                  </Button>
                </Link>
                <div className="mt-4">
                  <Link
                    href="/"
                    className="mt-2 text-gray-600 underline hover:text-gray-800"
                  >
                    {t('go_to_home')}
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Actions Bar */}
              <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-4">
                  <Button variant="outline" className="bg-transparent">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    {t('add_all_to_cart')}
                  </Button>
                </div>
                <Button
                  variant="outline"
                  onClick={clearWishlist}
                  className="border-red-600 bg-transparent text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  {t('clear_wishlist')}
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {wishlistItems.map((item) => (
                  <div key={item.id} className="group relative">
                    <ProductCard
                      id={item.id}
                      image={item.image}
                      price={item.price}
                      title={item.name}
                      badge={item.badge}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromWishlist(item.id)}
                      className="absolute top-2 right-2 bg-white/80 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-white"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="mt-12 border-t pt-8 text-center">
                <Link href="/catalog">
                  <Button
                    variant="outline"
                    className="bg-transparent px-8 py-2"
                  >
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    {t('continue_shopping')}
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
