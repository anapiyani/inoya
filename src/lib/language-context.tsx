'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    'nav.home': 'Home',
    'nav.search': 'Search',
    'nav.lookbook': 'Lookbook',
    'nav.journal': 'Journal',
    'nav.girls': "Inoya's Girls",
    'hero.title': 'Welcome to Inoya',
    'hero.subtitle': 'Discover beautiful, elegant dresses for every occasion. From casual day wear to stunning evening gowns.',
    'button.shopNow': 'Shop Now',
    'button.viewLookbook': 'View Lookbook',
    'card.newArrivals': 'New Arrivals',
    'card.newArrivals.desc': 'Check out our latest collection of stunning dresses',
    'card.lookbook': 'Lookbook & Sets',
    'card.lookbook.desc': 'Curated style collections and complete outfits',
    'card.journal': "Inoya's Journal",
    'card.journal.desc': 'Fashion stories, style tips, and inspiration',
    'button.exploreNew': 'Explore New',
    'button.viewSets': 'View Sets',
    'button.readMore': 'Read More',
    'footer.rights': '© 2024 Inoya. All rights reserved.',
    'language.en': 'EN',
    'language.ru': 'RU'
  },
  ru: {
    'nav.home': 'Главная',
    'nav.search': 'Поиск',
    'nav.lookbook': 'Лукбук',
    'nav.journal': 'Журнал',
    'nav.girls': 'Девочки Inoya',
    'hero.title': 'Добро пожаловать в Inoya',
    'hero.subtitle': 'Откройте для себя красивые, элегантные платья на любой случай. От повседневной одежды до потрясающих вечерних нарядов.',
    'button.shopNow': 'Купить сейчас',
    'button.viewLookbook': 'Посмотреть лукбук',
    'card.newArrivals': 'Новинки',
    'card.newArrivals.desc': 'Посмотрите нашу новую коллекцию потрясающих платьев',
    'card.lookbook': 'Лукбук и образы',
    'card.lookbook.desc': 'Кураторские коллекции стилей и полные образы',
    'card.journal': 'Журнал Inoya',
    'card.journal.desc': 'Истории моды, советы по стилю и вдохновение',
    'button.exploreNew': 'Изучить новинки',
    'button.viewSets': 'Посмотреть образы',
    'button.readMore': 'Читать далее',
    'footer.rights': '© 2024 Inoya. Все права защищены.',
    'language.en': 'EN',
    'language.ru': 'RU'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

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
