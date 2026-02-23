export interface Product {
  id: number;
  brand__name: string;
  brand__logo: string;
  brand__id: number;
  sku: string;
  name: string;
  images: string[];
  features: string[];
  currency: string;
  discounted_price: string;
  price: string;
  stock: number;
  on_promotion: boolean;
  category__id: number;
  category__name: string;
  category__main_category__id: number;
  category__main_category__name: string;
  category__main_category__icon: string | null;
  rating: number;
  discount: string;
  created: string;
}
