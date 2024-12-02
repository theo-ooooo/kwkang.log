import { useCallback, useEffect, useRef } from "react";

interface UseActiveChildElementScrollProps {
  containerRef: React.RefObject<HTMLDivElement>;
  activeId: string;
  behavior?: ScrollBehavior;
}

export default function useActiveChildElementScroll({
  containerRef,
  activeId,
  behavior = "smooth",
}: UseActiveChildElementScrollProps) {
  const itemRefs = useRef<Record<string, HTMLElement | null>>({});
  useEffect(() => {
    const parentRefExists = containerRef && containerRef.current;

    const activeChildRef = activeId ? itemRefs.current[activeId] : null;

    if (!parentRefExists || !activeChildRef) {
      return;
    }
    const container = containerRef.current;
    if (!activeChildRef.offsetParent) return;

    if (activeChildRef) {
      container.scrollTo({
        top:
          activeChildRef.offsetTop -
          (activeChildRef.offsetParent?.clientHeight -
            activeChildRef.offsetHeight) /
            2,
        left:
          activeChildRef.offsetLeft -
          container.offsetWidth / 2 +
          activeChildRef.offsetWidth / 2,
        behavior,
      });
    }
  }, [activeId, containerRef, behavior]);

  const registerCHildRef = useCallback(
    (instance: HTMLElement, id: string) => {
      itemRefs.current[id] = instance;
    },
    [itemRefs]
  );

  return registerCHildRef;
}
