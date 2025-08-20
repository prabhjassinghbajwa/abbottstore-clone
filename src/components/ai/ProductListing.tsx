'use client';

import { useState, useMemo } from 'react';
import { ShoppingCart, Heart, Star, Eye, Package, DollarSign, Check } from 'lucide-react';
import { useCart } from '@/contexts/cart-context';

interface Product {
    id: string;
    name: string;
    description?: string;
    price?: {
        value: number;
        currency: string;
    } | string | number;
    images?: string[];
    category?: string;
    brand?: string;
    rating?: number;
    reviewCount?: number;
    // Additional fields that might come from MetaFyAI
    sku?: string;
    availability?: string;
    productType?: string;
    tags?: string[];
    specifications?: Record<string, any>;
}

interface ProductListingProps {
    products: Product[];
}

export default function ProductListing({ products }: ProductListingProps) {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const { addItem } = useCart();
    const [toast, setToast] = useState<string | null>(null);

    // Debug logging
    console.log('ProductListing received products:', products);
    console.log('Products length:', products?.length);
    console.log('Products type:', typeof products);
    console.log('Products is array:', Array.isArray(products));

    // Ensure products is always an array and remove duplicates
    const safeProducts = Array.isArray(products)
        ? products.filter((product, index, self) =>
            index === self.findIndex(p => p.id === product.id)
        )
        : [];

    console.log('Safe products after deduplication:', safeProducts.length);

    const handleAddToCart = (product: Product) => {
        const normalizedPrice = normalizePrice(product.price);
        const priceValue = normalizedPrice?.value || 0;
        addItem({
            id: product.id,
            product: {
                id: product.id,
                name: product.name,
                description: product.description || '',
                price: priceValue,
                images: product.images || [],
                brand: product.brand || '',
                category: product.category || ''
            } as any,
            variant: { id: product.id, name: 'default', price: priceValue } as any,
            quantity: 1,
            price: priceValue
        });

        // Lightweight toast feedback
        setToast('Added to cart');
        setTimeout(() => setToast(null), 1400);
    };

    const handleAddToWishlist = (product: Product) => {
        // TODO: Implement add to wishlist functionality
        console.log('Adding to wishlist:', product);
    };

    const handleQuickView = (product: Product) => {
        // TODO: Implement quick view functionality
        console.log('Quick view:', product);
    };

    // Helper function to normalize price data
    const normalizePrice = (price: any): { value: number; currency: string } | null => {
        if (!price) return null;

        if (typeof price === 'object' && price.value && price.currency) {
            return price;
        }

        if (typeof price === 'number') {
            return { value: price, currency: 'USD' };
        }

        if (typeof price === 'string') {
            // Try to extract price from string (e.g., "$29.99", "29.99 USD")
            const priceMatch = price.match(/(\d+(?:\.\d{2})?)/);
            const currencyMatch = price.match(/([A-Z]{3})/);

            if (priceMatch) {
                return {
                    value: parseFloat(priceMatch[1]),
                    currency: currencyMatch ? currencyMatch[1] : 'USD'
                };
            }
        }

        return null;
    };

    // Helper function to get brand name from product
    const getProductBrand = (product: Product): string => {
        if (product.brand) {
            return product.brand.toUpperCase();
        }

        // Extract brand from product name
        const productName = product.name?.toLowerCase() || '';

        if (productName.includes('similac')) return 'SIMILAC';
        if (productName.includes('ensure')) return 'ENSURE';
        if (productName.includes('glucerna')) return 'GLUCERNA';
        if (productName.includes('pedialyte')) return 'PEDIALYTE';
        if (productName.includes('pediasure')) return 'PEDIASURE';
        if (productName.includes('elecare')) return 'ELECARE';
        if (productName.includes('juven')) return 'JUVEN';
        if (productName.includes('nepro')) return 'NEPRO';
        if (productName.includes('freestyle')) return 'FREESTYLE';
        if (productName.includes('binaxnow')) return 'BINAXNOW';

        return 'ABBOTT';
    };

    if (safeProducts.length === 0) {
        return (
            <div className="flex flex-col h-full bg-white">
                <div className="flex-1 flex items-center justify-center p-8">
                    <div className="text-center max-w-md">
                        <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Package className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Discover Abbott Products</h3>
                        <p className="text-gray-600 text-base leading-relaxed">
                            Start a conversation with our AI assistant to find healthcare and nutrition products
                            tailored to your specific needs.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-white relative">
            {/* Products Grid */}
            <div className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
                    {safeProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={handleAddToCart}
                            onAddToWishlist={handleAddToWishlist}
                            onQuickView={handleQuickView}
                            normalizePrice={normalizePrice}
                        // getProductImage={getProductImage}
                        />
                    ))}
                </div>
            </div>

            {toast && (
                <div className="pointer-events-none absolute bottom-4 right-4 bg-gray-900 text-white text-xs px-3 py-2 rounded-md shadow-md">
                    {toast}
                </div>
            )}
        </div>
    );
}

// Product Card Component (Grid View)
function ProductCard({
    product,
    onAddToCart,
    onAddToWishlist,
    onQuickView,
    normalizePrice,
    getProductImage
}: {
    product: Product;
    onAddToCart: (product: Product) => void;
    onAddToWishlist: (product: Product) => void;
    onQuickView: (product: Product) => void;
    normalizePrice: (price: any) => { value: number; currency: string } | null;
    getProductImage?: (product: Product) => string;
}) {
    const normalizedPrice = normalizePrice(product.price);
    const [added, setAdded] = useState(false);

    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-sm transition-shadow cursor-default min-h-[360px] flex flex-col">
            {/* Product Image - Static Placeholder */}
            <div className="relative aspect-square bg-gradient-to-br from-blue-50 to-blue-100 mx-3 mt-3 rounded-lg overflow-hidden flex items-center justify-center">
                <div className="text-center text-blue-600">
                    <div className="text-lg font-bold mb-1">{product.brand || 'Product'}</div>
                    <div className="text-xs opacity-75">Product Image</div>
                </div>
            </div>

            {/* Product Info */}
            <div className="p-3 flex flex-col flex-1">
                <h3 className="font-medium text-gray-900 text-sm mb-1 leading-tight line-clamp-2 min-h-8">
                    {product.name}
                </h3>

                {normalizedPrice && (
                    <div className="mb-2">
                        <span className="text-sm font-semibold text-gray-900">
                            ${normalizedPrice.value.toFixed(2)}
                        </span>
                    </div>
                )}

                {product.brand && (
                    <p className="text-xs text-gray-500">{product.brand}</p>
                )}

                <div className="flex-1">
                    {product.description && (
                        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mt-1">
                            {product.description}
                        </p>
                    )}
                </div>

                <button
                    onClick={() => { onAddToCart(product); setAdded(true); setTimeout(() => setAdded(false), 1200); }}
                    className={`mt-3 w-full inline-flex items-center justify-center gap-1 text-xs px-3 py-2 rounded-md transition-colors ${added ? 'bg-green-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                    aria-label="Add to cart"
                >
                    {added ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
                    {added ? 'Added' : 'Add to cart'}
                </button>
            </div>
        </div>
    );
}