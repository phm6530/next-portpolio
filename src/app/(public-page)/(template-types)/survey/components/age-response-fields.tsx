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
            <CardHeader className="md:px-6 px-3">
              <FormLabel className="md:text-xl text-base">
                연령대를 선택해주세요 <span className="text-point">*</span>
              </FormLabel>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 md:px-6 px-3">
              <div className="grid gap-2 grid-cols-[repeat(auto-fit,minmax(100px,1fr))]">
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
