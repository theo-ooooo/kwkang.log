---
title: "React Error Boundary - 에러 처리와 사용자 경험 개선"
date: "2026-02-10"
tag: "react,error-boundary,error-handling"
---

React에서 컴포넌트 렌더링 중 발생한 에러를 **우아하게 처리**하고, 앱 전체가 크래시되지 않도록 보호하는 방법을 Error Boundary로 구현할 수 있습니다.  
이 글에서는 Error Boundary의 기본 개념과 실무에서 활용하는 패턴을 정리합니다.

---

## 1. Error Boundary란?

Error Boundary는 **클래스 컴포넌트**로만 구현 가능하며, `componentDidCatch`와 `static getDerivedStateFromError`를 사용합니다.

```tsx
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught:", error, errorInfo);
    // 에러 로깅 서비스로 전송
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>에러가 발생했습니다.</div>;
    }
    return this.props.children;
  }
}
```

---

## 2. 함수 컴포넌트에서 Error Boundary 사용

함수 컴포넌트에서는 직접 Error Boundary를 만들 수 없지만, 클래스 컴포넌트로 래핑해서 사용합니다.

```tsx
function App() {
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <UserProfile />
      <ProductList />
    </ErrorBoundary>
  );
}
```

- `react-error-boundary` 같은 라이브러리를 사용하면 더 간편하게 구현할 수 있습니다.

---

## 3. 실무 활용 패턴

### 3-1. 페이지 단위 Error Boundary

```tsx
<ErrorBoundary fallback={<PageError />}>
  <ProductPage />
</ErrorBoundary>
```

### 3-2. 위젯 단위 Error Boundary

```tsx
<ErrorBoundary fallback={<WidgetError />}>
  <RecommendationWidget />
</ErrorBoundary>
```

- 작은 단위로 나누면, 한 부분이 에러가 나도 다른 부분은 정상 동작합니다.

---

## 4. Error Boundary가 잡지 못하는 에러

- 이벤트 핸들러 내부 에러
- 비동기 코드(setTimeout, Promise)
- 서버 사이드 렌더링 에러
- Error Boundary 자체의 에러

이런 경우에는 `try-catch`나 `window.onerror`를 사용해야 합니다.

---

## 5. 실무 팁

1. **에러 로깅**: `componentDidCatch`에서 Sentry, LogRocket 같은 서비스로 전송
2. **Fallback UI**: 사용자에게 명확한 메시지와 재시도 버튼 제공
3. **점진적 적용**: 처음에는 루트에 하나만 두고, 필요에 따라 세분화

Error Boundary는 "에러가 발생해도 앱이 멈추지 않게" 하는 안전장치입니다.  
사용자 경험을 해치지 않으면서도, 개발자에게는 에러 정보를 제공하는 균형이 중요합니다.

