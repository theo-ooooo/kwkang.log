---
title: "Node.js Streams - 대용량 데이터 효율적 처리"
date: "2026-02-10"
tag: "node.js,streams"
---

Node.js Streams는 **대용량 데이터를 메모리 효율적으로 처리**할 수 있게 해줍니다.  
파일 읽기/쓰기, HTTP 요청/응답 등에서 스트림을 활용하면 메모리 사용량을 크게 줄일 수 있습니다.

---

## 1. 스트림 타입

- **Readable**: 데이터를 읽을 수 있는 스트림
- **Writable**: 데이터를 쓸 수 있는 스트림
- **Duplex**: 읽기/쓰기 모두 가능
- **Transform**: 데이터를 변환하는 스트림

---

## 2. 파일 스트림

```javascript
const fs = require("fs");

// 읽기 스트림
const readStream = fs.createReadStream("large-file.txt");

readStream.on("data", (chunk) => {
  console.log(`받은 데이터: ${chunk.length} bytes`);
});

readStream.on("end", () => {
  console.log("읽기 완료");
});

// 쓰기 스트림
const writeStream = fs.createWriteStream("output.txt");
writeStream.write("Hello");
writeStream.end();
```

---

## 3. 파이프

```javascript
const fs = require("fs");

fs.createReadStream("input.txt")
  .pipe(fs.createWriteStream("output.txt"));
```

---

## 4. Transform 스트림

```javascript
const { Transform } = require("stream");

const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  },
});

process.stdin.pipe(upperCaseTransform).pipe(process.stdout);
```

---

## 5. 실무 활용

```javascript
const http = require("http");
const fs = require("fs");

http.createServer((req, res) => {
  const fileStream = fs.createReadStream("large-file.pdf");
  fileStream.pipe(res);
}).listen(3000);
```

---

## 6. 실무 팁

1. **메모리 효율**: 대용량 파일은 스트림으로 처리
2. **에러 처리**: 스트림의 `error` 이벤트 항상 처리
3. **백프레셔**: Writable 스트림이 느릴 때 자동으로 처리

스트림은 "메모리 효율적으로 데이터를 처리한다"는 철학을 따릅니다.

