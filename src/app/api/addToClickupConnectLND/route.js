export async function POST(request) {
  try {
    const body = await request.json();

    const { name, email, phone, page } = body;

    const listId = process.env.CLICK_UP_WEBSITE_LIST_ID;

    const formatPhone = (phone) => {
      const cleaned = phone.replace(/\D/g, "");

      // assume India (+91) if no country code
      if (cleaned.length === 10) {
        return `+91${cleaned}`;
      }

      // if already includes country code
      if (cleaned.length > 10) {
        return `+${cleaned}`;
      }

      return phone;
    };

    const customFields = [
      email && {
        id: process.env.CLICKUP_EMAIL_FIELD_ID,
        value: email,
      },

      phone && {
        id: process.env.CLICKUP_PHONE_FIELD_ID,
        value: formatPhone(phone),
      },

      page && {
        id: process.env.CLICKUP_URL_FIELD_ID,
        value: page,
      },
    ]
      .filter(Boolean);

    // ================= CREATE TASK =================
    const response = await fetch(
      `https://api.clickup.com/api/v2/list/${listId}/task`,
      {
        method: "POST",
        headers: {
          Authorization: process.env.CLICK_UP_TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${name}`,
          custom_fields: customFields,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return Response.json(
        { success: false, error: data },
        { status: response.status }
      );
    }

    return Response.json({
      success: true,
      data,
    });

  } catch (error) {
    return Response.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}