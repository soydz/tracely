'use client'

import { Switch } from "@heroui/react"
import { div } from "framer-motion/client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

export function ThemeSwitcher() {

    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="flex items-center">
            <Switch
                aria-label="Toggle theme"
                size="lg"
                isSelected={resolvedTheme === "dark"}
                onChange={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="self-center align-middle"
            >
                {({ isSelected }) => (
                    <Switch.Control>
                        <Switch.Thumb>
                            <Switch.Icon>
                                {isSelected ? (
                                    <Moon className="size-3 text-inherit opacity-70" />
                                ) : (
                                    <Sun className="size-3 text-inherit opacity-100" />
                                )}
                            </Switch.Icon>
                        </Switch.Thumb>
                    </Switch.Control>
                )}
            </Switch>
        </div>
    )
}