import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  containsProfanity,
  isSpamContent,
  isDisposableEmail,
  checkRateLimit,
} from "@/app/lib/security";

interface ContactRequestBody {
  name: string;
  email: string;
  subject?: string;
  message: string;
  honeypot?: string; // Bot protection trap
  timestamp?: number; // Form load timestamp for time-trap
}

export async function POST(request: Request) {
  try {
    // 1. Client IP Extraction & Server-side Rate Limiting
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const clientIp = forwardedFor
      ? forwardedFor.split(",")[0].trim()
      : realIp || "127.0.0.1";

    const rateLimitCheck = checkRateLimit(clientIp);
    if (!rateLimitCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error:
            rateLimitCheck.message ||
            "Too many requests. Please wait a moment before sending another message.",
        },
        { status: 429 }
      );
    }

    const body: ContactRequestBody = await request.json();
    const { name, email, subject, message, honeypot, timestamp } = body;

    // 2. Honeypot check for spam bots
    if (honeypot && honeypot.trim() !== "") {
      // Silently return success to bot without sending email
      return NextResponse.json(
        { success: true, message: "Message received." },
        { status: 200 }
      );
    }

    // 3. Time-trap bot check (bots submit forms instantaneously in < 2.5 seconds)
    if (timestamp && typeof timestamp === "number") {
      const elapsedMs = Date.now() - timestamp;
      if (elapsedMs < 2500) {
        // Silently discard spam submission from automated scripts
        return NextResponse.json(
          { success: true, message: "Message received." },
          { status: 200 }
        );
      }
    }

    // 4. Basic Field Validation
    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Name must be at least 2 characters long." },
        { status: 400 }
      );
    }

    if (name.trim().length > 100) {
      return NextResponse.json(
        { success: false, error: "Name cannot exceed 100 characters." },
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

    // 5. Disposable / Fake Email Filter
    if (isDisposableEmail(email.trim())) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Temporary or disposable email addresses are not accepted. Please use a valid personal or business email.",
        },
        { status: 400 }
      );
    }

    if (!message || message.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: "Message must be at least 10 characters long." },
        { status: 400 }
      );
    }

    // 6. Profanity / Inappropriate Language Filter (Indonesian & English)
    const nameProfanity = containsProfanity(name);
    const subjectProfanity = containsProfanity(subject || "");
    const messageProfanity = containsProfanity(message);

    if (
      nameProfanity.hasProfanity ||
      subjectProfanity.hasProfanity ||
      messageProfanity.hasProfanity
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Pesan, nama, atau subjek mengandung kata-kata yang tidak pantas. Mohon gunakan bahasa yang sopan dan profesional.",
        },
        { status: 400 }
      );
    }

    // 7. Spam Content, Links, and Keywords Filter
    const spamCheck = isSpamContent(message, subject || "");
    if (spamCheck.isSpam) {
      return NextResponse.json(
        {
          success: false,
          error:
            spamCheck.reason ||
            "Pesan terdeteksi sebagai spam. Mohon periksa kembali pesan Anda.",
        },
        { status: 400 }
      );
    }

    // 8. Email Dispatch
    const emailUser = process.env.EMAIL_USER; // e.g. lorensiusgani08@gmail.com
    const emailPass = process.env.EMAIL_PASS; // 16-character Google App Password
    const recipientEmail =
      process.env.CONTACT_EMAIL || emailUser || "lorensiusgani08@gmail.com";

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
    const cleanPass = emailPass
      .trim()
      .replace(/^["']|["']$/g, "")
      .replace(/\s+/g, "");
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

    // Sanitize string to prevent basic HTML injection in the email body
    const escapeHtml = (str: string) =>
      str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeSubject = subject?.trim() ? escapeHtml(subject.trim()) : "-";
    const safeMessage = escapeHtml(message.trim());

    // Send the email via Gmail SMTP
    await transporter.sendMail({
      from: `"${safeName}" <${cleanUser}>`,
      to: recipientEmail,
      replyTo: email.trim(),
      subject: emailSubject,
      text: `Name: ${name.trim()}\nEmail: ${email.trim()}\nSubject: ${
        subject || "-"
      }\n\nMessage:\n${message.trim()}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
          <div style="border-bottom: 2px solid #3D8D7A; padding-bottom: 12px; margin-bottom: 20px;">
            <h2 style="color: #3D8D7A; margin: 0; font-size: 20px; font-weight: 700;">📬 New Message from Portfolio</h2>
            <p style="color: #64748b; margin: 4px 0 0 0; font-size: 13px;">Received via Lorensius Gani website contact form</p>
          </div>

          <div style="margin-bottom: 16px;">
            <p style="margin: 0 0 6px 0; font-size: 14px;"><strong>From:</strong> ${safeName} &lt;<a href="mailto:${safeEmail}" style="color: #0969da; text-decoration: none;">${safeEmail}</a>&gt;</p>
            ${
              subject?.trim()
                ? `<p style="margin: 0 0 6px 0; font-size: 14px;"><strong>Subject:</strong> ${safeSubject}</p>`
                : ""
            }
          </div>

          <div style="margin-top: 16px; padding: 16px; background-color: #f8fafc; border-left: 4px solid #3D8D7A; border-radius: 6px;">
            <p style="white-space: pre-wrap; margin: 0; font-size: 14px; color: #334155;">${safeMessage}</p>
          </div>

          <div style="margin-top: 24px; padding-top: 12px; border-top: 1px solid #f1f5f9; font-size: 12px; color: #94a3b8; display: flex; justify-content: space-between;">
            <span>Lorensius Gani Portfolio</span>
            <span>💡 Click Reply to email ${safeName} directly</span>
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
      error instanceof Error
        ? error.message
        : "Failed to send email. Please check your credentials or try again later.";
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
