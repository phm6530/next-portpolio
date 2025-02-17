import { fetcbBoardItem } from "@/api/board.api";
import { ListItemType } from "../../component/BoardList";
import { BASE_NEST_URL } from "@/config/base";

import { BOARD_CATEGORIES, CategoriesKey } from "@/types/board";
import ResultCommentSection from "@/app/(public-page)/(template-result)/components/ResultCommentSection";
import { COMMENT_EDITOR_TYPE, COMMENT_NEED_PATH } from "@/types/comment.type";
import CommentEditor from "@/app/(public-page)/(template-result)/components/CommentEditor";
import { USER_ROLE } from "@/types/auth.type";
import PostController from "./component/PostController";
import DateCompareToday from "@/util/DateCompareToday";
import UserRoleDisplay from "@/components/layout/userRoleDisplay/UserRoleDisplay";
import QuillViewer from "@/components/Editor/QuillViewer";
import { CommentEditorProvider } from "@/context/context";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import ViewCount from "./component/view-count";
import { Suspense } from "react";
export async function generateStaticParams() {
  const categories = ["free", "notice", "qa"]; // 카테고리 리스트
  const allParams = [];

  //각 카테고리 Detail Full Router cache 처리
  for (const category of categories) {
    const response = await fetch(`${BASE_NEST_URL}/board/${category}`, {
      cache: "force-cache",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data"); // 오류 처리
    }

    const listResponse: [ListItemType[], number] = await response.json();

    const params = listResponse[0].map((item) => {
      return {
        board: category,
        id: item.id.toString(),
      };
    });

    allParams.push(...params);
  }

  return allParams;
}

export type DetailBoardItemType = {
  contents: string;
} & ListItemType;

export async function generateMetadata({
  params,
}: {
  params: { board: CategoriesKey; id: string };
}) {
  const data: DetailBoardItemType = await fetcbBoardItem({
    board: params.board,
    id: params.id,
  });

  return {
    title: `게시판 -  ${data.title}`,
    description: data.contents,
  };
}

export default async function Page({
  params,
}: {
  params: { board: CategoriesKey; id: string };
}) {
  const { board: category, id } = params;
  const dayCompare = DateCompareToday();
  const boardName = BOARD_CATEGORIES[category];

  const data: DetailBoardItemType = await fetcbBoardItem({
    board: category,
    id,
  });

  return (
    <>
      <div className="flex flex-col gap-5 py-8">
        <Card className="bg-transparent">
          <CardHeader className="flex items-start flex-col gap-3">
            <Badge variant={"secondary"}>{boardName}게시판</Badge>
            <h2>{data.title}</h2>

            <div className="flex">
              <UserRoleDisplay
                role={data.creator.role}
                nickname={data.creator.nickname}
              />

              <span className="text-muted-foreground text-sm">
                {dayCompare.fromNow(data.createAt)}
              </span>
            </div>
          </CardHeader>
          <CardContent className="border-t pt-5 bg-slate-50 dark:bg-custom-input">
            <QuillViewer contents={data.contents} />
          </CardContent>
          <CardFooter className="border-t pt-5">
            <PostController
              id={id}
              category={category}
              creatorRole={data.creator.role}
              creatorEmail={
                data.creator.role !== USER_ROLE.ANONYMOUS
                  ? data.creator.email
                  : null
              }
            />
          </CardFooter>
        </Card>
      </div>

      {/* 정적 페이지에 조회수만 Suspense 처리 */}
      <Suspense fallback={<>div...</>}>
        <ViewCount cookieName={`board_${category}_${id}`} />
      </Suspense>

      {/* 대댓글에 부모가 어떤지 알리기위해 Context 사용함 */}
      <CommentEditorProvider initialSection={COMMENT_NEED_PATH.BOARD}>
        {/* 댓글 에디터*/}
        <CommentEditor
          editorType={COMMENT_EDITOR_TYPE.COMMENT}
          parentsType={COMMENT_NEED_PATH.BOARD}
          parentsId={id}
          category={category}
        />
        {/* 댓글 리스트 */}
        <ResultCommentSection
          id={parseInt(id, 10)}
          type={COMMENT_NEED_PATH.BOARD}
        />
      </CommentEditorProvider>
    </>
  );
}
