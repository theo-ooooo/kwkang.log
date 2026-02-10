---
title: "TypeScript tsconfig.json 완전 정리"
date: "2026-02-10"
tag: "typescript,config"
---

TypeScript의 `tsconfig.json`은 컴파일 옵션과 프로젝트 설정을 관리하는 핵심 파일입니다.  
이 글에서는 주요 옵션과 실무에서 자주 사용하는 설정을 정리합니다.

---

## 1. 기본 구조

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020", "DOM"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

---

## 2. 주요 컴파일 옵션

### target
컴파일 대상 JavaScript 버전

```json
"target": "ES2020" // ES5, ES2015, ES2020 등
```

### module
모듈 시스템

```json
"module": "ESNext" // commonjs, ES2015, ESNext 등
```

### lib
타입 정의 라이브러리

```json
"lib": ["ES2020", "DOM", "DOM.Iterable"]
```

---

## 3. 엄격 모드 옵션

```json
{
  "strict": true, // 모든 strict 옵션 활성화
  "noImplicitAny": true,
  "strictNullChecks": true,
  "strictFunctionTypes": true,
  "strictBindCallApply": true,
  "strictPropertyInitialization": true,
  "noImplicitThis": true,
  "alwaysStrict": true
}
```

---

## 4. 모듈 해석 옵션

```json
{
  "moduleResolution": "node", // 또는 "bundler"
  "baseUrl": "./",
  "paths": {
    "@/*": ["src/*"]
  },
  "resolveJsonModule": true
}
```

---

## 5. 실무 설정 예시

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM"],
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "bundler",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

---

## 6. 실무 팁

1. **strict 모드**: 프로덕션에서는 `strict: true` 권장
2. **skipLibCheck**: 타입 체크 속도 향상
3. **paths**: 절대 경로 import를 위해 사용
4. **extends**: 공통 설정은 별도 파일로 분리하여 재사용

tsconfig.json은 "타입 안정성과 개발 경험의 균형"을 맞추는 설정입니다.

