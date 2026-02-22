import { cookies } from "next/headers";
import { routes } from "@/routes";

export async function checkAuthentication() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token");

    // Check if  authentication cookies exist
    if (!accessToken) {
      return { isAuthenticated: false, redirectTo: routes.auth.login.login };
    }

    return {
      isAuthenticated: true,
      redirectTo: routes.user.dashboard,
    };
  } catch (error) {
    console.error("Error checking authentication:", error);
    return { isAuthenticated: false, redirectTo: routes.auth.login.login };
  }
}

// User Dashboard routes — returns a redirect path if NOT authenticated, null otherwise
export async function requireAuthentication() {
  const { isAuthenticated } = await checkAuthentication();

  if (!isAuthenticated) {
    return routes.auth.login.login;
  }

  return null;
}

// Auth routes — returns a redirect path if already authenticated, null otherwise
export async function requireGuest() {
  const { isAuthenticated } = await checkAuthentication();

  if (isAuthenticated) {
    return routes.user.dashboard;
  }

  return null;
}
