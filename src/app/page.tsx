import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductGrid } from '@/components/product/product-grid';
import { getFeaturedProducts, getFeaturedCategories, getFeaturedBrands } from '@/lib/data';

export default function Home() {
  const featuredProducts = getFeaturedProducts();
  const featuredCategories = getFeaturedCategories();
  const featuredBrands = getFeaturedBrands();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="absolute inset-0">
          <Image
            src="/images/real/hero_image.jpg"
            alt="Fulfilling Their Nutritional Needs from Day One"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="relative z-10 flex items-center h-full">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl text-white">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Fulfilling Their
                <br />
                Nutritional Needs
                <br />
                from Day One
              </h1>
              <p className="text-xl mb-8 leading-relaxed text-gray-100">
                When it comes to your child's nutritional needs, we have you covered. From newborn infants to kids of all ages, our nutritional products help them grow up happy and healthy.
              </p>
              <Button size="lg" className="bg-white !text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                SHOP OUR PRODUCTS
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Shop Featured Products
          </h2>
          <ProductGrid products={featuredProducts} showViewAll={false} />
        </div>
      </section>

      {/* Shop By Brand Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Shop By Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {featuredBrands.map((brand) => (
              <Link
                key={brand.name}
                href={`/brand/${brand.slug}`}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col items-center"
              >
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={120}
                  height={60}
                  className="mb-3"
                />
                <span className="text-sm text-gray-600 font-medium">{brand.name}</span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/brands"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold"
            >
              View All Brands
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Shop By Need Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Shop By Need</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCategories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="group block bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors"
              >
                <div className="aspect-w-16 aspect-h-9 mb-4">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={400}
                    height={225}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-sm">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Free Shipping</h3>
              </div>
              <p className="text-gray-600 mb-4">Get FREE ground shipping on orders of $35 or more.</p>
              <Button className="bg-blue-600 hover:bg-blue-700">SHOP NOW</Button>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Schedule & Save 10%*</h3>
              </div>
              <p className="text-gray-600 mb-4">Set up repeat orders when you check out and get 10% off* every purchase.</p>
              <Button className="bg-green-600 hover:bg-green-700">FIND OUT HOW</Button>
              <p className="text-xs text-gray-500 mt-2">*Discount does not include Nepro, Suplena, EleCare or BinaxNOW products.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
