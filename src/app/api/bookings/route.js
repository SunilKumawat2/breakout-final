export async function POST(req) {
  try {
    console.log("========== BOOKING API START ==========");

    const body = await req.json();
    console.log("Incoming body:", body);

    const {
      locationId,
      gameId,
      slotId,
      customerFirstName,
      customerLastName,
      customerEmail,
      customerPhone,
    } = body;


    console.log("locationId:", locationId);
    console.log("gameId:", gameId);
    console.log("slotId:", slotId);

    if (!locationId || !gameId || !slotId) {
      console.log("❌ Missing required fields");
      return new Response(
        JSON.stringify({
          error: "Missing required fields",
        }),
        { status: 400 }
      );
    }

    const payload = {
      locationId,
      gameId,
      slotId,
      isPrivate: true,
      customerFirstName,
      customerLastName,
      customerEmail,
      customerPhone,
    };


    console.log("Payload being sent:", payload);

    const apiUrl = `${process.env.BOOKING_SYSTEM_URL}/prepare-booking`;
    console.log("Calling external API:", apiUrl);
    console.log("Using API Key:", process.env.BOOKING_SYSTEM_API_KEY);

    const controller = new AbortController();
    const timeout = setTimeout(() => {
      console.log("External API timeout");
      controller.abort();
    }, 15000); // 15 sec timeout

    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.BOOKING_SYSTEM_API_KEY,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    console.log("External response status:", res.status);

    const text = await res.text();
    console.log("External raw response:", text);

    return new Response(text, {
      status: res.status,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("🔥 ERROR CAUGHT:", error);

    return new Response(
      JSON.stringify({
        error: "Failed to prepare booking",
        message: error?.message || error,
      }),
      { status: 500 }
    );
  }
}
