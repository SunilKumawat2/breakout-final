"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

export default function DynamicFooterScript({ slug }) {
  const [scriptCode, setScriptCode] = useState("");

  useEffect(() => {
    async function fetchScript() {
      const res = await fetch(`/api/scripts?slug=${slug}`);
      const data = await res.json();
      console.log("footer script", data);
      setScriptCode(data.footerScript || "");
    }
    fetchScript();
  }, [slug]);

  if (!scriptCode) return null;

  return (
    <div
      id={`footer-script-${slug}`}
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: scriptCode }}
    />
  );
}
