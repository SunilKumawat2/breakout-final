"use client";

import { useSeoDetails } from "../index";
// Instead of using useSeoDetails, hardcode the SEO details as per instructions

export default function SeoClientWrapper({ children }) {
  const { seo } = useSeoDetails();
  return (
    <>
      {JSON.stringify(seo)}
      <title>{seo?.meta_title}</title>
      <meta name="description" content={seo?.meta_description} />
      <meta name="keywords" content={seo?.meta_keywords} />
      <meta property="og:title" content={seo?.og_title} />
      <meta property="og:description" content={seo?.og_description} />
      <meta property="og:image" content={seo?.image} />
      {seo?.header_script && (
        <div dangerouslySetInnerHTML={{ __html: seo?.header_script }} />
      )}
      {children}
      {seo?.footer_script && (
        <div dangerouslySetInnerHTML={{ __html: seo?.footer_script }} />
      )}
    </>
  );
}
