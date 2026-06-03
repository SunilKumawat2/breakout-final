export async function POST(req) {
    try {
      console.log("========== RELEASE SEATS API START ==========");
  
      const body = await req.json();
      console.log("Incoming body:", body);
  
      const { locationId, bookingId } = body;
  
      console.log("locationId:", locationId);
      console.log("bookingId:", bookingId);
  
      // ================= VALIDATION =================
      if (!locationId || !bookingId) {
        console.log("❌ Missing required fields");
  
        return new Response(
          JSON.stringify({
            error: "Missing required fields",
          }),
          { status: 400 }
        );
      }
  
      // ================= PAYLOAD =================
      const payload = {
        locationId,
        bookingId,
      };
  
      console.log("Payload being sent:", payload);
  
      // ================= API URL =================
      const apiUrl = `${process.env.BOOKING_SYSTEM_URL}/release-seats`;
  
      console.log("Calling external API:", apiUrl);
  
      // ================= TIMEOUT =================
      const controller = new AbortController();
  
      const timeout = setTimeout(() => {
        console.log("External API timeout");
        controller.abort();
      }, 15000);
  
      // ================= API CALL =================
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
        headers: {
          "Content-Type": "application/json",
        },
      });
  
    } catch (error) {
      console.error("🔥 RELEASE SEATS ERROR:", error);
  
      return new Response(
        JSON.stringify({
          error: "Failed to release seats",
          message: error?.message || error,
        }),
        { status: 500 }
      );
    }
  }