---
title: "React에서 getBoundingClientRect 활용하기"
date: "2024-11-29"
tag: "react"
---

### React에서 `getBoundingClientRect` 활용하기

`getBoundingClientRect`는 DOM 요소의 크기와 화면에서의 위치를 정확히 파악할 수 있는 메서드입니다. 이 메서드는 React에서 특정 요소가 화면에 보이는지 감지하거나, Lazy Loading, 애니메이션 트리거 등을 구현할 때 매우 유용합니다. 아래는 `getBoundingClientRect`를 활용한 다양한 React 예제입니다.

---

### **1. 요소가 화면에 보이는지 확인하기**

아래 코드는 특정 요소가 화면에 보이는지 여부를 감지하는 컴포넌트입니다.

```tsx
import { useEffect, useRef, useState } from "react";

const InViewportComponent = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const checkVisibility = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setIsVisible(rect.top >= 0 && rect.bottom <= window.innerHeight);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkVisibility);
    checkVisibility(); // 초기 상태 확인

    return () => {
      window.removeEventListener("scroll", checkVisibility);
    };
  }, []);

  return (
    <div>
      <div style={{ height: "150vh", background: "#f0f0f0" }}>
        스크롤해서 아래 박스를 확인하세요.
      </div>
      <div
        ref={ref}
        style={{
          height: "100px",
          background: isVisible ? "lightgreen" : "lightcoral",
          textAlign: "center",
          lineHeight: "100px",
        }}
      >
        {isVisible ? "보이는 상태!" : "보이지 않는 상태"}
      </div>
      <div style={{ height: "150vh", background: "#f0f0f0" }}></div>
    </div>
  );
};

export default InViewportComponent;
```

---

### **2. Lazy Loading 이미지 구현하기**

이 코드는 이미지가 화면에 나타났을 때 로드하는 Lazy Loading 컴포넌트입니다.

```tsx
import { useEffect, useRef, useState } from "react";

const LazyImage = ({
  src,
  placeholder,
  alt,
}: {
  src: string;
  placeholder: string;
  alt: string;
}) => {
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  const checkVisibility = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setLoaded(true);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkVisibility);
    checkVisibility(); // 초기 상태 확인

    return () => {
      window.removeEventListener("scroll", checkVisibility);
    };
  }, []);

  return (
    <img
      ref={ref}
      src={loaded ? src : placeholder}
      alt={alt}
      style={{
        width: "100%",
        height: "auto",
        transition: "opacity 0.3s",
        opacity: loaded ? 1 : 0.5,
      }}
    />
  );
};

const LazyImageExample = () => {
  return (
    <div>
      <div style={{ height: "150vh", background: "#f0f0f0" }}>
        스크롤해서 이미지를 확인하세요.
      </div>
      <LazyImage
        src='https://via.placeholder.com/800x400?text=Real+Image'
        placeholder='https://via.placeholder.com/800x400?text=Loading...'
        alt='Lazy Loaded Example'
      />
      <div style={{ height: "150vh", background: "#f0f0f0" }}></div>
    </div>
  );
};

export default LazyImageExample;
```

---

### **3. 요소 진입 시 애니메이션 실행**

화면에 특정 요소가 나타났을 때 애니메이션을 실행하는 예제입니다.

```tsx
import { useEffect, useRef, useState } from "react";

const AnimatedBox = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const checkVisibility = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setIsVisible(rect.top < window.innerHeight && rect.bottom > 0);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkVisibility);
    checkVisibility();

    return () => {
      window.removeEventListener("scroll", checkVisibility);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        width: "200px",
        height: "200px",
        background: "blue",
        margin: "100px auto",
        transform: isVisible ? "translateY(0)" : "translateY(50px)",
        opacity: isVisible ? 1 : 0,
        transition: "all 0.5s ease",
      }}
    ></div>
  );
};

const AnimatedBoxExample = () => {
  return (
    <div>
      <div style={{ height: "150vh", background: "#f0f0f0" }}>
        스크롤해서 박스를 확인하세요.
      </div>
      <AnimatedBox />
      <div style={{ height: "150vh", background: "#f0f0f0" }}></div>
    </div>
  );
};

export default AnimatedBoxExample;
```

---

### **핵심 포인트**

1. **`useRef` 사용**: DOM 요소를 참조하기 위해 `useRef`를 사용합니다.
2. **스크롤 이벤트 활용**: `window.addEventListener("scroll", ...)`로 스크롤을 감지하고 요소의 상태를 업데이트합니다.
3. **`getBoundingClientRect`로 위치 계산**: 요소의 `top`, `bottom` 값을 기준으로 화면에 보이는지 여부를 판단합니다.
4. **초기 상태 확인**: 컴포넌트가 마운트되었을 때 `checkVisibility`를 호출하여 초기 상태를 확인합니다.
