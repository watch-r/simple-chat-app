import {
    Box,
    Card,
    Container,
    Flex,
    Grid,
    SelectSeparator,
    Separator,
    Text,
} from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { PropsWithChildren } from "react";
import { authOptions } from "../auth/authOptions";
import { fetchFriendsByUserId } from "../helpers/FetchFriendsByUserId";
import { fetchRedisData } from "../helpers/FetchRedisData";
import FriendRequests from "./_components/FriendRequests";
import NavBar from "./_components/Navbar";
import SideBarChatList from "./_components/SideBarChatList";
import SideBarOptionsComponment from "./_components/SideBarOptionsComponment";
import UserProfile from "./_components/UserProfile";

const LayoutOfDashboard = async ({ children }: PropsWithChildren) => {
    const session = await getServerSession(authOptions);
    if (!session) notFound();

    const unseenRequests = (
        (await fetchRedisData(
            "smembers",
            `user:${session.user.id}:incoming_friend_requests`
        )) as User[]
    ).length;

    const friends = await fetchFriendsByUserId(session.user.id);
    return (
        <>
            <Container>
                <Grid columns={"7"} className=''>
                    {/* Left Side */}
                    <Box className='col-span-2 p-1 mt-4'>
                        <Flex
                            direction={"column"}
                            className='w-full h-svh'
                            justify={"between"}
                        >
                            <Box className='space-y-2'>
                                <NavBar />
                                {friends.length > 0 ? (
                                    <Text
                                        size={"2"}
                                        className='font-semibold text-gray-500'
                                    >
                                        Your Chats
                                    </Text>
                                ) : null}
                                <Box className='p-2'>
                                    <SideBarChatList
                                        friends={friends}
                                        sessionId={session.user.id}
                                    />
                                </Box>
                                <Box>
                                    <SideBarOptionsComponment />
                                    <FriendRequests
                                        sessionId={session.user.id}
                                        initialUnseenRequestCount={
                                            unseenRequests
                                        }
                                    />
                                </Box>
                            </Box>
                            <Card className=''>
                                <UserProfile
                                    image={session.user.image!}
                                    email={session.user.email!}
                                    name={session.user.name!}
                                />
                            </Card>
                        </Flex>
                    </Box>
                    {/* Right-Side */}
                    <Card className='col-span-5 m-1'>{children}</Card>
                </Grid>
            </Container>
        </>
    );
};

export default LayoutOfDashboard;
