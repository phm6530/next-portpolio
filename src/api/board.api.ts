import { DetailBoardItemType } from "@/app/(public-page)/community/[board]/[id]/page";
import { BASE_NEST_URL } from "@/config/base";
import { CategoriesKey } from "@/types/board";
import { withFetch } from "@/util/clientUtil";

const fetcbBoardItem = async ({
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

export { fetcbBoardItem };
