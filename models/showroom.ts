export interface Showroom {
  id: number;
  region_id: number;
  enabled: boolean;
  images: string[] | null;
  location: string;
  description: string;
  tel: string;
  digital_address: string;
}
