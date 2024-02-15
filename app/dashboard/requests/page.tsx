import { authOptions } from "@/app/auth/authOptions";
import { fetchRedisData } from "@/app/helpers/FetchRedisData";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import FriendRequestList from "../_components/FriendRequestList";
import { Heading, Separator } from "@radix-ui/themes";

const FriendRequestsPage = async () => {
    const session = await getServerSession(authOptions);
    if (!session) return notFound();

    const incomingRequestsId = (await fetchRedisData(
        "smembers",
        `user:${session.user.id}:incoming_friend_requests`
    )) as string[];

    const incomingFriendRequests = await Promise.all(
        incomingRequestsId.map(async (senderId) => {
            const sender = (await fetchRedisData(
                "get",
                `user:${senderId}`
            )) as string;
            const senderParsed = JSON.parse(sender) as User;

            return {
                senderId,
                senderName: senderParsed.name,
                senderEmail: senderParsed.email,
                senderImage: senderParsed.image,
            };
        })
    );

    return (
        <div>
            <Heading size={'7'} className="py-4">Friends Request: </Heading>
            <Separator my="3" size="4" />
            <FriendRequestList
                incomingFriendRequests={incomingFriendRequests}
                sessionId={session.user.id}
            />
        </div>
    );
};

export default FriendRequestsPage;
