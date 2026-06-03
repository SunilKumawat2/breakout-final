export async function POST(request) {
  try {
    // Receive full body as string and then parse
    const bodyText = await request.text();
    let body;
    try {
      body = JSON.parse(bodyText);
    } catch (err) {
      return new Response(JSON.stringify({ error: "Invalid JSON" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Bind entire received body to the task
    const clickupBody = {
      name: `${body?.name || ""} - ${body?.phone || ""}`,
      description: `Full Submission:\n${JSON.stringify(body, null, 2)}`,
      status: "to do",
    };

    // Use minimal required fields for error, but otherwise bind all data
    // if (!body?.name || !body?.phone || !body?.lookingFor || !body?.message) {
    //   return new Response(
    //     JSON.stringify({ error: "Missing required fields" }),
    //     { status: 400, headers: { "Content-Type": "application/json" } }
    //   );
    // }

    const response = await fetch(
      `https://api.clickup.com/api/v2/list/${process.env.CLICK_UP_LIST_ID}/task`,
      {
        method: "POST",
        headers: {
          Authorization: process.env.CLICK_UP_TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clickupBody),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.err || "Failed to create task");
    }

    return new Response(
      JSON.stringify({ message: "Task created successfully", data }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
