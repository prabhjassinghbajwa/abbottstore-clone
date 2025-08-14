export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  originalPrice?: number;
  description: string;
  shortDescription: string;
  category: string;
  subcategory?: string;
  brand: string;
  images: string[];
  variants: ProductVariant[];
  features: string[];
  specifications: Record<string, string>;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  isNew?: boolean;
  isFeatured?: boolean;
  caseSize?: string;
  flavor?: string;
  nutritionalInfo?: Record<string, string>;
}

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  price: number;
  originalPrice?: number;
  size: string;
  flavor?: string;
  images: string[];
  inStock: boolean;
  stockQuantity: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  featured: boolean;
  subcategories: string[];
  productCount: number;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string;
  description: string;
  featured: boolean;
  productCount: number;
}

export interface CartItem {
  id: string;
  product: Product;
  variant?: ProductVariant;
  quantity: number;
  price: number;
}

export interface SearchFilters {
  category?: string;
  brand?: string;
  priceRange?: [number, number];
  inStock?: boolean;
  sortBy?: 'name' | 'price' | 'rating' | 'newest';
  flavor?: string;
  caseSize?: string;
} 