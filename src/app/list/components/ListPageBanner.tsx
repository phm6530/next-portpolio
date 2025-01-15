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
            다른사람들은<br></br> 어떤
            <div className="pointText">생각</div>을 가졌는지
            궁금하신가요?
          </PageTitle>

          <p className={classes.description}>
            평소에 궁금했던 질문을 익명의 장점을 살려 질문해보세요!
          </p>
          <div className={classes.buttonWrapper}>
            <Link href={"/made"}>
              <Button.submit>+ 설문조사 만들기</Button.submit>
            </Link>
            {/* 
            <Link href={"/made"}>
              <Button.BannerBtn>
                <AnonymousIcon /> 설문조사 만들기
              </Button.BannerBtn>
            </Link>
            <Link href={"/made"}>
              <Button.BannerBtn>+ 랭킹 만들기</Button.BannerBtn>
            </Link>
            <Link href={"/made"}>
              <Button.BannerBtn>+ 테스트 만들기</Button.BannerBtn>
            </Link> */}
          </div>
        </div>

        {/* 캐릭터 */}
        <TemplateCractor />
      </Grid.center>
    </div>
  );
}
