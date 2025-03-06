import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

export default function RadioBooleanField<T extends FieldValues>({
  groupName,
  label,
  description,
}: {
  groupName: Path<T>;
  label?: string;
  description?: string;
}) {
  const { control } = useFormContext<T>();

  return (
    <div className="flex flex-col">
      <div>
        {label} <span>{description}</span>
      </div>
      <div className="flex gap-2">
        <Controller
          name={groupName}
          control={control}
          render={({ field }) => {
            return (
              <>
                {[true, false].map((value, idx) => {
                  return (
                    <label
                      key={`boolean-${idx}`}
                      className={cn(
                        "cursor-pointer border-input min-w-20 text-center border px-4 py-3 rounded-lg",
                        field.value === value &&
                          "text-point border-point border"
                      )}
                    >
                      <input
                        className="hidden"
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
      </div>{" "}
    </div>
  );
}
