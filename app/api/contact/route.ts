import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactRequestBody {
  name: string;
  email: string;
  subject?: string;
  message: string;
  honeypot?: string; // Bot protection trap
}

export async function POST(request: Request) {
  try {
    const body: ContactRequestBody = await request.json();
    const { name, email, subject, message, honeypot } = body;

    // Honeypot check for spam bots
    if (honeypot && honeypot.trim() !== "") {
      // Silently discard spam without alerting the bot
      return NextResponse.json(
        { success: true, message: "Message received." },
        { status: 200 }
      );
    }

    // Validation
    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Name must be at least 2 characters long." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!message || message.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: "Message must be at least 5 characters long." },
        { status: 400 }
      );
    }

    const emailUser = process.env.EMAIL_USER; // e.g. lorensiusgani08@gmail.com
    const emailPass = process.env.EMAIL_PASS; // 16-character Google App Password
    const recipientEmail = process.env.CONTACT_EMAIL || emailUser || "lorensiusgani08@gmail.com";

    // Demo Mode: If EMAIL_USER or EMAIL_PASS is not configured in .env
    if (!emailUser || !emailPass) {
      console.warn(
        "EMAIL_USER or EMAIL_PASS is not configured in .env. Message logged in demo mode:",
        { name, email, subject, message }
      );
      return NextResponse.json(
        {
          success: true,
          preview: true,
          message:
            "Demo mode: Message received locally. Set EMAIL_USER & EMAIL_PASS in .env to deliver live emails.",
        },
        { status: 200 }
      );
    }

    // Configure Nodemailer Transporter with explicit Gmail SMTP settings for serverless
    const cleanPass = emailPass.trim().replace(/^["']|["']$/g, "").replace(/\s+/g, "");
    const cleanUser = emailUser.trim().replace(/^["']|["']$/g, "");

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465 (SSL)
      auth: {
        user: cleanUser,
        pass: cleanPass,
      },
    });

    const emailSubject = subject?.trim()
      ? `Portfolio Contact: ${subject.trim()}`
      : `New Message from ${name.trim()} (Portfolio)`;

    // Send the email via Gmail SMTP
    await transporter.sendMail({
      from: `"${name.trim()}" <${cleanUser}>`,
      to: recipientEmail,
      replyTo: email.trim(),
      subject: emailSubject,
      text: `Name: ${name.trim()}\nEmail: ${email.trim()}\nSubject: ${subject || "-"}\n\nMessage:\n${message.trim()}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
          <div style="border-bottom: 2px solid #3D8D7A; padding-bottom: 12px; margin-bottom: 20px;">
            <h2 style="color: #3D8D7A; margin: 0; font-size: 20px; font-weight: 700;">📬 New Message from Portfolio</h2>
            <p style="color: #64748b; margin: 4px 0 0 0; font-size: 13px;">Received via Lorensius Gani website contact form</p>
          </div>

          <div style="margin-bottom: 16px;">
            <p style="margin: 0 0 6px 0; font-size: 14px;"><strong>From:</strong> ${name.trim()} &lt;<a href="mailto:${email.trim()}" style="color: #0969da; text-decoration: none;">${email.trim()}</a>&gt;</p>
            ${subject?.trim() ? `<p style="margin: 0 0 6px 0; font-size: 14px;"><strong>Subject:</strong> ${subject.trim()}</p>` : ""}
          </div>

          <div style="margin-top: 16px; padding: 16px; background-color: #f8fafc; border-left: 4px solid #3D8D7A; border-radius: 6px;">
            <p style="white-space: pre-wrap; margin: 0; font-size: 14px; color: #334155;">${message.trim()}</p>
          </div>

          <div style="margin-top: 24px; padding-top: 12px; border-top: 1px solid #f1f5f9; font-size: 12px; color: #94a3b8; display: flex; justify-content: space-between;">
            <span>Lorensius Gani Portfolio</span>
            <span>💡 Click Reply to email ${name.trim()} directly</span>
          </div>
        </div>
      `,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully!",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Nodemailer error sending email:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to send email. Please check your credentials or try again later.";
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
