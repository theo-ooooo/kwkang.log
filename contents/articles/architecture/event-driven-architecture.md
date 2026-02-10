---
title: "이벤트 기반 아키텍처 - 느슨한 결합과 확장성"
date: "2026-02-10"
tag: "architecture,event-driven"
---

이벤트 기반 아키텍처는 **이벤트를 통해 서비스 간 통신**하는 패턴입니다.  
이 글에서는 이벤트 버스, 메시지 큐, 이벤트 소싱 등을 정리합니다.

---

## 1. 이벤트 버스

```javascript
class EventBus {
  private handlers = new Map();

  subscribe(eventType, handler) {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, []);
    }
    this.handlers.get(eventType).push(handler);
  }

  publish(eventType, data) {
    const handlers = this.handlers.get(eventType) || [];
    handlers.forEach((handler) => handler(data));
  }
}
```

---

## 2. 메시지 큐

```javascript
// RabbitMQ, Kafka 등
await messageQueue.publish("user.created", {
  userId: 1,
  email: "user@example.com",
});

// 구독
messageQueue.subscribe("user.created", async (event) => {
  await sendWelcomeEmail(event.email);
});
```

---

## 3. 이벤트 소싱

```typescript
class User {
  private events: Event[] = [];

  create(name: string, email: string): void {
    this.events.push(new UserCreatedEvent(name, email));
  }

  changeEmail(newEmail: string): void {
    this.events.push(new EmailChangedEvent(newEmail));
  }

  getEvents(): Event[] {
    return this.events;
  }
}
```

---

## 4. 실무 활용

- **비동기 처리**: 무거운 작업을 백그라운드에서 처리
- **서비스 간 통신**: 느슨한 결합으로 서비스 통신
- **이벤트 재생**: 이벤트 소싱으로 상태 복원

---

## 5. 실무 팁

1. **이벤트 순서**: 순서가 중요한 경우 순서 보장 메커니즘 사용
2. **중복 처리**: 멱등성(idempotency) 보장
3. **에러 처리**: 실패한 이벤트 재시도 메커니즘

이벤트 기반 아키텍처는 "느슨한 결합으로 확장성을 확보한다"는 철학을 따릅니다.

