import { FormProvider, useForm } from "react-hook-form";
import FormInput from "./ui/FormElement/FormInput";
import FormToolButton from "@/app/(protected-page)/(template-made)/components/FormToolButton";
import Password from "/public/asset/icon/password.svg";
import { Button } from "./ui/button";
import InputField from "./shared/inputs/input-field";
import PasswordInputField from "./shared/inputs/input-password-field";

export default function DeleteItemForm({
  action,
  isPending,
}: {
  action: (password: string) => void;
  isPending: boolean;
}) {
  const methods = useForm<{ password: string }>();

  const { register, handleSubmit } = methods;
  const clickEvent = (e: { password: string }) => {
    action(e.password);
  };

  return (
    <FormProvider {...methods}>
      <div className="w-full mt-4 mb-4">
        <PasswordInputField />
        <button type="submit">test</button>
      </div>
    </FormProvider>
  );
}
