import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PLACEHOLDER_IMAGES } from '@/lib/placeholder-images';

export const metadata = {
  title: 'About Us - Abbot Kinney',
  description: 'Learn about our story, our commitment to quality, and our passion for California artisanal products.',
};

export default function AboutPage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="absolute inset-0">
          <Image
            src={PLACEHOLDER_IMAGES.hero}
            alt="California coastal landscape"
            fill
            className="object-cover opacity-30"
          />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Our Story
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed">
              From the sun-kissed shores of Venice Beach to the pristine mountains of Santa Monica, 
              we bring you the finest artisanal products that capture the essence of California.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">The Abbot Kinney Legacy</h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                             Abbot Kinney was a visionary entrepreneur and conservationist who transformed Venice Beach 
               into the vibrant cultural hub it is today. His passion for preserving California&apos;s natural 
               beauty while fostering artistic expression continues to inspire our work.
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Today, we honor his legacy by sourcing the finest ingredients from local producers and 
              crafting exceptional products that celebrate the diverse flavors and traditions of the 
              Golden State.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              From our wildflower honey harvested in the coastal regions to our hand-infused olive 
              oils from the Santa Monica Mountains, every product tells a story of place, tradition, 
              and passion.
            </p>
          </div>
          <div className="relative">
            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
              <Image
                src={PLACEHOLDER_IMAGES.about}
                alt="Abbot Kinney legacy"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality First</h3>
              <p className="text-gray-600">
                We never compromise on quality. Every product is carefully sourced and crafted to meet 
                the highest standards of excellence.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Sustainability</h3>
              <p className="text-gray-600">
                We&apos;re committed to sustainable practices that protect California&apos;s natural resources 
                and support local communities.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Community</h3>
              <p className="text-gray-600">
                We believe in building strong relationships with local producers, artisans, and 
                customers who share our passion for quality.
              </p>
            </div>
          </div>
        </div>

        {/* Process Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Source</h3>
              <p className="text-gray-600 text-sm">
                We carefully select the finest ingredients from trusted local producers.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Craft</h3>
              <p className="text-gray-600 text-sm">
                Our artisans use traditional methods to create exceptional products.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality</h3>
              <p className="text-gray-600 text-sm">
                Every product undergoes rigorous quality control testing.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                4
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Deliver</h3>
              <p className="text-gray-600 text-sm">
                We carefully package and ship your products with care.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Experience the Difference</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover our collection of premium artisanal products and taste the difference that 
            quality, tradition, and passion make.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg">
                Shop Our Products
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 