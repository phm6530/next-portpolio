"use client";
import { TokenLocalStorage } from "@/utils/localstorage-token";
import { ComponentType, useEffect } from "react";

export default function WithRedirect<T extends object>(Component: ComponentType<T>) {
  return function RedirectComponent(props: T) {
    const token = TokenLocalStorage.getAccessToken();
    console.log(token);
    return (
      <>
        <Component {...props} />
      </>
    );
  };
}
