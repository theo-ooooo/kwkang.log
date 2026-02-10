---
title: "Next.js Metadata API - SEO와 소셜 미디어 최적화"
date: "2026-02-10"
tag: "next.js,metadata,seo"
---

Next.js 13+ App Router에서는 `metadata` 객체나 `generateMetadata` 함수로 **SEO 메타데이터를 선언적으로 관리**할 수 있습니다.  
이 글에서는 페이지별 메타데이터 설정과 동적 메타데이터 생성 방법을 정리합니다.

---

## 1. 정적 메타데이터

```tsx
// app/about/page.tsx
export const metadata = {
  title: "About Us",
  description: "회사 소개 페이지입니다.",
  openGraph: {
    title: "About Us",
    description: "회사 소개 페이지입니다.",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us",
    description: "회사 소개 페이지입니다.",
  },
};

export default function AboutPage() {
  return <div>About</div>;
}
```

- `metadata` 객체로 정적 메타데이터를 정의할 수 있습니다.

---

## 2. 동적 메타데이터

```tsx
// app/blog/[slug]/page.tsx
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.imageUrl],
    },
  };
}
```

- `generateMetadata` 함수로 동적으로 메타데이터를 생성할 수 있습니다.

---

## 3. 루트 레이아웃 메타데이터

```tsx
// app/layout.tsx
export const metadata = {
  metadataBase: new URL("https://kwkang.net"),
  title: {
    default: "kwkang.log",
    template: "%s | kwkang.log",
  },
  description: "개발 블로그",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://kwkang.net",
    siteName: "kwkang.log",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
```

- 루트 레이아웃에서 기본 메타데이터를 설정하고, 하위 페이지에서 `template`으로 확장할 수 있습니다.

---

## 4. Open Graph 이미지

```tsx
export const metadata = {
  openGraph: {
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Page description",
      },
    ],
  },
};
```

- Open Graph 이미지는 1200x630 크기를 권장합니다.

---

## 5. JSON-LD 구조화된 데이터

```tsx
export default function BlogPost({ post }: { post: Post }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.publishedAt,
    author: {
      "@type": "Person",
      name: "kwkang",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>{/* ... */}</article>
    </>
  );
}
```

- JSON-LD로 구조화된 데이터를 추가하면 검색 엔진이 콘텐츠를 더 잘 이해할 수 있습니다.

---

## 6. 실무 팁

1. **기본값 설정**: 루트 레이아웃에서 기본 메타데이터 설정
2. **동적 생성**: 블로그 포스트, 제품 페이지 등은 `generateMetadata` 사용
3. **이미지 최적화**: OG 이미지는 적절한 크기로 최적화
4. **검증**: Google Search Console, Facebook Debugger로 메타데이터 확인

Next.js Metadata API는 "SEO를 선언적으로 관리한다"는 철학을 따릅니다.  
각 페이지에서 필요한 메타데이터를 명확하게 정의하면, 검색 엔진과 소셜 미디어에서 더 나은 노출을 얻을 수 있습니다.

