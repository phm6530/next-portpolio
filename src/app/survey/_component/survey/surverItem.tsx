import { SurveyItemProps } from "@/types/survey";
import classes from "./SurveyList.module.scss";
import { useRouter } from "next/navigation";

export default function SurveyItem({
  itemData,
}: {
  itemData: SurveyItemProps;
}) {
  const { surveyId, surveyTitle } = itemData;
  const router = useRouter();

  const onClickHandler = (e: Pick<SurveyItemProps, "surveyId">["surveyId"]) => {
    router.push(`/survey/${e}`);
  };

  return (
    <div className={classes.surveyBox} onClick={() => onClickHandler(surveyId)}>
      <div>id : {surveyTitle}</div>
      <div>title : {surveyTitle}</div>
    </div>
  );
}
