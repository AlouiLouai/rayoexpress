import { LocalBusinessJsonLd } from "@/components/seo/local-business-jsonld";
import { MarketingHeader } from "@/components/marketing/header";
import { Hero } from "@/components/marketing/hero";
import { Services } from "@/components/marketing/services";
import { Gallery } from "@/components/marketing/gallery";
import { Reviews } from "@/components/marketing/reviews";
import { CtaBand } from "@/components/marketing/cta-band";
import { Contact } from "@/components/marketing/contact";
import { MarketingFooter } from "@/components/marketing/footer";
import { MobileCtaBar } from "@/components/marketing/mobile-cta-bar";

export default function Home() {
  return (
    <div className="flex min-w-0 flex-1 flex-col pb-[calc(6rem+env(safe-area-inset-bottom))] md:pb-0 [&>*]:min-w-0">
      <LocalBusinessJsonLd />
      <MarketingHeader />
      <Hero />
      <Services />
      <Gallery />
      <Reviews />
      <CtaBand />
      <Contact />
      <MarketingFooter />
      <MobileCtaBar />
    </div>
  );
}
