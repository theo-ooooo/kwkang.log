---
title: "마이크로서비스 아키텍처 - 분산 시스템 설계"
date: "2026-03-25"
tag: "architecture,microservices"
---

마이크로서비스는 **애플리케이션을 작은 독립적인 서비스로 분해**하는 아키텍처 패턴입니다.  
이 글에서는 마이크로서비스의 장단점과 실무 적용 방법을 정리합니다.

---

## 1. 마이크로서비스 특징

- **독립적 배포**: 각 서비스를 독립적으로 배포
- **기술 다양성**: 서비스마다 다른 기술 스택 사용 가능
- **확장성**: 필요한 서비스만 확장

---

## 2. 서비스 통신

```javascript
// 동기 통신 (HTTP/REST)
const userService = await fetch("http://user-service/api/users/1");

// 비동기 통신 (Message Queue)
await messageQueue.publish("user.created", { userId: 1 });
```

---

## 3. 서비스 발견

```yaml
# Docker Compose 예시
services:
  user-service:
    image: user-service:latest
  api-gateway:
    image: api-gateway:latest
    depends_on:
      - user-service
```

---

## 4. 데이터 관리

- **Database per Service**: 각 서비스가 독립적인 DB
- **Saga 패턴**: 분산 트랜잭션 관리

---

## 5. 실무 팁

1. **작은 시작**: 모놀리식에서 시작하여 점진적으로 분리
2. **API Gateway**: 외부 요청을 중앙에서 라우팅
3. **모니터링**: 분산 추적으로 서비스 간 호출 추적
4. **장애 처리**: Circuit Breaker 패턴으로 장애 격리

마이크로서비스는 "독립적으로 배포하고 확장한다"는 철학을 따릅니다.

