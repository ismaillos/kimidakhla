export interface Product {
  id: string;
  name: string;
  nameAr?: string;
  cat: string;
  catLabel: string;
  price: number;
  oldPrice?: number;
  badge?: string;
  img: string;
  videoUrls?: { url: string; label: string }[];
  images?: string[];
  hook: string;
  hookAr?: string;
  ingredients: string;
  ingredientsAr?: string;
  usage: string;
  usageAr?: string;
  description: string;
  descriptionAr?: string;
  benefits: string[];
  certifications?: string[];
  ctaUrl: string;
  ctaLabel: string;
  ctaColor: string;
}

export const WHATSAPP_NUMBER = '212677031561';

export const CATEGORIES = [
  { key: 'tous', label: 'Tous' },
  { key: 'corps', label: 'Corps' },
  { key: 'cheveux', label: 'Cheveux' },
  { key: 'visage', label: 'Visage' },
  { key: 'complements', label: 'Compléments' },
  { key: 'bien-etre', label: 'Bien-être' },
];

// PRODUCTS_GO_HERE

export const PRODUCTS: Product[] = [
  // PRODUCTS_PLACEHOLDER
];
