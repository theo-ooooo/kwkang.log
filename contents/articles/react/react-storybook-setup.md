---
title: "Storybook으로 React 컴포넌트 문서화"
date: "2026-02-10"
tag: "react,storybook,ui"
---

Storybook을 사용해 React 컴포넌트를 카탈로그처럼 정리하고, 디자인 시스템에 가까운 구조를 만드는 과정을 기록하는 글입니다.

---

## 1. 기본 세팅과 스토리 작성

프로젝트에 Storybook을 설치하고, 버튼/입력 같은 기본 컴포넌트에 스토리를 작성하는 흐름을 정리합니다.

---

## 2. Controls와 Docs 탭 활용

디자이너/기획자도 확인하기 쉬운 문서 화면을 만드는 방법과, prop을 조작할 수 있는 Controls 사용 예시를 메모합니다.

---

## 3. 실무에서의 활용 포인트

디자인 시스템, 회귀 테스트(비주얼 테스트)와의 연계, 온보딩/지식 공유 관점에서 Storybook을 어떻게 쓰면 좋은지 정리합니다.

*** Add File: contents/articles/next.js/next-authentication-patterns.md
---
title: "Next.js 인증 패턴 - JWT, 세션, OAuth"
date: "2026-02-10"
tag: "next.js,auth"
---

Next.js에서 인증을 구현할 때 JWT, 세션, OAuth를 어떻게 선택하고 조합할지에 대한 간단한 가이드를 남깁니다.

---

## 1. 세션 기반 vs JWT 기반

각 방식의 장단점과, Next.js App Router / Middleware와 어떻게 어울리는지 비교합니다.

---

## 2. NextAuth 등 라이브러리 활용

직접 구현 대신 NextAuth 같은 라이브러리를 사용할 때의 패턴과 커스터마이징 포인트를 정리합니다.

---

## 3. 실무 체크리스트

토큰 저장 위치, CSRF, 리프레시 토큰, 만료 처리 등 꼭 점검해야 할 항목들을 나열합니다.

*** Add File: contents/articles/next.js/next-i18n-routing.md
---
title: "Next.js 국제화(i18n) 라우팅 전략"
date: "2026-02-10"
tag: "next.js,i18n,routing"
---

Next.js에서 다국어 지원을 할 때 경로 구조, 도메인 전략, 번역 파일 관리 방법을 간단히 정리합니다.

---

## 1. URL 설계

서브 경로(`/ko`, `/en`) vs 서브 도메인(`ko.example.com`) 전략과 SEO 관점에서의 차이를 정리합니다.

---

## 2. 번역 리소스 관리

`next-intl`, `next-i18next` 같은 라이브러리와 폴더 구조, 이름 규칙을 어떻게 가져갈지 메모합니다.

---

## 3. 사용자 언어 감지

Accept-Language 헤더, 브라우저 설정, 유저 프로필 등을 기반으로 초기 언어를 선택하는 패턴을 정리합니다.

*** Add File: contents/articles/next.js/next-deployment-vercel.md
---
title: "Next.js Vercel 배포 가이드"
date: "2026-02-10"
tag: "next.js,vercel,deployment"
---

Next.js 프로젝트를 Vercel에 배포할 때 기본 설정과 환경 변수, 프리뷰 배포 흐름을 정리하는 글입니다.

---

## 1. 프로젝트 연결과 환경 변수

GitHub 연동, 브랜치별 프리뷰, 환경 변수 관리 방식을 간단히 정리합니다.

---

## 2. 빌드 옵션과 이미지/폰트 최적화

Image Optimization, `next/font`, 캐시 전략이 Vercel에서 어떻게 동작하는지 메모합니다.

---

## 3. 모니터링과 롤백

에러/로그 확인, 이전 배포로 롤백하는 방법, 서킷 브레이커처럼 활용하는 패턴을 정리합니다.

*** Add File: contents/articles/next.js/next-app-router-migration-guide.md
---
title: "Pages Router에서 App Router로 마이그레이션 가이드"
date: "2026-02-10"
tag: "next.js,app-router,migration"
---

기존 `pages` 기반 Next.js 프로젝트를 `app` 디렉터리로 점진적으로 옮길 때 고려해야 할 포인트를 메모합니다.

