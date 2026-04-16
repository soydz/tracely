"use client";

import { ReactNode } from "react";

import { ProtectedRoute } from "@/core/components/ProtectedRoute";

export default function DashboardLayout({ children }: Readonly< { children: ReactNode }>) {
  return (
    <ProtectedRoute>
      <main>{children}</main>
    </ProtectedRoute>
  );
}
