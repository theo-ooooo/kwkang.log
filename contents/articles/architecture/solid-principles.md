---
title: "SOLID 원칙 - 객체지향 설계 원칙"
date: "2026-02-10"
tag: "architecture,solid,oop"
---

SOLID는 **객체지향 설계의 5가지 원칙**으로, 유지보수 가능한 코드를 작성하는 가이드라인입니다.  
이 글에서는 각 원칙의 의미와 실무 적용 방법을 정리합니다.

---

## 1. Single Responsibility Principle (SRP)

하나의 클래스는 하나의 책임만 가져야 합니다.

```typescript
// ❌ 나쁜 예
class User {
  save() {}
  sendEmail() {}
  generateReport() {}
}

// ✅ 좋은 예
class User {
  // 사용자 데이터만 관리
}

class EmailService {
  sendEmail() {}
}

class ReportGenerator {
  generateReport() {}
}
```

---

## 2. Open/Closed Principle (OCP)

확장에는 열려있고 수정에는 닫혀있어야 합니다.

```typescript
interface PaymentMethod {
  pay(amount: number): void;
}

class CreditCardPayment implements PaymentMethod {
  pay(amount: number): void {}
}

// 새로운 결제 방법 추가 시 기존 코드 수정 없이 확장
class PayPalPayment implements PaymentMethod {
  pay(amount: number): void {}
}
```

---

## 3. Liskov Substitution Principle (LSP)

하위 타입은 상위 타입을 대체할 수 있어야 합니다.

```typescript
class Rectangle {
  setWidth(w: number) {}
  setHeight(h: number) {}
}

class Square extends Rectangle {
  // Square는 Rectangle을 대체할 수 있어야 함
}
```

---

## 4. Interface Segregation Principle (ISP)

클라이언트는 사용하지 않는 인터페이스에 의존하지 않아야 합니다.

```typescript
// ❌ 나쁜 예
interface Worker {
  work(): void;
  eat(): void;
  sleep(): void;
}

// ✅ 좋은 예
interface Workable {
  work(): void;
}

interface Eatable {
  eat(): void;
}
```

---

## 5. Dependency Inversion Principle (DIP)

고수준 모듈은 저수준 모듈에 의존하지 않아야 합니다.

```typescript
// 인터페이스에 의존
interface UserRepository {
  findById(id: string): User;
}

class GetUserUseCase {
  constructor(private userRepo: UserRepository) {}
}
```

---

## 6. 실무 팁

1. **점진적 적용**: 기존 코드에 점진적으로 적용
2. **균형**: 원칙을 지키되 과도하게 복잡하게 만들지 않기
3. **컨텍스트**: 프로젝트 규모와 팀 상황에 맞게 적용

SOLID 원칙은 "유지보수 가능한 코드를 만든다"는 철학을 따릅니다.

