"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  // Factory pattern: evita memory leaks y shared state entre requests
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 min: datos "frescos" sin refetch
            gcTime: 1000 * 60 * 10, // 10 min: tiempo en caché (antes cacheTime)
            retry: 1, // 1 reintento ante fallos de red
            refetchOnWindowFocus: false, // ❌ Desactivado para apps financieras
            refetchOnMount: true,
          },
          mutations: {
            retry: 0, // Nunca reintentar mutaciones automáticamente
          },
        },
      }),
  );

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThemeProvider>
  );
}
