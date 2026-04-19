"use client";

import { ReactNode } from "react";

import { GuestRoute } from "@/core/components/GuestRoute";

export default function AuthLayout({ children }: Readonly< { children: ReactNode }>) {
  return (
    <GuestRoute>
      <main className="flex-1 flex flex-col">{children}</main>
    </GuestRoute>
  );
}
