import { JWT } from "next-auth/jwt";
import { user_role } from "@/types/user";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      nickName: string;
      role: user_role;

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
    role: user_role;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    nickName: string;
    role: user_role;
  }
}
