import api from "@/helpers/api";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    const res = await api.get(`/seo-page/${slug}`);
    const data = res.data?.data;

    return Response.json({
      headerScript: data?.pageSeo?.header_script || "",
      footerScript: data?.pageSeo?.footer_script || "",
    });
  } catch (error) {
    return Response.json(
      {
        headerScript: "",
        footerScript: "",
        error: error.message || "An error occurred",
      },
      { status: 500 }
    );
  }
}
