export type user_role = "admin" | "user" | "anonymous";

// Msg_user
export type userProps = {
  username: string;
  userId?: string | null;
  role: user_role;
};
