---
title: "Next.js API Routes - 서버리스 함수로 백엔드 구현"
date: "2026-02-10"
tag: "next.js,api-routes,serverless"
---

Next.js API Routes는 **서버리스 함수**로 백엔드 API를 구현할 수 있게 해줍니다.  
프론트엔드와 백엔드를 같은 프로젝트에서 관리할 수 있어, 작은 프로젝트나 프로토타입에 적합합니다.

---

## 1. 기본 API Route 구조

```ts
// app/api/users/route.ts (App Router)
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const users = await fetchUsers();
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const newUser = await createUser(body);
  return NextResponse.json(newUser, { status: 201 });
}
```

- HTTP 메서드 이름(`GET`, `POST`, `PUT`, `DELETE` 등)으로 함수를 export합니다.
- `NextRequest`와 `NextResponse`를 사용합니다.

---

## 2. 동적 라우트

```ts
// app/api/users/[id]/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const user = await getUserById(id);
  
  if (!user) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  
  return NextResponse.json(user);
}
```

- 폴더 이름에 `[id]`를 사용하면 동적 파라미터를 받을 수 있습니다.

---

## 3. 요청 데이터 처리

```ts
export async function POST(request: NextRequest) {
  // JSON body
  const body = await request.json();

  // Query parameters
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page");

  // Headers
  const authHeader = request.headers.get("authorization");

  // Form data
  const formData = await request.formData();
  const file = formData.get("file");

  return NextResponse.json({ success: true });
}
```

---

## 4. 에러 처리

```ts
export async function GET(request: NextRequest) {
  try {
    const data = await fetchData();
    return NextResponse.json(data);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
```

---

## 5. CORS 설정

```ts
export async function GET(request: NextRequest) {
  const response = NextResponse.json({ data: "ok" });

  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");

  return response;
}
```

---

## 6. 실무 팁

1. **App Router vs Pages Router**: App Router에서는 `route.ts`, Pages Router에서는 `pages/api/` 사용
2. **환경 변수**: `.env.local`에 API 키 등 시크릿 저장
3. **타임아웃**: Vercel에서는 10초(프로), 60초(엔터프라이즈) 제한
4. **데이터베이스**: Prisma, Drizzle 같은 ORM과 함께 사용

Next.js API Routes는 "프론트엔드와 백엔드를 한 프로젝트에서 관리한다"는 철학을 따릅니다.  
작은 프로젝트나 MVP에서는 별도 백엔드 서버 없이도 빠르게 개발할 수 있습니다.

