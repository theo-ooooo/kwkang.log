---
title: "React Hooks 베스트 프랙티스 - 실무에서 자주 놓치는 포인트"
date: "2026-02-11"
tag: "react,hooks,best-practices"
---

React Hooks는 함수 컴포넌트에서 상태와 생명주기를 다루는 강력한 도구입니다.  
이 글에서는 `useState`, `useEffect`, `useCallback`, `useMemo` 등을 실무에서 올바르게 사용하는 방법과 자주 발생하는 실수들을 정리합니다.

---

## 1. useState 초기값과 함수형 업데이트

```tsx
// ❌ 나쁜 예: 객체를 직접 수정
const [user, setUser] = useState({ name: "", age: 0 });
setUser({ ...user, name: "kwkang" });

// ✅ 좋은 예: 함수형 업데이트
setUser((prev) => ({ ...prev, name: "kwkang" }));
```

- 함수형 업데이트는 **이전 상태를 기반으로** 안전하게 업데이트할 수 있습니다.
- 여러 `setState`가 연속으로 호출될 때도 최신 상태를 보장합니다.

---

## 2. useEffect 의존성 배열 관리

```tsx
// ❌ 나쁜 예: 의존성 누락
useEffect(() => {
  fetchData(userId);
}, []); // userId가 바뀌어도 재실행 안 됨

// ✅ 좋은 예: 의존성 명시
useEffect(() => {
  fetchData(userId);
}, [userId]);
```

- ESLint의 `exhaustive-deps` 규칙을 활성화하고 경고를 무시하지 말 것
- 함수나 객체를 의존성에 넣을 때는 `useCallback`/`useMemo`로 메모이제이션 고려

---

## 3. useCallback과 useMemo 남용 주의

```tsx
// ❌ 나쁜 예: 모든 함수를 메모이제이션
const handleClick = useCallback(() => {
  console.log("clicked");
}, []);

// ✅ 좋은 예: 자식 컴포넌트에 props로 전달하거나, 의존성이 복잡할 때만
const handleClick = useCallback(() => {
  onItemClick(id);
}, [id, onItemClick]);
```

- 메모이제이션 자체도 비용이 있으므로, **성능 문제가 실제로 발생했을 때**만 적용
- `useMemo`는 계산이 비싸고 의존성이 자주 바뀌지 않을 때만 사용

---

## 4. 커스텀 훅으로 로직 분리

```tsx
function useUser(userId: string) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser(userId).then(setUser).finally(() => setLoading(false));
  }, [userId]);

  return { user, loading };
}
```

- 재사용 가능한 로직을 커스텀 훅으로 분리하면 테스트와 유지보수가 쉬워집니다.

---

## 5. 실무 체크리스트

1. `useEffect`의 의존성 배열을 항상 확인할 것
2. `useState`의 초기값이 함수 호출이라면 `useState(() => expensive())` 형태로 지연 초기화
3. 여러 상태가 함께 바뀌면 `useReducer` 고려
4. 컴포넌트가 언마운트될 때 정리(cleanup)가 필요한 작업은 `useEffect`의 return 함수로 처리

React Hooks는 "선언적"이고 "함수형" 스타일로 컴포넌트를 작성할 수 있게 해주지만,  
의존성 관리와 메모이제이션 전략을 올바르게 이해하는 것이 중요합니다.

