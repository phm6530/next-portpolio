import { useFormContext } from "react-hook-form";
import InputTypeStyle from "@/app/template/_component/InputTypeStyle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField, FormLabel, FormMessage } from "@/components/ui/form";

export default function OptionAgeGroup() {
  const { control, watch, formState } = useFormContext();
  const AgeGroups = [10, 20, 30, 40, 50, 60];
  const selectAgeGroup = watch("ageGroup");
  console.log(formState.errors);
  return (
    <FormField
      name="ageGroup"
      control={control}
      render={({ field }) => {
        return (
          <Card>
            <CardHeader>
              <FormLabel className="text-xl">연령대를 선택해주세요</FormLabel>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3 flex-wrap">
                {AgeGroups.map((range) => {
                  return (
                    <InputTypeStyle.RadioAnswer
                      key={`ageGroup-${range}`}
                      selectId={selectAgeGroup}
                      curid={range + ""}
                    >
                      {/* hidden 처리 */}
                      <input
                        type="radio"
                        className="hidden"
                        {...field}
                        value={range}
                        checked={field.value === AgeGroups}
                      />
                      {range} 대
                    </InputTypeStyle.RadioAnswer>
                  );
                })}
              </div>{" "}
              <FormMessage />
            </CardContent>
          </Card>
        );
      }}
    />
  );
}
