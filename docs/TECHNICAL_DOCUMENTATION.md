# Abbott Store Clone - Technical Documentation

## 🏗️ System Architecture

### **High-Level Architecture**
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Data Layer    │    │   State Mgmt    │
│   (Next.js)     │◄──►│   (JSON Files)  │◄──►│   (React Context)│
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Components    │    │   Utilities     │    │   Persistence   │
│   (React)       │    │   (TypeScript)  │    │   (LocalStorage)│
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### **Component Architecture**
```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Homepage
│   ├── products/          # Product listing pages
│   ├── product/[id]/      # Product detail pages
│   ├── category/[slug]/   # Category pages
│   ├── cart/              # Shopping cart
│   └── search/            # Search functionality
├── components/            # Reusable React components
│   ├── layout/            # Header, Footer
│   ├── product/           # Product cards, grids
│   └── ui/                # UI components (buttons, badges)
├── contexts/              # React Context providers
│   └── cart-context.tsx   # Shopping cart state management
├── data/                  # Static data files
│   ├── products.json      # Product catalog
│   ├── categories.json    # Category definitions
│   └── brands.json        # Brand information
├── lib/                   # Utility functions
│   └── data.ts           # Data access layer
└── types/                 # TypeScript definitions
    └── index.ts          # Type definitions
```

## 🔧 Core Components

### **1. Next.js App Router**
- **File-based routing** with dynamic segments
- **Server-side rendering** for SEO optimization
- **Static site generation** for performance
- **Image optimization** with Next.js Image component

### **2. React Components**
```typescript
// Product Card Component
interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

// Shopping Cart Context
interface CartContextType {
  state: CartState;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}
```

### **3. Data Layer**
- **JSON-based data storage** for products, categories, and brands
- **TypeScript interfaces** for type safety
- **Utility functions** for data access and filtering
- **Real product data** from Abbott Store

## 📊 Data Flow & Processing

### **Product Data Flow**
```
JSON Files → Data Utilities → Components → UI Rendering
     ↓              ↓              ↓            ↓
products.json → getProducts() → ProductGrid → Product Cards
categories.json → getCategories() → CategoryPage → Category Display
brands.json → getBrands() → BrandSection → Brand Logos
```

### **Shopping Cart Flow**
```
User Action → Context Update → LocalStorage → UI Update
     ↓              ↓              ↓            ↓
Add to Cart → dispatch(ADD_ITEM) → saveCart() → Re-render
Remove Item → dispatch(REMOVE_ITEM) → saveCart() → Re-render
Update Qty → dispatch(UPDATE_QUANTITY) → saveCart() → Re-render
```

### **Search Functionality**
```
Search Input → Query Processing → Data Filtering → Results Display
     ↓              ↓              ↓              ↓
User Types → searchProducts() → Filter Logic → SearchResults
```

## 🔒 Security & Performance

### **Security Measures**
- **Input validation** for search queries
- **XSS prevention** with React's built-in protection
- **Type safety** with TypeScript
- **Secure image handling** with Next.js Image component

### **Performance Optimizations**
- **Static site generation** for fast page loads
- **Image optimization** with WebP format support
- **Code splitting** with dynamic imports
- **Lazy loading** for images and components
- **Caching** with Next.js built-in caching

### **Monitoring & Analytics**
- **Performance monitoring** with Next.js analytics
- **Error tracking** with console logging
- **User interaction tracking** with React hooks
- **Page load metrics** with Core Web Vitals

## ⚙️ Configuration Management

### **Environment Variables**
```bash
# Next.js Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=https://api.example.com

# Build Configuration
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

### **TypeScript Configuration**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### **Tailwind CSS Configuration**
```javascript
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'abbott-blue': '#159BD7',
        'abbott-gray': '#888B8D',
      },
      fontFamily: {
        'brandon': ['BrandonText-Regular', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

## 🔌 API Specifications

### **Internal Data APIs**
```typescript
// Product Data API
export function getProducts(): Product[]
export function getProductBySlug(slug: string): Product | null
export function getProductsByCategory(category: string): Product[]
export function searchProducts(query: string): Product[]

// Category Data API
export function getCategories(): Category[]
export function getCategoryBySlug(slug: string): Category | null
export function getFeaturedCategories(): Category[]

// Brand Data API
export function getBrands(): Brand[]
export function getBrandBySlug(slug: string): Brand | null
export function getFeaturedBrands(): Brand[]
```

### **Component APIs**
```typescript
// Product Grid Component
interface ProductGridProps {
  products: Product[];
  showViewAll?: boolean;
  className?: string;
}

// Product Card Component
interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

// Shopping Cart Context
interface CartContextType {
  state: CartState;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}
```

## 📈 Performance Metrics

### **Page Load Performance**
- **Homepage**: < 1.5s initial load
- **Product Pages**: < 2s with dynamic routing
- **Category Pages**: < 1.8s with static generation
- **Search Results**: < 500ms with client-side filtering

### **Image Performance**
- **Hero Images**: Optimized to < 200KB
- **Product Images**: Optimized to < 100KB each
- **Brand Logos**: Optimized to < 50KB each
- **Category Images**: Optimized to < 150KB each

### **Bundle Performance**
- **Main Bundle**: < 500KB gzipped
- **Component Chunks**: < 100KB each
- **Image Assets**: < 2MB total
- **Font Assets**: < 200KB total

## 🚀 Future Enhancements

### **Phase 1: Enhanced E-commerce**
- [ ] **Payment Integration**: Stripe/PayPal integration
- [ ] **User Authentication**: Login/registration system
- [ ] **Order Management**: Order tracking and history
- [ ] **Inventory Management**: Real-time stock updates

### **Phase 2: Advanced Features**
- [ ] **Product Reviews**: Customer review system
- [ ] **Wishlist**: Save products for later
- [ ] **Recommendations**: AI-powered product suggestions
- [ ] **Multi-language**: Internationalization support

### **Phase 3: Performance & Scale**
- [ ] **CDN Integration**: Global content delivery
- [ ] **Database Migration**: PostgreSQL/MongoDB integration
- [ ] **API Backend**: RESTful API development
- [ ] **Real-time Updates**: WebSocket integration

### **Phase 4: Analytics & Optimization**
- [ ] **Analytics Integration**: Google Analytics 4
- [ ] **A/B Testing**: Feature flag system
- [ ] **SEO Optimization**: Advanced meta tags and sitemaps
- [ ] **Performance Monitoring**: Real-time performance tracking

## 🔧 Development Workflow

### **Code Quality Standards**
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting and formatting
- **Prettier**: Consistent code formatting
- **Git Hooks**: Pre-commit validation

### **Testing Strategy**
- **Unit Tests**: Component and utility testing
- **Integration Tests**: Data flow and API testing
- **E2E Tests**: User workflow testing
- **Performance Tests**: Load and stress testing

### **Deployment Pipeline**
- **Development**: Local development with hot reload
- **Staging**: Preview deployments for testing
- **Production**: Automated deployment with Vercel
- **Monitoring**: Real-time performance and error tracking

---

**Document Version**: 1.0  
**Last Updated**: August 7, 2025  
**Maintained By**: Development Team 