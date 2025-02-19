import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FormField, FormLabel, FormMessage } from "@/components/ui/form";
import CustomRadio from "@/components/ui/input-radio-custom";

export default function OptionGenderGroup() {
  const { control, watch } = useFormContext();
  const genders = ["male", "female"];
  const selectGender = watch("gender");

  return (
    <FormField
      name="gender"
      control={control}
      render={({ field }) => {
        return (
          <>
            <Card>
              <CardHeader>
                <FormLabel className="text-xl">
                  성별이 어떻게 되시나요?
                </FormLabel>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  {genders.map((gender) => {
                    return (
                      <CustomRadio
                        key={`GenderGroup-${gender}`}
                        active={selectGender === gender}
                        label={gender === "male" ? "남성" : "여성"}
                        onChange={() => {
                          field.onChange(gender);
                        }}
                        value={gender}
                      />
                    );
                  })}{" "}
                </div>
                <FormMessage />
              </CardContent>
            </Card>
          </>
        );
      }}
    />
  );
}
