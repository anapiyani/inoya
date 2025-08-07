'use client';

import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/language-context';
import { ChevronDown, ChevronRight, X } from 'lucide-react';
import { Great_Vibes } from 'next/font/google';
import Link from 'next/link';
import { useState } from 'react';
import { CurrencySelector } from '../ui/currency-selector';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
});

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { language, setLanguage, t } = useLanguage();
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);

  const catalogItems = [
    { label: 'newArrivals', href: '/catalog?category=newArrivals' },
    { label: 'all', href: '/catalog' },
    { label: 'dress', href: '/catalog?category=dress' },
    { label: 'corsets', href: '/catalog?category=corsets' },
    { label: 'skirts', href: '/catalog?category=skirts' },
    { label: 'tops_blouses', href: '/catalog?category=tops_blouses' },
    { label: 'sleeves', href: '/catalog?category=sleeves' },
    { label: 'outerwear', href: '/catalog?category=outerwear' },
    { label: 'wedding_dresses', href: '/catalog?category=wedding_dresses' },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="bg-opacity-30 fixed inset-0 z-50 bg-gray-200 dark:bg-gray-700"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-80 transform bg-white transition-transform duration-300 ease-in-out dark:bg-black ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="p-6">
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Link
                  href="/"
                  className={`${greatVibes.className} text-[28px] leading-none tracking-wide`}
                >
                  Inoyá
                </Link>
                <CurrencySelector />
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-6 w-6" />
              </Button>
            </div>

            <nav className="space-y-4 overflow-y-auto">
              {/* Catalog Section */}
              <div>
                <button
                  onClick={() => setIsCatalogOpen(!isCatalogOpen)}
                  className="flex w-full items-center justify-between text-left text-lg font-semibold hover:text-gray-600"
                >
                  {t('catalog')}
                  {isCatalogOpen ? (
                    <ChevronDown className="h-5 w-5" />
                  ) : (
                    <ChevronRight className="h-5 w-5" />
                  )}
                </button>

                {isCatalogOpen && (
                  <div className="mt-3 ml-4 space-y-3 border-l border-gray-200 pl-4">
                    {catalogItems.map((item, index) => (
                      <a
                        href={item.href}
                        key={index}
                        className="block text-sm hover:text-gray-600"
                        onClick={onClose}
                      >
                        {t(item.label)}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Other Menu Items */}
              <a
                href="/lookbook"
                className="block text-lg hover:text-gray-600"
                onClick={onClose}
              >
                {t('lookbook_sets')}
              </a>
              <a
                href="/catalog?category=accessories"
                className="block text-lg hover:text-gray-600"
                onClick={onClose}
              >
                {t('accessories')}
              </a>
              <a
                href="/catalog?category=shoes"
                className="block text-lg hover:text-gray-600"
                onClick={onClose}
              >
                {t('shoes')}
              </a>
              <a
                href="/sizing-guide"
                className="block text-lg hover:text-gray-600"
                onClick={onClose}
              >
                {t('sizing_guide')}
              </a>
              <a href="#" className="block text-lg hover:text-gray-600">
                {t('tailoring_to_measure')}
              </a>
              <a
                href="/journal"
                className="block text-lg hover:text-gray-600"
                onClick={onClose}
              >
                {t('inoyas_journal')}
              </a>
              <a
                href="/girls"
                className="block text-lg hover:text-gray-600"
                onClick={onClose}
              >
                {t('inoyas_girls')}
              </a>

              <div className="mt-6 border-t border-gray-200 pt-4">
                <a
                  href="/delivery-payment"
                  className="block text-sm text-gray-600 hover:text-gray-800"
                  onClick={onClose}
                >
                  {t('delivery_and_payment')}
                </a>
                <a
                  href="/refund-policy"
                  className="mt-2 block text-sm text-gray-600 hover:text-gray-800"
                  onClick={onClose}
                >
                  {t('refund_policy')}
                </a>
                <a
                  href="/support-center"
                  className="mt-2 block text-sm text-gray-600 hover:text-gray-800"
                  onClick={onClose}
                >
                  {t('support_center')}
                </a>
                <a
                  href="/cooperation"
                  className="mt-2 block text-sm text-gray-600 hover:text-gray-800"
                  onClick={onClose}
                >
                  {t('cooperation')}
                </a>
                <a
                  href="/faq"
                  className="mt-2 block text-sm text-gray-600 hover:text-gray-800"
                  onClick={onClose}
                >
                  {t('faq')}
                </a>
                <a
                  href="/about-us"
                  className="mt-2 block text-sm text-gray-600 hover:text-gray-800"
                  onClick={onClose}
                >
                  {t('about_us')}
                </a>
              </div>
            </nav>
          </div>

          {/* Language Switcher at Bottom */}
          <div className="mt-auto border-t border-gray-200 p-6">
            <div className="flex space-x-2">
              <Button
                variant={language === 'en' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLanguage('en')}
                className="flex-1"
              >
                {t('language.en')}
              </Button>
              <Button
                variant={language === 'ru' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLanguage('ru')}
                className="flex-1"
              >
                {t('language.ru')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
