import { Separator, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { Icons } from "@/app/ui/Icon";
import { ThemeToggle } from "@/app/ui/ToggleTheme";

const Navbar = () => {
    return (
        <>
            <Flex direction={"row"} justify={"between"}>
                <Link href={"/dashboard"}>
                    <Icons.Logo className='h-10 w-10' />
                </Link>
                <ThemeToggle />
            </Flex>
            <Separator size='4' />
        </>
    );
};

export default Navbar;
