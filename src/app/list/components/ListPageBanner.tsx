import classes from "./ListPageBanner.module.scss";
import Grid from "@/components/ui/Grid";
import PageTitle from "@/components/ui/PageTitle";
import Button from "@/components/ui/button/Button";
import TemplateCractor from "@/components/Cractor/TemplateCractor";
import Link from "next/link";

export default function ListPageBanner() {
  return (
    <div className={classes.container}>
      <Grid.center className={classes.bannerGrid}>
        <div>
          <PageTitle>
            질문을 만들고 <br></br>다른 사람들의{" "}
            <div className="pointText">생각</div>을 확인해보세요!
          </PageTitle>

          <p className={classes.description}>
            이메일로 간단히 가입하고, 별도의 인증 없이 바로 시작하세요.
          </p>
          <div className={classes.buttonWrapper}>
            <Link href={"/made"}>
              <Button.submit>+ 설문조사 만들기</Button.submit>
            </Link>
          </div>
        </div>

        {/* 캐릭터 */}
        <TemplateCractor />
      </Grid.center>
    </div>
  );
}
