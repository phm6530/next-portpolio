# survey Portpolio

설문조사 웹 플렛폼 포트폴리오입니다.

목표기능

- 인증 인가 된 사용자는 설문조사 생성가능,
- Admin Page에서 유입 확인

# 사용 패키지

- Client
  npm install react-hook-form<br>
  npm install @tanstack@query<br>
  npm install axios<br>
  npm install sass

- Servey
  npm install next-auth<br>
  npm install mysql2

# 진행

~ 7/30

- next-Auth 이용한 admin + 사용자 OAuth2 인증
- mysql2 트랜잭션 추상화 로직 생성
- RQ + SSR hydurateboundary 로직 확인

~ 8/7

- 1차 기획
- figma 시안
- 권한생성
- 템플릿 생성 form 및 관계 DB 설계
- Admin Page 기획

~ 8/11

- 댓글 + 대댓글
- 차트 라이브러리 없이 GSAP로 Chart 생성하기

- 템플릿 생성 프로세스 확립
  > 생성 -> 폼작성 -> email 인증 -> 생성

~ 8/17

- 퍼블리싱 + 디자인 수정
- 서브도메인 생성 + vercel 베포하기
