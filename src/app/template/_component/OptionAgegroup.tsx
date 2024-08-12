import { useFormContext } from "react-hook-form";

export default function OptionAgeGroup() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const AgeGroups = [10, 20, 30, 40, 50, 60];

  return (
    <div>
      {AgeGroups.map((range) => {
        return (
          <label key={`ageGroup-${range}`}>
            <input
              type="radio"
              value={range}
              {...register("ageGroup", { required: "필수항목" })}
            />
            {range} 대
          </label>
        );
      })}
      {typeof errors.ageGroup?.message === "string" && (
        <span>{errors.ageGroup.message}</span>
      )}
    </div>
  );
}
