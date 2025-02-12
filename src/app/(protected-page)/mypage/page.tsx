import MyContents from "@/app/(protected-page)/mypage/_components/MyContents";
import Myprofile from "@/app/(protected-page)/mypage/_components/Myprofile";
import classes from "./page.module.scss";

export default async function page() {
  return (
    <div className={classes.container}>
      <Myprofile />
      <MyContents />
    </div>
  );
}
