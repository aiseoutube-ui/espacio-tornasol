import { Palette, Heart, Package, Baby, Star, Sun, Leaf } from 'lucide-react';
import { ServiceItem, PortfolioItem } from './types';

export const BRAND_COLORS = {
  yellow: '#F4D35E', // Sun
  pink: '#EE969A',   // Heart
  teal: '#2A9D8F',   // Leaf
  dark: '#264653',   // Text
  cream: '#FDFBF7',  // Bg
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'art-classes',
    title: 'Clases de Arte',
    description: 'Espacios creativos donde los niños exploran texturas, colores y formas libremente.',
    icon: Palette,
    color: 'bg-yellow-100 text-yellow-600',
    delay: '0ms',
  },
  {
    id: 'workshops',
    title: 'Talleres para Niños',
    description: 'Experiencias temáticas diseñadas para despertar la curiosidad y la imaginación.',
    icon: Star,
    color: 'bg-teal-100 text-teal-600',
    delay: '100ms',
  },
  {
    id: 'kits',
    title: 'Kits y Materiales',
    description: 'Cajas educativas curadas con amor para seguir creando y aprendiendo en casa.',
    icon: Package,
    color: 'bg-orange-100 text-orange-600',
    delay: '200ms',
  },
  {
    id: 'early-support',
    title: 'Acompañamiento Temprano',
    description: 'Guía y apoyo emocional para el desarrollo saludable en la primera infancia.',
    icon: Baby,
    color: 'bg-pink-100 text-pink-600',
    delay: '300ms',
  },
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: '1',
    title: 'Set de Bloques Naturales',
    category: 'madera',
    categoryLabel: 'Juguetes de Madera',
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=800&auto=format&fit=crop',
    color: BRAND_COLORS.teal,
    price: 'S/ 85.00',
    priceValue: 85.00
  },
  {
    id: '2',
    title: 'Abecedario Táctil 3D',
    category: '3d',
    categoryLabel: 'Impresión 3D',
    image: 'https://images.unsplash.com/photo-1623939012339-5e51630aa70c?q=80&w=800&auto=format&fit=crop',
    color: BRAND_COLORS.pink,
    price: 'S/ 65.00',
    priceValue: 65.00
  },
  {
    id: '3',
    title: 'Kit de Pintura "Pequeños Artistas"',
    category: 'manualidades',
    categoryLabel: 'Manualidades',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop',
    color: BRAND_COLORS.yellow,
    price: 'S/ 120.00',
    priceValue: 120.00
  },
  {
    id: '4',
    title: 'Puzzle Geométrico Montessori',
    category: 'madera',
    categoryLabel: 'Juguetes de Madera',
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=800&auto=format&fit=crop',
    color: BRAND_COLORS.teal,
    price: 'S/ 55.00',
    priceValue: 55.00
  },
  {
    id: '5',
    title: 'Letras Personalizadas Gigantes',
    category: '3d',
    categoryLabel: 'Impresión 3D',
    image: 'https://images.unsplash.com/photo-1560421683-6856ea585c78?q=80&w=800&auto=format&fit=crop',
    color: BRAND_COLORS.pink,
    price: 'S/ 45.00 c/u',
    priceValue: 45.00
  },
  {
    id: '6',
    title: 'Caja Sensorial de Estaciones',
    category: 'manualidades',
    categoryLabel: 'Manualidades',
    image: 'https://images.unsplash.com/photo-1502086223501-636a92e67e8d?q=80&w=800&auto=format&fit=crop',
    color: BRAND_COLORS.yellow,
    price: 'S/ 140.00',
    priceValue: 140.00
  },
];

export const CONTACT_INFO = {
  instagram: '@espacio_tornasol',
  owner: '@cynthiaqueens',
  email: 'hola@tornasol.com',
  whatsapp: '14383904989'
};

export const PAYMENT_METHODS = {
  yape: {
    name: 'Yape',
    color: '#742274',
    qrImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png' // Placeholder
  },
  plin: {
    name: 'Plin',
    color: '#00C7B1',
    qrImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png' // Placeholder
  }
};