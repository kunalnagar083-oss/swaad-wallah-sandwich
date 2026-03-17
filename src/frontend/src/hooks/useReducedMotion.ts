import { useEffect, useState } from "react";

export function useShouldReduceMotion(): boolean {
  const [reduce, setReduce] = useState(() => {
    if (typeof window === "undefined") return false;
    return (
      window.innerWidth < 768 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onResize = () => setReduce(window.innerWidth < 768 || mq.matches);
    window.addEventListener("resize", onResize, { passive: true });
    mq.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      mq.removeEventListener("change", onResize);
    };
  }, []);

  return reduce;
}
