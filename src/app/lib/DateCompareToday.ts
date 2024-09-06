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
      return today.diff(date, "day") < 7;
    },
    fromNow: (date: string): string => {
      return dayjs(date).fromNow();
    },
  };
}
