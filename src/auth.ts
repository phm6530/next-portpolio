import NextAuth, { User } from "next-auth";
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
        if (
          credentials.username === "squirrel309" &&
          credentials.password === "1"
        ) {
          await dbConnectTest();
          return {
            id: "squirrel309",
            nickName: "리슨업",
            role: "admin",
          };
        } else {
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
      console.log("usdre ::", user);
      // 사용자가 로그인한 경우에만 실행
      if (user) {
        token.id = user.id as string;
        token.nickName = user.nickName;
        token.role = user.role;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.nickName = token.nickName;
        session.user.role = token.role;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
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
