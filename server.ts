/// <reference types="node" />
import express, { Request, Response } from "express";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "dist")));
}

// Set up Nodemailer transporter using provided credentials or environment variables
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtpout.secureserver.net",
  port: parseInt(process.env.SMTP_PORT || "465", 10),
  secure: true,
  auth: {
    user: process.env.SMTP_USER || "hello@bashies.co.za",
    pass: process.env.SMTP_PASS || "&5!>%7B+p?bzaYC" // Passed via Docker / environment
  },
});

// Verify connection configuration
transporter.verify(function (error: Error | null, success: boolean) {
  if (error) {
    console.error("Transporter verify error: ", error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

app.post("/api/send-contact-email", async (req: Request, res: Response) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const smtpUser = process.env.SMTP_USER || "hello@bashies.co.za";

    // --- 1. Notification to Admin ---
    const mailOptionsAdmin = {
      from: smtpUser, // Must be sent FROM the authenticated email
      to: smtpUser,   // Recipient email
      replyTo: email, // Allow reply directly to client
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

    // --- 2. Auto-responder to Client ---
    const mailOptionsUser = {
      from: `"Bashies Biltong" <${smtpUser}>`,
      to: email,
      subject: "We've received your enquiry! - Bashies Biltong",
      html: `
        <h2>Hi ${name},</h2>
        <p>Thank you for getting in touch with us!</p>
        <p>We have received your message and will get back to you as soon as possible.</p>
        <br/>
        <p>Best regards,</p>
        <p>Bashies Biltong Team</p>
      `,
    };

    // Send both emails simultaneously
    const [adminInfo, userInfo] = await Promise.all([
      transporter.sendMail(mailOptionsAdmin),
      transporter.sendMail(mailOptionsUser)
    ]);

    console.log("Admin notified:", adminInfo.messageId);
    console.log("Auto-responder sent:", userInfo.messageId);

    return res.json({ success: true, messageId: adminInfo.messageId });
  } catch (error: unknown) {
    console.error("Error sending email:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return res.status(500).json({ error: errorMessage });
  }
});

// Catch-all: serve index.html for SPA routing in production
if (process.env.NODE_ENV === "production") {
  app.get("*", (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
