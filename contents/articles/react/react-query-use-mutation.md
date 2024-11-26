---
title: React Query useMutation
date: "2024-11-26"
tag: "react,react-query"
---

# React Query useMutation 사용법

React Query는 React 앱에서 데이터를 fetch하고 캐시하는 것을 간단하게 만들어주는 라이브러리입니다. useMutation은 React Query에서 제공하는 함수 중 하나로, 데이터를 create, update, delete하는데 사용됩니다.

## useMutation 사용법

useMutation 함수는 두 개의 인자를 받습니다. 첫 번째 인자는 mutation 함수이고, 두 번째 인자는 옵션 객체입니다.

### mutation 함수

mutation 함수는 비동기로 데이터를 create, update, delete하는 함수입니다. mutation 함수는 async/await를 사용하여 구현합니다.

```javascript
const createTodo = async (newTodo) => {
  const response = await fetch("/api/todos", {
    method: "POST",
    body: JSON.stringify(newTodo),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};
```

### 옵션 객체

옵션 객체는 다음과 같은 속성을 가질 수 있습니다.

- mutationKey: mutation을 식별할 수 있는 고유한 값입니다. mutation 함수 이름과 같은 값으로 설정하는 것이 좋습니다.
- onSuccess: mutation 함수 실행이 성공적으로 완료되었을 때 실행되는 함수입니다.
- onError: mutation 함수 실행이 실패했을 때 실행되는 함수입니다.

```javascript
const options = {
  mutationKey: "createTodo",
  onSuccess: (data) => {
    console.log("Todo created successfully!", data);
  },
  onError: (error) => {
    console.error("Error creating todo!", error);
  },
};
```

### useMutation Hook

useMutation Hook은 mutation 함수와 옵션 객체를 인자로 받습니다. 반환값은 배열로, 첫 번째 요소는 mutate 함수이고, 두 번째 요소는 mutation 상태 정보가 담긴 객체입니다.

```javascript
import { useMutation } from "react-query";

const CreateTodoForm = () => {
  const [newTodo, setNewTodo] = useState("");
  const [mutate, { isLoading, error, data }] = useMutation(createTodo, options);

  const handleNewTodoChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleCreateTodo = () => {
    mutate({ title: newTodo });
    setNewTodo("");
  };

  return (
    <form onSubmit={handleCreateTodo}>
      <input type='text' value={newTodo} onChange={handleNewTodoChange} />
      <button type='submit' disabled={isLoading}>
        {isLoading ? "Creating Todo..." : "Create Todo"}
      </button>
      {error && <div>Error creating todo!</div>}
      {data && <div>Todo created successfully!</div>}
    </form>
  );
};
```

위 코드는 CreateTodoForm 컴포넌트를 구현한 예시입니다. useMutation Hook을 사용하여 createTodo 함수와 options 객체를 전달하고, 반환된 mutate 함수를 이용하여 데이터를 생성합니다. isLoading, error, data 상태 정보를 이용하여 mutation 상태를 표시합니다.
