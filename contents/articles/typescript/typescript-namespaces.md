---
title: "TypeScript 네임스페이스 - 모듈과 네임스페이스 비교"
date: "2026-03-04"
tag: "typescript,namespaces,modules"
---

TypeScript 네임스페이스는 코드를 논리적으로 그룹화하는 방법이지만, **ES6 모듈이 더 권장**됩니다.  
이 글에서는 네임스페이스의 사용법과 모듈과의 차이점을 정리합니다.

---

## 1. 네임스페이스 기본

```typescript
namespace Utils {
  export function formatDate(date: Date): string {
    return date.toISOString();
  }
  
  export const VERSION = "1.0.0";
}

// 사용
Utils.formatDate(new Date());
```

---

## 2. 중첩 네임스페이스

```typescript
namespace Company {
  export namespace HR {
    export function getEmployees() {
      return [];
    }
  }
}

Company.HR.getEmployees();
```

---

## 3. 네임스페이스 vs 모듈

```typescript
// 네임스페이스 (권장하지 않음)
namespace Math {
  export function add(a: number, b: number) {
    return a + b;
  }
}

// ES6 모듈 (권장)
// math.ts
export function add(a: number, b: number) {
  return a + b;
}

// 사용
import { add } from "./math";
```

---

## 4. 실무 팁

1. **모듈 우선**: ES6 모듈을 사용하는 것이 권장됨
2. **레거시 코드**: 기존 네임스페이스 코드를 점진적으로 모듈로 전환
3. **타입 정의**: `.d.ts` 파일에서 네임스페이스가 여전히 유용할 수 있음

네임스페이스는 "레거시 코드와의 호환성"을 위한 기능이며, 새 프로젝트에서는 모듈을 사용하는 것이 좋습니다.

