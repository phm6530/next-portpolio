"use client";
import {
  RespondentsAndMaxGroup,
  TemplateItemMetadata,
} from "@/types/template.type";
import Image from "next/image";
import imgUrlMapper from "@/util/imgUrlMapper";
import TemplateBadges from "@/components/ui/template/template-badges";
import { useRouter } from "next/navigation";
import { ForwardedRef, forwardRef, useEffect, useRef } from "react";
import transformHtmlToPlainText from "@/utils/transform-html-to-plaintext";
import useAOS from "@/_hook/usAOS";
import { UserRound } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Male from "/public/asset/3d/male.png";
import Female from "/public/asset/3d/female.png";
const TemplateItem = forwardRef(
  (
    {
      id,
      title,
      description,
      templateType,
      createdAt,
      startDate,
      endDate,
      thumbnail,
      respondents,
      isAgeCollected,
      isGenderCollected,
      ..._rest
    }: TemplateItemMetadata<RespondentsAndMaxGroup>,
    ref?: ForwardedRef<HTMLDivElement>
  ) => {
    //참여자
    const { allCnt, maxGroup } = respondents;
    useAOS();

    const tooltipRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const updatePosition = (event: MouseEvent) => {
        if (tooltipRef.current) {
          requestAnimationFrame(() => {
            tooltipRef.current!.style.left = `${event.clientX + 10}px`;
            tooltipRef.current!.style.top = `${event.clientY + 10}px`;
          });
        }
      };

      document.addEventListener("mousemove", updatePosition);
      return () => document.removeEventListener("mousemove", updatePosition);
    }, []);

    const router = useRouter();

    return (
      <>
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger>
              <div
                className={`hover:bg-card/50 text-start aos-hidden bg-card border dark:border-border/50 tdd flex flex-col cursor-pointer group rounded-[15px] overflow-hidden`}
                onClick={() => router.push(`/${templateType}/${id}`)}
                ref={ref}
              >
                {thumbnail && (
                  <div className="relative w-full pb-[45%]  flex-1 rounded-md overflow-hidden border-b">
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
                  <TemplateBadges
                    startDate={startDate}
                    endDate={endDate}
                    maxGroup={maxGroup}
                  />

                  <div className="text-lg my-2 line-clamp-2 break-words break-keep w-full group-hover:underline">
                    {title}
                  </div>

                  <div className="line-clamp-2 min-h-10 text-[13px] leading-5 text-muted-foreground">
                    {transformHtmlToPlainText({ html: description })}
                  </div>

                  <div className="border-t border-border/50 text-[12px] text-muted-foreground pt-3 flex items-center">
                    <UserRound className="w-4 mr-2" /> {allCnt ?? 0}
                  </div>
                </div>
              </div>
            </TooltipTrigger>
            {isAgeCollected && isGenderCollected && (
              <TooltipContent
                side="right"
                className="text-muted-foreground text-start max-w-[200px]"
              >
                <div className="flex">
                  <div className="relative w-5 h-5">
                    <Image
                      src={Female}
                      alt="logo"
                      fill
                      priority
                      style={{ objectFit: "contain" }}
                      sizes="(max-width: 768px) 50vw"
                    />
                  </div>
                  <span className="text-[12px] ml-3 text-foreground">
                    {respondents.participants.female ?? 0} 명
                  </span>
                </div>
                <div className="flex border-t pt-2 mt-2">
                  <div className="relative w-5 h-5">
                    <Image
                      src={Male}
                      alt="logo"
                      fill
                      priority
                      style={{ objectFit: "contain" }}
                      sizes="(max-width: 768px) 50vw"
                    />
                  </div>
                  <span className="text-[12px] ml-3 text-foreground">
                    {respondents.participants.male ?? 0} 명
                  </span>
                </div>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>{" "}
      </>
    );
  }
);

// 명시적으로 기재 안까먹기
TemplateItem.displayName = "TemplateItem";

export default TemplateItem;
