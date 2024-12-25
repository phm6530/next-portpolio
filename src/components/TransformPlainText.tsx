"use client";

import * as cheerio from "cheerio";

// 서버에서 추출 가능하도록 변형
export default function TransformPlainText({ html }: { html: string }) {
  const $ = cheerio.load(html); // HTML 로드
  const plainText = $.text(); // 텍스트만 추출
  return <>{plainText}</>;
}
