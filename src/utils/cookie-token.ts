"use client";
export class CookieToken {
  static getAccessToken() {
    if (typeof window !== "undefined") {
      const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
        const [name, value] = cookie.split("=");
        acc[name] = value;
        return acc;
      }, {} as Record<string, string>);

      return cookies["accessToken"];
    } else {
      return null;
    }
  }
}
