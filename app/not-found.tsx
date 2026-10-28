import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main
        id="main"
        className="mx-auto flex min-h-[70vh] max-w-4xl flex-col justify-center py-24"
        style={{ paddingInline: "var(--page-gutter)" }}
      >
        <p className="eyebrow">404</p>
        <h1 className="m-0 font-serif text-[clamp(2.4rem,7vw,4rem)] font-normal leading-[1.1] text-ink">
          This page is not here.
        </h1>
        <p className="mt-8">
          <Link className="quiet-link font-sans text-lg" href="/">
            Back home →
          </Link>
        </p>
      </main>
    </>
  );
}
