---
title: "Node.js Cluster - 멀티코어 활용과 성능 최적화"
date: "2026-03-09"
tag: "node.js,cluster,performance"
---

Node.js는 기본적으로 단일 스레드로 동작하지만, **Cluster 모듈**을 사용하면 멀티코어를 활용할 수 있습니다.  
이 글에서는 Cluster로 CPU 집약적 작업의 성능을 향상시키는 방법을 정리합니다.

---

## 1. 기본 Cluster

```javascript
const cluster = require("cluster");
const http = require("http");
const numCPUs = require("os").cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork(); // 재시작
  });
} else {
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end("Hello World\n");
  }).listen(3000);
}
```

---

## 2. Worker Threads

```javascript
const { Worker, isMainThread, parentPort } = require("worker_threads");

if (isMainThread) {
  const worker = new Worker(__filename);
  worker.on("message", (msg) => {
    console.log("받은 메시지:", msg);
  });
  worker.postMessage("Hello Worker");
} else {
  parentPort.on("message", (msg) => {
    console.log("받은 메시지:", msg);
    parentPort.postMessage("Hello Main");
  });
}
```

---

## 3. 실무 활용

```javascript
const cluster = require("cluster");
const express = require("express");

if (cluster.isMaster) {
  const numWorkers = require("os").cpus().length;
  for (let i = 0; i < numWorkers; i++) {
    cluster.fork();
  }
} else {
  const app = express();
  app.get("/", (req, res) => {
    res.json({ pid: process.pid });
  });
  app.listen(3000);
}
```

---

## 4. 실무 팁

1. **CPU 집약적 작업**: Cluster는 I/O보다 CPU 집약적 작업에 유용
2. **로드 밸런싱**: Cluster는 자동으로 로드 밸런싱 제공
3. **상태 공유**: Worker 간 상태 공유는 외부 저장소(Redis 등) 사용
4. **PM2**: 프로덕션에서는 PM2 같은 프로세스 매니저 사용 권장

Cluster는 "멀티코어를 활용하여 성능을 향상시킨다"는 철학을 따릅니다.

