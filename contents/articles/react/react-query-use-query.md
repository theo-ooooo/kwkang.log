---
title: React Query useQuery
date: "2023-11-26"
tag: "react,react-query,next.js"
---

## react query v4 설치

```
yarn add @tanstack/react-query
```

## react query 브라우저 호환

아무 버전이나 다 되는 줄 알았는데, 호환하는 브라이저가 있는걸 알았다.

```
Chrome >= 73
Firefox >= 78
Edge >= 79
Safari >= 12.0
iOS >= 12.0
opera >= 53
```

## react query 설정하기

1. quertClient를 모든 컴포넌트가 접근하는 CRA는 app.tsx, Next.js는 \_app.tsx에 적용한다.

Next.js를 사용하기에 \_app.tsx에 적용.

```javascript
function MyApp({ Component, pageProps }: any) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Hydrate>
    </QueryClientProvider>
  );
}
```

2. 나는 Hydration를 사용했다.

- Hydration 은 미리 서버에서 여러 쿼리를 미리 가져온 다음 해당 쿼리는 queryClient로 디하이드레이션을 진행한다.
- 이는 서버가 페이지 로드시 즉시 사용할 수 있는 마크업을 사전렌더링을 할수 있다.

## react query 사용하기

1. 먼저, serverSideProps OR StaticProps로 prefetchQuery를 사용해 미리 데이터를 받아온다.

```javascript
export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["posts"], getPosts);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
```

2. 미리 받아온 데이터를 useQuery로 데이터를 받아온다.

```javascript
function Posts() {
  const { data } = useQuery({ queryKey: ["posts"], queryFn: getPosts });
  const { data: otherData } = useQuery({
    queryKey: ["posts-2"],
    queryFn: getPosts,
  });
}
```

3. query는 호출후 stale default 값이 0이기에 바로 만료처리가 되고, cache는 default 값이 5분이기에 캐시로 사용된다. (refetch 기능을 off로 변경하지 않았으면, 페이지 로드시, window focus 진입시 호출은 된다.)

## 라이프 사이클 별 상태

- fetching : 데이터 요청 상태
- fresh : 데이터가 프레시한 (만료되지 않은 상태)
  컴포넌트의 상태가 변경되더라도, 데이터를 다시 요청하지 않는다.
  새로고침하면 다시 fetching 한다.
- stale : 데이터가 만료된 상태.
  한번 프론트로 내려준 서버 데이터는, 최신화가 필요한 데이터라고 볼 수 있다.
  그 사이에 다른 유저가 데이터를 추가, 수정, 삭제 등을 할 수 있기 때문에
  컴포넌트가 마운트, 업데이트되면 데이터를 다시 요청한다.
  fresh 에서 stale 로 넘어가는 시간의 디폴트는 0이다.
- inactive : 사용하지 않는 상태
  일정 시간이 지나면 가비지 콜렉터가 캐시에서 제거한다.
  기본값 5분
- delete : 가비지 콜렉터에 의해 캐시에서 제거된 상태.
