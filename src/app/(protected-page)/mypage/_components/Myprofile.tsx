"use client";

import { User } from "@/types/auth.type";
import { QUERY_KEY } from "@/types/constans";
import { useQueryClient } from "@tanstack/react-query";
import AnonymousIcon from "/public/asset/icon/anonymous.svg";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  BookTemplate,
  LayoutPanelTop,
  MessageSquareQuote,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { RespondentsData, TemplateItemMetadata } from "@/types/template.type";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Myprofile() {
  const queryclient = useQueryClient();
  const user = queryclient.getQueryData<User>([QUERY_KEY.USER_DATA]);
  const test = queryclient.getQueryData<
    TemplateItemMetadata<RespondentsData>[]
  >([QUERY_KEY.MY_CONTENTS]);

  return (
    <>
      <Card>
        <CardContent className="pt-6 border-b mb-5">
          <div className="flex gap-5">
            <div className="w-14 h-14 overflow-hidden rounded-full">
              <AnonymousIcon className="w-full h-full" />
            </div>
            <div className="text-md flex flex-col gap-[10px] items-start">
              <div className="flex gap-[10px] items-center">
                <span>{user?.nickname}</span>
                <Badge variant={"secondary"}>{user?.role}</Badge>{" "}
              </div>
              <span className="text-sm">{user?.email}</span>
              {/* <div className="text-muted-foreground"></div> */}
              <div className="text-[12px] opacity-60 mt-2">
                {" "}
                가입일 {user?.createdAt}
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-6 items-center font-medium leading-none">
            {/* <BookTemplate className="w-4 h-4" /> */}
            <span className="flex gap-2 items-center border-r pr-5">
              <LayoutPanelTop className="w-4 h-4" />
              생성한 템플릿 <span className="text-point">{test?.length}</span>
            </span>

            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="flex gap-2 line-through opacity-50">
                    <MessageSquareQuote className="w-4 h-4" />
                    내가 남긴 댓글 <span className="text-point">0</span>
                  </span>
                </TooltipTrigger>
                <TooltipContent
                  align="start"
                  sideOffset={20}
                  className="flex flex-row gap-2 items-center"
                >
                  아직 개발중입니다..
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          {/* <div className="leading-none text-muted-foreground">
            Showing total visitors for the last 6 months
          </div> */}
        </CardFooter>
      </Card>
    </>
  );
}
