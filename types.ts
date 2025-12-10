import { LucideIcon } from 'lucide-react';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  delay: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export type PortfolioCategory = 'all' | 'manualidades' | 'madera' | '3d';

export interface PortfolioItem {
  id: string;
  title: string;
  category: PortfolioCategory;
  categoryLabel: string; // Display name
  image: string;
  price: string; // Display string "$450"
  priceValue: number; // Numeric value for cart logic 450
  color: string; // Brand color for accents
}

export interface CartItem extends PortfolioItem {
  quantity: number;
}

export type PaymentMethod = 'yape' | 'plin' | null;