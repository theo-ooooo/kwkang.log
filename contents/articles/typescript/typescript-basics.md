---
title: "TypeScript 기초 - 타입 시스템과 기본 문법"
date: "2026-02-10"
tag: "typescript,basics"
---

TypeScript는 JavaScript에 **정적 타입 시스템**을 추가한 언어입니다.  
컴파일 시점에 타입 오류를 발견할 수 있어, 대규모 프로젝트에서 코드 안정성을 크게 향상시킵니다.

---

## 1. 기본 타입

```typescript
let name: string = "kwkang";
let age: number = 30;
let isActive: boolean = true;
let items: string[] = ["a", "b", "c"];
let user: { name: string; age: number } = { name: "kwkang", age: 30 };
```

- 기본 타입: `string`, `number`, `boolean`, `null`, `undefined`
- 배열: `string[]` 또는 `Array<string>`
- 객체: `{ key: type }` 형태로 타입 정의

---

## 2. 타입 추론

```typescript
let name = "kwkang"; // 타입: string (자동 추론)
let age = 30; // 타입: number (자동 추론)

// 명시적 타입 선언이 필요한 경우
let value: string | number; // 유니온 타입
```

- TypeScript는 대부분의 경우 타입을 자동으로 추론합니다.
- 명시적 타입 선언은 타입이 복잡하거나 추론이 어려울 때 사용합니다.

---

## 3. 인터페이스와 타입 별칭

```typescript
// 인터페이스
interface User {
  id: number;
  name: string;
  email?: string; // 선택적 속성
}

// 타입 별칭
type Status = "pending" | "approved" | "rejected";

// 인터페이스 확장
interface Admin extends User {
  role: "admin";
}
```

- `interface`: 객체 구조를 정의할 때 주로 사용 (확장 가능)
- `type`: 유니온, 인터섹션 등 복잡한 타입 정의에 사용

---

## 4. 함수 타입

```typescript
function greet(name: string): string {
  return `Hello, ${name}`;
}

// 화살표 함수
const add = (a: number, b: number): number => a + b;

// 옵셔널 파라미터
function log(message: string, prefix?: string): void {
  console.log(prefix ? `${prefix}: ${message}` : message);
}
```

- 함수 파라미터와 반환 타입을 명시할 수 있습니다.
- `void`: 반환값이 없을 때 사용

---

## 5. 제네릭

```typescript
function identity<T>(arg: T): T {
  return arg;
}

const result = identity<string>("hello");
const numberResult = identity<number>(42);

// 제네릭 인터페이스
interface Container<T> {
  value: T;
  getValue(): T;
}
```

- 제네릭으로 재사용 가능한 타입을 정의할 수 있습니다.

---

## 6. 실무 팁

1. **점진적 적용**: JavaScript 프로젝트에 점진적으로 TypeScript 도입 가능
2. **엄격 모드**: `strict: true` 옵션으로 타입 안정성 최대화
3. **타입 정의 라이브러리**: `@types/*` 패키지로 외부 라이브러리 타입 지원
4. **any 피하기**: `any` 타입은 타입 안정성을 해치므로 최대한 피할 것

TypeScript는 "타입 안정성을 통해 런타임 에러를 줄인다"는 철학을 따릅니다.  
초기 설정 비용이 있지만, 프로젝트가 커질수록 그 가치가 명확해집니다.

