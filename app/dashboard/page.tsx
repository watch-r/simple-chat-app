import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../auth/authOptions";
import { Button, Heading } from "@radix-ui/themes";
import { ThemeToggle } from "../ui/ToggleTheme";

const DashboardPage = async () => {
    const session = await getServerSession(authOptions);
    // console.log(session);
    return (
        <Heading>
            HI{" "}
            {session && (
                <p>
                    Name: {session.user.name} <br />
                    id: {session.user.id} <br />
                    EMAIL: {session.user.email}
                    <br />
                    Image: {session.user.image}
                </p>
            )}
            <ThemeToggle />
            <Button>To check</Button>
            
        </Heading>
    );
};

export default DashboardPage;
