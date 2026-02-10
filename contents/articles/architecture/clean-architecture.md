---
title: "Clean Architecture - 의존성 규칙과 레이어 분리"
date: "2026-02-10"
tag: "architecture,clean-architecture"
---

Clean Architecture는 **의존성 규칙**을 통해 비즈니스 로직을 프레임워크와 독립적으로 만드는 아키텍처 패턴입니다.  
이 글에서는 Clean Architecture의 핵심 원칙과 실무 적용 방법을 정리합니다.

---

## 1. 레이어 구조

```
┌─────────────────┐
│   Presentation  │ (UI, Controllers)
├─────────────────┤
│  Application    │ (Use Cases)
├─────────────────┤
│     Domain      │ (Entities, Business Logic)
├─────────────────┤
│ Infrastructure  │ (DB, External APIs)
└─────────────────┘
```

- **의존성 방향**: 외부 → 내부 (Domain이 가장 독립적)

---

## 2. 의존성 규칙

```typescript
// Domain (의존성 없음)
interface UserRepository {
  findById(id: string): Promise<User>;
}

// Infrastructure (Domain에 의존)
class PostgresUserRepository implements UserRepository {
  async findById(id: string): Promise<User> {
    // DB 접근
  }
}

// Application (Domain에 의존)
class GetUserUseCase {
  constructor(private userRepo: UserRepository) {}
  async execute(id: string): Promise<User> {
    return this.userRepo.findById(id);
  }
}
```

---

## 3. 실무 적용

```typescript
// domain/entities/User.ts
export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string
  ) {}
}

// domain/repositories/UserRepository.ts
export interface UserRepository {
  findById(id: string): Promise<User>;
}

// application/use-cases/GetUser.ts
export class GetUserUseCase {
  constructor(private userRepo: UserRepository) {}
  async execute(id: string): Promise<User> {
    return this.userRepo.findById(id);
  }
}
```

---

## 4. 실무 팁

1. **인터페이스 우선**: Domain에서 인터페이스 정의
2. **의존성 역전**: 외부 레이어가 내부 레이어에 의존
3. **테스트 용이성**: 인터페이스로 쉽게 Mock 가능
4. **점진적 적용**: 기존 코드에 점진적으로 적용

Clean Architecture는 "비즈니스 로직을 독립적으로 만든다"는 철학을 따릅니다.

