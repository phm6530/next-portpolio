import { ApiError } from "@/app/lib/apiErrorHandler";
import { withRequest } from "@/app/lib/helperServer";
import { authMail } from "@/app/lib/nodeMailer";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return withRequest<{ message: string }>(async () => {
    const { pin, userEmail } = await req.json();

    console.log(pin, userEmail);

    if (!pin || !userEmail) {
      new ApiError("필수 정보가 누락되었습니다.", 401);
    }
    await authMail({ to: userEmail, pin });
    return { message: "success" };
  });
}
