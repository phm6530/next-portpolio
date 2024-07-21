"use client";

import { signIn, useSession, SignInResponse } from "next-auth/react";
import { FormEvent, useState, useEffect } from "react";

export default function LoginPage() {
  const [error, setError] = useState<string>("");
  const { data: session, status } = useSession(); // 세션 상태를 가져옴

  console.log(session);

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    try {
      const res = (await signIn("credentials", {
        redirect: false,
        username,
        password,
      })) as SignInResponse;

      if (res?.error) {
        setError("Invalid username or password.");
      } else if (res?.ok) {
        console.log("Login successful");

        // 로그인 후 메인 페이지로 리디렉션
        window.location.href = "/";
      } else {
        setError("An unexpected error occurred.");
      }
    } catch (err) {
      setError("An error occurred while attempting to log in.");
    }
  };

  return (
    <div>
      <h1>Login</h1>
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
    </div>
  );
}
