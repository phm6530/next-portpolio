export const imgUploader = async (
  file: File,
  { template_key, surveyIdx }: { template_key: string; surveyIdx: number }
): Promise<string | undefined> => {
  const formData = new FormData();
  formData.append("image", file);

  const allowedTypes = ["image/jpeg", "image/png", "image/gif"]; // 허용된 이미지 MIME 타입들
  if (!allowedTypes.includes(file.type)) {
    alert("이미지가 아닌거같음");
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    alert("5MB넘는 파일입니다.");
    return;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/upload/survey/${template_key}/${surveyIdx}`,
    {
      method: "POST",
      body: formData,
    }
  );
  const { imgUrl }: { imgUrl: string } = await response.json();
  return imgUrl;
};
