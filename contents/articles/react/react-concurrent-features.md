---
title: "React Concurrent Features - useTransition과 useDeferredValue"
date: "2026-02-10"
tag: "react,concurrent,useTransition,useDeferredValue"
---

React 18의 Concurrent Features는 **우선순위에 따라 렌더링을 조절**할 수 있게 해줍니다.  
`useTransition`과 `useDeferredValue`를 사용하면 사용자 입력을 즉시 반영하면서도, 무거운 업데이트는 지연시킬 수 있습니다.

---

## 1. useTransition으로 우선순위 조절

```tsx
import { useTransition, useState } from "react";

function SearchPage() {
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value); // 긴급한 업데이트 (즉시 반영)

    startTransition(() => {
      setSearchResults(value); // 긴급하지 않은 업데이트 (지연 가능)
    });
  };

  return (
    <div>
      <input value={query} onChange={handleChange} />
      {isPending && <div>검색 중...</div>}
      <SearchResults />
    </div>
  );
}
```

- `startTransition`으로 감싼 업데이트는 **낮은 우선순위**로 처리됩니다.
- `isPending`으로 전환 중인지 확인할 수 있습니다.

---

## 2. useDeferredValue로 값 지연

```tsx
import { useDeferredValue, useMemo } from "react";

function ProductList({ query }: { query: string }) {
  const deferredQuery = useDeferredValue(query);

  const filtered = useMemo(
    () => heavyFilter(products, deferredQuery),
    [products, deferredQuery]
  );

  return (
    <div>
      {query !== deferredQuery && <div>검색 중...</div>}
      <ul>
        {filtered.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

- `useDeferredValue`는 값의 업데이트를 지연시킵니다.
- 입력은 즉시 반영되지만, 필터링 결과는 지연되어 렌더링됩니다.

---

## 3. useTransition vs useDeferredValue

- **useTransition**: 상태 업데이트를 지연시킬 때 사용 (여러 상태를 한 번에 제어)
- **useDeferredValue**: 단일 값을 지연시킬 때 사용 (파생된 값에 적합)

---

## 4. 실무 활용: 검색 UI

```tsx
function SearchApp() {
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSearch = (value: string) => {
    setQuery(value); // 입력값은 즉시 업데이트
    startTransition(() => {
      // 검색 결과는 지연 업데이트
      performSearch(value);
    });
  };

  return (
    <div>
      <SearchInput onChange={handleSearch} />
      {isPending && <Spinner />}
      <SearchResults query={query} />
    </div>
  );
}
```

- 사용자가 타이핑하는 동안 UI가 멈추지 않고, 검색 결과는 백그라운드에서 처리됩니다.

---

## 5. 주의사항와 팁

1. **과도한 사용 금지**: 모든 업데이트를 transition으로 감쌀 필요는 없음
2. **측정**: 실제로 성능 개선이 있는지 React DevTools Profiler로 확인
3. **Suspense와 조합**: `Suspense`와 함께 사용하면 더 부드러운 로딩 경험 제공

Concurrent Features는 "사용자 입력을 막지 않으면서도 무거운 작업을 처리한다"는 목표를 달성하게 해줍니다.  
검색, 필터링, 리스트 렌더링 같은 인터랙티브한 UI에서 특히 유용합니다.

