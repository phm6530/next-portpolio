//user Role
export enum USER_ROLE {
  ADMIN = "admin",
  user = "user",
}

//Sign In
export type SignIn = { email: string; password: string };

//register User
export type SignupUser = {
  nickname: string;
} & SignIn;
