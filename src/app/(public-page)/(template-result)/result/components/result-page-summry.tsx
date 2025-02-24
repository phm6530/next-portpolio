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
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

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
            createdAt={createdAt}
            maxGroup={detail.maxGroup}
          />
          <div className="my-4 leading-9">{title}</div>
        </CardTitle>
        <CardDescription className=" min-h-[50px]">
          {/* <EditorContent editor={editor} /> */}
          <TipTapEditor mode="view" value={description} />
        </CardDescription>
      </CardHeader>

      <CardFooter>
        <div className="text-[12px] text-muted-foreground pt-3 flex items-center">
          <UserRound className="w-4 mr-2" /> {allCnt ?? 0}
        </div>
      </CardFooter>
    </Card>
  );
}
