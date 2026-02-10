---
title: "Next.js Middleware - 요청 가로채기와 엣지 런타임"
date: "2026-02-10"
tag: "next.js,middleware,edge"
---

Next.js Middleware는 **요청이 완료되기 전에** 실행되는 코드로, 리다이렉트, 헤더 수정, 인증 체크 등을 처리할 수 있습니다.  
Edge Runtime에서 실행되어 매우 빠른 응답 시간을 제공합니다.

---

## 1. 기본 Middleware 구조

```ts
// middleware.ts (프로젝트 루트)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 요청 처리 로직
  return NextResponse.next();
}

export const config = {
  matcher: "/about/:path*", // 특정 경로에만 적용
};
```

- `middleware.ts`는 프로젝트 루트에 위치해야 합니다.
- `matcher`로 Middleware가 실행될 경로를 지정합니다.

---

## 2. 인증 체크와 리다이렉트

```ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token");

  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
```

- 쿠키나 헤더를 확인하여 인증되지 않은 사용자를 리다이렉트할 수 있습니다.

---

## 3. 헤더 수정

```ts
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // 커스텀 헤더 추가
  response.headers.set("x-custom-header", "value");

  // 요청 헤더 수정
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
```

- 응답 헤더를 수정하거나, 요청 헤더를 추가할 수 있습니다.

---

## 4. 지역화(Internationalization)

```ts
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, request.url)
    );
  }
}
```

- URL에 로케일이 없으면 자동으로 추가하는 등의 i18n 로직을 구현할 수 있습니다.

---

## 5. Edge Runtime 제약사항

Middleware는 Edge Runtime에서 실행되므로 일부 Node.js API를 사용할 수 없습니다.

- ❌ 사용 불가: `fs`, `path`, `crypto` (Node.js 버전)
- ✅ 사용 가능: Web API (`fetch`, `Headers`, `URL` 등)

---

## 6. 실무 팁

1. **성능**: Middleware는 모든 요청에서 실행되므로, 로직을 최적화할 것
2. **matcher 활용**: 필요한 경로에만 Middleware 적용
3. **에러 처리**: try-catch로 에러를 처리하고, 실패 시 기본 응답 반환
4. **테스트**: Middleware도 단위 테스트 작성 가능

Next.js Middleware는 "요청을 가로채서 사전에 처리한다"는 개념입니다.  
인증, 지역화, A/B 테스트 등 다양한 용도로 활용할 수 있는 강력한 기능입니다.

