---
title: "React Context 성능 최적화 - 리렌더 줄이는 실전 패턴"
date: "2026-02-10"
tag: "react,context,performance"
---

Context는 전역 상태처럼 편하지만, 설계가 나쁘면 작은 변경에도 트리 전체가 리렌더될 수 있습니다.  
이 글은 Context 사용 시 성능을 안정적으로 유지하는 패턴만 짧게 정리합니다.

---

## 1. 문제가 되는 구조

- 큰 객체를 한 Context에 몰아 넣기
- Provider value가 렌더마다 새로 생성되기

---

## 2. 1차 처방: Provider value 안정화

```tsx
const value = useMemo(() => ({ user, setUser }), [user]);
return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
```

---

## 3. 근본 처방: Context 쪼개기

- 자주 바뀌는 값과 거의 안 바뀌는 값을 분리
- 예: `AuthContext`, `ThemeContext`, `FeatureFlagContext`

---

## 4. 체크리스트

1. Provider value가 매번 새 객체가 되지 않는가?
2. 소비자(consumer)가 정말 그 값이 필요한가?
3. “자주 바뀌는 값”을 별도 Context로 분리했는가?


