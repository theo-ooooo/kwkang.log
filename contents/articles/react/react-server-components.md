---
title: "React Server Components - 서버에서 렌더링되는 컴포넌트"
date: "2026-02-10"
tag: "react,server-components,next.js"
---

React Server Components(RSC)는 서버에서만 실행되고, 클라이언트로 JavaScript 번들을 전송하지 않는 새로운 컴포넌트 모델입니다.  
Next.js 13+ App Router에서 기본으로 사용되며, 성능과 번들 크기 최적화에 큰 도움을 줍니다.

---

## 1. Server Components vs Client Components

```tsx
// Server Component (기본)
async function UserList() {
  const users = await fetchUsers(); // 서버에서 직접 데이터 패칭
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// Client Component
"use client";
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

- Server Components는 `"use client"`가 없으면 기본적으로 서버에서 실행됩니다.
- 브라우저 API, 상태, 이벤트 핸들러가 필요하면 Client Component로 만들어야 합니다.

---

## 2. Server Components의 장점

1. **번들 크기 감소**: 서버 컴포넌트는 클라이언트로 전송되지 않음
2. **직접 DB 접근**: 서버에서 데이터베이스나 파일 시스템에 직접 접근 가능
3. **보안**: API 키나 시크릿을 서버에서만 사용
4. **성능**: 초기 로딩 시간 단축

---

## 3. Server와 Client 컴포넌트 조합

```tsx
// Server Component
async function Page() {
  const data = await fetchData();

  return (
    <div>
      <ServerContent data={data} />
      <ClientInteractive />
    </div>
  );
}

// Client Component는 Server Component의 자식으로 사용 가능
// 하지만 Server Component는 Client Component의 자식으로 사용 불가
```

- Server Component는 Client Component를 import하고 사용할 수 있습니다.
- 반대로 Client Component는 Server Component를 직접 import할 수 없습니다 (props로만 전달 가능).

---

## 4. 데이터 패칭 패턴

```tsx
async function ProductPage({ params }: { params: { id: string } }) {
  const product = await fetch(`https://api.example.com/products/${params.id}`, {
    cache: "no-store", // 또는 "force-cache", { next: { revalidate: 60 } }
  }).then((res) => res.json());

  return (
    <div>
      <h1>{product.name}</h1>
      <ProductDetails product={product} />
    </div>
  );
}
```

- Server Component에서는 `fetch`를 직접 사용하고, Next.js가 자동으로 중복 요청을 제거합니다.

---

## 5. 실무 팁

1. **기본은 Server Component**: 필요한 경우에만 Client Component로 전환
2. **경계 명확히**: Server/Client 경계를 명확히 나누고, 불필요한 `"use client"` 지시어 피하기
3. **스트리밍**: `Suspense`와 함께 사용하여 점진적 렌더링
4. **에러 처리**: `error.tsx`로 Server Component 에러도 처리 가능

React Server Components는 "서버에서 할 수 있는 건 서버에서 하자"는 철학을 따릅니다.  
클라이언트 번들을 줄이고, 초기 로딩 성능을 개선하는 강력한 도구입니다.

