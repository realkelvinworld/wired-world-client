import { OrderItem } from "./order";

// Cart preview (guest / unauthenticated)
export interface CartPreview {
  subtotal: string;
  fees: string;
  total: string;
  items: OrderItem[];
}

// Paystack payment info returned after order creation
export interface PaystackInfo {
  authorization_url: string;
  access_code: string;
  reference: string;
}

// Guest order payload
export interface GuestOrderPayload {
  first_name: string;
  last_name: string;
  country_id: number;
  phone: string;
  email: string;
  company_name?: string;
  notes?: string;
  street_address: string;
  apartment?: string;
  city: string;
  region: string;
  zip: string;
  cart: { item_id: number; quantity: number }[];
}
