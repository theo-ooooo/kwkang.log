---
title: "구조화된 출력 - LLM에서 안정적으로 JSON 받기"
date: "2026-07-08"
tag: "ai,llm,structured-output"
---

LLM을 챗봇이 아니라 **시스템의 한 부품**으로 쓰기 시작하면, 곧 이 벽에 부딪힙니다.
"답변을 자연어로 받으면 코드에서 어떻게 파싱하지?" LLM의 출력을 다음 단계 코드가 소비하려면, 자유서술이 아니라 **예측 가능한 구조(주로 JSON)** 로 받아야 합니다.

이 글에서는 자유서술의 문제부터, JSON 모드·스키마 강제, 함수 호출과의 관계, 검증과 실패 대응까지 실무 패턴을 정리합니다.

---

## 1. 자유서술의 문제

"결과를 JSON으로 줘"라고 프롬프트에 쓰는 것만으로는 부족합니다. 모델은 종종 이렇게 답합니다.

```text
네, 알겠습니다! 요청하신 결과는 다음과 같습니다:

```json
{ "sentiment": "positive", "score": 0.9 }
```

도움이 되었길 바랍니다!
```

코드 입장에서 이건 재앙입니다.

- **앞뒤 설명 문장**이 붙어 `JSON.parse`가 바로 깨집니다.
- 마크다운 **코드펜스(```)** 를 걷어내야 합니다.
- 어떤 날은 필드명이 `sentiment`, 어떤 날은 `emotion`으로 **흔들립니다.**
- 후행 쉼표, 홑따옴표, 주석 등 **JSON이 아닌 것**을 섞기도 합니다.

정규식으로 JSON을 긁어내는 방어 코드는 금세 지옥이 됩니다. 근본적으로는 **모델이 구조를 벗어나지 못하게 강제**해야 합니다.

---

## 2. JSON 모드와 스키마 강제

요즘 대부분의 LLM API는 출력 형식을 **강제하는 기능**을 제공합니다. 크게 두 단계가 있습니다.

### 2-1. JSON 모드

"반드시 유효한 JSON만 출력"하도록 강제합니다. 설명 문장이나 코드펜스가 붙지 않습니다.

```ts
const res = await llm.chat({
  messages,
  response_format: { type: "json_object" }, // 유효한 JSON만 나옴
});
```

다만 이것만으로는 **"어떤 모양의" JSON인지는 보장하지 못합니다.** 필드가 빠지거나 타입이 다를 수 있습니다.

### 2-2. 스키마 강제 (Structured Output)

한 걸음 더 나아가, **JSON 스키마를 함께 넘겨** 모델이 그 구조를 **정확히** 따르도록 합니다. 필드 이름, 타입, 필수 여부까지 지켜집니다.

```ts
const schema = {
  type: "object",
  properties: {
    sentiment: { type: "string", enum: ["positive", "negative", "neutral"] },
    score: { type: "number" },
  },
  required: ["sentiment", "score"],
  additionalProperties: false,
};

const res = await llm.chat({
  messages,
  response_format: { type: "json_schema", json_schema: { schema, strict: true } },
});
```

`strict` 모드에서는 모델이 스키마를 벗어난 출력을 아예 만들지 못하게 디코딩을 제약합니다. **가능하면 이 방식을 최우선**으로 선택하세요. 필드명이 흔들리는 문제가 근본적으로 사라집니다.

---

## 3. 함수 호출(Tool Calling)과의 관계

"구조화된 출력"과 "함수 호출"은 자주 헷갈리는데, **기반 기술은 같고 목적이 다릅니다.**

- **함수 호출(tool calling):** 모델이 "이 도구를, 이 인자로 부르고 싶다"를 **구조화된 형태로** 내놓습니다. 그 인자 역시 스키마를 따르는 JSON입니다. 목적은 **외부 행동**(DB 조회, API 호출)입니다.
- **구조화된 출력:** 모델의 **최종 답 자체**를 정해진 구조로 받습니다. 목적은 **데이터 추출·분류** 등 결과물 그 자체입니다.

비유하자면, 함수 호출은 **"이 심부름을 이렇게 시켜줘"** 라고 주문서를 쓰는 것이고, 구조화된 출력은 **"결과 보고서를 이 양식으로 써줘"** 라고 요청하는 것입니다. 실제로 함수 호출의 인자 생성 메커니즘이 구조화된 출력의 토대가 됩니다.

---

## 4. 검증 - 스키마를 강제해도 검증은 한다

스키마 강제가 되더라도, 애플리케이션 경계에서 **한 번 더 검증**하는 것이 안전합니다. API 오류, 버전 차이, 부분 실패에 대비하는 안전벨트입니다. TypeScript라면 **zod**가 사실상 표준입니다.

```ts
import { z } from "zod";

const Result = z.object({
  sentiment: z.enum(["positive", "negative", "neutral"]),
  score: z.number().min(0).max(1),
});

type Result = z.infer<typeof Result>;

function parseResult(raw: string): Result {
  const json = JSON.parse(raw);
  return Result.parse(json); // 형식이 어긋나면 여기서 예외
}
```

zod의 장점은 **런타임 검증과 타입 추론을 동시에** 얻는다는 점입니다. `z.infer`로 뽑은 타입이 곧 이후 코드가 신뢰할 수 있는 계약이 됩니다.

> Spring/Kotlin이라면 Jackson으로 역직렬화한 뒤 Bean Validation(`@NotNull`, `@Min` 등)으로 같은 역할을 합니다.

---

## 5. 파싱 실패 대응

강제와 검증을 다 해도 실패는 일어납니다. **실패를 전제로** 설계합니다.

### 5-1. 재시도 (with 피드백)

파싱·검증에 실패하면, **에러 메시지를 다시 프롬프트에 넣어** 고쳐 달라고 요청합니다. 그냥 재시도보다 성공률이 높습니다.

```ts
async function getStructured(messages, schema, maxRetries = 2) {
  for (let i = 0; i <= maxRetries; i++) {
    const raw = await llm.chat({ messages, response_format: schema });
    const parsed = Result.safeParse(JSON.parse(raw));
    if (parsed.success) return parsed.data;

    // 실패 이유를 알려주고 다시 요청
    messages.push({
      role: "user",
      content: `출력이 형식에 맞지 않습니다: ${parsed.error.message}. 스키마에 맞게 다시 출력하세요.`,
    });
  }
  throw new Error("구조화된 출력 획득 실패");
}
```

### 5-2. 안전한 폴백

- 재시도가 모두 실패하면, **예외를 던지고 상위에서 처리**하거나 안전한 기본값으로 대체합니다.
- 절대 **깨진 JSON을 억지로 밀어 넣지 마세요.** 조용한 데이터 오염이 더 위험합니다.
- 실패 사례는 **로깅**해 두고, 프롬프트·스키마 개선의 재료로 씁니다.

---

## 6. 실무 패턴 정리

- **스키마 강제 > JSON 모드 > 프롬프트 지시** 순으로 우선합니다. 강제 기능이 있으면 무조건 씁니다.
- **스키마는 좁게.** `enum`, `required`, `additionalProperties: false`로 여지를 줄일수록 안정적입니다.
- **경계에서 항상 검증**합니다 (zod / Bean Validation). 모델을 신뢰하되 검증하세요.
- **재시도는 피드백과 함께**, 그래도 실패하면 명시적으로 실패 처리합니다.
- 필드에 **설명(description)** 을 달면 모델이 의미를 더 정확히 채웁니다.
- 숫자·날짜처럼 **파싱이 애매한 값은 문자열 포맷을 명시**(예: ISO 8601)합니다.

---

## 마무리

LLM을 시스템 부품으로 쓰는 순간, 관심사는 "얼마나 똑똑한 답인가"에서 **"얼마나 예측 가능한 구조인가"** 로 옮겨갑니다.

정리하면 이렇습니다.

1. **스키마를 강제**해 모델이 구조를 벗어나지 못하게 한다.
2. 그래도 **경계에서 검증**한다 (zod 등).
3. 실패를 전제로 **재시도·폴백**을 설계한다.

"프롬프트에 JSON으로 달라고 썼는데 자꾸 깨져요"의 해답은 더 정교한 정규식이 아니라, **출력 자체를 구조로 묶어버리는 것**입니다.
