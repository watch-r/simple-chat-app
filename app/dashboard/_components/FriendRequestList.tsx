"use client";
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import { Avatar, Card, Flex, IconButton, Text } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

type req = {
    senderId: string;
    senderName: string;
    senderEmail: string;
    senderImage: string;
};

type PageProps = {
    incomingFriendRequests: req[];
    sessionId: string;
};

const FriendRequestList = ({
    incomingFriendRequests,
    sessionId,
}: PageProps) => {
    const router = useRouter();
    const [friendRequests, setFriendRequests] = useState<req[]>(
        incomingFriendRequests
    );
    const acceptFriend = async (senderId: string) => {
        await axios.post("/api/friends/accept", { id: senderId });

        setFriendRequests((prev) =>
            prev.filter((request) => request.senderId !== senderId)
        );
        router.refresh();
    };

    const denyFriend = async (senderId: string) => {
        await axios.post("/api/friends/deny", { id: senderId });

        setFriendRequests((prev) =>
            prev.filter((request) => request.senderId !== senderId)
        );

        router.refresh();
    };
    return (
        <Flex gap={"3"} direction={"column"}>
            {friendRequests.length === 0 ? (
                <Text size={"1"} color="iris" className="">
                    No New Friend Requests ...
                </Text>
            ) : (
                incomingFriendRequests.map((request) => (
                    <Card key={request.senderId} className="">
                        <Flex
                            gap={"3"}
                            direction={"row"}
                            justify={"between"}
                            align={"center"}
                        >
                            <div className="space-x-3 flex">
                                <Avatar
                                    src={request.senderImage}
                                    fallback={"A"}
                                />
                                <Flex direction={"column"}>
                                    <Text className="font-semibold">
                                        {request.senderName}
                                    </Text>
                                    <Text className="text-xs text-gray-500">
                                        {request.senderEmail}
                                    </Text>
                                </Flex>
                            </div>
                            <div className="space-x-3">
                                <IconButton aria-label="accept friend">
                                    <CheckIcon
                                        onClick={() =>
                                            acceptFriend(request.senderId)
                                        }
                                    />
                                </IconButton>
                                <IconButton
                                    color="red"
                                    aria-label="deny friend"
                                >
                                    <Cross2Icon
                                        onClick={() =>
                                            denyFriend(request.senderId)
                                        }
                                    />
                                </IconButton>
                            </div>
                        </Flex>
                    </Card>
                ))
            )}
        </Flex>
    );
};

export default FriendRequestList;
