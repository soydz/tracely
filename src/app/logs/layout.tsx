import { ProtectedRoute } from "@/core/components/ProtectedRoute";
import { ReactNode } from "react";

export default function LogsLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <ProtectedRoute>
            <main>{children}</main>
        </ProtectedRoute>
    )
}