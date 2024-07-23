"use client";

import { signIn, SignInResponse } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LoginForm({
  redirectPath = "/",
}: {
  redirectPath: string;
}) {
  const [error, setError] = useState<string>("");
  const { refresh, push } = useRouter();
  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    const res = (await signIn("credentials", {
      redirect: false,
      username,
      password,
    })) as SignInResponse;

    if (!res.error) {
      window.location.href = redirectPath;
      return;
    }
  };

  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <label>
          Username:
          <input type="text" name="username" />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </>
  );
}
