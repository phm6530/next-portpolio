import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const user = { id: "1", name: "John Doe" }; // 예시 사용자
        if (
          credentials?.username === "john" &&
          credentials?.password === "password"
        ) {
          return user;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login", // 커스텀 로그인 페이지 경로 설정
    error: "/auth/error", // 커스텀 에러 페이지 경로 설정
  },
});

export { handler as GET, handler as Post };
