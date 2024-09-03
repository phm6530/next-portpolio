# SURVEY Portpolio

설문조사 웹 플랫폼 포트폴리오입니다.

목표기능

- 인증 인가 된 사용자는 설문조사 생성가능,
- Admin Page에서 유입 확인

# PACKAGE

- Client
  npm i react-hook-form<br>
  npm i zod @hookform/resolvers<br>
  npm i @tanstack@query<br>
  npm i axios<br>
  npm i sass<br>
  npm i dayjs<br>
  npm i zustand

  - template_key 공유에 사용<br>
    npm install @svgr/webpack --save-dev Svg 사용

- Server
  npm i next-auth<br>
  npm i mysql2<br>
  npm i @types/multer & multer<br>
  npm install nodemailer <br><br>
- 암호화
  npm install bcrypt<br>
  npm install @types/bcrypt --save-dev

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
