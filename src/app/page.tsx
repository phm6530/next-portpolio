import { Metadata } from "next";
import classes from "./home.module.scss";
import SurveyList from "@/app/_components/survey/SurveyList";
// import { auth } from "@/auth";
// import { getToken } from "next-auth/jwt";

// async function fetchUsers() {
//   const response = await fetch("https://jsonplaceholder.typicode.com/users"); // 예시 API URL
//   if (!response.ok) {
//     throw new Error("Network response was not ok");
//   }
//   return response.json();
// }

//메타 데이터
export const metadata: Metadata = {
  title: "나만의 설문조사를 만들어보세요",
  description: "익명의 장점을 살려 물어보기 어려웠던 정보를 공유해보세요!",
};

export default async function Home() {
  return (
    <div className={classes.mainGrid}>
      <div className={classes.leftSection}>
        <h1 className={classes.title}>
          나만의 설문조사를<br></br> 만들어보세요.
        </h1>
        <p className={classes.mainDescription}>100% 익명을 보장합니다.</p>
        <p className={classes.mainDescription}>
          익명의 장점을 살려 물어보기 어려웠던 정보를 공유해보세요!
        </p>
        <button className={classes.btnMove}>설문조사 만들기</button>
        <button className={classes.btnGray}>자세히보기</button>
      </div>
      <div className={classes.rightSection}>
        <div className={classes.slideWrap}>
          <SurveyList />
        </div>
        <div className={classes.slideWrap}>
          <SurveyList />
        </div>
      </div>
    </div>
  );
}
