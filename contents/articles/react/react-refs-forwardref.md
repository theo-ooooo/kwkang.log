---
title: "React ref와 forwardRef - DOM 접근과 컴포넌트 간 ref 전달"
date: "2026-02-10"
tag: "react,ref,forwardref"
---

React에서 DOM 요소에 직접 접근하거나, 자식 컴포넌트의 메서드를 호출할 때 `ref`를 사용합니다.  
이 글에서는 `useRef`, `forwardRef`, `useImperativeHandle`의 사용법과 실무 패턴을 정리합니다.

---

## 1. useRef 기본 사용법

```tsx
function TextInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>포커스</button>
    </>
  );
}
```

- `ref.current`는 DOM 요소나 컴포넌트 인스턴스를 가리킵니다.
- `null`로 초기화하고, 마운트 후에 값이 할당됩니다.

---

## 2. forwardRef로 ref 전달

함수 컴포넌트는 기본적으로 ref를 받을 수 없으므로, `forwardRef`로 래핑해야 합니다.

```tsx
const CustomInput = forwardRef<HTMLInputElement, { label: string }>(
  ({ label }, ref) => {
    return (
      <label>
        {label}
        <input ref={ref} type="text" />
      </label>
    );
  }
);
```

- `forwardRef`는 두 번째 인자로 `ref`를 받습니다.

---

## 3. useImperativeHandle로 커스텀 ref API

자식 컴포넌트가 부모에게 노출할 메서드를 제한할 수 있습니다.

```tsx
const CustomInput = forwardRef<{ focus: () => void }, { label: string }>(
  ({ label }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus();
      },
    }));

    return <input ref={inputRef} type="text" />;
  }
);
```

- 부모는 `ref.current.focus()`만 호출할 수 있고, 내부 `inputRef`는 접근할 수 없습니다.

---

## 4. ref를 통한 값 저장

`ref`는 DOM 접근뿐 아니라, **렌더링과 무관한 값**을 저장하는 데도 사용됩니다.

```tsx
function Timer() {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      console.log("tick");
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // intervalRef.current를 읽어도 리렌더링이 발생하지 않음
}
```

- `ref.current`를 변경해도 리렌더링이 발생하지 않습니다.

---

## 5. 실무 팁

1. **DOM 접근이 꼭 필요한가?**: 대부분의 경우 state/props로 해결 가능하므로, ref 사용을 최소화
2. **타입 안정성**: `useRef<HTMLInputElement>(null)`처럼 타입을 명시
3. **null 체크**: `ref.current?.`로 옵셔널 체이닝 사용

ref는 "명령형" 접근이 필요한 경우에만 사용하는 것이 좋습니다.  
대부분의 경우 React의 선언적 패러다임으로 해결할 수 있으므로, ref 사용 전에 "정말 필요한가?"를 한 번 더 생각해보세요.

