import { authOptions } from "@/app/auth/authOptions";
import { fetchRedisData } from "@/app/helpers/FetchRedisData";
import {
    Message,
    messageArrayValidator,
} from "@/app/lib/validations/messageValidator";
import { Flex, Box, Avatar, Separator } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import React from "react";
import Messages from "../../_components/Messages";
import ChatInput from "../../_components/ChatInput";

interface ChatPageProps {
    params: { id?: string };
}

const ChatPage = async ({ params: { id } }: ChatPageProps) => {
    const session = await getServerSession(authOptions);
    if (!session) return notFound();
    if (!id) return notFound();

    const { user } = session;
    const [userId1, userId2] = id!.split("--");

    const chatPartnerId = user.id === userId1 ? userId2 : userId1;
    const chatPartnerRaw = (await fetchRedisData(
        "get",
        `user:${chatPartnerId}`
    )) as string;
    const chatPartner = JSON.parse(chatPartnerRaw) as User;
    const initialMessages = await getChatMessages(id);
    // return { title: `FriendZone | ${chatPartner.name} chat` };
    return (
        <Box className='max-h-(calc(100vh-6rem))'>
            <Flex direction={"column"} justify={"between"} className='h-svh'>
                <Box>
                    <Flex direction={"row"} gap={"2"}>
                        <Avatar src={chatPartner.image || ""} fallback='A' />
                        <Flex direction={"column"}>
                            <span aria-hidden='true'>{chatPartner.name}</span>
                            <span
                                className='text-xs text-zinc-400'
                                aria-hidden='true'
                            >
                                {chatPartner.email}
                            </span>
                        </Flex>
                    </Flex>
                    <Separator size={"4"} my={"3"} />
                    <Messages
                        initialMessages={initialMessages}
                        sessionId={session.user.id}
                        chatId={id}
                        sessionImg={session.user.image}
                        chatPartner={chatPartner}
                    />
                </Box>
                <Box>
                    <ChatInput chatPartner={chatPartner} chatId={id} />
                </Box>
            </Flex>
        </Box>
    );
};

async function getChatMessages(chatId: string) {
    try {
        const results: string[] = await fetchRedisData(
            "zrange",
            `chat:${chatId}:messages`,
            0,
            -1
        );

        const dbMessages = results.map(
            (message) => JSON.parse(message) as Message
        );
        const reversedDbMessages = dbMessages.reverse();
        const messages = messageArrayValidator.parse(reversedDbMessages);

        return messages;
    } catch (error) {
        notFound();
    }
}
export default ChatPage;
