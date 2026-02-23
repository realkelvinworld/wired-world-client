export interface Announcement {
  id: number;
  content: string;
  created: string;
}

export interface Brand {
  id: number;
  name: string;
  description: string;
  banners: string[];
  logo: string;
  enabled: boolean;
}

export interface SubCategory {
  id: number;
  main_category_id: number;
  name: string;
  enabled: boolean;
}

export interface MainCategory {
  id: number;
  name: string;
  icon: string | null;
  description: string;
  enabled: boolean;
  sub_categories: SubCategory[];
}

export interface NavbarData {
  announcements: Announcement[];
  brands: Brand[];
  main_categories: MainCategory[];
}
