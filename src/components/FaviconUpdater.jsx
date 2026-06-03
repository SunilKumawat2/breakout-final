"use client";
import { useEffect } from "react";
import { useGlobalContext } from "@/context/GlobalContext";

const FaviconUpdater = () => {
  const { siteSettings } = useGlobalContext();

  useEffect(() => {
    if (!siteSettings?.siteFavicon) return;

    let link = document.querySelector("link[rel='icon']");

    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }

    link.href = siteSettings.siteFavicon;
  }, [siteSettings]);

  return null;
};

export default FaviconUpdater;
