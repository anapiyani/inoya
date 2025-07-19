'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { Sun, Moon, ShoppingBag, Search, User } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export default function HomePage() {
  const { setTheme, theme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Inoya</h1>
          
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-primary">{t('nav.home')}</Link>
            <Link href="/search" className="hover:text-primary">{t('nav.search')}</Link>
            <Link href="/lookbook" className="hover:text-primary">{t('nav.lookbook')}</Link>
            <Link href="/journal" className="hover:text-primary">{t('nav.journal')}</Link>
            <Link href="/girls" className="hover:text-primary">{t('nav.girls')}</Link>
          </nav>

          <div className="flex items-center space-x-2">
            {/* Language Switcher */}
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
            
            <Button variant="ghost" size="icon">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingBag className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">{t('hero.title')}</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg">{t('button.shopNow')}</Button>
            <Button variant="outline" size="lg">{t('button.viewLookbook')}</Button>
          </div>
        </div>
      </section>

      {/* Featured Sections */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>{t('card.newArrivals')}</CardTitle>
                <CardDescription>
                  {t('card.newArrivals.desc')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">{t('button.exploreNew')}</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{t('card.lookbook')}</CardTitle>
                <CardDescription>
                  {t('card.lookbook.desc')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline">{t('button.viewSets')}</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{t('card.journal')}</CardTitle>
                <CardDescription>
                  {t('card.journal.desc')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline">{t('button.readMore')}</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">
            {t('footer.rights')}
          </p>
        </div>
      </footer>
    </div>
  );
}
