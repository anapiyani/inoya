'use client';

import { CartItem } from '@/components/cart/cart-item';
import { OrderSummary } from '@/components/cart/order-summary';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/{admin,search,lookbook,cart,checkout,profile,journal}/product-card';
import { useCart } from '@/lib/cart-count-context';
import { ArrowLeft, ShoppingBag, Trash2 } from 'lucide-react';
import Link from 'next/link';

// Mock recommended products
const recommendedProducts = [
  {
    id: '7',
    name: 'Корсет кружевной',
    price: '25 900 тг',
    image: '/placeholder.svg?height=400&width=300',
  },
  {
    id: '8',
    name: 'Корсет атласный',
    price: '19 900 тг',
    image: '/placeholder.svg?height=400&width=300',
  },
  {
    id: '9',
    name: 'Корсет с пайетками',
    price: '32 900 тг',
    image: '/placeholder.svg?height=400&width=300',
    badge: 'new',
  },
  {
    id: '10',
    name: 'Корсет винтажный',
    price: '28 900 тг',
    image: '/placeholder.svg?height=400&width=300',
  },
];

export default function CartPage() {
  const { cartItems, clearCart } = useCart();

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="mb-4 flex items-center gap-4">
              <Link href="/catalog">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="flex items-center gap-3 text-3xl font-bold">
                <ShoppingBag className="h-8 w-8" />
                Корзина
              </h1>
            </div>
            <p className="text-gray-600">
              {cartItems.length === 0
                ? 'Ваша корзина пуста'
                : `${cartItems.length} ${cartItems.length === 1 ? 'товар' : 'товаров'} в корзине`}
            </p>
          </div>

          {/* Empty State */}
          {cartItems.length === 0 ? (
            <div className="py-16 text-center">
              <div className="mb-6">
                <ShoppingBag className="mx-auto mb-4 h-24 w-24 text-gray-300" />
                <h2 className="mb-2 text-2xl font-semibold text-gray-700">
                  Ваша корзина пуста
                </h2>
                <p className="mx-auto max-w-md text-gray-500">
                  Добавьте товары в корзину, чтобы оформить заказ. У нас есть
                  много красивых вещей для вас!
                </p>
              </div>
              <div className="space-y-4">
                <Link href="/catalog">
                  <Button className="bg-black px-8 py-3 text-white hover:bg-gray-800">
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Перейти к покупкам
                  </Button>
                </Link>
                <div>
                  <Link
                    href="/"
                    className="text-gray-600 underline hover:text-gray-800"
                  >
                    Вернуться на главную
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="rounded-lg border bg-white">
                  <div className="p-6">
                    <div className="mb-6 flex items-center justify-between">
                      <h2 className="text-xl font-semibold">
                        Товары в корзине
                      </h2>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={clearCart}
                        className="border-red-600 bg-transparent text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Очистить корзину
                      </Button>
                    </div>

                    <div className="space-y-0">
                      {cartItems.map((item) => (
                        <CartItem key={item.id} item={item} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Continue Shopping */}
                <div className="mt-6">
                  <Link href="/catalog">
                    <Button variant="outline" className="bg-transparent">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Продолжить покупки
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <OrderSummary />
              </div>
            </div>
          )}

          {/* Recommended Products */}
          {cartItems.length > 0 && (
            <div className="mt-16">
              <h3 className="mb-8 text-2xl font-bold">Рекомендуем также</h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {recommendedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    image={product.image}
                    price={product.price}
                    title={product.name}
                    badge={product.badge}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
