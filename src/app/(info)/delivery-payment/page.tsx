'use client';

import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button'; // Import Button for language switch
import { useLanguage } from '@/lib/language-context';
import { Globe, Package, Truck } from 'lucide-react'; // Added Mail and Phone icons
import Link from 'next/link'; // Import Link for navigation

export default function DeliveryPaymentPage() {
  const { t, language, setLanguage } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-4 flex justify-end">
            <Button
              onClick={() => setLanguage(language === 'ru' ? 'en' : 'ru')}
            >
              {language === 'ru'
                ? 'Switch to English'
                : 'Переключить на Русский'}
            </Button>
          </div>

          {/* Page Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold">
              {t('delivery_and_payment_title')}
            </h1>
          </div>

          {/* Delivery Methods Section */}
          <div className="mb-16">
            <h2 className="mb-8 text-center text-3xl font-bold">
              {t('delivery_methods_title')}
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="rounded-lg bg-gray-50 p-6 text-center">
                <div className="mb-4 flex justify-center text-gray-600">
                  <Truck className="h-8 w-8" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">
                  {t('delivery_method_courier')}
                </h3>
              </div>
              <div className="rounded-lg bg-gray-50 p-6 text-center">
                <div className="mb-4 flex justify-center text-gray-600">
                  <Globe className="h-8 w-8" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">
                  {t('delivery_method_international_mail')}
                </h3>
              </div>
              <div className="rounded-lg bg-gray-50 p-6 text-center">
                <div className="mb-4 flex justify-center text-gray-600">
                  <Package className="h-8 w-8" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">
                  {t('delivery_method_express')}
                </h3>
              </div>
            </div>
          </div>

          {/* Cost and Delivery Time Section */}
          <div className="mb-16">
            <h2 className="mb-8 text-center text-3xl font-bold">
              {t('delivery_cost_time_title')}
            </h2>
            <div className="mx-auto max-w-3xl text-center leading-relaxed text-gray-700">
              <p className="mb-4">{t('delivery_cost_auto_calc')}</p>
              <p className="mb-8">{t('delivery_time_varies')}</p>
              <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center">
                <h3 className="mb-2 text-xl font-semibold text-green-800">
                  {t('delivery_free_kz')}
                </h3>
                <p className="text-green-700">
                  {t('delivery_free_international')}
                </p>
              </div>
            </div>
          </div>

          {/* Delivery Terms Section */}
          <div className="mb-16">
            <h2 className="mb-8 text-center text-3xl font-bold">
              {t('delivery_terms_title')}
            </h2>
            <div className="mx-auto max-w-3xl text-center leading-relaxed text-gray-700">
              <p className="mb-4">{t('delivery_terms_order_processing')}</p>
              <p>{t('delivery_terms_holidays')}</p>
            </div>
          </div>

          {/* How to Receive Order Section */}
          <div className="mb-16">
            <h2 className="mb-8 text-center text-3xl font-bold">
              {t('how_to_receive_order_title')}
            </h2>
            <div className="mx-auto max-w-3xl text-center leading-relaxed text-gray-700">
              <p className="mb-4">{t('how_to_receive_post')}</p>
              <p>{t('how_to_receive_courier')}</p>
            </div>
          </div>

          {/* Cancellation and Return Section */}
          <div className="mb-16">
            <h2 className="mb-8 text-center text-3xl font-bold">
              {t('cancellation_return_title')}
            </h2>
            <div className="mx-auto max-w-3xl text-center leading-relaxed text-gray-700">
              <p className="mb-4">{t('cancellation_return_shipping_cost')}</p>
              <p>
                {t('cancellation_return_policy_link')}{' '}
                <Link
                  href="/refund-exchange"
                  className="text-blue-600 hover:underline"
                >
                  {t('refund_policy')}
                </Link>
              </p>
            </div>
          </div>

          {/* Payment Methods Section */}
          <div className="mb-16">
            <h2 className="mb-8 text-center text-3xl font-bold">
              {t('payment_methods_main_title')}
            </h2>
            <div className="mx-auto max-w-3xl text-center leading-relaxed text-gray-700">
              <p className="mb-4">{t('payment_methods_intro')}</p>
              <ul className="mx-auto inline-block list-inside list-disc text-left">
                <li>{t('payment_cards')}</li>
                <li>{t('payment_e_wallets')}</li>
              </ul>
              <p className="mt-6">{t('payment_for_russia')}</p>
            </div>
          </div>

          {/* Contact for Questions */}
          <div className="mt-16 rounded-lg bg-black p-8 text-center text-white">
            <h3 className="mb-4 text-2xl font-semibold">
              {t('support_contacts_title')}
            </h3>
            <p className="mb-6">
              {t('support_email')} inoyahelp@gmail.com
              <br />
              {t('support_phone')}
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button className="rounded bg-white px-6 py-3 text-black transition-colors hover:bg-gray-100">
                WhatsApp
              </button>
              <button className="rounded bg-white px-6 py-3 text-black transition-colors hover:bg-gray-100">
                Telegram
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
