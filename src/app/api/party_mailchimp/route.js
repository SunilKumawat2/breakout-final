
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req) {
  try {

    const body = await req.json();

    const API_KEY = process.env.MAILCHIMP_API_KEY;
    const LIST_ID = process.env.MAILCHIMP_AUDIENCE_ID;
    const DATACENTER = process.env.MAILCHIMP_SERVER;

    // Mailchimp requires MD5 hash of lowercase email
    const subscriberHash = crypto
      .createHash("md5")
      .update(body.email.toLowerCase())
      .digest("hex");

    const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members/${subscriberHash}`;

    const response = await fetch(url, {
      method: "PUT",

      headers: {
        Authorization: `apikey ${API_KEY}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email_address: body.email,
        status_if_new: "subscribed",

        merge_fields: {
          FNAME: body.name,
          PHONE: body.phone,
          LOCATION: body.location,
        },

        tags: [body.tag],
      }),
    });

    const data = await response.json();

    console.log("MAILCHIMP RESPONSE:", data);

    if (!response.ok) {
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

    console.log("MAILCHIMP ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}