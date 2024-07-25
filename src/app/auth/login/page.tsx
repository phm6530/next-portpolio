"use client";

import { signIn, SignInResponse } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const params = useSearchParams();

  const test = params.get("redirect");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = (await signIn("credentials", {
      redirect: false,
      username,
      password,
    })) as SignInResponse;

    if (response.ok) {
      // 로그인 성공, 세션이 설정됨
      const redirectUrl = test || "/";
      router.push(redirectUrl as string);
    } else {
      // 로그인 실패, 에러 처리
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
