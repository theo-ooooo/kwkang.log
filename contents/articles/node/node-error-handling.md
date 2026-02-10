---
title: "Node.js 에러 처리 - 비동기 에러 핸들링 패턴"
date: "2026-02-10"
tag: "node.js,error-handling"
---

Node.js에서 **비동기 에러를 올바르게 처리**하는 것은 안정적인 애플리케이션을 만드는 핵심입니다.  
이 글에서는 콜백, Promise, async/await에서의 에러 처리 패턴을 정리합니다.

---

## 1. 콜백 에러 처리

```javascript
const fs = require("fs");

fs.readFile("file.txt", "utf8", (err, data) => {
  if (err) {
    console.error("에러:", err);
    return;
  }
  console.log(data);
});
```

- 콜백의 첫 번째 인자는 항상 에러 객체입니다.

---

## 2. Promise 에러 처리

```javascript
fetch("https://api.example.com/data")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => {
    console.error("에러:", error);
  });
```

---

## 3. async/await 에러 처리

```javascript
async function fetchData() {
  try {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("에러:", error);
  }
}
```

---

## 4. 전역 에러 처리

```javascript
// 처리되지 않은 Promise rejection
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
});

// 처리되지 않은 예외
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});
```

---

## 5. 에러 클래스

```javascript
class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = "CustomError";
  }
}

throw new CustomError("Something went wrong", 400);
```

---

## 6. 실무 팁

1. **항상 에러 처리**: 모든 비동기 작업에 에러 핸들링 추가
2. **에러 로깅**: 에러를 로깅 서비스로 전송
3. **사용자 친화적 메시지**: 내부 에러는 로깅, 사용자에게는 일반 메시지 표시
4. **에러 타입**: 커스텀 에러 클래스로 에러 타입 구분

에러 처리는 "예상치 못한 상황에 대비한다"는 철학을 따릅니다.

