'use client';

import Icons from '@/components/icons/Icons';
import { Header } from '@/components/layout/header';
import { catalogItems } from '@/components/product/catalog';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { CategoryCard } from '@/components/{admin,search,lookbook,cart,checkout,profile,journal}/category-card';
import { ProductCard } from '@/components/{admin,search,lookbook,cart,checkout,profile,journal}/product-card';
import { useLanguage } from '@/lib/language-context';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import heroTwo from '../../public/images/hero-2.jpg';
import heroOne from '../../public/images/hero-bg.jpg';

export default function HomePage() {
  const { t } = useLanguage();
  const carouselImages = [heroOne, heroTwo];
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [mainCatalog, setMainCatalog] = useState([
    { label: 'NEW', href: '#' },
    ...catalogItems,
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-17">
        <section className="relative h-[calc(100vh-4rem)] overflow-hidden">
          <AnimatePresence>
            <motion.div
              key={currentImage}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute inset-0"
            >
              <Image
                src={carouselImages[currentImage]}
                alt="Hero"
                width={1920}
                height={1080}
                priority
                className="h-full w-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute right-30 bottom-20 flex items-center justify-center">
            <Button
              variant={'link'}
              className="px-8 py-4 text-lg font-semibold text-white underline"
            >
              <span className="cursor-pointer text-lg font-semibold text-white uppercase">
                {t('Show_new_arrivals')}
              </span>
            </Button>
          </div>
        </section>

        <section className="px-4 py-16">
          <div className="container mx-auto">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-wider uppercase">
              {t('goodsCatalog')}
            </h2>

            <div className="mb-12 w-full gap-6">
              <Carousel
                opts={{
                  align: 'start',
                  slidesToScroll: 2,
                }}
                className="w-full"
              >
                <CarouselContent className="w-full sm:flex sm:gap-6">
                  {mainCatalog
                    .filter(
                      (item) =>
                        item.label !== 'newArrivals' && item.label !== 'all'
                    )
                    .map((item, index) => (
                      <CarouselItem
                        className="basis-1/2 md:basis-1/3 lg:basis-1/5"
                        key={index}
                      >
                        <CategoryCard
                          key={index}
                          image={'/placeholder.svg?height=400&width=400'}
                          title={item.label}
                          className="md:col-span-1"
                        />
                      </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="hidden sm:block">
                  <CarouselPrevious />
                  <CarouselNext />
                </div>
              </Carousel>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 px-4 py-16">
          <div className="container mx-auto">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-wider">
              BESTSELLERS
            </h2>

            <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              <ProductCard
                image="https://placeholder.pics/svg/500x400"
                price="21 900 тг"
                title="корсет"
              />

              <ProductCard
                image="https://placeholder.pics/svg/500x400"
                price="33 900 тг."
                title="корсет new shine"
                badge="hit"
              />

              <ProductCard
                image="https://placeholder.pics/svg/500x400"
                price="23 900 тг."
                title="юбка корсетная"
              />
            </div>
            <div className="mb-8 text-center">
              <Button variant="outline" className="bg-transparent px-8 py-2">
                {t('loadMore')}
              </Button>
            </div>

            <div className="text-center">
              <Button className="cursor-pointer bg-black px-12 py-3 text-lg text-white uppercase hover:bg-gray-800">
                {t('go_to_the_catalog')}
              </Button>
            </div>
          </div>
        </section>

        {/* Lookbook Section */}
        <section className="px-4 py-16">
          <div className="container mx-auto">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-wider">
              LOOKBOOK
            </h2>

            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="aspect-square overflow-hidden bg-gray-100">
                <img
                  src="https://placeholder.pics/svg/400x400"
                  alt="Lookbook 1"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="aspect-square overflow-hidden bg-gray-100">
                <img
                  src="https://placeholder.pics/svg/400x400"
                  alt="Lookbook 2"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="aspect-square overflow-hidden bg-gray-100">
                <img
                  src="https://placeholder.pics/svg/400x400"
                  alt="Lookbook 3"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="mb-8 text-center">
              <p className="mx-auto mb-8 max-w-2xl text-gray-600">
                {t('look_at_lookbook')}
              </p>

              <Button className="bg-black px-12 py-3 text-lg text-white uppercase hover:bg-gray-800">
                {t('go_to_the_lookbook')}
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black px-4 py-12 text-white">
          <div className="container mx-auto">
            <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-4">
              <div>
                <h3 className="mb-4 text-2xl font-bold tracking-wider">
                  INOYA
                </h3>
                <p className="mb-2 text-sm text-gray-400">
                  Свое право защищены 2025 INOYA
                </p>
                <p className="mb-2 text-sm text-gray-400">
                  {t('adress_of_the_company')}
                </p>
              </div>

              <div>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white">
                      Доставка и оплата
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white">
                      Возврат и обмен
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white">
                      Определение размера
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white">
                      Центр поддержки
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <ul className="mb-4 space-y-2 text-sm">
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white">
                      Контакты
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white">
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8">
              <div className="flex flex-col items-center justify-between md:flex-row">
                <div className="mb-4 flex space-x-4 md:mb-0">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Icons.visa />
                    <Icons.mastercard />
                    <Icons.americanExpress />
                    <Icons.paypal />
                    <Icons.applePay />
                  </div>
                </div>

                <div className="text-right text-sm text-gray-400">
                  <p>Публичная оферта</p>
                  <p>Политика конфиденциальности</p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
