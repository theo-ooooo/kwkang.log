---
title: "Kotlin 정리 - 실무에서 바로 쓰는 문법과 패턴"
date: "2026-01-28"
tag: "kotlin"
---

Kotlin은 **Null 안정성**, 간결한 문법, 함수형 스타일을 지원하는 JVM 언어로,  
안드로이드와 백엔드(Spring Boot)에서 모두 널리 사용됩니다.  
이 글에서는 실무에서 자주 사용하는 문법과 패턴을 간략히 정리합니다.

---

## 1. 변수와 Null 안정성

```kotlin
val name: String = "kwkang"   // 불변
var age: Int = 10             // 가변

val nullableName: String? = null
```

- `?`가 붙은 타입만 `null` 허용
- `?.`, `?:`, `!!` 연산자를 통해 Null 처리를 명시적으로 할 수 있습니다.

```kotlin
val length = nullableName?.length ?: 0  // null이면 0
```

---

## 2. 함수와 기본 인자, 확장 함수

```kotlin
fun greet(name: String = "World"): String {
    return "Hello, $name"
}

// 확장 함수 예시
fun String.firstOrEmpty(): String {
    return if (this.isNotEmpty()) this.substring(0, 1) else ""
}
```

- 기본 인자(default parameter)로 오버로딩을 줄일 수 있음
- 확장 함수는 기존 클래스에 메서드를 “붙이는 것처럼” 사용할 수 있어,  
  유틸리티 코드를 깔끔하게 정리할 수 있습니다.

---

## 3. 데이터 클래스와 when

```kotlin
data class User(
    val id: Long,
    val name: String,
    val age: Int
)

fun getType(age: Int): String =
    when {
        age < 13 -> "child"
        age < 20 -> "teenager"
        else -> "adult"
    }
```

- `data class`는 `toString`, `equals`, `hashCode`, `copy`를 자동 생성
- `when`은 switch 문보다 더 강력한 표현력을 제공

---

## 4. 컬렉션과 함수형 스타일

```kotlin
val numbers = listOf(1, 2, 3, 4, 5)

val result = numbers
    .filter { it % 2 == 0 }
    .map { it * 10 }
    .toList()
```

- `map`, `filter`, `fold` 등 함수형 API를 적극 활용하면  
  루프 + 임시 변수 조합을 줄이고, **의도가 더 잘 보이는 코드**를 만들 수 있습니다.

---

## 5. 실무에서 Kotlin을 사용할 때의 팁

1. 널 처리 규칙을 팀 내에서 명확하게 맞출 것 (`!!` 남용 금지)  
2. DTO, VO, Response 등에는 적극적으로 `data class` 사용  
3. 컬렉션과 함수형 API로 “무슨 데이터를 만들고 싶은지”를 중심으로 코드 작성  
4. Java와 혼합 프로젝트에서는 **상호 운용성(interop)**을 고려해 어노테이션(`@JvmStatic`, `@JvmOverloads` 등)을 적절히 사용

Kotlin은 문법이 많은 것 같지만, 실제로 자주 쓰는 패턴은 한정되어 있습니다.  
초반에는 “Java 코드를 Kotlin 스타일로 조금씩 바꿔본다”는 느낌으로 접근하는 것이 가장 빠르게 익숙해지는 방법입니다.


