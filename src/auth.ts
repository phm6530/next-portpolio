import { getUserDataProps } from "@/app/api/auth/login/route";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

type LoginFormProps = {
  user_id: string;
  user_password: string;
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      authorize: async (credentials) => {
        const userData = credentials as LoginFormProps;

        //login Api
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          }
        );
        if (!response.ok) {
          const errorResult = await response.json();
          throw new Error(errorResult.message);
        }
        const resultUserData: getUserDataProps = await response.json();

        return {
          user_id: resultUserData.user_id,
          user_name: resultUserData.name,
          user_nickname: resultUserData.nick_name,
          role: resultUserData.role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 60, //세션 30분 설정
    updateAge: 15 * 60, //15분 갱신
  },
  callbacks: {
    async jwt({ token, user }) {
      // 사용자가 로그인한 경우에만 실행
      if (user) {
        token.user_id = user.user_id as string;
        token.user_name = user.user_name;
        token.user_nickname = user.user_nickname;
        token.role = user.role;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.user_id = token.user_id;
        session.user.user_name = token.user_name;
        session.user.user_nickname = token.user_nickname;
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
