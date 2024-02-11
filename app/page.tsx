import { Button } from "@radix-ui/themes";
import { ThemeToggle } from "./components/ui/ToggleTheme";

export default function Home() {
    return (
        <>
            <div>Hello World</div>
            <Button>Hello</Button>
            <ThemeToggle />
        </>
    );
}
