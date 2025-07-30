export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  photo: string[];
  category: string;
  subcategory?: string;
  badge?: string;
  isActive: boolean;
  colors?: Array<{
    name: string;
    hexCode: string;
  }>;
  sizes?: Array<{
    name: string;
    value: string;
    inStock: boolean;
  }>;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ProductsResponse {
  success: boolean;
  message: string;
  data: {
    products: Product[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
    filters: {
      categories: string[];
      subcategories: string[];
    };
  };
}

export interface ProductsParams {
  page?: number;
  limit?: number;
  category?: string;
  subcategory?: string;
  badge?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  color?: string;
  size?: string;
  sortBy?: 'name' | 'price' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

const API_BASE_URL = 'https://inoya-back-production.up.railway.app/api';

export async function fetchProducts(
  params: ProductsParams = {}
): Promise<ProductsResponse> {
  const searchParams = new URLSearchParams();

  if (params.page) searchParams.append('page', params.page.toString());
  if (params.limit) searchParams.append('limit', params.limit.toString());
  if (params.category && params.category !== 'all')
    searchParams.append('category', params.category);
  if (params.subcategory)
    searchParams.append('subcategory', params.subcategory);
  if (params.badge) searchParams.append('badge', params.badge);
  if (params.minPrice !== undefined)
    searchParams.append('minPrice', params.minPrice.toString());
  if (params.maxPrice !== undefined)
    searchParams.append('maxPrice', params.maxPrice.toString());
  if (params.search) searchParams.append('search', params.search);
  if (params.color) searchParams.append('color', params.color);
  if (params.size) searchParams.append('size', params.size);
  if (params.sortBy) searchParams.append('sortBy', params.sortBy);
  if (params.sortOrder) searchParams.append('sortOrder', params.sortOrder);

  const url = `${API_BASE_URL}/products?${searchParams.toString()}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export async function fetchProduct(id: string): Promise<{ product: Product }> {
  const url = `${API_BASE_URL}/products/${id}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data || data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}

export async function fetchFeaturedProducts(
  page: number = 1,
  limit: number = 6
): Promise<ProductsResponse> {
  const url = `${API_BASE_URL}/products/featured?page=${page}&limit=${limit}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching featured products:', error);
    throw error;
  }
}
