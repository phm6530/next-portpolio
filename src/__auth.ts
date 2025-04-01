import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { BASE_NEST_URL } from "./config/base";
import { User } from "./types/auth.type";

export const { handlers, auth, signIn, signOut } = NextAuth({
  callbacks: {
    // 이건 JWt만들떄 쓰는거고
    jwt({ token, user }) {
      if (user) {
        token.email = user.email!;
        token.role = user.role;
        token.nickname = user.nickname;
        token.createdAt = user.createdAt;
      }
      return token;
    },
    // 이건 접근할떄 얻을수잇는데이터고
    session({ session, token }) {
      if (token) {
        session.user.email = token.email!;
        session.user.role = token.role;
        session.user.nickname = token.nickname;
        session.user.createdAt = token.createdAt;
      }
      return session;
    },
  },

  providers: [
    Google,
    Credentials({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize<T>(
        credentials: Partial<Record<"email" | "password", unknown>>
      ): Promise<T> {
        // 여기에 서버 요청 로직 작성
        if (!credentials.email || !credentials.password) return null as never;
        const { email, password } = credentials;

        const response = await fetch(`${BASE_NEST_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          throw new Error("에러다");
        }
        const { user }: { user: User } = await response.json();

        return user as T;
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30일
    updateAge: 15 * 60, //15분 - 이거 Access Token처럼 작동
  },
});
