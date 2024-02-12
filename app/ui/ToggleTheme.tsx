"use client";

import { useTheme } from "next-themes";
import { Button, Switch } from "@radix-ui/themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <Button
            radius="full"
            variant="surface"
            className="h-8 w-8 "
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
            <SunIcon className="h-4 w-4 absolute rotate-0 scale-100 transition-all dark:scale-0 dark:-rotate-90" />
            <MoonIcon className="h-4 w-4 absolute rotate-90 scale-0 transition-all dark:scale-100 dark:rotate-0" />
        </Button>
    );
}
