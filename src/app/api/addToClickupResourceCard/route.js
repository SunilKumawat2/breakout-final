// app/api/addToClickupResource/route.js

export async function POST(request) {
    try {
        const body = await request.json();

        console.log("CLICKUP BODY =>", body);

        const {
            name,
            whatsappNumber,
            email,
            resourceId,
            pageUrl,
            consultation,
            resourceName,
            resourceType,
        } = body;

        const listId = process.env.CLICK_UP_RESOURCE_LIST_ID;

        if (!listId) {
            return Response.json(
                { success: false, error: "Missing ClickUp List ID" },
                { status: 500 }
            );
        }

        // ================= CLEAN PHONE =================
        const cleanPhone = whatsappNumber?.replace(/\D/g, "");
        // ================= CUSTOM FIELDS (ONLY VALID ONES) =================
        const custom_fields = [
            email && {
                id: "0cfa24df-a50a-4611-bd5d-d759b86057a0",
                value: email,
            },

            whatsappNumber && {
                id: "91bfcaaa-6700-47ae-b161-5d9f88c57359",
                value: `+91${cleanPhone}`,
            },

            pageUrl && {
                id: "769236d6-fd0b-4529-ac7c-914572ab3655",
                value: pageUrl,
            },

            resourceName && {
                id: "e6028769-ccbb-472b-94a4-93f3318a3288",
                value: resourceName,
            },

            resourceType && {
                id: "d22477a4-53f3-4e1d-bf6f-c7458827a89c",
                value: resourceType,
            },

            consultation && {
                id: "f6bb8b5c-ae77-43b0-932f-211b5d0401e4",
                value: consultation,
            },

            {
                id: "1165d40d-1d80-4bee-befc-d66605d4b0bd",
                value: "resource_modal",
            },
        ].filter(Boolean);

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
                    name: `${name || "Unknown"}`,

                    description: `
📌 Brochure Download Lead

📦 Resource ID: ${resourceId || "N/A"}
📄 Resource Name: ${resourceName || "N/A"}
📂 Resource Type: ${resourceType || "N/A"}
🔗 Page URL: ${pageUrl || "N/A"}
`,

                    custom_fields,
                }),
            }
        );

        const data = await response.json();

        // ================= ERROR HANDLING =================
        if (!response.ok) {
            return Response.json(
                {
                    success: false,
                    error: data,
                    message: "ClickUp API failed",
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