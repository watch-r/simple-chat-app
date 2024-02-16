import { fetchRedisData } from "./FetchRedisData";

export const fetchFriendsByUserId = async (userId: string) => {
    // retrieve friends for current user
    const friendIds = (await fetchRedisData(
        "smembers",
        `user:${userId}:friends`
    )) as string[];

    const friends = await Promise.all(
        friendIds.map(async (friendId) => {
            const friend = (await fetchRedisData(
                "get",
                `user:${friendId}`
            )) as string;
            const parsedFriend = JSON.parse(friend) as User;
            return parsedFriend;
        })
    );

    return friends;
};
