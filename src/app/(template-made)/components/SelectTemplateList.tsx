"use client";

import classes from "./SelectTemplate.module.scss";
import SurveyIcon from "/public/asset/icon/survey.png";
import rankIcon from "/public/asset/icon/rank.png";
import Image from "next/image";
import { TEMPLATE_TYPE } from "@/types/template.type";

const templateList = [
  {
    type: TEMPLATE_TYPE.SURVEY,
    icon: SurveyIcon,
    name: "Survey",
    path: `/made/${TEMPLATE_TYPE.SURVEY}`,
    description: ["주관식 + 객관식 형태의 설문조사 전용 템플릿"],
    isActive: true,
  },
  {
    type: TEMPLATE_TYPE.RANK,
    icon: rankIcon,
    name: "Rank",
    path: `/made/${TEMPLATE_TYPE.RANK}`,
    description: ["주관식 + 객관식 형태의 설문조사 전용 템플릿"],
    isActive: false,
  },
];

export default function SelectTemplateList() {
  const handleTemplateClick = (type: string, isActive: boolean) => {
    if (!isActive) {
      alert("아직 개발 중입니다.");
      return;
    }

    switch (type) {
      case "survey":
        window.location.href = "/made/survey";
        break;
      case "form":
        window.location.href = "/made/form";
        break;
      default:
        alert("유효하지 않은 템플릿입니다.");
    }
  };
  return (
    <div className={classes.templateSelector}>
      {templateList.map((template, idx) => {
        return (
          <div
            key={`${template.type}-${idx}`}
            className={`${classes.choiceItem} ${
              !template.isActive ? classes.notYet : undefined
            }`}
            onClick={() =>
              handleTemplateClick(template.type, template.isActive)
            }
          >
            <div className={classes.iconWrap}>
              <Image
                src={template.icon}
                alt={template.name}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>

            <span className={classes.typeTitle}>{template.name}</span>
            <div className={classes.desciprtionWrapper}>
              {template.description.map((e, idx) => {
                return <p key={`description-${idx}`}>{e}</p>;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
