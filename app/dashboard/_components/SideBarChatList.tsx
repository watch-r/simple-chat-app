"use client";
import chatHrefConstructor from "@/app/helpers/ChatHrefConstructor";
import { Flex } from "@radix-ui/themes";
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
            direction={"row"}
            className="max-h-[25rem] overflow-y-auto -mx-2 space-y-1"
        >
            {activeChats.sort().map((friend) => {
                const unseenMessagesCount = unseenMessages.filter(
                    (unseenMsg) => {
                        return unseenMsg.senderId === friend.id;
                    }
                ).length;

                return (
                    <Flex direction={'row'} key={friend.id}>
                        <a
                            href={`/dashboard/chat/${chatHrefConstructor(
                                sessionId,
                                friend.id
                            )}`}
                            className="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                        >
                            {friend.name}
                            {unseenMessagesCount > 0 ? (
                                <div className="bg-indigo-600 font-medium text-xs text-white w-4 h-4 rounded-full flex justify-center items-center">
                                    {unseenMessagesCount}
                                </div>
                            ) : null}
                        </a>
                    </Flex >
                );
            })}
        </Flex>
    );
};

export default SideBarChatList;
