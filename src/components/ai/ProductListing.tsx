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

    // Helper function to get product image
    const getProductImage = (product: Product): string => {
        if (product.images && product.images.length > 0) {
            // Check if the image path is valid
            const imagePath = product.images[0];
            if (imagePath && imagePath.startsWith('/')) {
                return imagePath;
            }
        }

        // Try to find real images first based on brand
        if (product.brand) {
            const brandName = product.brand.toLowerCase().replace(/\s+/g, '-');

            // Check for real brand images
            const realBrandImages = [
                `/images/real/brand-${brandName}.png`,
                `/images/real/brand-${brandName}.jpg`,
                `/images/real/${brandName}.png`,
                `/images/real/${brandName}.jpg`
            ];

            // Return the first existing image path (we'll let the browser handle 404s)
            return realBrandImages[0];
        }

        // Try category-based images
        if (product.category) {
            const categoryName = product.category.toLowerCase().replace(/\s+/g, '-');

            // Check for real category images
            const realCategoryImages = [
                `/images/real/category-${categoryName}.jpg`,
                `/images/category-${categoryName}.svg`
            ];

            return realCategoryImages[0];
        }

        // Default placeholder - use an existing image
        return '/images/real/abbott_header_logo.svg';
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
                            getProductImage={getProductImage}
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
    getProductImage: (product: Product) => string;
}) {
    const normalizedPrice = normalizePrice(product.price);
    const [added, setAdded] = useState(false);

    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-sm transition-shadow cursor-default">
            {/* Product Image */}
            <div className="relative aspect-square bg-gray-50 mx-3 mt-3 rounded-lg overflow-hidden">
                <img
                    src={getProductImage(product)}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        // Fallback to placeholder if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        // Show a text placeholder instead
                        const placeholder = target.parentElement?.querySelector('.image-placeholder');
                        if (placeholder) {
                            (placeholder as HTMLElement).style.display = 'flex';
                        }
                    }}
                />

                {/* Text placeholder for when image fails */}
                <div className="image-placeholder hidden absolute inset-0 items-center justify-center bg-gray-200 text-gray-600 text-xs font-medium">
                    {product.brand || 'Abbott'}
                </div>
            </div>

            {/* Product Info */}
            <div className="p-3 flex flex-col">
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

                {product.description && (
                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mt-1">
                        {product.description}
                    </p>
                )}

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

// Product List Item Component (List View)
function ProductListItem({
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
    getProductImage: (product: Product) => string;
}) {
    const normalizedPrice = normalizePrice(product.price);

    return (
        <div className="flex space-x-4 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
            {/* Product Image */}
            <div className="relative w-24 h-24 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                <img
                    src={getProductImage(product)}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        // Fallback to placeholder if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        // Show a text placeholder instead
                        const placeholder = target.parentElement?.querySelector('.image-placeholder');
                        if (placeholder) {
                            (placeholder as HTMLElement).style.display = 'flex';
                        }
                    }}
                />

                {/* Text placeholder for when image fails */}
                <div className="image-placeholder hidden absolute inset-0 items-center justify-center bg-gray-200 text-gray-500 text-xs font-medium">
                    {product.brand || 'Product'}
                </div>
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-gray-900 text-lg line-clamp-2">
                        {product.name}
                    </h3>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => onQuickView(product)}
                            className="p-2 text-gray-400 hover:text-gray-600"
                        >
                            <Eye className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {product.brand && (
                    <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
                )}

                {product.category && (
                    <p className="text-sm text-blue-600 mb-1">{product.category}</p>
                )}

                {product.description && (
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                        {product.description}
                    </p>
                )}

                {product.sku && (
                    <p className="text-xs text-gray-400 mb-2">SKU: {product.sku}</p>
                )}

                {normalizedPrice && (
                    <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-900 text-lg">
                            {normalizedPrice.currency} {normalizedPrice.value.toFixed(2)}
                        </span>
                        <button
                            onClick={() => onAddToCart(product)}
                            className="inline-flex items-center gap-1 bg-blue-600 text-white text-xs px-2 py-1 rounded hover:bg-blue-700"
                        >
                            <ShoppingCart className="w-4 h-4" />
                            Add to cart
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
