import { useFieldArray, useFormContext } from "react-hook-form";
import ZoomableImage from "@/components/ui/image-zoomable";
import { QUESTION_TYPE, SurveyQuestionOption } from "@/types/survey.type";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { CardContent } from "@/components/ui/card";
import { z } from "zod";
import { createSurveyFormSchema } from "../[id]/survey-response-form-schema";
import { cn } from "@/lib/utils";
import CustomRadio from "@/components/ui/input-radio-custom";
import CustomCheckbox from "@/components/ui/input-checkbox-custom";

type FormSchema = z.infer<ReturnType<typeof createSurveyFormSchema>>;

export default function SelectResponseField({
  options,
  idx,
  isMulti,
}: {
  label: string;
  options: SurveyQuestionOption[];
  idx: number;
  isMulti: boolean;
}) {
  const { control } = useFormContext<FormSchema>();

  //하나라도 이미지 있으면 UI 변경하기
  const isPictureOption = options?.some((e) => e.img !== null) || false;

  return (
    <FormField
      name={`answers.${idx}.optionId`}
      control={control}
      render={({ field }) => {
        return (
          <>
            <div
              className={cn(
                "grid gap-4 ",
                isPictureOption &&
                  "grid-cols-[repeat(auto-fit,minmax(230px,1fr))]"
              )}
            >
              {options?.map((op, idx) => {
                const selectOptionId = field.value.find(
                  (option) => option[op.id]
                );

                return (
                  <FormItem key={`option-${op.id}-${idx}`}>
                    <FormControl>
                      {isMulti ? (
                        <CustomCheckbox
                          label={op.value}
                          active={!!selectOptionId}
                          onChange={() => {
                            if (selectOptionId) {
                              field.onChange([
                                ...field.value.filter((obj) => {
                                  return obj[op.id] !== op.id;
                                }),
                              ]);

                              return;
                            }

                            field.onChange([
                              ...field.value,
                              { [op.id]: op.id },
                            ]);
                          }}
                        >
                          {op.img && (
                            <>
                              <ZoomableImage image={op.img} alt={op.value} />
                            </>
                          )}
                        </CustomCheckbox>
                      ) : (
                        <CustomRadio
                          onChange={() => {
                            // 그냥 덮어버려
                            field.onChange([{ [op.id]: op.id }]);
                          }}
                          label={op.value}
                          active={(field.value[0] ?? {})[op.id] === op.id}
                        >
                          {op.img && (
                            <>
                              <ZoomableImage image={op.img} alt={op.value} />
                            </>
                          )}
                        </CustomRadio>
                      )}
                    </FormControl>
                  </FormItem>
                );
              })}
            </div>
            <FormMessage />
          </>
        );
      }}
    />
  );
}
