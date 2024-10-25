import DateCompareToday from "@/util/DateCompareToday";
import classes from "./TemplateComponent.module.scss";

export default function TemplateStatus({
  startDate,
  endDate,
  createdAt,
}: {
  startDate: string | null;
  endDate: string | null;
  createdAt: string;
}) {
  const todayCompare = DateCompareToday();

  const curState = (startDate: string | null, endDate: string | null) => {
    if (!endDate) {
      return <div className={classes.ing}>무기한</div>;
    } else if (
      startDate &&
      todayCompare.isAfter(startDate) &&
      todayCompare.isBefore(endDate)
    ) {
      return <div className={classes.ing}>진행중</div>;
    } else if (endDate && todayCompare.isAfter(endDate)) {
      return <div className={classes.ended}>종료</div>;
    } else {
      return null;
    }
  };

  return (
    <>
      <div className={classes.statusIcon}>
        {/* New Template */}
        {todayCompare.isNew(createdAt) && (
          <div className={classes.new}>New</div>
        )}
        {curState(startDate, endDate)}
      </div>
    </>
  );
}
