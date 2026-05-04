"use client";

import { Avatar, Dropdown, Tabs, Label } from "@heroui/react";
import { Diamond, LogOut, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useAuth } from "@/core/contexts/AuthContext";
import { extractInitial } from "@/shared/utils";

import { ThemeSwitcher } from "./ThemeSwitcher";

export function NavLinks() {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading, logout, user } = useAuth();

  // cargando la sesión
  if (isLoading) return null;

  const routes: Record<string, string> = {
    Home: "/",
    Dashboard: "/dashboard",
    Budgets: "/budgets",
    Logs: "/logs",
  };

  const currenTab =
    Object.keys(routes).find((key) => routes[key] === pathname) || "Dashboard";

  return (
    <>
      {isAuthenticated ? (
        <div className="flex items-center justify-between gap-6">
          <nav className="flex items-center gap-1">
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
                  {/* OCULTO */}

                  <Tabs.Tab
                    id="Budgets"
                    className="text-base font-medium hidden"
                  >
                    Budgets
                    <Tabs.Indicator />
                  </Tabs.Tab>
                  {/* OCULTO */}
                  <Tabs.Tab id="Logs" className="text-base font-medium hidden">
                    Logs
                    <Tabs.Indicator />
                  </Tabs.Tab>
                </Tabs.List>
              </Tabs.ListContainer>
            </Tabs>
          </nav>

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
        </div>
      ) : (
        <div className="flex items-center justify-between gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-base font-medium"
          >
            <Diamond className="text-accent" />
            <span className="text-lg">Tracely</span>
          </Link>

          <div className="flex flex-row gap-3">
            <div className="pt-2">
              <ThemeSwitcher />
            </div>
            <Link
              href="/register"
              className="flex items-center py-0 px-2 sm:py-2 sm:px-8 text-foreground hover:opacity-90 "
            >
              Sign up
            </Link>
            <Link
              href="/login"
              className="flex items-center py-0 px-2 sm:py-2 sm:px-8 bg-accent text-foreground hover:opacity-90 transition-all rounded-full"
            >
              Log in
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
