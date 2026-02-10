---
title: "Domain-Driven Design - 도메인 중심 설계"
date: "2026-02-10"
tag: "architecture,ddd,domain-driven-design"
---

DDD(Domain-Driven Design)는 **비즈니스 도메인을 중심으로 소프트웨어를 설계**하는 방법론입니다.  
이 글에서는 DDD의 핵심 개념과 실무 적용 방법을 정리합니다.

---

## 1. 핵심 개념

- **Entity**: 고유 식별자를 가진 객체
- **Value Object**: 값으로 정의되는 불변 객체
- **Aggregate**: 관련 엔티티를 묶는 루트
- **Repository**: 영속성 추상화
- **Domain Service**: 도메인 로직을 담는 서비스

---

## 2. Entity 예시

```typescript
class User {
  constructor(
    private id: UserId,
    private name: string,
    private email: Email
  ) {}

  changeEmail(newEmail: Email): void {
    if (this.email.equals(newEmail)) {
      throw new Error("Same email");
    }
    this.email = newEmail;
  }
}
```

---

## 3. Value Object 예시

```typescript
class Email {
  constructor(private value: string) {
    if (!this.isValid(value)) {
      throw new Error("Invalid email");
    }
  }

  private isValid(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  equals(other: Email): boolean {
    return this.value === other.value;
  }
}
```

---

## 4. Aggregate 예시

```typescript
class Order {
  private items: OrderItem[] = [];

  addItem(product: Product, quantity: number): void {
    // 비즈니스 규칙 검증
    if (quantity <= 0) {
      throw new Error("Quantity must be positive");
    }
    this.items.push(new OrderItem(product, quantity));
  }

  calculateTotal(): Money {
    return this.items.reduce(
      (total, item) => total.add(item.subtotal()),
      Money.zero()
    );
  }
}
```

---

## 5. 실무 팁

1. **유비쿼터스 언어**: 도메인 전문가와 공통 언어 사용
2. **경계 컨텍스트**: 도메인을 경계로 분리
3. **점진적 적용**: 작은 도메인부터 시작

DDD는 "도메인을 중심으로 설계한다"는 철학을 따릅니다.

