import { BASE_NEST_URL } from "@/config/base";

export default async function ImageUploadHandler(endPoint: string, file: File) {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const allowedTypes = ["image/jpg", "image/jpeg", "image/png", "image/gif"]; // 허용된 이미지 MIME 타입들
    if (!allowedTypes.includes(file.type)) {
      throw new Error("이미지 형식을 확인해주세요.");
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("5MB넘는 파일입니다.");
      return;
    }

    const response = await fetch(`${BASE_NEST_URL}/${endPoint}`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorMsg = await response.json();
      throw new Error(errorMsg.message);
    }

    return (await response.json()) as { supabase_storage_imgurl: string };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "업로드 실패하였습니다.");
    } else {
      throw new Error("알수 없는 에러입니다.");
    }
  }
}
