const WATI_TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InN1bmlsay5idm1zb2x1dGlvbnNAZ21haWwuY29tIiwibmFtZWlkIjoic3VuaWxrLmJ2bXNvbHV0aW9uc0BnbWFpbC5jb20iLCJlbWFpbCI6InN1bmlsay5idm1zb2x1dGlvbnNAZ21haWwuY29tIiwiYXV0aF90aW1lIjoiMDUvMDYvMjAyNiAwMzo1NToxNCIsInRlbmFudF9pZCI6IjEwNzA4NDciLCJkYl9uYW1lIjoibXQtcHJvZC1UZW5hbnRzIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiREVWRUxPUEVSIiwiZXhwIjoyNTM0MDIzMDA4MDAsImlzcyI6IkNsYXJlX0FJIiwiYXVkIjoiQ2xhcmVfQUkifQ.83uapyNQA8xcboCvy-WCViudkcRrs-xO7sVPcHNhGrI"; // ❌ Bearer hatao
const WATI_BASE_URL = "https://live-mt-server.wati.io/1070847";

export async function POST(req) {
  try {
    const { phone, name } = await req.json();

    // clean number
    const cleanPhone = phone.replace(/\D/g, "");

    const whatsappNumber = cleanPhone.startsWith("91")
      ? cleanPhone
      : `91${cleanPhone}`;

    // IMPORTANT
    const response = await fetch(
      `${WATI_BASE_URL}/api/v1/sendTemplateMessage?whatsappNumber=${whatsappNumber}`,
      {
        method: "POST",
        headers: {
          Authorization: WATI_TOKEN,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          template_name: "leadform_breakout_escape_room",
          broadcast_name: "Lead Flow",
          channel_number: "918951891562",
          parameters: [
            {
              name: "name",
              value: name,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    return Response.json({
      success: response.ok,
      data,
    });
  } catch (err) {
    return Response.json(
      {
        success: false,
        error: err.message,
      },
      { status: 500 }
    );
  }
}