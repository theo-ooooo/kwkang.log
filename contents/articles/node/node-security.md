---
title: "Node.js 보안 - 실무 보안 체크리스트"
date: "2026-03-10"
tag: "node.js,security"
---

Node.js 애플리케이션의 보안은 **다층 방어 전략**으로 접근해야 합니다.  
이 글에서는 실무에서 자주 놓치는 보안 이슈와 대응 방법을 정리합니다.

---

## 1. 의존성 보안

```bash
# npm audit로 취약점 검사
npm audit

# 자동 수정
npm audit fix
```

---

## 2. 환경 변수 관리

```javascript
// .env 파일 (git에 커밋하지 않음)
require("dotenv").config();

const dbPassword = process.env.DB_PASSWORD;
```

- 시크릿은 환경 변수로 관리하고 `.env`는 `.gitignore`에 추가

---

## 3. 입력 검증

```javascript
const express = require("express");
const { body, validationResult } = require("express-validator");

app.post("/users", [
  body("email").isEmail(),
  body("password").isLength({ min: 8 }),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // ...
});
```

---

## 4. SQL Injection 방지

```javascript
// ❌ 나쁜 예
const query = `SELECT * FROM users WHERE id = ${userId}`;

// ✅ 좋은 예 (파라미터화된 쿼리)
const query = "SELECT * FROM users WHERE id = ?";
db.query(query, [userId]);
```

---

## 5. Helmet.js

```javascript
const helmet = require("helmet");
app.use(helmet());
```

- Helmet은 HTTP 헤더를 설정하여 일반적인 취약점을 방지합니다.

---

## 6. Rate Limiting

```javascript
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15분
  max: 100, // 최대 100 요청
});

app.use("/api/", limiter);
```

---

## 7. 실무 체크리스트

1. **의존성 업데이트**: 정기적으로 `npm audit` 실행
2. **환경 변수**: 시크릿은 환경 변수로 관리
3. **입력 검증**: 모든 사용자 입력 검증
4. **HTTPS**: 프로덕션에서는 항상 HTTPS 사용
5. **에러 메시지**: 상세한 에러 정보는 사용자에게 노출하지 않음

보안은 "다층 방어 전략"으로 접근해야 합니다.

