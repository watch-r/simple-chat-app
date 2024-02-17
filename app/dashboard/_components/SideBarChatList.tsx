"use client";
import chatHrefConstructor from "@/app/helpers/ChatHrefConstructor";
import { Message } from "@/app/lib/validations/messageValidator";
import { Badge, Box, Flex } from "@radix-ui/themes";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface SidebarChatListProps {
    friends: User[];
    sessionId: string;
}

const SideBarChatList = ({ friends, sessionId }: SidebarChatListProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const [unseenMessages, setUnseenMessages] = useState<Message[]>([]);
    const [activeChats, setActiveChats] = useState<User[]>(friends);

    useEffect(() => {
        if (pathname?.includes("chat")) {
            setUnseenMessages((prev) => {
                return prev.filter((msg) => !pathname.includes(msg.senderId));
            });
        }
    }, [pathname]);
    return (
        <Flex
            direction={"column"}
            className='max-h-[25rem] overflow-y-auto -mx-2 space-y-1'
        >
            {activeChats.sort().map((friend) => {
                const unseenMessagesCount = unseenMessages.filter(
                    (unseenMsg) => {
                        return unseenMsg.senderId === friend.id;
                    }
                ).length;
                return (
                    <Box role='list' key={friend.id}>
                        <a
                            href={`/dashboard/chat/${chatHrefConstructor(
                                sessionId,
                                friend.id
                            )}`}
                            className='dark:text-gray-200 text-gray-700 hover:dark:text-violet-600 hover:text-violet-600 group flex p-1'
                        >
                            {friend.name}
                            {unseenMessagesCount > 0 ? (
                                <Badge variant='surface'>
                                    {unseenMessagesCount}
                                </Badge>
                            ) : null}
                        </a>
                    </Box>
                );
            })}
        </Flex>
    );
};

export default SideBarChatList;
