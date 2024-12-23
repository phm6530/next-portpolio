"use client";
import DateCompareToday from "@/util/DateCompareToday";
import classes from "./PostContents.module.scss";
import { boardCateogries, CategoriesKey } from "@/types/board";
import { useQuery } from "@tanstack/react-query";

import { withFetch } from "@/util/clientUtil";
import { BASE_NEST_URL } from "@/config/base";
import PostController from "./PostController";
import CommentEditor from "@/app/(template-result)/components/CommentEditor";
import UserRoleDisplay from "@/components/ui/userRoleDisplay/UserRoleDisplay";
import { redirect } from "next/navigation";
import { USER_ROLE } from "@/types/auth.type";
import { DetailBoardItemType } from "../page";
import LoadingStreming from "@/components/loading/LoadingStreming";

export default function PostContents({
  category,
  postId,
}: {
  category: CategoriesKey;
  postId: string;
}) {
  const dayCompare = DateCompareToday();
  const boardName = boardCateogries[category];

  const { data, isLoading } = useQuery<DetailBoardItemType>({
    queryKey: [`post-${category}-${postId}`],
    queryFn: async () => {
      return await withFetch(async () => {
        return await fetch(`${BASE_NEST_URL}/board/${category}/${postId}`, {
          credentials: "include",
        });
      });
    },
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading || !data) {
    return <LoadingStreming />;
  }

  // console.log(data.updateAt);

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
          <div className={classes.contents}>{data.contents}</div>
          {data.updateAt !== data.createAt && (
            <div className={classes.lastUpdate}>조회수 {data.view}</div>
          )}
        </div>
      </div>

      {/* Controller */}
      <PostController
        id={postId}
        category={category}
        creatorRole={data.creator.role}
        creatorEmail={
          data.creator.role !== USER_ROLE.ANONYMOUS ? data.creator.email : null
        }
      />

      <CommentEditor templateId={postId} templateType={category} />
    </>
  );
}