"use client";
import { PersonIcon } from "@radix-ui/react-icons";
import { Badge, Flex } from "@radix-ui/themes";
import Link from "next/link";
import { useState } from "react";

type FriendRequestProps = {
    sessionId: string;
    initialUnseenRequestCount: number;
};

const FriendRequests = ({
    sessionId,
    initialUnseenRequestCount,
}: FriendRequestProps) => {
    const [unseenRequestCount, setUnseenRequestCount] = useState<number>(
        initialUnseenRequestCount
    );
    return (
        <Link
            href={"/dashboard/requests"}
            className="dark:text-gray-200 text-gray-700 hover:dark:text-violet-600 hover:text-violet-600 group flex gap-3 rounded-md p-2 text-sm leading-6 font-semibold"
        >
            <Flex direction={"row"} gap={"3"} align={"center"}>
                <span className="text-gray-400 border-gray-200 group-hover:border-violet-600 group-hover:text-violet-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-inherit ">
                    <PersonIcon className="h-4 w-4" />
                </span>
                <span className="truncate">Friend Requests</span>
                {unseenRequestCount > 0 ? (
                    <Badge variant="surface">{unseenRequestCount}</Badge>
                ) : null}
            </Flex>
        </Link>
    );
};

export default FriendRequests;
