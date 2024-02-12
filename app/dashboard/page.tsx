import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../auth/authOptions";
import { Heading } from "@radix-ui/themes";

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
        </Heading>
    );
};

export default DashboardPage;
