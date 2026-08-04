import type { Metadata } from "next";

import ContactContent from "./contact-content";

export const metadata: Metadata = {
  title: { absolute: "Contact | Beseam" },
  description:
    "Reach the Beseam team directly by email, book a 20-minute call, or send a short message and hear back within one business day.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <ContactContent />;
}
