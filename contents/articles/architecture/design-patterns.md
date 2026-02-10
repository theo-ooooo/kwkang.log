---
title: "디자인 패턴 - 실무에서 자주 쓰는 패턴"
date: "2026-02-10"
tag: "architecture,design-patterns"
---

디자인 패턴은 **반복되는 설계 문제에 대한 검증된 해결책**입니다.  
이 글에서는 실무에서 자주 사용하는 디자인 패턴을 정리합니다.

---

## 1. 싱글톤 패턴

```typescript
class Database {
  private static instance: Database;

  private constructor() {}

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}
```

---

## 2. 팩토리 패턴

```typescript
interface Product {
  getName(): string;
}

class ProductFactory {
  static create(type: string): Product {
    switch (type) {
      case "A":
        return new ProductA();
      case "B":
        return new ProductB();
      default:
        throw new Error("Unknown product type");
    }
  }
}
```

---

## 3. 옵저버 패턴

```typescript
class EventEmitter {
  private listeners = new Map<string, Function[]>();

  on(event: string, listener: Function): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(listener);
  }

  emit(event: string, data: any): void {
    const listeners = this.listeners.get(event) || [];
    listeners.forEach((listener) => listener(data));
  }
}
```

---

## 4. 전략 패턴

```typescript
interface PaymentStrategy {
  pay(amount: number): void;
}

class CreditCardPayment implements PaymentStrategy {
  pay(amount: number): void {
    console.log(`Paid ${amount} with credit card`);
  }
}

class PayPalPayment implements PaymentStrategy {
  pay(amount: number): void {
    console.log(`Paid ${amount} with PayPal`);
  }
}
```

---

## 5. 실무 팁

1. **과도한 사용 금지**: 패턴을 위한 패턴 사용 지양
2. **언어 특성 활용**: JavaScript/TypeScript의 특성을 활용
3. **간단함 우선**: 복잡한 패턴보다 간단한 해결책 선호

디자인 패턴은 "검증된 해결책을 재사용한다"는 철학을 따릅니다.

