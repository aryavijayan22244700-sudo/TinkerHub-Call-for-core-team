import { NextResponse } from "next/server";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Resend } from "resend";
import { getFirebaseDb } from "@/lib/firebase";
import { ApplicationPayload } from "@/lib/applications";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

function createErrorMessage(err: unknown): string {
  if (err instanceof Error) {
    const message = err.message.toLowerCase();
    if (message.includes("permission-denied") || message.includes("permission")) {
      return "Firestore is blocking new applications. Please allow create access for the applications collection in Firebase Security Rules.";
    }
    if (message.includes("failed-precondition") || message.includes("database") || message.includes("not found")) {
      return "Firestore is not enabled for this Firebase project yet.";
    }
    return err.message;
  }
  return "Something went wrong sending your application. Please try again in a moment.";
}

async function sendConfirmationEmail(payload: ApplicationPayload) {
  if (!resend || !process.env.RESEND_FROM_EMAIL) {
    return;
  }

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL,
    to: [payload.email],
    subject: "We received your Core Team application",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #2B241C;">
        <h2 style="color: #B04A2E;">Thanks for applying to TinkerHub SNGCET</h2>
        <p>Hi ${payload.name.split(" ")[0] || "there"},</p>
        <p>We’ve received your application for <strong>${payload.roleTitle}</strong>.</p>
        <p>Our team will review it soon and get back to you by email.</p>
        <p>Thanks for taking the step to be part of the Core Team.</p>
        <p>— TinkerHub SNGCET</p>
      </div>
    `,
  });
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ApplicationPayload;
    const db = getFirebaseDb();

    await addDoc(collection(db, "applications"), {
      ...payload,
      submittedAt: serverTimestamp(),
    });

    let emailStatus = {
      emailSent: false,
      message: "Confirmation email sending is not enabled right now.",
    };

    if (resend && process.env.RESEND_FROM_EMAIL) {
      try {
        await sendConfirmationEmail(payload);
        emailStatus = {
          emailSent: true,
          message: "A confirmation email has been sent to your inbox.",
        };
      } catch (emailError) {
        console.error("Failed to send application confirmation email", emailError);
        emailStatus = {
          emailSent: false,
          message: "Your application was received, but we could not send a confirmation email right now.",
        };
      }
    }

    return NextResponse.json({ success: true, ...emailStatus });
  } catch (error) {
    const message = createErrorMessage(error);
    console.error("Application submission failed", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
