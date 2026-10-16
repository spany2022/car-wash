import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { business } from "@/content/business";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${business.name} handles personal information shared through this website.`,
  alternates: { canonical: "/privacy" },
};

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      sections={[
        {
          heading: "What we collect",
          body: "When you send a booking request we receive the details you enter: your name, phone number, vehicle details, chosen service, preferred date and time, and any notes you add.",
        },
        {
          heading: "How we use it",
          body: "We use these details only to respond to your enquiry, confirm appointments and provide the services you request. We do not sell your personal information.",
        },
        {
          heading: "How requests are sent",
          body: "Booking requests are passed to the messaging app or email client on your device (for example WhatsApp or email). Those services process your message under their own privacy policies.",
        },
        {
          heading: "Retention & your rights",
          body: "We keep enquiry details only as long as needed for the purposes above. You can ask us to access, correct or delete your information at any time using the contact details on this site.",
        },
        {
          heading: "Third-party content",
          body: "This site may load fonts, images and maps from third-party providers, which may receive technical information such as your IP address when content is requested.",
        },
      ]}
    />
  );
}
