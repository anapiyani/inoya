'use client';

import { Header } from '@/components/layout/header';
import { Alert, AlertDescription } from '@/components/ui/alert';
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
import { ProductCard } from '@/components/{admin,search,lookbook,cart,checkout,profile,journal}/product-card';
import { useProductsInfinite } from '@/hooks/use-prdocuts';
import { useLanguage } from '@/lib/language-context';
import { AlertCircle, Filter, Loader2, Search } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Suspense, useCallback, useEffect, useMemo, useState } from 'react';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

function CatalogContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';
  const searchParam = searchParams.get('search') || '';

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    category: categoryParam,
    priceRange: [0, 1000] as [number, number],
    sizes: [] as string[],
    colors: [] as string[],
    isNew: false,
  });

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    setFilters((prev) => ({ ...prev, category: categoryParam }));
    setCurrentPage(1);
  }, [categoryParam]);

  useEffect(() => {
    setSearchQuery(searchParam);
  }, [searchParam]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, debouncedSearchQuery, sortBy, sortOrder]);

  const apiParams = useMemo(() => {
    const params: any = {
      page: currentPage,
      limit: 12,
    };
    if (filters.category && filters.category !== 'all') {
      params.category = filters.category;
    }
    if (filters.isNew) {
      params.badge = 'hit';
    }

    if (filters.priceRange[0] > 0) {
      params.minPrice = filters.priceRange[0];
    }
    if (filters.priceRange[1] < 1000) {
      params.maxPrice = filters.priceRange[1];
    }

    if (debouncedSearchQuery && debouncedSearchQuery.trim()) {
      params.search = debouncedSearchQuery.trim();
    }

    if (filters.colors.length > 0) {
      params.color = filters.colors.join(',');
    }

    if (filters.sizes.length > 0) {
      params.size = filters.sizes.join(',');
    }

    if (sortBy === 'price-low') {
      params.sortBy = 'price';
      params.sortOrder = 'asc';
    } else if (sortBy === 'price-high') {
      params.sortBy = 'price';
      params.sortOrder = 'desc';
    } else {
      params.sortBy = sortBy;
      params.sortOrder = sortOrder;
    }

    return params;
  }, [currentPage, filters, debouncedSearchQuery, sortBy, sortOrder]);

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useProductsInfinite(apiParams);

  const handleSortChange = useCallback((value: string) => {
    setSortBy(value);
    if (value === 'price-low') {
      setSortOrder('asc');
    } else if (value === 'price-high') {
      setSortOrder('desc');
    } else {
      setSortOrder('asc');
    }
  }, []);

  const handleFiltersChange = useCallback((newFilters: typeof filters) => {
    setFilters(newFilters);
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  const getCategoryTitle = () => {
    switch (filters.category) {
      case 'shoes':
        return 'Shoes';
      case 'accessories':
        return 'Accessories';
      default:
        return t('catalog');
    }
  };

  if (isError) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-20">
          <div className="container mx-auto px-4 py-8">
            <Alert className="mx-auto max-w-md">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="ml-2">
                {t('error_loading_products')}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => refetch()}
                  className="ml-4"
                >
                  {t('try_again')}
                </Button>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    );
  }

  const products = useMemo(
    () => data?.pages.flatMap((p) => p.data.products) ?? [],
    [data]
  );
  const totalProducts = data?.pages?.[0]?.data.pagination.total ?? 0;

  const totalPages = data?.pages?.[0]?.data.pagination.pages || 1;
  const availableCategories = data?.pages?.[0]?.data.filters?.categories || [];
  const availableSubcategories =
    data?.pages?.[0]?.data.filters?.subcategories || [];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="mb-4 text-3xl font-bold">{getCategoryTitle()}</h1>
            <p className="text-gray-600">
              {t('showing_results')} 1-{products.length} {t('of')}{' '}
              {totalProducts}{' '}
              {totalProducts === 1 ? t('one_item') : t('multiple_items')}
            </p>
          </div>

          <div className="flex flex-col gap-8 lg:flex-row">
            <FilterSidebar
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
              filters={filters}
              onFiltersChange={handleFiltersChange}
            />

            {/* Main Content */}
            <div className="flex-1">
              {/* Search and Controls */}
              <div className="mb-6 space-y-4">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                  <Input
                    placeholder={t('search')}
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="pl-10"
                  />
                  {searchQuery !== debouncedSearchQuery && (
                    <div className="absolute top-1/2 right-3 -translate-y-1/2 transform">
                      <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Controls */}
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsFilterOpen(true)}
                      className="lg:hidden"
                    >
                      <Filter className="mr-2 h-4 w-4" />
                      {t('filter')}
                    </Button>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Sort */}
                    <Select value={sortBy} onValueChange={handleSortChange}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder={t('sort')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="name">{t('sortByName')}</SelectItem>
                        <SelectItem value="price-low">
                          {t('sortByPriceLow')}
                        </SelectItem>
                        <SelectItem value="price-high">
                          {t('sortByPriceHigh')}
                        </SelectItem>
                        <SelectItem value="createdAt">
                          По дате добавления
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {isLoading ? (
                <div
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                      : 'space-y-4'
                  }
                >
                  {Array.from({ length: 8 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-64 animate-pulse rounded-md bg-gray-200"
                    />
                  ))}
                </div>
              ) : products.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-lg text-gray-500">
                    {t('no_products_found')}
                  </p>
                  <p className="mt-2 text-gray-400">
                    {t('no_products_found_description')}
                  </p>
                </div>
              ) : (
                <div
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'
                      : 'space-y-4'
                  }
                >
                  {products.map((product: any) => (
                    <ProductCard
                      key={product._id}
                      id={product._id}
                      image={product.photo?.[0] || '/placeholder.svg'}
                      price={`$${product.price}`}
                      title={product.name}
                      badge={product.badge === 'hit' ? 'hit' : undefined}
                      className={viewMode === 'list' ? 'flex flex-row' : ''}
                    />
                  ))}
                </div>
              )}

              {hasNextPage && (
                <div className="mt-8 text-center">
                  <Button
                    variant="outline"
                    className="bg-transparent px-8 py-2"
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                  >
                    {isFetchingNextPage ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
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
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-white">
          <div className="text-center">
            <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin" />
            <p>Loading...</p>
          </div>
        </div>
      }
    >
      <CatalogContent />
    </Suspense>
  );
}
