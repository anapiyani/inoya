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
import { FilterSidebar } from '@/components/{admin,search,lookbook,cart,checkout,profile,journal}/lookbook-filter';
import { ProductCard } from '@/components/{admin,search,lookbook,cart,checkout,profile,journal}/product-card';
import { QueryProvider } from '@/hooks/query-client';
import { useProductsInfinite } from '@/hooks/use-prdocuts';
import { useCurrency } from '@/lib/currency-context';
import { AlertCircle, Filter, Loader2, Search } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Suspense, useCallback, useEffect, useMemo, useState } from 'react';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

function LookbooksContent() {
  const searchParams = useSearchParams();
  const searchParam = searchParams.get('search') || '';

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filters, setFilters] = useState({
    category: 'lookbooks',
    priceRange: [0, 1000] as [number, number],
    sizes: [] as string[],
    colors: [] as string[],
    isNew: false,
  });

  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  useEffect(() => {
    setSearchQuery(searchParam);
  }, [searchParam]);

  const apiParams = useMemo(() => {
    const params: Record<string, unknown> = {
      page: 1,
      limit: 12,
      category: 'lookbooks',
    };
    if (filters.isNew) params.badge = 'hit';
    if (filters.priceRange[0] > 0) params.minPrice = filters.priceRange[0];
    if (filters.priceRange[1] < 1000) params.maxPrice = filters.priceRange[1];
    if (debouncedSearchQuery && debouncedSearchQuery.trim())
      params.search = debouncedSearchQuery.trim();
    if (filters.sizes.length > 0) params.size = filters.sizes.join(',');
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
  }, [filters, debouncedSearchQuery, sortBy, sortOrder]);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useProductsInfinite(apiParams);

  const { formatPrice } = useCurrency();

  const handleSortChange = useCallback((value: string) => {
    setSortBy(value);
    if (value === 'price-low') setSortOrder('asc');
    else if (value === 'price-high') setSortOrder('desc');
    else setSortOrder('asc');
  }, []);

  const handleFiltersChange = useCallback(
    (next: typeof filters) => setFilters(next),
    []
  );

  const products = useMemo(
    () =>
      data?.pages.flatMap((p) =>
        p.data.products.map((prod) => ({
          ...prod,
          price: formatPrice(prod.price),
        }))
      ) ?? [],
    [data]
  );
  const totalProducts = data?.pages?.[0]?.data.pagination.total ?? 0;

  if (isError) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-20">
          <div className="container mx-auto px-4 py-8">
            <Alert className="mx-auto max-w-md">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="ml-2">
                Error loading lookbooks
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => refetch()}
                  className="ml-4"
                >
                  Try again
                </Button>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold">Lookbook &amp; Sets</h1>
            <p className="text-gray-600">
              Showing 1-{products.length} of {totalProducts} item
              {totalProducts === 1 ? '' : 's'}
            </p>
          </div>

          <div className="flex flex-col gap-8 lg:flex-row">
            <FilterSidebar
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
              filters={filters}
              onFiltersChange={handleFiltersChange}
            />

            <div className="flex-1">
              <div className="mb-6 space-y-4">
                <div className="relative">
                  <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                  <Input
                    placeholder="Search lookbooks"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                  {searchQuery !== debouncedSearchQuery && (
                    <div className="absolute top-1/2 right-3 -translate-y-1/2 transform">
                      <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                    </div>
                  )}
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
                      Filters
                    </Button>
                  </div>
                  <div className="flex items-center gap-4">
                    <Select value={sortBy} onValueChange={handleSortChange}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="name">Name</SelectItem>
                        <SelectItem value="price-low">
                          Price: Low to High
                        </SelectItem>
                        <SelectItem value="price-high">
                          Price: High to Low
                        </SelectItem>
                        <SelectItem value="createdAt">Newest</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                  {Array.from({ length: 8 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="h-64 animate-pulse rounded-md bg-gray-200"
                    />
                  ))}
                </div>
              ) : products.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-lg text-gray-500">No lookbooks found</p>
                  <p className="mt-2 text-gray-400">
                    Try adjusting filters or search terms.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                  {products.map((p) => (
                    <ProductCard
                      key={p._id}
                      id={p._id}
                      image={
                        p.photo?.[0] || '/placeholder.svg?height=800&width=640'
                      }
                      price={p.price}
                      title={p.name}
                      badge={p.badge === 'hit' ? 'hit' : undefined}
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
                    Load more
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

export default function LookbooksPage() {
  return (
    <QueryProvider>
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
        <LookbooksContent />
      </Suspense>
    </QueryProvider>
  );
}
