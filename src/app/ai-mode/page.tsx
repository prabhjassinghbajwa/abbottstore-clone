'use client';

import { useState, useEffect } from 'react';
import AIChatInterface from '@/components/ai/AIChatInterface';
import ProductListing from '@/components/ai/ProductListing';

export default function AIModePage() {
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);

  // Debug logging
  console.log('AIModePage selectedProducts:', selectedProducts);
  console.log('AIModePage selectedProducts length:', selectedProducts?.length);

  // Callback function to handle products found
  const handleProductsFound = (products: any[]) => {
    console.log('handleProductsFound called with:', products);
    console.log('Products length:', products?.length);
    setSelectedProducts(products || []);
  };

  return (
    <div className="h-[calc(100vh-100px)] bg-gray-100 flex flex-col overflow-hidden">
      {/* Main Content - Full Screen minus header */}
      <div className="flex-1 flex p-4 min-h-0 overflow-hidden">
        {/* Chat Interface - Left side (adds single vertical divider via border-r) */}
        <div className="w-[38%] bg-white rounded-xl shadow-sm flex flex-col min-h-0 max-h-full overflow-hidden border-r border-gray-200">
          <AIChatInterface onProductsFound={handleProductsFound} />
        </div>

        {/* Product Listing - Right side */}
        <div className="flex-1 bg-white rounded-xl shadow-sm flex flex-col min-h-0 max-h-full overflow-hidden">
          <ProductListing products={selectedProducts} />
        </div>
      </div>
    </div>
  );
}
