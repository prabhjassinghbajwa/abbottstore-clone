import { ProductGrid } from '@/components/product/product-grid';
import { getAllProducts } from '@/lib/data';

export const metadata = {
  title: 'All Products - Abbot Kinney',
  description: 'Browse our complete collection of premium artisanal food products from California.',
};

export default function ProductsPage() {
  const products = getAllProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">All Products</h1>
        <p className="text-lg text-gray-600">
          Discover our complete collection of premium artisanal food products, each crafted with care and inspired by California&apos;s natural beauty.
        </p>
      </div>
      
      <ProductGrid products={products} showFilters />
    </div>
  );
} 