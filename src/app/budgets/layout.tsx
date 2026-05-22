'use client'

import { ProtectedRoute } from "@/core/components/ProtectedRoute";
import { ReactNode } from "react";

export default function BudgetsLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <ProtectedRoute>
            <main className="mb-32 sm:mb-20">{children}</main>
        </ProtectedRoute>
    )
}