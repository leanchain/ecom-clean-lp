import type { Metadata } from "next";
import { ExamplePdp } from "@/components/example-pdp";

export const metadata: Metadata = {
  title: "Example PDP - Travel Buddy Hair Dryer",
  description:
    "Example product detail page for the Travel Buddy Hair Dryer generated with Hex+.",
};

export default function ExamplePdpPage() {
  return <ExamplePdp />;
}
