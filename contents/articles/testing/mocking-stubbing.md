---
title: "Mocking과 Stubbing - 테스트 격리와 제어"
date: "2026-03-22"
tag: "testing,mocking,stubbing"
---

Mocking과 Stubbing은 **테스트를 격리**하고 외부 의존성을 제어하는 방법입니다.  
이 글에서는 Jest, Sinon 등을 활용한 모킹 패턴을 정리합니다.

---

## 1. Mock vs Stub vs Spy

- **Mock**: 행동을 검증하는 가짜 객체
- **Stub**: 특정 값을 반환하는 가짜 객체
- **Spy**: 실제 함수 호출을 추적

---

## 2. Jest Mock

```javascript
// 함수 모킹
const mockFn = jest.fn();
mockFn("arg");
expect(mockFn).toHaveBeenCalledWith("arg");

// 모듈 모킹
jest.mock("./api", () => ({
  fetchUser: jest.fn(),
}));
```

---

## 3. Sinon Stub

```javascript
const sinon = require("sinon");
const api = require("./api");

const stub = sinon.stub(api, "fetchUser");
stub.returns(Promise.resolve({ id: 1, name: "kwkang" }));
```

---

## 4. 실무 패턴

```javascript
// 시간 모킹
jest.useFakeTimers();
jest.advanceTimersByTime(1000);

// HTTP 요청 모킹
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: "test" }),
  })
);
```

---

## 5. 실무 팁

1. **최소한의 모킹**: 필요한 부분만 모킹
2. **실제 구현 유사**: Mock이 실제 구현과 유사하게 동작
3. **정리**: 테스트 후 Mock 정리 (afterEach)

모킹은 "테스트를 격리하고 제어한다"는 철학을 따릅니다.

