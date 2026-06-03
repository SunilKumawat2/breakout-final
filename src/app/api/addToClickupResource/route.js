export async function POST(request) {
  try {
    const body = await request.json();

    const {
      name,
      whatsappNumber,
      email,
      resourceId,
      page,
      lookingFor,
      attendees_count,
      date,
      consultation,
      resourceName,
      resourceType,
    } = body;

    const listId = process.env.CLICK_UP_RESOURCE_LIST_ID;

    // ================= LOOKING FOR UUID MAP =================
    const lookingForMap = {
      birthday: "471572ff-6a77-48c0-b892-cafc3b8cf9ec",
      corporate: "2bb369ba-1ec5-4645-9ded-6388cca4411f",
      "escape rooms": "d91c8184-0de3-4400-ac9f-a7e286264341",
      farewells: "041f2bd3-7ff0-48d1-aadb-80c8976424be",
      bachelor: "85b0b96d-19ff-4439-9129-08323998b592",
      "things to do": "b7a7dfb0-4cec-4aac-a58f-53ae40b09fc6",
      others: "497c0b07-3576-4677-a435-c3a2db37f413",
    };

    function getLookingForOptionId(value) {
      return lookingForMap[value?.trim()?.toLowerCase()];
    }

    const lookingForOptionId =
      getLookingForOptionId(lookingFor);

    // ================= PHONE FORMAT =================
    const cleanPhone =
      whatsappNumber?.replace(/\D/g, "");

    // ================= CUSTOM FIELDS =================
    const custom_fields = [];

    // PHONE
    if (cleanPhone) {
      custom_fields.push({
        id: "91bfcaaa-6700-47ae-b161-5d9f88c57359",
        value: `+91${cleanPhone}`,
      });
    }

    // EMAIL
    if (email) {
      custom_fields.push({
        id: "0cfa24df-a50a-4611-bd5d-d759b86057a0",
        value: email,
      });
    }

    // PAGE URL
    if (page) {
      custom_fields.push({
        id: "769236d6-fd0b-4529-ac7c-914572ab3655",
        value: page,
      });
    }

    if (resourceName) {
      custom_fields.push({
        id: "e6028769-ccbb-472b-94a4-93f3318a3288",
        value: resourceName,
      });
    }

    if (consultation) {
      custom_fields.push({
        id: "f6bb8b5c-ae77-43b0-932f-211b5d0401e4",
        value: consultation,
      });
    }

    if (resourceType) {
      custom_fields.push({
        id: "d22477a4-53f3-4e1d-bf6f-c7458827a89c",
        value: resourceType,
      });
    }

    // LOOKING FOR DROPDOWN
    if (lookingForOptionId) {
      custom_fields.push({
        id: "25299d9a-4319-4577-aa5a-e1fc8655cf5c",
        value: lookingForOptionId,
      });
    }

    // ATTENDEES COUNT (NUMBER FIELD)
    if (attendees_count) {
      const match = attendees_count.match(/\d+/);

      custom_fields.push({
        id: "1d0028f4-d2ee-4e53-a060-2af089193d44",
        value: match ? Number(match[0]) : 0,
      });
    }

    // EVENT DATE
    if (date) {
      custom_fields.push({
        id: "3ba361e2-a9b0-4da8-8b20-7d08cba85366",
        value: new Date(
          `${date}T00:00:00.000Z`
        ).getTime(),
      });
    }

    // ================= PAYLOAD =================
    const payload = {
      name: name || "Website Lead",

      description: `
📌 Brochure Download Lead

📦 Resource ID: ${resourceId || ""}

📅 Date: ${date || "N/A"}

👥 Attendees: ${attendees_count || "N/A"}

🎯 Looking For: ${lookingFor || "N/A"}
Consultation: Free Consultation Required: ${consultation}
      `,

      custom_fields,
    };

    console.log(
      "CLICKUP PAYLOAD =====>",
      JSON.stringify(payload, null, 2)
    );

    // ================= API CALL =================
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

    const data = await response.json();

    console.log("CLICKUP RESPONSE =====>", data);

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

    console.log("CLICKUP ERROR =====>", error);

    return Response.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}