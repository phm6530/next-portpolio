import { CategoriesKey } from "@/types/board";
import { withFetch } from "@/util/clientUtil";
import { DetailBoardItemType } from "../page";
import { BASE_NEST_URL } from "@/config/base";

export const fetchBoardItem = async ({
  board,
  id,
}: {
  board: CategoriesKey;
  id: string;
}) => {
  return await withFetch<DetailBoardItemType>(async () => {
    return await fetch(`${BASE_NEST_URL}/board/${board}/${id}`, {
      cache: "force-cache",
      next: {
        tags: [`post-${board}-${id}`], // Tags
      },
    });
  });
};
