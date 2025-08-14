'use client';

import { Suspense } from 'react';
import { SearchResults } from './search-results';

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={<div>Loading...</div>}>
          <SearchResults />
        </Suspense>
      </div>
    </div>
  );
} 