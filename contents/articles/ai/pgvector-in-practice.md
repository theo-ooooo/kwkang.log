---
title: "pgvector 실전 - PostgreSQL로 벡터 검색하기"
date: "2026-07-12"
tag: "ai,llm,pgvector,rag"
---

RAG를 만들려면 임베딩 벡터를 어딘가에 저장하고, 질문 벡터와 가까운 것들을 빠르게 찾아야 합니다.
전용 벡터 DB(Pinecone, Qdrant 등)를 도입할 수도 있지만, 이미 쓰고 있는 **PostgreSQL에 `pgvector` 확장**만 얹으면 대부분의 실무 요구는 충분히 해결됩니다.

이 글에서는 pgvector 설치부터 컬럼 설계, 검색 쿼리, 인덱스 트레이드오프, 메타데이터 필터까지 SQL 위주로 정리합니다.

---

## 1. pgvector가 왜 매력적인가

벡터 검색만을 위해 새 인프라를 하나 더 운영하는 것은 부담입니다. pgvector는 그 부담을 없애줍니다.

- **기존 DB 그대로.** 트랜잭션, 조인, 권한, 백업 전략을 이미 알고 있는 PostgreSQL 위에서 벡터를 다룹니다.
- **관계형 데이터와 한 몸.** 문서 메타데이터(작성일, 카테고리, 소유자)와 벡터를 **같은 테이블**에 두고 `WHERE`로 필터할 수 있습니다.
- **SQL 그대로.** 새 쿼리 언어를 배울 필요 없이 `ORDER BY ... LIMIT`으로 유사도 검색을 합니다.

비유하자면, 벡터 검색을 위해 별도 창고를 짓는 대신 **쓰던 서랍장에 새 칸을 하나 추가**하는 셈입니다.

---

## 2. 설치와 확장 활성화

pgvector는 PostgreSQL 확장입니다. 서버에 확장이 설치돼 있다면 DB에서 한 줄로 켭니다.

```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

도커로 빠르게 띄운다면 공식 이미지를 쓰면 됩니다.

```text
docker run -d \
  -e POSTGRES_PASSWORD=secret \
  -p 5432:5432 \
  pgvector/pgvector:pg16
```

버전 확인:

```sql
SELECT extversion FROM pg_extension WHERE extname = 'vector';
```

---

## 3. vector 컬럼과 차원

`vector` 타입은 **차원 수를 고정**해서 선언합니다. 이 차원은 사용하는 **임베딩 모델의 출력 차원과 반드시 일치**해야 합니다. (예: OpenAI `text-embedding-3-small`은 1536차원)

```sql
CREATE TABLE doc_chunks (
  id          bigserial PRIMARY KEY,
  document_id bigint      NOT NULL,
  content     text        NOT NULL,
  category    text,                    -- 메타데이터 필터용
  created_at  timestamptz NOT NULL DEFAULT now(),
  embedding   vector(1536)             -- 임베딩 차원
);
```

> **주의:** 차원이 안 맞는 벡터를 넣으면 삽입 자체가 실패합니다. 그리고 **임베딩 모델을 바꾸면 차원이 달라질 수 있어** 컬럼 재정의 + 전체 재색인이 필요합니다. 모델 선택은 초기에 신중히 하세요.

---

## 4. 임베딩 저장

애플리케이션에서 텍스트를 임베딩 API로 벡터화한 뒤, 그 배열을 그대로 넣습니다. pgvector는 `[0.1, 0.2, ...]` 형태의 문자열 리터럴을 받습니다.

```ts
// 애플리케이션 코드 (TypeScript)
const embedding = await embed(chunk.content); // number[] (length 1536)

await sql`
  INSERT INTO doc_chunks (document_id, content, category, embedding)
  VALUES (
    ${chunk.documentId},
    ${chunk.content},
    ${chunk.category},
    ${JSON.stringify(embedding)}   -- '[0.1,0.2,...]' 로 직렬화
  )
`;
```

대량 색인 시에는 한 건씩 `INSERT`하지 말고 **배치 삽입 또는 `COPY`** 를 쓰는 것이 훨씬 빠릅니다.

---

## 5. 유사도 검색 쿼리

pgvector는 세 가지 거리 연산자를 제공합니다. 어떤 것을 쓸지는 **임베딩 모델이 권장하는 거리**를 따릅니다.

| 연산자 | 의미 | 언제 |
|--------|------|------|
| `<=>` | 코사인 거리 | 대부분의 텍스트 임베딩 (방향이 중요) |
| `<->` | L2(유클리드) 거리 | 정규화되지 않은 벡터 |
| `<#>` | 내적(음수) | 내적 기반 모델 |

가장 흔한 **코사인 검색**은 이렇게 씁니다. `<=>`는 거리(작을수록 가깝다)이므로 `1 - 거리`를 유사도 점수로 환산합니다.

```sql
SELECT
  id,
  content,
  1 - (embedding <=> :query_embedding) AS score
FROM doc_chunks
ORDER BY embedding <=> :query_embedding   -- 거리 오름차순 = 가까운 순
LIMIT 5;
```

핵심은 **`ORDER BY`에 연산자를 그대로 쓴다**는 점입니다. 이렇게 해야 뒤에서 만들 인덱스를 탈 수 있습니다.

---

## 6. 인덱스 - ivfflat vs hnsw

인덱스가 없어도 검색은 됩니다. 다만 **모든 행과 거리를 계산**하는 완전 탐색(brute force)이라 데이터가 커지면 느려집니다. 그래서 **근사 최근접 이웃(ANN)** 인덱스를 붙입니다. 여기서 중요한 감각은, ANN 인덱스는 **정확도를 약간 포기하고 속도를 얻는** 트레이드오프라는 점입니다.

