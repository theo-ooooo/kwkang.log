---
title: "Node.js 기초 - 이벤트 루프와 비동기 처리"
date: "2026-03-05"
tag: "node.js,async,event-loop"
---

Node.js는 **비동기 I/O**와 **이벤트 기반** 아키텍처로 동작하는 JavaScript 런타임입니다.  
이 글에서는 Node.js의 핵심 개념인 이벤트 루프, 비동기 처리, 모듈 시스템을 정리합니다.

---

## 1. 이벤트 루프

Node.js는 단일 스레드에서 이벤트 루프를 통해 비동기 작업을 처리합니다.

```javascript
console.log("1");

setTimeout(() => {
  console.log("2");
}, 0);

Promise.resolve().then(() => {
  console.log("3");
});

console.log("4");
// 출력: 1, 4, 3, 2
```

- 이벤트 루프는 콜백 큐를 순회하며 비동기 작업을 처리합니다.

---

## 2. 비동기 패턴

### Callback

```javascript
const fs = require("fs");

fs.readFile("file.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
```

### Promise

```javascript
const fs = require("fs").promises;

fs.readFile("file.txt", "utf8")
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
```

### async/await

```javascript
async function readFile() {
  try {
    const data = await fs.readFile("file.txt", "utf8");
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
```

---

## 3. 모듈 시스템

### CommonJS

```javascript
// math.js
module.exports = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
};

// app.js
const math = require("./math");
console.log(math.add(1, 2));
```

### ES Modules

```javascript
// math.js
export function add(a, b) {
  return a + b;
}

// app.js
import { add } from "./math.js";
console.log(add(1, 2));
```

---

## 4. 실무 팁

1. **비동기 처리**: CPU 집약적 작업은 Worker Threads 사용 고려
2. **에러 핸들링**: Promise rejection을 항상 처리할 것
3. **모듈 선택**: 새 프로젝트는 ES Modules 권장

Node.js는 "비동기 I/O로 높은 성능을 달성한다"는 철학을 따릅니다.

