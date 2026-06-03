"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function useScrollToTop() {
  const pathname = usePathname();
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 1000);
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [pathname]);
}
