import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ProductDetail } from '@/components/product/product-detail';
import { getProductById, getRelatedProducts } from '@/lib/data';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);
  
  if (!product) {
    return {
      title: 'Product Not Found - Abbot Kinney',
    };
  }

  return {
    title: `${product.name} - Abbot Kinney`,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [product.images[0]],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);
  
  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(id);

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetail product={product} />
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.sku} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {/* Simplified product card for related products */}
                <div className="aspect-square bg-gray-100 relative">
                  <Image
                    src={relatedProduct.images[0]}
                    alt={relatedProduct.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-2">{relatedProduct.name}</h3>
                  <p className="text-lg font-semibold text-gray-900">
                    ${relatedProduct.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
} 