---
title: "Next.js Image 최적화 - 자동 이미지 최적화와 성능 개선"
date: "2026-02-10"
tag: "next.js,image,optimization"
---

Next.js의 `Image` 컴포넌트는 이미지를 **자동으로 최적화**하고, 지연 로딩, 반응형 크기 조정 등을 제공합니다.  
이 글에서는 `next/image`를 사용하여 이미지 성능을 개선하는 방법을 정리합니다.

---

## 1. 기본 사용법

```tsx
import Image from "next/image";

function ProductCard({ product }: { product: Product }) {
  return (
    <div>
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={500}
        height={300}
        priority={false} // 지연 로딩 (기본값)
      />
    </div>
  );
}
```

- `width`와 `height`를 명시해야 레이아웃 시프트(CLS)를 방지할 수 있습니다.
- `priority={true}`로 설정하면 지연 로딩을 비활성화합니다 (위치가 중요한 이미지에 사용).

---

## 2. 외부 이미지 도메인 설정

```js
// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
        pathname: "/images/**",
      },
    ],
  },
};
```

- 외부 도메인의 이미지를 사용하려면 `next.config.js`에 도메인을 등록해야 합니다.

---

## 3. 반응형 이미지

```tsx
<Image
  src="/hero.jpg"
  alt="Hero"
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  style={{ objectFit: "cover" }}
/>
```

- `fill`을 사용하면 부모 요소의 크기에 맞춰 자동으로 조정됩니다.
- `sizes`로 뷰포트 크기별로 로드할 이미지 크기를 지정합니다.

---

## 4. 이미지 최적화 포맷

Next.js는 자동으로 WebP, AVIF 같은 최적화된 포맷을 제공합니다.

```tsx
<Image
  src="/photo.jpg"
  alt="Photo"
  width={800}
  height={600}
  quality={90} // 1-100, 기본값 75
/>
```

- 브라우저가 지원하는 최적 포맷을 자동으로 선택합니다.
- `quality`로 압축 품질을 조절할 수 있습니다.

---

## 5. 실무 팁

1. **레이아웃 시프트 방지**: 항상 `width`/`height` 또는 `fill` 사용
2. **위치가 중요한 이미지**: `priority={true}` 설정 (Hero 이미지 등)
3. **외부 이미지**: `remotePatterns`에 도메인 등록 필수
4. **성능 모니터링**: Lighthouse로 이미지 최적화 점수 확인

Next.js Image 컴포넌트는 "이미지 최적화를 자동으로 처리한다"는 철학을 따릅니다.  
적절히 사용하면 Core Web Vitals 점수를 크게 개선할 수 있습니다.

