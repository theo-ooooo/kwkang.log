---
title: "TypeScript 제네릭 심화 - 제약 조건과 고급 패턴"
date: "2026-02-27"
tag: "typescript,generics"
---

TypeScript 제네릭은 **타입을 파라미터화**하여 재사용 가능한 타입과 함수를 만들 수 있게 해줍니다.  
이 글에서는 제네릭 제약 조건, 조건부 타입과의 조합, 실무 패턴을 정리합니다.

---

## 1. 기본 제네릭

```typescript
function identity<T>(arg: T): T {
  return arg;
}

const str = identity<string>("hello");
const num = identity<number>(42);
```

- `<T>`로 타입 파라미터를 정의합니다.
- 타입 추론이 가능하면 타입 인자를 생략할 수 있습니다.

---

## 2. 제네릭 제약 조건

```typescript
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength("hello"); // ✅ OK
logLength([1, 2, 3]); // ✅ OK
logLength(42); // ❌ 에러
```

- `extends`로 제네릭 타입에 제약을 걸 수 있습니다.

---

## 3. 여러 타입 파라미터

```typescript
function map<T, U>(
  array: T[],
  fn: (item: T) => U
): U[] {
  return array.map(fn);
}

const numbers = [1, 2, 3];
const strings = map(numbers, (n) => n.toString()); // string[]
```

---

## 4. 제네릭 인터페이스와 클래스

```typescript
interface Container<T> {
  value: T;
  getValue(): T;
  setValue(value: T): void;
}

class Box<T> implements Container<T> {
  constructor(public value: T) {}
  
  getValue(): T {
    return this.value;
  }
  
  setValue(value: T): void {
    this.value = value;
  }
}
```

---

## 5. 조건부 타입과 제네릭

```typescript
type NonNullable<T> = T extends null | undefined ? never : T;

type ApiResponse<T> = T extends string
  ? { message: T }
  : { data: T };

function handleResponse<T>(response: ApiResponse<T>) {
  // ...
}
```

---

## 6. 실무 패턴: API 클라이언트

```typescript
interface ApiClient<TRequest, TResponse> {
  post(endpoint: string, data: TRequest): Promise<TResponse>;
  get(endpoint: string): Promise<TResponse>;
}

class HttpClient implements ApiClient<any, any> {
  async post<TRequest, TResponse>(
    endpoint: string,
    data: TRequest
  ): Promise<TResponse> {
    const response = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
    return response.json();
  }
}
```

---

## 7. 실무 팁

1. **타입 추론 활용**: 가능한 한 타입 인자 생략
2. **제약 조건 명확히**: `extends`로 필요한 속성만 요구
3. **기본 타입 파라미터**: `function fn<T = string>()` 형태로 기본값 제공
4. **복잡도 관리**: 제네릭이 너무 복잡해지면 타입 별칭으로 분리

제네릭은 "타입을 재사용 가능하게 만든다"는 철학을 따릅니다.  
적절히 활용하면 중복 없이 타입 안전한 코드를 작성할 수 있습니다.

