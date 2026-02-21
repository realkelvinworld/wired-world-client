import { clearCookies } from "@/app/auth/actions";
import { BaseApiResponse } from "@/interfaces";
import { getDeviceInfo } from "@/lib/utils";
import { http } from "../lib/http";
import { performLogout } from "../lib/logout";
import axios from "axios";

// verifyEmail service
export const verifyEmailService = (payload: { email: string; type: string }) =>
  http.post<BaseApiResponse<string>>(`/security/verify_email/`, payload);

// export const LoginService = (payload: {
//   username: string;
//   password: string;
//   admin: boolean;
//   device?: string;
// }) => http.post<LoginTempTokenResponse>(`/security/login/`, payload);
// // Login service
// export const LoginService = (payload: {
//   username: string;
//   password: string;
//   admin: boolean;
//   device?: string;
// }) => http.post<LoginTempTokenResponse>(`/security/login/`, payload);

// // Two step login service
// export const LoginServiceVerify = (payload: {
//   token: string;
//   device?: string;
//   code: string;
//   admin: boolean;
// }) => http.post<LoginFinalResponse>(`/security/two_factor_login/`, payload);

// // Logout service
// export const LogoutService = (payload: { device?: string }) =>
//   http.post<BaseApiResponse<string>>(`/security/logout/`, payload);

// // Forgot Password Request
// export const ForgotPasswordRequest = (payload: {
//   type: string;
//   email: string;
// }) => http.post<BaseApiResponse<string>>(`/security/reset_password/`, payload);

// // Forgot Password Submit
// export const ForgotPasswordSubmit = (payload: {
//   type: string;
//   email: string;
//   code: string;
// }) => http.post<BaseApiResponse<string>>(`/security/reset_password/`, payload);

// export const logoutService = async () => {
//   const deviceInfo = getDeviceInfo();
//   const deviceDetails = `${deviceInfo.device} - ${deviceInfo.browser.name} - ${deviceInfo.browser.version} - ${deviceInfo.os}`;
//   const response: any = await axios.post("/api/logout", {
//     device: deviceDetails,
//   });
//   if (response.data.success) {
//     clearCookies();
//     performLogout();
//   } else {
//     throw new Error("Logout failed");
//   }
// };
