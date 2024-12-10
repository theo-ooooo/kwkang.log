import { useEffect, useState } from "react";
import useThrottle from "./useThrottle";

export default function useScrollOverElement(
  ref: React.RefObject<HTMLElement | null>
) {
  const [isOver, setIsOver] = useState(false);

  const handleScroll = useThrottle(() => {
    if (!ref.current) return;
    const { bottom } = ref.current.getBoundingClientRect();

    setIsOver(bottom < 0); // 0보다 작아지면 안보이네.
  }, 200);

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return isOver;
}
