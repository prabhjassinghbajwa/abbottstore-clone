'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Rating } from '@/components/ui/rating';
import { useCart } from '@/contexts/cart-context';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const mainVariant = product.variants[0];
  const hasDiscount = mainVariant.originalPrice && mainVariant.originalPrice > mainVariant.price;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: `${product.sku}-${mainVariant.id}`,
      product,
      variant: mainVariant,
      quantity: 1,
      price: mainVariant.price
    });
  };

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
        {/* Image Container */}
        <div className="relative aspect-square bg-gray-50">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNew && (
              <Badge variant="secondary" className="bg-green-500 text-white text-xs">
                NEW
              </Badge>
            )}
            {product.isFeatured && (
              <Badge variant="secondary" className="bg-blue-500 text-white text-xs">
                FEATURED
              </Badge>
            )}
          </div>
          
          {/* Stock Status */}
          {!product.inStock && (
            <div className="absolute top-2 right-2">
              <Badge variant="warning" className="bg-red-500 text-white text-xs">
                OUT OF STOCK
              </Badge>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Product Name */}
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>

          {/* Variant Info */}
          <p className="text-sm text-gray-600 mb-2">
            {mainVariant.label}
          </p>

          {/* Size/Flavor */}
          <p className="text-xs text-gray-500 mb-3">
            {mainVariant.size}
            {mainVariant.flavor && ` • ${mainVariant.flavor}`}
          </p>

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-bold text-gray-900">
              ${mainVariant.price.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-500 line-through">
                ${mainVariant.originalPrice!.toFixed(2)}
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <Rating rating={product.rating} />
            <span className="text-xs text-gray-500">
              ({product.reviewCount})
            </span>
          </div>

          {/* Brand */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 font-medium">
              {product.brand}
            </span>
            
            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
} 