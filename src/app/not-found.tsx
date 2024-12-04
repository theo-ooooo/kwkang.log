"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className='flex py-3 flex-col gap-4 justify-center items-center w-full h-svh'>
      <h2 className='text-5xl font-semibold text-sky-500'>NOT-FOUND</h2>
      {/* <p className='text-base'>페이지의 오류가 발생하였습니다.</p> */}
      <button className='text-sm  p-2' onClick={() => router.push("/")}>
        메인으로 돌아가기
      </button>
    </div>
  );
}
