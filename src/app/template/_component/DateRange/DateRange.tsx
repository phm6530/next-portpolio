import dayjs from "dayjs";
import classes from "./DateRange.module.scss";

export default function DateRange<T extends string | null>({
  dateRange,
}: {
  dateRange: T[];
}) {
  return (
    <div className={classes.dateRange}>
      {dateRange[0] ? (
        <>
          {dayjs(dateRange[0]).format("YYYY년 MM월 DD일")} ~{" "}
          {dayjs(dateRange[1]).format("YYYY년 MM월 DD일")}
        </>
      ) : (
        "기한 없음"
      )}
    </div>
  );
}
