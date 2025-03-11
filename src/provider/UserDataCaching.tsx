"use client";

import { QUERY_KEY } from "@/types/constans";
import { useQuery } from "@tanstack/react-query";
import { withFetchRevaildationAction } from "@/utils/with-fetch-revaildation";
import withActionAtClient from "@/utils/with-action-at-client";
import { User } from "@/types/auth.type";

export default function UserDataCaching() {
  useQuery({
    queryKey: [QUERY_KEY.USER_DATA],
    queryFn: async () => {
      return await withActionAtClient(() =>
        withFetchRevaildationAction<User>({
          endPoint: `user/me`,
          requireAuth: true,
          options: {
            cache: "no-store",
          },
        })
      );
    },
    staleTime: 300000,
    gcTime: Infinity,
  });

  return null;
}
