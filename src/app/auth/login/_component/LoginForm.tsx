"use client";

import { signIn, SignInResponse } from "next-auth/react";
import { FormEvent, useState } from "react";

export default function LoginForm({
  redirectPath = "/",
}: {
  redirectPath: string;
}) {
  const [error, setError] = useState<string>("");

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
    } else {
      setError("비밀번호나 아이디가 일치하지 않습니다.");
    }
  };

  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <label>
          Username:
          <input type="text" name="username" autoComplete="off" />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" autoComplete="off" />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </>
  );
}
