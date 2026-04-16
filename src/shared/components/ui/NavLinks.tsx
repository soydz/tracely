'use client'

import { Avatar, Tabs } from "@heroui/react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Diamond } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { useAuth } from "@/core/contexts/AuthContext";

import { extractInitial } from "@/shared/utils";

export function NavLinks() {
    const router = useRouter();
    const pathname = usePathname();
    const { isAuthenticated, isLoading, user } = useAuth();

    // cargando la sesión
    if (isLoading) return null;

    const routes: Record<string, string> = {
        Home: "/",
        Dashboard: "/dashboard",
        Budgets: "/budgets",
        Logs: "/logs",
    };

    const currenTab = Object.keys(routes).find(key => routes[key] === pathname) || "Dashboard";

    return (
        <>
            {isAuthenticated
                ?
                <div className="flex items-center justify-between gap-2.5">
                    <nav className="flex items-center gap-4">
                        <Tabs variant="secondary" className="w-full max-w-md" selectedKey={currenTab} onSelectionChange={(key) => {
                            const route = routes[key as string];
                            if (route) router.push(route);
                        }}>
                            <Tabs.ListContainer>
                                <Tabs.List aria-label="Options">
                                    <Tabs.Tab id="Home" className="flex flex-row gap-1">
                                        <Diamond className="text-accent" />
                                        <span>Tracely</span>
                                        <Tabs.Indicator />
                                    </Tabs.Tab>
                                    <Tabs.Tab id="Dashboard">
                                        Dashboard
                                        <Tabs.Indicator />
                                    </Tabs.Tab>
                                    <Tabs.Tab id="Budgets">
                                        Budgets
                                        <Tabs.Indicator />
                                    </Tabs.Tab>
                                    <Tabs.Tab id="Logs">
                                        Logs
                                        <Tabs.Indicator />
                                    </Tabs.Tab>
                                </Tabs.List>
                            </Tabs.ListContainer>
                        </Tabs>
                    </nav>

                    <div className="flex items-center justify-center gap-5">
                        <ThemeSwitcher />
                        <Avatar color="accent" variant="soft">
                            <Avatar.Fallback>{extractInitial(user ? user.fullName : "U")}</Avatar.Fallback>
                        </Avatar>
                    </div>
                </div>
                :
                <div className="flex items-center justify-between gap-2.5">
                    <nav className="flex items-center gap-4"></nav>
                    <ThemeSwitcher />
                </div>
            }
        </>
    )
}

