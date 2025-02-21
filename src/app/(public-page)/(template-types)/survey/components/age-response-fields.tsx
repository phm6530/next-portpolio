import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FormField, FormLabel, FormMessage } from "@/components/ui/form";
import CustomRadio from "@/components/ui/input-radio-custom";

export default function AgeResponseFields() {
  const { control, watch } = useFormContext();
  const AgeGroups = [10, 20, 30, 40, 50, 60];
  const selectAgeGroup = watch("ageGroup");

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
              <div className="flex gap-2 flex-wrap [&>label]:flex-1">
                {AgeGroups.map((range) => {
                  return (
                    <CustomRadio
                      key={`ageGroup-${range}`}
                      active={parseInt(selectAgeGroup) === range}
                      label={range + " 대"}
                      onChange={() => {
                        field.onChange(range);
                      }}
                      value={range}
                    />
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
