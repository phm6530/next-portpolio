import { ApiError } from "@/app/lib/apiErrorHandler";
import { TemplateProps } from "@/types/template";
import { AddSurveyFormProps } from "@/types/templateSurvey";
import nodemailer from "nodemailer";

const myMail = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  auth: {
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PASSWORD,
  },
});

export const authMail = async ({ to, pin }: { to: string; pin: string }) => {
  try {
    // 이메일 옵션 정의
    const mailOptions = {
      from: process.env.MAIL_ID, // 발신자 이메일 주소
      to, // 수신자 이메일 주소
      subject: `[설문조사] 인증번호 발송`,
      html: `
        
        <p>아래 인증번호를 기재해주세요</p>

        <br><br>
        인증번호
        <h1>${pin}</h1>
        <br><br>

        <p>해당 인증번호는 단순 개설 및 관리를 위한 고유번호 입니다.</p>
        <p style="font-size:12px; opacity : .7;">*해당 고유번호는 이벤트 삭제 시 폐기됩니다.</p>
        <p style="font-size:12px; opacity : .7;">
            초기 이메일 발송 이후엔 익명사용자나 관리자에게 어떠한 정보도 묻지 않습니다.
        </p>
        <br><br>
        문의사항 : squirrel309@naver.com
      `,
    };

    // 이메일 전송
    await myMail.sendMail(mailOptions);
  } catch (error) {
    throw new ApiError("이메일 전송 실패..", 401);
  }
};

export const sendEmail = async (
  to: string,
  template_key: string,
  title: string,
  anonymouseId: number,
  template: TemplateProps,
  pin: AddSurveyFormProps["access_pin"]
) => {
  try {
    const adminUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/template/admin/${template_key}`;
    const currentUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/template/${template}/${anonymouseId}`;

    // 이메일 옵션 정의
    const mailOptions = {
      from: process.env.MAIL_ID, // 발신자 이메일 주소
      to, // 수신자 이메일 주소
      subject: `[설문조사] ${title} 관리자 URL`, // 이메일 제목
      html: `
        [설문조사] ${title} <br>
        <p>아래 링크를 클릭하여 설문조사를 관리할 수 있습니다:</p>

        관리자 페이지 URL : <a href="${adminUrl}">바로가기<a/><br>
        이벤트 페이지 URL : <a href="${currentUrl}">바로가기</a><br><br>
        관리자 고유번호 : <h1>${pin}</h1> <br><br><br>
        <p style="font-size:12px; opacity : .7;">*해당 고유번호는 이벤트 삭제 시 폐기됩니다.</p>
        <p style="font-size:12px; opacity : .7;">
            초기 이메일 발송 이후엔 익명사용자나 관리자에게 어떠한 정보도 묻지 않습니다.
        </p>
        <br><br>
        문의사항 : squirrel309@naver.com
      `,
    };

    // 이메일 전송
    const info = await myMail.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.log(error);
    throw new ApiError("이메일 전송 실패..", 401);
  }
};
