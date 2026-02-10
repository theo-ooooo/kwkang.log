---
title: "TypeScript 고급 타입 - 유틸리티 타입과 조건부 타입"
date: "2026-02-26"
tag: "typescript,advanced-types"
---

TypeScript의 고급 타입 기능을 활용하면 **타입을 더 정확하고 재사용 가능하게** 만들 수 있습니다.  
이 글에서는 유틸리티 타입, 조건부 타입, 매핑된 타입 등을 정리합니다.

---

## 1. 유틸리티 타입

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Partial: 모든 속성을 선택적으로
type PartialUser = Partial<User>;

// Required: 모든 속성을 필수로
type RequiredUser = Required<PartialUser>;

// Pick: 특정 속성만 선택
type UserName = Pick<User, "name" | "email">;

// Omit: 특정 속성 제외
type UserWithoutAge = Omit<User, "age">;

// Record: 키-값 타입 정의
type UserMap = Record<string, User>;
```

---

## 2. 조건부 타입

```typescript
type IsArray<T> = T extends any[] ? true : false;

type A = IsArray<string[]>; // true
type B = IsArray<string>; // false

// 조건부 타입으로 함수 오버로드
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function getReturnType<T extends (...args: any[]) => any>(
  fn: T
): ReturnType<T> {
  return fn() as ReturnType<T>;
}
```

- `infer` 키워드로 타입을 추론할 수 있습니다.

---

## 3. 매핑된 타입

```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Optional<T> = {
  [P in keyof T]?: T[P];
};

// 실제 사용
type ReadonlyUser = Readonly<User>;
type OptionalUser = Optional<User>;
```

- `keyof`와 `in`을 사용하여 타입을 변환할 수 있습니다.

---

## 4. 템플릿 리터럴 타입

```typescript
type EventName = `on${Capitalize<string>}`;
// "onClick" | "onChange" | "onSubmit" ...

type ApiEndpoint = `/api/${string}`;
// "/api/users" | "/api/products" ...

// 실제 활용
function createHandler(event: EventName) {
  // ...
}
```

---

## 5. 브랜드 타입

```typescript
type UserId = number & { __brand: "UserId" };
type ProductId = number & { __brand: "ProductId" };

function getUser(id: UserId) {
  // ...
}

const userId = 123 as UserId;
const productId = 456 as ProductId;

getUser(userId); // ✅ OK
getUser(productId); // ❌ 타입 에러
```

- 같은 타입이지만 의미가 다른 경우를 구분할 수 있습니다.

---

## 6. 실무 활용 예시

```typescript
// API 응답 타입 변환
type ApiResponse<T> = {
  data: T;
  status: number;
  message: string;
};

// 에러 타입
type ApiError = {
  error: string;
  code: number;
};

// 유니온 타입
type Result<T> = ApiResponse<T> | ApiError;
```

---

## 7. 실무 팁

1. **점진적 학습**: 기본 타입부터 시작하여 점진적으로 고급 기능 학습
2. **타입 재사용**: 공통 타입은 별도 파일로 분리
3. **타입 가드**: `typeof`, `instanceof`로 런타임 타입 체크
4. **문서화**: 복잡한 타입은 주석으로 설명 추가

TypeScript 고급 타입은 "타입을 코드처럼 다룬다"는 철학을 따릅니다.  
적절히 활용하면 타입 안정성을 크게 향상시킬 수 있습니다.

