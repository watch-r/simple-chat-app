import { authOptions } from "@/app/auth/authOptions";
import { fetchRedisData } from "@/app/helpers/FetchRedisData";
import { db } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session)
        return NextResponse.json("You are Unauthorized", { status: 401 });

    try {
        const body = await request.json();
        const { id: idToAdd } = z.object({ id: z.string() }).parse(body);

        // already Friends
        const isAlreadyFriends = await fetchRedisData(
            "sismember",
            `user:${session.user.id}:friends`,
            idToAdd
        );
        if (isAlreadyFriends) {
            return NextResponse.json("You Already friends", { status: 400 });
        }

        const hasFriendRequest = await fetchRedisData(
            "sismember",
            `user:${session.user.id}:incoming_friend_requests`,
            idToAdd
        );

        if (!hasFriendRequest) {
            return NextResponse.json("No friend request", { status: 400 });
        }

        await db.sadd(`user:${session.user.id}:friends`, idToAdd);
        await db.sadd(`user:${idToAdd}:friends`, session.user.id);
        await db.srem(
            `user:${session.user.id}:incoming_friend_requests`,
            idToAdd
        );

        return NextResponse.json("OK", { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json("Invalid request payload", {
                status: 422,
            });
        }

        return NextResponse.json("Invalid request", { status: 400 });
    }
}
