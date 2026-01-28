---
title: "MySQL 쿼리 기본과 인덱스 설계"
date: "2026-01-26"
tag: "mysql,query,index"
---

MySQL에서 성능 좋은 쿼리를 작성하려면 **기본 문법 + 인덱스 구조 + 실행 계획(EXPLAIN)** 세 가지를 같이 이해해야 합니다.  
이 글에서는 가장 자주 쓰는 SELECT 쿼리 패턴과, 인덱스 설계 시 꼭 챙겨야 할 포인트를 정리합니다.

---

## 1. 기본 SELECT 쿼리 패턴

```sql
SELECT id, name, status
FROM users
WHERE status = 'ACTIVE'
  AND created_at >= '2026-01-01'
ORDER BY created_at DESC
LIMIT 20 OFFSET 0;
```

- **WHERE**: 필터링 조건
- **ORDER BY**: 정렬 기준
- **LIMIT/OFFSET**: 페이징

실무에서는 `SELECT *` 대신 **필요한 컬럼만 명시**해서 가져오는 습관을 들이는 것이 좋습니다.

---

## 2. 인덱스의 기본 개념

- 인덱스는 책의 **목차**와 비슷한 개념입니다.
- 특정 컬럼(또는 컬럼 조합)에 대해 **정렬된 구조(B+Tree)**를 유지하면서 검색을 빠르게 해 줍니다.

```sql
CREATE INDEX idx_users_status_created_at
ON users (status, created_at);
```

위 인덱스는 다음과 같은 쿼리에 잘 맞습니다.

```sql
SELECT *
FROM users
WHERE status = 'ACTIVE'
  AND created_at >= '2026-01-01'
ORDER BY created_at DESC
LIMIT 20;
```

- 인덱스 **선두 컬럼**(여기서는 `status`) 조건을 WHERE 절에서 사용하는 것이 매우 중요합니다.

---

## 3. EXPLAIN으로 실행 계획 보기

```sql
EXPLAIN
SELECT id, name
FROM users
WHERE status = 'ACTIVE'
  AND created_at >= '2026-01-01';
```

### 3-1. 자주 보는 컬럼 의미

- **id**: 실행 계획 내에서의 단계 번호 (서브쿼리/유니온 등 있을 때 여러 줄)
- **select_type**: 쿼리 종류 (`SIMPLE`, `PRIMARY`, `SUBQUERY` 등)
- **table**: 해당 줄에서 다루는 테이블(또는 파생 테이블/임시 테이블) 이름
- **type**: 접근 방식
  - `ALL` : 풀 스캔 (가장 느린 편, 인덱스 없음)
  - `index` : 인덱스 전체 스캔
  - `range` : 인덱스 범위 스캔 (날짜 범위, between 등)
  - `ref` / `eq_ref` : 조인 키 기반 조회
  - `const` : 거의 상수처럼 한 행만 읽는 경우
- **key**: 실제로 사용된 인덱스 이름
- **rows**: MySQL이 예상하는 읽기 행 수 (대략적인 추정치)
- **Extra**: 추가 정보 (`Using index`, `Using where`, `Using temporary`, `Using filesort` 등)

### 3-2. Extra에서 자주 보는 값

- `Using index`
  - 쿼리에 필요한 컬럼이 전부 **인덱스에만 있어서** 테이블 데이터까지 안 타는 경우 (커버링 인덱스)
- `Using where`
  - WHERE 조건이 실제로 적용되고 있다는 뜻 (인덱스를 쓰면서도 같이 자주 보임)
- `Using temporary`
  - 임시 테이블을 만들고 있음 → GROUP BY / ORDER BY 조합 등에서 자주 발생, 많아지면 성능 이슈 가능
- `Using filesort`
  - 인덱스로 정렬하지 못해 별도의 정렬 과정을 수행 중 → ORDER BY 컬럼 인덱싱을 고려할 타이밍

### 3-3. EXPLAIN 볼 때의 간단한 루틴

