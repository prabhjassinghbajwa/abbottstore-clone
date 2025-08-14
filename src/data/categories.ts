import { Category } from '@/types';
import { getCategoryImage } from '@/lib/real-images';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Adult Nutrition',
    slug: 'adult-nutrition',
    description: 'Complete nutritional solutions for adults, including protein shakes, meal replacements, and specialized formulas',
    image: getCategoryImage('Adult Nutrition'),
    featured: true,
    subcategories: ['Protein Shakes', 'Meal Replacements', 'Nutritional Supplements'],
    productCount: 15
  },
  {
    id: '2',
    name: 'Diabetes Management',
    slug: 'diabetes-management',
    description: 'Specialized nutrition products designed to help manage blood glucose levels and support diabetes care',
    image: getCategoryImage('Diabetes Management'),
    featured: true,
    subcategories: ['Nutritional Shakes', 'Meal Replacements', 'Blood Glucose Management'],
    productCount: 12
  },
  {
    id: '3',
    name: 'Infant & Child',
    slug: 'infant-child',
    description: 'Complete nutrition for infants and children, from formula to nutritional supplements for growth and development',
    image: getCategoryImage('Infant & Child'),
    featured: true,
    subcategories: ['Infant Formula', 'Nutritional Supplements', 'Growth & Development'],
    productCount: 18
  },
  {
    id: '4',
    name: 'Therapeutic Nutrition',
    slug: 'therapeutic-nutrition',
    description: 'Specialized nutrition products for specific medical conditions and therapeutic needs',
    image: getCategoryImage('Therapeutic Nutrition'),
    featured: true,
    subcategories: ['Renal-Kidney Disease Management', 'Wound Care', 'Metabolic Nutrition'],
    productCount: 10
  },
  {
    id: '5',
    name: 'Active Lifestyle',
    slug: 'active-lifestyle',
    description: 'Nutrition and hydration solutions for active adults and athletes',
    image: getCategoryImage('Active Lifestyle'),
    featured: false,
    subcategories: ['Hydration', 'Sports Nutrition', 'Recovery'],
    productCount: 8
  },
  {
    id: '6',
    name: 'Home Diagnostic Tests',
    slug: 'home-diagnostic-tests',
    description: 'At-home testing solutions for various health conditions and monitoring',
    image: getCategoryImage('Home Diagnostic Tests'),
    featured: false,
    subcategories: ['COVID-19 Tests', 'Flu Tests', 'Health Monitoring'],
    productCount: 6
  },
  {
    id: '7',
    name: 'Metabolic Nutrition',
    slug: 'metabolic-nutrition',
    description: 'Specialized nutrition for metabolic disorders and weight management',
    image: getCategoryImage('Metabolic Nutrition'),
    featured: false,
    subcategories: ['Weight Management', 'Metabolic Disorders', 'Nutrition Support'],
    productCount: 7
  },
  {
    id: '8',
    name: 'Nutrition During Cancer',
    slug: 'nutrition-during-cancer',
    description: 'Specialized nutrition support for patients undergoing cancer treatment',
    image: getCategoryImage('Nutrition During Cancer'),
    featured: false,
    subcategories: ['Treatment Support', 'Recovery Nutrition', 'Symptom Management'],
    productCount: 5
  }
]; 