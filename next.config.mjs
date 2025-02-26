import path from "path";
import { fileURLToPath } from "url";

// ES에서는 __dirname를 지원하지 않기때문에 __dirname을 정의
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // strict 모드
  eslint: {
    ignoreDuringBuilds: true, // Vercel에서 ESLint 검사 무시
  },
  images: {
    domains: [
      "www.h-creations.com",
      "pixabay.com",
      "localhost", // dev
      "images.unsplash.com",
      "hnfcmdvepwcpcxxwavim.supabase.co",
    ], // 내 포트폴리오
  },

  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  webpack(config) {
    // SVG 파일을 React 컴포넌트로 사용할 수 있도록 설정
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            // 추가 옵션 설정 가능 (예: svgo, titleProp 등)
            svgo: false, // SVGO 사용하지 않도록 설정
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
