"use client";
import { Avatar, Box, Button, Flex } from "@radix-ui/themes";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

type UserDetails = {
    image: string;
    email: string;
    name: string;
};

const UserProfile = ({ image, email, name }: UserDetails) => {
    const router = useRouter();
    return (
        <Flex direction={"row"} align={"center"} justify={"between"}>
            <Box>
                <Flex direction={"row"} gap={"2"}>
                    <Avatar src={image || ""} fallback="A" />
                    <Flex direction={"column"}>
                        <span aria-hidden="true">{name}</span>
                        <span
                            className="text-xs text-zinc-400"
                            aria-hidden="true"
                        >
                            {email}
                        </span>
                    </Flex>
                </Flex>
            </Box>
            <Button onClick={() => signOut()}>
                <LogOut className="h-4 w-4" />
            </Button>
        </Flex>
    );
};

export default UserProfile;
