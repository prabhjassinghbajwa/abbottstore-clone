import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCategoryBySlug, getProductsByCategory } from '@/lib/data';
import { ProductGrid } from '@/components/product/product-grid';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {
      title: 'Category Not Found - Abbott Store',
    };
  }

  return {
    title: `${category.name} - Abbott Store`,
    description: category.description,
    keywords: `${category.name}, nutrition, Abbott, ${category.subcategories.join(', ')}`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = getProductsByCategory(slug);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{category.name}</h1>
            <p className="text-xl mb-8 leading-relaxed text-gray-100">{category.description}</p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {products.length} Product{products.length !== 1 ? 's' : ''} in {category.name}
            </h2>
            {category.subcategories.length > 0 && (
              <p className="text-gray-600">
                Subcategories: {category.subcategories.join(', ')}
              </p>
            )}
          </div>

          {products.length > 0 ? (
            <ProductGrid products={products} showViewAll={false} />
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">We couldn't find any products in this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
} 