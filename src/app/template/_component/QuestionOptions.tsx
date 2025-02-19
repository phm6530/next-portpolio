import { useFormContext } from "react-hook-form";
import ImageViewer from "@/app/template/_component/ImageViewer";
import { QUESTION_TYPE, SurveyQuestionOption } from "@/types/survey.type";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { z } from "zod";
import { createSurveyFormSchema } from "@/app/(public-page)/(template-types)/survey/[id]/survey-form-schema";
import { cn } from "@/lib/utils";
import CustomRadio from "@/components/ui/input-radio-custom";

type FormSchema = z.infer<ReturnType<typeof createSurveyFormSchema>>;

export default function QuestionOptions({
  label,
  options,
  qsId,
  idx,
}: {
  label: string;
  options: SurveyQuestionOption[];
  qsId: number;
  idx: number;
}) {
  const { control, watch } = useFormContext<FormSchema>();

  console.log(watch());

  //하나라도 이미지 있으면 UI 변경하기
  const isPictureOption = options?.some((e) => e.img !== null) || false;

  return (
    <Card>
      <CardHeader>
        <FormLabel className="text-xl">{label}</FormLabel>
      </CardHeader>

      <FormField
        name={`answers.${idx}.optionId`}
        control={control}
        render={({ field }) => {
          return (
            <>
              <CardContent>
                <div
                  className={cn(
                    "grid gap-4 ",
                    isPictureOption &&
                      "grid-cols-[repeat(auto-fit,minmax(200px,1fr))]"
                  )}
                >
                  {options?.map((op, idx) => {
                    return (
                      <FormItem key={`option-${op.id}-${idx}`}>
                        <FormControl>
                          <CustomRadio
                            onChange={() => {
                              field.onChange(op.id);
                            }}
                            label={op.value}
                            active={op.id === field.value}
                          >
                            {op.img && (
                              <>
                                <ImageViewer image={op.img} alt={op.value} />
                              </>
                            )}
                          </CustomRadio>
                        </FormControl>
                      </FormItem>
                    );
                  })}
                </div>
                <FormMessage />
              </CardContent>
            </>
          );
        }}
      />
    </Card>
  );
}