### 6-1. ivfflat

벡터 공간을 여러 클러스터(`lists`)로 나누고, 검색 시 가까운 몇 개 클러스터(`probes`)만 훑습니다.

```sql
-- 반드시 데이터가 어느 정도 쌓인 뒤 생성 (클러스터 학습에 데이터 필요)
CREATE INDEX ON doc_chunks
  USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);

-- 검색 시 훑을 클러스터 수 (높을수록 정확·느림)
SET ivfflat.probes = 10;
```

- **장점:** 인덱스 생성이 빠르고 메모리 사용이 적습니다.
- **단점:** 데이터를 계속 추가하면 클러스터가 편향돼 정확도가 떨어질 수 있어, 주기적 재생성이 필요합니다.
- **팁:** `lists`는 대략 `행 수 / 1000` 정도로 시작합니다.

### 6-2. hnsw

그래프 기반 인덱스로, 노드들을 계층적으로 연결해 탐색합니다.

```sql
CREATE INDEX ON doc_chunks
  USING hnsw (embedding vector_cosine_ops)
  WITH (m = 16, ef_construction = 64);

-- 검색 시 후보 큐 크기 (높을수록 정확·느림)
SET hnsw.ef_search = 40;
```

- **장점:** 같은 정확도에서 대체로 더 빠르고, 데이터 추가에도 강합니다.
- **단점:** 인덱스 생성이 느리고 메모리를 많이 씁니다.

### 6-3. 어떻게 고르나

| 기준 | ivfflat | hnsw |
|------|---------|------|
| 인덱스 빌드 속도 | 빠름 | 느림 |
| 검색 속도/정확도 | 보통 | 우수 |
| 메모리 | 적음 | 많음 |
| 데이터 잦은 추가 | 재생성 필요 | 유리 |

정리하면, **작게 시작하거나 메모리가 빠듯하면 ivfflat**, **품질·성능을 우선하고 메모리 여유가 있으면 hnsw**입니다. 요즘은 hnsw가 기본 선택인 경우가 많습니다.

---

## 7. 메타데이터 필터

pgvector의 진짜 강점은 **일반 `WHERE`와 벡터 검색을 자연스럽게 섞을 수 있다**는 점입니다. "최근 문서만", "이 사용자가 볼 수 있는 문서만" 같은 조건을 그대로 겁니다.

```sql
SELECT id, content, 1 - (embedding <=> :query_embedding) AS score
FROM doc_chunks
WHERE category = 'billing'
  AND created_at > now() - interval '90 days'
ORDER BY embedding <=> :query_embedding
LIMIT 5;
```

다만 주의할 점이 있습니다. **필터가 매우 선택적(대부분 행을 걸러냄)일 때**, ANN 인덱스는 먼저 벡터로 상위 후보를 뽑은 뒤 필터를 적용하므로, 조건에 맞는 결과가 `LIMIT`보다 적게 나올 수 있습니다.

- 자주 거는 필터 컬럼에는 **일반 B-tree 인덱스**를 별도로 만들어 둡니다.
- 필터가 너무 빡세면 `LIMIT`을 넉넉히 잡고 애플리케이션에서 다시 자르거나, hnsw의 `ef_search`를 올려 후보를 늘립니다.

---

## 8. 실무 팁 몇 가지

- **점수 임계값을 둔다.** 유사도가 너무 낮은 결과는 노이즈입니다. `score` 하한선을 정해 관련 없는 청크는 프롬프트에 넣지 마세요.
- **재색인 전략을 미리.** 임베딩 모델 교체는 곧 전체 재색인입니다. `embedding_model` 컬럼이나 별도 테이블 버전으로 무중단 전환을 설계해 두면 편합니다.
- **`EXPLAIN ANALYZE`로 인덱스 사용 확인.** `ORDER BY`가 인덱스를 안 타고 Seq Scan으로 도는지 반드시 점검하세요. 연산자·연산자 클래스(`vector_cosine_ops`)가 어긋나면 인덱스를 못 탑니다.
- **정규화.** 코사인을 쓸 거면 저장·질의 벡터를 일관되게 다루고, 모델이 권장하는 연산자와 연산자 클래스를 맞추세요.
- **하이브리드 검색.** 고유명사·에러코드처럼 정확 매칭이 중요한 경우, PostgreSQL의 전문검색(`tsvector`/BM25 계열)과 벡터 검색을 함께 써서 결과를 합치면 품질이 올라갑니다.

---

## 마무리

pgvector는 "벡터 검색을 위해 꼭 전용 DB가 필요한 건 아니다"라는 걸 보여주는 실용적인 선택입니다.
**`vector` 컬럼 → 임베딩 저장 → `<=>` 검색 → 인덱스**의 흐름만 잡으면, 이미 익숙한 SQL 안에서 RAG의 검색 계층을 완성할 수 있습니다.

처음 시작한다면 이 순서를 추천합니다.

1. `vector(차원)` 컬럼을 만들고 인덱스 없이 **가장 단순한 코사인 검색**부터 동작시킨다.
2. 데이터가 쌓이면 hnsw 인덱스를 붙이고 `EXPLAIN ANALYZE`로 실제로 타는지 확인한다.
3. 메타데이터 필터와 점수 임계값을 더해 노이즈를 걷어낸다.

규모가 정말 커지기 전까지는, **PostgreSQL 하나로 충분히 멀리 갈 수 있습니다.**
