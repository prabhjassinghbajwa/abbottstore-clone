import categoriesData from '../data/categories.json';
import productsData from '../data/products.json';
import brandsData from '../data/brands.json';

// Type definitions for JSON data
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  featured: boolean;
  subcategories: string[];
}

export interface ProductVariant {
  id: string;
  label: string;
  sku: string;
  price: number;
  originalPrice?: number;
  size: string;
  flavor: string;
  images: string[];
  inStock: boolean;
  stockQuantity: number;
}

export interface Product {
  sku: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  currency: string;
  category: string;
  subcategory: string;
  brand: string;
  description: string;
  shortDescription: string;
  images: string[];
  variants: ProductVariant[];
  features: string[];
  specifications: Record<string, string | undefined>;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  tags: string[];
  isNew: boolean;
  isFeatured: boolean;
  caseSize: string;
  flavor: string;
  nutritionalInfo: Record<string, string | undefined>;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo: string;
  featured: boolean;
  category: string;
}

// Load data from JSON files
export const categories: Category[] = categoriesData;
export const products: Product[] = productsData;
export const brands: Brand[] = brandsData;

// Utility functions
export function getFeaturedProducts(): Product[] {
  return products.filter(product => product.isFeatured);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter(product => product.category === categorySlug);
}

export function getProductsByBrand(brandSlug: string): Product[] {
  return products.filter(product => product.brand.toLowerCase() === brandSlug);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(product => product.slug === slug);
}

export function getProductBySku(sku: string): Product | undefined {
  return products.find(product => product.sku === sku);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(category => category.slug === slug);
}

export function getBrandBySlug(slug: string): Brand | undefined {
  return brands.find(brand => brand.slug === slug);
}

export function getFeaturedCategories(): Category[] {
  return categories.filter(category => category.featured);
}

export function getFeaturedBrands(): Brand[] {
  return brands.filter(brand => brand.featured);
}

export function searchProducts(query: string): Product[] {
  const searchTerm = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.brand.toLowerCase().includes(searchTerm) ||
    product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
}

export function getProductVariants(productSlug: string): ProductVariant[] {
  const product = getProductBySlug(productSlug);
  return product?.variants || [];
}

export function getProductVariant(productSlug: string, variantId: string): ProductVariant | undefined {
  const product = getProductBySlug(productSlug);
  return product?.variants.find(variant => variant.id === variantId);
}

// Additional utility functions for compatibility
export function getProductById(id: string): Product | undefined {
  return products.find(product => product.sku === id);
}

export function getAllProducts(): Product[] {
  return products;
}

export function getRelatedProducts(currentProductSlug: string, limit: number = 4): Product[] {
  const currentProduct = getProductBySlug(currentProductSlug);
  if (!currentProduct) return [];
  
  return products
    .filter(product => 
      product.sku !== currentProduct.sku && 
      (product.category === currentProduct.category || product.brand === currentProduct.brand)
    )
    .slice(0, limit);
} 