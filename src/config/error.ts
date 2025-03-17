export class HttpError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.name = "HttpError";
    this.statusCode = statusCode;

    // 프로토타입 체인 설정을 위한 처리 (TypeScript에서 사용 시 필요)
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}
