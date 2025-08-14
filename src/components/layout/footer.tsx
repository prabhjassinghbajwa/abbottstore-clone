import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* ABBOTT */}
          <div>
            <h3 className="text-lg font-bold mb-4">ABBOTT</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="https://www.abbott.com" className="text-gray-300 hover:text-white transition-colors">
                  Abbott.com
                </Link>
              </li>
              <li>
                <Link href="/store-locator" className="text-gray-300 hover:text-white transition-colors">
                  Store Locator
                </Link>
              </li>
              <li>
                <Link href="/terms-of-sale" className="text-gray-300 hover:text-white transition-colors">
                  Terms of Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="text-lg font-bold mb-4">SUPPORT</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shipping-returns" className="text-gray-300 hover:text-white transition-colors">
                  Shipping and Returns
                </Link>
              </li>
              <li>
                <Link href="/schedule-save" className="text-gray-300 hover:text-white transition-colors">
                  Schedule and Save
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* STAY CONNECTED */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold mb-4">STAY CONNECTED</h3>
            <div className="flex space-x-4 mb-6">
              <Link href="https://instagram.com/abbott" className="text-gray-300 hover:text-white transition-colors">
                <Instagram className="w-6 h-6" />
              </Link>
              <Link href="https://facebook.com/abbott" className="text-gray-300 hover:text-white transition-colors">
                <Facebook className="w-6 h-6" />
              </Link>
              <Link href="https://twitter.com/abbott" className="text-gray-300 hover:text-white transition-colors">
                <Twitter className="w-6 h-6" />
              </Link>
              <Link href="https://youtube.com/abbott" className="text-gray-300 hover:text-white transition-colors">
                <Youtube className="w-6 h-6" />
              </Link>
            </div>
            
            {/* Abbott Logo */}
            <div className="mb-6">
              <img 
                src="/images/real/abbott-footer-logo.png" 
                alt="Abbott" 
                className="h-8 w-auto"
              />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400 mb-4 md:mb-0">
              © 2025 Abbott. All Rights Reserved.
            </p>
            
            <div className="flex flex-wrap gap-4 text-sm">
              <Link href="/terms-of-use" className="text-gray-400 hover:text-white transition-colors">
                Terms of Use
              </Link>
              <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/advertising-preferences" className="text-gray-400 hover:text-white transition-colors">
                Advertising Preferences
              </Link>
              <Link href="/myabbott-privacy" className="text-gray-400 hover:text-white transition-colors">
                myAbbott Privacy Preferences
              </Link>
              <Link href="/consumer-health-data" className="text-gray-400 hover:text-white transition-colors">
                Consumer Health Data Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 