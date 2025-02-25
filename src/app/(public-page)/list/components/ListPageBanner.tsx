import Grid from "@/components/ui/Grid";
import PageTitle from "@/components/ui/PageTitle";
import TemplateCractor from "./Cractor/TemplateCractor";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";

export default function ListPageBanner() {
  return (
    <div className="overflow-hidden min-h-[400px] bg-gradient-to-r from-[#edf5ff] to-[#f8e8f3] dark:from-[#3a2b5c] dark:to-[#4a5293]">
      <Grid.center className="flex items-center flex-col md:flex-row justify-between">
        <div>
          <PageTitle>
            다른사람들은<br></br> 어떤
            <div className="pointText">생각</div>을 가졌는지 궁금하신가요?
          </PageTitle>

          <CardDescription className="mt-3 text-base">
            평소에 궁금했던 질문을 익명의 장점을 살려 질문해보세요!
          </CardDescription>
          <div className="mt-8 flex gap-5">
            <Button asChild className="p-6">
              <Link href={"/made"}>+ 설문조사 만들기</Link>
            </Button>
          </div>
        </div>

        {/* 캐릭터 */}
        <TemplateCractor />
      </Grid.center>
    </div>
  );
}
