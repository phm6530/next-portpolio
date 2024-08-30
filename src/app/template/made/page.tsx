import Grid from "@/app/_components/ui/Grid";
import classes from "./SelectTemplate.module.scss";
import { commentMetadata } from "@/meta/staticMetaData";
import SelectTemplateList from "@/app/template/made/SelectTemplateList";

//정적 메타 데이터
export const metadata = commentMetadata;

export default function templatePage() {
  return (
    <Grid.center>
      <div className={classes.wrap}>
        <div className={classes.title}>
          <h1>만드실 템플릿을 선택해주세요</h1>
        </div>
        <SelectTemplateList />
      </div>
    </Grid.center>
  );
}
