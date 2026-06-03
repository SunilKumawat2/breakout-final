export const dynamic = "force-dynamic";
export const revalidate = 0;

import AboutPage from "@/views/AboutPage";
import api from "@/helpers/api";
import DynamicFooterScript from "@/components/DynamicFooterScript";
import DynamicHeaderScript from "@/components/DynamicHeaderScript";

export async function generateMetadata() {
  try {
    const res = await api.get(`/seo-page/about`, {
      headers: { "Cache-Control": "no-cache" },
    });
    const seo = res.data?.data?.pageSeo;

    return {
      title: seo?.meta_title,
      description: seo?.meta_description,
      keywords: seo?.meta_keywords,
      alternates: {
        canonical: "/about", // ✅ ADD THIS
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
      title: "About",
      description: "About",
      keywords: "About",
      alternates: {
        canonical: "/about", // ✅ ADD HERE ALSO
      },
      openGraph: {
        title: "About",
        description: "About",
      },
    };
  }
}

export default function page() {
  return (
    <>
      <DynamicHeaderScript slug="about" />
      <AboutPage />
      <DynamicFooterScript slug="about" />
    </>
  );
}
