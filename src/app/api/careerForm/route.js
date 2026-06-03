// export async function POST(request) {
//   try {
//     // Parse the multipart form data request (expecting FormData)
//     const formData = await request.formData();

//     // Extract plain inputs
//     const name = formData.get("name");
//     const phone = formData.get("phone");
//     const email = formData.get("email");
//     const role = formData.get("role");
//     const lookingFor = formData.get("lookingFor");
//     const experience = formData.get("experience");
//     const interest = formData.get("interest");
//     const page = formData.get("page");
//     const resume = formData.get("resume"); // May be a File, or null/undefined

//     // Compose task description with all fields
//     let description = `Career Submission\n`;
//     description += `- Name: ${name || ""}\n`;
//     description += `- Phone: ${phone || ""}\n`;
//     description += `- Email: ${email || ""}\n`;
//     description += `- Role: ${role || ""}\n`;
//     description += `- Looking For: ${lookingFor || ""}\n`;
//     description += `- Experience: ${experience || ""}\n`;
//     description += `- Interest: ${interest || ""}\n`;
//     description += `- Page: ${page || ""}\n`;

//     // If a resume is present, attach info about its metadata
//     let resumeInfoStr = "";
//     if (resume && typeof resume.name === "string") {
//       resumeInfoStr = `- Resume Uploaded: ${resume.name} (${resume.size} bytes, ${resume.type})\n`;
//       description += resumeInfoStr;
//     } else if (resume) {
//       description += `- Resume Uploaded: Yes\n`;
//     } else {
//       description += `- Resume Uploaded: No\n`;
//     }

//     // Compose payload for ClickUp
//     const clickupBody = {
//       name: `${name || ""} - ${phone || ""}`,
//       description,
//       status: "to do",
//     };

//     // Send to ClickUp
//     const response = await fetch(
//       `https://api.clickup.com/api/v2/list/${process.env.CLICK_UP_WEBSITE_LIST_ID}/task`,
//       {
//         method: "POST",
//         headers: {
//           Authorization: process.env.CLICK_UP_TOKEN,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(clickupBody),
//       }
//     );

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(data.err || "Failed to create task");
//     }

//     // STEP 2: Upload Resume to ClickUp as Attachment
//     if (resume && resume.size > 0) {
//       const attachmentForm = new FormData();
//       attachmentForm.append("attachment", resume, resume.name);

//       const uploadRes = await fetch(
//         `https://api.clickup.com/api/v2/task/${data.id}/attachment`,
//         {
//           method: "POST",
//           headers: {
//             Authorization: process.env.CLICK_UP_TOKEN,
//           },
//           body: attachmentForm,
//         }
//       );

//       const uploadData = await uploadRes.json();

//       if (!uploadRes.ok) {
//         console.error("Failed to upload attachment:", uploadData);
//       }
//     }

//     // Optionally: Implement resume uploading here to S3/GDrive if needed in future

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

// app/api/careerForm/route.js

import { NextResponse } from "next/server";

const CLICKUP_TOKEN = process.env.CLICK_UP_TOKEN;
const CLICKUP_LIST_ID = process.env.CLICK_UP_WEBSITE_LIST_ID;

// -------------------------------------
// CLICKUP DROPDOWN OPTION IDS
// -------------------------------------

const ROLE_OPTIONS = {
  "Game Master": "7c1d7a43-4168-45de-9d5d-537b7736c8f9",
  "Data Audit": "7e7457c6-4e4b-4032-be9a-e613ceafab94",
  "Facility Incharge": "e8bcb32b-81b7-48f0-9d22-6103c96718f6",
  Sales: "f0ec3982-1c8b-4255-aebc-2e024af63044",
  Marketing: "e8bcb32b-81b7-48f0-9d22-6103c96718f6",
};

const LOOKING_FOR_OPTIONS = {
  "full time internship": "497c0b07-3576-4677-a435-c3a2db37f413",
  "part time internship": "242296c1-ecb9-4604-9203-0ceaf6ad32df",
  "full time": "2bb369ba-1ec5-4645-9ded-6388cca4411f",
  "part time": "b7a7dfb0-4cec-4aac-a58f-53ae40b09fc6",
};

// -------------------------------------
// POST API
// -------------------------------------

