import { useCallback } from "react";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

export const useTransformToKrDate = () => {
  return useCallback((isoString: string) => {
    return dayjs(isoString).toDate();
  }, []);
};
