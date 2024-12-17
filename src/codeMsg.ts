export enum ERROR_CODE {
  UNAUTHORIZED = "UNAUTHORIZED",
  AUTH_002 = "AUTH_002",
}

export const MSG: Record<(typeof ERROR_CODE)[keyof typeof ERROR_CODE], string> =
  {
    [ERROR_CODE.UNAUTHORIZED]: "해당 페이지는 회원분들만 접근 가능합니다.",
    [ERROR_CODE.AUTH_002]: "생성을 하기 위해서는 로그인이 필요합니다.",
  };
