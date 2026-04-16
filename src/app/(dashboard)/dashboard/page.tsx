"use client";

import { Button } from "@heroui/react";

import { useAuth } from "@/core/contexts/AuthContext";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className="h-svh flex flex-col gap-2 items-center justify-center">
      <h1 className="text-4xl mb-3">Dashboard</h1>
      <p>Bienvenido, {user?.username}</p>
      <Button onPress={logout}>Logout</Button>
    </div>
  );
}
