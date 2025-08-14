'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ShoppingCart, Heart, Truck, Shield, RefreshCw } from 'lucide-react';
import { Product, ProductVariant } from '@/types';
import { Button } from '@/components/ui/button';
import { Rating } from '@/components/ui/rating';
import { Badge } from '@/components/ui/badge';

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description');

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    console.log('Add to cart:', {
      productId: product.id,
      variantId: selectedVariant.id,
      quantity
    });
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= selectedVariant.stockQuantity) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      {/* Image Gallery */}
      <div className="space-y-4">
        {/* Main Image */}
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={product.images[selectedImage]}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Thumbnail Images */}
        <div className="grid grid-cols-4 gap-2">
          {product.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
                selectedImage === index ? 'border-amber-600' : 'border-transparent'
              }`}
            >
              <Image
                src={image}
                alt={`${product.name} - Image ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        {/* Brand */}
        <p className="text-sm text-gray-500">{product.brand}</p>

        {/* Product Name */}
        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <Rating rating={product.rating} showValue />
          <span className="text-sm text-gray-500">({product.reviewCount} reviews)</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold text-gray-900">
            {formatPrice(selectedVariant.price)}
          </span>
          {selectedVariant.originalPrice && selectedVariant.originalPrice > selectedVariant.price && (
            <span className="text-lg text-gray-500 line-through">
              {formatPrice(selectedVariant.originalPrice)}
            </span>
          )}
          {selectedVariant.originalPrice && selectedVariant.originalPrice > selectedVariant.price && (
            <Badge variant="warning">
              {Math.round(((selectedVariant.originalPrice - selectedVariant.price) / selectedVariant.originalPrice) * 100)}% OFF
            </Badge>
          )}
        </div>

        {/* Variants */}
        {product.variants.length > 1 && (
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Select Size</h3>
            <div className="flex gap-2">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariant(variant)}
                  className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                    selectedVariant.id === variant.id
                      ? 'border-amber-600 bg-amber-50 text-amber-600'
                      : 'border-gray-300 text-gray-700 hover:border-amber-600'
                  } ${!variant.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={!variant.inStock}
                >
                  {variant.name}
                  {!variant.inStock && ' (Out of Stock)'}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Quantity</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
              className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50"
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
              min="1"
              max={selectedVariant.stockQuantity}
              className="w-16 h-8 border border-gray-300 rounded-lg text-center text-sm"
            />
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={quantity >= selectedVariant.stockQuantity}
              className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50"
            >
              +
            </button>
            <span className="text-sm text-gray-500">
              {selectedVariant.stockQuantity} available
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={handleAddToCart}
            disabled={!selectedVariant.inStock}
            className="flex-1"
            size="lg"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </Button>
          <Button
            variant="outline"
            onClick={handleWishlist}
            size="lg"
            className="px-4"
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current text-red-500' : ''}`} />
          </Button>
        </div>

        {/* Features */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Features</h3>
          <ul className="space-y-2">
            {product.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-1.5 h-1.5 bg-amber-600 rounded-full"></div>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Shipping Info */}
        <div className="border-t border-gray-200 pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Truck className="w-4 h-4 text-amber-600" />
              <span>Free shipping over $50</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Shield className="w-4 h-4 text-amber-600" />
              <span>30-day returns</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <RefreshCw className="w-4 h-4 text-amber-600" />
              <span>Easy exchanges</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="lg:col-span-2 border-t border-gray-200 pt-8">
        <div className="flex border-b border-gray-200">
          {[
            { id: 'description', label: 'Description' },
            { id: 'specifications', label: 'Specifications' },
            { id: 'reviews', label: 'Reviews' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'description' | 'specifications' | 'reviews')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-amber-600 text-amber-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="py-6">
          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-900">{key}</span>
                  <span className="text-gray-600">{value}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="text-center py-8">
              <p className="text-gray-600">Reviews functionality will be implemented here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 