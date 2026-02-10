---
title: "단위 테스트 - 함수와 모듈 테스트 작성"
date: "2026-03-18"
tag: "testing,unit-test"
---

단위 테스트는 **개별 함수나 모듈을 독립적으로 테스트**하는 방법입니다.  
이 글에서는 단위 테스트 작성 원칙과 실무 패턴을 정리합니다.

---

## 1. 테스트 원칙

- **격리**: 외부 의존성 없이 테스트
- **빠름**: 빠르게 실행되어야 함
- **반복 가능**: 항상 같은 결과
- **명확함**: 테스트 의도가 명확해야 함

---

## 2. 테스트 구조

```javascript
describe("Calculator", () => {
  describe("add", () => {
    it("should add two positive numbers", () => {
      expect(add(1, 2)).toBe(3);
    });

    it("should handle negative numbers", () => {
      expect(add(-1, -2)).toBe(-3);
    });
  });
});
```

---

## 3. Mock과 Stub

```javascript
// 의존성 모킹
jest.mock("./api", () => ({
  fetchUser: jest.fn(() => Promise.resolve({ id: 1, name: "kwkang" })),
}));
```

---

## 4. 테스트 커버리지

```bash
npm test -- --coverage
```

- 목표 커버리지: 80% 이상 (비즈니스 로직)

---

## 5. 실무 팁

1. **테스트 우선**: TDD로 테스트 먼저 작성
2. **경계값 테스트**: 최소값, 최대값, null 등 테스트
3. **에러 케이스**: 예외 상황도 테스트
4. **리팩토링**: 테스트가 있으면 안심하고 리팩토링 가능

단위 테스트는 "작은 단위를 신뢰할 수 있게 만든다"는 철학을 따릅니다.

