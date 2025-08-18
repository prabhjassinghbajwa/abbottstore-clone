# Abbott Store Clone - Deployment Documentation

## 🚀 Deployment Overview

### **Architecture Overview**
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Development   │    │   Staging       │    │   Production    │
│   (Local)       │───►│   (Vercel)      │───►│   (Vercel)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Git Repo      │    │   Preview       │    │   Live Site     │
│   (GitHub)      │    │   Deployments   │    │   (Vercel)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### **Technology Stack**
- **Frontend**: Next.js 15 with App Router
- **Styling**: Tailwind CSS 3.4.0
- **Language**: TypeScript
- **Hosting**: Vercel (recommended)
- **Version Control**: GitHub
- **CI/CD**: GitHub Actions + Vercel

## 🛠️ Local Development Setup

### **Prerequisites**
```bash
# Required Software
- Node.js 18+ (LTS recommended)
- npm 9+ or yarn 1.22+
- Git 2.30+
- Code editor (VS Code recommended)
```

### **Initial Setup**
```bash
# 1. Clone Repository
git clone https://github.com/prabhjassinghbajwa/abbottstore-clone.git
cd abbotstore-clone

# 2. Install Dependencies
npm install

# 3. Start Development Server
npm run dev

# 4. Open Browser
# Navigate to http://localhost:3000
```

### **Environment Configuration**
```bash
# Create .env.local file
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=https://api.example.com
NODE_ENV=development
NEXT_TELEMETRY_DISABLED=1
```

## 🌐 Production Deployment

### **Vercel Deployment (Recommended)**

#### **Step 1: Vercel Account Setup**
1. **Sign up** at [vercel.com](https://vercel.com)
2. **Connect GitHub account** for automatic deployments
3. **Import repository** from GitHub

#### **Step 2: Project Configuration**
```json
// vercel.json (optional)
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/"
    }
  ],
  "env": {
    "NEXT_PUBLIC_SITE_URL": "https://your-domain.vercel.app"
  }
}
```

#### **Step 3: Environment Variables**
```bash
# Production Environment Variables
NEXT_PUBLIC_SITE_URL=https://abbottstore-clone.vercel.app
NEXT_PUBLIC_API_URL=https://api.abbottstore.com
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

#### **Step 4: Deploy**
```bash
# Automatic deployment on git push
git push origin main

# Manual deployment
vercel --prod
```

### **Alternative Deployment Options**

#### **Netlify Deployment**
```bash
# 1. Build the project
npm run build

# 2. Deploy to Netlify
netlify deploy --prod --dir=out
```

#### **AWS Amplify Deployment**
```yaml
# amplify.yml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

## 🔄 CI/CD Pipeline

### **GitHub Actions Workflow**
```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Build project
      run: npm run build
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v25
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
```

### **Deployment Triggers**
- **Automatic**: Push to `main` branch
- **Preview**: Pull requests create preview deployments
- **Manual**: Manual deployment from Vercel dashboard

## 📊 Deployment Monitoring

### **Health Checks**
```typescript
// pages/api/health.ts
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version,
    environment: process.env.NODE_ENV
  })
}
```

### **Performance Monitoring**
```typescript
// lib/analytics.ts
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined') {
    // Google Analytics 4
    gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: url,
    })
  }
}

export const trackEvent = (action: string, category: string, label?: string) => {
  if (typeof window !== 'undefined') {
    gtag('event', action, {
      event_category: category,
      event_label: label,
    })
  }
}
```

### **Error Tracking**
```typescript
// lib/error-tracking.ts
export const logError = (error: Error, context?: any) => {
  console.error('Application Error:', {
    message: error.message,
    stack: error.stack,
    context,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    url: window.location.href
  })
}
```

## 🔧 Build Configuration

### **Next.js Configuration**
```typescript
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['abbottstore.com', 'localhost'],
    formats: ['image/webp', 'image/avif'],
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  reactStrictMode: true,
  swcMinify: true,
}

export default nextConfig
```

### **Build Scripts**
```json
// package.json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

## 🚨 Troubleshooting

### **Common Deployment Issues**

#### **1. Build Failures**
```bash
# Check for TypeScript errors
npm run type-check

# Check for linting errors
npm run lint

# Clear cache and rebuild
rm -rf .next node_modules/.cache
npm install
npm run build
```

#### **2. Image Loading Issues**
```bash
# Verify image domains in next.config.ts
# Check image file permissions
# Ensure images are in public directory
```

#### **3. Environment Variables**
```bash
# Verify environment variables are set
# Check for typos in variable names
# Ensure variables are prefixed with NEXT_PUBLIC_ for client-side
```

### **Performance Issues**
```bash
# Analyze bundle size
npm run build
# Check .next/analyze for bundle analysis

# Optimize images
# Use Next.js Image component
# Implement lazy loading
```

## 📈 Deployment Metrics

### **Performance Benchmarks**
- **Build Time**: < 2 minutes
- **Deployment Time**: < 3 minutes
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

### **Resource Usage**
- **Bundle Size**: < 500KB gzipped
- **Image Assets**: < 2MB total
- **Memory Usage**: < 512MB
- **CPU Usage**: < 50% during build

### **Uptime & Reliability**
- **Uptime**: 99.9%
- **Error Rate**: < 0.1%
- **Response Time**: < 200ms
- **Availability**: 24/7

## 🔄 Rollback Procedures

### **Vercel Rollback**
```bash
# 1. Access Vercel Dashboard
# 2. Navigate to Deployments
# 3. Select previous deployment
# 4. Click "Promote to Production"

# Or via CLI
vercel rollback [deployment-url]
```

### **Git Rollback**
```bash
# 1. Revert to previous commit
git revert HEAD

# 2. Push changes
git push origin main

# 3. Trigger new deployment
```

## 🔮 Future Deployment Enhancements

### **Phase 1: Advanced CI/CD**
- [ ] **Automated Testing**: Unit and integration tests
- [ ] **Security Scanning**: Dependency vulnerability checks
- [ ] **Performance Testing**: Lighthouse CI integration
- [ ] **Staging Environment**: Pre-production testing

### **Phase 2: Multi-Environment**
- [ ] **Development Environment**: Local development
- [ ] **Staging Environment**: Pre-production testing
- [ ] **Production Environment**: Live site
- [ ] **Canary Deployments**: Gradual rollout

### **Phase 3: Monitoring & Alerting**
- [ ] **Real-time Monitoring**: Uptime and performance
- [ ] **Error Alerting**: Instant notification of issues
- [ ] **Performance Tracking**: Core Web Vitals monitoring
- [ ] **User Analytics**: Behavior and conversion tracking

### **Phase 4: Global Distribution**
- [ ] **CDN Integration**: Global content delivery
- [ ] **Edge Functions**: Serverless functions at edge
- [ ] **Multi-region Deployment**: Geographic distribution
- [ ] **Load Balancing**: Traffic distribution

---

**Document Version**: 1.0  
**Last Updated**: August 7, 2025  
**Maintained By**: DevOps Team 