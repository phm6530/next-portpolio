import DateCompareToday from "@/app/lib/DateCompareToday";
import { CommentTemplateProps } from "@/types/template";
import classes from "./TemplateComponent.module.scss";

export default function TemplateStatus({
  dateRange,
  createdAt,
}: {
  dateRange: CommentTemplateProps["dateRange"];
  createdAt: string;
}) {
  const todayCompare = DateCompareToday();

  return (
    <>
      <div className={classes.statusIcon}>
        {todayCompare.isNew(createdAt) && (
          <div className={classes.new}>New</div>
        )}

        {dateRange.some((e) => e === null) ? (
          <div className={classes.ing}>무기한</div>
        ) : dateRange[0] && todayCompare.isBefore(dateRange[0]) ? (
          "진행 전"
        ) : dateRange[1] && todayCompare.isAfter(dateRange[1]) ? (
          <div className={classes.end}>종료</div>
        ) : (
          <div className={classes.ing}>진행중</div>
        )}
      </div>
    </>
  );
}
