import MyContents from "@/app/(mypage)/mypage/_components/MyContents";
import Myprofile from "@/app/(mypage)/mypage/_components/Myprofile";

import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "mypage",
};

export default async function page() {
  return (
    <>
      회원정보 변경
      {/* 내정보 */}
      <Myprofile />
      <MyContents />
    </>
  );
}
