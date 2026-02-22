import { clearCookies } from "@/app/auth/actions";
import { BaseApiResponse, LoginResponse } from "@/interfaces";
import { getDeviceInfo } from "@/lib/utils";
import { http } from "../lib/http";
import { performLogout } from "../lib/logout";
import axios from "axios";
import { AuthResponse } from "@/models/user";

// requestEmail service
export const requestEmailService = (payload: { email: string; type: string }) =>
  http.post<BaseApiResponse<string>>(`/security/validate_email/`, payload);

// verify service
export const verifyEmailService = (payload: {
  email: string;
  type: string;
  code: string;
}) => http.post<BaseApiResponse<string>>(`/security/validate_email/`, payload);

export const signUpService = (payload: {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  country_id: number;
  device: string;
}) => http.post<BaseApiResponse<AuthResponse>>(`/security/register/`, payload);

// Login service
export const loginService = (payload: {
  email: string;
  password: string;
  device?: string;
}) => http.post<BaseApiResponse<LoginResponse>>(`/security/login/`, payload);

// Two step login service
export const loginVerifyService = (payload: {
  token: string;
  device?: string;
  code: string;
}) =>
  http.post<BaseApiResponse<AuthResponse>>(
    `/security/two_factor_login/`,
    payload,
  );

// Forgot Password Request
export const forgotPasswordRequestService = (payload: {
  email: string;
  type: string;
}) => http.post<BaseApiResponse<string>>(`/security/reset_password/`, payload);

// Forgot Password Reset
export const forgotPasswordResetService = (payload: {
  email: string;
  type: string;
  code: string;
  password: string;
}) => http.post<BaseApiResponse<string>>(`/security/reset_password/`, payload);

export const logoutService = async () => {
  const deviceInfo = getDeviceInfo();
  const deviceDetails = `${deviceInfo.device} - ${deviceInfo.browser.name} - ${deviceInfo.browser.version} - ${deviceInfo.os}`;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response: any = await axios.post("/api/logout", {
    device: deviceDetails,
  });
  if (response.data.success) {
    clearCookies();
    performLogout();
  } else {
    clearCookies();
    performLogout();
    throw new Error("Logout failed");
  }
};
