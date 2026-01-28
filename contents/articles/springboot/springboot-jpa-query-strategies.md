---
title: "Spring Boot JPA 쿼리 전략 - 메서드 이름, JPQL, QueryDSL까지"
date: "2026-01-25"
tag: "springboot,jpa,query"
---

Spring Data JPA를 사용할 때는 **쿼리를 어디까지 자동으로 맡기고, 어디부터 직접 작성할지**를 정하는 것이 중요합니다.  
이 글에서는 Spring Boot + JPA 환경에서 자주 쓰는 쿼리 작성 방법을 단계별로 정리합니다.

---

## 1. 메서드 이름 기반 쿼리

가장 단순한 방법은 **메서드 이름을 규칙대로 쓰면 JPA가 알아서 쿼리를 만들어 주는 방식**입니다.

```kotlin
interface UserRepository : JpaRepository<User, Long> {
    fun findByEmail(email: String): User?
    fun findByStatusAndAgeGreaterThan(status: UserStatus, age: Int): List<User>
    fun countByStatus(status: UserStatus): Long
}
```

- 단순 CRUD, 조건이 2–3개 정도까지는 메서드 이름만으로도 충분합니다.
- 메서드 이름이 너무 길어지면 **JPQL 또는 QueryDSL로 넘기는 시점**을 고민해야 합니다.

---

## 2. @Query로 JPQL 직접 작성

메서드 이름만으로 표현하기 애매해지면 `@Query`를 사용합니다.

```kotlin
interface UserRepository : JpaRepository<User, Long> {

    @Query(
        """
        select u
        from User u
        where u.status = :status
          and u.createdAt >= :from
          and u.createdAt < :to
        order by u.createdAt desc
        """
    )
    fun findActiveUsersBetween(
        @Param("status") status: UserStatus,
        @Param("from") from: LocalDateTime,
        @Param("to") to: LocalDateTime
    ): List<User>
}
```

- JPQL은 **엔티티 기준**으로 작성하는 쿼리라서, SQL보다는 약간 추상화된 문법입니다.
- 복잡한 조건, 정렬, 페이징이 섞일 때도 비교적 직관적으로 작성할 수 있습니다.

---

## 3. 네이티브 쿼리 사용 시 주의점

JPQL로 표현하기 어렵거나, DB 벤더 특화 기능(MySQL의 함수 등)을 써야 할 때는 네이티브 쿼리를 사용할 수 있습니다.

```kotlin
interface UserRepository : JpaRepository<User, Long> {

    @Query(
        value = """
            select *
            from users
            where email like concat('%', :keyword, '%')
            order by created_at desc
        """,
        nativeQuery = true
    )
    fun searchByEmailKeyword(@Param("keyword") keyword: String): List<User>
}
```

주의할 점:

1. **엔티티 변경 시 쿼리도 직접 관리**해야 함 (컴파일 타임 체크 불가)  
2. DB에 따라 문법이 달라지므로, 멀티 DB 지원에는 불리  
3. 되도록 **읽기 전용 쿼리**나 통계/리포트성 쿼리에 한정하는 것이 좋음

---

## 4. QueryDSL로 타입 안전한 쿼리

복잡한 동적 검색 조건이 많을 때는 QueryDSL이 유용합니다.  
코드 기반으로 쿼리를 조립할 수 있어, 조건이 많아도 구조를 유지하기 쉽습니다.

```kotlin
class UserQueryRepository(
    private val queryFactory: JPAQueryFactory
) {

    fun search(
        status: UserStatus?,
        name: String?
    ): List<User> {
        val user = QUser.user

        return queryFactory
            .selectFrom(user)
            .where(
                statusEq(status),
                nameContains(name)
            )
            .orderBy(user.createdAt.desc())
            .fetch()
    }

    private fun statusEq(status: UserStatus?) =
        status?.let { QUser.user.status.eq(it) }

    private fun nameContains(name: String?) =
        name?.let { QUser.user.name.containsIgnoreCase(it) }
}
```

- `where`에 `null`이 들어가면 무시되는 특성을 활용해, 옵션 조건을 깔끔하게 조립할 수 있습니다.

---

## 5. 페이징과 정렬

Spring Data JPA는 `Pageable`을 사용해 페이징을 지원합니다.

```kotlin
interface UserRepository : JpaRepository<User, Long> {
    fun findByStatus(status: UserStatus, pageable: Pageable): Page<User>
}
```

```kotlin
fun getActiveUsers(page: Int, size: Int): Page<UserResponse> {
    val pageable = PageRequest.of(page, size, Sort.by("createdAt").descending())
    return userRepository.findByStatus(UserStatus.ACTIVE, pageable)
        .map { UserResponse.from(it) }
}
```

- DB 입장에서는 `limit/offset` 쿼리로 변환됩니다.
- **뒤로 갈수록 느려지는 offset 문제**가 있으면, 커서 기반 페이징(마지막 id 기준)도 고려해야 합니다.

---

## 6. 실무에서의 쿼리 전략 정리

1. **간단한 정적 쿼리**  
   - 메서드 이름 기반 쿼리로 시작 (`findBy...`)  
2. **조건이 조금 복잡해진 정적 쿼리**  
   - `@Query` + JPQL로 전환  
3. **복잡한 동적 검색/필터링**  
   - QueryDSL 등 코드 기반 쿼리 빌더 사용  
4. **리포트/통계/성능 튜닝이 중요한 특정 쿼리**  
   - 네이티브 쿼리 + MySQL 인덱스/힌트까지 고려

핵심은 “**처음부터 모든 걸 JPA가 해주길 바라지 말고, 필요한 지점에서 SQL을 직접 가져와도 된다**”는 마인드입니다.  
도메인 로직은 JPA/엔티티로, 성능 튜닝 포인트는 SQL/인덱스로 나눠서 보는 시야를 가지면, 쿼리 전략을 선택하기 훨씬 수월해집니다.


