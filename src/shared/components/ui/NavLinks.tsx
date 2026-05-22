"use client";

import { Avatar, Dropdown, Tabs, Label, Button } from "@heroui/react";
import { Diamond, LogOut, Menu, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useAuth } from "@/core/contexts/AuthContext";
import { extractInitial } from "@/shared/utils";

import { ThemeSwitcher } from "./ThemeSwitcher";
import { useState } from "react";

export function NavLinks() {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading, logout, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // cargando la sesión
  if (isLoading) return null;

  const routes: Record<string, string> = {
    Home: "/",
    Dashboard: "/dashboard",
    Budgets: "/budgets",
    Stats: "/stats",
  };

  const currenTab =
    Object.keys(routes).find((key) => routes[key] === pathname) || "Dashboard";

  return (
    <>
      {isAuthenticated ? (
        <div className="flex items-center justify-between gap-6 px-4 py-3 md:px-0">
          <div className="flex justify-center items-center gap-4">
            {/* menu escritorio */}
            <nav className="hidden md:flex items-center gap-1">
              <Tabs
                variant="secondary"
                className="w-full max-w-md"
                selectedKey={currenTab}
                onSelectionChange={(key) => {
                  const route = routes[key as string];
                  if (route) router.push(route);
                }}
              >
                <Tabs.ListContainer>
                  <Tabs.List
                    aria-label="Options"
                    className="flex border-none py-4"
                  >
                    <Tabs.Tab
                      id="Home"
                      className="flex flex-row gap-1 text-base font-medium"
                    >
                      <Diamond className="text-accent" />
                      Tracely
                      <Tabs.Indicator className="" />
                    </Tabs.Tab>
                    <Tabs.Tab id="Dashboard" className="text-base font-medium">
                      Dashboard
                      <Tabs.Indicator />
                    </Tabs.Tab>
                    <Tabs.Tab
                      id="Budgets"
                      className="text-base font-medium"
                    >
                      Budgets
                      <Tabs.Indicator />
                    </Tabs.Tab>
                    <Tabs.Tab
                      id="Stats"
                      className="text-base font-medium"
                    >
                      Stats
                      <Tabs.Indicator />
                    </Tabs.Tab>
                  </Tabs.List>
                </Tabs.ListContainer>
              </Tabs>
            </nav>

            {/* menu movil */}
            <Button
              isIconOnly
              variant="ghost"
              className="md:hidden text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>

            <Link href={"/"} className="flex gap-1">
              <Diamond className="text-accent md:hidden" />
              <span className="md:hidden">Tracely</span>
            </Link>
          </div>

          {/* lado derecho */}
          <div className="flex items-center justify-center gap-5">
            <div className="pt-1.5">
              <ThemeSwitcher />
            </div>

            <Dropdown>
              <Dropdown.Trigger>
                <Avatar color="accent" variant="soft">
                  <Avatar.Fallback>
                    {extractInitial(user ? user.fullName : "U")}
                  </Avatar.Fallback>
                </Avatar>
              </Dropdown.Trigger>
              <Dropdown.Popover>
                <div className="px-3 pt-3 pb-1">
                  <div className="flex items-center gap-2">
                    <User />
                    <div className="flex flex-col gap-0">
                      <p className="text-sm leading-5 font-medium">
                        {user?.fullName}
                      </p>
                      <p className="text-xs leading-none text-muted">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                </div>
                <Dropdown.Menu>
                  <Dropdown.Item
                    id="logout"
                    variant="danger"
                    textValue="logout"
                    onPress={logout}
                  >
                    <div className="flex w-full items-center justify-between gap-2">
                      <Label>Log Out</Label>
                      <LogOut className="text-danger size-3.5" />
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          </div>

          {/* menu movil: drawer */}
          {isMenuOpen && (
            <div className="fixed inset-0 z-50 flex md:hidden">
              {/* panel lateral */}
              <div className="relative w-64 h-full bg-surface/95 border-r border-border p-6 flex flex-col gap-6 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg">Menu</span>
                  <Button
                    isIconOnly
                    variant="tertiary"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-foreground"
                  >
                    <X size={20} />
                  </Button>
                </div>
                <nav className="flex flex-col gap-2">
                  {Object.entries(routes).map(([name, path]) => (
                    <Link
                      key={name}
                      href={path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`text-base p-2 rounded-lg transition-colors ${pathname === path ? "bg-accent-soft-hover text-accent font-bold" : ""}`}
                    >
                      {name}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          )}

        </div>
      ) : (
        <div className="flex items-center justify-between px-4 py-3 gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-base font-medium"
          >
            <Diamond className="text-accent" />
            <span className="text-lg">Tracely</span>
          </Link>

          <div className="flex flex-row items-center gap-2">
            <div className="pt-2">
              <ThemeSwitcher />
            </div>
            <Link
              href="/register"
              className="flex items-center py-1 px-2 sm:py-2 sm:px-6 text-foreground hover:opacity-90"
            >
              Sign up
            </Link>
            <Link
              href="/login"
              className="flex items-center py-1 px-2 sm:py-2 sm:px-6 bg-accent text-foreground hover:opacity-90 transition-all rounded-full"
            >
              Log in
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
