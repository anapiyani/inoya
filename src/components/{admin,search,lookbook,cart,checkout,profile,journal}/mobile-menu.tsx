'use client';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/language-context';
import { X } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { language, setLanguage, t } = useLanguage();

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
        <div className="p-6">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-xl font-bold">INOYÁ</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-6 w-6" />
            </Button>
          </div>

          <nav className="space-y-6">
            <a href="#" className="block text-lg hover:text-gray-600">
              NEW
            </a>
            <a href="#" className="block text-lg hover:text-gray-600">
              КОРСЕТЫ
            </a>
            <a href="#" className="block text-lg hover:text-gray-600">
              ПЛАТЬЯ
            </a>
            <a href="#" className="block text-lg hover:text-gray-600">
              КОМПЛЕКТЫ
            </a>
            <a href="#" className="block text-lg hover:text-gray-600">
              LOOKBOOK
            </a>
            <a href="#" className="block text-lg hover:text-gray-600">
              ПРИМЕРОЧНАЯ
            </a>
          </nav>

          <div className="mt-12 space-y-4">
            <a href="#" className="block text-sm text-gray-600">
              Доставка и оплата
            </a>
            <a href="#" className="block text-sm text-gray-600">
              Возврат и обмен
            </a>
            <a href="#" className="block text-sm text-gray-600">
              Контакты
            </a>
          </div>
          <div>
            <Button
              variant={language === 'en' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLanguage('en')}
            >
              {t('language.en')}
            </Button>
            <Button
              variant={language === 'ru' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLanguage('ru')}
            >
              {t('language.ru')}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
