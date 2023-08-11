import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import { prisma } from "./prisma";
import EmailProvider from "next-auth/providers/email";
import sendVerificationRequest from "./mailVerificationRequest";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    adapter: PrismaAdapter(prisma),
    pages: { signIn: "/components/login" },
    providers: [
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: Number(process.env.EMAIL_SERVER_PORT),
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                },
            },
            from: process.env.EMAIL_FROM,
            //sendVerificationRequest: sendVerificationRequest,
        }),
    ],
    /*callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            console.log(user);
            console.log(account);
            console.log(profile);
            console.log(email);
            console.log(credentials);
            return true;
        },
        session: ({ session, token, user }) => {
            console.log(session);
            console.log(token);
            console.log(user);
            return session;
        } ,
        jwt: ({ token, user }) => {
            console.log("JWT Callback", { token, user });
            if (user) {
                const u = user as unknown as any;
                return {
                    ...token,
                    id: u.id,
                    randomKey: u.randomKey,
                };
            }
            return token;
        }
    }*/
};

//const generateSessionToken = () => randomUUID?.();
//const fromDate = (time, date = Date.now()) => new Date(date + time * 1000);
