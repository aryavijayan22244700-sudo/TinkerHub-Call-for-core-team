import type { Metadata } from "next";
import LeadProfile from "@/components/LeadProfile";

export const metadata: Metadata = {
  title: "Chapter Lead — TinkerHub SNGCET",
};

export default function LeadPage() {
  return <LeadProfile />;
}
