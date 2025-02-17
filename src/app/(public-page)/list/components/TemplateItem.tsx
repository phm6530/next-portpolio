"use client";
import {
  RespondentsAndMaxGroup,
  TemplateItemMetadata,
} from "@/types/template.type";
import Image from "next/image";
import imgUrlMapper from "@/util/imgUrlMapper";
import TemplateStatus from "@/components/templateUtill/TemplateStatus";
import { useRouter } from "next/navigation";
import { ForwardedRef, forwardRef, useEffect, useRef } from "react";
import TransformPlainText from "@/components/TransformPlainText";
import useAOS from "@/_hook/usAOS";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { PersonStanding, PersonStandingIcon, UserRound } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
      ...rest
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
              {" "}
              <div
                className={`hover:bg-card/50 text-start aos-hidden bg-card tdd flex flex-col cursor-pointer group border rounded-[15px] overflow-hidden shadow-lg`}
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
                    createdAt={createdAt}
                    maxGroup={maxGroup}
                  />

                  <div className="text-base my-2 line-clamp-1 w-full group-hover:underline">
                    {title}
                  </div>

                  <div className="line-clamp-2 min-h-10 text-[13px] leading-5 text-muted-foreground">
                    <TransformPlainText html={description} />
                  </div>

                  <div className="border-t text-[12px] text-muted-foreground pt-3 flex items-center">
                    <UserRound className="w-4 mr-2" /> {allCnt ?? 0}
                  </div>
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              className="text-muted-foreground text-start max-w-[200px]"
            >
              <div>남 {respondents.participants.male ?? 0}</div>

              <div>여 {respondents.participants.female ?? 0}</div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>{" "}
      </>
    );
  }
);

// 명시적으로 기재 안까먹기
TemplateItem.displayName = "TemplateItem";

export default TemplateItem;
