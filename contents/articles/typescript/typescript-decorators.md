---
title: "TypeScript 데코레이터 - 클래스와 메서드 메타데이터"
date: "2026-03-02"
tag: "typescript,decorators"
---

TypeScript 데코레이터는 **클래스, 메서드, 프로퍼티에 메타데이터를 추가**하는 실험적 기능입니다.  
Angular, NestJS 같은 프레임워크에서 널리 사용되며, `tsconfig.json`에서 활성화해야 합니다.

---

## 1. 데코레이터 설정

```json
// tsconfig.json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

---

## 2. 클래스 데코레이터

```typescript
function Logger(constructor: Function) {
  console.log("클래스 생성:", constructor.name);
}

@Logger
class User {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
```

---

## 3. 메서드 데코레이터

```typescript
function Log(target: any, propertyName: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`메서드 호출: ${propertyName}`, args);
    return method.apply(this, args);
  };
}

class Calculator {
  @Log
  add(a: number, b: number): number {
    return a + b;
  }
}
```

---

## 4. 프로퍼티 데코레이터

```typescript
function ReadOnly(target: any, propertyName: string) {
  let value: any;

  Object.defineProperty(target, propertyName, {
    get: () => value,
    set: (newValue: any) => {
      if (value === undefined) {
        value = newValue;
      }
    },
  });
}

class User {
  @ReadOnly
  id: number;
}
```

---

## 5. 파라미터 데코레이터

```typescript
function Required(target: any, propertyName: string, parameterIndex: number) {
  // 파라미터 메타데이터 저장
}

class UserService {
  getUser(@Required id: number, name: string) {
    // ...
  }
}
```

---

## 6. 데코레이터 팩토리

```typescript
function Log(prefix: string) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = function (...args: any[]) {
      console.log(`[${prefix}] ${propertyName}`, args);
      return method.apply(this, args);
    };
  };
}

class Service {
  @Log("API")
  fetchData() {
    // ...
  }
}
```

---

## 7. 실무 활용: NestJS 스타일

```typescript
function Controller(path: string) {
  return function (constructor: Function) {
    // 컨트롤러 메타데이터 저장
  };
}

function Get(endpoint: string) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    // 라우트 메타데이터 저장
  };
}

@Controller("/users")
class UserController {
  @Get("/")
  getUsers() {
    return [];
  }
}
```

---

## 8. 실무 팁

1. **실험적 기능**: 데코레이터는 아직 실험적이므로 프로덕션 사용 시 주의
2. **프레임워크 활용**: NestJS, Angular 같은 프레임워크에서 표준으로 사용
3. **메타데이터**: `reflect-metadata` 패키지와 함께 사용하여 런타임 메타데이터 접근
4. **성능**: 데코레이터는 런타임 오버헤드가 있으므로 과도한 사용 주의

TypeScript 데코레이터는 "선언적 메타데이터를 추가한다"는 철학을 따릅니다.  
프레임워크 레벨에서 유용하지만, 일반 애플리케이션에서는 사용을 최소화하는 것이 좋습니다.

