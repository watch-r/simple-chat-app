import { Button } from "@radix-ui/themes";
import { ThemeToggle } from "./ui/ToggleTheme";
import { db } from "./lib/db";
import { Icons } from "./ui/Icon";

export default async function Home() {
    return (
        <>
            <div>Hello World</div>
            <Button>Hello</Button>
            <ThemeToggle />
            <Icons.Logo className="h-10 w-10"/>
        </>
    );
}
