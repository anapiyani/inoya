'use client';

import Link from 'next/link';
import { WishlistButton } from './wishlist-button';

interface ProductCardProps {
  id?: string;
  image: string;
  price: string;
  title: string;
  badge?: string;
  className?: string;
  showWishlistButton?: boolean;
}

export function ProductCard({
  id,
  image,
  price,
  title,
  badge,
  className,
  showWishlistButton = true,
}: ProductCardProps) {
  const cardContent = (
    <div className={`group relative cursor-pointer ${className}`}>
      <div className="relative mb-4 aspect-[3/4] overflow-hidden bg-gray-100">
        {badge && (
          <div className="absolute top-4 right-4 z-10 rounded-full bg-black px-3 py-1 text-sm text-white">
            {badge}
          </div>
        )}
        {showWishlistButton && id && (
          <div className="absolute top-2 left-2 z-10 opacity-0 transition-opacity group-hover:opacity-100">
            <WishlistButton
              product={{
                id,
                name: title,
                price,
                image,
                badge,
              }}
              variant="ghost"
              className="bg-white/80 hover:bg-white"
            />
          </div>
        )}
        <img
          src={image || '/placeholder.svg'}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="text-center">
        <p className="mb-1 text-lg font-semibold">{price}</p>
        <p className="text-sm text-gray-600">{title}</p>
      </div>
    </div>
  );

  // If id is provided, wrap with Link for navigation
  if (id) {
    return (
      <Link href={`/product/${id}`} className="block">
        {cardContent}
      </Link>
    );
  }

  // If no id, return the card without navigation
  return cardContent;
}
