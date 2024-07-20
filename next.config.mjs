import path from "path";
import { fileURLToPath } from "url";

// ES에서는 __dirname를 지원하지 않기때문에 __dirname을 정의
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: false, // strict 모드
  images: {
    domains: ["www.h-creations.com"], // 내 포트폴리오
  },
  sassOptions: {
    // 이거 이제 루트경로됨
    includePaths: [path.join(__dirname, "src/styles")],

    // 전역적으로 반영된거임
    prependData: `@import "@/styles/_var.scss";`,
  },
};

export default nextConfig;
