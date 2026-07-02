import type { Metadata } from "next";
import AuthForm from "@/components/AuthForm";

export const metadata: Metadata = {
  title: "Log in — TinkerHub SNGCET",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-5 py-16">
      <AuthForm mode="login" />
    </div>
  );
}
