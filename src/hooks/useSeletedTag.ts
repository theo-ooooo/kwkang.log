import { useSelectedTagStore } from "@/stores/tag";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

export default function useSeletedTag() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const { tag, seleted } = useSelectedTagStore();

  const selectedTag = searchParams.get("tag") ?? "All";

  useEffect(() => {
    seleted(selectedTag);
  }, [selectedTag, seleted]);

  const handleClick = useCallback(
    (clickTag: string) => {
      if (clickTag === tag) return;
      const move = clickTag === "All" ? "/" : `/?tag=${clickTag}`;
      router.push(move, { scroll: true });
    },
    [router, tag]
  );

  return { selectedTag: tag, handleClick };
}
