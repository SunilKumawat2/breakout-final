"use client";

import { useEffect } from "react";

export default function UTMTracker() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(
        window.location.search
      );

      const utmData = {
        source: params.get("utm_source"),
        medium: params.get("utm_medium"),
        campaign: params.get("utm_campaign"),
      };

      sessionStorage.setItem(
        "utm_data",
        JSON.stringify(utmData)
      );
    }
  }, []);

  return null;
}