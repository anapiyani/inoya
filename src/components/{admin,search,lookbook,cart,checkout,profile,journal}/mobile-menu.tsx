'use client';

import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/language-context';
import { ChevronDown, ChevronRight, X } from 'lucide-react';
import { useState } from 'react';
import { catalogItems } from '../product/catalog';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { language, setLanguage, t } = useLanguage();
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);

  return (
    <>
      {isOpen && (
        <div
          className="bg-opacity-30 fixed inset-0 z-40 bg-gray-200 dark:bg-gray-700"
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
              <h2 className="text-xl font-bold">INOYÁ</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-6 w-6" />
              </Button>
            </div>

            <nav className="space-y-4 overflow-y-auto">
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
                      >
                        {t(item.label)}
                      </a>
                    ))}
                  </div>
                )}
              </div>
              <a href="#" className="block text-lg hover:text-gray-600">
                {t('lookbook_sets')}
              </a>
              <a href="#" className="block text-lg hover:text-gray-600">
                {t('accessories')}
              </a>
              <a href="#" className="block text-lg hover:text-gray-600">
                {t('shoes')}
              </a>
              <a href="#" className="block text-lg hover:text-gray-600">
                {t('sizing_guide')}
              </a>
              <a href="#" className="block text-lg hover:text-gray-600">
                {t('tailoring_to_measure')}
              </a>
              <a href="#" className="block text-lg hover:text-gray-600">
                {t('inoyas_journal')}
              </a>
              <a href="#" className="block text-lg hover:text-gray-600">
                {t('inoyas_girls')}
              </a>

              <div className="mt-6 border-t border-gray-200 pt-4">
                <a
                  href="#"
                  className="block text-sm text-gray-600 hover:text-gray-800"
                >
                  {t('delivery_and_payment')}
                </a>
                <a
                  href="#"
                  className="mt-2 block text-sm text-gray-600 hover:text-gray-800"
                >
                  {t('refund_policy')}
                </a>
                <a
                  href="#"
                  className="mt-2 block text-sm text-gray-600 hover:text-gray-800"
                >
                  {t('support_center')}
                </a>
                <a
                  href="#"
                  className="mt-2 block text-sm text-gray-600 hover:text-gray-800"
                >
                  {t('cooperation')}
                </a>
                <a
                  href="#"
                  className="mt-2 block text-sm text-gray-600 hover:text-gray-800"
                >
                  {t('faq')}
                </a>
                <a
                  href="#"
                  className="mt-2 block text-sm text-gray-600 hover:text-gray-800"
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
