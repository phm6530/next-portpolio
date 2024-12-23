import PageTitle from "@/components/ui/PageTitle";

import Grid from "@/components/ui/Grid";
import Vanner from "@/components/ui/Vanner";
import Button from "@/components/ui/button/Button";

import classes from "./surveyPage.module.scss";
import TemplateCractor from "@/components/Cractor/TemplateCractor";
import TemplateList from "../list/components/TemplateItemList";
import { Suspense } from "react";

type Extract<T, U> = T extends U ? T : never;

type B = Extract<string | number | boolean, number>;

export default async function CreateSurveyPage({
  searchParams,
}: {
  searchParams: { page: string; sort?: string; search?: string };
}) {
  return (
    <>
      <div className={classes.wrap}>
        <Vanner>
          <Grid.center>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <PageTitle>
                  다른사람들은<br></br> !어떤
                  <div className="pointText">생각</div>을 가졌는지 궁금하신가요?
                </PageTitle>

                <p className={classes.description}>
                  평소에 궁금했던 질문을 익명의 장점을 살려 질문해보세요!
                </p>

                <Button.moveLink moveUrl={"/template/made"}>
                  + 설문조사 만들기
                </Button.moveLink>
              </div>
              <TemplateCractor />
            </div>
          </Grid.center>
        </Vanner>

        <Suspense fallback={<div>loading.....</div>}>
          {/* templat List  */}
          <TemplateList
            page={searchParams.page}
            sort={searchParams.sort}
            search={searchParams.search}
          />
        </Suspense>
      </div>
    </>
  );
}
