import SurveyControler from "@/app/template/_component/survey/SurveyControler";
import SurveyList from "@/app/template/_component/survey/surveyList";
import Grid from "@/components/ui/Grid";
import SearchInput from "@/components/ui/SearchInput";
import { fetchList } from "@/lib/surveySerivce";

import classes from "./TemplateList.module.scss";

export default async function TemplateList({
  page,
  sort,
  search,
}: {
  page: string;
  sort?: string;
  search?: string;
}) {
  // search
  const curPage = +page || 1;
  const prefetchData = await fetchList(curPage + "", sort, search);

  return (
    <Grid.center>
      {/* btn Area */}
      <div className={classes.searchFilterWrapper}>
        {/* <HotKeyword /> */}
        <SurveyControler />
        <SearchInput search={search} />
      </div>

      {/* List */}
      <SurveyList
        prefetchData={prefetchData}
        curPage={curPage}
        sort={sort}
        search={search}
      />
    </Grid.center>
  );
}
