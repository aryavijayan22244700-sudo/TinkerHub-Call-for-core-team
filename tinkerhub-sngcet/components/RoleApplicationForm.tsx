"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { isValidEmailFormat } from "@/lib/validators";

interface RoleQuestion {
  id: string;
  label: string;
  placeholder: string;
}

interface Role {
  id: string;
  title: string;
  question: RoleQuestion;
}

export default function RoleApplicationForm({ role }: { role: Role }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [yearAndDept, setYearAndDept] = useState("");
  const [whyTinkerhub, setWhyTinkerhub] = useState("");
  const [roleAnswer, setRoleAnswer] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      nameInputRef.current?.focus({ preventScroll: true });
    }, 120);

    return () => window.clearTimeout(timer);
  }, [role.id]);

  const canSubmit =
    name.trim().length > 1 &&
    isValidEmailFormat(email) &&
    yearAndDept.trim().length > 1 &&
    whyTinkerhub.trim().length > 10 &&
    roleAnswer.trim().length > 10;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!canSubmit) {
      setError("Fill in every field — the short-answer ones need a bit more than a few words.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roleId: role.id,
          roleTitle: role.title,
          name: name.trim(),
          email: email.trim(),
          yearAndDept: yearAndDept.trim(),
          whyTinkerhub: whyTinkerhub.trim(),
          roleAnswer: roleAnswer.trim(),
          portfolioUrl: portfolioUrl.trim() || undefined,
        }),
      });

      const body = await response.json();
      if (!response.ok) {
        throw new Error(body.error || "Something went wrong sending your application. Please try again in a moment.");
      }

      setConfirmationMessage(body.message || "Your application was received.");
      setSubmitted(true);
    } catch (err) {
      console.error("Application submission failed", err);
      setError(err instanceof Error ? err.message : "Something went wrong sending your application. Please try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="note-card rounded-card p-8">
        <p className="font-hand text-2xl text-olive-dark">got it —</p>
        <h3 className="mt-1 font-display text-xl font-semibold text-ink">
          Your application for {role.title} is in.
        </h3>
        <p className="mt-2 font-body text-sm text-ink-soft">
          {confirmationMessage || "We'll reach out by email once applications close on 10 July 2026."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="note-card rounded-card p-8" noValidate>
      <h3 className="font-display text-xl font-semibold text-ink">Apply for {role.title}</h3>
      <p className="mt-1 font-body text-sm text-ink-soft">Takes about five minutes.</p>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="font-body text-sm font-medium text-ink">
            Full name
          </label>
          <input
            ref={nameInputRef}
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1.5 w-full rounded-card border border-line bg-white px-4 py-2.5 font-body text-sm text-ink outline-none focus-visible:border-rust"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="font-body text-sm font-medium text-ink">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 w-full rounded-card border border-line bg-white px-4 py-2.5 font-body text-sm text-ink outline-none focus-visible:border-rust"
            placeholder="you@sngcet.ac.in"
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="yearAndDept" className="font-body text-sm font-medium text-ink">
          Year &amp; department
        </label>
        <input
          id="yearAndDept"
          required
          value={yearAndDept}
          onChange={(e) => setYearAndDept(e.target.value)}
          className="mt-1.5 w-full rounded-card border border-line bg-white px-4 py-2.5 font-body text-sm text-ink outline-none focus-visible:border-rust"
          placeholder="e.g. 2nd year, CSE"
        />
      </div>

      <div className="mt-5">
        <label htmlFor="whyTinkerhub" className="font-body text-sm font-medium text-ink">
          Why do you want to be part of TinkerHub SNGCET's core team?
        </label>
        <textarea
          id="whyTinkerhub"
          required
          rows={3}
          value={whyTinkerhub}
          onChange={(e) => setWhyTinkerhub(e.target.value)}
          className="mt-1.5 w-full rounded-card border border-line bg-white px-4 py-2.5 font-body text-sm text-ink outline-none focus-visible:border-rust"
        />
      </div>

      <div className="mt-5">
        <label htmlFor="roleAnswer" className="font-body text-sm font-medium text-ink">
          {role.question.label}
        </label>
        <textarea
          id="roleAnswer"
          required
          rows={4}
          value={roleAnswer}
          onChange={(e) => setRoleAnswer(e.target.value)}
          placeholder={role.question.placeholder}
          className="mt-1.5 w-full rounded-card border border-line bg-white px-4 py-2.5 font-body text-sm text-ink outline-none focus-visible:border-rust"
        />
      </div>

      <div className="mt-5">
        <label htmlFor="portfolioUrl" className="font-body text-sm font-medium text-ink">
          LinkedIn, GitHub, or portfolio link <span className="text-ink-faint">(optional)</span>
        </label>
        <input
          id="portfolioUrl"
          value={portfolioUrl}
          onChange={(e) => setPortfolioUrl(e.target.value)}
          className="mt-1.5 w-full rounded-card border border-line bg-white px-4 py-2.5 font-body text-sm text-ink outline-none focus-visible:border-rust"
          placeholder="https://"
        />
      </div>

      {error && (
        <p role="alert" className="mt-5 rounded-card border border-error/30 bg-error/5 px-4 py-2.5 font-body text-sm text-error">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 w-full rounded-card bg-ink px-4 py-3 font-body text-sm font-semibold text-paper-card transition-opacity hover:opacity-90 disabled:opacity-50 sm:w-auto"
      >
        {submitting ? "Sending…" : "Submit application"}
      </button>
    </form>
  );
}
