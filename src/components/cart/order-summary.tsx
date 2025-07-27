'use client';

import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cart-count-context';
import { useState } from 'react';

export function OrderSummary() {
  const { getCartTotal, cartItems } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const subtotal = getCartTotal();
  const shipping = subtotal > 50000 ? 0 : 2000;
  const total = subtotal - discount + shipping;

  const handleApplyPromo = () => {
    // Mock promo code logic
    if (promoCode.toLowerCase() === 'save10') {
      setDiscount(subtotal * 0.1);
    } else if (promoCode.toLowerCase() === 'welcome') {
      setDiscount(5000);
    } else {
      alert('Промокод не найден');
    }
  };

  const handleCheckout = () => {
    // Checkout logic
    console.log('Proceeding to checkout with items:', cartItems);
    alert('Переход к оформлению заказа...');
  };

  return (
    <div className="rounded-lg bg-gray-50 p-6">
      <h3 className="mb-4 text-lg font-semibold">Итого по заказу</h3>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Товары ({cartItems.length})</span>
          <span>{subtotal.toLocaleString()} тг</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Скидка</span>
            <span>-{discount.toLocaleString()} тг</span>
          </div>
        )}

        <div className="flex justify-between">
          <span>Доставка</span>
          <span>
            {shipping === 0 ? 'Бесплатно' : `${shipping.toLocaleString()} тг`}
          </span>
        </div>

        <div className="border-t pt-3">
          <div className="flex justify-between text-lg font-semibold">
            <span>Итого</span>
            <span>{total.toLocaleString()} тг</span>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <Button
        onClick={handleCheckout}
        className="mt-6 w-full bg-black py-3 text-white hover:bg-gray-800"
      >
        Оформить заказ
      </Button>

      {/* Free Shipping Notice */}
      {shipping > 0 && (
        <p className="mt-3 text-center text-sm text-gray-600">
          Добавьте товаров на {(50000 - subtotal).toLocaleString()} тг для
          бесплатной доставки
        </p>
      )}
    </div>
  );
}
