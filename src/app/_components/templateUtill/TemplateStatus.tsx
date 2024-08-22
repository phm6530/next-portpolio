import helperDateCompare from "@/app/lib/helperDateCompare";
import { CommentTemplateProps } from "@/types/template";

export default function TemplateStatus({
  dateRange,
}: {
  dateRange: CommentTemplateProps["dateRange"];
}) {
  const todayCompare = helperDateCompare();
  return (
    <>
      <div>
        {dateRange.some((e) => e === null)
          ? "기한 없음"
          : dateRange[0] && todayCompare.isBefore(dateRange[0])
          ? "진행전"
          : dateRange[1] && todayCompare.isAfter(dateRange[1])
          ? "종료"
          : "진행 중"}
        <div>
          {dateRange[0]} ~ {dateRange[1]}
        </div>
      </div>
    </>
  );
}
