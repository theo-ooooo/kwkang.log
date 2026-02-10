---
title: "TDD - 테스트 주도 개발"
date: "2026-02-10"
tag: "testing,tdd"
---

TDD(Test-Driven Development)는 **테스트를 먼저 작성하고 코드를 작성**하는 개발 방법론입니다.  
이 글에서는 TDD의 원칙과 실무 적용 방법을 정리합니다.

---

## 1. TDD 사이클

1. **Red**: 실패하는 테스트 작성
2. **Green**: 테스트를 통과하는 최소 코드 작성
3. **Refactor**: 코드 개선

---

## 2. 예시

```javascript
// 1. Red: 실패하는 테스트
test("should calculate total price", () => {
  expect(calculateTotal([1, 2, 3])).toBe(6);
});

// 2. Green: 최소 구현
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item, 0);
}

// 3. Refactor: 개선
function calculateTotal(items) {
  if (!Array.isArray(items)) {
    throw new Error("Items must be an array");
  }
  return items.reduce((sum, item) => sum + item, 0);
}
```

---

## 3. TDD 장점

- **명확한 요구사항**: 테스트가 요구사항을 명확히 정의
- **리팩토링 안정성**: 테스트가 있으면 안심하고 리팩토링
- **설계 개선**: 테스트하기 쉬운 코드는 좋은 설계

---

## 4. 실무 팁

1. **작은 단위**: 한 번에 하나의 기능만 테스트
2. **빠른 피드백**: 테스트를 자주 실행
3. **점진적 적용**: 기존 코드에 점진적으로 TDD 적용

TDD는 "테스트가 코드를 이끈다"는 철학을 따릅니다.

