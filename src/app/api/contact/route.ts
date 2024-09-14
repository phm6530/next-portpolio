import myMail from "@/app/config/mailConfig";
import { ApiError } from "@/app/lib/apiErrorHandler";
import { withRequest } from "@/app/lib/helperServer";
import dayjs from "dayjs";
import { NextRequest } from "next/server";

dayjs.locale("ko");

export async function POST(req: NextRequest) {
  const { name, digit, textarea } = await req.json();
  return withRequest(async () => {
    try {
      const mailForm = {
        from: process.env.MAIL_ID,
        to: process.env.MAIL_ID,
        subject: "[Project-D] 문의메일",
        html: `
        <h1>문의사항</h1>
        <br><br>
        <p>이름 : ${name}</p>
        <p>연락처 : ${digit} </p>
        <p>${textarea}</p>
        <br>

        <p style="font-size:12px; opacity : .7;">
        보낸날짜 : ${dayjs().toString()}      </p>
      `,
      };

      const test = await myMail.sendMail(mailForm);

      return { message: "success" };
    } catch (error) {
      throw new ApiError("이메일 전송 실패..", 401);
    }
  });
}
