import { withFetch } from "@/util/clientUtil";
import { ExcludeUser, ListItemType } from "../../component/BoardList";
import { BASE_NEST_URL } from "@/config/base";
import classes from "./page.module.scss";
import CommentEditor from "@/app/(template-result)/components/CommentEditor";
import UserRoleDisplay from "@/components/ui/userRoleDisplay/UserRoleDisplay";
import DateCompareToday from "@/util/DateCompareToday";
import { boardCateogries, CategoriesKey } from "@/types/board";
import PostController from "./component/PostController";
import { USER_ROLE } from "@/types/auth.type";
import { QueryClient } from "@tanstack/react-query";
import PostContents from "./component/PostContents";
import { cookies } from "next/headers";

//list Id 뽑아서 전달

//이건 배포할떄 테스트해보자
// export async function generateStaticParams() {
//   const categories = ["free", "notice", "qa"]; // 카테고리 리스트
//   const allParams = [];

//   for (const category of categories) {
//     const response = await fetch(`${BASE_NEST_URL}/board/${category}`);
//     const listResponse: ListItemType[] = await response.json();

//     const params = listResponse.map((item) => ({
//       category,
//       id: item.id.toString(),
//     }));

//     allParams.push(...params);
//   }

//   return allParams;
// }

//서버에서 하이듀레이션하려고 생성
// const queryClient = new QueryClient();

// export async function generateMetadata({
//   params,
// }: {
//   params: { board: CategoriesKey; id: number };
// }) {
//   const { board, id } = params;
//   const cookie = cookies();
//   const boardToken = cookie.get(`board_${board}_${id}`);

//   const data = await queryClient.fetchQuery({
//     queryKey: [`post-${board}-${id}`],
//     queryFn: async () => {
//       return await withFetch<DetailBoardItemType>(async () => {
//         return await fetch(`${BASE_NEST_URL}/board/${board}/${id}`, {
//           cache: "no-cache",
//           headers: {
//             authorization: `Bearer ${boardToken?.name}`,
//           },
//         });
//       });
//     },
//     // staleTime: 24 * 60 * 1000,
//   });

//   return {
//     title: `게시판 -  ${data.title}`,
//     description: data.contents,
//   };
// }

export type DetailBoardItemType = {
  contents: string;
} & ListItemType;

export default async function Page({
  params,
}: {
  params: { board: CategoriesKey; id: string };
}) {
  const { board, id } = params;
  // const cookie = cookies();
  // const boardToken = cookie.get(`board_${board}_${id}`);

  // await queryClient.prefetchQuery({
  //   queryKey: [`post-${board}-${id}`],
  //   queryFn: async () => {
  //     return await withFetch<DetailBoardItemType>(async () => {
  //       return await fetch(`${BASE_NEST_URL}/board/${board}/${id}`, {
  //         cache: "no-cache",
  //         headers: {
  //           authorization: `Bearer ${boardToken}`,
  //         },
  //       });
  //     });
  //   },
  // });

  return (
    <>
      {/* <Request id={params.id} category={params.board}/> */}
      <PostContents category={board} postId={id} />
      {/* <ResultCommentSection id={params.id} type={"test"} /> */}
      {/* <HydrationBoundary state={dehydrate(queryClient)}></HydrationBoundary> */}
    </>
  );
}