---

## 1. 공존 전략

`pages`와 `app`을 동시에 둘 수 있을 때의 장점을 활용해, 라우트 단위로 조금씩 옮기는 전략을 정리합니다.

---

## 2. 데이터 패칭 전환

`getServerSideProps` / `getStaticProps`에서 Server Components + `fetch` 패턴으로 전환하는 방법을 간단히 정리합니다.

---

## 3. 단계별 체크리스트

레이아웃, 메타데이터, 에러/로딩 UI 등을 옮길 때 순서와 주의할 점을 나열합니다.

*** Add File: contents/articles/next.js/next-edge-functions.md
---
title: "Next.js Edge Functions 활용하기"
date: "2026-02-10"
tag: "next.js,edge"
---

지연 시간이 중요한 API나 간단한 프리프로세싱을 Edge Functions로 옮기는 패턴을 간단히 정리합니다.

---

## 1. 어떤 일을 Edge로 옮길까

인증 프리체크, A/B 테스트, Geo 기반 라우팅처럼 엣지에서 처리하면 좋은 작업들을 예로 듭니다.

---

## 2. 제한 사항

Node.js 전용 모듈 사용 불가, 연결 유지 한계 등 Edge Runtime의 제약을 메모합니다.

---

## 3. 배포와 디버깅

로컬에서 테스트하는 방법, 로그 확인, 롤백 전략을 간단히 정리합니다.

*** Add File: contents/articles/next.js/next-rsc-patterns.md
---
title: "Next.js에서 React Server Components 패턴"
date: "2026-02-10"
tag: "next.js,react,server-components"
---

Next.js App Router에서 서버 컴포넌트를 설계할 때 데이터 패칭, 캐시, 클라이언트 경계 나누기 패턴을 메모합니다.

---

## 1. 서버 컴포넌트의 역할

어떤 로직을 서버 쪽으로 보내는 게 좋은지, 클라이언트와의 경계를 어떻게 잡을지 정리합니다.

---

## 2. 캐시와 revalidate

`fetch` 캐시 옵션과 `revalidate`를 어떻게 조합해서 성능과 최신성을 맞출지 간단한 예와 함께 남깁니다.

---

## 3. 클라이언트 컴포넌트와의 협업

폼, 인터랙션, 상태 관리가 필요한 부분을 어떻게 클라이언트 컴포넌트로 감쌀지에 대한 패턴을 정리합니다.

*** Add File: contents/articles/next.js/next-error-handling.md
---
title: "Next.js 에러 처리 패턴 - error.tsx와 로그"
date: "2026-02-10"
tag: "next.js,error-handling"
---

Next.js에서 페이지별/세그먼트별 에러 화면을 구성하고, 서버/클라이언트 에러를 로깅하는 패턴을 간단히 정리합니다.

---

## 1. error.tsx 활용

App Router의 `error.tsx` 파일로 경로 단위 에러 UI를 분리하는 방법을 메모합니다.

---

## 2. 로깅 전략

서버 에러는 서버 로깅으로, 클라이언트 에러는 Sentry 같은 서비스로 보내는 구조를 정리합니다.

---

## 3. 사용자 경험 고려

에러 페이지에서도 최소한으로 제공해야 할 정보와, 재시도/홈 이동 버튼 등의 UX 요소를 정리합니다.

*** Add File: contents/articles/next.js/next-seo-best-practices.md
---
title: "Next.js SEO 베스트 프랙티스"
date: "2026-02-10"
tag: "next.js,seo"
---

Next.js에서 SEO를 신경 쓸 때 메타데이터, 사이트맵, 구조화된 데이터 등을 어떻게 구성할지에 대한 간단한 메모입니다.

---

## 1. Metadata API 활용

`metadata`와 `generateMetadata`를 사용해 페이지별 제목/설명을 관리하는 패턴을 정리합니다.

---

## 2. sitemap과 robots.txt

정적/동적 사이트맵 생성 전략과, 검색엔진 크롤러 제어에 대한 기본 설정을 메모합니다.

---

## 3. 성능과 SEO

Lighthouse/Core Web Vitals 관점에서 이미지, 폰트, 스크립트를 어떻게 최적화해야 하는지 요약합니다.


