import { useEffect, useRef } from "react";

interface UseActiveChildElementScrollProps {
  containerRef: React.RefObject<HTMLDivElement>;
  activeIndex: number;
  behavior?: ScrollBehavior;
}

export default function useActiveChildElementScroll({
  containerRef,
  activeIndex,
  behavior = "smooth",
}: UseActiveChildElementScrollProps) {
  useEffect(() => {
    if (containerRef.current && activeIndex >= 0) {
      const container = containerRef.current;
      const activeElement = container.children[activeIndex] as HTMLElement;
      if (activeElement) {
        container.scrollTo({
          left:
            activeElement.offsetLeft -
            container.offsetWidth / 2 +
            activeElement.offsetWidth / 2,
          behavior,
        });
      }
    }
  }, [activeIndex, containerRef, behavior]);
}
