"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { useState } from "react";

import { AuthProvider } from "./contexts/AuthContext";

export function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  // Factory pattern: evita memory leaks y shared state entre requests
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,     // 5 min: datos "frescos" sin refetch. Datos de la memoria
            gcTime: 1000 * 60 * 10,       // 10 min: tiempo en caché antes de ser borrados
            retry: 2,                     // 2 reintento ante fallos de red
            refetchOnWindowFocus: false,  // no refresca los datos cuando el usuario cambia de pestaña y vuelve
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
      <QueryClientProvider client={queryClient}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
