import React from "react";
import ActivityPage from "@/views/ActivityPage";
import api from "@/helpers/api";
import DynamicFooterScript from "@/components/DynamicFooterScript";
import DynamicHeaderScript from "@/components/DynamicHeaderScript";

export async function generateMetadata({ params }) {
  try {
    const { id } = params || {};
    const res = await api.get(`/seo-page/${id}`);
    const seo = res.data?.data?.pageSeo;

    return {
      title: seo?.meta_title,
      description: seo?.meta_description,
      keywords: seo?.meta_keywords,
      // ✅ ADD THIS (IMPORTANT)
      alternates: {
        canonical: `/activities/${id}`,
      },
      openGraph: {
        title: seo?.og_title,
        description: seo?.og_description,
        images: [seo?.image],
        type: "website",
      },
    };
  } catch (error) {
    return {
      title: "Activity",
      description: "Activity",
      keywords: "Activity",
      // ✅ fallback canonical
      alternates: {
        canonical: `/activities/${params?.id || ""}`,
      },
      openGraph: {
        title: "Activity",
        description: "Activity",
      },
    };
  }
}

export default async function page({ params }) {
  const { id } = params || {};
  return (
    <>
      <DynamicHeaderScript slug={`${id}`} />
      <ActivityPage />
      <DynamicFooterScript slug={`${id}`} />
    </>
  );
}
