import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInEmailPassword } from "@/auth/actions/auth-actions";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
      allowDangerousEmailAccountLinking: true,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "user@email.com",
        },
        password: { label: "Password", type: "password", placeholder: "*****" },
      },
      async authorize(credentials, req) {
        const user = await signInEmailPassword(
          credentials!.email,
          credentials!.password
        );

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        }
        return null;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // Check if the user is allowed to sign in
      // For example, you can check if the user is in a specific database or has a specific role
      // Here, we allow all users to sign in
      return true;
    },

    async jwt({ token, account, user, profile }) {
      const dbUser = await prisma.user.findUnique({
        where: {
          email: token.email!,
        },
      });

      if (dbUser?.isActive === false) {
        throw Error("User is not active");
      }

      token.roles = dbUser?.roles || ["no-roles"];
      token.id = dbUser?.id || "no-uuid";

      return token;
    },

    async session({ session, token, user }) {
      if (session && session.user) {
        session.user.id = token.id as string;
        session.user.roles = token.roles as string[];
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
