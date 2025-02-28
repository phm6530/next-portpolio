import Grid from "@/components/ui/Grid";

import TemplateCractor from "./Cractor/TemplateCractor";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";

export default function ListPageBanner() {
  return (
    <div className="overflow-hidden min-h-[400px] pt-10 md:pt-0 bg-gradient-to-r from-[#edf5ff] to-[#f8e8f3] dark:from-[#3a2b5c] dark:to-[#4a5293]">
      <Grid.center
        className={`
          flex items-center flex-col justify-between
          md:flex-row 
        `}
      >
        <div>
          <div className="">
            <span
              className={`
            text-2xl leading-8 
            md:text-3xl md:leading-10`}
            >
              다른사람들은 <br />
              어떤 <span className="text-point">생각</span>을 가졌는지
              궁금하신가요?
            </span>
          </div>
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
