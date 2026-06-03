// components/RouteLoader.tsx
"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

export default function RouteLoader() {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.start();

    const timeout = setTimeout(() => {
      NProgress.done();
    }, 500);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
}
