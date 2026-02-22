import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WebTokenState {
  webToken: string | null;
  setWebToken: (code: string) => void;
  clearWebToken: () => void;
}

export const useWebTokenStore = create<WebTokenState>()(
  persist(
    (set) => ({
      webToken: null,
      setWebToken: (code: string) => set({ webToken: code }),
      clearWebToken: () => set({ webToken: null }),
    }),
    {
      name: "web-token",
    },
  ),
);

// store for resend OTP

export interface IOTPModel {
  email?: string;
  type?: "request" | "verify";
  isVerified?: boolean;
}
interface OtpStore {
  otpStore: IOTPModel | null;
  setOtpStore: (OtpModel: IOTPModel) => void;
  clearOtpStore: () => void;
}

export const useResendOtpStore = create<OtpStore>()((set) => ({
  otpStore: null,
  setOtpStore: (OtpModel: IOTPModel) =>
    set({
      otpStore: OtpModel,
    }),
  clearOtpStore: () => set({ otpStore: null }),
}));

// store for forgot password flow

interface ForgotPasswordState {
  email: string | null;
  setEmail: (email: string) => void;
  clearEmail: () => void;
}

export const useForgotPasswordStore = create<ForgotPasswordState>()((set) => ({
  email: null,
  setEmail: (email: string) => set({ email }),
  clearEmail: () => set({ email: null }),
}));
