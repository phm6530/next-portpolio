type Token = string;

export class TokenLocalStorage {
  static setAccessToken(token: Token) {
    localStorage.setItem("accessToken", token);
  }

  static getAccessToken() {
    if (typeof window !== "undefined") {
      return localStorage.getItem("accessToken");
    }
    return null;
  }

  static removeAcessTken() {
    localStorage.removeItem("accessToken");
  }
}
// redirectPath
