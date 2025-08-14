'use client';

import { useState } from 'react';
import { Product } from '@/lib/data';
import { ProductCard } from './product-card';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  title?: string;
  showViewAll?: boolean;
}

export function ProductGrid({ products, title, showViewAll = false }: ProductGridProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const productsPerView = 4;
  const maxIndex = Math.max(0, products.length - productsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const visibleProducts = products.slice(currentIndex, currentIndex + productsPerView);

  return (
    <div className="relative">
      {title && (
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          {showViewAll && (
            <a href="/products" className="text-blue-600 hover:text-blue-800 font-semibold">
              View All
            </a>
          )}
        </div>
      )}
      
      <div className="relative">
        {/* Navigation Buttons */}
        {products.length > productsPerView && (
          <>
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleProducts.map((product) => (
            <ProductCard key={product.sku} product={product} />
          ))}
        </div>

        {/* Dots Indicator */}
        {products.length > productsPerView && (
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: Math.ceil(products.length / productsPerView) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * productsPerView)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === Math.floor(currentIndex / productsPerView)
                    ? 'bg-blue-600'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 