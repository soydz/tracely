"use client";

import { ReactNode } from "react";

import { ProtectedRoute } from "@/core/components/ProtectedRoute";

export default function DashboardLayout({ children }: Readonly< { children: ReactNode }>) {
  return (
    <ProtectedRoute>
      <main className="flex-1 flex flex-col">{children}</main>
    </ProtectedRoute>
  );
}
