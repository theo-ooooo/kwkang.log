---
title: "Spring Boot 정리 - 실무 서비스 구조와 핵심 개념"
date: "2026-01-28"
tag: "springboot,spring"
---

Spring Boot는 Spring 기반 애플리케이션을 **빠르게 시작하고 운영**할 수 있도록 도와주는 프레임워크입니다.  
복잡한 XML 설정 없이, 스타터 의존성과 자동 설정(auto configuration)으로 대부분의 기본 구성을 대신해 줍니다.

---

## 1. 프로젝트 구조

가장 기본적인 Spring Boot 프로젝트 구조는 다음과 같습니다.

```text
src
 └ main
    ├ java
    │  └ com.example.demo
    │     ├ DemoApplication.kt(or .java)
    │     ├ controller
    │     ├ service
    │     └ repository
    └ resources
       ├ application.yml
       └ static / templates
```

- `DemoApplication` : `@SpringBootApplication`이 붙은 진입점
- `controller` : HTTP 요청/응답 진입 지점
- `service` : 비즈니스 로직
- `repository` : DB 접근 레이어(JPA, MyBatis 등)

---

## 2. REST API 기본 예제 (Kotlin)

```kotlin
@RestController
@RequestMapping("/api/users")
class UserController(
    private val userService: UserService
) {

    @GetMapping
    fun getUsers(): List<UserResponse> =
        userService.getUsers()
}
```

```kotlin
@Service
class UserService(
    private val userRepository: UserRepository
) {
    fun getUsers(): List<UserResponse> =
        userRepository.findAll()
            .map { UserResponse.from(it) }
}
```

```kotlin
interface UserRepository : JpaRepository<UserEntity, Long>
```

- Spring Boot는 위와 같은 패턴을 기준으로 자동으로 Bean을 등록하고, 의존성 주입(DI)을 처리합니다.

---

## 3. 설정 파일과 프로필

- `application.yml` 또는 `application.properties`에 환경 설정을 정의
- `spring.profiles.active`를 사용해 `local`, `dev`, `prod` 등을 분리

```yaml
spring:
  profiles:
    active: local

---
spring:
  config:
    activate:
      on-profile: local
  datasource:
    url: jdbc:h2:mem:testdb

---
spring:
  config:
    activate:
      on-profile: prod
  datasource:
    url: jdbc:mysql://...
```

---

## 4. 실무에서 자주 쓰는 기능들

1. **Spring Data JPA**  
   - `JpaRepository` 상속만으로 CRUD 메서드 제공  
   - 메서드 이름 기반 쿼리(`findByEmail`, `findByStatusAndType` 등)
2. **Validation**  
   - `@Valid`, `@NotNull`, `@Size` 등으로 요청 값 검증
3. **Exception Handling**  
   - `@RestControllerAdvice` + `@ExceptionHandler`로 공통 에러 응답 처리
4. **Actuator**  
   - `/actuator/health` 등 모니터링 엔드포인트 제공

---

## 5. Spring Boot 사용할 때의 팁

1. **레이어 분리**(controller/service/repository)를 지켜서 테스트와 유지보수를 쉽게 만들 것  
2. 설정은 최대한 `application.yml`에 모으고, 상수/시크릿은 별도의 관리 방식(.env, Secret Manager 등)을 사용할 것  
3. 부트가 자동으로 만들어주는 Bean/설정을 “대충 쓰기”보다는,  
   **어떤 의존성이 어디에서 주입되는지**를 한 번씩은 명시적으로 확인해 두기  
4. Kotlin과 함께 사용할 경우, `data class` + `val` 필드로 불변성을 최대한 유지

Spring Boot는 “처음 시작할 때 빠른 것”보다,  
**운영 단계에서도 안정적으로 서비스 구조를 유지할 수 있게 해주는 프레임워크**라는 관점으로 보는 것이 좋습니다.


