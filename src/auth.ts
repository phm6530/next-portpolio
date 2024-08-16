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
      // 사용자가 로그인할 때, user 객체가 존재할 때 실행됩니다.
      if (user) {
        // token 객체에 사용자 정보를 추가합니다.
        token.id = user.id;
        token.nickName = user.nickName;
        token.role = user.role;
      }

      // 이후 이 정보를 session 콜백에서 사용하게 됩니다.
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id; // 세션에 사용자 ID 추가
        session.user.nickName = token.nickName; // 세션에 사용자 닉네임 추가
        session.user.role = token.role; // 세션에 사용자 역할 추가
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
