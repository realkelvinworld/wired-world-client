export interface OrderItem {
  id: number;
  quantity: number;
  item__id: number;
  item__brand__name: string;
  item__brand__logo: string;
  item__brand__id: number;
  item__sku: string;
  item__name: string;
  item__images: string[];
  item__features: string[];
  item__currency: string;
  item__discounted_price: string;
  item__price: string;
  item__stock: number;
  item__on_promotion: boolean;
  item__category__id: number;
  item__category__name: string;
  item__category__main_category__id: number;
  item__category__main_category__name: string;
  item__category__main_category__icon: string | null;
  item__rating: number;
  item__discount: string;
  item__created: string;
}

export interface Order {
  id: number;
  order_id: string;
  payment_reference: string | null;
  items: OrderItem[];
  currency: string;
  total_amount: string;
  status: string;
  created: string;
}
