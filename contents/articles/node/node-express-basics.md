---
title: "Express.js 기초 - RESTful API 서버 구축"
date: "2026-03-07"
tag: "node.js,express,api"
---

Express.js는 Node.js를 위한 **미니멀한 웹 프레임워크**입니다.  
이 글에서는 Express로 RESTful API 서버를 구축하는 기본 패턴을 정리합니다.

---

## 1. 기본 서버

```javascript
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

---

## 2. 라우팅

```javascript
app.get("/users", (req, res) => {
  res.json({ users: [] });
});

app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  res.json({ id });
});

app.post("/users", (req, res) => {
  const user = req.body;
  res.status(201).json({ user });
});
```

---

## 3. 미들웨어

```javascript
// JSON 파싱
app.use(express.json());

// 로깅 미들웨어
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// 에러 핸들링
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});
```

---

## 4. 라우터 분리

```javascript
// routes/users.js
const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ users: [] });
});

module.exports = router;

// app.js
const usersRouter = require("./routes/users");
app.use("/users", usersRouter);
```

---

## 5. 실무 팁

1. **미들웨어 순서**: 미들웨어는 등록 순서대로 실행
2. **에러 핸들링**: 에러 미들웨어는 마지막에 등록
3. **보안**: `helmet`, `cors` 같은 미들웨어 사용
4. **환경 변수**: `dotenv`로 설정 관리

Express는 "미니멀하고 유연한 웹 프레임워크"를 지향합니다.

