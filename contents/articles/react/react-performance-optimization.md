---
title: "React 성능 최적화 - 렌더링 최소화와 메모이제이션 전략"
date: "2026-02-10"
tag: "react,performance,optimization"
---

React 애플리케이션의 성능을 개선하려면 **불필요한 렌더링을 줄이고**, 비용이 큰 계산을 메모이제이션하는 것이 핵심입니다.  
이 글에서는 실무에서 자주 사용하는 성능 최적화 기법들을 정리합니다.

---

## 1. React.memo로 컴포넌트 메모이제이션

```tsx
const ExpensiveComponent = React.memo(({ data }: { data: Data }) => {
  return <div>{/* 무거운 렌더링 */}</div>;
}, (prevProps, nextProps) => {
  // 커스텀 비교 함수 (선택적)
  return prevProps.data.id === nextProps.data.id;
});
```

- props가 변경되지 않으면 리렌더링을 건너뜁니다.
- 얕은 비교(shallow comparison)를 기본으로 사용하지만, 커스텀 비교 함수도 제공 가능합니다.

---

## 2. useMemo와 useCallback 활용

```tsx
function ProductList({ items, filter }: Props) {
  // 비싼 필터링 계산을 메모이제이션
  const filteredItems = useMemo(
    () => items.filter((item) => item.category === filter),
    [items, filter]
  );

  // 자식 컴포넌트에 전달하는 함수를 메모이제이션
  const handleClick = useCallback((id: string) => {
    onItemClick(id);
  }, [onItemClick]);

  return (
    <ul>
      {filteredItems.map((item) => (
        <ProductItem key={item.id} item={item} onClick={handleClick} />
      ))}
    </ul>
  );
}
```

- `useMemo`: 계산 결과를 메모이제이션
- `useCallback`: 함수를 메모이제이션

---

## 3. 가상화(Virtualization)로 긴 리스트 최적화

```tsx
import { FixedSizeList } from "react-window";

function LongList({ items }: { items: Item[] }) {
  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    >
      {({ index, style }) => (
        <div style={style}>{items[index].name}</div>
      )}
    </FixedSizeList>
  );
}
```

- 화면에 보이는 항목만 렌더링하여, 수천 개의 아이템도 부드럽게 스크롤할 수 있습니다.

---

## 4. 코드 스플리팅과 지연 로딩

```tsx
const HeavyComponent = lazy(() => import("./HeavyComponent"));

function App() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

- `React.lazy`와 `Suspense`로 컴포넌트를 필요할 때만 로드합니다.

---

## 5. 성능 측정과 프로파일링

```tsx
import { Profiler } from "react";

function onRenderCallback(
  id: string,
  phase: "mount" | "update",
  actualDuration: number
) {
  console.log(`${id} (${phase}): ${actualDuration}ms`);
}

<Profiler id="ProductList" onRender={onRenderCallback}>
  <ProductList />
</Profiler>
```

- React DevTools Profiler로 렌더링 시간을 측정하고 병목을 찾습니다.

---

## 6. 실무 체크리스트

1. **측정 후 최적화**: 성능 문제가 실제로 발생했는지 확인
2. **메모이제이션 남용 금지**: 모든 곳에 `useMemo`/`useCallback`을 붙이지 말 것
3. **리스트 가상화**: 100개 이상의 아이템이 있다면 가상화 고려
4. **번들 크기**: 코드 스플리팅으로 초기 로딩 시간 단축

성능 최적화는 "과도한 최적화는 악"이라는 원칙을 기억하세요.  
먼저 정확한 측정을 하고, 실제 병목이 있는 부분만 최적화하는 것이 중요합니다.

