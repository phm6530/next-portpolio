"use client";
import SurveyIcon from "/public/asset/icon/survey.png";
import rankIcon from "/public/asset/icon/rank.png";
import Image from "next/image";
import { TEMPLATE_TYPE } from "@/types/template.type";
import useAOS from "@/_hook/usAOS";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const templateList = [
  {
    type: TEMPLATE_TYPE.SURVEY,
    icon: SurveyIcon,
    name: "Survey",
    path: `/made/${TEMPLATE_TYPE.SURVEY}`,
    description: ["주관식 + 객관식 형태의 설문조사"],
    isActive: true,
  },
  {
    type: TEMPLATE_TYPE.RANK,
    icon: rankIcon,
    name: "Rank",
    path: `/made/${TEMPLATE_TYPE.RANK}`,
    description: ["주제 하나로 랭킹"],
    isActive: false,
  },
];

export default function ChoiseTemplate() {
  useAOS();

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
            className={cn(
              "relative shadow-2xl cursor-pointer bg-card border border-transparent rounded-2xl hover:border-point dark:shadow-zinc-900 shadow-zinc-200 hover:shadow-zinc-300 dark:hover:shadow-zinc-800  p-5",
              !template.isActive && "opacity-50 cursor-not-allowed"
            )}
            onClick={() =>
              handleTemplateClick(template.type, template.isActive)
            }
          >
            <div className="w-full pb-[50%] mb-3 relative">
              <Image
                src={template.icon}
                alt={template.name}
                fill
                style={{ objectFit: "contain" }}
                className={cn(
                  "grayscale drop-shadow-[12px_4px_16px_rgba(69,154,211,0.432)]",
                  template.isActive && "grayscale-0"
                )}
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
