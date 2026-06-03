export async function POST(request) {
    try {
      const body = await request.json();
  
      console.log("BODY:", body);
  
      const {
        name,
        whatsappNumber,
        page,
        date,
        iWantTo,
        at,
        forCount,
      } = body;
  
      const listId = process.env.CLICK_UP_WEBSITE_LIST_ID;
  
      const custom_fields = [];
  
      // =========================
      // PHONE FIELD
      // =========================
      if (whatsappNumber) {
        // convert 8596859685 -> +918596859685
        const formattedPhone = whatsappNumber.startsWith("+")
          ? whatsappNumber
          : `+91${whatsappNumber}`;
  
        custom_fields.push({
          id: process.env.CLICKUP_PHONE_FIELD_ID,
          value: formattedPhone,
        });
      }
  
      // =========================
      // EVENT DATE
      // =========================
      if (date) {
        const timestamp = new Date(date);
  
        if (!isNaN(timestamp.getTime())) {
          custom_fields.push({
            id: process.env.CLICKUP_EVENT_DATE_FIELD_ID,
            value: timestamp.getTime(), // 👈 ClickUp expects milliseconds
          });
        } else {
          console.warn("Invalid date received:", date);
        }
      }
  
      // =========================
      // I WANT TO DROPDOWN
      // =========================
      if (iWantTo) {
        custom_fields.push({
          id: process.env.CLICKUP_I_WANT_TO_FIELD_ID,
          value: iWantTo,
        });
      }
  
      // =========================
      // LOCATION DROPDOWN
      // =========================
      if (at) {
        custom_fields.push({
          id: process.env.CLICKUP_LOCATION_FIELD_ID,
          value: at,
        });
      }
  
      // =========================
      // FOR DROPDOWN
      // =========================
      if (forCount) {
        custom_fields.push({
          id: process.env.CLICKUP_FOR_FIELD_ID,
          value: forCount,
        });
      }
  
      // =========================
      // URL FIELD
      // =========================
      if (page) {
        custom_fields.push({
          id: process.env.CLICKUP_URL_FIELD_ID,
          value: page,
        });
      }
  
      const payload = {
        name: `${name}`,
        description: "Party Lead Form",
        custom_fields,
      };
  
      console.log(
        "CLICKUP PAYLOAD:",
        JSON.stringify(payload, null, 2)
      );
  
      const response = await fetch(
        `https://api.clickup.com/api/v2/list/${listId}/task`,
        {
          method: "POST",
          headers: {
            Authorization: process.env.CLICK_UP_TOKEN,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
  
      const rawText = await response.text();
  
      console.log("RAW CLICKUP RESPONSE:", rawText);
  
      let data = {};
  
      try {
        data = JSON.parse(rawText);
      } catch (e) {
        data = { raw: rawText };
      }
  
      if (!response.ok) {
        return Response.json(
          {
            success: false,
            error: data,
          },
          { status: response.status }
        );
      }
  
      return Response.json({
        success: true,
        data,
      });
  
    } catch (error) {
      console.log("SERVER ERROR:", error);
  
      return Response.json(
        {
          success: false,
          error: error.message,
        },
        { status: 500 }
      );
    }
  }