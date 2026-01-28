---
title: "React 18 정리 - Concurrent Rendering과 실무 포인트"
date: "2026-01-28"
tag: "react,react18"
---

React 18은 **Concurrent Rendering**과 **자동 배칭**, `Suspense` 개선 등을 통해 UI를 더 부드럽게 만들고, 서버 렌더링을 강화한 버전입니다.  
Next.js 13+ / 16 같은 프레임워크에서도 React 18 기능을 전제로 설계되어 있기 때문에, 핵심 개념은 꼭 알고 있어야 합니다.

---

## 1. 자동 배칭(Automatic Batching)

이전 버전에서는 이벤트 핸들러 안에서만 `setState`가 자동 배칭되었지만, React 18부터는 **비동기 코드 전반**에서 자동으로 배칭이 동작합니다.

```tsx
setTimeout(() => {
  setCount((c) => c + 1);
  setFlag((f) => !f);
  // React 18부터는 한 번의 렌더링으로 묶어서 처리
}, 1000);
```

- 장점: 불필요한 렌더링 감소 → 성능 향상
- 실무에서는 렌더 횟수에 의존하는 로직(예: 로그) 작성 시 주의

---

## 2. Concurrent Rendering 개념

Concurrent Rendering은 “**렌더링을 쪼개서 더 유연하게 처리하는 모드**” 정도로 이해하면 됩니다.

- React가 무거운 작업을 한 번에 끝까지 밀어붙이지 않고,  
  사용자 입력, 애니메이션 등 **긴급한 업데이트를 먼저 처리**할 수 있도록 스케줄링
- 개발자는 `useTransition`, `Suspense` 등을 통해 우선순위를 조절

```tsx
const [isPending, startTransition] = useTransition();

function handleChange(nextValue: string) {
  // 긴급하지 않은 업데이트를 transition으로 감싼다
  startTransition(() => {
    setSearch(nextValue);
  });
}
```

- `isPending`을 사용해 “로딩 중” 상태를 UI에 반영할 수 있습니다.

---

## 3. Suspense와 데이터 로딩

React 18에서는 `Suspense`가 데이터 로딩과도 자연스럽게 어울리도록 개선되었습니다.  
Next.js 16의 서버 컴포넌트/스트리밍과 함께 사용하는 경우가 많습니다.

```tsx
import { Suspense } from "react";

function SlowComponent() {
  // 데이터 패칭 등 시간이 걸리는 작업
  // 프레임워크에서 throw Promise 패턴으로 처리할 수 있음
  return <div>완료된 데이터</div>;
}

export default function Page() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <SlowComponent />
    </Suspense>
  );
}
```

- **핵심**: “느린 컴포넌트를 잘라서 Suspense로 감싸고, 그동안 보여줄 fallback을 제공한다”

---

## 4. useId, useDeferredValue

### 4-1. `useId`

접근성(aria, label)이나 포털 등에서 **고유한 ID**가 필요할 때 사용합니다.  
SSR/CSR에서 일관된 ID를 보장합니다.

```tsx
import { useId } from "react";

function NameField() {
  const id = useId();
  return (
    <>
      <label htmlFor={id}>이름</label>
      <input id={id} type="text" />
    </>
  );
}
```

### 4-2. `useDeferredValue`

입력값은 즉시 반영하되, **비싼 계산/렌더링은 지연**시키고 싶을 때 사용합니다.

```tsx
const [query, setQuery] = useState("");
const deferredQuery = useDeferredValue(query);

const filtered = useMemo(
  () => heavyFilter(items, deferredQuery),
  [items, deferredQuery]
);
```

- 사용자가 입력하는 동안 UI가 버벅이지 않도록 도와줍니다.

---

## 5. 실무에서 React 18을 사용할 때의 팁

1. 렌더링 횟수와 순서에 의존하는 코드는 최대한 피할 것  
2. 무거운 리스트/검색/필터 UI는 `useTransition`, `useDeferredValue` 활용을 검토  
3. Next.js App Router 환경이라면, **서버 컴포넌트 + Suspense + 스트리밍** 조합을 적극 이용  
4. 기존 코드 마이그레이션 시, 자동 배칭으로 인해 디버깅 포인트가 달라질 수 있으니  
   “언제 렌더가 몇 번 일어나는지”를 먼저 로그로 확인하고 적용

React 18은 API 추가보다 **렌더링 모델 자체의 변화**에 가깝기 때문에,  
기능 하나하나를 외우기보다 “React가 렌더링을 더 유연하게 스케줄링한다”는 관점에서 이해하는 것이 도움이 됩니다.


