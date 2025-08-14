// Real Abbott Store product images
export const REAL_IMAGES = {
  hero: "/images/real/hero-mother-child.jpg",
  ensureMaxProtein: "/images/real/ensure-max-protein.jpg",
  elecare: "/images/real/elecare-powder.jpg",
  juven: "/images/real/juven-powder.jpg",
  nepro: "/images/real/nepro-shake.jpg",
  pediasure: "/images/real/pediasure-shake.jpg",
  similac: "/images/real/similac-formula.jpg",
  glucerna: "/images/real/glucerna-shake.jpg",
  pedialyte: "/images/real/pedialyte-sport.jpg",
  binaxnow: "/images/real/binaxnow-test.jpg",
  freestyle: "/images/real/freestyle-meter.jpg",
  
  // Category images
  adultNutrition: "/images/real/category-adult-nutrition.jpg",
  diabetesManagement: "/images/real/category-diabetes.jpg",
  infantChild: "/images/real/category-infant-child.jpg",
  therapeuticNutrition: "/images/real/category-therapeutic.jpg",
  activeLifestyle: "/images/real/category-active-lifestyle.jpg",
  homeDiagnosticTests: "/images/real/category-diagnostic.jpg",
  metabolicNutrition: "/images/real/category-metabolic.jpg",
  nutritionDuringCancer: "/images/real/category-cancer.jpg",
  
  // Brand logos
  ensure: "/images/real/brand-ensure.png",
  glucerna: "/images/real/brand-glucerna.png",
  similac: "/images/real/brand-similac.png",
  pedialyte: "/images/real/brand-pedialyte.png",
  pediasure: "/images/real/brand-pediasure.png",
  nepro: "/images/real/brand-nepro.png",
  elecare: "/images/real/brand-elecare.png",
  juven: "/images/real/brand-juven.png",
  binaxnow: "/images/real/brand-binaxnow.png",
  freestyle: "/images/real/brand-freestyle.png"
};

// Product image mapping function
export function getProductImage(productName: string): string {
  // Simple mapping based on product name keywords
  if (productName.includes('Ensure')) return REAL_IMAGES.ensureMaxProtein;
  if (productName.includes('EleCare')) return REAL_IMAGES.elecare;
  if (productName.includes('Juven')) return REAL_IMAGES.juven;
  if (productName.includes('Nepro')) return REAL_IMAGES.nepro;
  if (productName.includes('PediaSure')) return REAL_IMAGES.pediasure;
  if (productName.includes('Similac')) return REAL_IMAGES.similac;
  if (productName.includes('Glucerna')) return REAL_IMAGES.glucerna;
  if (productName.includes('Pedialyte')) return REAL_IMAGES.pedialyte;
  if (productName.includes('BinaxNOW')) return REAL_IMAGES.binaxnow;
  if (productName.includes('FreeStyle')) return REAL_IMAGES.freestyle;
  
  return REAL_IMAGES.ensureMaxProtein; // fallback
}

// Category image mapping function
export function getCategoryImage(categoryName: string): string {
  if (categoryName.includes('Adult Nutrition')) return REAL_IMAGES.adultNutrition;
  if (categoryName.includes('Diabetes')) return REAL_IMAGES.diabetesManagement;
  if (categoryName.includes('Infant') || categoryName.includes('Child')) return REAL_IMAGES.infantChild;
  if (categoryName.includes('Therapeutic')) return REAL_IMAGES.therapeuticNutrition;
  if (categoryName.includes('Active Lifestyle')) return REAL_IMAGES.activeLifestyle;
  if (categoryName.includes('Diagnostic')) return REAL_IMAGES.homeDiagnosticTests;
  if (categoryName.includes('Metabolic')) return REAL_IMAGES.metabolicNutrition;
  if (categoryName.includes('Cancer')) return REAL_IMAGES.nutritionDuringCancer;
  
  return REAL_IMAGES.adultNutrition; // fallback
}

// Brand logo mapping function
export function getBrandLogo(brandName: string): string {
  if (brandName.includes('Ensure')) return REAL_IMAGES.ensure;
  if (brandName.includes('Glucerna')) return REAL_IMAGES.glucerna;
  if (brandName.includes('Similac')) return REAL_IMAGES.similac;
  if (brandName.includes('Pedialyte')) return REAL_IMAGES.pedialyte;
  if (brandName.includes('PediaSure')) return REAL_IMAGES.pediasure;
  if (brandName.includes('Nepro')) return REAL_IMAGES.nepro;
  if (brandName.includes('EleCare')) return REAL_IMAGES.elecare;
  if (brandName.includes('Juven')) return REAL_IMAGES.juven;
  if (brandName.includes('BinaxNOW')) return REAL_IMAGES.binaxnow;
  if (brandName.includes('FreeStyle')) return REAL_IMAGES.freestyle;
  
  return REAL_IMAGES.ensure; // fallback
} 