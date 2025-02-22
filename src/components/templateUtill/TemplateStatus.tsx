import DateCompareToday from "@/util/DateCompareToday";
import classes from "./TemplateComponent.module.scss";
import { RespondentsAndMaxGroup } from "@/types/template.type";
import { GENDER_GROUP } from "@/types/user";
import { Badge } from "../ui/badge";

export default function TemplateStatus({
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
      return <div className={classes.ended}>종료</div>;
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
      <div className={classes.statusIcon}>
        {/* New Template */}
        {todayCompare.isNew(createdAt) && (
          <Badge variant={"secondary"} className="text-[10px]">
            New
          </Badge>
        )}

        {curState(startDate, endDate)}

        {maxGroup?.maxCnt && (maxGroup?.ageGroup || maxGroup?.genderGroup) && (
          <Badge className="text-[10px] bg-primary/40  ">
            {maxGroup.ageGroup && `${maxGroup.ageGroup}대`}{" "}
            {maxGroup.genderGroup &&
              `${GenderMapper(maxGroup.genderGroup as GENDER_GROUP)}`}{" "}
            선호
          </Badge>
        )}
      </div>
    </>
  );
}
