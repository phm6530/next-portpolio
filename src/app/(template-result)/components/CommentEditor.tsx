"use client";

import { FormProvider, useForm } from "react-hook-form";
import classes from "./CommentEditor.module.scss";
import FormInput from "@/components/ui/FormElement/FormInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import CommentTextArea from "@/components/Comment/CommentTextArea";
import { QUERY_KEY } from "@/types/constans";
import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { User } from "@/types/auth.type";
import withAuthFetch from "@/utils/withAuthFetch";
import { COMMENT_EDITOR_TYPE, COMMENT_NEED_PATH } from "@/types/comment.type";
import { useParams, useRouter } from "next/navigation";
import revaildateTags from "@/lib/revaildateTags";
import { CategoriesKey } from "@/types/board";
import { CommentEditorContext } from "@/context/context";

//익명은 Password도 받음
type AnonymousDefaultValue = {
  anonymous: string; //닉네임
  password: string;
  content: string;
};

//로그인 유저는 ID만 받음
type AuthUserDefaultValue = {
  userId: number | null;
  content: string;
};

/**
 * Editor Type = Comment / Reply 유니온
 * Comment Id = Reply가 의존
 * parentType , parentId = Comment Id가 의존
 */
export default function CommentEditor({
  editorType,
  parentsType,
  parentsId,
  commentId,
  setTouch,
  category,
}: {
  editorType: COMMENT_EDITOR_TYPE;
  parentsType?: COMMENT_NEED_PATH;
  parentsId?: string;
  setTouch?: Dispatch<SetStateAction<number | null>>;
  commentId?: number;
  category?: CategoriesKey;
}) {
  const queryclient = useQueryClient();
  const userData = queryclient.getQueryData([QUERY_KEY.USER_DATA]) as User;

  const { section } = useContext(CommentEditorContext);
  console.log("section::", section);
  const params = useParams();
  const router = useRouter();

  const AnonymousValues: AnonymousDefaultValue = {
    anonymous: "",
    password: "",
    content: "",
  };

  const AuthUserValues: AuthUserDefaultValue = {
    userId: userData?.id ?? null,
    content: "",
  };

  const defaultValues = userData ? AuthUserValues : AnonymousValues;

  type DefaultValues<T> = T extends number
    ? AuthUserDefaultValue
    : AnonymousDefaultValue;

  const formMethod = useForm<DefaultValues<typeof userData>>({
    defaultValues,
  });

  //전역 인스턴스
  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = formMethod;

  useEffect(() => {
    reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const errorArr = Object.values(errors);
  const errorMessage = errorArr[0]?.message;

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      // 분기 Url 생성..
      const url = (() => {
        switch (editorType) {
          case COMMENT_EDITOR_TYPE.COMMENT:
            return `comment/${section}/${parentsId}`;
          case COMMENT_EDITOR_TYPE.REPLY:
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
          `comment-${section}-${params.id}`,
          ...(category ? [`${section}-${category}`] : []),
        ],
      });
      return req;
    },
    onSuccess: async () => {
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
    <form
      onSubmit={handleSubmit(submitHandler)}
      className={classes.commentForm}
    >
      <FormProvider {...formMethod}>
        <>
          {!userData && (
            <>
              <FormInput
                type="text"
                placeholder="이름"
                autoComplete="off"
                notErrorText={true}
                {...register("anonymous", {
                  required: "이름은 필수입니다.",
                  minLength: {
                    value: 2,
                    message: "이름은 최소 2글자로 설정해주세요",
                  },
                })}
              />
              <FormInput
                type="password"
                notErrorText={true}
                {...register("password", {
                  required: "비밀번호는 필수입니다.",
                  minLength: {
                    value: 4,
                    message: "비밀번호는 최소 4글자로 설정해주세요",
                  },
                })}
                placeholder="password"
                autoComplete="new-password"
              />
            </>
          )}
        </>

        <div className={classes.textareaWrap}>
          {/* OnChange 랜더링 방지하기위해 따로 분리함 */}
          <CommentTextArea name={"content"}>
            <div className={classes.errorDiv}>
              {typeof errorMessage === "string" ? `! ${errorMessage}` : null}
            </div>
          </CommentTextArea>

          <button
            type="submit"
            className={classes.submitBtn}
            disabled={isPending}
          >
            댓글 작성
          </button>
        </div>
      </FormProvider>
    </form>
  );
}
