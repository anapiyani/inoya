'use client';

import { createContext, type ReactNode, useContext, useState } from 'react';

type Language = 'en' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    'nav.home': 'Home',
    catalog: 'Catalog',
    newArrivals: 'New Arrivals',
    all: 'All',
    dress: 'Dresses',
    corsets: 'Corsets',
    skirts: 'Skirts',
    tops_blouses: 'Tops & Blouses',
    sleeves: 'Sleeves',
    outerwear: 'Outerwear',
    wedding_dresses: 'Wedding Dresses',
    lookbook_sets: 'Lookbook/Sets',
    accessories: 'Accessories',
    shoes: 'Shoes',
    sale: 'Sale',
    sizing_guide: 'Sizing Guide',
    tailoring_to_measure: 'Tailoring to Measure',
    gift_certificates: 'Gift Certificates',
    inoyas_journal: 'INOYÁ Journal',
    inoyas_girls: "INOYÁ'S Girls",
    delivery_and_payment: 'Delivery and Payment',
    refund_policy: 'Refund Policy',
    support_center: 'Support Center',
    Show_new_arrivals: 'Show New Arrivals',
    cooperation: 'Cooperation',
    goodsCatalog: 'Goods Catalog',
    go_to_the_catalog: 'Browse Catalog',
    loadMore: 'Load More',
    faq: 'FAQ',
    adress_of_the_company:
      'Adress: Kazakhstan, Almaty, Al-Farabi Avenue, 47/79, № 2, 9th floor, office 39.',
    look_at_lookbook:
      'Look through our lookbook, where you will find curated outfits and collections that help you create a unique and stylish look',
    about_us: 'About Us',
    go_to_the_lookbook: 'Browse Lookbook',
    'language.en': 'EN',
    'language.ru': 'RU',
  },
  ru: {
    'nav.home': 'Главная',
    catalog: 'Каталог',
    go_to_the_catalog: 'Перейти в каталог',
    newArrivals: 'Новинки',
    loadMore: 'Загрузить еще',
    goodsCatalog: 'Каталог товаров',
    all: 'Все',
    dress: 'Платья',
    corsets: 'Корсеты',
    Show_new_arrivals: 'Показать новинки',
    skirts: 'Юбки',
    tops_blouses: 'Топы и блузы',
    sleeves: 'Рукава',
    outerwear: 'Верхняя одежда',
    wedding_dresses: 'Свадебные платья',
    lookbook_sets: 'Лукбук/Сеты',
    accessories: 'Аксессуары',
    shoes: 'Обувь',
    sale: 'Распродажа',
    sizing_guide: 'Размерная сетка',
    tailoring_to_measure: 'Пошив на заказ',
    gift_certificates: 'Подарочные сертификаты',
    inoyas_journal: 'Журнал INOYÁ',
    inoyas_girls: 'Девочки INOYÁ',
    delivery_and_payment: 'Доставка и оплата',
    refund_policy: 'Политика возврата',
    support_center: 'Центр поддержки',
    cooperation: 'Сотрудничество',
    faq: 'Часто задаваемые вопросы',
    adress_of_the_company:
      'Казахстан, г. Алматы, проспект Аль-Фараби, 47/79, № 2, 9-й этаж, офис 39.',
    look_at_lookbook:
      'Просмотрите наш lookbook, где вы вы найдете подобранные образы и коллекции, которые помогут вам создать уникальный и модный образ',
    about_us: 'О нас',
    go_to_the_lookbook: 'Перейти на страницу lookbook',
    'language.en': 'EN',
    'language.ru': 'RU',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ru');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
