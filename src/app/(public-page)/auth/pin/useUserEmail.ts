import { useContext } from "react";
import { UserEmailContext } from "./user-context";

export const useUserEmail = () => {
  const ctx = useContext(UserEmailContext);
  return ctx;
};
