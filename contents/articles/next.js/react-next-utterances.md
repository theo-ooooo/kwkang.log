---
title: "Next.js에서 Utterances 댓글 시스템 구현하기"
date: "2024-11-28"
tag: "react, next.js, utterances"
---

## **Next.js에서 Utterances 댓글 시스템 구현하기**

Utterances는 GitHub 이슈를 활용하여 웹사이트에 간단하게 댓글 시스템을 추가할 수 있는 오픈 소스 프로젝트입니다. Next.js 프로젝트에 Utterances를 삽입하는 방법과, 테마 전환 시 **깜빡임이 발생하는 방식**과 **깜빡임을 방지하는 방식**을 각각 소개합니다.

---

### **1. Utterances 기본 삽입 방법**

Utterances를 삽입하려면 GitHub 저장소와 Next.js 컴포넌트에 스크립트를 추가해야 합니다.

#### **GitHub 설정**

1. 댓글을 저장할 **공개(Public) GitHub 저장소**를 준비합니다.
2. [Utterances 앱](https://github.com/apps/utterances)을 설치합니다.
3. 저장소에 댓글을 이슈로 관리할 수 있도록 설정합니다.

---

#### **Utterances 컴포넌트 기본 코드**

아래는 Next.js 컴포넌트에서 Utterances를 삽입하는 기본 코드입니다.

```tsx
"use client";

import { useEffect, useRef } from "react";

export default function Utterances() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("repo", "your-github-username/your-repo-name");
    script.setAttribute("issue-term", "pathname");
    script.setAttribute("theme", "github-light");

    ref.current.appendChild(script);
  }, []);

  return <div ref={ref}></div>;
}
```

#### **기본 코드의 특징**

- **`repo`**: GitHub 저장소 이름을 설정합니다.
- **`issue-term`**: 댓글을 연결하는 기준 (예: `pathname`).
- **`theme`**: Utterances의 테마를 설정합니다.

---

### **2. 테마 변경 시 발생하는 문제: 깜빡임**

#### **문제 원인**

테마를 변경할 때 Utterances의 `iframe`을 삭제하고 새로운 스크립트를 삽입하는 방식은 **깜빡임**이 발생합니다. 이는 DOM에서 iframe이 제거되고 다시 로드되기 때문입니다.

#### **깜빡임 발생 방식**

```tsx
"use client";

import { useEffect, useRef } from "react";

export default function Utterances({ theme }: { theme: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    // 기존 iframe 삭제
    ref.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("repo", "your-github-username/your-repo-name");
    script.setAttribute("issue-term", "pathname");
    script.setAttribute("theme", theme);

    ref.current.appendChild(script);
  }, [theme]);

  return <div ref={ref}></div>;
}
```

#### **문제점**

1. **댓글 깜빡임**: 기존 iframe이 삭제되고 다시 로드되면서 화면이 깜빡입니다.
2. **댓글 작성 중 데이터 손실**: 사용자가 댓글을 작성 중일 경우 데이터가 사라질 수 있습니다.
3. **성능 저하**: 불필요하게 iframe을 다시 생성하므로 성능이 저하됩니다.

---

### **3. 깜빡임 없는 방식 (추천)**

#### **원리**

- Utterances의 iframe을 삭제하지 않고, **`postMessage`**를 사용해 테마를 동적으로 변경합니다.
- DOM은 그대로 유지되고, 테마만 업데이트되므로 깜빡임 없이 부드럽게 동작합니다.

---

#### **깜빡임 없는 방식 코드**

```tsx
"use client";

import { useEffect, useRef } from "react";

export default function Utterances({ theme }: { theme: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const initRef = useRef<boolean>(false);

  useEffect(() => {
    if (!ref.current || initRef.current) return;

    initRef.current = true;

    const script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("repo", "your-github-username/your-repo-name");
    script.setAttribute("issue-term", "pathname");
    script.setAttribute("theme", theme);

    ref.current.appendChild(script);
  }, []);

  useEffect(() => {
    const utterancesIframe = document.querySelector<HTMLIFrameElement>(
      "iframe.utterances-frame"
    );

    if (!utterancesIframe) return;

    // 테마 변경 메시지 전달
    utterancesIframe.contentWindow?.postMessage(
      {
        type: "set-theme",
        theme,
      },
      "https://utteranc.es"
    );
  }, [theme]);

  return <div ref={ref}></div>;
}
```

---

#### **코드의 특징**

1. **중복 삽입 방지**:

   - `initRef`를 사용하여 스크립트가 한 번만 삽입되도록 보장.

2. **테마 동적 변경**:
   - `iframe.utterances-frame`에 `postMessage`를 사용해 테마를 변경.
   - DOM 조작 없이 깜빡임 없이 부드럽게 동작.

---

### **4. 깜빡임 발생 방식 vs 깜빡임 없는 방식 비교**

| **특징**                  | **깜빡임 발생 방식**        | **깜빡임 없는 방식 (추천)**              |
| ------------------------- | --------------------------- | ---------------------------------------- |
| **DOM 조작**              | iframe 삭제 후 다시 삽입    | 기존 DOM 유지, `postMessage`로 테마 변경 |
| **댓글 깜빡임**           | 발생                        | 없음                                     |
| **댓글 작성 데이터 유지** | 작성 중 데이터 손실         | 데이터 유지                              |
| **성능**                  | iframe 재생성으로 성능 저하 | 성능 최적화                              |
| **사용 사례**             | 간단한 초기 구현            | 깔끔하고 최적화된 사용자 경험 제공       |

---

### **5. 결론**

- **깜빡임 발생 방식**은 간단히 구현할 수 있지만, 사용자 경험이 저하되고 성능 문제가 발생할 수 있습니다.
- **깜빡임 없는 방식**은 부드러운 테마 전환과 데이터 유지가 가능하여, 최적의 사용자 경험을 제공합니다.

추천 방식은 **`깜빡임 없는 방식`**이며, `postMessage`를 통해 DOM 조작 없이 테마를 동적으로 업데이트하는 구조를 활용하세요! 😊
