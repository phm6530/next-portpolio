import { ListItemType } from "../../components/board-list";
import { BASE_NEST_URL } from "@/config/base";

import { BOARD_CATEGORIES, CategoriesKey } from "@/types/board";
import ResultCommentSection from "@/app/(public-page)/(template-result)/result/components/ResultCommentSection";
import { MSG_TYPE, MSG_PARAM_PATH } from "@/types/comment.type";
import { USER_ROLE } from "@/types/auth.type";
import PostController from "./component/PostController";
import DateCompareToday from "@/util/DateCompareToday";
import UserRoleDisplay from "@/components/ui/userRoleDisplay/UserRoleDisplay";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import ViewCount from "./component/view-count";
import MessageForm from "@/components/comment/message-form";
import { CommentEditorProvider } from "@/components/comment/context/comment-context";
import { fetchBoardItem } from "./actions/board-fetch";

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
  const data: DetailBoardItemType = await fetchBoardItem({
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
  // const dayCompare = DateCompareToday();
  const boardName = BOARD_CATEGORIES[category];

  const data: DetailBoardItemType = await fetchBoardItem({
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
                {/* {dayCompare.fromNow(data.createdAt)} */}
              </span>
            </div>
          </CardHeader>
          <CardContent className="border-t pt-5 bg-slate-50 dark:bg-custom-input">
            <div
              className="ProseMirror"
              dangerouslySetInnerHTML={{ __html: data.contents }}
            />
          </CardContent>
          <CardFooter className="border-t pt-5 flex justify-between">
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
            <ViewCount className="text-sm" />
          </CardFooter>
        </Card>
      </div>

      <CommentEditorProvider EDITOR_PATH={MSG_PARAM_PATH.BOARD}>
        {/* 댓글 에디터*/}
        <MessageForm
          parentsId={id}
          category={category}
          EDITOR_MODE={MSG_TYPE.COMMENT}
        />

        {/* 댓글 리스트 */}
        <ResultCommentSection
          id={parseInt(id, 10)}
          type={MSG_PARAM_PATH.BOARD}
        />
      </CommentEditorProvider>
    </>
  );
}
