"use client";
import TemplateBadges from "@/components/ui/template/template-badges";
import { SurveyResult } from "@/types/surveyResult.type";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { UserRound } from "lucide-react";
import TipTapEditor from "@/components/ui/editor/tiptap-editor";
import UserRoleDisplay from "@/components/ui/userRoleDisplay/UserRoleDisplay";
import { Badge } from "@/components/ui/badge";
import dayjs from "dayjs";

export default function ResultPageSummry(data: SurveyResult) {
  const {
    id,
    title,
    description,
    templateType,
    startDate,
    endDate,
    createdAt,
    thumbnail,
    respondents,
    creator,
  } = data;
  const { allCnt, detail } = respondents;

  return (
    <Card className="rounded-xl">
      <CardHeader>
        <CardTitle className="flex flex-col gap-5 mb-2">
          <TemplateBadges
            startDate={startDate}
            endDate={endDate}
            maxGroup={detail.maxGroup}
          />

          <div className="my-4 leading-9">{title}</div>
        </CardTitle>
        <TipTapEditor mode="view" value={description} />
        <div>
          <Badge variant={"outline"}>
            <UserRound className="w-4 mr-2" /> {allCnt ?? 0}
          </Badge>
        </div>
      </CardHeader>
      <CardFooter className="flex md:p-6 p-3 justify-between border-t pt-5 text-sm text-muted-foreground">
        <UserRoleDisplay role={creator.role} nickname={creator.nickname} />

        <span className="text-[12px]">
          {" "}
          생성 일 {dayjs(createdAt).format("YYYY.MM.DD")}
        </span>
      </CardFooter>
    </Card>
  );
}
