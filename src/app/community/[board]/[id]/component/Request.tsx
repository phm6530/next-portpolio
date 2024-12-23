"use client";

import { BASE_NEST_URL } from "@/config/base";
import { CategoriesKey } from "@/types/board";
import { withFetch } from "@/util/clientUtil";
import { useQuery } from "@tanstack/react-query";
import { DetailBoardItemType } from "../page";

export default function Request({
  id,
  category,
}: {
  id: string;
  category: CategoriesKey;
}) {
  const { data } = useQuery({
    queryKey: [`chk-${category}-${id}`],
    queryFn: async () => {
      return await withFetch<DetailBoardItemType>(async () => {
        return await fetch(`${BASE_NEST_URL}/board/${category}/${id}`, {
          credentials: "include",
        });
      });
    },
  });

  console.log(data);

  return <>요청..</>;
}
