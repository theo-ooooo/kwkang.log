---
title: "모니터링과 로깅 - 프로덕션 시스템 관찰"
date: "2026-03-14"
tag: "monitoring,logging,observability"
---

프로덕션 시스템의 **모니터링과 로깅**은 안정적인 서비스를 운영하는 핵심입니다.  
이 글에서는 메트릭 수집, 로그 관리, 알림 설정 방법을 정리합니다.

---

## 1. 메트릭 수집

```javascript
// Prometheus 스타일 메트릭
const httpRequestDuration = new promClient.Histogram({
  name: "http_request_duration_seconds",
  help: "HTTP request duration",
});

app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    httpRequestDuration.observe((Date.now() - start) / 1000);
  });
  next();
});
```

---

## 2. 로깅

```javascript
const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});
```

---

## 3. 분산 추적

```javascript
// OpenTelemetry
const { trace } = require("@opentelemetry/api");

const tracer = trace.getTracer("my-app");

function handleRequest() {
  const span = tracer.startSpan("handleRequest");
  // 작업 수행
  span.end();
}
```

---

## 4. 실무 도구

- **메트릭**: Prometheus, Grafana
- **로깅**: ELK Stack, Loki
- **APM**: New Relic, Datadog
- **알림**: PagerDuty, Slack

---

## 5. 실무 팁

1. **구조화된 로그**: JSON 형식으로 로그 기록
2. **로그 레벨**: 적절한 로그 레벨 사용 (debug, info, warn, error)
3. **알림 임계값**: 너무 민감하지 않은 임계값 설정
4. **비용 관리**: 로그/메트릭 저장 비용 고려

모니터링은 "문제를 미리 발견한다"는 철학을 따릅니다.

