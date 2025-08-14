import { Brand } from '@/types';
import { getBrandLogo } from '@/lib/real-images';

export const brands: Brand[] = [
  {
    id: '1',
    name: 'Ensure',
    slug: 'ensure',
    logo: getBrandLogo('Ensure'),
    description: 'Complete, balanced nutrition for adults. Ensure provides essential nutrients to help maintain strength and energy.',
    featured: true,
    productCount: 8
  },
  {
    id: '2',
    name: 'Glucerna',
    slug: 'glucerna',
    logo: getBrandLogo('Glucerna'),
    description: 'Specialized nutrition for people with diabetes. Glucerna products help manage blood glucose levels.',
    featured: true,
    productCount: 6
  },
  {
    id: '3',
    name: 'Similac',
    slug: 'similac',
    logo: getBrandLogo('Similac'),
    description: 'Complete infant nutrition. Similac formulas support baby\'s growth and development from day one.',
    featured: true,
    productCount: 5
  },
  {
    id: '4',
    name: 'Pedialyte',
    slug: 'pedialyte',
    logo: getBrandLogo('Pedialyte'),
    description: 'Advanced hydration solutions for children and adults. Pedialyte helps replenish fluids and electrolytes.',
    featured: true,
    productCount: 4
  },
  {
    id: '5',
    name: 'PediaSure',
    slug: 'pediasure',
    logo: getBrandLogo('PediaSure'),
    description: 'Complete nutrition for children. PediaSure helps support growth and development in children.',
    featured: true,
    productCount: 3
  },
  {
    id: '6',
    name: 'Nepro',
    slug: 'nepro',
    logo: getBrandLogo('Nepro'),
    description: 'Therapeutic nutrition for people with kidney disease. Nepro is specifically designed for renal health.',
    featured: false,
    productCount: 2
  },
  {
    id: '7',
    name: 'EleCare',
    slug: 'elecare',
    logo: getBrandLogo('EleCare'),
    description: 'Hypoallergenic amino acid-based formula for infants and children with severe food allergies.',
    featured: false,
    productCount: 2
  },
  {
    id: '8',
    name: 'Juven',
    slug: 'juven',
    logo: getBrandLogo('Juven'),
    description: 'Specialized nutrition for wound healing support. Juven contains arginine and glutamine.',
    featured: false,
    productCount: 1
  },
  {
    id: '9',
    name: 'BinaxNOW',
    slug: 'binaxnow',
    logo: getBrandLogo('BinaxNOW'),
    description: 'Rapid diagnostic tests for COVID-19 and flu. BinaxNOW provides quick, reliable results.',
    featured: false,
    productCount: 2
  },
  {
    id: '10',
    name: 'FreeStyle',
    slug: 'freestyle',
    logo: getBrandLogo('FreeStyle'),
    description: 'Diabetes management solutions. FreeStyle products help monitor blood glucose levels.',
    featured: false,
    productCount: 3
  }
]; 