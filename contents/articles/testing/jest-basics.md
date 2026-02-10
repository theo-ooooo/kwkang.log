---
title: "Jest 기초 - JavaScript 테스트 프레임워크"
date: "2026-02-10"
tag: "testing,jest"
---

Jest는 **JavaScript 테스트 프레임워크**로, 단위 테스트, 통합 테스트를 작성하고 실행할 수 있습니다.  
이 글에서는 Jest의 기본 사용법과 실무 패턴을 정리합니다.

---

## 1. 기본 테스트

```javascript
// math.test.js
function add(a, b) {
  return a + b;
}

test("adds 1 + 2 to equal 3", () => {
  expect(add(1, 2)).toBe(3);
});
```

---

## 2. 매처(Matcher)

```javascript
expect(2 + 2).toBe(4);
expect({ name: "kwkang" }).toEqual({ name: "kwkang" });
expect("hello").toContain("ell");
expect(true).toBeTruthy();
```

---

## 3. 비동기 테스트

```javascript
test("async test", async () => {
  const data = await fetchData();
  expect(data).toBe("expected");
});

test("promise test", () => {
  return fetchData().then((data) => {
    expect(data).toBe("expected");
  });
});
```

---

## 4. Mock

```javascript
const mockFn = jest.fn();
mockFn("arg1", "arg2");

expect(mockFn).toHaveBeenCalledWith("arg1", "arg2");

// 모듈 모킹
jest.mock("./api");
```

---

## 5. 실무 팁

1. **테스트 구조**: AAA 패턴 (Arrange, Act, Assert)
2. **테스트 격리**: 각 테스트는 독립적으로 실행
3. **커버리지**: `--coverage` 옵션으로 커버리지 확인
4. **스냅샷**: UI 컴포넌트 테스트에 스냅샷 사용

Jest는 "테스트를 쉽게 작성하고 실행한다"는 철학을 따릅니다.

