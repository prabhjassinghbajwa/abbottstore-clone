import { Product } from '@/types';
import { getProductImage } from '@/lib/real-images';

export const products: Product[] = [
  {
    id: '1',
    name: 'French Vanilla Ensure Max Protein',
    sku: 'ENSURE-MAX-VANILLA-001',
    price: 45.99,
    originalPrice: 52.99,
    description: 'Ensure Max Protein French Vanilla provides 30g of protein and 150 calories per serving. Perfect for active adults who need extra protein to support muscle health and recovery.',
    shortDescription: '30g protein, 150 calories per serving',
    category: 'Adult Nutrition',
    subcategory: 'Protein Shakes',
    brand: 'Ensure',
    images: [
      getProductImage('French Vanilla Ensure Max Protein'),
      getProductImage('French Vanilla Ensure Max Protein'),
      getProductImage('French Vanilla Ensure Max Protein')
    ],
    variants: [
      {
        id: '1-1',
        name: 'French Vanilla',
        sku: 'ENSURE-MAX-VANILLA-12PK',
        price: 45.99,
        originalPrice: 52.99,
        size: 'Case of 12',
        flavor: 'French Vanilla',
        images: [getProductImage('French Vanilla Ensure Max Protein')],
        inStock: true,
        stockQuantity: 45
      }
    ],
    features: [
      '30g of protein per serving',
      '150 calories',
      '24 vitamins and minerals',
      'Lactose-free',
      'Gluten-free'
    ],
    specifications: {
      'Protein': '30g',
      'Calories': '150',
      'Serving Size': '11 fl oz',
      'Servings Per Case': '12',
      'Storage': 'Store in a cool, dry place'
    },
    inStock: true,
    rating: 4.5,
    reviewCount: 128,
    tags: ['protein', 'vanilla', 'adult nutrition', 'muscle health'],
    createdAt: '2024-01-15',
    updatedAt: '2024-12-01',
    isNew: false,
    isFeatured: true,
    caseSize: 'Case of 12',
    flavor: 'French Vanilla',
    nutritionalInfo: {
      'Protein': '30g',
      'Calories': '150',
      'Fat': '3g',
      'Carbohydrates': '8g',
      'Sugar': '1g'
    }
  },
  {
    id: '2',
    name: 'EleCare Powder',
    sku: 'ELECARE-POWDER-002',
    price: 89.99,
    originalPrice: 99.99,
    description: 'EleCare is a hypoallergenic amino acid-based formula for infants and children with severe food allergies and multiple food protein intolerances.',
    shortDescription: 'Hypoallergenic amino acid-based formula',
    category: 'Infant & Child',
    subcategory: 'Infant Formula',
    brand: 'EleCare',
    images: [
      getProductImage('EleCare Powder'),
      getProductImage('EleCare Powder'),
      getProductImage('EleCare Powder')
    ],
    variants: [
      {
        id: '2-1',
        name: 'EleCare Powder',
        sku: 'ELECARE-POWDER-6PK',
        price: 89.99,
        originalPrice: 99.99,
        size: 'Case of 6',
        flavor: 'Unflavored',
        images: [getProductImage('EleCare Powder')],
        inStock: true,
        stockQuantity: 32
      }
    ],
    features: [
      'Amino acid-based formula',
      'Hypoallergenic',
      'For severe food allergies',
      'Complete nutrition',
      'Easy to digest'
    ],
    specifications: {
      'Formula Type': 'Amino Acid-Based',
      'Age Range': '0-12 months',
      'Servings Per Case': '6',
      'Preparation': 'Powder to liquid',
      'Storage': 'Store in a cool, dry place'
    },
    inStock: true,
    rating: 4.8,
    reviewCount: 89,
    tags: ['hypoallergenic', 'amino acid', 'infant formula', 'allergies'],
    createdAt: '2024-01-10',
    updatedAt: '2024-12-01',
    isNew: false,
    isFeatured: true,
    caseSize: 'Case of 6',
    flavor: 'Unflavored',
    nutritionalInfo: {
      'Protein': '3.2g',
      'Calories': '100',
      'Fat': '5.3g',
      'Carbohydrates': '10.3g'
    }
  },
  {
    id: '3',
    name: 'Fruit Punch Juven Powder',
    sku: 'JUVEN-FRUIT-PUNCH-003',
    price: 34.99,
    originalPrice: 39.99,
    description: 'Juven is a specialized nutritional supplement designed to help support wound healing. Contains arginine and glutamine to help support the body\'s natural healing process.',
    shortDescription: 'Specialized nutrition for wound healing support',
    category: 'Therapeutic Nutrition',
    subcategory: 'Wound Care',
    brand: 'Juven',
    images: [
      getProductImage('Fruit Punch Juven Powder'),
      getProductImage('Fruit Punch Juven Powder'),
      getProductImage('Fruit Punch Juven Powder')
    ],
    variants: [
      {
        id: '3-1',
        name: 'Fruit Punch',
        sku: 'JUVEN-FRUIT-PUNCH-30PK',
        price: 34.99,
        originalPrice: 39.99,
        size: '30-pack',
        flavor: 'Fruit Punch',
        images: [getProductImage('Fruit Punch Juven Powder')],
        inStock: true,
        stockQuantity: 28
      }
    ],
    features: [
      'Supports wound healing',
      'Contains arginine and glutamine',
      'Fruit punch flavor',
      'Easy to mix',
      'Clinically studied'
    ],
    specifications: {
      'Pack Size': '30-pack',
      'Flavor': 'Fruit Punch',
      'Serving Size': '1 packet',
      'Servings Per Pack': '30',
      'Storage': 'Store in a cool, dry place'
    },
    inStock: true,
    rating: 4.6,
    reviewCount: 156,
    tags: ['wound healing', 'arginine', 'glutamine', 'therapeutic'],
    createdAt: '2024-01-20',
    updatedAt: '2024-12-01',
    isNew: false,
    isFeatured: true,
    caseSize: '30-pack',
    flavor: 'Fruit Punch',
    nutritionalInfo: {
      'Calories': '80',
      'Protein': '0g',
      'Carbohydrates': '19g',
      'Sugar': '0g'
    }
  },
  {
    id: '4',
    name: 'Vanilla Nepro with CARBSTEADY Shake',
    sku: 'NEPRO-VANILLA-004',
    price: 67.99,
    originalPrice: 74.99,
    description: 'Nepro is a therapeutic nutrition drink designed specifically for people with kidney disease. Contains CARBSTEADY to help manage blood glucose levels.',
    shortDescription: 'Therapeutic nutrition for kidney disease',
    category: 'Therapeutic Nutrition',
    subcategory: 'Renal-Kidney Disease Management',
    brand: 'Nepro',
    images: [
      getProductImage('Vanilla Nepro with CARBSTEADY Shake'),
      getProductImage('Vanilla Nepro with CARBSTEADY Shake'),
      getProductImage('Vanilla Nepro with CARBSTEADY Shake')
    ],
    variants: [
      {
        id: '4-1',
        name: 'Vanilla',
        sku: 'NEPRO-VANILLA-24PK',
        price: 67.99,
        originalPrice: 74.99,
        size: 'Case of 24',
        flavor: 'Vanilla',
        images: [getProductImage('Vanilla Nepro with CARBSTEADY Shake')],
        inStock: true,
        stockQuantity: 15
      }
    ],
    features: [
      'Designed for kidney disease',
      'CARBSTEADY technology',
      'Low in potassium',
      'Low in phosphorus',
      'Vanilla flavor'
    ],
    specifications: {
      'Formula Type': 'Renal-Specific',
      'Flavor': 'Vanilla',
      'Servings Per Case': '24',
      'Serving Size': '8 fl oz',
      'Storage': 'Refrigerate after opening'
    },
    inStock: true,
    rating: 4.7,
    reviewCount: 203,
    tags: ['kidney disease', 'renal', 'CARBSTEADY', 'therapeutic'],
    createdAt: '2024-01-05',
    updatedAt: '2024-12-01',
    isNew: false,
    isFeatured: true,
    caseSize: 'Case of 24',
    flavor: 'Vanilla',
    nutritionalInfo: {
      'Calories': '425',
      'Protein': '19g',
      'Fat': '22g',
      'Carbohydrates': '43g',
      'Potassium': '470mg',
      'Phosphorus': '250mg'
    }
  },
  {
    id: '5',
    name: 'Chocolate Glucerna Protein Smart Shake',
    sku: 'GLUCERNA-CHOCOLATE-005',
    price: 38.99,
    originalPrice: 44.99,
    description: 'Glucerna Protein Smart Shake is designed for people with diabetes. Contains CARBSTEADY to help manage blood glucose levels.',
    shortDescription: 'Diabetes-friendly protein shake',
    category: 'Diabetes Management',
    subcategory: 'Protein Shakes',
    brand: 'Glucerna',
    images: [
      getProductImage('Chocolate Glucerna Protein Smart Shake'),
      getProductImage('Chocolate Glucerna Protein Smart Shake'),
      getProductImage('Chocolate Glucerna Protein Smart Shake')
    ],
    variants: [
      {
        id: '5-1',
        name: 'Chocolate',
        sku: 'GLUCERNA-CHOCOLATE-12PK',
        price: 38.99,
        originalPrice: 44.99,
        size: 'Case of 12',
        flavor: 'Chocolate',
        images: [getProductImage('Chocolate Glucerna Protein Smart Shake')],
        inStock: true,
        stockQuantity: 38
      }
    ],
    features: [
      'Designed for diabetes',
      'CARBSTEADY technology',
      '15g of protein',
      'Chocolate flavor',
      'Low glycemic impact'
    ],
    specifications: {
      'Formula Type': 'Diabetes-Specific',
      'Flavor': 'Chocolate',
      'Servings Per Case': '12',
      'Serving Size': '8 fl oz',
      'Storage': 'Refrigerate after opening'
    },
    inStock: true,
    rating: 4.4,
    reviewCount: 167,
    tags: ['diabetes', 'protein', 'chocolate', 'CARBSTEADY'],
    createdAt: '2024-01-12',
    updatedAt: '2024-12-01',
    isNew: false,
    isFeatured: false,
    caseSize: 'Case of 12',
    flavor: 'Chocolate',
    nutritionalInfo: {
      'Calories': '180',
      'Protein': '15g',
      'Fat': '6g',
      'Carbohydrates': '15g',
      'Sugar': '2g'
    }
  },
  {
    id: '6',
    name: 'Lemon Lime Pedialyte Sport Powder Packs',
    sku: 'PEDIALYTE-LEMON-LIME-006',
    price: 12.99,
    originalPrice: 15.99,
    description: 'Pedialyte Sport is designed to help prevent dehydration and restore fluids and electrolytes lost during exercise.',
    shortDescription: 'Electrolyte replacement for active adults',
    category: 'Active Lifestyle',
    subcategory: 'Sports Nutrition',
    brand: 'Pedialyte',
    images: [
      getProductImage('Lemon Lime Pedialyte Sport Powder Packs'),
      getProductImage('Lemon Lime Pedialyte Sport Powder Packs'),
      getProductImage('Lemon Lime Pedialyte Sport Powder Packs')
    ],
    variants: [
      {
        id: '6-1',
        name: 'Lemon Lime',
        sku: 'PEDIALYTE-LEMON-LIME-10PK',
        price: 12.99,
        originalPrice: 15.99,
        size: '10-pack',
        flavor: 'Lemon Lime',
        images: [getProductImage('Lemon Lime Pedialyte Sport Powder Packs')],
        inStock: true,
        stockQuantity: 52
      }
    ],
    features: [
      'Electrolyte replacement',
      'Lemon lime flavor',
      'Easy to mix',
      'Portable powder packs',
      'For active adults'
    ],
    specifications: {
      'Pack Size': '10-pack',
      'Flavor': 'Lemon Lime',
      'Serving Size': '1 packet',
      'Servings Per Pack': '10',
      'Storage': 'Store in a cool, dry place'
    },
    inStock: true,
    rating: 4.3,
    reviewCount: 234,
    tags: ['electrolytes', 'sports', 'lemon lime', 'hydration'],
    createdAt: '2024-01-08',
    updatedAt: '2024-12-01',
    isNew: false,
    isFeatured: false,
    caseSize: '10-pack',
    flavor: 'Lemon Lime',
    nutritionalInfo: {
      'Calories': '25',
      'Protein': '0g',
      'Carbohydrates': '6g',
      'Sugar': '0g',
      'Sodium': '490mg'
    }
  },
  {
    id: '7',
    name: 'Vanilla PediaSure Grow & Gain Shake Mix',
    sku: 'PEDIASURE-VANILLA-007',
    price: 28.99,
    originalPrice: 32.99,
    description: 'PediaSure Grow & Gain is a nutritional supplement designed to help children grow and gain weight. Contains 27 vitamins and minerals.',
    shortDescription: 'Nutritional supplement for children',
    category: 'Infant & Child',
    subcategory: 'Nutritional Supplements',
    brand: 'PediaSure',
    images: [
      getProductImage('Vanilla PediaSure Grow & Gain Shake Mix'),
      getProductImage('Vanilla PediaSure Grow & Gain Shake Mix'),
      getProductImage('Vanilla PediaSure Grow & Gain Shake Mix')
    ],
    variants: [
      {
        id: '7-1',
        name: 'Vanilla',
        sku: 'PEDIASURE-VANILLA-6PK',
        price: 28.99,
        originalPrice: 32.99,
        size: 'Case of 6',
        flavor: 'Vanilla',
        images: [getProductImage('Vanilla PediaSure Grow & Gain Shake Mix')],
        inStock: true,
        stockQuantity: 41
      }
    ],
    features: [
      '27 vitamins and minerals',
      '240 calories per serving',
      '7g of protein',
      'Vanilla flavor',
      'For children 2-13 years'
    ],
    specifications: {
      'Product Type': 'Shake Mix',
      'Flavor': 'Vanilla',
      'Servings Per Case': '6',
      'Age Range': '2-13 years',
      'Storage': 'Store in a cool, dry place'
    },
    inStock: true,
    rating: 4.6,
    reviewCount: 189,
    tags: ['children', 'growth', 'nutrition', 'vanilla'],
    createdAt: '2024-01-18',
    updatedAt: '2024-12-01',
    isNew: false,
    isFeatured: true,
    caseSize: 'Case of 6',
    flavor: 'Vanilla',
    nutritionalInfo: {
      'Calories': '240',
      'Protein': '7g',
      'Fat': '9g',
      'Carbohydrates': '33g',
      'Sugar': '15g'
    }
  },
  {
    id: '8',
    name: 'Infant Formula with Iron Similac Alimentum',
    sku: 'SIMILAC-ALIMENTUM-008',
    price: 89.99,
    originalPrice: 99.99,
    description: 'Similac Alimentum is a hypoallergenic formula for infants with food allergies and colic. Contains extensively hydrolyzed protein.',
    shortDescription: 'Hypoallergenic formula for food allergies',
    category: 'Infant & Child',
    subcategory: 'Infant Formula',
    brand: 'Similac',
    images: [
      getProductImage('Infant Formula with Iron Similac Alimentum'),
      getProductImage('Infant Formula with Iron Similac Alimentum'),
      getProductImage('Infant Formula with Iron Similac Alimentum')
    ],
    variants: [
      {
        id: '8-1',
        name: 'Infant Formula with Iron',
        sku: 'SIMILAC-ALIMENTUM-6PK',
        price: 89.99,
        originalPrice: 99.99,
        size: 'Case of 6',
        flavor: 'Unflavored',
        images: [getProductImage('Infant Formula with Iron Similac Alimentum')],
        inStock: true,
        stockQuantity: 23
      }
    ],
    features: [
      'Hypoallergenic formula',
      'Extensively hydrolyzed protein',
      'For food allergies and colic',
      'With iron',
      'Complete nutrition'
    ],
    specifications: {
      'Formula Type': 'Hypoallergenic',
      'Age Range': '0-12 months',
      'Servings Per Case': '6',
      'Preparation': 'Ready-to-feed',
      'Storage': 'Refrigerate after opening'
    },
    inStock: true,
    rating: 4.8,
    reviewCount: 145,
    tags: ['hypoallergenic', 'infant formula', 'food allergies', 'colic'],
    createdAt: '2024-01-03',
    updatedAt: '2024-12-01',
    isNew: false,
    isFeatured: true,
    caseSize: 'Case of 6',
    flavor: 'Unflavored',
    nutritionalInfo: {
      'Calories': '100',
      'Protein': '2.8g',
      'Fat': '5.3g',
      'Carbohydrates': '10.3g',
      'Iron': '1.8mg'
    }
  },
  {
    id: '9',
    name: 'Vanilla PediaSure 1.5 Cal',
    sku: 'PEDIASURE-1.5-CAL-009',
    price: 42.99,
    originalPrice: 48.99,
    description: 'PediaSure 1.5 Cal is a high-calorie nutritional supplement designed for children who need extra calories to support growth and development.',
    shortDescription: 'High-calorie nutrition for children',
    category: 'Infant & Child',
    subcategory: 'Nutritional Supplements',
    brand: 'PediaSure',
    images: [
      getProductImage('Vanilla PediaSure 1.5 Cal'),
      getProductImage('Vanilla PediaSure 1.5 Cal'),
      getProductImage('Vanilla PediaSure 1.5 Cal')
    ],
    variants: [
      {
        id: '9-1',
        name: 'Vanilla',
        sku: 'PEDIASURE-1.5-CAL-6PK',
        price: 42.99,
        originalPrice: 48.99,
        size: 'Case of 6',
        flavor: 'Vanilla',
        images: [getProductImage('Vanilla PediaSure 1.5 Cal')],
        inStock: true,
        stockQuantity: 19
      }
    ],
    features: [
      '1.5 calories per ml',
      '27 vitamins and minerals',
      'High protein content',
      'Vanilla flavor',
      'For children 1-13 years'
    ],
    specifications: {
      'Product Type': 'High-Calorie Supplement',
      'Flavor': 'Vanilla',
      'Servings Per Case': '6',
      'Age Range': '1-13 years',
      'Storage': 'Refrigerate after opening'
    },
    inStock: true,
    rating: 4.7,
    reviewCount: 98,
    tags: ['high calorie', 'children', 'growth', 'vanilla'],
    createdAt: '2024-01-25',
    updatedAt: '2024-12-01',
    isNew: false,
    isFeatured: false,
    caseSize: 'Case of 6',
    flavor: 'Vanilla',
    nutritionalInfo: {
      'Calories': '360',
      'Protein': '9g',
      'Fat': '12g',
      'Carbohydrates': '48g',
      'Sugar': '18g'
    }
  },
  {
    id: '10',
    name: 'BinaxNOW COVID-19 / Flu A&B Combo Self Test',
    sku: 'BINAXNOW-COMBO-010',
    price: 24.99,
    originalPrice: 29.99,
    description: 'BinaxNOW COVID-19 / Flu A&B Combo Self Test is a rapid antigen test that can detect COVID-19, Flu A, and Flu B from a single nasal swab sample.',
    shortDescription: 'Rapid test for COVID-19 and Flu A&B',
    category: 'Home Diagnostic Tests',
    subcategory: 'COVID-19 Tests',
    brand: 'BinaxNOW',
    images: [
      getProductImage('BinaxNOW COVID-19 / Flu A&B Combo Self Test'),
      getProductImage('BinaxNOW COVID-19 / Flu A&B Combo Self Test'),
      getProductImage('BinaxNOW COVID-19 / Flu A&B Combo Self Test')
    ],
    variants: [
      {
        id: '10-1',
        name: 'Combo Self Test',
        sku: 'BINAXNOW-COMBO-2PK',
        price: 24.99,
        originalPrice: 29.99,
        size: '2-pack',
        flavor: 'N/A',
        images: [getProductImage('BinaxNOW COVID-19 / Flu A&B Combo Self Test')],
        inStock: true,
        stockQuantity: 67
      }
    ],
    features: [
      'Detects COVID-19, Flu A, and Flu B',
      'Rapid results in 15 minutes',
      'Easy-to-use nasal swab',
      'FDA authorized',
      'Single test for multiple viruses'
    ],
    specifications: {
      'Test Type': 'Rapid Antigen',
      'Pack Size': '2-pack',
      'Results Time': '15 minutes',
      'Sample Type': 'Nasal swab',
      'Storage': 'Store at room temperature'
    },
    inStock: true,
    rating: 4.5,
    reviewCount: 312,
    tags: ['COVID-19', 'flu test', 'rapid test', 'diagnostic'],
    createdAt: '2024-01-30',
    updatedAt: '2024-12-01',
    isNew: true,
    isFeatured: true,
    caseSize: '2-pack',
    flavor: 'N/A',
    nutritionalInfo: {}
  },
  {
    id: '11',
    name: 'Classic Vanilla Glucerna Hunger Smart Meal Shake',
    sku: 'GLUCERNA-HUNGER-SMART-011',
    price: 35.99,
    originalPrice: 40.99,
    description: 'Glucerna Hunger Smart Meal Shake is designed for people with diabetes who want to manage hunger and blood glucose levels.',
    shortDescription: 'Diabetes-friendly meal replacement',
    category: 'Diabetes Management',
    subcategory: 'Meal Replacements',
    brand: 'Glucerna',
    images: [
      getProductImage('Classic Vanilla Glucerna Hunger Smart Meal Shake'),
      getProductImage('Classic Vanilla Glucerna Hunger Smart Meal Shake'),
      getProductImage('Classic Vanilla Glucerna Hunger Smart Meal Shake')
    ],
    variants: [
      {
        id: '11-1',
        name: 'Classic Vanilla',
        sku: 'GLUCERNA-HUNGER-SMART-6PK',
        price: 35.99,
        originalPrice: 40.99,
        size: 'Case of 6',
        flavor: 'Classic Vanilla',
        images: [getProductImage('Classic Vanilla Glucerna Hunger Smart Meal Shake')],
        inStock: true,
        stockQuantity: 29
      }
    ],
    features: [
      'Designed for diabetes',
      'Hunger management',
      'CARBSTEADY technology',
      'Classic vanilla flavor',
      'Meal replacement'
    ],
    specifications: {
      'Formula Type': 'Diabetes-Specific',
      'Flavor': 'Classic Vanilla',
      'Servings Per Case': '6',
      'Serving Size': '8 fl oz',
      'Storage': 'Refrigerate after opening'
    },
    inStock: true,
    rating: 4.3,
    reviewCount: 156,
    tags: ['diabetes', 'meal replacement', 'vanilla', 'hunger management'],
    createdAt: '2024-01-22',
    updatedAt: '2024-12-01',
    isNew: false,
    isFeatured: false,
    caseSize: 'Case of 6',
    flavor: 'Classic Vanilla',
    nutritionalInfo: {
      'Calories': '200',
      'Protein': '10g',
      'Fat': '8g',
      'Carbohydrates': '20g',
      'Sugar': '3g'
    }
  },
  {
    id: '12',
    name: 'Infant Formula with Iron Similac 360 Total Care',
    sku: 'SIMILAC-360-TOTAL-CARE-012',
    price: 79.99,
    originalPrice: 89.99,
    description: 'Similac 360 Total Care is a complete infant formula with iron that supports brain and eye development with DHA and lutein.',
    shortDescription: 'Complete infant formula with iron',
    category: 'Infant & Child',
    subcategory: 'Infant Formula',
    brand: 'Similac',
    images: [
      getProductImage('Infant Formula with Iron Similac 360 Total Care'),
      getProductImage('Infant Formula with Iron Similac 360 Total Care'),
      getProductImage('Infant Formula with Iron Similac 360 Total Care')
    ],
    variants: [
      {
        id: '12-1',
        name: 'Infant Formula with Iron',
        sku: 'SIMILAC-360-TOTAL-CARE-6PK',
        price: 79.99,
        originalPrice: 89.99,
        size: 'Case of 6',
        flavor: 'Unflavored',
        images: [getProductImage('Infant Formula with Iron Similac 360 Total Care')],
        inStock: true,
        stockQuantity: 34
      }
    ],
    features: [
      'Complete nutrition',
      'With iron for development',
      'DHA for brain development',
      'Lutein for eye health',
      'For infants 0-12 months'
    ],
    specifications: {
      'Formula Type': 'Complete Nutrition',
      'Age Range': '0-12 months',
      'Servings Per Case': '6',
      'Preparation': 'Ready-to-feed',
      'Storage': 'Refrigerate after opening'
    },
    inStock: true,
    rating: 4.9,
    reviewCount: 278,
    tags: ['infant formula', 'iron', 'DHA', 'complete nutrition'],
    createdAt: '2024-01-07',
    updatedAt: '2024-12-01',
    isNew: false,
    isFeatured: true,
    caseSize: 'Case of 6',
    flavor: 'Unflavored',
    nutritionalInfo: {
      'Calories': '100',
      'Protein': '2.1g',
      'Fat': '5.3g',
      'Carbohydrates': '10.3g',
      'Iron': '1.8mg',
      'DHA': '17mg'
    }
  }
]; 