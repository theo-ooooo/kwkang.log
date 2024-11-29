import { useCallback, useEffect, useState } from "react";

export default function useScrollOverElement(
  ref: React.RefObject<HTMLElement>
) {
  const [isOver, setIsOver] = useState(false);

  const handleScroll = useCallback(() => {
    if (!ref.current) return;
    const { bottom } = ref.current.getBoundingClientRect();

    setIsOver(bottom < 0); // 0보다 작아지면 안보이네.
  }, [ref]);

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return isOver;
}
