---
title: "Next.js 16 정리 - React 18 시대의 풀스택 프레임워크"
date: "2026-01-28"
tag: "next.js,react,app-router"
---

Next.js 16은 React 18을 기반으로 하는 **풀스택 웹 프레임워크**로, 서버 컴포넌트(App Router), 스트리밍, 캐시, 미들웨어 등 프론트엔드와 백엔드를 모두 아우를 수 있는 기능을 제공합니다.  
이 글에서는 Next.js 16에서 핵심적으로 알아야 할 개념과, 실무에서 자주 쓰게 될 부분 위주로 간략히 정리합니다.

---

## 1. 프로젝트 구조와 App Router

- `app` 디렉토리를 사용하는 **App Router**가 기본
- 파일/폴더 구조가 곧 라우팅 구조

```bash
app/
  layout.tsx      # 루트 레이아웃
  page.tsx        # '/'
  blog/
    page.tsx      # '/blog'
    [id]/
      page.tsx    # '/blog/:id'
```

- `page.tsx` : 실제 페이지 컴포넌트
- `layout.tsx` : 상위/하위 경로에 공통으로 적용되는 레이아웃
- `loading.tsx`, `error.tsx`, `not-found.tsx` 등 상태 별 화면을 파일 단위로 관리

---

## 2. 서버 컴포넌트 & 클라이언트 컴포넌트

- 기본은 **서버 컴포넌트**
  - 데이터 패칭, SEO, 초기 렌더링에 최적화
- 브라우저 API, 상태 관리, 이벤트 등이 필요한 경우에만 **클라이언트 컴포넌트**

```tsx
// 클라이언트 컴포넌트 예시
"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>;
}
```

서버 컴포넌트는 기본적으로 React 18의 **스트리밍 렌더링**을 활용하여, 무거운 페이지도 점진적으로 그려줄 수 있습니다.

---

## 3. React 18 기반 데이터 패칭

Next.js 16에서는 `getServerSideProps` / `getStaticProps` 없이도 **서버 컴포넌트 안에서 바로 데이터 패칭**이 가능합니다.

```tsx
// app/users/page.tsx
async function getUsers() {
  const res = await fetch("https://api.example.com/users", {
    cache: "no-store", // 매 요청마다 새로 패칭
  });
  return res.json();
}

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <ul>
      {users.map((user: any) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

- `cache`, `next: { revalidate }` 옵션으로 **SSR / SSG / ISR** 전략을 파일 단위로 섬세하게 설정할 수 있습니다.

---

## 4. 레이아웃과 메타데이터

- 레이아웃은 중첩되며, 상위 레이아웃 → 하위 레이아웃 → 페이지 순으로 감싸집니다.

```tsx
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
```

- `metadata` 또는 `generateMetadata`로 SEO 관련 정보를 선언적으로 정의

```tsx
// app/blog/[id]/page.tsx
type Props = { params: { id: string } };

export async function generateMetadata({ params }: Props) {
  return {
    title: `블로그 글 - ${params.id}`,
  };
}
```

---

## 5. 실무에서 신경 쓸 점

1. **서버/클라이언트 컴포넌트 경계**를 명확히 나눌 것  
   - 데이터 패칭, SEO는 서버  
   - 상호작용, 상태 관리는 클라이언트
2. 캐시 전략(`cache`, `revalidate`)을 API 별로 분리해서 설정  
3. 에러/로딩 UI를 `error.tsx`, `loading.tsx`로 분리해 사용자 경험 개선  
4. 기존 `pages` 구조가 있다면, **점진적으로** `app` 디렉토리로 마이그레이션

Next.js 16은 React 18의 기능을 최대한 활용하는 방향으로 설계되어 있습니다.  
처음에는 개념이 많아 보이지만, “**라우팅과 데이터 패칭, 렌더링 전략을 한 곳에서 관리한다**”는 관점으로 보면 구조가 훨씬 명확해집니다.


