// ============================
// app/api/career-clickup/route.js
// ============================

import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
    try {
        const body = await req.json();

        const {
            name,
            phone,
            email,
            role,
            lookingFor,
            experience,
            interest,
            page,
            resumeUrl = "",
        } = body;

        // =========================
        // CLICKUP CONFIG
        // =========================
        const listId = process.env.CLICK_UP_WEBSITE_LIST_ID;
        const clickupToken = process.env.CLICK_UP_TOKEN;

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

        // =========================
        // CUSTOM FIELD IDS
        // =========================

        const FIELD_EMAIL = "0cfa24df-a50a-4611-bd5d-d759b86057a0";
        const FIELD_PHONE = "91bfcaaa-6700-47ae-b161-5d9f88c57359";
        const FIELD_SOURCE = "1165d40d-1d80-4bee-befc-d66605d4b0bd";

        // =========================
        // DESCRIPTION
        // =========================

        const description = `
          Career Application Details
           Role Applied For: ${role}
           Looking For: ${lookingFor}
           Experience: ${experience}
           Interest:${interest}
           Resume:${resumeUrl || "No Resume Uploaded"}
`;

        // ========================= CLICKUP TASK PAYLOAD ==================

        const taskData = {
            name: `${name}`,
            description,

            custom_fields: [
                {
                    id: FIELD_EMAIL,
                    value: email,
                },
                {
                    id: FIELD_PHONE,
                    value: formatPhone(phone),
                },
                {
                    id: FIELD_SOURCE,
                    value: "Career Page",
                },
                {
                    id: "769236d6-fd0b-4529-ac7c-914572ab3655",
                    value: page
                }

            ],
        };

        // =================== CREATE CLICKUP TASK ========================

        const response = await axios.post(
            `https://api.clickup.com/api/v2/list/${listId}/task`,
            taskData,
            {
                headers: {
                    Authorization: clickupToken,
                    "Content-Type": "application/json",
                },
            }
        );

        return NextResponse.json({
            success: true,
            data: response.data,
        });

    } catch (error) {

        console.log(
            "CAREER CLICKUP ERROR:",
            error?.response?.data || error
        );

        return NextResponse.json(
            {
                success: false,
                error: error?.response?.data || "Something went wrong",
            },
            { status: 500 }
        );
    }
}