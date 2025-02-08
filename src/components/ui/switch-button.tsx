import { useFormContext } from "react-hook-form";
import classes from "./switch-button.module.scss";

export default function SwitchButton({
  default: initialValue = false,
  name,
  label,
}: {
  default?: boolean;
  name: string;
  label: string;
}) {
  const { register } = useFormContext();

  return (
    <label>
      <input type="checkbox" {...register(name)} />
      <span>{label}</span>
    </label>
  );
}
