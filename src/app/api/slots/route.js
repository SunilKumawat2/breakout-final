export async function POST(req) {
  try {
    const { locationId, gameIds, startDate} = await req.json();

    let apiUrl = `${process.env.BOOKING_SYSTEM_URL}/slots`;

    apiUrl = `${apiUrl}?locationId=${locationId}&gameIds=${gameIds.join(
      ","
    )}&startDate=${startDate}`;

    const res = await fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": process.env.BOOKING_SYSTEM_API_KEY,
      },
    });

    const apiResponse = await res.json();
    return new Response(JSON.stringify(apiResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Failed to fetch games",
        message: error?.message || error,
      }),
      {
        status: 500,
      }
    );
  }
}
