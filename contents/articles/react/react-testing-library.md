---
title: "React Testing Library - 사용자 중심 테스트 작성하기"
date: "2026-02-10"
tag: "react,testing,testing-library"
---

React Testing Library는 **사용자가 컴포넌트를 어떻게 사용하는지**를 중심으로 테스트를 작성하도록 유도하는 테스트 도구입니다.  
구현 세부사항보다는 사용자 관점의 동작을 검증하는 것이 핵심 철학입니다.

---

## 1. 기본 사용법

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Counter } from "./Counter";

test("카운터가 증가한다", async () => {
  const user = userEvent.setup();
  render(<Counter />);

  const button = screen.getByRole("button", { name: /증가/i });
  await user.click(button);

  expect(screen.getByText("1")).toBeInTheDocument();
});
```

- `screen.getByRole`, `screen.getByText` 등으로 요소를 찾습니다.
- `userEvent`로 사용자 상호작용을 시뮬레이션합니다.

---

## 2. 쿼리 우선순위

React Testing Library는 접근성 관점에서 쿼리 우선순위를 제안합니다.

1. `getByRole` (가장 권장)
2. `getByLabelText`
3. `getByPlaceholderText`
4. `getByText`
5. `getByTestId` (최후의 수단)

```tsx
// ✅ 좋은 예
const button = screen.getByRole("button", { name: "제출" });

// ❌ 나쁜 예
const button = screen.getByTestId("submit-button");
```

---

## 3. 비동기 작업 테스트

```tsx
test("데이터를 불러온다", async () => {
  render(<UserList />);

  // 데이터가 로드될 때까지 대기
  const user = await screen.findByText("kwkang");
  expect(user).toBeInTheDocument();
});
```

- `findBy*` 쿼리는 비동기적으로 요소를 찾습니다 (기본 timeout: 1000ms).

---

## 4. Mock과 MSW 활용

```tsx
import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.get("/api/users", (req, res, ctx) => {
    return res(ctx.json([{ id: 1, name: "kwkang" }]));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

- MSW(Mock Service Worker)로 API를 모킹하면 실제 네트워크 요청 없이 테스트할 수 있습니다.

---

## 5. 커스텀 훅 테스트

```tsx
import { renderHook, act } from "@testing-library/react";
import { useCounter } from "./useCounter";

test("카운터 훅이 동작한다", () => {
  const { result } = renderHook(() => useCounter());

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);
});
```

- `renderHook`으로 커스텀 훅을 독립적으로 테스트할 수 있습니다.

---

## 6. 실무 팁

1. **사용자 관점**: "사용자가 이 화면에서 무엇을 할 수 있는가?"를 중심으로 테스트 작성
2. **접근성**: `getByRole`을 우선 사용하면 접근성도 함께 검증
3. **테스트 격리**: 각 테스트는 독립적으로 실행되어야 함
4. **과도한 테스트 금지**: 구현 세부사항보다는 사용자 시나리오 중심

React Testing Library는 "테스트가 사용자와 가까울수록 더 신뢰할 수 있다"는 철학을 따릅니다.  
컴포넌트의 내부 구현이 바뀌어도, 사용자 관점의 테스트는 계속 통과할 가능성이 높습니다.

