---
title: "통합 테스트 - 시스템 컴포넌트 간 상호작용 검증"
date: "2026-03-19"
tag: "testing,integration-test"
---

통합 테스트는 **여러 컴포넌트가 함께 동작하는지 검증**하는 테스트입니다.  
이 글에서는 통합 테스트 작성 방법과 실무 패턴을 정리합니다.

---

## 1. 통합 테스트 개념

- **단위 테스트**: 개별 함수/모듈
- **통합 테스트**: 여러 모듈의 상호작용
- **E2E 테스트**: 전체 시스템

---

## 2. API 통합 테스트

```javascript
const request = require("supertest");
const app = require("./app");

describe("API Integration", () => {
  it("should create and retrieve user", async () => {
    const res = await request(app)
      .post("/users")
      .send({ name: "kwkang" });
    
    expect(res.status).toBe(201);
    
    const getUserRes = await request(app)
      .get(`/users/${res.body.id}`);
    
    expect(getUserRes.body.name).toBe("kwkang");
  });
});
```

---

## 3. 데이터베이스 통합 테스트

```javascript
beforeEach(async () => {
  await db.migrate.latest();
  await db.seed.run();
});

afterEach(async () => {
  await db.migrate.rollback();
});
```

---

## 4. 실무 팁

1. **테스트 DB**: 프로덕션과 분리된 테스트 데이터베이스 사용
2. **트랜잭션**: 각 테스트 후 롤백하여 격리
3. **테스트 데이터**: Factory 패턴으로 테스트 데이터 생성
4. **성능**: 통합 테스트는 단위 테스트보다 느리므로 선택적 실행

통합 테스트는 "컴포넌트 간 상호작용을 검증한다"는 철학을 따릅니다.

