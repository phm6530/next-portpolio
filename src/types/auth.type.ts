//user Role
export enum USER_ROLE {
  ADMIN = "admin",
  USER = "user",
  ANONYMOUS = "anonymous",
}

//UserData
export type User = {
  createAt: string;
  email: string;
  id: number;
  nickname: string;
  role: USER_ROLE;
};
