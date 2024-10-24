import { fetchSurveyData } from "@/app/(template-result)/result/survey/[id]/page";
import classes from "./ResultSummry.module.scss";
import TemplateTitle from "@/components/ui/templateUi/TemplateTitle";
import Button from "@/components/ui/button/Button";
import TemplateStatus from "@/components/templateUtill/TemplateStatus";

export default async function ResultSummry({ id }: { id: string }) {
  const data = await fetchSurveyData(id);

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

  console.log(data);

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
