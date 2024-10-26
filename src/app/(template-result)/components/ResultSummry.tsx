import classes from "./ResultSummry.module.scss";
import TemplateTitle from "@/components/ui/templateUi/TemplateTitle";
import Button from "@/components/ui/button/Button";
import TemplateStatus from "@/components/templateUtill/TemplateStatus";
import { fetchSurveyData } from "@/app/(template-result)/result/survey/components/test";
import { queryClient } from "@/config/queryClient";
import { QUERY_KEY } from "@/types/constans";
import { SurveyResult } from "@/types/surveyResult.type";

export default async function ResultSummry({ id }: { id: string }) {
  const data = await queryClient.fetchQuery<SurveyResult>({
    queryKey: [QUERY_KEY.SURVEY_RESULTS, id],
    queryFn: async () => await fetchSurveyData(id),
    staleTime: 10000,
  });

  const {
    title,
    description,
    templateType,
    startDate,
    endDate,
    createdAt,
    respondents,
  } = data;
  const { allCnt } = respondents;

  return (
    <div className={classes.summeryDetail}>
      <div className={classes.relative}>
        <div className={classes.Badge}>결과페이지</div>
      </div>
      <div className={classes.summeryInfoWrapper}>
        <TemplateStatus
          startDate={startDate}
          endDate={endDate}
          createdAt={createdAt}
        />

        <TemplateTitle>{title}</TemplateTitle>
        <div className={classes.description}>{description}</div>

        <div>
          <span>참여자 </span>
          <span className={classes.userCnt}>{allCnt || 0}</span> 명
        </div>

        <Button.moveLink moveUrl={`/${templateType}/${id}`}>
          참여하기
        </Button.moveLink>
      </div>
    </div>
  );
}
