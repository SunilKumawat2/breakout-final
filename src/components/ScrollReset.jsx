"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [pathname]);

  return null;
}
