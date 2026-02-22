// User
export interface UserModel {
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
  image: string | null;
  language: string;
  country: string;
  websocket_token: string;
  is_staff: boolean;
  staff_role: string | null;
}

// Auth Response
export interface AuthResponse {
  token: string;
  user: UserModel;
  two_factor: string;
}
