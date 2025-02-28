import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import surveySchema from "./schema";
import { toast } from "react-toastify";

export default function OptionsController({
  name,
  multiSelect = false,
}: {
  name: `questions.${number}`;
  multiSelect?: boolean;
}) {
  const { control, watch } = useFormContext<z.infer<typeof surveySchema>>();

  const questions = watch("questions");

  const requiredCount = questions.filter(
    (question) => question.required === true
  ).length;

  return (
    <div className="flex gap-3">
      <FormField
        name={`${name}.required`}
        control={control}
        render={({ field }) => {
          return (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 cursor-pointer">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(chk) => {
                          // 첫번쨰 인자로 체크 행위가 들어옴
                          if (!chk && requiredCount <= 1) {
                            toast.warn("하나이상의 질문은 필수어야 합니다.");
                            return;
                          }
                          return field.onChange(chk);
                        }}
                      />
                    </FormControl>
                    <div className="leading-none">
                      <FormLabel className=" text-[12px] md:text-sm">
                        필수 선택 항목
                      </FormLabel>
                    </div>
                  </FormItem>
                </TooltipTrigger>
                <TooltipContent
                  align="start"
                  sideOffset={20}
                  className="flex flex-row gap-2 items-center"
                >
                  <Info className="h-4 w-4" />
                  <p className="text-xs">
                    체크 해제 시 필수 응답 해제가 가능합니다
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        }}
      />

      {multiSelect && (
        <FormField
          name={`${name}.multi_select`}
          control={control}
          render={({ field }) => {
            return (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="leading-none">
                        <FormLabel className=" text-[12px] md:text-sm">
                          복수 선택 여부
                        </FormLabel>
                      </div>
                    </FormItem>
                  </TooltipTrigger>
                  <TooltipContent
                    align="start"
                    sideOffset={20}
                    className="flex flex-row gap-2 items-center"
                  >
                    <Info className="h-4 w-4" />
                    <p className="text-xs">
                      체크 해제 시 필수 응답 해제가 가능합니다
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          }}
        />
      )}
    </div>
  );
}
