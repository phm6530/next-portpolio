import dayjs from "dayjs";

export default function DateCompareToday() {
  const today = dayjs();

  return {
    isAfter: (date: string): boolean => {
      return today.isAfter(date, "day");
    },
    isBefore: (date: string): boolean => {
      return today.isBefore(date, "day");
    },
    isSame: (date: string): boolean => {
      return today.isSame(date, "day");
    },
    isNew: (date: string): boolean => {
      //생성한지 7일 이전이면 New로 처리
      return today.diff(date, "day") < 7;
    },
    fromNow: (date: string): string => {
      return dayjs(date).fromNow();
    },
  };
}
