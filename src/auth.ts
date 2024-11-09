import { getUserDataProps } from "@/app/____api/auth/login/route";
import { BASE_URL } from "@/config/base";
import { withFetch } from "@/util/clientUtil";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

type LoginFormProps = {
  user_id: string;
  user_password: string;
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      authorize: async (credentials) => {
        const userData = credentials as LoginFormProps;

        //login Api
        const response = await fetch(`${BASE_URL}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

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
    CredentialsProvider({
      id: "anonymous",
      authorize: async (anonymous) => {
        const anonymousAuth = anonymous as {
          pin: string;
          template_key: string;
        };

        const result = await withFetch<{
          template_key: string;
          access_email: string;
        }>(async () => {
          return fetch(`${BASE_URL}/api/auth/pin`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(anonymousAuth),
          });
        });

        // 익명 사용자로 최소한의 정보만 반환
        return {
          access_email: result.access_email,
          template_key: result.template_key,
          role: "anonymous",
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
      if (user) {
        //관리자

        if (user.role === "admin") {
          token.user_id = user.user_id as string;
          token.user_name = user.user_name;
          token.user_nickname = user.user_nickname;
          token.role = user.role;
        }
        //익명
        else if (user.role === "anonymous") {
          token.user_email = user.access_email;
          token.user_template_key = user.template_key;
          token.role = user.role;
        }
      }
      return token;
    },
    async session({ session, token }) {
      // 관리자
      if (token.role === "admin") {
        session.user = {
          user_id: token.user_id,
          user_name: token.user_name,
          user_nickname: token.user_nickname,
          role: token.role,
        };
      }
      // 익명 사용자
      else if (token.role === "anonymous") {
        session.user = {
          access_email: token.user_email,
          template_key: token.user_template_key,
          role: token.role,
        };
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
