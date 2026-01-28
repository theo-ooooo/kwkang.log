---
title: "React Query 심화 - 캐싱 전략과 무한 스크롤, 에러 핸들링"
date: "2026-01-24"
tag: "react,react-query,next.js"
---

React Query는 클라이언트에서 서버 상태(데이터)를 관리하는 데 특화된 라이브러리입니다.  
이 글에서는 기본 `useQuery`/`useMutation`에서 한 단계 나아가, **캐싱 전략, 무한 스크롤, 에러 핸들링**을 중심으로 정리합니다.

---

## 1. 캐시 전략: staleTime, cacheTime

```tsx
const { data, isFetching } = useQuery({
  queryKey: ["posts"],
  queryFn: fetchPosts,
  staleTime: 1000 * 60, // 1분 동안 fresh
  cacheTime: 1000 * 60 * 5, // 5분 동안 메모리에 유지
});
```

- **staleTime**: 이 시간 동안은 데이터를 “신선(fresh)”하다고 보고,  
  같은 컴포넌트가 마운트되어도 다시 요청하지 않습니다.
- **cacheTime**: 컴포넌트에서 더 이상 쓰지 않더라도, 이 시간 동안은 캐시로 남겨뒀다가 재사용합니다.

리스트 페이지처럼 “자주 왔다 갔다 하는 화면”은 staleTime을 적당히 길게 두면 사용자 경험이 좋아집니다.

---

## 2. prefetch와 초기 데이터

### 2-1. 미리 가져오기(prefetch)

```tsx
queryClient.prefetchQuery({
  queryKey: ["post", postId],
  queryFn: () => fetchPost(postId),
});
```

- 사용자가 상세 페이지로 이동할 것이 **거의 확실한 상황**이라면, 미리 데이터를 가져와서 체감 속도를 높일 수 있습니다.

### 2-2. initialData 활용

```tsx
const { data } = useQuery({
  queryKey: ["post", post.id],
  queryFn: () => fetchPost(post.id),
  initialData: post, // 리스트에서 이미 갖고 있는 데이터
});
```

- 리스트 → 상세 화면으로 이동할 때, 리스트에서 이미 일부 데이터를 들고 있다면 initialData로 먼저 보여주고 나서 최신 데이터를 fetch하는 패턴이 유용합니다.

---

## 3. 무한 스크롤: useInfiniteQuery

```tsx
const {
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
} = useInfiniteQuery({
  queryKey: ["posts", "infinite"],
  queryFn: ({ pageParam = 0 }) => fetchPosts({ cursor: pageParam }),
  getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
});
```

```tsx
return (
  <>
    {data?.pages.map((page, i) => (
      <Fragment key={i}>
        {page.items.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </Fragment>
    ))}

    <button
      disabled={!hasNextPage || isFetchingNextPage}
      onClick={() => fetchNextPage()}
    >
      {isFetchingNextPage ? "불러오는 중..." : hasNextPage ? "더 보기" : "끝"}
    </button>
  </>
);
```

- `getNextPageParam`에서 다음 페이지를 가져오기 위한 **커서(cursor)** 또는 페이지 번호를 반환합니다.
- 백엔드에서 커서 기반 페이징을 제공하면, offset 방식보다 더 안정적인 무한 스크롤을 만들 수 있습니다.

---

## 4. 낙관적 업데이트(Optimistic Update)

사용자 경험을 위해, 서버 응답을 기다리기 전에 **UI를 먼저 바꾸고 나중에 롤백하는 패턴**입니다.

```tsx
const queryClient = useQueryClient();

const { mutate } = useMutation({
  mutationFn: toggleLike,
  onMutate: async (postId: number) => {
    await queryClient.cancelQueries({ queryKey: ["post", postId] });

    const prev = queryClient.getQueryData<Post>(["post", postId]);

    if (prev) {
      queryClient.setQueryData<Post>(["post", postId], {
        ...prev,
        liked: !prev.liked,
        likeCount: prev.likeCount + (prev.liked ? -1 : 1),
      });
    }

    return { prev };
  },
  onError: (_error, postId, context) => {
    if (context?.prev) {
      queryClient.setQueryData(["post", postId], context.prev);
    }
  },
  onSettled: (data, error, postId) => {
    queryClient.invalidateQueries({ queryKey: ["post", postId] });
  },
});
```

- `onMutate`에서 이전 값 백업 + 즉시 UI 업데이트
- 실패 시 `onError`에서 롤백
- 최종적으로 `invalidateQueries`로 서버 값과 동기화

---

## 5. 에러 핸들링과 전역 상태

React Query는 각 쿼리에서 에러를 다룰 수도 있고, 전역 리스너로 공통 처리도 할 수 있습니다.

```tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      onError: (error) => {
        console.error("Query Error", error);
      },
    },
  },
});
```

- `retry`를 너무 크게 두면, 이미 실패가 명확한 요청에서 사용자에게 **지연된 실패 경험**을 주게 될 수 있습니다.
- 인증 에러(401/403)처럼 공통 처리해야 하는 에러는 **Axios 인터셉터 + React Query onError 조합**으로 설계하는 게 좋습니다.

---

## 6. 실무에서의 React Query 쿼리 설계 팁

1. **쿼리 키 설계**를 신중하게 (`["posts", filter]`, `["user", userId]` 등)  
2. staleTime / cacheTime을 화면 성격에 맞게 구분  
3. 리스트/상세, 모달 등에서 **같은 데이터를 공유**할 수 있게 쿼리 키를 일관되게 사용  
4. 낙관적 업데이트는 “취소/롤백 가능해야 한다”는 전제 하에 도입  
5. 에러/로딩 UI는 최대한 공통 컴포넌트나 레이아웃 레벨로 끌어올려 관리

React Query의 핵심은 “**서버 상태를 캐시로 관리하고, 서버와의 동기화를 최대한 자동화한다**”는 점입니다.  
쿼리 키와 캐시 전략만 잘 설계해 두면, 페이지가 많아져도 코드가 크게 복잡해지지 않습니다.


