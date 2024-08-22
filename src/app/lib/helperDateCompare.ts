import dayjs from "dayjs";

export default function helperDateCompare() {
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
  };
}
