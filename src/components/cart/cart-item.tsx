'use client';

import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cart-count-context';
import { useWishlist } from '@/lib/wishlist-context';
import { useCurrency } from '@/lib/currency-context';
import { Heart, Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CartItemProps {
  item: {
    id: string;
    productId: string;
    name: string;
    price: number;
    image: string;
    color: string;
    size: string;
    quantity: number;
    badge?: string;
  };
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const { addToWishlist } = useWishlist();
  const { formatPrice } = useCurrency();

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(item.id, newQuantity);
  };

  const handleMoveToWishlist = () => {
    addToWishlist({
      id: item.productId,
      name: item.name,
      price: formatPrice(item.price),
      image: item.image,
      badge: item.badge,
    });
    removeFromCart(item.id);
  };

  return (
    <div className="flex gap-4 border-b border-gray-200 py-6 last:border-b-0">
      {/* Product Image */}
      <div className="flex-shrink-0">
        <Link href={`/product/${item.productId}`}>
          <div className="relative h-32 w-24 overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={item.image || '/placeholder.svg'}
              alt={item.name}
              fill
              className="object-cover"
            />
            {item.badge && (
              <div className="absolute top-1 right-1 rounded bg-black px-1 py-0.5 text-xs text-white">
                {item.badge}
              </div>
            )}
          </div>
        </Link>
      </div>

      {/* Product Details */}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Link href={`/product/${item.productId}`}>
              <h3 className="cursor-pointer text-lg font-medium text-gray-900 hover:text-gray-700">
                {item.name}
              </h3>
            </Link>
            <div className="mt-1 text-sm text-gray-500">
              <p>Цвет: {item.color}</p>
              <p>Размер: {item.size}</p>
            </div>
            <p className="mt-2 text-lg font-semibold text-gray-900">
              {formatPrice(item.price)}
            </p>
          </div>

          {/* Remove Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeFromCart(item.id)}
            className="text-gray-400"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Quantity and Actions */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="h-8 w-8"
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center font-medium">{item.quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="h-8 w-8"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleMoveToWishlist}
            className="text-gray-600"
          >
            <Heart className="mr-1 h-4 w-4" />В избранное
          </Button>
        </div>

        {/* Item Total */}
        <div className="mt-2 text-right">
          <p className="text-lg font-semibold">
            {formatPrice(item.price * item.quantity)}
          </p>
        </div>
      </div>
    </div>
  );
}
