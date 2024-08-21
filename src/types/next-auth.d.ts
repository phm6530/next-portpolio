import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      nickName: string;
      role: "admin" | "visitor" | "anonymous";

      //익명
      access_email?: string;
      template_key?: string;
    } & DefaultSession["user"];
  }

  interface User {
    user_id?: string;
    user_name?: string;
    user_nickname?: string;
    access_email?: string;
    template_key?: string;
    role: "admin" | "visitor" | "anonymous"; // 사용자 역할
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    nickName: string;
    role: "admin" | "visitor" | "anonymous";
  }
}
