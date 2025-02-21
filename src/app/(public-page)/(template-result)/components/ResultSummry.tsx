import TemplateStatus from "@/components/templateUtill/TemplateStatus";
import { SurveyResult } from "@/types/surveyResult.type";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TransformPlainText from "@/components/TransformPlainText";

import { UserRound } from "lucide-react";
import TipTapEditor from "@/components/ui/editor/tiptap-editor";

export default async function ResultSummry(data: SurveyResult) {
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
          {" "}
          <TemplateStatus
            startDate={startDate}
            endDate={endDate}
            createdAt={createdAt}
            maxGroup={detail.maxGroup}
          />{" "}
          <div className="my-4 leading-9">{title}</div>
        </CardTitle>
        <CardDescription className=" border-l-2 pl-4 min-h-[50px]">
          <TipTapEditor mode="view" value={description} />
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex justify-between border-t pt-5 text-sm text-muted-foreground">
        <div className="border-t text-[12px] text-muted-foreground pt-3 flex items-center">
          <UserRound className="w-4 mr-2" /> {allCnt ?? 0}
        </div>
      </CardFooter>
    </Card>
  );
}
