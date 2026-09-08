import { NextResponse } from "next/server";

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

    // Honeypot check for bots
    if (honeypot && honeypot.trim() !== "") {
      // Silently discard spam without notifying the bot
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

    if (!message || message.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: "Message must be at least 10 characters long." },
        { status: 400 }
      );
    }

    const recipientEmail = process.env.CONTACT_EMAIL || "lorensiusgani08@gmail.com";
    const resendApiKey = process.env.RESEND_API_KEY;

    // Check if Resend API key is provided
    if (!resendApiKey) {
      console.warn(
        "RESEND_API_KEY is not configured in .env. Message logged in demo mode:",
        { name, email, subject, message }
      );
      return NextResponse.json(
        {
          success: true,
          preview: true,
          message:
            "Demo mode: Message received locally. Configure RESEND_API_KEY in .env to deliver live emails.",
        },
        { status: 200 }
      );
    }

    const emailSubject = subject?.trim()
      ? `Portfolio Contact: ${subject.trim()}`
      : `New Message from ${name.trim()} (Portfolio)`;

    // Send email using Resend HTTP API
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: [recipientEmail],
        reply_to: email.trim(),
        subject: emailSubject,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; rounded: 8px;">
            <h2 style="color: #3D8D7A; border-bottom: 2px solid #3D8D7A; padding-bottom: 8px;">New Contact Form Message</h2>
            <p><strong>From:</strong> ${name.trim()} (&lt;${email.trim()}&gt;)</p>
            ${subject ? `<p><strong>Subject:</strong> ${subject.trim()}</p>` : ""}
            <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #3D8D7A; border-radius: 4px;">
              <p style="white-space: pre-wrap; margin: 0;">${message.trim()}</p>
            </div>
            <p style="font-size: 12px; color: #888; margin-top: 30px;">This email was sent from your portfolio website contact form.</p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Resend API error:", errorData);
      return NextResponse.json(
        {
          success: false,
          error: "Failed to send email via provider. Please try again later.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API internal error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}
