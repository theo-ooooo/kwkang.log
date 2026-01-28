---
title: "Spring Boot로 REST API 만들기 - JPA까지 한 번에 정리"
date: "2026-01-27"
tag: "springboot,spring,jpa,rest"
---

Spring Boot로 백엔드 서비스를 만들 때 가장 많이 하는 일이 **REST API + JPA로 CRUD 서버 만들기**입니다.  
이 글에서는 **프로젝트 구조 → 엔티티/DTO 설계 → 컨트롤러/서비스/리포지토리 레이어 분리 → 예외 처리**까지 실무 패턴 위주로 정리합니다.  
예제 코드는 Kotlin 기준이지만, Java로도 거의 동일하게 적용할 수 있습니다.

---

## 1. 기본 의존성과 설정

### 1-1. Gradle 의존성 예시 (Kotlin)

```kotlin
dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
    implementation("org.jetbrains.kotlin:kotlin-reflect")

    runtimeOnly("com.h2database:h2") // 로컬/테스트용 인메모리 DB
    testImplementation("org.springframework.boot:spring-boot-starter-test")
}
```

### 1-2. application.yml 기본 설정

```yaml
spring:
  datasource:
    url: jdbc:h2:mem:testdb
    driver-class-name: org.h2.Driver
    username: sa
    password:

  jpa:
    hibernate:
      ddl-auto: update
    properties:
      hibernate:
        format_sql: true
    open-in-view: false

logging:
  level:
    org.hibernate.SQL: debug
```

- `ddl-auto: update`는 로컬 개발용에만 사용하고, 운영에서는 되도록 명시적인 마이그레이션 툴(Flyway/Liquibase)을 쓰는 것이 좋습니다.
- `open-in-view: false`로 설정해서 **지연 로딩과 트랜잭션 범위**를 명확히 가져가는 것을 권장합니다.

---

## 2. 도메인 설계: Entity, DTO 분리

### 2-1. User 엔티티 예시

```kotlin
import jakarta.persistence.*

@Entity
@Table(name = "users")
class User(

    @Column(nullable = false)
    var name: String,

    @Column(nullable = false, unique = true)
    var email: String,

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null
)
```

- 엔티티는 **DB 테이블 구조에 맞춘 모델**로 생각하면 됩니다.
- 양방향 연관관계는 가급적 최소화하고, 필요할 때만 명확하게 설계합니다.

### 2-2. DTO 설계

```kotlin
data class UserCreateRequest(
    val name: String,
    val email: String
)

data class UserResponse(
    val id: Long,
    val name: String,
    val email: String
) {
    companion object {
        fun from(entity: User): UserResponse =
            UserResponse(
                id = entity.id!!,
                name = entity.name,
                email = entity.email
            )
    }
}
```

- 엔티티를 그대로 API 응답에 노출시키지 않고, **요청/응답용 DTO를 따로 두는 것**이 유지보수에 유리합니다.
- 이후 요구사항이 바뀌어도 DTO만 조정하면 되기 때문에, 엔티티 변경 영향이 적어집니다.

---

## 3. Repository, Service, Controller 레이어

### 3-1. Repository

```kotlin
import org.springframework.data.jpa.repository.JpaRepository

interface UserRepository : JpaRepository<User, Long> {
    fun findByEmail(email: String): User?
    fun existsByEmail(email: String): Boolean
}
```

- `JpaRepository`를 상속하면 대부분의 CRUD 메서드를 자동으로 사용할 수 있습니다.
- 메서드 이름 기반 쿼리를 이용하면 간단한 조회는 별도 JPQL 없이 해결 가능합니다.

### 3-2. Service

```kotlin
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class UserService(
    private val userRepository: UserRepository
) {

    @Transactional
    fun createUser(request: UserCreateRequest): Long {
        if (userRepository.existsByEmail(request.email)) {
            throw DuplicateEmailException(request.email)
        }

        val user = User(
            name = request.name,
            email = request.email
        )
        return userRepository.save(user).id!!
    }

    @Transactional(readOnly = true)
    fun getUsers(): List<UserResponse> =
        userRepository.findAll()
            .map { UserResponse.from(it) }
}
```

