export const routes = {
  home: "/",
  shop: "/shop",
  products: "/products",
  brands: "/brands",
  showrooms: "/showrooms",
  about: "/about",
  contact: "/contact",
  blog: "/blog",
  help: "/help",
  privacy: "/privacy",
  terms: "/terms",
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
  },
};
