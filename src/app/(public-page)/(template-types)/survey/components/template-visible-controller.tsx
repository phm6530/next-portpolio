"use client";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import ImageThumbNail from "@/components/ui/image-thumbnail";
import { FetchTemplateForm } from "@/types/template.type";
import { DateCompareToday } from "@/util/DateCompareToday";

import { ArrowLeft, CalendarCheck2Icon } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export default function TemplateVisibleController({
  startDate,
  endDate,
  data,
  children,
}: {
  startDate: string | null;
  endDate?: string | null;
  data: FetchTemplateForm;
  children: ReactNode;
}) {
  const { title, thumbnail } = data;
  if (startDate && DateCompareToday.isBefore(startDate)) {
    return (
      <>
        <div className="flex  h-calc-screen-lg items-center max-h-[auto] animate-fadein flex-col gap-5 text-center justify-center ">
          {thumbnail && (
            <CardContent className="md:p-6 p-3 w-full">
              <ImageThumbNail thumbnail={thumbnail} />
            </CardContent>
          )}
          <div className="text-2xl break-keep">
            {"'"}
            {title}
            {"'"} 은 아직 진행 기간이 아닙니다
          </div>
          <div className="flex gap-2  text-center items-center mb-7 justify-center">
            <CalendarCheck2Icon />{" "}
            {DateCompareToday.dateFormatKR(startDate, "YYYY. MM. DD")} ~{" "}
            {endDate
              ? DateCompareToday.dateFormatKR(endDate, "YYYY. MM. DD")
              : "무기한"}
          </div>
          <Button variant={"outline"} asChild>
            <Link href={"/"} className="flex items-center gap-3">
              <ArrowLeft /> Home으로
            </Link>
          </Button>
        </div>
      </>
    );
  }

  if (endDate && DateCompareToday.isAfter(endDate)) {
    return (
      <>
        <div className="flex  h-calc-screen-lg items-center max-h-[auto] animate-fadein flex-col gap-5 text-center justify-center ">
          {thumbnail && (
            <CardContent className="md:p-6 p-3 w-full">
              <ImageThumbNail thumbnail={thumbnail} />
            </CardContent>
          )}
          <div className="text-2xl break-keep">
            {"'"}
            {title}
            {"'"} 은 <span className="text-point">종료</span> 되었습니다.
          </div>
          <div className="flex gap-2  text-center items-center mb-7 justify-center">
            <CalendarCheck2Icon />{" "}
            {startDate
              ? DateCompareToday.dateFormatKR(startDate, "YYYY. MM. DD")
              : ""}{" "}
            ~{" "}
            {endDate
              ? DateCompareToday.dateFormatKR(endDate, "YYYY. MM. DD")
              : "무기한"}
          </div>
          <Button variant={"outline"} asChild>
            <Link href={"/"} className="flex items-center gap-3">
              <ArrowLeft /> Home으로
            </Link>
          </Button>
        </div>
      </>
    );
  }

  return <>{children}</>;
}
