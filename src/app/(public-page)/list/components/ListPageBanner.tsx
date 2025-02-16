import Grid from "@/components/ui/Grid";
import PageTitle from "@/components/ui/PageTitle";
import Button from "@/components/ui/button/Button";
import TemplateCractor from "./Cractor/TemplateCractor";
import Link from "next/link";

export default function ListPageBanner() {
  return (
    <div className="overflow-hidden min-h-[400px] bg-gradient-to-r from-[#e6f4ff] to-[#fbdfed] dark:from-[#2c1c46] dark:to-[#262039]">
      <Grid.center className="flex items-center flex-col md:flex-row justify-between">
        <div>
          <PageTitle>
            다른사람들은<br></br> 어떤
            <div className="pointText">생각</div>을 가졌는지 궁금하신가요?
          </PageTitle>

          <p className="mt-5 text-muted-foreground">
            평소에 궁금했던 질문을 익명의 장점을 살려 질문해보세요!
          </p>
          <div className="mt-8 flex gap-5">
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
