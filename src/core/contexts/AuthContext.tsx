"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo
} from "react";
import { AuthContextType, User } from "../types/auth";
import { sessionService } from "../services/session.service";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = useCallback((userData: User) => {
    setUser(userData);
    setIsLoading(false);
  },[]);
  
  const logout = useCallback(() => {
    sessionService.clearSession();
    setUser(null);
    router.push("/login");
  }, [router]);

  useEffect(() => {
    // funcion que reaciona al evento
    const handleLogoutEvent = () => {
      logout();
    };

    const handleUnauthorizedEvent = () => {
      router.push("/unauthorized");
    };

    globalThis.addEventListener("auth:logout", handleLogoutEvent);
    globalThis.addEventListener("auth:unauthorized", handleUnauthorizedEvent);

    // inicializa sesión
    const initializeAuth = () => {
      const userData = sessionService.getSession();
      
      if (!userData) {
        logout(); // token pero invalido
        sessionService.clearSession();
      }

      setUser(userData);
      setIsLoading(false);
    };

    initializeAuth();

    // limpieza
    return () => {
      globalThis.removeEventListener("auth:logout", handleLogoutEvent);
      globalThis.removeEventListener("auth:unauthorized", handleUnauthorizedEvent);
    }
  }, [logout]);

  const authValue = useMemo(() => ({
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  }), [user, isLoading, logout]);

  return (
    <AuthContext.Provider value={ authValue} >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
