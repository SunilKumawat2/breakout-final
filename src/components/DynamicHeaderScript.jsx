// SERVER COMPONENT
export default async function DynamicHeaderScript({ slug }) {
  try {
    const api = (await import("@/helpers/api")).default;
    const res = await api.get(`/seo-page/${slug}`);
    const headerScript = res.data?.data?.pageSeo?.header_script;

    if (!headerScript) return null;

    return (
      <div
        id={`header-script-${slug}`}
        dangerouslySetInnerHTML={{ __html: headerScript }}
      />
    );
  } catch (error) {
    // Optionally log the error or handle as needed
    return null;
  }
}
