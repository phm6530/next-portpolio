import Grid from "@/components/ui/Grid";
import classes from "./SelectTemplate.module.scss";

import SelectTemplateList from "@/app/template/made/SelectTemplateList";

export default function templatePage() {
  return (
    <Grid.center>
      <div className={classes.wrap}>
        <div className={classes.title}>
          <h1>만드실 템플릿을 선택해주세요</h1>
        </div>
        {/* <SelectTemplateList /> */}
      </div>
    </Grid.center>
  );
}
