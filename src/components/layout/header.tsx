'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, User, ShoppingBag, Menu, X, Brain } from 'lucide-react';
import { useCart } from '@/contexts/cart-context';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { state } = useCart();

  const cartItemCount = state.itemCount;

  return (
    <header className="bg-white shadow-sm">
      {/* Top Banner */}
      <div className="bg-gray-700 text-white text-center py-2 text-sm">
        <p>
          Free Shipping on Orders Over $35.{' '}
          <Link href="/shipping-and-returns" className="underline hover:no-underline">
            Learn More.
          </Link>
        </p>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/images/real/abbott_header_logo.svg"
                alt="Abbott"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
              <Image
                src="/images/real/life-to-fullest.png"
                alt="life. to the fullest.®"
                width={100}
                height={20}
                className="h-4 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium">
                <span>SHOP BY BRAND</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              {/* Dropdown menu would go here */}
            </div>
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium">
                <span>SHOP BY NEED</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              {/* Dropdown menu would go here */}
            </div>
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* AI Assistant Button */}
            <Link
              href="/ai-mode"
              className="flex items-center space-x-1 text-gray-700 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-2 rounded-md hover:from-purple-600 hover:to-blue-600 transition-all duration-200"
            >
              <Brain className="w-5 h-5" />
              <span className="hidden md:inline text-sm font-medium">AI Assistant</span>
            </Link>

            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="flex items-center space-x-1 text-gray-700 hover:text-blue-600"
            >
              <Search className="w-5 h-5" />
              <span className="hidden md:inline text-sm font-medium">PRODUCT SEARCH</span>
            </button>

            {/* Account */}
            <Link href="/account" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
              <User className="w-5 h-5" />
              <span className="hidden md:inline text-sm font-medium">LOGIN/REGISTER</span>
            </Link>

            {/* Cart */}
            <Link href="/cart" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 relative">
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 hover:text-blue-600"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Product Search</h3>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex">
              <input
                type="text"
                placeholder="Search products..."
                className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 text-white px-6 py-2 rounded-r-md hover:bg-blue-700">
                Search
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40">
          <div className="bg-white h-full w-80 max-w-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Menu</h3>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="space-y-4">
              <Link
                href="/ai-mode"
                className="block text-gray-700 hover:text-blue-600 font-medium bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-2 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center space-x-2">
                  <Brain className="w-5 h-5" />
                  <span>AI Assistant</span>
                </div>
              </Link>
              <Link
                href="/brands"
                className="block text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                SHOP BY BRAND
              </Link>
              <Link
                href="/categories"
                className="block text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                SHOP BY NEED
              </Link>
              <Link
                href="/account"
                className="block text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                LOGIN/REGISTER
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
} 