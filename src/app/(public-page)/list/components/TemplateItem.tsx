"use client";
import {
  RespondentsAndMaxGroup,
  TemplateItemMetadata,
} from "@/types/template.type";
import Image from "next/image";
import imgUrlMapper from "@/util/imgUrlMapper";
import TemplateStatus from "@/components/templateUtill/TemplateStatus";
import { useRouter } from "next/navigation";
import { ForwardedRef, forwardRef } from "react";
import TransformPlainText from "@/components/TransformPlainText";
import useAOS from "@/_hook/usAOS";

const TemplateItem = forwardRef(
  (
    {
      id,
      title,
      description,
      templateType,
      createAt,
      startDate,
      endDate,
      thumbnail,
      respondents,
      ...rest
    }: TemplateItemMetadata<RespondentsAndMaxGroup>,
    ref?: ForwardedRef<HTMLDivElement>
  ) => {
    //참여자
    const { allCnt, maxGroup } = respondents;
    useAOS();

    const router = useRouter();

    return (
      <div
        className={`aos-hidden tdd flex flex-col cursor-pointer group border rounded-lg shadow-md`}
        onClick={() => router.push(`/${templateType}/${id}`)}
        ref={ref}
      >
        {thumbnail && (
          <div className="relative w-full pb-[60%]  flex-1 rounded-t-md overflow-hidden border-b">
            <Image
              alt="test"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
              fill
              src={imgUrlMapper({ thumbnail })}
              priority
              // fill
              style={{ objectFit: "cover" }}
            />
          </div>
        )}

        {/* <Image src={img} fill /> */}
        <div className="flex flex-col gap-3 p-4 min-h-32">
          {/* 상태 icons.. */}
          <TemplateStatus
            startDate={startDate}
            endDate={endDate}
            createdAt={createAt}
            maxGroup={maxGroup}
          />

          <div className="text-base line-clamp-1 group-hover:underline">
            {title}
          </div>

          <div className="line-clamp-2 text-[13px] leading-5 text-muted-foreground">
            <TransformPlainText html={description} />
          </div>

          {/* 템플릿 정보 보여주기 */}
        </div>
      </div>
    );
  }
);

// 명시적으로 기재 안까먹기
TemplateItem.displayName = "TemplateItem";

export default TemplateItem;
