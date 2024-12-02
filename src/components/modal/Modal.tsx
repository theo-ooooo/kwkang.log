"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children }: { children: React.ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
      dialogRef.current?.scrollTo({ top: 0 });
    }
  }, []);

  return createPortal(
    <dialog
      ref={dialogRef}
      onClose={() => router.back()}
      onClick={(e) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((e.target as any).nodeName === "DIALOG") {
          router.back();
        }
      }}
      className='w-[93%] md:w-[80%] max-w-[700px] mt-5 rounded-md border-none backdrop:bg-[rgba(0,0,0,0.7)] backdrop:dark:bg-[rgba(255,255,255, 0.3)] px-4'
    >
      {children}
    </dialog>,
    document.getElementById("modal-root") as HTMLElement
  );
}
