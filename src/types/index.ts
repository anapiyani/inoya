export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  images: string[];
  category: string;
  sizes: Size[];
  colors: Color[];
  inStock: boolean;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Size {
  id: string;
  name: string;
  value: string;
}

export interface Color {
  id: string;
  name: string;
  value: string;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  size: Size;
  color: Color;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'USER' | 'ADMIN';
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string;
  products: Product[];
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  shippingAddress: Address;
  createdAt: Date;
}

export interface OrderItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  size: Size;
  color: Color;
  price: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}
