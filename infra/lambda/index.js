"use strict";

const nodemailer = require("nodemailer");

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
};

exports.handler = async (event) => {
  if (event.requestContext?.http?.method === "OPTIONS") {
    return { statusCode: 200, headers: CORS_HEADERS, body: "" };
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: "Invalid JSON" }),
    };
  }

  const { name, email, phone, message } = body;

  if (!name || !email || !phone || !message) {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: "All fields are required" }),
    };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const smtpUser = process.env.SMTP_USER;

  const mailOptionsAdmin = {
    from: smtpUser,
    to: smtpUser,
    replyTo: email,
    subject: `New Contact Form Submission from ${name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `,
  };

  const mailOptionsUser = {
    from: `"Bashies Biltong & Deli" <${smtpUser}>`,
    to: email,
    subject: "Thank you for your enquiry — Bashies Biltong & Deli",
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link href="https://fonts.googleapis.com/css2?family=Anton&family=Raleway:wght@400;500;600&display=swap" rel="stylesheet" />
</head>
<body style="margin:0;padding:0;background-color:#000000;font-family:'Raleway',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#000000;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#000000;border:1px solid #333333;border-radius:8px;overflow:hidden;">

          <!-- Header / Logo -->
          <tr>
            <td align="center" style="background-color:#000000;padding:36px 40px 28px;">
              <img src="https://www.bashies.co.za/logoBlack.png" alt="Bashies Biltong & Deli" width="220" style="display:block;filter:invert(1);" />
            </td>
          </tr>

          <!-- Thin separator -->
          <tr>
            <td style="height:1px;background-color:#333333;"></td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px;background-color:#000000;">

              <h2 style="margin:0 0 24px;font-family:'Anton',Arial,sans-serif;font-size:22px;font-weight:400;color:#ffffff;letter-spacing:0.08em;text-transform:uppercase;">
                ENQUIRY RECEIVED
              </h2>

              <p style="margin:0 0 16px;font-size:15px;color:#a6a6a6;line-height:1.7;">Dear ${name},</p>

              <p style="margin:0 0 16px;font-size:15px;color:#a6a6a6;line-height:1.7;">
                Thank you for reaching out to <span style="color:#ffffff;font-weight:600;">Bashies Biltong &amp; Deli</span>. We have successfully received your enquiry and one of our team members will be in touch with you shortly.
              </p>

              <p style="margin:0 0 36px;font-size:15px;color:#a6a6a6;line-height:1.7;">
                We pride ourselves on prompt, personal service and look forward to assisting you.
              </p>

              <!-- Summary box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#111111;border:1px solid #333333;border-radius:6px;margin-bottom:36px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 14px;font-family:'Anton',Arial,sans-serif;font-size:11px;font-weight:400;color:#a6a6a6;text-transform:uppercase;letter-spacing:0.12em;">Your Enquiry Summary</p>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:5px 0;font-size:13px;color:#666666;width:80px;font-family:'Raleway',Arial,sans-serif;">Name</td>
                        <td style="padding:5px 0;font-size:13px;color:#ffffff;font-family:'Raleway',Arial,sans-serif;">${name}</td>
                      </tr>
                      <tr>
                        <td style="padding:5px 0;font-size:13px;color:#666666;font-family:'Raleway',Arial,sans-serif;">Email</td>
                        <td style="padding:5px 0;font-size:13px;color:#ffffff;font-family:'Raleway',Arial,sans-serif;">${email}</td>
                      </tr>
                      <tr>
                        <td style="padding:5px 0;font-size:13px;color:#666666;font-family:'Raleway',Arial,sans-serif;">Phone</td>
                        <td style="padding:5px 0;font-size:13px;color:#ffffff;font-family:'Raleway',Arial,sans-serif;">${phone}</td>
                      </tr>
                      <tr>
                        <td style="padding:5px 0 0;font-size:13px;color:#666666;vertical-align:top;font-family:'Raleway',Arial,sans-serif;">Message</td>
                        <td style="padding:5px 0 0;font-size:13px;color:#ffffff;line-height:1.6;font-family:'Raleway',Arial,sans-serif;">${message.replace(/\n/g, "<br>")}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 4px;font-size:15px;color:#a6a6a6;line-height:1.7;">Warm regards,</p>
              <p style="margin:0;font-size:15px;font-weight:600;color:#ffffff;font-family:'Raleway',Arial,sans-serif;">The Bashies Biltong &amp; Deli Team</p>
            </td>
          </tr>

          <!-- Thin separator -->
          <tr>
            <td style="height:1px;background-color:#333333;"></td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#000000;padding:24px 40px;text-align:center;">
              <p style="margin:0 0 8px;font-size:12px;color:#666666;font-family:'Raleway',Arial,sans-serif;">
                Wicklow Rd, Plumstead, Cape Town, 7800 &nbsp;&middot;&nbsp;
                <a href="tel:+27661209331" style="color:#666666;text-decoration:none;">+27 66 120 9331</a> &nbsp;&middot;&nbsp;
                <a href="mailto:hello@bashies.co.za" style="color:#666666;text-decoration:none;">hello@bashies.co.za</a>
              </p>
              <p style="margin:0;font-size:11px;color:#444444;font-family:'Raleway',Arial,sans-serif;">
                This is an automated confirmation. Please do not reply directly to this email.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  };

  try {
    const [adminInfo, userInfo] = await Promise.all([
      transporter.sendMail(mailOptionsAdmin),
      transporter.sendMail(mailOptionsUser),
    ]);

    console.log("Admin notified:", adminInfo.messageId);
    console.log("Auto-responder sent to:", email, userInfo.messageId);

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({ success: true, messageId: adminInfo.messageId }),
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: error.message || "An unknown error occurred" }),
    };
  }
};
