# SURVEY Portpolio

설문조사 웹 플랫폼 포트폴리오입니다.

목표기능

- 인증 인가 된 사용자는 설문조사 생성가능,
- Admin Page에서 유입 확인

# PACKAGE

### Client

```bash
npm i react-hook-form
npm i zod @hookform/resolvers
npm i @tanstack/query
npm i axios
npm i sass
npm i dayjs
npm i zustand
```

save-dev Svg 사용

```bash
  npm install @svgr/webpack
```

- Server

```bash
  npm i next-auth
  npm i mysql2
  npm i @types/multer , multer
  npm install nodemailer
```

- 암호화

```bash
  npm install bcrypt
  npm install @types/bcrypt --save-dev
```

# 진척도

7/30 ~ 8/4

- next-Auth 이용한 admin + 사용자 OAuth2 인증
- mysql2 트랜잭션 추상화 로직 생성
- RQ + SSR hydurateboundary 로직 확인
- 1차 기획
- figma 시안
- 권한생성

~ 8/5

- Default 템플릿 생성 FRONT 로직 생성
- ImgUploader 기능

~8/6

- 임시저장 기능완료
- \*survey Default + List + Detail 관계 DB 설계

--미완성

- 1안 템플릿 생성 및 관계 DB 설계

~ 8/11

- Image
- form 제출
- 결과페이지

  ~ 8/13

- 결과페이지 댓글 + 대댓글
- Admin Page 기획
- 템플릿 생성 프로세스 확립
  > 생성 -> 폼작성 -> email 인증 -> 생성

~ 8/17

- Ui 기능 확인
- 퍼블리싱 + 디자인 수정
- 서브도메인 생성 배포포하기

~ 9/10

- 최종 완료 목표

```

```
