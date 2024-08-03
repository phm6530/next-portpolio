import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { dbConnectTest } from "@/app/config/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (credentials.username === "1" && credentials.password === "1") {
          await dbConnectTest();
          return {
            id: "1",
            name: "Hyunmin",
            email: "hyunmin@example.com",
          };
        } else {
          console.log("에러??");
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 15 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name;
        token.email = user.email;
      }

      return token;
    },
    async session({ session, token, user }) {
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true, // JavaScript에서 접근 불가
        secure: process.env.NODE_ENV === "production", // HTTPS에서만 전송
        sameSite: "lax", // CSRF 공격 방지
      },
    },
  },
});
