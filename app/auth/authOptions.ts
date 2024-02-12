import GoogleProvider from "next-auth/providers/google";
import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import { db } from "@/app/lib/db";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
    adapter: UpstashRedisAdapter(db),
    callbacks: {
        async jwt({ token, user }) {
            const dbUserResult = (await db.get(
                `user:${token.id}`
            )) as User | null;
            if (!dbUserResult) {
                if (user) {
                    token.id = user!.id;
                }
                return token;
            }
            return {
                id: dbUserResult.id,
                name: dbUserResult.name,
                email: dbUserResult.email,
                picture: dbUserResult.image,
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
