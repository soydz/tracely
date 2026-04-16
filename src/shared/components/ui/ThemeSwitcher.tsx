'use client'

import { Switch } from "@heroui/react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

export function ThemeSwitcher() {

    const { theme, resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <Switch
            aria-label="Toggle theme"
            size="lg"
            isSelected={resolvedTheme === "dark"}
            onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
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
    )
}