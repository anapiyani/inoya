'use client';

import { Header } from '@/components/layout/header';
import { ColorSelector } from '@/components/product/color-selector';
import { ImageGallery } from '@/components/product/image-gallery';
import {
  mockProduct,
  mockShoeProduct,
  similarProducts,
  type Product,
} from '@/components/product/product-data';
import { QuantitySelector } from '@/components/product/quantity-selector';
import { ReviewsSection } from '@/components/product/reviews-section';
import { SizeSelector } from '@/components/product/size-selector';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/{admin,search,lookbook,cart,checkout,profile,journal}/product-card';
import { useCart } from '@/lib/cart-count-context';
import { useLanguage } from '@/lib/language-context';
import { useWishlist } from '@/lib/wishlist-context';
import {
  Heart,
  RotateCcw,
  Shield,
  ShoppingCart,
  Truck,
  Zap,
} from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function ProductPage() {
  const { t } = useLanguage();
  const params = useParams();
  const productId = params.id as string;

  const product: Product = productId === '2' ? mockShoeProduct : mockProduct;

  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleColorChange = (colorName: string) => {
    const variant = product.variants.find((v) => v.color === colorName);
    if (variant) {
      setSelectedVariant(variant);
      setSelectedSize('');
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Пожалуйста, выберите размер');
      return;
    }

    addToCart({
      productId: product.id,
      name: product.name,
      price: selectedVariant.price,
      image: selectedVariant.images[0],
      color: selectedVariant.color,
      size: selectedSize,
      quantity,
      badge: product.badge,
    });

    alert('Товар добавлен в корзину!');
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert('Пожалуйста, выберите размер');
      return;
    }
    // Buy now logic
    console.log('Buy now:', {
      product: product.name,
      variant: selectedVariant.color,
      size: selectedSize,
      quantity,
    });
    alert('Переход к оформлению заказа...');
  };

  const availableSizes = selectedVariant.sizes.filter((s) => s.inStock);
  const isInStock = availableSizes.length > 0;

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <nav className="mb-8 text-sm text-gray-600">
            <a href="/" className="hover:text-gray-900">
              {t('home')}
            </a>
            <span className="mx-2">/</span>
            <a href="/catalog" className="hover:text-gray-900">
              {t('catalog')}
            </a>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <ImageGallery
                images={selectedVariant.images}
                productName={product.name}
              />
            </div>

            <div className="space-y-6">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  {product.isNew && <Badge variant="secondary">NEW</Badge>}
                  {product.badge && (
                    <Badge variant="destructive">
                      {product.badge.toUpperCase()}
                    </Badge>
                  )}
                </div>
                <h1 className="mb-2 text-3xl font-bold">{product.name}</h1>
                <p className="text-gray-600">{product.description}</p>
              </div>

              {/* Price */}
              <div className="text-3xl font-bold">
                {selectedVariant.price.toLocaleString()} тг
                {!isInStock && (
                  <span className="ml-2 text-lg text-red-600">
                    ({t('out_of_stock')})
                  </span>
                )}
              </div>

              {/* Color Selection */}
              <ColorSelector
                colors={product.variants.map((v) => ({
                  name: v.color,
                  code: v.colorCode,
                }))}
                selectedColor={selectedVariant.color}
                onColorChange={handleColorChange}
              />

              {/* Size Selection */}
              <SizeSelector
                sizes={selectedVariant.sizes}
                selectedSize={selectedSize}
                onSizeChange={setSelectedSize}
                category={product.category}
              />

              {/* Quantity */}
              <QuantitySelector
                quantity={quantity}
                onQuantityChange={setQuantity}
              />

              {/* Action Buttons */}
              <div className="space-y-3">
                <div className="flex gap-3">
                  <Button
                    onClick={handleAddToCart}
                    disabled={!isInStock}
                    className="flex-1 bg-black text-white hover:bg-gray-800"
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    {t('addToCart')}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      isInWishlist(product.id)
                        ? removeFromWishlist(product.id)
                        : addToWishlist({
                            id: product.id,
                            name: product.name,
                            image: selectedVariant.images[0],
                            price: selectedVariant.price.toLocaleString(),
                            badge: product.badge,
                          })
                    }
                    className={
                      isInWishlist(product.id)
                        ? 'border-red-500 text-red-500'
                        : ''
                    }
                  >
                    <Heart
                      className={`h-5 w-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`}
                    />
                  </Button>
                </div>
                <Button
                  onClick={handleBuyNow}
                  disabled={!isInStock}
                  variant="outline"
                  className="w-full border-black bg-transparent text-black hover:bg-black hover:text-white"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  {t('buy_now')}
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 gap-4 border-t pt-6 sm:grid-cols-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Truck className="h-4 w-4" />
                  <span>{t('free_shipping')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <RotateCcw className="h-4 w-4" />
                  <span>{t('returns_14_days')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield className="h-4 w-4" />
                  <span>{t('quality_guarantee')}</span>
                </div>
              </div>
            </div>
          </div>
          <ReviewsSection
            reviews={product.reviews}
            averageRating={product.averageRating}
            totalReviews={product.totalReviews}
          />
          <div className="mt-16">
            <h3 className="mb-8 text-2xl font-bold">{t('similar_products')}</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {similarProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  image={product.image}
                  price={product.price}
                  title={product.name}
                  badge={product.badge}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
