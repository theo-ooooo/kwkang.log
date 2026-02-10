---
title: "Next.js 폰트 최적화 - next/font로 웹폰트 성능 개선"
date: "2026-02-10"
tag: "next.js,font,optimization"
---

Next.js의 `next/font`는 웹폰트를 **자동으로 최적화**하여 레이아웃 시프트(CLS)를 방지하고 로딩 성능을 개선합니다.  
Google Fonts, 로컬 폰트 모두 지원하며, 자동으로 폰트 파일을 최적화합니다.

---

## 1. Google Fonts 사용

```tsx
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
```

- Google Fonts는 빌드 시 자동으로 다운로드되고 최적화됩니다.
- `subsets`로 필요한 문자 집합만 포함할 수 있습니다.

---

## 2. 로컬 폰트 사용

```tsx
import localFont from "next/font/local";

const customFont = localFont({
  src: [
    {
      path: "./fonts/CustomFont-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/CustomFont-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={customFont.className}>{children}</div>;
}
```

- 로컬 폰트 파일도 `next/font/local`로 최적화할 수 있습니다.

---

## 3. 폰트 디스플레이 전략

```tsx
const inter = Inter({
  subsets: ["latin"],
  display: "swap", // 기본값
  // 'auto' | 'block' | 'swap' | 'fallback' | 'optional'
});
```

- `display: "swap"`: 폰트가 로드되는 동안 대체 폰트로 표시, 로드되면 교체
- `display: "optional"`: 폰트가 빠르게 로드되지 않으면 대체 폰트 유지

---

## 4. 가변 폰트(Variable Fonts)

```tsx
import { Roboto_Flex } from "next/font/google";

const roboto = Roboto_Flex({
  subsets: ["latin"],
  variable: "--font-roboto", // CSS 변수로 사용
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${roboto.variable} font-sans`}>
      {children}
    </div>
  );
}
```

- `variable` 옵션으로 CSS 변수로 사용할 수 있어, Tailwind CSS와 함께 사용하기 좋습니다.

---

## 5. 성능 최적화 효과

1. **자동 폰트 서브셋팅**: 필요한 문자만 포함
2. **자동 self-hosting**: Google Fonts도 자체 호스팅하여 외부 요청 제거
3. **레이아웃 시프트 방지**: `size-adjust`로 CLS 최소화
4. **프리로딩**: 중요한 폰트는 자동으로 프리로드

---

## 6. 실무 팁

1. **필요한 폰트만**: 사용하지 않는 폰트는 제거하여 번들 크기 감소
2. **가변 폰트 우선**: 가능하면 가변 폰트 사용 (파일 크기 감소)
3. **fallback 폰트**: `fallback` 옵션으로 시스템 폰트 지정
4. **성능 측정**: Lighthouse로 폰트 로딩 성능 확인

Next.js 폰트 최적화는 "폰트 로딩이 사용자 경험을 해치지 않도록 자동으로 처리한다"는 철학을 따릅니다.  
적절히 사용하면 Core Web Vitals 점수를 크게 개선할 수 있습니다.

