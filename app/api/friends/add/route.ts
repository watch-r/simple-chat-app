import { authOptions } from "@/app/auth/authOptions";
import { fetchRedisData } from "@/app/helpers/FetchRedisData";
import { db } from "@/app/lib/db";
import { addFriendValidator } from "@/app/lib/validations/addFriendValidator";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session)
        return NextResponse.json(
            { message: "You are Unauthorized" },
            { status: 401 }
        );

    try {
        const body = await request.json();
        const validation = addFriendValidator.safeParse(body.email);

        if (!validation.success)
            return NextResponse.json(validation.error.format(), {
                status: 400,
            });
        // console.log("validation passeed");
        const { email: emailToAdd } = addFriendValidator.parse(body.email);
        const idToAdd = (await fetchRedisData(
            "get",
            `user:email:${emailToAdd}`
        )) as string;

        if (!idToAdd)
            return NextResponse.json("User not found", { status: 404 });

        if (idToAdd === session.user.id)
            return NextResponse.json("Can't add yourself", { status: 403 });

        const friendAlreadyAdded = (await fetchRedisData(
            "sismember",
            `user:${idToAdd}:incoming_friend_requests`,
            session.user.id
        )) as 0 | 1;
        if (friendAlreadyAdded)
            return NextResponse.json("Already Sent Request", { status: 400 });

        const isAlreadyFriends = (await fetchRedisData(
            "sismember",
            `user:${session.user.id}:friends`,
            idToAdd
        )) as 0 | 1;

        if (isAlreadyFriends) {
            return new Response("Already friends with this user", {
                status: 400,
            });
        }

        await db.sadd(
            `user:${idToAdd}:incoming_friend_requests`,
            session.user.id
        );

        return NextResponse.json("OK", { status: 200 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json("Invalid request payload", {
                status: 422,
            });
        }

        return NextResponse.json("Invalid request", { status: 400 });
    }
}
