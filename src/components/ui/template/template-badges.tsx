import DateCompareToday from "@/util/DateCompareToday";
import { RespondentsAndMaxGroup } from "@/types/template.type";
import { GENDER_GROUP } from "@/types/user";
import { Badge } from "../badge";

export default function TemplateBadges({
  startDate,
  endDate,
  createdAt,
  maxGroup,
}: {
  startDate: string | null;
  endDate: string | null;
  createdAt: string;
  maxGroup?: RespondentsAndMaxGroup["maxGroup"];
}) {
  const todayCompare = DateCompareToday();

  const curState = (startDate: string | null, endDate: string | null) => {
    if (!endDate) {
      return (
        <Badge variant={"secondary"} className="text-[10px]">
          무기한
        </Badge>
      );
    } else if (
      startDate &&
      todayCompare.isAfter(startDate) &&
      todayCompare.isBefore(endDate)
    ) {
      return <Badge variant={"secondary"}>진행중</Badge>;
    } else if (endDate && todayCompare.isAfter(endDate)) {
      return <div>종료</div>;
    } else {
      return null;
    }
  };

  const GenderMapper = (genderGroup: GENDER_GROUP) => {
    switch (genderGroup) {
      case GENDER_GROUP.FEMALE:
        return "여자";
      case GENDER_GROUP.MALE:
        return "남자";
      default:
        return null as never;
    }
  };

  return (
    <>
      <div className="text-sm flex gap-2 h-5">
        {/* New Template */}
        {todayCompare.isNew(createdAt) && (
          <Badge variant={"secondary"} className="text-[10px] font-normal">
            New
          </Badge>
        )}

        {curState(startDate, endDate)}

        {!!(maxGroup?.ageGroup && maxGroup.ageGroup) && (
          <Badge className="text-[10px] font-normal" variant={"secondary"}>
            {maxGroup?.ageGroup && `${maxGroup.ageGroup}대`}{" "}
            {maxGroup?.genderGroup &&
              `${GenderMapper(maxGroup.genderGroup as GENDER_GROUP)}`}{" "}
            선호
          </Badge>
        )}
      </div>
    </>
  );
}
