'use client';

import Link from 'next/link';

interface ProductCardProps {
  id?: string;
  image: string;
  price: string;
  title: string;
  badge?: string;
  className?: string;
}

export function ProductCard({
  id,
  image,
  price,
  title,
  badge,
  className,
}: ProductCardProps) {
  const cardContent = (
    <div className={`group cursor-pointer ${className}`}>
      <div className="relative mb-4 aspect-[3/4] overflow-hidden bg-gray-100">
        {badge && (
          <div className="absolute top-4 right-4 z-10 rounded-full bg-black px-3 py-1 text-sm text-white">
            {badge}
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

  if (id) {
    return (
      <Link href={`/product/${id}`} className="block">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
