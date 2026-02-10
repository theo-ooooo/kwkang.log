---
title: "React 상태 파생(derived state) vs memo - 어디에 두는 게 맞을까?"
date: "2026-02-10"
tag: "react,state,usememo"
---

React에서 자주 생기는 실수는 “계산 가능한 값”을 별도 state로 들고 가면서 **동기화 버그**를 만드는 것입니다.  
이 글은 derived state를 피하는 기준과, `useMemo`/계산 함수를 어디에 둘지 판단하는 실무 규칙을 정리합니다.

---

## 1. 결론부터

- 파생 가능한 값은 **state로 두지 말고 계산**한다
- 계산이 비싸서 병목이 보일 때만 `useMemo`를 고려한다
- 서버에서 온 데이터는 “원본(source of truth)”만 state로 둔다

---

## 2. 흔한 안티패턴: 동기화 state

- props/state로부터 구할 수 있는 값을 또 state로 만들면
  - 업데이트 순서에 따라 값이 어긋나고
  - `useEffect`로 맞추다 로직이 복잡해집니다

---

## 3. 추천 패턴: 계산 함수 + 선택적 memo

```tsx
const filtered = useMemo(() => {
  return items.filter((x) => x.name.includes(query));
}, [items, query]);
```

- 먼저 memo 없이 계산해도 되는지 확인
- “렌더가 느리다”가 **측정으로 확인**되면 memo 적용

---

## 4. 체크리스트

1. 이 값은 원본 데이터인가, 계산 결과인가?
2. 이 값이 어긋날 수 있는 업데이트 경로가 있는가?
3. 성능 문제가 재현되고 측정되었는가?


