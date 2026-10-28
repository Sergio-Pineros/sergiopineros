import { About } from "@/components/about";
import { ContactSection } from "@/components/contact-section";
import { Hero } from "@/components/hero";
import { Manifesto } from "@/components/manifesto";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Work } from "@/components/work";
import { Writing } from "@/components/writing";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Manifesto />
        <Writing />
        <Work />
        <About />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
