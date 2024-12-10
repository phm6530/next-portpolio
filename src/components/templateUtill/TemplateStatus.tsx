import DateCompareToday from "@/util/DateCompareToday";
import classes from "./TemplateComponent.module.scss";
import { RespondentsAndMaxGroup } from "@/types/template.type";
import { GENDER_GROUP } from "@/types/user";

export default function TemplateStatus({
  startDate,
  endDate,
  createdAt,
  maxGroup
}: {
  startDate: string | null;
  endDate: string | null;
  createdAt: string;
  maxGroup? : RespondentsAndMaxGroup["maxGroup"];
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

  const GenderMapper = (genderGroup :GENDER_GROUP) =>{
    switch (genderGroup){
      case GENDER_GROUP.FEMALE :  
        return "여자";
      case GENDER_GROUP.MALE :
        return "남자";
      default :
        return null as never; 
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

        {maxGroup && 
          maxGroup.maxCnt !== null && maxGroup.maxCnt >= 1 && 
            <div className={classes.maleMaxGroup}>{maxGroup.ageGroup}대 {GenderMapper(maxGroup.genderGroup as GENDER_GROUP)} 선호</div> 
          
        }
      
      </div>

    </>
  );
}
