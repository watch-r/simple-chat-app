//

import { authOptions } from "@/app/auth/authOptions";
import { fetchRedisData } from "@/app/helpers/FetchRedisData";
import { db } from "@/app/lib/db";
import {
    Message,
    messageValidator,
} from "@/app/lib/validations/messageValidator";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json("Unauthorized", { status: 401 });

    try {
        const { text, chatId }: { text: string; chatId: string } =
            await req.json();

        const [userId1, userId2] = chatId.split("--");

        if (session.user.id !== userId1 && session.user.id !== userId2) {
            return NextResponse.json("Unauthorized", { status: 401 });
        }

        const friendId = session.user.id === userId1 ? userId2 : userId1;

        const friendList = (await fetchRedisData(
            "smembers",
            `user:${session.user.id}:friends`
        )) as string[];

        if (!friendList.includes(friendId)) {
            return NextResponse.json("Unauthorized", { status: 401 });
        }

        // Sender
        const rawSender = (await fetchRedisData(
            "get",
            `user:${session.user.id}`
        )) as string;
        const sender = JSON.parse(rawSender) as User;

        const timestamp = Date.now();

        const messageData: Message = {
            id: nanoid(),
            senderId: session.user.id,
            text,
            timestamp,
        };

        const message = messageValidator.parse(messageData);

        // notify all connected chat room clients
        // await pusherServer.trigger(
        //     toPusherKey(`chat:${chatId}`),
        //     "incoming-message",
        //     message
        // );

        // await pusherServer.trigger(
        //     toPusherKey(`user:${friendId}:chats`),
        //     "new_message",
        //     {
        //         ...message,
        //         senderImg: sender.image,
        //         senderName: sender.name,
        //     }
        // );

        // all valid, send the message
        await db.zadd(`chat:${chatId}:messages`, {
            score: timestamp,
            member: JSON.stringify(message),
        });

        return NextResponse.json("OK", { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(error.message, { status: 500 });
        }

        return NextResponse.json("Internal Server Error", { status: 500 });
    }
}
