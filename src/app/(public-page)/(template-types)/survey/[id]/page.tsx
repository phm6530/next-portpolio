import { BASE_NEST_URL } from "@/config/base";
import {
  FetchTemplateForm,
  RespondentsAndMaxGroup,
  TemplateItemMetadata,
} from "@/types/template.type";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import SurveyResponseForm from "./survey-response-form";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UserRoleDisplay from "@/components/ui/userRoleDisplay/UserRoleDisplay";
import ImageThumbNail from "@/components/ui/image-thumbnail";
import TipTapEditor from "@/components/ui/editor/tiptap-editor";

import dynamic from "next/dynamic";
import dayjs from "dayjs";
import { Badge } from "@/components/ui/badge";

type SurveyDetailTemplateParams = {
  params: { id: number };
};

const DynamicTemplateController = dynamic(
  () => import("../components/template-visible-controller"),
  { ssr: false } // 클라이언트 측에서만 렌더링
);

export async function generateStaticParams() {
  let url = `${BASE_NEST_URL}/template?sort=all`;
  url += "&page=1";

  const response = await fetch(url, { cache: "force-cache" });

  const {
    data: listResponse,
  }: { data: TemplateItemMetadata<RespondentsAndMaxGroup>[] } =
    await response.json();

  return listResponse.map((template) => {
    if ("id" in template) {
      return { id: template.id.toString() };
    }
  });
}

export async function generateMetadata({
  params: { id },
}: SurveyDetailTemplateParams): Promise<Metadata> {
  const response = await fetch(`${BASE_NEST_URL}/template/survey/${id}`, {
    cache: "force-cache",
    next: {
      tags: [`template-survey-${+id}`], // Tags
    },
  });

  //존재하지 않는  페이지면 Redirect 시켜버림
  if (!response.ok) {
    notFound();
  }

  const data: FetchTemplateForm = await response.json();

  return {
    title: `[dopoll] ${data.title}`,
    description: data.description,
    openGraph: {
      title: `[dopoll] ${data.title}`,
      description: data.description,
      images: data.thumbnail,
    },
  };
}

export default async function SurveyDetailTemplate({
  params: { id },
}: SurveyDetailTemplateParams) {
  const response = await fetch(`${BASE_NEST_URL}/template/survey/${id}`, {
    cache: "force-cache",
    next: {
      tags: [`template-survey-${+id}`], // Tags
    },
  });
  const data: FetchTemplateForm = await response.json();

  if (!data) {
    notFound();
  }

  const {
    title,
    description,
    thumbnail,
    startDate,
    endDate,
    createdAt,
    creator,
  } = data;

  return (
    <DynamicTemplateController
      startDate={startDate}
      endDate={endDate}
      data={data}
    >
      <Button
        asChild
        variant={"link"}
        className="pl-0 text-muted-foreground mb-5"
      >
        <Link href={"/"}>
          <ChevronLeft className="w-4 h-4" /> 목록으로
        </Link>
      </Button>

      <div className="animate-fadein">
        <Card className="rounded-2xl ">
          <CardHeader>
            <CardTitle className="flex flex-col gap-5 mb-2 items-start">
              <div className="flex gap-2">
                <Badge variant={"secondary"} className="font-normal">
                  Survey
                </Badge>
                <Badge className="font-normal">진행 중</Badge>
              </div>
              {/* <TemplateBadges
                startDate={startDate}
                endDate={endDate}
                maxGroup={data.respondents.maxGroup}
              /> */}
              <div className="my-4 leading-9">{title}</div>
            </CardTitle>
            <TipTapEditor mode="view" value={description} />
          </CardHeader>
          {thumbnail && (
            <CardContent className="md:p-6 p-3">
              <ImageThumbNail thumbnail={thumbnail} />
            </CardContent>
          )}
          <CardFooter className="flex md:p-6 p-3 justify-between border-t pt-5 text-sm text-muted-foreground">
            <UserRoleDisplay role={creator.role} nickname={creator.nickname} />
            <span className="text-[12px]">
              생성 일 {dayjs(createdAt).format("YYYY-MM-DD")}
            </span>
          </CardFooter>
        </Card>
        <SurveyResponseForm {...data} />
      </div>
    </DynamicTemplateController>
  );
}
