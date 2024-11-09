type Token = string;

export class SessionStorage {
  static setAccessToken(token: Token) {
    sessionStorage.setItem("accessToken", token);
  }

  static getAccessToken() {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("accessToken");
    }
    return null;
  }

  static removeAccessToken() {
    sessionStorage.removeItem("accessToken");
  }
}
