"use client";
import MyContentsController from "./MycontentsController";
import { RespondentsData, TemplateItemMetadata } from "@/types/template.type";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock7 } from "lucide-react";
import { Chart } from "@/components/shared/charts/chart";
import { Badge } from "@/components/ui/badge";
import transformHtmlToPlainText from "@/utils/transform-html-to-plaintext";

export default function MyContentsItem({
  item,
}: {
  item: TemplateItemMetadata<RespondentsData>;
}) {
  return (
    <Card className="aos-hidden">
      <CardHeader>
        <CardTitle className="flex mb-4  flex-col gap-5 items-start">
          <Badge variant={"secondary"}>{item.templateType}</Badge>
          <div className="leading-10 line-clamp-3">{item.title}</div>
        </CardTitle>

        <CardDescription className="leading-6 line-clamp-2">
          {transformHtmlToPlainText({ html: item.description })}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {/* 차트 */}
        <Chart
          isAgeColltected={item.isAgeCollected}
          isGenderCollected={item.isGenderCollected}
          {...item.respondents}
        />

        <div className="flex items-center gap-[10px] text-[12px] text-zinc-400">
          <Clock7 className="w-4 h-4" />
          생성일 :<span>{item.createdAt}</span>
        </div>

        <MyContentsController templateType={item.templateType} id={item.id} />
      </CardContent>
    </Card>
  );
}
