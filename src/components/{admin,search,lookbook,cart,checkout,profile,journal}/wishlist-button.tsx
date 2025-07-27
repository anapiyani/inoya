'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import { useWishlist } from '@/lib/wishlist-context';
import { Heart } from 'lucide-react';

interface WishlistButtonProps {
  product: {
    id: string;
    name: string;
    price: string;
    image: string;
    badge?: string;
  };
  size?: 'sm' | 'default' | 'lg' | 'icon';
  variant?: 'default' | 'outline' | 'ghost';
  className?: string;
}

export function WishlistButton({
  product,
  size = 'icon',
  variant = 'outline',
  className,
}: WishlistButtonProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isLiked = isInWishlist(product.id);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLiked) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleToggle}
      className={`${isLiked ? 'border-red-500 text-red-500' : ''} ${className}`}
    >
      <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
    </Button>
  );
}
