"use client";

import { ERROR_CODE } from "@/codeMsg";
import { QUERY_KEY } from "@/types/constans";
import { useQueryReset } from "@/utils/queryClientReset";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * userData 날리기...
 */

export default function RefreshQueryClient({ code }: { code: ERROR_CODE }) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { resetUserQueries } = useQueryReset();

  useEffect(() => {
    if (code === ERROR_CODE.UNAUTHORIZED) {
      const userData = queryClient.getQueryData([QUERY_KEY.USER_DATA]);
      if (userData) {
        resetUserQueries();
        router.refresh();
      }
    }
  }, [code]);

  return null;
}
