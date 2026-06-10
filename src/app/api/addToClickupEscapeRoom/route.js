export async function POST(request) {
    try {
        const body = await request.json();

        const {
            name,
            whatsappNumber,
            lookingFor,
            message,
            page,
        } = body;

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
                      🎯 Looking For: ${lookingFor || "N/A"}
                                `,

                    custom_fields: [
                        {
                            id: process.env.CLICKUP_PHONE_FIELD_ID,
                            value: `+91${whatsappNumber}`,
                        },
                        {
                            // URL field
                            id: process.env.CLICKUP_URL_FIELD_ID,
                            value: page || "",
                        },
                        {
                            // Looking For dropdown field
                            id: process.env.CLICKUP_LOOKING_FOR_FIELD_ID,
                              value: lookingFor || "",
                        },
                        {
                            // Comment / Question field
                            id: process.env.CLICKUP_MESSAGE_FIELD_ID,
                            value: message || "",
                        },
                    ],
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