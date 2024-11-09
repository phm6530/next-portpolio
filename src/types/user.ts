export type user_role = "admin" | "user" | "anonymous";

export enum GENDER_GROUP {
  FEMALE = "female",
  MALE = "male",
}

// Msg_user
export type userProps = {
  username: string;
  userId?: string | null;
  role: user_role;
};
