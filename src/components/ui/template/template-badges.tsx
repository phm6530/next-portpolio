import DateCompareToday from "@/util/DateCompareToday";
import { RespondentsAndMaxGroup } from "@/types/template.type";
import { GENDER_GROUP } from "@/types/user";
import { Badge } from "../badge";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TemplateBadges({
  startDate,
  endDate,
  createdAt,
  maxGroup,
}: {
  startDate?: string | null;
  endDate?: string | null;
  createdAt: string;
  maxGroup?: RespondentsAndMaxGroup["maxGroup"];
}) {
  const todayCompare = DateCompareToday();

  const curState = (startDate?: string | null, endDate?: string | null) => {
    if (startDate && todayCompare.isBefore(startDate)) {
      return (
        <Badge variant={"secondary"} className="font-normal text-[10px]">
          대기 중
        </Badge>
      );
    } else if (
      startDate &&
      (todayCompare.isAfter(startDate) || todayCompare.isSame(startDate))
    ) {
      return (
        <Badge className="font-normal text-[10px] flex gap-2 ">진행 중</Badge>
      );
    } else if (endDate && todayCompare.isAfter(endDate)) {
      return (
        <Badge
          variant={"secondary"}
          className="font-normal text-[10px] flex gap-2 "
        >
          종료
        </Badge>
      );
    } else if (!endDate) {
      return (
        <Badge variant={"secondary"} className="font-normal text-[10px]">
          무기한
        </Badge>
      );
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

  console.log(maxGroup?.genderGroup);

  return (
    <>
      <div className="text-sm flex gap-2 h-5">
        {/* New Template */}
        {/* {todayCompare.isNew(createdAt) && (
          <Badge variant={"outline"} className="text-[10px] font-normal">
            New
          </Badge>
        )} */}

        {curState(startDate, endDate)}

        {!!(maxGroup?.ageGroup && maxGroup.ageGroup) && (
          <Badge
            variant={"secondary"}
            className={cn(
              "text-[10px] font-normal ",

              maxGroup?.genderGroup === "female" && "!bg-chart-4",
              maxGroup?.genderGroup === "male" && "!bg-primary"
            )}
          >
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
