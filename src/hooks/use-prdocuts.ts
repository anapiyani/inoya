// hooks/use-products.tsx
import {
  fetchFeaturedProducts,
  fetchProducts,
  ProductsParams,
} from '@/lib/api';
import { useInfiniteQuery } from '@tanstack/react-query';

export function useProductsInfinite(params: ProductsParams = {}) {
  return useInfiniteQuery({
    queryKey: ['products', JSON.stringify(params)],
    queryFn: ({ pageParam = 1 }: { pageParam?: number }) =>
      fetchProducts({ ...params, page: pageParam, limit: 15 }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, pages } = lastPage.data.pagination;
      return page < pages ? page + 1 : undefined;
    },
    staleTime: 0,
    gcTime: 2 * 60 * 1000,
    refetchOnMount: true,
    retry: 2,
  });
}

export function useFeaturedProductsInfinite(limit = 3) {
  return useInfiniteQuery({
    queryKey: ['featuredProducts', limit],
    queryFn: ({ pageParam = 1 }: { pageParam?: number }) =>
      fetchFeaturedProducts(pageParam, limit),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const pagination = lastPage.data.pagination;
      if (pagination.page < pagination.pages) {
        return pagination.page + 1;
      }
      return undefined;
    },
  });
}
