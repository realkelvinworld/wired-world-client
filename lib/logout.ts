import { routes } from "@/routes";

export const performLogout = async () => {
  // grab device info
  try {
    // Clear client-side persisted data
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
      localStorage.removeItem("web-token");
      localStorage.removeItem("customer-role");
      sessionStorage.clear();

      // Force redirect to login page
      window.location.href = routes.auth.login.login;
    }
  } catch (error) {
    console.error("Error during logout:", error);
    // Fallback: force redirect even if there's an error
    if (typeof window !== "undefined") {
      window.location.href = routes.auth.login.login;
    }
  }
};
