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
import { CalendarRange, Clock7 } from "lucide-react";
import { Chart } from "@/components/shared/charts/chart";
import { Badge } from "@/components/ui/badge";
import transformHtmlToPlainText from "@/utils/transform-html-to-plaintext";
import TemplateBadges from "@/components/ui/template/template-badges";
import dayjs from "dayjs";
import ImageThumbNail from "@/components/ui/image-thumbnail";
import Image from "next/image";

export default function MyContentsItem({
  item,
}: {
  item: TemplateItemMetadata<RespondentsData>;
}) {
  return (
    <Card className="aos-hidden">
      <CardHeader className="items-start grid grid-cols-[repeat(3,1fr)] gap-3">
        <TemplateBadges
          className="col-span-3"
          startDate={item.startDate}
          endDate={item.endDate}
        />

        <div className="col-span-2 items-start flex flex-col">
          <CardTitle className="flex  mb-4 text-xl md:text-xl flex-col gap-5 items-start">
            {/* <Badge variant={"secondary"}>{item.templateType}</Badge> */}
            <div className="leading-8 line-clamp-3">{item.title}</div>
          </CardTitle>
          <CardDescription className="leading-6 line-clamp-2">
            {transformHtmlToPlainText({ html: item.description })}
          </CardDescription>{" "}
        </div>

        {item.thumbnail && (
          <div className="col-span-1 border min-h-[100px] relative w-full h-full rounded-lg overflow-hidden">
            <Image
              src={item.thumbnail}
              fill
              style={{ objectFit: "cover" }}
              alt="est"
            />
          </div>
        )}
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {/* 차트 */}
        <Chart
          isAgeColltected={item.isAgeCollected}
          isGenderCollected={item.isGenderCollected}
          {...item.respondents}
        />

        {/* <div className="flex items-center gap-[10px] text-[12px] text-zinc-400">
          <Clock7 className="w-4 h-4" />
          생성일 :<span>{item.createdAt}</span>
        </div> */}

        <div className="flex items-center gap-1 text-[12px]">
          <CalendarRange className="w-4 h-4" />{" "}
          <span>
            {item.startDate
              ? dayjs(new Date(item.startDate)).format("YYYY. MM. DD")
              : ""}
          </span>
          <span>~</span>
          <span>
            {item.endDate
              ? dayjs(new Date(item.endDate)).format("YYYY. MM. DD")
              : "무기한"}
          </span>
        </div>

        <MyContentsController templateType={item.templateType} id={item.id} />
      </CardContent>
    </Card>
  );
}
