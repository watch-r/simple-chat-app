import { Button } from "@radix-ui/themes";
import { ThemeToggle } from "./ui/ToggleTheme";
import { db } from "./lib/db";

export default async function Home() {
    return (
        <>
            <div>Hello World</div>
            <Button>Hello</Button>
            <ThemeToggle />
        </>
    );
}
