"use client";

import classes from "./SelectTemplate.module.scss";
import { useRouter } from "next/navigation";
import SurveyIcon from "/public/asset/icon/survey.png";
import Image from "next/image";
import { TEMPLATE_TYPE } from "@/types/template.type";

const templateList = [
  {
    type: TEMPLATE_TYPE.SURVEY,
    name: "Survey",
    path: `/made/${TEMPLATE_TYPE.SURVEY}`,
    description: [
      "주관식 + 객관식 형태의 설문조사 전용 템플릿",
      "만족도 조사, 간단 설문조사에 적합 ",
    ],
    isActive: true,
  },
  {
    type: TEMPLATE_TYPE.RANK,
    name: "Rank",
    path: `/made/${TEMPLATE_TYPE.RANK}`,
    description: [
      "주관식 + 객관식 형태의 설문조사 전용 템플릿",
      "만족도 조사, 간단 설문조사에 적합 ",
    ],
    isActive: false,
  },
];

export default function SelectTemplateList() {
  const router = useRouter();

  const onNotYetHandler = (
    e: React.MouseEvent<HTMLDivElement>,
    isActive: boolean,
    path: string
  ) => {
    if (!isActive) {
      e.stopPropagation();
      e.preventDefault();
      alert("아직 개발중입니다..");
      return;
    } else {
      router.push(path);
    }
  };

  return (
    <div className={classes.templateSelector}>
      {templateList.map((template) => {
        return (
          <>
            <div
              className={`${classes.choiceItem} ${
                !template.isActive ? classes.notYet : undefined
              }`}
              onClick={(e) =>
                onNotYetHandler(e, template.isActive, template.path)
              }
            >
              <div className={classes.iconWrap}>
                <Image
                  src={SurveyIcon}
                  alt="dd"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              <span className={classes.typeTitle}>{template.name}</span>
              {template.description.map((e, idx) => {
                return <p key={`description-${idx}`}>{e}</p>;
              })}
            </div>
          </>
        );
      })}
    </div>
  );
}
