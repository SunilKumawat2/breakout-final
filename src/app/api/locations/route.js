export async function GET() {
  try {
    const res = await fetch(`${process.env.BOOKING_SYSTEM_URL}/locations`, {
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": process.env.BOOKING_SYSTEM_API_KEY,
      },
    });

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch locations", message: error }),
      {
        status: 500,
      }
    );
  }
}
