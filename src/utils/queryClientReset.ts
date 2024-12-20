import { QUERY_KEY } from "@/types/constans";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

/**
 * UserData 캐싱 없애야함 MyContents도
 */
export function useQueryReset() {
  const queryClient = useQueryClient();

  const resetUserQueries = useCallback(() => {
    queryClient.removeQueries({ queryKey: [QUERY_KEY.USER_DATA] });
    queryClient.removeQueries({ queryKey: [QUERY_KEY.MY_CONTENTS] });
  }, [queryClient]);

  return { resetUserQueries };
}
