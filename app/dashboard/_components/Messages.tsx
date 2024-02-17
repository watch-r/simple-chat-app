"use client";
import { cn } from "@/app/helpers/Cn";
import { Message } from "@/app/lib/validations/messageValidator";
import { Avatar, Box, Button, Card, Flex } from "@radix-ui/themes";
import React, { useRef, useState } from "react";
import { format } from "date-fns";

interface MessagesProps {
    initialMessages: Message[];
    sessionId: string;
    chatId: string;
    sessionImg: string | null | undefined;
    chatPartner: User;
}

const Messages = ({
    initialMessages,
    sessionId,
    chatId,
    chatPartner,
    sessionImg,
}: MessagesProps) => {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const scrollDownRef = useRef<HTMLDivElement | null>(null);
    const formatTimestamp = (timestamp: number) => {
        return format(timestamp, "HH:mm");
    };
    return (
        <Flex
            direction={"column-reverse"}
            className='h-full overflow-y-auto p-2'
        >
            <div ref={scrollDownRef} />
            {messages.map((message, index) => {
                const isCurrentUser = message.senderId === sessionId;

                const hasNextMessageFromSameUser =
                    messages[index - 1]?.senderId === messages[index].senderId;
                return (
                    <Box
                        role='chat-messages'
                        className='p-1'
                        key={`${message.id}-${message.timestamp}`}
                    >
                        <Box
                            className={cn("flex items-end", {
                                "justify-end": isCurrentUser,
                            })}
                        >
                            <Box
                                className={cn("text-base max-w-xs mx-2", {
                                    "order-1 items-end": isCurrentUser,
                                    "order-2 items-start": !isCurrentUser,
                                })}
                            >
                                <span
                                    className={cn(
                                        "px-4 py-2 rounded-full inline-block",
                                        {
                                            "bg-violet-600 text-white":
                                                isCurrentUser,
                                            "bg-gray-200 text-gray-900":
                                                !isCurrentUser,
                                            "rounded-br-none":
                                                !hasNextMessageFromSameUser &&
                                                isCurrentUser,
                                            "rounded-bl-none":
                                                !hasNextMessageFromSameUser &&
                                                !isCurrentUser,
                                        }
                                    )}
                                >
                                    {message.text}
                                    <span className='ml-2 text-xs text-gray-400'>
                                        {formatTimestamp(message.timestamp)}
                                    </span>
                                </span>
                            </Box>

                            <div
                                className={cn("relative", {
                                    "order-2": isCurrentUser,
                                    "order-1": !isCurrentUser,
                                    invisible: hasNextMessageFromSameUser,
                                })}
                            >
                                <Avatar
                                    size={"2"}
                                    src={
                                        isCurrentUser
                                            ? (sessionImg as string)
                                            : chatPartner.image
                                    }
                                    alt='Profile picture'
                                    radius='full'
                                    referrerPolicy='no-referrer'
                                    fallback='P'
                                />
                            </div>
                        </Box>
                    </Box>
                );
            })}
        </Flex>
    );
};

export default Messages;