1. `type`이 `ALL`(풀 스캔)인지 먼저 확인  
2. `key`에 **의도한 인덱스**가 찍히는지 확인  
3. `rows`가 너무 크지는 않은지 확인 (데이터 양 대비 과도하게 큰지 감으로 체크)  
4. `Extra`에서 `Using temporary`, `Using filesort`가 계속 보인다면,  
   인덱스 설계나 쿼리 형태를 한 번 더 점검

실행 계획을 보는 습관을 들이면, “느려진 다음에 고치는” 것보다  
“처음 쿼리 설계할 때부터 성능을 함께 고려하는” 쪽으로 자연스럽게 사고가 바뀝니다.

---

## 4. 복합 인덱스 설계 팁

복합 인덱스(두 개 이상 컬럼)를 만들 때는 **WHERE 절에 등장하는 순서 + 카디널리티(값의 다양성)**를 기준으로 설계합니다.

예시 쿼리:

```sql
SELECT *
FROM orders
WHERE user_id = 10
  AND status = 'PAID'
  AND created_at >= '2026-01-01'
ORDER BY created_at DESC;
```

좋은 인덱스 후보:

```sql
CREATE INDEX idx_orders_user_status_created_at
ON orders (user_id, status, created_at);
```

- `user_id` → 값이 다양할수록(카디널리티가 높을수록) 필터링 효과 큼
- `status` → 값이 적더라도 자주 조건에 쓰이면 복합 인덱스 내에서 유용
- `created_at` → 정렬과 범위 조건에 사용

---

## 5. 실무에서 자주 나는 쿼리 성능 이슈

1. **와일드카드 앞에 붙이기**
   - `WHERE name LIKE '%abc'` 는 인덱스를 타기 어려움
2. **함수 감싼 컬럼**
   - `WHERE DATE(created_at) = '2026-02-01'` 처럼 컬럼에 함수를 씌우면 인덱스 사용 어려움  
   - 대신 `created_at >= '2026-02-01 00:00:00' AND created_at < '2026-02-02 00:00:00'`
3. **불필요한 ORDER BY + LIMIT**
   - 정렬 대상 컬럼이 인덱스 마지막에 위치하도록 설계하면, `ORDER BY ... LIMIT` 최적화 가능

---

## 6. 체크리스트

1. 자주 호출되는 쿼리는 **항상 EXPLAIN으로 실행 계획 확인**
2. WHERE / ORDER BY에 자주 쓰이는 컬럼에 인덱스 구성
3. `SELECT *` 지양, 필요한 컬럼만 가져오기
4. 함수/연산이 컬럼에 직접 적용된 WHERE 조건은 최대한 줄이기

MySQL 쿼리는 “문법” 자체보다, **데이터 양이 많아졌을 때 어떻게 동작할지를 항상 상상하면서 작성하는 것**이 중요합니다.

---

## 7. EXPLAIN ANALYZE로 실제 실행 시간 보기

MySQL 8부터는 `EXPLAIN ANALYZE`를 통해 **실제 실행 시간까지 포함된 실행 계획**을 볼 수 있습니다.

```sql
EXPLAIN ANALYZE
SELECT id, name
FROM users
WHERE status = 'ACTIVE'
  AND created_at >= '2026-01-01';
```

예시 출력(요약):

```text
-> Filter: ((users.status = 'ACTIVE') and (users.created_at >= '2026-01-01'))  
    (cost=..., rows=..., time=0.001..0.050 rows=100 loops=1)
```

여기서 볼 것:

- `time=0.001..0.050` : 예상/실제 실행 시간 범위
- `rows=100` : 실제로 읽은(또는 예상하는) 행 수
- `loops=1` : 몇 번 반복되었는지 (조인/서브쿼리에서 유용)

`EXPLAIN`은 “어떻게 읽을 것인지”를,  
`EXPLAIN ANALYZE`는 “실제로 얼마나 걸렸는지”를 같이 보여준다고 생각하면 됩니다.



