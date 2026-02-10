---
title: "TypeScript 유틸리티 타입 완전 정리"
date: "2026-02-28"
tag: "typescript,utility-types"
---

TypeScript는 자주 사용하는 타입 변환을 위한 **내장 유틸리티 타입**을 제공합니다.  
이 글에서는 `Partial`, `Required`, `Pick`, `Omit`, `Record` 등 모든 유틸리티 타입을 정리합니다.

---

## 1. Partial<T>

모든 속성을 선택적으로 만듭니다.

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

type PartialUser = Partial<User>;
// { id?: number; name?: string; email?: string; }

function updateUser(user: PartialUser) {
  // 일부 속성만 업데이트 가능
}
```

---

## 2. Required<T>

모든 속성을 필수로 만듭니다.

```typescript
interface Config {
  host?: string;
  port?: number;
}

type RequiredConfig = Required<Config>;
// { host: string; port: number; }
```

---

## 3. Readonly<T>

모든 속성을 읽기 전용으로 만듭니다.

```typescript
type ReadonlyUser = Readonly<User>;
// { readonly id: number; readonly name: string; ... }
```

---

## 4. Pick<T, K>

특정 속성만 선택합니다.

```typescript
type UserName = Pick<User, "name" | "email">;
// { name: string; email: string; }
```

---

## 5. Omit<T, K>

특정 속성을 제외합니다.

```typescript
type UserWithoutId = Omit<User, "id">;
// { name: string; email: string; }
```

---

## 6. Record<K, T>

키-값 타입을 정의합니다.

```typescript
type UserMap = Record<string, User>;
// { [key: string]: User }

type Status = "pending" | "approved" | "rejected";
type StatusConfig = Record<Status, { color: string }>;
```

---

## 7. Exclude<T, U>

T에서 U를 제외합니다.

```typescript
type T0 = Exclude<"a" | "b" | "c", "a">; // "b" | "c"
type T1 = Exclude<string | number | (() => void), Function>; // string | number
```

---

## 8. Extract<T, U>

T에서 U에 할당 가능한 타입만 추출합니다.

```typescript
type T0 = Extract<"a" | "b" | "c", "a" | "f">; // "a"
```

---

## 9. NonNullable<T>

null과 undefined를 제거합니다.

```typescript
type T0 = NonNullable<string | number | undefined>; // string | number
```

---

## 10. Parameters<T>

함수의 파라미터 타입을 튜플로 추출합니다.

```typescript
type T0 = Parameters<() => string>; // []
type T1 = Parameters<(s: string) => void>; // [string]
```

---

## 11. ReturnType<T>

함수의 반환 타입을 추출합니다.

```typescript
type T0 = ReturnType<() => string>; // string
type T1 = ReturnType<(s: string) => number>; // number
```

---

## 12. 실무 활용

```typescript
// API 응답 타입 변환
type ApiResponse<T> = {
  data: T;
  status: number;
};

// 업데이트 요청 (일부 필드만)
type UpdateRequest<T> = Partial<Omit<T, "id" | "createdAt">>;

// DTO 변환
type UserDTO = Pick<User, "name" | "email">;
```

---

## 13. 실무 팁

1. **조합 사용**: 여러 유틸리티 타입을 조합하여 복잡한 타입 생성
2. **타입 별칭**: 자주 사용하는 조합은 타입 별칭으로 정의
3. **문서화**: 복잡한 타입 변환은 주석으로 설명

TypeScript 유틸리티 타입은 "타입 변환을 쉽게 만든다"는 철학을 따릅니다.  
적절히 활용하면 타입 정의를 간결하고 재사용 가능하게 만들 수 있습니다.

