import { fetcbBoardItem } from "@/api/board.api";
import { ListItemType } from "../../component/BoardList";
import { BASE_NEST_URL } from "@/config/base";

import { boardCateogries, CategoriesKey } from "@/types/board";
import ResultCommentSection from "@/app/(template-result)/components/ResultCommentSection";
import {
  COMMENT_EDITOR_TYPE,
  COMMENT_NEED_PATH,
} from "@/types/comment.type";
import CommentEditor from "@/app/(template-result)/components/CommentEditor";
import { USER_ROLE } from "@/types/auth.type";
import PostController from "./component/PostController";
import DateCompareToday from "@/util/DateCompareToday";
import UserRoleDisplay from "@/components/ui/userRoleDisplay/UserRoleDisplay";
import QuillViewer from "@/components/Editor/QuillViewer";
import classes from "./page.module.scss";

export async function generateStaticParams() {
  const categories = ["free", "notice", "qa"]; // 카테고리 리스트
  const allParams = [];

  //각 카테고리 Detail Full Router cache 처리
  for (const category of categories) {
    const response = await fetch(
      `${BASE_NEST_URL}/board/${category}`,
      {
        cache: "force-cache",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data"); // 오류 처리
    }

    const listResponse: [ListItemType[], number] =
      await response.json();

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
  const boardName = boardCateogries[category];

  const data: DetailBoardItemType = await fetcbBoardItem({
    board: category,
    id,
  });

  return (
    <>
      <div className={classes.postHeader}>
        <div className={classes.boardCategory}>{boardName}</div>
        <div className={classes.postTitle}>{data.title}</div>
        <div className={classes.postInfo}>
          <UserRoleDisplay
            role={data.creator.role}
            nickname={data.creator.nickname}
          />
          <span>{dayCompare.fromNow(data.createAt)}</span>
        </div>
      </div>

      <div className={classes.contentsWrapper}>
        <div className={classes.postContents}>
          <QuillViewer contents={data.contents} />

          {data.updateAt !== data.createAt && (
            <div className={classes.lastUpdate}>
              조회수 {data.view}
            </div>
          )}
        </div>
      </div>

      {/* Controller */}
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
    </>
  );
}
