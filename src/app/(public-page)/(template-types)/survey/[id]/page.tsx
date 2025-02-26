import { BASE_NEST_URL } from "@/config/base";
import {
  FetchTemplateForm,
  RespondentsAndMaxGroup,
  TemplateItemMetadata,
} from "@/types/template.type";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import TemplateBadges from "@/components/ui/template/template-badges";
import SurveyResponseForm from "./survey-response-form";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UserRoleDisplay from "@/components/ui/userRoleDisplay/UserRoleDisplay";
// import TransformPlainText from "@/utils/transform-html-to-plaintext";
import ImageThumbNail from "@/components/ui/image-thumbnail";
import TipTapEditor from "@/components/ui/editor/tiptap-editor";

// export const runtime = "edge";

type SurveyDetailTemplateParams = {
  params: { id: number };
};

// 동적 생성
// export const dynamicParams = true;
export async function generateStaticParams() {
  let url = `${BASE_NEST_URL}/template?sort=all`;
  url += "&page=1";

  /**
   * 정적 페이지는 초기 Page 1만 Static으로 생성하고 이후 페이지들은 정적으로 생성되길 유도함
   */
  const response = await fetch(url);

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
  const response = await fetch(`${BASE_NEST_URL}/template/survey/${id}`);

  //존재하지 않는  페이지면 Redirect 시켜버림
  if (!response.ok) {
    notFound();
  }

  const data: FetchTemplateForm = await response.json();

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      images: "",
    },
  };
}

export default async function SurveyDetailTemplate({
  params: { id },
}: SurveyDetailTemplateParams) {
  const response = await fetch(`${BASE_NEST_URL}/template/survey/${id}`);
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
    respondents,
  } = data;

  return (
    <>
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
            <CardTitle className="flex flex-col gap-5 mb-2">
              <TemplateBadges
                startDate={startDate}
                endDate={endDate}
                createdAt={createdAt}
                maxGroup={data.respondents.maxGroup}
              />
              <div className="my-4 leading-9">{title}</div>
            </CardTitle>
            <TipTapEditor mode="view" value={description} />
          </CardHeader>
          <CardContent>
            <ImageThumbNail thumbnail={thumbnail} />

            <div className="mt-5">{/* Desciprtion */}</div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-5 text-sm text-muted-foreground">
            <UserRoleDisplay role={creator.role} nickname={creator.nickname} />
            <span className="text-[12px]">생성 일 {createdAt}</span>
          </CardFooter>
        </Card>
        {/* survey Form 응답 */}
        <SurveyResponseForm {...data} />{" "}
      </div>
    </>
  );
}
