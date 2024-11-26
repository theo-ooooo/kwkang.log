---
title: "test"
date: "2024-01-01"
tag: "test"
---

Next.js의 **App Router**는 13버전부터 도입된 새로운 라우팅 방식으로, 기존의 **Pages Router**보다 더 현대적이고 유연한 기능을 제공합니다. App Router를 통해 서버 컴포넌트와 클라이언트 컴포넌트를 효과적으로 관리하며 React 18의 기능을 최대한 활용할 수 있습니다. 아래는 App Router의 주요 개념과 특징, 활용법을 정리한 내용입니다.

---

## 1. **App Router의 주요 개념**

### **폴더 기반 라우팅**

- `app` 디렉토리를 사용해 파일과 폴더 이름만으로 라우팅이 자동으로 설정됩니다.
- 예:
  ```
  app/
    ├── page.js       // 루트 경로 ('/')
    ├── about/
    │   └── page.js   // '/about'
    ├── blog/
    │   ├── [slug]/
    │   │   └── page.js  // 동적 라우팅: '/blog/:slug'
    │   └── page.js   // '/blog'
  ```

### **서버 컴포넌트와 클라이언트 컴포넌트**

- **서버 컴포넌트** (기본): 서버에서 렌더링되어 전송, SEO와 성능 최적화에 유리.
- **클라이언트 컴포넌트**: 클라이언트에서만 실행되어 상태 관리, 인터랙션 등에 사용.
- 클라이언트 컴포넌트를 선언하려면 `use client`를 파일 맨 위에 추가.

  ```jsx
  "use client";

  export default function ClientComponent() {
    return <button>Click me</button>;
  }
  ```

### **라우트 파일의 종류**

- `page.js`: 페이지 컴포넌트 정의.
- `layout.js`: 해당 폴더와 하위 경로에 적용될 레이아웃.
- `loading.js`: 로딩 상태를 처리.
- `error.js`: 에러 페이지 처리.
- `not-found.js`: 404 페이지 처리.
- `template.js`: `layout.js`와 유사하지만, 재사용 가능.

---

## 2. **App Router의 특징**

### **1) 동적 라우팅**

- 대괄호(`[]`)를 사용하여 동적 경로를 정의.
  ```
  app/products/[id]/page.js
  // URL: /products/123
  ```
- 다이나믹 세그먼트 캡처:
  ```javascript
  export async function generateMetadata({ params }) {
    return {
      title: `Product ${params.id}`,
    };
  }
  ```

### **2) 서버 컴포넌트 기반 데이터 페칭**

- **`getServerSideProps`**와 **`getStaticProps`**는 더 이상 사용되지 않으며, 서버 컴포넌트에서 직접 데이터 페칭이 가능.
  ```jsx
  export default async function Page() {
    const data = await fetch("https://api.example.com/data");
    return <div>{JSON.stringify(data)}</div>;
  }
  ```

### **3) 파일 기반 중첩 레이아웃**

- `layout.js`를 사용하여 중첩 레이아웃을 쉽게 설정.
  ```javascript
  // app/layout.js
  export default function RootLayout({ children }) {
    return (
      <html lang='en'>
        <body>{children}</body>
      </html>
    );
  }
  ```

### **4) 스트리밍 및 Suspense 지원**

- 스트리밍으로 성능을 최적화하고, React의 `Suspense`를 통해 비동기 데이터 로딩 처리.

  ```jsx
  import { Suspense } from "react";

  export default function Page() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <AsyncComponent />
      </Suspense>
    );
  }
  ```

### **5) SEO 최적화**

- `generateMetadata` API를 사용해 동적으로 메타데이터 생성 가능.
  ```javascript
  export async function generateMetadata({ params }) {
    return {
      title: `Page Title`,
      description: `Page description`,
    };
  }
  ```

---

## 3. **App Router 사용 시 고려 사항**

1. **클라이언트 컴포넌트와 서버 컴포넌트의 구분**

   - 서버 컴포넌트를 기본으로 사용하되, 상태 관리나 이벤트 핸들링이 필요할 때만 클라이언트 컴포넌트를 활용.

2. **Migration (Pages Router → App Router)**

   - 점진적으로 마이그레이션 가능하며, `pages`와 `app` 디렉토리를 동시에 사용할 수 있음.

3. **동적 데이터를 처리할 때**

   - 필요한 데이터가 SSR이 아닌 CSR로 로드되길 원한다면 클라이언트 컴포넌트에서 데이터 로딩 처리.

4. **로딩과 에러 핸들링**
   - `loading.js`와 `error.js` 파일을 활용해 사용자 경험을 향상.

---

App Router는 React의 최신 기능을 최대한 활용할 수 있는 강력한 도구입니다. 하지만 기존 Pages Router와의 차이점을 정확히 이해하고 적재적소에 활용해야 합니다. 필요하다면 특정 부분에서 Pages Router를 계속 사용하면서 점진적으로 App Router로 전환할 수 있습니다.
