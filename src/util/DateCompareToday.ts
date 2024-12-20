import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localeData from "dayjs/plugin/localeData";
import "dayjs/locale/ko"; // 한국어 로케일

// 플러그인 활성화
dayjs.extend(relativeTime);
dayjs.extend(localeData);
dayjs.locale("ko");

export default function DateCompareToday() {
  const today = dayjs();

  // 한국어 날짜 문자열을 파싱하는 헬퍼 함수
  const parseKoreanDate = (dateStr: string) => {
    // "2024. 12. 9. 오전 2:53:22" 형식의 문자열을 파싱
    return dayjs(dateStr, "YYYY. MM. DD. A h:mm:ss");
  };

  return {
    isAfter: (date: string): boolean => {
      return today.isAfter(parseKoreanDate(date), "day");
    },
    isBefore: (date: string): boolean => {
      return today.isBefore(parseKoreanDate(date), "day");
    },
    isSame: (date: string): boolean => {
      return today.isSame(parseKoreanDate(date), "day");
    },
    isNew: (date: string): boolean => {
      const parsedDate = parseKoreanDate(date);
      const diffDays = today.diff(parsedDate, "day");
      return diffDays >= 0 && diffDays < 7;
    },
    fromNow: (date: string): string => {
      return parseKoreanDate(date).fromNow();
    },
  };
}
