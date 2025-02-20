"use client";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CategoriesKey, CategoriesValues } from "@/types/board";
import { QUERY_KEY } from "@/types/constans";
import { User } from "@/types/auth.type";
import { useRouter } from "next/navigation";
import QuillEditor from "@/components/Editor/QuillEditor";

import { toast } from "react-toastify";
import InputField from "@/components/shared/inputs/input-field";
import PasswordInputField from "@/components/shared/inputs/input-password-field";
import { Button } from "@/components/ui/button";
import {
  baseSchema,
  anonymousSchema,
  boardWirteSchema,
} from "./board-write-schema";
import { BoardWirteAction } from "./board-wirte-action";

// User일땐 이것만 유저 유무는 쿠키로 보낼거니까
export type UnionBoardProps = z.infer<typeof boardWirteSchema>;

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

  const method = useForm<UnionBoardProps>({
    resolver: zodResolver(!!userData ? baseSchema : anonymousSchema),
    defaultValues: {
      title: "",
      contents: "",
      ...(!userData && { anonymous: "", password: "" }),
    },
  });

  const { mutate, isPending, isSuccess } = useMutation<
    unknown,
    Error,
    UnionBoardProps
  >({
    mutationFn: async (data) => {
      return await BoardWirteAction({
        boardKey,
        body: data,
        isMember: !!userData,
      });
    },

    onSuccess: () => {
      router.replace(`/community/${boardKey}`);
      queryClient.refetchQueries({
        queryKey: ["board"],
      });
      router.refresh();
      toast.success("게시물이 생성되었습니다.");
    },
  });

  const { handleSubmit } = method;

  const onSubmitHandler = (data: UnionBoardProps) => {
    mutate(data);
  };

  return (
    <FormProvider {...method}>
      <form
        className="flex flex-col gap-8 mt-7 "
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        {!userData && (
          <div className="flex gap-5 [&>div]:flex-1">
            <>
              <InputField
                name="anonymous"
                label="글쓴이"
                placeholder="2글자 이상 입력해주세요."
              />

              <PasswordInputField label="비밀번호" />
            </>
          </div>
        )}
        <InputField
          name="title"
          label="글 제목"
          placeholder="글 제목을 입력해주세요."
        />
        <div>
          {/* Quill Editor */}
          <QuillEditor name={"contents"} />
        </div>

        <Button className="p-8" disabled={isPending || isSuccess}>
          글쓰기
        </Button>
      </form>
    </FormProvider>
  );
}
