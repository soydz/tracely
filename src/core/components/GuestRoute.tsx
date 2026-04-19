'use client'

import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext"
import { useEffect } from "react";

export function GuestRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // usuario autenticado se redirige al dashboard
        if (!isLoading && isAuthenticated) {
            router.push("/dashboard");
        }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) return null;

    return isAuthenticated ? null : <>{children}</>;
}