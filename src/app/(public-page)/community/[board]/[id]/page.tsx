import BoardList, { ListItemType } from "../../components/board-list";
import { BASE_NEST_URL } from "@/config/base";

import { BOARD_CATEGORIES, CategoriesKey } from "@/types/board";
import ResultCommentSection from "@/app/(public-page)/(template-result)/result/components/ResultCommentSection";
import { MSG_TYPE, MSG_PARAM_PATH } from "@/types/comment.type";
import { USER_ROLE } from "@/types/auth.type";
import PostController from "./component/PostController";
import UserRoleDisplay from "@/components/ui/userRoleDisplay/UserRoleDisplay";

import { Badge } from "@/components/ui/badge";
import ViewCount from "./component/view-count";
import MessageForm from "@/components/comment/message-form";
import { CommentEditorProvider } from "@/components/comment/context/comment-context";
import { fetchBoardItem } from "./actions/board-fetch";
import dynamic from "next/dynamic";
import LoadingWrapper from "@/components/shared/loading/loading-wrapper";
import { DateUtils } from "@/utils/DateUtils";

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
  // const dayCompare = DateUtils();
  const boardName = BOARD_CATEGORIES[category];

  const data: DetailBoardItemType = await fetchBoardItem({
    board: category,
    id,
  });

  const DynamicTipTapEditor = dynamic(
    () => import("@/components/ui/editor/tiptap-editor"),
    { ssr: false, loading: () => <LoadingWrapper /> } // 서버 사이드 렌더링 비활성화
  );

  return (
    <>
      <div className="flex flex-col gap-5 py-8">
        <div className="flex items-start flex-col gap-4 leading-10">
          <Badge variant={"secondary"} className="font-normal">
            {boardName}게시판
          </Badge>
          <h2>{data.title}</h2>
          <div className="flex gap-3">
            <UserRoleDisplay
              role={data.creator.role}
              nickname={data.creator.nickname}
            />

            <span className="text-muted-foreground text-[12px]">
              {DateUtils.dateFormatKR(data.createdAt, "YYYY. MM. DD")}
            </span>
          </div>
        </div>

        <div className="py-5 border-t border-b">
          <DynamicTipTapEditor mode="view" value={data.contents} />
        </div>

        {/* <CardContent className="border py-5 bg-transparent  dark:bg-custom-input">
          
        </CardContent> */}
        <div className="flex justify-between items-center">
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
          <ViewCount />
        </div>
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
