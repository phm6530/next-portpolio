import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id?: string;
      accessToken?: string;
      userImage?: string;
      rule?: number;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    accessToken?: string;
    userImage?: string;
    rule?: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    userImage?: string;
    rule?: number;
  }
}
