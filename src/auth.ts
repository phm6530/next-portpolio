import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (credentials.username === "1" && credentials.password === "1") {
          return { id: "1", name: "Hyunmin", email: "hyunmin@example.com" };
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
    strategy: "jwt", // 세션 전략을 JWT로 설정
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // user 객체의 ID를 token에 추가
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string; // 세션에 accessToken 추가
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
