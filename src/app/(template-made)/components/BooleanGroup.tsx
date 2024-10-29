import RadioWrap from "@/components/ui/RadioWrap";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

export default function BooleanGroup<T extends FieldValues>({
  groupName,
  label,
  description,
}: {
  groupName: Path<T>;
  label: string;
  description?: string;
}) {
  const { control } = useFormContext<T>();

  return (
    <RadioWrap>
      {label}
      <Controller
        name={groupName}
        control={control}
        render={({ field }) => {
          return (
            <>
              {[true, false].map((value, idx) => {
                return (
                  <label key={`boolean-${idx}`}>
                    <input
                      type="radio"
                      onChange={() => field.onChange(value)}
                      checked={field.value === value}
                    />
                    {value === true ? "예" : "아니오"}
                  </label>
                );
              })}
            </>
          );
        }}
      />
      <p>{description}</p>
    </RadioWrap>
  );
}
