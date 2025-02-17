"use client";
import MyContentsController from "./MycontentsController";
import {
  RespondentsAndMaxGroup,
  RespondentsData,
  TemplateItemMetadata,
} from "@/types/template.type";
import TransformPlainText from "@/components/TransformPlainText";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import GenderChart from "@/components/Chart/GenderChart";
import { Clock7 } from "lucide-react";
import { Chart } from "@/components/shared/charts/chart";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import ThumbNail from "@/app/template/_component/thumbNail/ThumbNail";

export default function MyContentsItem({
  item,
}: {
  item: TemplateItemMetadata<RespondentsData>;
}) {
  return (
    <Card className="aos-hidden">
      <CardHeader>
        <CardTitle className="flex  flex-col gap-5 items-start">
          <Badge variant={"secondary"}>{item.templateType}</Badge>
          <div>{item.title}</div>
        </CardTitle>

        <CardDescription>
          <TransformPlainText html={item.description} />
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {/* 차트 */}
        <Chart {...item.respondents} />

        <div className="flex items-center gap-[10px] text-[12px] text-zinc-400">
          <Clock7 className="w-4 h-4" />
          생성일 :<span>{item.createdAt}</span>
        </div>

        <MyContentsController templateType={item.templateType} id={item.id} />
      </CardContent>
    </Card>
  );
}
