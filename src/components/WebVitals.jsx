"use client";

import { useEffect } from "react";
import {
  onCLS,
  onFCP,
  onINP,
  onLCP,
  onTTFB,
} from "web-vitals";

export default function WebVitals() {
  useEffect(() => {
    const sendToAnalytics = (metric) => {
      console.log(metric);

      if (typeof window !== "undefined") {
        window.dataLayer =
          window.dataLayer || [];

        window.dataLayer.push({
          event: "web_vitals",
          metric_name: metric.name,
          metric_value: metric.value,
          metric_rating: metric.rating,
          metric_id: metric.id,
        });
      }
    };

    onCLS(sendToAnalytics);
    onFCP(sendToAnalytics);
    onINP(sendToAnalytics);
    onLCP(sendToAnalytics);
    onTTFB(sendToAnalytics);
  }, []);

  return null;
}