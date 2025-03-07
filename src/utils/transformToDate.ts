import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// 플러그인 적용
dayjs.extend(utc);
dayjs.extend(timezone);

export default function transformToDate(dateIsoString: string) {
  return dayjs
    .utc(dateIsoString)
    .tz("Asia/Seoul")
    .format("YYYY-MM-DD HH:mm:ss");
}
