import { authOptions } from "@/app/auth/authOptions";
import { fetchRedisData } from "@/app/helpers/FetchRedisData";
import { messageArrayValidator } from "@/app/lib/validations/messageValidator";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import React from "react";

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
    return <div>{id}</div>;
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
