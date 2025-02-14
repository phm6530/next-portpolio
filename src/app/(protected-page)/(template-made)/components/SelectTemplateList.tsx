"use client";

import classes from "./SelectTemplate.module.scss";
import SurveyIcon from "/public/asset/icon/survey.png";
import rankIcon from "/public/asset/icon/rank.png";
import Image from "next/image";
import { TEMPLATE_TYPE } from "@/types/template.type";
import useAOS from "@/_hook/usAOS";
import { Badge } from "@/components/ui/badge";

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
  useAOS({ preserveClass: true });

  const handleTemplateClick = (type: string, isActive: boolean) => {
    if (!isActive) {
      alert(`[${type}]는 아직 개발 중입니다.`);
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
    <div
      className={`grid gap-5 mt-12 grid-cols-[repeat(auto-fit,minmax(250px,1fr))] aos-hidden`}
    >
      {templateList.map((template, idx) => {
        return (
          <div
            key={`${template.type}-${idx}`}
            className={` relative shadow-2xl cursor-pointer border dark:hover:border-primary dark:shadow-zinc-900 shadow-zinc-200 hover:shadow-zinc-300 dark:hover:shadow-zinc-800 rounded-md p-5 ${
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
            <Badge variant={"secondary"} className="mb-4">
              {template.name}
            </Badge>

            <div className="text-sm text-secondary-foreground">
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
