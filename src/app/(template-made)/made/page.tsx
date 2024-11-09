import classes from "./page.module.scss";
import SelectTemplateList from "@/app/(template-made)/components/SelectTemplateList";

export default function page() {
  return (
    <div className={classes.wrap}>
      <div className={classes.title}>
        <h1>만드실 템플릿을 선택해주세요</h1>
      </div>
      <SelectTemplateList />
    </div>
  );
}
