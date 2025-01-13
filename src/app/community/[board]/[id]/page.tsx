import { fetcbBoardItem } from "@/api/board.api";
import { ListItemType } from "../../component/BoardList";
import { BASE_NEST_URL } from "@/config/base";

import { CategoriesKey } from "@/types/board";
import PostContents from "./component/PostContents";

//이건 배포할떄 테스트해보자
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
  const { board, id } = params;
  return <PostContents category={board} postId={id} />;
}
