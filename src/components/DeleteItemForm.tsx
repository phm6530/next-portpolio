import { FormProvider, useForm } from "react-hook-form";
import FormInput from "./ui/FormElement/FormInput";
import FormToolButton from "@/app/(protected-page)/(template-made)/components/FormToolButton";
import classes from "./DeleteItemForm.module.scss";
import Password from "/public/asset/icon/password.svg";

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
      <div className={classes.passwordHeader}>
        <div>
          <Password />
        </div>

        <h3 className={classes.title}>비밀번호를 입력해주세요</h3>
      </div>

      <div className={classes.inputWrapper}>
        <FormInput
          {...register("password", { required: "필수항목 입니다." })}
          autoComplete="off"
          placeholder="비밀번호를 입력해주세요."
          type="password"
        />
        <FormToolButton
          clickEvent={handleSubmit(clickEvent)}
          disabled={isPending}
          className={classes.buttonWidth}
        >
          삭제
        </FormToolButton>
      </div>
    </FormProvider>
  );
}
