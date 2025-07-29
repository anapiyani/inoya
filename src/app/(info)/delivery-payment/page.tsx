'use client';

import { Header } from '@/components/layout/header';
import { useLanguage } from '@/lib/language-context';
import { Clock, CreditCard, Globe, Package, Truck } from 'lucide-react';

export default function DeliveryPaymentPage() {
  const { t } = useLanguage();

  const deliveryMethods = [
    {
      icon: <Truck className="h-8 w-8" />,
      title: t('delivery_standard'),
      time: t('delivery_standard_time'),
      price: t('delivery_standard_price'),
      description: t('delivery_standard_desc'),
    },
    {
      icon: <Package className="h-8 w-8" />,
      title: t('delivery_express'),
      time: t('delivery_express_time'),
      price: t('delivery_express_price'),
      description: t('delivery_express_desc'),
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: t('delivery_international'),
      time: t('delivery_international_time'),
      price: t('delivery_international_price'),
      description: t('delivery_international_desc'),
    },
  ];

  const paymentMethods = [
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: t('payment_cards'),
      description: t('payment_cards_desc'),
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold">
              {t('delivery_and_payment')}
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-gray-600">
              {t('delivery_intro')}
            </p>
          </div>

          {/* Delivery Section */}
          <div className="mb-16">
            <h2 className="mb-8 text-center text-3xl font-bold">
              {t('delivery')}
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {deliveryMethods.map((method, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-gray-50 p-6 text-center"
                >
                  <div className="mb-4 flex justify-center text-gray-600">
                    {method.icon}
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{method.title}</h3>
                  <div className="mb-4">
                    <div className="mb-2 flex items-center justify-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {method.time}
                      </span>
                    </div>
                    <p className="text-lg font-semibold">{method.price}</p>
                  </div>
                  <p className="text-sm text-gray-600">{method.description}</p>
                </div>
              ))}
            </div>

            {/* Free Shipping Notice */}
            <div className="mt-8 rounded-lg border border-green-200 bg-green-50 p-6 text-center">
              <h3 className="mb-2 text-xl font-semibold text-green-800">
                {t('delivery_free_title')}
              </h3>
              <p className="text-green-700">{t('delivery_free_desc')}</p>
            </div>
          </div>

          {/* Payment Section */}
          <div className="mb-16">
            <h2 className="mb-8 text-center text-3xl font-bold">
              {t('payment_methods')}
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {paymentMethods.map((method, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-gray-50 p-6 text-center"
                >
                  <div className="mb-4 flex justify-center text-gray-600">
                    {method.icon}
                  </div>
                  <h3 className="mb-4 text-xl font-semibold">{method.title}</h3>
                  <p className="text-gray-600">{method.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Information */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Delivery Info */}
            <div className="rounded-lg bg-gray-50 p-8">
              <h3 className="mb-6 text-2xl font-bold">
                {t('delivery_info_title')}
              </h3>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-black"></div>
                  <span>{t('delivery_info_1')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-black"></div>
                  <span>{t('delivery_info_2')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-black"></div>
                  <span>{t('delivery_info_3')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-black"></div>
                  <span>{t('delivery_info_4')}</span>
                </li>
              </ul>
            </div>

            {/* Payment Info */}
            <div className="rounded-lg bg-gray-50 p-8">
              <h3 className="mb-6 text-2xl font-bold">
                {t('payment_info_title')}
              </h3>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-black"></div>
                  <span>{t('payment_info_1')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-black"></div>
                  <span>{t('payment_info_2')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-black"></div>
                  <span>{t('payment_info_3')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-black"></div>
                  <span>{t('payment_info_4')}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact for Questions */}
          <div className="mt-16 rounded-lg bg-black p-8 text-center text-white">
            <h3 className="mb-4 text-2xl font-semibold">
              {t('questions_title')}
            </h3>
            <p className="mb-6">{t('questions_text')}</p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button className="rounded bg-white px-6 py-3 text-black transition-colors hover:bg-gray-100">
                WhatsApp
              </button>
              <button className="rounded bg-white px-6 py-3 text-black transition-colors hover:bg-gray-100">
                Telegram
              </button>
              <button className="rounded bg-white px-6 py-3 text-black transition-colors hover:bg-gray-100">
                Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
