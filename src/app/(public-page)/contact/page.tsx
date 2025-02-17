"use client";
import Grid from "@/components/ui/Grid";
import classes from "./contact.module.scss";
import { FormProvider, useForm } from "react-hook-form";
import FormInput from "@/components/ui/FormElement/FormInput";
import Button from "@/components/ui/button/Button";
import { useMutation } from "@tanstack/react-query";
import { withFetch } from "@/util/clientUtil";
import BackDrop from "@/components/modal/BackDrop";
import LoadingCircle from "@/components/animation/LoadingCircle";
import { ENV_NESTBASE_URL } from "@/config/base";
import FormTextarea from "@/components/ui/FormElement/FormTextarea";
import SecondaryMessageBox from "@/app/(protected-page)/(template-made)/components/Header/SecondaryMessageBox";

type MailFormData = {
  name: string;
  digit: string;
  textarea: string;
};
export default function Page() {
  const formMethod = useForm<MailFormData>();

  const { handleSubmit, reset, register } = formMethod;

  const { mutate, isPending } = useMutation<void, Error, MailFormData>({
    mutationFn: (data) =>
      withFetch(async () => {
        const url = `${ENV_NESTBASE_URL}/contact`;

        console.log(url);
        return fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      }),
    onSuccess: () => reset(),
  });

  const submitHandler = async (data: MailFormData) => {
    mutate(data);
  };

  return (
    <>
      {isPending && (
        <>
          <BackDrop />
          <div className={classes.mail}>
            <div>test</div>
            dfsafdjss 메일 보내는중..
            <LoadingCircle />
          </div>
        </>
      )}
      <Grid.smallCenter>
        <SecondaryMessageBox title={"궁금한 점이 있으신가요?"} />

        <form
          className={classes.mailForm}
          onSubmit={handleSubmit(submitHandler)}
        >
          <FormProvider {...formMethod}>
            <FormInput
              type="text"
              placeholder="이름"
              {...register("name", {
                required: "보내시는 분의 성함을 기재해주세요.",
              })}
              inputName="name"
            />
            <FormInput
              type="text"
              placeholder="회신 받으실 이메일이나 핸드폰번호를 기재해주세요"
              {...register("digit", {
                required: "회신 받으실 이메일이나 핸드폰번호를 기재해주세요.",
              })}
              inputName="digit"
            />

            {/* <FormTextarea
              placeholder="textarea"
              {...register("textarea", {
                required: "문의 내용은 필수입니다.",
                minLength: {
                  value: 10,
                  message: "최소 10글자 적어주세요",
                },
              })}
              textareaName="textarea"
              className={classes.textarea}
            /> */}
          </FormProvider>
          <div style={{ textAlign: "center" }}>
            <Button.submit
              type="submit"
              disabled={isPending}
              style={{ marginLeft: "auto" }}
            >
              보내기
            </Button.submit>
          </div>
        </form>
      </Grid.smallCenter>
    </>
  );
}
