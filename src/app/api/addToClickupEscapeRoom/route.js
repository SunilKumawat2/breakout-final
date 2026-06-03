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

        // ClickUp dropdown option IDs
        const lookingForMap = {
            Birthdays: "471572ff-6a77-48c0-b892-cafc3b8cf9ec",
            Corporate: "2bb369ba-1ec5-4645-9ded-6388cca4411f",
            "Escape Rooms": "d91c8184-0de3-4400-ac9f-a7e286264341",
            Farewells: "041f2bd3-7ff0-48d1-aadb-80c8976424be",
            "Bachelor(ette)": "85b0b96d-19ff-4439-9129-08323998b592",
            Virtual: "242296c1-ecb9-4604-9203-0ceaf6ad32df",
            "Things to do": "b7a7dfb0-4cec-4aac-a58f-53ae40b09fc6",
            Others: "497c0b07-3576-4677-a435-c3a2db37f413",
        };

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

                    //                     description: `
                    //   📞 Phone: ${whatsappNumber}
                    //   📝 Message: ${message || "N/A"}
                    //   🌐 Page: ${page || "N/A"}
                    //   🎯 Looking For: ${lookingFor || "N/A"}
                    //             `,

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
                            value: lookingForMap[lookingFor],
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