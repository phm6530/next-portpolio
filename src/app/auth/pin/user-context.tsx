import { createContext, ReactNode, useState } from "react";

type EmailContext = {
  userEmail: string;
  setUserEmail: (email: string) => void;
  resetUserEmail: () => void;
};

export const UserEmailContext = createContext<EmailContext>({
  userEmail: "",
  setUserEmail: (email) => {},
  resetUserEmail: () => {},
});

export default function UserEmailProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [email, setEmail] = useState<string>("");

  const setUserEmail = (mail: string) => {
    setEmail(mail);
  };

  const resetUserEmail = () => {
    setEmail("");
  };

  return (
    <UserEmailContext.Provider
      value={{ userEmail: email, setUserEmail, resetUserEmail }}
    >
      {children}
    </UserEmailContext.Provider>
  );
}
