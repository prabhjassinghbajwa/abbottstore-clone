'use client';

import { useSearchParams } from 'next/navigation';
import { ProductGrid } from '@/components/product/product-grid';
import { searchProducts } from '@/lib/data';

export function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const products = searchProducts(query);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Search Results
        </h1>
        {query && (
          <p className="text-lg text-gray-600">
            Showing results for &quot;{query}&quot;
          </p>
        )}
      </div>
      
      <ProductGrid 
        products={products} 
        title={query ? `Results for &quot;${query}&quot;` : 'All Products'}
      />
    </div>
  );
} 