"use client";

import { useMemo } from "react";
import { isValidEmailFormat } from "@/lib/validators";

interface InstitutionEmailResult {
  isValidFormat: boolean;
  isInstitutional: boolean;
  canSubmit: boolean;
  message: string | null;
}

export function useInstitutionEmail(email: string): InstitutionEmailResult {
  return useMemo(() => {
    if (!email) {
      return { isValidFormat: false, isInstitutional: false, canSubmit: false, message: null };
    }

    const isValidFormat = isValidEmailFormat(email);
    if (!isValidFormat) {
      return {
        isValidFormat: false,
        isInstitutional: false,
        canSubmit: false,
        message: "Enter a valid email address.",
      };
    }

    return {
      isValidFormat: true,
      isInstitutional: true,
      canSubmit: true,
      message: "Email looks good.",
    };
  }, [email]);
}
