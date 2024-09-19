import { NextResponse } from "next/server";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export const apiErrorHandler = (error: unknown) => {
  if (error instanceof ApiError) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status }
    );
  }

  if (error instanceof Error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } else {
    return NextResponse.json({ message: "알 수 없는 에러" }, { status: 500 });
  }
};