- **트랜잭션** 경계는 서비스 레이어에 두는 것이 일반적인 패턴입니다.
- 변경이 없는 조회 메서드에는 `readOnly = true`를 붙여 성능 최적화를 할 수 있습니다.

### 3-3. Controller

```kotlin
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/users")
class UserController(
    private val userService: UserService
) {

    @PostMapping
    fun createUser(@RequestBody request: UserCreateRequest): Long =
        userService.createUser(request)

    @GetMapping
    fun getUsers(): List<UserResponse> =
        userService.getUsers()
}
```

- 컨트롤러에서는 **HTTP 요청/응답에만 집중**하고, 비즈니스 로직은 서비스로 위임하는 구조가 좋습니다.

---

## 4. 예외 처리와 공통 응답 형태

### 4-1. 커스텀 예외 정의

```kotlin
class DuplicateEmailException(
    val email: String
) : RuntimeException("이미 사용 중인 이메일입니다. email=$email")
```

### 4-2. 공통 에러 응답

```kotlin
data class ErrorResponse(
    val code: String,
    val message: String
)
```

### 4-3. 예외 처리용 ControllerAdvice

```kotlin
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice

@RestControllerAdvice
class GlobalExceptionHandler {

    @ExceptionHandler(DuplicateEmailException::class)
    fun handleDuplicateEmail(ex: DuplicateEmailException): ErrorResponse =
        ErrorResponse(
            code = "DUPLICATE_EMAIL",
            message = ex.message ?: "이미 사용 중인 이메일입니다."
        )

    @ExceptionHandler(Exception::class)
    fun handleException(ex: Exception): ErrorResponse =
        ErrorResponse(
            code = "INTERNAL_SERVER_ERROR",
            message = "서버 에러가 발생했습니다."
        )
}
```

- 실무에서는 여기에 **HTTP 상태 코드 매핑, 로그 출력, 트레이싱 ID** 등을 추가해서 사용합니다.

---

## 5. 테스트: 슬라이스 테스트와 통합 테스트

### 5-1. Repository 테스트 (슬라이스)

```kotlin
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import org.springframework.beans.factory.annotation.Autowired
import org.assertj.core.api.Assertions.assertThat

@DataJpaTest
class UserRepositoryTest @Autowired constructor(
    private val userRepository: UserRepository
) {

    @Test
    fun `이메일로 사용자 조회`() {
        val saved = userRepository.save(User(name = "test", email = "test@example.com"))

        val found = userRepository.findByEmail("test@example.com")

        assertThat(found?.id).isEqualTo(saved.id)
    }
}
```

### 5-2. 컨트롤러 통합 테스트

```kotlin
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.post

@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTest(
    private val mockMvc: MockMvc
) {

    @Test
    fun `사용자 생성 API`() {
        val body = """
            {
              "name": "kwkang",
              "email": "test@example.com"
            }
        """.trimIndent()

        mockMvc.post("/api/users") {
            contentType = "application/json"
            content = body
        }.andExpect {
            status { isOk() }
        }
    }
}
```

- Repository 레벨은 슬라이스 테스트(`@DataJpaTest`),  
  API 레벨은 MockMvc를 이용한 통합 테스트 조합이 많이 쓰입니다.

---

## 6. 실무에서 Spring Boot + JPA 사용할 때의 체크리스트

1. **엔티티와 DTO 분리**: 엔티티를 외부 API에 그대로 노출하지 않기  
2. **트랜잭션 경계**: 비즈니스 로직이 있는 서비스 레이어에 `@Transactional` 명시  
3. **지연 로딩 주의**: where, fetch join, DTO 변환 타이밍을 고려해서 N+1 문제 방지  
4. **예외 처리 공통화**: `@RestControllerAdvice`로 에러 응답 형식을 통일  
5. **테스트 전략**: 슬라이스 테스트(+ 인메모리 DB)와 통합 테스트를 적절히 섞어서 사용

위 흐름대로 한 번 프로젝트를 직접 만들어 보면,  
Spring Boot로 만드는 대부분의 “전형적인 REST 백엔드” 구조를 한 번에 익힐 수 있습니다.  
이후에는 보안(Spring Security), 모니터링(Actuator), 배포 전략(프로필, 설정 분리) 등을 단계적으로 확장해 나가면 됩니다.


