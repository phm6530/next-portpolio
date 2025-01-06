import classes from "./ResultSummry.module.scss";
import TemplateTitle from "@/components/ui/templateUi/TemplateTitle";
import TemplateStatus from "@/components/templateUtill/TemplateStatus";
import { SurveyResult } from "@/types/surveyResult.type";
import QuillViewer from "@/components/Editor/QuillViewer";

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
  const { allCnt, detail } = respondents;

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
          maxGroup={detail.maxGroup}
        />

        <TemplateTitle
          allCnt={allCnt}
          role={creator.role}
          nickname={creator.nickname}
        >
          {title}
        </TemplateTitle>

        <QuillViewer contents={description} />

        {/* <Button.moveLink moveUrl={`/${templateType}/${id}`}>
          참여하기
        </Button.moveLink> */}
      </div>
    </div>
  );
}
