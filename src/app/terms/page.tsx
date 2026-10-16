import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { business } from "@/content/business";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms for booking services with ${business.name}.`,
  alternates: { canonical: "/terms" },
};

export default function Terms() {
  return (
    <LegalPage
      title="Terms & Conditions"
      sections={[
        {
          heading: "Booking requests",
          body: "Submitting a request through this website does not confirm a booking. An appointment is confirmed only when our team confirms it with you directly.",
        },
        {
          heading: "Quotes & pricing",
          body: "Prices depend on vehicle size, condition and the service selected, and are confirmed before work begins. Any additional work is agreed with you first.",
        },
        {
          heading: "Results & expectations",
          body: "Detailing, correction and protection results vary with the age, condition and paint of each vehicle. Some defects can be reduced but not fully removed, and protective products reduce — but do not eliminate — the risk of damage.",
        },
        {
          heading: "Cancellations",
          body: "Cancellation and rescheduling terms are confirmed by the studio at the time of booking.",
        },
        {
          heading: "Imagery",
          body: "Some photography on this website is illustrative and does not depict customer vehicles or specific results.",
        },
      ]}
    />
  );
}