export async function POST(request) {
  try {
    const formData = await request.formData();

    // -------------------------------------
    // GET FORM VALUES
    // -------------------------------------

    const name = formData.get("name");
    const phone = formData.get("phone");
    const email = formData.get("email");
    const role = formData.get("role");
    const lookingFor = formData.get("lookingFor");
    const experience = formData.get("experience");
    const interest = formData.get("interest");
    const page = formData.get("page");
    const resume = formData.get("resume");

    // -------------------------------------
    // VALID PHONE FORMAT
    // CLICKUP PHONE FIELD NEEDS +91
    // -------------------------------------

    let formattedPhone = "";

    if (phone) {
      const cleaned = phone.toString().replace(/\D/g, "");

      if (cleaned.length === 10) {
        formattedPhone = `+91${cleaned}`;
      } else if (cleaned.startsWith("91") && cleaned.length === 12) {
        formattedPhone = `+${cleaned}`;
      } else {
        return NextResponse.json(
          {
            success: false,
            error: "Invalid phone number",
          },
          { status: 400 }
        );
      }
    }

    // -------------------------------------
    // CUSTOM FIELDS
    // -------------------------------------

    const custom_fields = [
      // EMAIL
      email && {
        id: "0cfa24df-a50a-4611-bd5d-d759b86057a0",
        value: email,
      },

      // PHONE
      formattedPhone && {
        id: "91bfcaaa-6700-47ae-b161-5d9f88c57359",
        value: formattedPhone,
      },

      // SOURCE
      {
        id: "1165d40d-1d80-4bee-befc-d66605d4b0bd",
        value: "Website Career Form",
      },

      // URL
      page && {
        id: "769236d6-fd0b-4529-ac7c-914572ab3655",
        value: page,
      },

      // DESCRIPTION / INTEREST
      interest && {
        id: "4d04442b-dd9d-48ee-8cfa-088ed1545e39",
        value: interest,
      },

      // EXPERIENCE
      experience && {
        id: "71ee9700-817f-4437-8cf0-aa28f3f7da99",
        value: `${experience} Years Experience`,
      },

      // ROLE -> Event Type/Purpose Dropdown
      role &&
        ROLE_OPTIONS[role] && {
          id: "f0bc39f3-9654-47e4-905a-b3a57c43c833",
          value: ROLE_OPTIONS[role],
        },

      // LOOKING FOR -> Looking for? Dropdown
      lookingFor &&
        LOOKING_FOR_OPTIONS[lookingFor] && {
          id: "25299d9a-4319-4577-aa5a-e1fc8655cf5c",
          value: LOOKING_FOR_OPTIONS[lookingFor],
        },
    ].filter(Boolean);

    // -------------------------------------
    // TASK PAYLOAD
    // -------------------------------------

    const payload = {
      name: `${name || "New Applicant"} - ${formattedPhone || ""}`,

      description: `
📌 Career Application

👤 Name: ${name || "N/A"}
📞 Phone: ${formattedPhone || "N/A"}
📧 Email: ${email || "N/A"}
💼 Role: ${role || "N/A"}
🎯 Looking For: ${lookingFor || "N/A"}
📈 Experience: ${experience || "0"}
📝 Interest: ${interest || "N/A"}
🌐 Page: ${page || "N/A"}
      `,

      // status: "to do",

      custom_fields,
    };

    // -------------------------------------
    // CREATE CLICKUP TASK
    // -------------------------------------

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

    // -------------------------------------
    // CLICKUP ERROR
    // -------------------------------------

    if (!response.ok) {
      console.error("CLICKUP ERROR:", data);

      return NextResponse.json(
        {
          success: false,
          error: data,
        },
        { status: 500 }
      );
    }

    // -------------------------------------
    // UPLOAD RESUME
    // -------------------------------------

    if (resume && resume.size > 0) {
      const attachmentForm = new FormData();

      attachmentForm.append("attachment", resume, resume.name);

      const uploadRes = await fetch(
        `https://api.clickup.com/api/v2/task/${data.id}/attachment`,
        {
          method: "POST",
          headers: {
            Authorization: CLICKUP_TOKEN,
          },
          body: attachmentForm,
        }
      );

      const uploadData = await uploadRes.json();

      if (!uploadRes.ok) {
        console.error("ATTACHMENT ERROR:", uploadData);
      }
    }

    // -------------------------------------
    // SUCCESS
    // -------------------------------------

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