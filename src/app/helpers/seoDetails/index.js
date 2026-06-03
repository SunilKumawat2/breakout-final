"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import api from "../api";

export const useSeoDetails = () => {
  const pathname = usePathname();
  const [seo, setSeo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pathname) return;

    const slug = pathname === "/" ? "home" : pathname.replace("/", "");

    const fetchSeo = async () => {
      try {
        const res = await api.get(`/seo-page/${slug}`);
        setSeo(res.data?.data?.pageSeo);
      } catch (err) {
        console.error("Failed to fetch SEO details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSeo();
  }, [pathname]);

  return { seo, loading };
};
