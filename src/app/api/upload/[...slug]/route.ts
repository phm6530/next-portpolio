import { apiErrorHandler } from "@/util/apiErrorHandler";
import { PathSegments } from "@/types/upload";
import { NextRequest, NextResponse } from "next/server";

import fs from "fs/promises"; // fs/promises 사용
import path from "path";

export async function POST(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      slug: [PathSegments.ThumbNail | PathSegments.ThumbNail, string, string];
    };
  }
) {
  const [template_type, templateKey] = params.slug;

  try {
    const formData = await req.formData();
    const image = formData.get("image");

    // 타입 좁히기
    if (image instanceof File) {
      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // 확장자 추출
      const ext = path.extname(image.name);
      const dateString = new Date().toISOString().replace(/:/g, "_");

      // 파일 시스템 경로
      const saveDir = path.join(
        process.cwd(),
        "public",
        PathSegments.Upload,
        template_type,
        templateKey // template Key
      );
      const savePath = path.join(saveDir, `${dateString}${ext}`);

      // 디렉토리 생성
      await fs.mkdir(saveDir, { recursive: true });

      // 파일 쓰기
      await fs.writeFile(savePath, buffer);

      // 클라이언트에 제공할 URL
      const imgUrl = `/${PathSegments.Upload}/${template_type}/${templateKey}/${dateString}${ext}`;
      return NextResponse.json({ imgUrl });
    }
  } catch (err) {
    if (err instanceof Error) return apiErrorHandler(err.message);
  }

  // 요청에서 이미지가 없을 때 응답
  return NextResponse.json({ message: "No image provided" });
}
