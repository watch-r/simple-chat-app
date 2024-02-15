import { Box, Card, Container, Flex, Grid, Text } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PropsWithChildren } from "react";
import { authOptions } from "../auth/authOptions";
import { Icons } from "../ui/Icon";
import SideBarOptionsComponment from "./_components/SideBarOptionsComponment";
import UserProfile from "./_components/UserProfile";
import FriendRequests from "./_components/FriendRequests";
import { fetchRedisData } from "../helpers/FetchRedisData";

const LayoutOfDashboard = async ({ children }: PropsWithChildren) => {
    const session = await getServerSession(authOptions);
    if (!session) notFound();

    const unseenRequests = (
        (await fetchRedisData(
            "smembers",
            `user:${session.user.id}:incoming_friend_requests`
        )) as User[]
    ).length;
    return (
        <>
            <Container>
                <Grid columns={"7"} className="">
                    {/* Left Side */}

                    <Box className="col-span-2 p-1 mt-1">
                        <Flex
                            direction={"column"}
                            className="w-full h-svh"
                            justify={"between"}
                        >
                            <Box className="space-y-2">
                                <Link href={"/dashboard"}>
                                    <Icons.Logo className="h-10 w-10" />
                                </Link>
                                <Text className="font-semibold text-xs text-gray-500">
                                    Your Chats
                                </Text>
                                <Flex direction={"column"}>
                                    <Box>//Chats that this user have</Box>
                                    <Box>
                                        <SideBarOptionsComponment />
                                        <FriendRequests
                                            sessionId={session.user.id}
                                            initialUnseenRequestCount={
                                                unseenRequests
                                            }
                                        />
                                    </Box>
                                </Flex>
                            </Box>
                            <Card className="">
                                <UserProfile
                                    image={session.user.image!}
                                    email={session.user.email!}
                                    name={session.user.name!}
                                />
                            </Card>
                        </Flex>
                    </Box>
                    {/* Right-Side */}
                    <Box className="col-span-5 p-2">{children}</Box>
                </Grid>
            </Container>
        </>
    );
};

export default LayoutOfDashboard;
