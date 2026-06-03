// export async function POST(request) {
//   try {
//     // Parse JSON body
//     const body = await request.json();
//     const { name, phone, category, consultation } = body;

//     if (!name || !phone || !category || !consultation) {
//       return new Response(
//         JSON.stringify({ error: "Missing required fields" }),
//         { status: 400, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     const response = await fetch(
//       `https://api.clickup.com/api/v2/list/${process.env.CLICK_UP_LIST_ID}/task`,
//       {
//         method: "POST",
//         headers: {
//           Authorization: process.env.CLICK_UP_TOKEN,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name: `${name} - ${phone}`,
//           description: `Phone: ${phone}\nCategory: ${category}\nConsultation: ${consultation}`,
//           status: "to do",
//         }),
//       }
//     );

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(data.err || "Failed to create task");
//     }

//     return new Response(
//       JSON.stringify({ message: "Task created successfully", data }),
//       { status: 200, headers: { "Content-Type": "application/json" } }
//     );
//   } catch (error) {
//     return new Response(JSON.stringify({ error: error.message }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }

const CLICK_UP_LIST_ID = "901614491941";
const CLICK_UP_TOKEN = "pk_290666884_2SENHAR485YWM1K3BK9PM0HPX9U44T1K";

export async function POST(request) {
  try {
    const body = await request.json();

    const { name,
      whatsappNumber,
      email,
      resourceId,
      lookingFor,
      message,
      page,
      date,
      iWantTo,
      at,
      attendees_count,
      forCount, } = body;

    // Select list id dynamically
    // const listId = resourceId
    //   ? process.env.CLICK_UP_RESOURCE_LIST_ID
    //   : process.env.CLICK_UP_WEBSITE_LIST_ID;
    const listId = process.env.CLICK_UP_WEBSITE_LIST_ID;

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
          description: `
📞 Phone: ${whatsappNumber}
📝 Message: ${message || "N/A"}
🌐 Page: ${page || "N/A"}
📧 Email: ${email || "N/A"}
📦 Resource ID: ${resourceId || "N/A"}
🎯 Looking For: ${lookingFor || iWantTo || "N/A"}
📍 Location: ${at || "N/A"}
👥 For: ${forCount || "N/A"}
📅 Date: ${date || "N/A"}
 Attendance Count:${attendees_count || "N/A"}
          `,
        }),
      }
    );

    const data = await response.json();

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
    return Response.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}