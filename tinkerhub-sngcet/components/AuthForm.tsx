"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useInstitutionEmail } from "@/hooks/useInstitutionEmail";
import { isFirebaseConfigured } from "@/lib/firebase";
import { getPasswordStrength, isPasswordAcceptable, passwordRequirementsMessage } from "@/lib/validators";

interface AuthFormProps {
  mode: "signup" | "login";
}

export default function AuthForm({ mode }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { signUp, logIn } = useAuth();
  const router = useRouter();
  const emailCheck = useInstitutionEmail(email);
  const passwordStrength = password ? getPasswordStrength(password) : null;

  const isSignup = mode === "signup";
  const firebaseReady = isFirebaseConfigured();
  const canSubmit = firebaseReady && emailCheck.canSubmit && (isSignup ? isPasswordAcceptable(password) : password.length > 0);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!firebaseReady) {
      setError("Firebase authentication is not configured yet. Add your Firebase credentials to .env.local to enable sign up and log in.");
      return;
    }

    if (!canSubmit) {
      setError("Check the highlighted fields before continuing.");
      return;
    }

    setSubmitting(true);
    try {
      if (isSignup) {
        await signUp(email, password);
        setSuccess("Account created. We've sent a verification link to your email — confirm it before logging in.");
      } else {
        await logIn(email, password);
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(mapFirebaseError(err?.code) ?? "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="note-card w-full max-w-md rounded-card p-8" noValidate>
      <p className="font-hand text-xl text-rust">{isSignup ? "welcome to the workbench —" : "good to see you —"}</p>
      <h1 className="mt-1 font-display text-2xl font-semibold text-ink">
        {isSignup ? "Join TinkerHub SNGCET" : "Log in"}
      </h1>
      <p className="mt-2 font-body text-sm text-ink-soft">
        {isSignup
          ? "Sign up with your email to get access to workshops and updates."
          : "See what's on the workbench this week."}
      </p>

      {!firebaseReady && (
        <p className="mt-4 rounded-card border border-mustard/40 bg-mustard/10 px-4 py-3 font-body text-sm text-ink">
          Firebase auth is not configured yet. Add your Firebase keys to .env.local to enable sign up and log in.
        </p>
      )}

      <div className="mt-6">
        <label htmlFor="email" className="font-body text-sm font-medium text-ink">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1.5 w-full rounded-card border border-line bg-white px-4 py-2.5 font-body text-sm text-ink outline-none focus-visible:border-rust"
          placeholder="you@sngcet.ac.in"
        />
        {email && emailCheck.message && (
          <p className={`mt-1.5 font-body text-xs ${emailCheck.isInstitutional ? "text-olive-dark" : "text-ink-soft"}`}>
            {emailCheck.message}
          </p>
        )}
      </div>

      <div className="mt-4">
        <label htmlFor="password" className="font-body text-sm font-medium text-ink">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          autoComplete={isSignup ? "new-password" : "current-password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1.5 w-full rounded-card border border-line bg-white px-4 py-2.5 font-body text-sm text-ink outline-none focus-visible:border-rust"
          placeholder="••••••••"
        />
        {isSignup && password && (
          <p
            className={`mt-1.5 font-body text-xs ${
              passwordStrength === "strong"
                ? "text-olive-dark"
                : passwordStrength === "fair"
                ? "text-mustard-dark"
                : "text-error"
            }`}
          >
            Strength: {passwordStrength} — {passwordRequirementsMessage()}
          </p>
        )}
      </div>

      {error && (
        <p role="alert" className="mt-4 rounded-card border border-error/30 bg-error/5 px-4 py-2.5 font-body text-sm text-error">
          {error}
        </p>
      )}
      {success && (
        <p role="status" className="mt-4 rounded-card border border-olive/30 bg-olive/5 px-4 py-2.5 font-body text-sm text-olive-dark">
          {success}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 w-full rounded-card bg-ink px-4 py-3 font-body text-sm font-semibold text-paper-card transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {submitting ? "Please wait…" : isSignup ? "Create account" : "Log in"}
      </button>
    </form>
  );
}

function mapFirebaseError(code?: string): string | null {
  switch (code) {
    case "auth/email-already-in-use":
      return "That email already has an account. Try logging in instead.";
    case "auth/invalid-email":
      return "That email address doesn't look right.";
    case "auth/weak-password":
      return "Choose a stronger password.";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Email or password is incorrect.";
    case undefined:
      return null;
    default:
      return null;
  }
}
