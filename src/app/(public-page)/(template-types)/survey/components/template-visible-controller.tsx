"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TipTapEditor from "@/components/ui/editor/tiptap-editor";
import NotFoundContents from "@/components/ui/error/notfound-contents";
import ImageThumbNail from "@/components/ui/image-thumbnail";
import TemplateBadges from "@/components/ui/template/template-badges";
import UserRoleDisplay from "@/components/ui/userRoleDisplay/UserRoleDisplay";
import { FetchTemplateForm } from "@/types/template.type";
import DateCompareToday from "@/util/DateCompareToday";
import {
  ArrowBigLeft,
  ArrowLeft,
  Calendar1,
  Calendar1Icon,
  CalendarArrowDown,
  CalendarCheck2Icon,
  TimerOff,
} from "lucide-react";
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
  const todayCompare = DateCompareToday();

  const { title, thumbnail } = data;
  if (startDate && todayCompare.isBefore(startDate)) {
    return (
      <>
        <div className="flex  h-calc-screen-lg items-center max-h-[auto] animate-fadein flex-col gap-5 text-center justify-center ">
          {thumbnail && (
            <CardContent className="md:p-6 p-3 w-full">
              <ImageThumbNail thumbnail={thumbnail} />
            </CardContent>
          )}
          <div className="text-2xl break-keep">
            "{title}" 은 아직 진행 기간이 아닙니다
          </div>
          <div className="flex gap-2  text-center items-center mb-7 justify-center">
            <CalendarCheck2Icon /> {startDate} ~ {endDate ?? "무기한"}
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

  if (endDate && todayCompare.isAfter(endDate)) {
    return (
      <>
        <div className="flex  h-calc-screen-lg items-center max-h-[auto] animate-fadein flex-col gap-5 text-center justify-center ">
          {thumbnail && (
            <CardContent className="md:p-6 p-3 w-full">
              <ImageThumbNail thumbnail={thumbnail} />
            </CardContent>
          )}
          <div className="text-2xl break-keep">
            "{title}" 은 <span className="text-point">종료</span> 되었습니다.
          </div>
          <div className="flex gap-2  text-center items-center mb-7 justify-center">
            <CalendarCheck2Icon /> {startDate} ~ {endDate ?? "무기한"}
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
