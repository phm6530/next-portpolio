import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      nickName: string;
      role: "admin" | "visitor";
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    user_id: string;
    user_name: string;
    user_nickname: string;
    role: "admin" | "visitor";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    nickName: string;
    role: "admin" | "visitor";
  }
}
