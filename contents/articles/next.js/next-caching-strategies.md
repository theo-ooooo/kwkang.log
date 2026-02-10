---
title: "Next.js 캐싱 전략 - ISR, SSG, SSR 캐시 제어"
date: "2026-02-22"
tag: "next.js,caching,isr,ssg,ssr"
---

Next.js는 다양한 캐싱 전략을 제공하여 성능을 최적화합니다.  
이 글에서는 `fetch` 옵션, `revalidate`, `generateStaticParams` 등을 활용한 캐싱 전략을 정리합니다.

---

## 1. fetch 캐시 옵션

```tsx
// app/products/page.tsx

// 1. 기본 캐시 (force-cache)
const data = await fetch("https://api.example.com/products", {
  cache: "force-cache", // 기본값, 캐시 사용
});

// 2. 캐시 없음
const data = await fetch("https://api.example.com/products", {
  cache: "no-store", // 매번 새로 요청
});

// 3. 재검증 시간 설정 (ISR)
const data = await fetch("https://api.example.com/products", {
  next: { revalidate: 60 }, // 60초마다 재검증
});
```

- `force-cache`: 빌드 시 또는 첫 요청 시 캐시하고 재사용
- `no-store`: 캐시하지 않고 매번 새로 요청
- `revalidate`: 지정한 시간(초)마다 백그라운드에서 재검증

---

## 2. Static Generation (SSG)

```tsx
// app/products/[id]/page.tsx
export async function generateStaticParams() {
  const products = await fetchProducts();
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await fetchProduct(params.id);
  return <div>{product.name}</div>;
}
```

- `generateStaticParams`로 빌드 시 모든 정적 페이지를 생성합니다.
- 동적 라우트도 미리 생성할 수 있습니다.

---

## 3. Incremental Static Regeneration (ISR)

```tsx
export default async function BlogPage() {
  const posts = await fetch("https://api.example.com/posts", {
    next: { revalidate: 3600 }, // 1시간마다 재생성
  }).then((res) => res.json());

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

- 빌드 시 정적 페이지를 생성하고, 지정한 시간마다 백그라운드에서 재생성합니다.
- 사용자는 항상 빠른 정적 페이지를 받지만, 데이터는 주기적으로 업데이트됩니다.

---

## 4. Route Segment Config

```tsx
// app/dashboard/page.tsx
export const dynamic = "force-dynamic"; // 항상 동적 렌더링
export const revalidate = 60; // 60초마다 재검증
export const fetchCache = "force-no-store"; // fetch 캐시 비활성화
```

- 파일 레벨에서 캐싱 동작을 제어할 수 있습니다.

---

## 5. 실무 캐싱 전략

1. **거의 변하지 않는 데이터**: `force-cache` 또는 `generateStaticParams`
2. **자주 변하는 데이터**: `no-store` 또는 짧은 `revalidate`
3. **사용자별 데이터**: `dynamic = "force-dynamic"`
4. **하이브리드**: 중요한 부분은 SSG, 사용자별 부분은 SSR

---

## 6. 캐시 무효화

```tsx
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  const data = await request.json();
  await createPost(data);
  
  revalidatePath("/blog"); // /blog 경로 캐시 무효화
  return Response.json({ success: true });
}
```

- `revalidatePath`로 특정 경로의 캐시를 즉시 무효화할 수 있습니다.

Next.js 캐싱은 "적절한 전략을 선택하여 성능과 최신성을 균형있게 유지한다"는 철학을 따릅니다.  
데이터의 특성에 맞는 캐싱 전략을 선택하는 것이 중요합니다.

