export const routes = {
  home: "/",
  shop: {
    shop: "/shop",
    productDetails: (id: number) => `/shop/${id}`,
  },
  brands: "/brands",
  showrooms: "/showrooms",
  about: "/about",
  contact: "/contact",
  blog: "/blog",
  privacy: "/privacy",
  terms: "/terms",
  checkout: "/checkout",
  user: {
    dashboard: "/user",
    orderHistory: "/user/order-history",
    userDetails: "/user/[id]",
  },
  auth: {
    login: {
      login: "/auth/login",
      otpInput: "/auth/login/otp-input",
    },
    signUp: {
      signUpVerify: "/auth/sign-up/verify",
      otpInput: "/auth/sign-up/otp-input",
      signUpUser: "/auth/sign-up",
    },
    forgotPassword: {
      request: "/auth/forgot-password",
      reset: "/auth/forgot-password/reset",
    },
  },
};
