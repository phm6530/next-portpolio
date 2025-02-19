import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import classes from "./BooleanGroup.module.scss";

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
    <div className={classes.booleanContainer}>
      <div className={classes.header}>
        {label} <span>{description}</span>
      </div>
      <div>
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
                      className={`${
                        field.value === value ? classes.active : undefined
                      }`}
                    >
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
      </div>{" "}
      {/* <p className={classes.description}>{description}</p> */}
    </div>
  );
}
