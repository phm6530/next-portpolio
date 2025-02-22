"use client";

import { FormProvider, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/types/constans";
import { Dispatch, SetStateAction, useEffect } from "react";
import { User } from "@/types/auth.type";
import withAuthFetch from "@/utils/withAuthFetch";
import { COMMENT_EDITOR_MODE } from "@/types/comment.type";
import { useParams, useRouter } from "next/navigation";
import revaildateTags from "@/lib/revaildateTags";
import { CategoriesKey } from "@/types/board";
import InputField from "@/components/shared/inputs/input-field";
import PasswordInputField from "@/components/shared/inputs/input-password-field";
import Myprofile from "@/app/(protected-page)/mypage/_components/Myprofile";
import TextareaFormField from "@/components/ui/FormElement/textarea-form-field";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useCommentContext from "./hook/comment-context-hook";
import { UserMsgSchema, geustMsgSchema } from "./schema/message-schema";
import { toast } from "react-toastify";

/**
 * Editor Type = Comment / Reply 유니온
 * Comment Id = Reply가 의존
 * parentType , parentId = Comment Id가 의존
 */
export default function MessageForm({
  parentsId,
  commentId,
  setTouch,
  category,
}: {
  parentsId?: string;
  setTouch?: Dispatch<SetStateAction<number | null>>;
  commentId?: number;
  category?: CategoriesKey;
}) {
  const queryclient = useQueryClient();
  const userData = queryclient.getQueryData([QUERY_KEY.USER_DATA]) as User;
  const { EDITOR_MODE, EDITOR_PATH } = useCommentContext();

  const params = useParams();
  const router = useRouter();

  const dynamicSchema = !!userData ? UserMsgSchema : geustMsgSchema;

  const formMethod = useForm<z.infer<typeof dynamicSchema>>({
    defaultValues: {
      content: "",
      ...(!!userData
        ? {
            userId: userData.id,
          }
        : {
            password: "",
            anonymous: "",
          }),
    },
    resolver: zodResolver(dynamicSchema),
  });

  console.log(formMethod.formState.errors);

  //전역 인스턴스
  const { reset, handleSubmit } = formMethod;

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      // 분기 Url 생성..
      const url = (() => {
        switch (EDITOR_MODE) {
          case COMMENT_EDITOR_MODE.COMMENT:
            return `comment/${EDITOR_PATH}/${parentsId}`;
          case COMMENT_EDITOR_MODE.REPLY:
            return `reply/${commentId}`;
          default:
            return null as never;
        }
      })();

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      const req = await withAuthFetch(url, options);

      //cache initals
      await revaildateTags({
        tags: [
          `comment-${EDITOR_PATH}-${params.id}`,
          ...(category ? [`${EDITOR_PATH}-${category}`] : []),
        ],
      });
      return req;
    },
    onSuccess: async () => {
      toast.success("댓글을 작성하였습니다.");
      reset();
      router.refresh();

      // idx View Close
      if (setTouch) {
        setTouch(null); //답글창 닫기
      }
    },
  });

  const submitHandler = (data: any) => {
    mutate({ ...data });
  };

  return (
    <FormProvider {...formMethod}>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="grid grid-cols-[repeat(6,1fr)] gap-1"
      >
        {/* 로그인 한 유저는 필요없음  */}
        {!userData && (
          <>
            <div className="col-span-2">
              <InputField
                autoComplete="off"
                name="anonymous"
                placeholder="이름"
              />
            </div>
            <div className="col-span-2">
              <PasswordInputField className="col-span-1" />
            </div>
          </>
        )}
        <div className="col-span-5">
          <TextareaFormField
            name={"content"}
            placeholder="남기실 코멘트를 입력해주세요"
          />
        </div>

        <Button disabled={isPending} className="col-span-1 h-full">
          댓글 작성
        </Button>
      </form>
    </FormProvider>
  );
}
