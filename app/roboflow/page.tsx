import type { Metadata } from "next";
import ApplicationStory from "@/components/applications/ApplicationStory";
import { stories } from "@/lib/application-stories";

export const metadata: Metadata = {
  title: "Roboflow | Sergio Piñeros",
  description: "Independent product and marketing application concept from Sergio Piñeros.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ApplicationStory story={stories["roboflow"]} />;
}
