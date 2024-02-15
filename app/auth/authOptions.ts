import GoogleProvider from "next-auth/providers/google";
import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import { db } from "@/app/lib/db";
import { NextAuthOptions } from "next-auth";
import { fetchRedisData } from "@/app/helpers/FetchRedisData";

export const authOptions: NextAuthOptions = {
    adapter: UpstashRedisAdapter(db),
    callbacks: {
        async jwt({ token, user }) {
            const dbUserResult = (await fetchRedisData(
                "get",
                `user:${token.id}`
            )) as string | null;
            if (!dbUserResult) {
                if (user) {
                    token.id = user!.id;
                }
                return token;
            }

            const dbUser = JSON.parse(dbUserResult) as User
            return {
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                picture: dbUser.image,
            };
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.image = token.picture;
            }

            return session;
        },
        redirect() {
            return "/dashboard";
        },
    },
    session: {
        strategy: "jwt",
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
};
