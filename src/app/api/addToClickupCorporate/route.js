export async function POST(request) {
    try {
        const body = await request.json();

        const {
            name,
            whatsappNumber,
            email,
            location,
            date,
            applyX,
            page,
        } = body;

        const listId = process.env.CLICK_UP_WEBSITE_LIST_ID;

        const customFields = [];

        // ================= EMAIL =================
        if (email) {
            customFields.push({
                id: process.env.CLICKUP_EMAIL_FIELD_ID,
                value: email,
            });
        }

        if (whatsappNumber) {
            // convert 8596859685 -> +918596859685
            const formattedPhone = whatsappNumber.startsWith("+")
                ? whatsappNumber
                : `+91${whatsappNumber}`;

            customFields.push({
                id: process.env.CLICKUP_PHONE_FIELD_ID,
                value: formattedPhone,
            });
        }

        // ================= URL / PAGE =================
        if (page) {
            customFields.push({
                id: process.env.CLICKUP_URL_FIELD_ID,
                value: page,
            });
        }

        // ================= LOCATION =================
        if (location) {

            const locationMap = {
                "Koramangala": 0,
                "whitefield": 1,
                "Whitefield": 1,
                "JP Nagar": 2,
            };

            customFields.push({
                id: process.env.CLICKUP_LOCATION_FIELD_ID,
                value: locationMap[location],
            });
        }

        // ================= EVENT DATE =================
        if (date) {
            customFields.push({
                id: process.env.CLICKUP_EVENT_DATE_FIELD_ID,
                value: new Date(date).getTime(),
            });
        }

        // ================= APPLY X =================
        // if (applyX) {

        //     customFields.push({
        //         id: process.env.CLICKUP_APPLY_X_FIELD_ID,

        //         // dropdown option index
        //         value: applyX,
        //     });
        // }

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
                    description: applyX
                    ? `Apply for Breakout X: ${applyX}`
                    : "",
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