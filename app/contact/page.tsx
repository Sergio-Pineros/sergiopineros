import type { Metadata } from "next";
import { ContactSection } from "@/components/contact-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Contact — ${site.name}`,
  description: site.contact.intro,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader contactHref="/contact" />
      <main id="main" className="pt-10">
        <ContactSection />
      </main>
      <SiteFooter contactHref="/contact" />
    </>
  );
}
