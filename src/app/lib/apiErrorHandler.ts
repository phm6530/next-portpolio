import { NextResponse } from "next/server";

export class ApiError extends Error {
  status: number;

  constructor(msg: string, status: number) {
    super(msg);
    this.status = status;
  }
}

export const apiErrorhandler = (error: unknown) => {
  if (error instanceof ApiError) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status }
    );
  } else {
    return NextResponse.json({ message: "알 수 없는 에러" }, { status: 500 });
  }
};
