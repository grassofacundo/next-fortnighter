import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import { prisma } from "./prisma";
import EmailProvider from "next-auth/providers/email";
//import sendVerificationRequest from "./mailVerificationRequest";

export const authOptions: NextAuthOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	adapter: PrismaAdapter(prisma),
	pages: { signIn: "/(components)/login" },
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
	callbacks: {
		/*async signIn({ user, account, profile, email, credentials }) {
			console.log(user);
			console.log(account);
			console.log(profile);
			console.log(email);
			console.log(credentials);
			return true;
		},*/
		//Cannot use token because the strategy is database
		session: ({ session, token, user }) => {
			console.log(session);
			console.log(token);
			console.log(user);
			//session.accessToken = token.accessToken
			return { ...session, ...user };
		},
	},
};
