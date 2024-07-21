import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string; // 세션에 accessToken 추가
  }
}
