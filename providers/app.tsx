/**
 * App Provider
 * Wraps the application with necessary providers and configurations.
 */
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppProgressProvider } from "@bprogress/next";
import { ThemeProvider } from "next-themes";

import { Toaster } from "../components/ui/sonner";

function AppProvider({ children }: { children: React.ReactNode }) {
  // Tanstack configs
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 5,
        retry: false,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" attribute="class">
        <AppProgressProvider
          shallowRouting
          color="oklch(0.6231 0.188 259.8145)"
          options={{ showSpinner: false }}
        >
          {children}
        </AppProgressProvider>
        <Toaster />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default AppProvider;
