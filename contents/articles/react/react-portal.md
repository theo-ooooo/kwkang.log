---
title: "React Portal - DOM 트리 밖으로 컴포넌트 렌더링하기"
date: "2026-02-10"
tag: "react,portal,dom"
---

React Portal은 컴포넌트를 **부모 컴포넌트의 DOM 계층 구조 밖**에 렌더링할 수 있게 해주는 기능입니다.  
모달, 툴팁, 드롭다운 같은 UI 요소를 z-index 문제 없이 구현할 때 유용합니다.

---

## 1. Portal 기본 사용법

```tsx
import { createPortal } from "react-dom";

function Modal({ children, isOpen }: { children: React.ReactNode; isOpen: boolean }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-content">{children}</div>
    </div>,
    document.body
  );
}
```

- `createPortal(children, container)` 형태로 사용
- `container`는 DOM 요소여야 합니다 (예: `document.body`, `document.getElementById('modal-root')`)

---

## 2. 이벤트 버블링과 Portal

Portal로 렌더링된 요소도 **React 이벤트 시스템**을 따릅니다.

```tsx
function Parent() {
  const handleClick = () => console.log("Parent clicked");

  return (
    <div onClick={handleClick}>
      <Modal>내용</Modal> {/* Portal로 body에 렌더링되지만, 이벤트는 부모로 버블링됨 */}
    </div>
  );
}
```

- 이벤트는 React 트리 구조를 따라 버블링되므로, Portal을 사용해도 이벤트 핸들링이 가능합니다.

---

## 3. 실무 활용: 모달 구현

```tsx
function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>모달 열기</button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2>모달 제목</h2>
        <p>모달 내용</p>
      </Modal>
    </>
  );
}
```

- 모달은 보통 `document.body`에 렌더링하여 z-index 문제를 피합니다.

---

## 4. Portal과 접근성(a11y)

```tsx
function Modal({ children, isOpen, onClose }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // 배경 스크롤 방지
      // 포커스 트랩 설정
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return createPortal(
    <div role="dialog" aria-modal="true">
      {children}
    </div>,
    document.body
  );
}
```

- `role="dialog"`, `aria-modal` 등 접근성 속성을 추가해야 합니다.

---

## 5. 실무 팁

1. **Portal 컨테이너 관리**: SSR 환경에서는 `document`가 없을 수 있으므로, `useEffect` 내에서 Portal을 사용
2. **여러 Portal**: 여러 모달이 동시에 열릴 때는 각각 다른 컨테이너에 렌더링 고려
3. **애니메이션**: Portal로 렌더링된 요소도 CSS transition/animation 적용 가능

Portal은 "렌더링 위치"와 "이벤트 버블링"을 분리할 수 있게 해주는 강력한 기능입니다.  
모달, 툴팁 같은 오버레이 UI를 구현할 때 필수적으로 알아야 하는 개념입니다.

