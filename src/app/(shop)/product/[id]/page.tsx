'use client';

import { Header } from '@/components/layout/header';
import { ColorSelector } from '@/components/product/color-selector';
import { ImageGallery } from '@/components/product/image-gallery';
import { QuantitySelector } from '@/components/product/quantity-selector';
import { SizeSelector } from '@/components/product/size-selector';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useProduct } from '@/hooks/use-product';
import { useCart } from '@/lib/cart-count-context';
import { useLanguage } from '@/lib/language-context';
import { useCurrency } from '@/lib/currency-context';
import { useWishlist } from '@/lib/wishlist-context';
import {
  Heart,
  Loader2,
  RotateCcw,
  Shield,
  ShoppingCart,
  Truck,
  Zap,
} from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

interface ApiColor {
  name: string;
  hexCode: string;
}

interface ApiSize {
  name: string;
  value: string;
  inStock: boolean;
}

interface ApiProduct {
  _id: string;
  name: string;
  description: string;
  colors: ApiColor[];
  sizes: ApiSize[];
  price: number;
  photo: string[];
  badge: string;
  category: string;
  subcategory: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    product: ApiProduct;
  };
}

export default function ProductPage() {
  const { t } = useLanguage();
  const { formatPrice } = useCurrency();
  const params = useParams();
  const productId = params.id as string;

  // Use your backend hook
  const { data: apiResponse, isLoading, error } = useProduct(productId);

  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();

  // Transform API data to component format
  const product = useMemo(() => {
    if (!apiResponse) return null;

    const apiProduct = apiResponse.product;
    return {
      id: apiProduct._id,
      name: apiProduct.name,
      description: apiProduct.description,
      price: apiProduct.price,
      images: apiProduct.photo,
      colors: apiProduct.colors,
      sizes: apiProduct.sizes,
      badge: apiProduct.badge,
      category: apiProduct.category,
      subcategory: apiProduct.subcategory,
      isNew: false, // You can add logic to determine if product is new
      isActive: apiProduct.isActive,
      // Mock data for features not in API
      averageRating: 4.5,
      totalReviews: 128,
      reviews: [
        {
          id: '1',
          user: 'Анна К.',
          rating: 5,
          comment: 'Отличное качество! Очень довольна покупкой.',
          date: '2024-01-15',
        },
        {
          id: '2',
          user: 'Максим П.',
          rating: 4,
          comment: 'Хорошая вещь, но размер маловат.',
          date: '2024-01-10',
        },
      ],
    };
  }, [apiResponse]);

  useEffect(() => {
    if (product?.colors && product.colors.length > 0 && !selectedColor) {
      setSelectedColor(product.colors[0].name);
    }
  }, [product, selectedColor]);

  const handleColorChange = (colorName: string) => {
    setSelectedColor(colorName);
    setSelectedSize(''); // Reset size selection when color changes
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error(t('please_select_size'), {
        duration: 3000,
        style: {
          background: '#fff',
          color: '#000',
          border: '1px solid #ccc',
        },
        iconTheme: {
          primary: '#FF0000',
          secondary: '#fff',
        },
        ariaProps: {
          role: 'alert',
          'aria-live': 'assertive',
        },
      });
      return;
    }

    if (!product) return;

    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      color: selectedColor,
      size: selectedSize,
      quantity,
      badge: product.badge,
    });

    toast.success(`${t('added_to_cart')} ${product.name}`, {
      duration: 3000,
      style: {
        background: '#fff',
        color: '#000',
        border: '1px solid #ccc',
      },
      iconTheme: {
        primary: '#4CAF50',
        secondary: '#fff',
      },
      ariaProps: {
        role: 'status',
        'aria-live': 'polite',
      },
    });
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      toast.error(t('please_select_size'), {
        duration: 3000,
        style: {
          background: '#fff',
          color: '#000',
          border: '1px solid #ccc',
        },
        iconTheme: {
          primary: '#FF0000',
          secondary: '#fff',
        },
        ariaProps: {
          role: 'alert',
          'aria-live': 'assertive',
        },
      });
      return;
    }

    console.log('Buy now:', {
      product: product?.name,
      color: selectedColor,
      size: selectedSize,
      quantity,
    });
    alert('Переход к оформлению заказа...');
  };

  const handleWishlistToggle = () => {
    if (!product) return;

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        image: product.images[0],
        price: formatPrice(product.price),
        badge: product.badge,
      });
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="flex min-h-[400px] items-center justify-center">
              <div className="flex items-center gap-2">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span>Загрузка продукта...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="flex min-h-[400px] items-center justify-center">
              <div className="text-center">
                <h2 className="mb-2 text-2xl font-bold">Продукт не найден</h2>
                <p className="text-gray-600">
                  К сожалению, продукт с данным ID не существует или произошла
                  ошибка.
                </p>
                <Button
                  onClick={() => window.history.back()}
                  className="mt-4"
                  variant="outline"
                >
                  Вернуться назад
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const availableSizes = product.sizes?.filter((s) => s.inStock) ?? [];
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
                images={product.images}
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
                {formatPrice(product.price)}
                {!isInStock && (
                  <span className="ml-2 text-lg text-red-600">
                    ({t('out_of_stock')})
                  </span>
                )}
              </div>

              {/* Color Selection */}
              <ColorSelector
                colors={
                  product.colors?.map((color) => ({
                    name: color.name,
                    code: color.hexCode,
                  })) ?? []
                }
                selectedColor={selectedColor}
                onColorChange={handleColorChange}
              />

              {/* Size Selection */}
              <SizeSelector
                sizes={
                  product.sizes
                    ? product.sizes.map((s) => ({
                        size: s.value,
                        inStock: s.inStock,
                      }))
                    : []
                }
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
                    onClick={handleWishlistToggle}
                    className={
                      isInWishlist(product.id)
                        ? 'border-red-500 text-red-500'
                        : ''
                    }
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        isInWishlist(product.id) ? 'fill-current' : ''
                      }`}
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

          {/* Reviews Section */}
          {/* <ReviewsSection
            reviews={product.reviews}
            averageRating={product.averageRating}
            totalReviews={product.totalReviews}
          /> */}

          {/* Similar Products - You'll need to implement this API call separately */}
          {/* <div className="mt-16">
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
          </div> */}
        </div>
      </div>
    </div>
  );
}
