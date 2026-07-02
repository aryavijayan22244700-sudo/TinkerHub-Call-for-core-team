import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Resend } from "resend";
import { getFirebaseDb } from "@/lib/firebase";

export interface ApplicationPayload {
  roleId: string;
  roleTitle: string;
  name: string;
  email: string;
  yearAndDept: string;
  whyTinkerhub: string;
  roleAnswer: string;
  portfolioUrl?: string;
}

/**
 * Writes a Core Team application to the "applications" Firestore collection.
 * Each document is tagged with the role applied for, so the core team can
 * filter by role when reviewing.
 */
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

function getSubmissionError(err: unknown): Error {
  if (err instanceof Error) {
    const message = err.message.toLowerCase();
    if (message.includes("permission-denied") || message.includes("permission")) {
      return new Error("Firestore is blocking new applications. Please allow create access for the applications collection in Firebase Security Rules.");
    }

    if (message.includes("failed-precondition") || message.includes("database") || message.includes("not found")) {
      return new Error("Firestore is not enabled for this Firebase project yet.");
    }

    return err;
  }

  return new Error("Something went wrong sending your application. Please try again in a moment.");
}

export async function submitApplication(payload: ApplicationPayload): Promise<void> {
  const db = getFirebaseDb();

  try {
    const applicationData = {
      roleId: payload.roleId,
      roleTitle: payload.roleTitle,
      name: payload.name,
      email: payload.email,
      yearAndDept: payload.yearAndDept,
      whyTinkerhub: payload.whyTinkerhub,
      roleAnswer: payload.roleAnswer,
      submittedAt: serverTimestamp(),
      ...(payload.portfolioUrl ? { portfolioUrl: payload.portfolioUrl } : {}),
    };

    await addDoc(collection(db, "applications"), applicationData);
  } catch (err) {
    throw getSubmissionError(err);
  }

  if (!resend || !process.env.RESEND_FROM_EMAIL) {
    return;
  }

  try {
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
  } catch (error) {
    console.error("Failed to send application confirmation email", error);
  }
}
