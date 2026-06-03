// app/api/addToClickup/route.js

import { NextResponse } from "next/server";

const CLICKUP_TOKEN = process.env.CLICK_UP_TOKEN;
const CLICKUP_LIST_ID = process.env.CLICK_UP_WEBSITE_LIST_ID;

// -----------------------------
// DROPDOWN OPTION IDS
// -----------------------------

const BRANCH_OPTIONS = {
    Koramangala: "c8855921-430a-4ae0-9726-67327a81d464",
    Whitefield: "a9295c1d-062b-4e2a-b084-9c3a5d05551b",
    "JP Nagar": "65d716ad-1656-4d18-9aca-ae3c3ade27d9",
};

const EVENT_PURPOSE_OPTIONS = {
    "Breakout X": "7c1d7a43-4168-45de-9d5d-537b7736c8f9", // Other
};

// -----------------------------
// POST API
// -----------------------------

export async function POST(req) {
    try {
        const body = await req.json();

        const {
            name,
            whatsappNumber,
            email,
            date,
            at,
            iWantTo,
            page,
        } = body;

        // -----------------------------
        // CUSTOM FIELDS
        // -----------------------------

        const formatPhone = (whatsappNumber) => {
            const cleaned = whatsappNumber.replace(/\D/g, "");

            // assume India (+91) if no country code
            if (cleaned.length === 10) {
                return `+91${cleaned}`;
            }

            // if already includes country code
            if (cleaned.length > 10) {
                return `+${cleaned}`;
            }

            return whatsappNumber;
        };

        const custom_fields = [
            // Email
            email && {
                id: "0cfa24df-a50a-4611-bd5d-d759b86057a0",
                value: email,
            },

            // Phone Number
            whatsappNumber && {
                id: process.env.CLICKUP_PHONE_FIELD_ID,
                value: formatPhone(whatsappNumber),
            },

            // Event Date
            date && {
                id: "3ba361e2-a9b0-4da8-8b20-7d08cba85366",
                value: new Date(date).getTime(),
            },

            // Location Text
            at && {
                id: "16ea9827-325d-4703-99bb-5c75b4950311",
                value: at,
            },

            // Branch Dropdown
            at &&
            BRANCH_OPTIONS[at] && {
                id: "7c189091-4237-49fe-b7f0-81ca199ef52d",
                value: BRANCH_OPTIONS[at],
            },

            // Event Type/Purpose Dropdown
            iWantTo &&
            EVENT_PURPOSE_OPTIONS[iWantTo] && {
                id: "f0bc39f3-9654-47e4-905a-b3a57c43c833",
                value: EVENT_PURPOSE_OPTIONS[iWantTo],
            },

            // Source
            {
                id: "1165d40d-1d80-4bee-befc-d66605d4b0bd",
                value: "Website - Breakout X Form",
            },

            // URL
            page && {
                id: "769236d6-fd0b-4529-ac7c-914572ab3655",
                value: page,
            },
        ].filter(Boolean);

        // -----------------------------
        // TASK PAYLOAD
        // -----------------------------

        const payload = {
            name: name || "New Lead",

            description: `
            📌 Breakout X Lead
            🚀 Applied For: ${iWantTo || "N/A"}
      `,
            status: "open leads",
            custom_fields,
        };

        // -----------------------------
        // CREATE CLICKUP TASK
        // -----------------------------

        const response = await fetch(
            `https://api.clickup.com/api/v2/list/${CLICKUP_LIST_ID}/task`,
            {
                method: "POST",
                headers: {
                    Authorization: CLICKUP_TOKEN,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error("ClickUp Error:", data);

            return NextResponse.json(
                {
                    success: false,
                    error: data,
                },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            data,
        });
    } catch (error) {
        console.error("API ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            { status: 500 }
        );
    }
}