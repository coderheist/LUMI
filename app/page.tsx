import { Analytics } from "@/components/sections/Analytics";
import { Channels } from "@/components/sections/Channels";
import { Discovery } from "@/components/sections/Discovery";
import { FinalCta } from "@/components/sections/FinalCta";
import { Handoff } from "@/components/sections/Handoff";
import { Hero } from "@/components/sections/Hero";
import { Integrations } from "@/components/sections/Integrations";
import { Knowledge } from "@/components/sections/Knowledge";
import { LiveDemo } from "@/components/sections/LiveDemo";
import { PricingPlans } from "@/components/sections/Pricing";
import { Problem } from "@/components/sections/Problem";
import { Roi } from "@/components/sections/Roi";
import { Security } from "@/components/sections/Security";
import { Showcase } from "@/components/sections/Showcase";
import { Stories } from "@/components/sections/Stories";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { UseCases } from "@/components/sections/UseCases";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Problem />
      <LiveDemo />
      <UseCases />
      <Showcase />
      <Discovery />
      <Channels />
      <Knowledge />
      <Integrations />
      <Handoff />
      <Analytics />
      <Roi />
      <Security />
      <Stories />
      <PricingPlans />
      <FinalCta />
    </>
  );
}
