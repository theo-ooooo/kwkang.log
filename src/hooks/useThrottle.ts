import { useEffect, useRef } from "react";

export default function useThrottle(callback: () => void, time: number) {
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, []);

  return () => {
    if (timeoutIdRef.current) {
      return;
    }
    timeoutIdRef.current = setTimeout(() => {
      callback();
      timeoutIdRef.current = null;
    }, time);
  };
}
