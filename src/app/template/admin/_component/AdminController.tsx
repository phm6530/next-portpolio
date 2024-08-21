"use client";

export default function AdminController({
  user,
  curTemplateKey,
}: {
  user:
    | {
        access_email: string;
        template_key: string;
        role: "anonymous";
      }
    | {
        user_id: string;
        user_name: string;
        user_nickname: string;
        role: "admin";
      };
  curTemplateKey: string;
}) {
  const isTemplateAuth =
    (user.role === "anonymous" && curTemplateKey === user.template_key) ||
    user.role === "admin";

  console.log(isTemplateAuth);

  return (
    <>
      <h1>안녕하세요</h1>
      {user.role === "anonymous" && `${user.access_email} 님`}
      {user.role === "admin" && `${user.user_id} 님`}
      <button>삭제</button>
      <button>수정</button>
    </>
  );
}
