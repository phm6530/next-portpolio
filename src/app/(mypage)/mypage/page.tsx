import MyContents from "@/app/(mypage)/mypage/_components/MyContents";
import Myprofile from "@/app/(mypage)/mypage/_components/Myprofile";
import { Metadata } from "next";
import classes from "./page.module.scss";

export default async function page() {
  return (
    <div className={classes.container}>
      <Myprofile />
      <MyContents />
    </div>
  );
}
