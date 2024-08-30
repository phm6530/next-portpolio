"use client";

import classes from "./SelectTemplate.module.scss";
import { useRouter } from "next/navigation";
import SurveyIcon from "/public/asset/icon/survey.png";
import Image from "next/image";

export default function SelectTemplateList() {
  const PATH = "/template/made";

  const router = useRouter();

  const onNotYetHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();

    alert("아직");
    return;
  };

  return (
    <div className={classes.templateSelector}>
      <div onClick={() => router.push(`${PATH}/survey`)}>
        <div className={classes.iconWrap}>
          <Image
            src={SurveyIcon}
            alt="dd"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
        <span className={classes.typeTitle}>Survey</span>
        <p>주관식 + 객관식 형태의 설문조사 전용 템플릿</p>
        <p>만족도 조사, 간단 설문조사에 적합 </p>
      </div>

      <div className={classes.notYet} onClick={onNotYetHandler}>
        <div className={classes.iconWrap}>
          <Image
            src={SurveyIcon}
            alt="dd"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
        <span className={classes.typeTitle}>Rank</span>
        <p>주관식 + 객관식 형태의 설문조사 전용 템플릿</p>
        <p>만족도 조사, 간단 설문조사에 적합 </p>
      </div>

      <div className={classes.notYet} onClick={onNotYetHandler}>
        <div className={classes.iconWrap}>
          <Image
            src={SurveyIcon}
            alt="dd"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
        <span className={classes.typeTitle}>Survey</span>
        <p>주관식 + 객관식</p>
      </div>
    </div>
  );
}
