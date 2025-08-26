"use client";

import { FAQs } from "@/components/faqs/faqs";
import { Features } from "@/components/features/features";
import { Footer } from "@/components/footer/footer";
import { Hero } from "@/components/hero/hero";
import { HumanDesignForm } from "@/components/human-design-form/human-design-form";
import { Showcase } from "@/components/showcase/showcase";
import { Testimonials } from "@/components/testimonials/testimonials";
import { useRedirectWarning } from "@/lib/redirect";

export default function Home() {
  useRedirectWarning();

  return (
    <>
      <Hero />
      <Showcase />
      <Features />
      <Testimonials />
      <FAQs />
      
      {/* Chart Section - Encourage users to get their chart */}
      <section className="relative py-16 md:py-24 bg-vera-background">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-serif text-2xl md:text-4xl font-bold mb-4 tracking-tight text-vera-text">
            Ready to discover your Human Design?
          </h2>
          <p className="text-vera-text/80 text-lg mb-8 max-w-2xl mx-auto">
            Get your personalized Human Design chart and start your journey of self-discovery today.
          </p>
          <HumanDesignForm />
        </div>
      </section>
      
      <Footer />
    </>
  );
}
