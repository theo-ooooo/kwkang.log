---
title: React useMemo, useCallback, memo 차이점
date: "2023-11-26"
tag: "react,useMemo, useCallback, memo"
---

`useCallback`, `useMemo`, 그리고 `memo`는 모두 React에서 성능 최적화를 위해 사용되는 도구이지만, 각각의 목적과 사용 사례가 다릅니다. 아래에서 그 차이점을 설명하겠습니다.

---

### **1. useCallback**

- **목적**: 함수를 메모이제이션하여 불필요한 재생성을 방지.
- **사용 대상**: 함수.
- **사용 예시**:

  ```jsx
  import React, { useCallback } from "react";

  const MyComponent = () => {
    const handleClick = useCallback(() => {
      console.log("Button clicked");
    }, []); // 의존성 배열이 비어있으면 컴포넌트가 리렌더링 되어도 동일한 함수가 유지됨.

    return <button onClick={handleClick}>Click me</button>;
  };
  ```

- **언제 사용하나?**
  - 자식 컴포넌트에 콜백 함수를 props로 전달할 때.
  - 동일한 함수 참조가 필요한 상황에서, 함수가 매번 새로 생성되지 않도록 방지.

---

### **2. useMemo**

- **목적**: 값의 계산 결과를 메모이제이션하여 불필요한 재계산을 방지.
- **사용 대상**: 계산된 값(비용이 큰 연산의 결과).
- **사용 예시**:

  ```jsx
  import React, { useMemo } from "react";

  const MyComponent = ({ items }) => {
    const sortedItems = useMemo(() => {
      return items.sort((a, b) => a - b); // 정렬 로직이 비싸다고 가정
    }, [items]); // items가 변경될 때만 다시 계산

    return <div>{sortedItems.join(", ")}</div>;
  };
  ```

- **언제 사용하나?**
  - 비용이 큰 계산(정렬, 필터링 등)의 결과를 메모이제이션하여 최적화할 때.
  - 계산 결과가 동일한 경우 재계산을 방지하고 이전 결과를 재사용하고자 할 때.

---

### **3. memo**

- **목적**: 컴포넌트를 메모이제이션하여 불필요한 재렌더링을 방지.
- **사용 대상**: React 컴포넌트.
- **사용 예시**:

  ```jsx
  import React, { memo } from "react";

  const ChildComponent = ({ name }) => {
    console.log("ChildComponent 렌더링");
    return <div>{name}</div>;
  };

  const MemoizedChild = memo(ChildComponent);

  const ParentComponent = () => {
    return <MemoizedChild name='John' />;
  };
  ```

- **언제 사용하나?**
  - 부모 컴포넌트가 리렌더링되어도, 자식 컴포넌트의 props가 변경되지 않았다면 자식 컴포넌트를 재렌더링하지 않도록 하고 싶을 때.
  - props의 변경 여부를 기준으로 컴포넌트 리렌더링을 방지.

---

### **차이점 요약**

| Hook/Utility    | 사용 대상      | 목적                              | 주요 사용 사례                              |
| --------------- | -------------- | --------------------------------- | ------------------------------------------- |
| **useCallback** | 함수           | 함수 재생성을 방지                | 자식 컴포넌트에 props로 함수를 전달할 때    |
| **useMemo**     | 계산된 값      | 비용이 큰 계산의 결과 재사용      | 정렬, 필터링 등 복잡한 계산의 최적화        |
| **memo**        | React 컴포넌트 | 컴포넌트의 불필요한 재렌더링 방지 | props 변경이 없을 때 컴포넌트 리렌더링 방지 |

---

### **함께 사용하는 경우**

이 세 가지는 종종 함께 사용됩니다. 예를 들어, `memo`로 감싼 자식 컴포넌트에 `useCallback`이나 `useMemo`로 최적화된 props를 전달하여 성능을 극대화할 수 있습니다.

```jsx
import React, { memo, useCallback, useMemo } from "react";

const ChildComponent = memo(({ items, onClick }) => {
  console.log("ChildComponent 렌더링");
  return <button onClick={onClick}>{items.join(", ")}</button>;
});

const ParentComponent = () => {
  const items = useMemo(() => ["Apple", "Banana", "Cherry"], []);
  const handleClick = useCallback(() => {
    console.log("Button clicked");
  }, []);

  return <ChildComponent items={items} onClick={handleClick} />;
};
```

위 코드에서:

- `useMemo`는 `items`의 메모이제이션을 보장.
- `useCallback`은 `handleClick` 함수의 재생성을 방지.
- `memo`는 `ChildComponent`의 불필요한 재렌더링을 막음.
