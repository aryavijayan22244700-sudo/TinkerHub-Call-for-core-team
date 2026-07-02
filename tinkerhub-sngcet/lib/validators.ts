// Central place for all form-input validation rules so the same logic is
// reused by both the sign-up and login forms instead of being duplicated.

const EMAIL_RE = /[^\s@]+@[^\s@]+/;

export function isValidEmailFormat(email: string): boolean {
  return EMAIL_RE.test(email.trim());
}

export function isInstitutionalEmail(email: string): boolean {
  return isValidEmailFormat(email);
}

export type PasswordStrength = "weak" | "fair" | "strong";

export function getPasswordStrength(password: string): PasswordStrength {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return "weak";
  if (score <= 3) return "fair";
  return "strong";
}

export function isPasswordAcceptable(password: string): boolean {
  return password.length >= 8 && getPasswordStrength(password) !== "weak";
}

export function passwordRequirementsMessage(): string {
  return "Use at least 8 characters, with a mix of upper/lowercase letters, a number, and a symbol.";
}
