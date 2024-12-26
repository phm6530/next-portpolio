import classes from "./ResultSummry.module.scss";
import TemplateTitle from "@/components/ui/templateUi/TemplateTitle";
import Button from "@/components/ui/button/Button";
import TemplateStatus from "@/components/templateUtill/TemplateStatus";
import { SurveyResult } from "@/types/surveyResult.type";
import QuillViewer from "@/components/Editor/QuillViewer";
import UserRoleDisplay from "@/components/ui/userRoleDisplay/UserRoleDisplay";

export default async function ResultSummry(data: SurveyResult) {
  const {
    id,
    title,
    description,
    templateType,
    startDate,
    endDate,
    createdAt,
    respondents,
    creator,
  } = data;
  const { allCnt } = respondents;

  console.log("creator::", creator);

  return (
    <div className={classes.summeryDetail}>
      {/* <div className={classes.relative}>
        <div className={classes.Badge}>결과페이지</div>
      </div> */}
      <div className={classes.summeryInfoWrapper}>
        <TemplateStatus
          startDate={startDate}
          endDate={endDate}
          createdAt={createdAt}
        />

        <TemplateTitle role={creator.role} nickname={creator.nickname}>
          {title}
        </TemplateTitle>

        <QuillViewer contents={description} />

        {/* <div>
          <span>참여자 </span>
          <span className={classes.userCnt}>{allCnt || 0}</span> 명
        </div> */}

        {/* <Button.moveLink moveUrl={`/${templateType}/${id}`}>
          참여하기
        </Button.moveLink> */}
      </div>
    </div>
  );
}
