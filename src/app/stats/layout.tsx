import { ProtectedRoute } from "@/core/components/ProtectedRoute";
import { ReactNode } from "react";

export default function StatsLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <ProtectedRoute>
            <main className="flex-1 flex flex-col mb-32 sm:mb-20">{children}</main>
        </ProtectedRoute>
    )
}