import InputTypeStyle from "@/app/template/_component/InputTypeStyle";
import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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
                      <FormItem key={`key-${gender}`}>
                        <FormControl>
                          <InputTypeStyle.RadioAnswer
                            key={`gender-${gender}`}
                            selectId={selectGender}
                            curid={gender}
                          >
                            <input
                              type="radio"
                              className="hidden"
                              {...field}
                              value={gender}
                              checked={field.value === gender}
                            />
                            {gender === "male" ? "남" : "여"}
                          </InputTypeStyle.RadioAnswer>
                        </FormControl>{" "}
                      </FormItem>
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
