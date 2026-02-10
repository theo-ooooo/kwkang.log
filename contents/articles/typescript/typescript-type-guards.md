---
title: "TypeScript 타입 가드 - 런타임 타입 체크와 타입 좁히기"
date: "2026-02-10"
tag: "typescript,type-guards,type-narrowing"
---

TypeScript 타입 가드는 **런타임에 타입을 체크**하여 타입을 좁혀(narrow) 타입 안정성을 보장합니다.  
이 글에서는 `typeof`, `instanceof`, 커스텀 타입 가드 등을 정리합니다.

---

## 1. typeof 타입 가드

```typescript
function processValue(value: string | number) {
  if (typeof value === "string") {
    // 여기서 value는 string 타입
    console.log(value.toUpperCase());
  } else {
    // 여기서 value는 number 타입
    console.log(value.toFixed(2));
  }
}
```

- `typeof`로 기본 타입을 체크할 수 있습니다.

---

## 2. instanceof 타입 가드

```typescript
class Dog {
  bark() {
    console.log("멍멍");
  }
}

class Cat {
  meow() {
    console.log("야옹");
  }
}

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark(); // ✅ OK
  } else {
    animal.meow(); // ✅ OK
  }
}
```

---

## 3. in 연산자 타입 가드

```typescript
interface Dog {
  type: "dog";
  bark: () => void;
}

interface Cat {
  type: "cat";
  meow: () => void;
}

function makeSound(animal: Dog | Cat) {
  if ("bark" in animal) {
    animal.bark();
  } else {
    animal.meow();
  }
}
```

---

## 4. 커스텀 타입 가드

```typescript
interface User {
  id: number;
  name: string;
}

interface Admin {
  id: number;
  name: string;
  role: "admin";
}

function isAdmin(user: User | Admin): user is Admin {
  return "role" in user && user.role === "admin";
}

function processUser(user: User | Admin) {
  if (isAdmin(user)) {
    // 여기서 user는 Admin 타입
    console.log(user.role);
  } else {
    // 여기서 user는 User 타입
    console.log(user.name);
  }
}
```

- `user is Admin` 형태로 타입 가드를 정의합니다.

---

## 5. null 체크

```typescript
function processValue(value: string | null) {
  if (value === null) {
    return;
  }
  // 여기서 value는 string 타입
  console.log(value.toUpperCase());
}

// 또는
function processValue(value: string | null) {
  if (!value) {
    return;
  }
  // 여기서도 value는 string 타입
  console.log(value.toUpperCase());
}
```

---

## 6. 배열 타입 가드

```typescript
function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) &&
    value.every((item) => typeof item === "string")
  );
}

function processArray(value: unknown) {
  if (isStringArray(value)) {
    // 여기서 value는 string[] 타입
    value.forEach((str) => console.log(str.toUpperCase()));
  }
}
```

---

## 7. 실무 활용

```typescript
// API 응답 타입 가드
interface SuccessResponse {
  success: true;
  data: unknown;
}

interface ErrorResponse {
  success: false;
  error: string;
}

function isSuccessResponse(
  response: SuccessResponse | ErrorResponse
): response is SuccessResponse {
  return response.success === true;
}

function handleResponse(response: SuccessResponse | ErrorResponse) {
  if (isSuccessResponse(response)) {
    console.log(response.data);
  } else {
    console.error(response.error);
  }
}
```

---

## 8. 실무 팁

1. **타입 가드 함수**: 복잡한 타입 체크는 함수로 분리
2. **명확한 네이밍**: `is*`, `has*` 같은 네이밍 컨벤션 사용
3. **조기 반환**: 타입 가드로 조기 반환하여 중첩 줄이기
4. **문서화**: 복잡한 타입 가드는 주석으로 설명

타입 가드는 "런타임 체크로 타입 안정성을 보장한다"는 철학을 따릅니다.  
적절히 활용하면 `any`나 타입 단언 없이도 안전한 코드를 작성할 수 있습니다.

