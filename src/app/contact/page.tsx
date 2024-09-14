"use client";

import Grid from "@/app/_components/ui/Grid";
import classes from "./contact.module.scss";
import { FormProvider, useForm } from "react-hook-form";
import TextInput from "@/app/_components/ui/FormElement/TextInput";
import TextArea from "@/app/_components/ui/FormElement/TextArea";
import Button from "@/app/_components/ui/button/Button";
import FormRegisterError from "@/app/_components/Error/FormRegisterError";
import { useMutation } from "@tanstack/react-query";
import { withFetch } from "@/app/lib/helperClient";
import BackDrop from "@/app/_components/modal/BackDrop";
import LoadingCircle from "@/app/_components/animation/LoadingCircle";

type MailFormData = {
  name: string;
  digit: string;
  textarea: string;
};

export default function Page() {
  const formMethod = useForm<MailFormData>();
  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = formMethod;

  const { mutate, isPending } = useMutation<void, Error, MailFormData>({
    mutationFn: (data) =>
      withFetch(async () => {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/contact`;
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
            메일 보내는중..
            <LoadingCircle />
          </div>
        </>
      )}

      <Grid.smallCenter>
        <div className={classes.contactVanner}>문의하기</div>
        <form
          className={classes.mailForm}
          onSubmit={handleSubmit(submitHandler)}
        >
          <h2>문의</h2>
          <FormProvider {...formMethod}>
            <TextInput
              placeholder={"이름"}
              inputName="name"
              errorMsg="보내시는 분의 성함을 기재해주세요."
            />
            <TextInput
              placeholder={"회신 받으실 이메일이나 핸드폰번호를 기재해주세요."}
              inputName="digit"
              errorMsg="회신 받으실 이메일이나 핸드폰번호를 기재해주세요."
            />
            <label htmlFor="">문의 내용</label>
            <TextArea
              placeholder={
                "문의하실 내용을 기재해주세요. 최소 10글자 부탁드려요"
              }
              inputName="textarea"
              errorMsg="문의 내용은 필수입니다."
              className={classes.textarea}
            />
          </FormProvider>
          <div style={{ textAlign: "center" }}>
            <Button.solid disabled={isPending} style={{ marginLeft: "auto" }}>
              보내기
            </Button.solid>
          </div>
        </form>
        <FormRegisterError
          errorMsg={Object.values(errors)[0]?.message as string}
        />
      </Grid.smallCenter>
    </>
  );
}
