"use client";
import { User } from "@/types/auth.type";
import { QUERY_KEY } from "@/types/constans";
import classes from "./MyContents.module.scss";
import {
  RespondentsAndMaxGroup,
  TemplateItemMetadata,
} from "@/types/template.type";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import withAuthFetch from "@/utils/withAuthFetch";
import Button from "@/components/ui/button/Button";
import MyContentsItem from "./MyContentsItem";

export default function MyContents() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const userdata = queryClient.getQueryData<User>([QUERY_KEY.USER_DATA]);

  // get List..
  const { data, isLoading } = useQuery<{
    data: TemplateItemMetadata<RespondentsAndMaxGroup>[];
    nextPage: null | number;
  }>({
    queryKey: [QUERY_KEY.MY_CONTENTS],
    queryFn: async () => {
      const url = `user/me/contents`;
      const options: RequestInit = {
        credentials: "include",
      };
      return await withAuthFetch(url, options);
    },
    enabled: !!userdata,
    staleTime: Infinity,
  });

  return (
    <div>
      {/* <h3>내가 만든 템플릿</h3> */}

      <div className={classes.categoriesWrapper}>
        <div className={classes.buttonWrapper}>
          <div>최신 순</div>
          <div>참여자 순</div>
        </div>
        <Button.submit onClick={() => router.push("/made")}>
          템플릿 만들기
        </Button.submit>
      </div>

      {isLoading ? (
        <>loading..</>
      ) : (
        <div className={classes.container}>
          {data?.data.map((item, idx) => {
            return <MyContentsItem key={item.id} item={item} />;
          })}
        </div>
      )}
    </div>
  );
}
