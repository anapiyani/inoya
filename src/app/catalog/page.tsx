'use client';

import { mockProducts } from '@/components/catalog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FilterSidebar } from '@/components/{admin,search,lookbook,cart,checkout,profile,journal}/catalog-filter';
import { Header } from '@/components/{admin,search,lookbook,cart,checkout,profile,journal}/header';
import { ProductCard } from '@/components/{admin,search,lookbook,cart,checkout,profile,journal}/product-card';
import { useLanguage } from '@/lib/language-context';
import { Filter, Grid, List, Search } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

function CatalogContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filters, setFilters] = useState({
    category: categoryParam,
    priceRange: [0, 100000] as [number, number],
    sizes: [] as string[],
    colors: [] as string[],
    isNew: false,
  });

  useEffect(() => {
    setFilters((prev) => ({ ...prev, category: categoryParam }));
  }, [categoryParam]);

  const filteredProducts = mockProducts
    .filter((product) => {
      if (filters.category !== 'all' && filters.category !== 'new-arrivals') {
        if (product.category !== filters.category) return false;
      }
      if (filters.category === 'new-arrivals' && !product.isNew) return false;

      if (
        product.price < filters.priceRange[0] ||
        product.price > filters.priceRange[1]
      )
        return false;

      if (filters.isNew && !product.isNew) return false;

      if (
        searchQuery &&
        !product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return false;

      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const getCategoryTitle = () => {
    switch (filters.category) {
      case 'new-arrivals':
        return t('newArrivals');
      case 'dress':
        return t('dress');
      case 'corsets':
        return t('corsets');
      case 'skirts':
        return t('skirts');
      case 'tops-blouses':
        return t('tops_blouses');
      case 'sleeves':
        return t('sleeves');
      case 'outerwear':
        return t('outerwear');
      case 'wedding-dresses':
        return t('wedding_dresses');
      default:
        return t('catalog');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="mb-4 text-3xl font-bold">{getCategoryTitle()}</h1>
            <p className="text-gray-600">
              {filteredProducts.length}{' '}
              {filteredProducts.length === 1 ? 'товар' : 'товаров'}
            </p>
          </div>

          <div className="flex flex-col gap-8 lg:flex-row">
            <FilterSidebar
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
              filters={filters}
              onFiltersChange={setFilters}
            />

            <div className="flex-1">
              <div className="mb-6 space-y-4">
                <div className="relative">
                  <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                  <Input
                    placeholder="Поиск товаров..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsFilterOpen(true)}
                      className="lg:hidden"
                    >
                      <Filter className="mr-2 h-4 w-4" />
                      Фильтры
                    </Button>
                  </div>

                  <div className="flex items-center gap-4">
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Сортировка" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="name">По названию</SelectItem>
                        <SelectItem value="price-low">
                          Цена: по возрастанию
                        </SelectItem>
                        <SelectItem value="price-high">
                          Цена: по убыванию
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="flex rounded-md border">
                      <Button
                        variant={viewMode === 'grid' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('grid')}
                        className="rounded-r-none"
                      >
                        <Grid className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === 'list' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('list')}
                        className="rounded-l-none"
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-lg text-gray-500">Товары не найдены</p>
                  <p className="mt-2 text-gray-400">
                    Попробуйте изменить фильтры или поисковый запрос
                  </p>
                </div>
              ) : (
                <div
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                      : 'space-y-4'
                  }
                >
                  {filteredProducts.map((product) => (
                    <ProductCard
                      id={String(product.id)}
                      key={product.id}
                      image={product.image}
                      price={`${product.price.toLocaleString()} ${product.currency}`}
                      title={product.name}
                    />
                  ))}
                </div>
              )}

              {filteredProducts.length > 0 && (
                <div className="mt-12 text-center">
                  <Button
                    variant="outline"
                    className="bg-transparent px-8 py-2"
                  >
                    {t('loadMore')}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CatalogContent />
    </Suspense>
  );
}
