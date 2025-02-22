"use client";
import FormInput from "@/components/ui/FormElement/FormInput";
import FormTextarea from "@/components/ui/FormElement/FormTextarea";
import { FormProvider, useForm } from "react-hook-form";
import classes from "./BoardForm.module.scss";
import Button from "@/components/ui/button/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CategoriesKey, CategoriesValues } from "@/types/board";
import InputWrapper from "@/components/ui/InputWrapper/InputWrapper";
import { QUERY_KEY } from "@/types/constans";
import { User } from "@/types/auth.type";
import { withFetch } from "@/util/clientUtil";
import { BASE_NEST_URL, BASE_NEXT_API } from "@/config/base";
import { useRouter } from "next/navigation";
import QuillEditor from "@/components/Editor/QuillEditor";
import revaildateTags from "@/lib/revaildateTags";
import { toast } from "react-toastify";

// User일땐 이것만 유저 유무는 쿠키로 보낼거니까
const baseScheme = z.object({
  title: z.string().min(1, "제목은 필수 항목입니다."),
  contents: z.string().min(1, "내용은 필수 항목입니다."),
});

// 익명일 때
const guestSchema = baseScheme.extend({
  anonymous: z
    .string()
    .min(2, "글쓴이는 최소 2글자 이상이여야 합니다")
    .optional(),
  password: z
    .string()
    .min(4, "비밀번호는 최소 4자리 이상이어야 합니다.")
    .optional(),
});

export type WriteBoardProps = z.infer<typeof guestSchema>;

export default function BoardForm({
  boardKey,
}: {
  boardKey: CategoriesKey;
  searchParams?: string;
  boardName: CategoriesValues;
}) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const userData: User | null =
    queryClient.getQueryData([QUERY_KEY.USER_DATA]) ?? null;

  const method = useForm<WriteBoardProps>({
    resolver: zodResolver(userData ? baseScheme : guestSchema),
  });

  const { mutate } = useMutation<unknown, Error, WriteBoardProps>({
    mutationFn: async (data) => {
      return await withFetch(async () => {
        let options: RequestInit = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        };

        if (!!userData) {
          options = {
            ...options,
            credentials: "include",
          };
        }
        const datas = await fetch(
          `${BASE_NEST_URL}/board/${boardKey}`,
          options
        );
        await revaildateTags({
          tags: [`community-${boardKey}`],
        });
        return datas;
      });
    },

    onSuccess: () => {
      console.log(boardKey);
      router.replace(`/community/${boardKey}`);
      router.refresh();
      toast.success("게시물이 생성되었습니다.");
    },
  });

  const { register, handleSubmit } = method;

  const onSubmitHandler = (data: WriteBoardProps) => {
    mutate(data);
  };

  return (
    <FormProvider {...method}>
      <form
        className={classes.formContainer}
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        {!userData && (
          <div className={classes.guestIdenty}>
            <>
              <InputWrapper title="글쓴이">
                <FormInput
                  placeholder="아이디를 입력해주세요"
                  {...register("anonymous")}
                  autoComplete="off"
                />
              </InputWrapper>

              <InputWrapper title="글 비밀번호">
                <FormInput
                  type="password"
                  placeholder="아이디를 입력해주세요"
                  {...register("password")}
                  autoComplete="off"
                  data-lpignore="true"
                />
              </InputWrapper>
            </>
          </div>
        )}

        <div>
          <InputWrapper title="제목">
            <FormInput
              placeholder="글 제목을 입력해주세요"
              {...register("title")}
              autoComplete="off"
            />

            {/* Quill Editor */}
            <QuillEditor name={"contents"} />
          </InputWrapper>
        </div>
        <Button.submit>글쓰기</Button.submit>
      </form>
    </FormProvider>
  );
}
