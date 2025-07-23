export interface ProductVariant {
  id: string;
  color: string;
  colorCode: string;
  images: string[];
  sizes: { size: string; inStock: boolean }[];
  price: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  variants: ProductVariant[];
  reviews: {
    id: string;
    author: string;
    rating: number;
    comment: string;
    date: string;
  }[];
  averageRating: number;
  totalReviews: number;
  isNew: boolean;
  badge?: string;
}

export const mockProduct: Product = {
  id: '1',
  name: 'Корсет из бархата',
  description:
    'Элегантный корсет из премиального бархата. Идеально подчеркивает силуэт и создает изысканный образ. Выполнен из высококачественных материалов с вниманием к каждой детали. Подходит для особых случаев и торжественных мероприятий.',
  category: 'corsets',
  variants: [
    {
      id: '1-red',
      color: 'Красный',
      colorCode: '#DC2626',
      images: [
        '/placeholder.svg?height=600&width=500&text=Red+Corset+1',
        '/placeholder.svg?height=600&width=500&text=Red+Corset+2',
        '/placeholder.svg?height=600&width=500&text=Red+Corset+3',
      ],
      sizes: [
        { size: 'XS', inStock: true },
        { size: 'S', inStock: true },
        { size: 'M', inStock: false },
        { size: 'L', inStock: true },
        { size: 'XL', inStock: true },
      ],
      price: 21900,
    },
    {
      id: '1-black',
      color: 'Черный',
      colorCode: '#000000',
      images: [
        '/placeholder.svg?height=600&width=500&text=Black+Corset+1',
        '/placeholder.svg?height=600&width=500&text=Black+Corset+2',
        '/placeholder.svg?height=600&width=500&text=Black+Corset+3',
      ],
      sizes: [
        { size: 'XS', inStock: true },
        { size: 'S', inStock: true },
        { size: 'M', inStock: true },
        { size: 'L', inStock: false },
        { size: 'XL', inStock: true },
      ],
      price: 21900,
    },
    {
      id: '1-white',
      color: 'Белый',
      colorCode: '#FFFFFF',
      images: [
        '/placeholder.svg?height=600&width=500&text=White+Corset+1',
        '/placeholder.svg?height=600&width=500&text=White+Corset+2',
        '/placeholder.svg?height=600&width=500&text=White+Corset+3',
      ],
      sizes: [
        { size: 'XS', inStock: true },
        { size: 'S', inStock: true },
        { size: 'M', inStock: true },
        { size: 'L', inStock: true },
        { size: 'XL', inStock: false },
      ],
      price: 21900,
    },
  ],
  reviews: [
    {
      id: '1',
      author: 'Анна К.',
      rating: 5,
      comment:
        'Потрясающий корсет! Качество на высоте, сидит идеально. Очень довольна покупкой.',
      date: '2024-01-15',
    },
    {
      id: '2',
      author: 'Мария С.',
      rating: 4,
      comment:
        'Красивый корсет, но размер оказался немного маловат. Рекомендую брать на размер больше.',
      date: '2024-01-10',
    },
    {
      id: '3',
      author: 'Елена В.',
      rating: 5,
      comment:
        'Превосходное качество! Материал приятный, пошив аккуратный. Буду заказывать еще.',
      date: '2024-01-05',
    },
  ],
  averageRating: 4.7,
  totalReviews: 3,
  isNew: true,
  badge: 'hit',
};

export const mockShoeProduct: Product = {
  id: '2',
  name: 'Туфли на каблуке',
  description:
    'Элегантные туфли на устойчивом каблуке. Изготовлены из натуральной кожи высокого качества. Идеально подходят для деловых встреч и торжественных мероприятий.',
  category: 'shoes',
  variants: [
    {
      id: '2-black',
      color: 'Черный',
      colorCode: '#000000',
      images: [
        '/placeholder.svg?height=600&width=500&text=Black+Shoes+1',
        '/placeholder.svg?height=600&width=500&text=Black+Shoes+2',
      ],
      sizes: [
        { size: '35', inStock: true },
        { size: '36', inStock: true },
        { size: '37', inStock: false },
        { size: '38', inStock: true },
        { size: '39', inStock: true },
        { size: '40', inStock: false },
      ],
      price: 15900,
    },
    {
      id: '2-brown',
      color: 'Коричневый',
      colorCode: '#8B4513',
      images: [
        '/placeholder.svg?height=600&width=500&text=Brown+Shoes+1',
        '/placeholder.svg?height=600&width=500&text=Brown+Shoes+2',
      ],
      sizes: [
        { size: '35', inStock: false },
        { size: '36', inStock: true },
        { size: '37', inStock: true },
        { size: '38', inStock: true },
        { size: '39', inStock: false },
        { size: '40', inStock: true },
      ],
      price: 15900,
    },
  ],
  reviews: [
    {
      id: '1',
      author: 'Ольга П.',
      rating: 5,
      comment: 'Отличные туфли! Удобные, красивые, качественные.',
      date: '2024-01-12',
    },
  ],
  averageRating: 5.0,
  totalReviews: 1,
  isNew: false,
};

export const similarProducts = [
  {
    id: '3',
    name: 'Корсет кружевной',
    price: '25 900 тг',
    image: '/placeholder.svg?height=400&width=300',
  },
  {
    id: '4',
    name: 'Корсет атласный',
    price: '19 900 тг',
    image: '/placeholder.svg?height=400&width=300',
  },
  {
    id: '5',
    name: 'Корсет с пайетками',
    price: '32 900 тг',
    image: '/placeholder.svg?height=400&width=300',
    badge: 'new',
  },
  {
    id: '6',
    name: 'Корсет винтажный',
    price: '28 900 тг',
    image: '/placeholder.svg?height=400&width=300',
  },
];
