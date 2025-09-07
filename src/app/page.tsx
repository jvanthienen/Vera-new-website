"use client";

import dynamic from "next/dynamic";
import { FAQs } from "@/components/faqs/faqs";
import { Features } from "@/components/features/features";
import { Footer } from "@/components/footer/footer";
import { Hero } from "@/components/hero/hero";
import { HumanDesignForm } from "@/components/human-design-form/human-design-form";
import { Showcase } from "@/components/showcase/showcase";
import { Testimonials } from "@/components/testimonials/testimonials";
import { useRedirectWarning } from "@/lib/redirect";

// Dynamically import components that are below the fold for better mobile performance
const DynamicFeatures = dynamic(() => import("@/components/features/features").then(mod => ({ default: mod.Features })), {
  loading: () => <div className="h-96 animate-pulse bg-gray-100 rounded-lg" />,
});

const DynamicTestimonials = dynamic(() => import("@/components/testimonials/testimonials").then(mod => ({ default: mod.Testimonials })), {
  loading: () => <div className="h-64 animate-pulse bg-gray-100 rounded-lg" />,
});

const DynamicFAQs = dynamic(() => import("@/components/faqs/faqs").then(mod => ({ default: mod.FAQs })), {
  loading: () => <div className="h-64 animate-pulse bg-gray-100 rounded-lg" />,
});

export default function Home() {
  useRedirectWarning();

  return (
    <>
      <Hero />
      <Showcase />
      <DynamicFeatures />
      <DynamicTestimonials />
      <DynamicFAQs />
      
      {/* Chart Section - Encourage users to get their chart */}
      <section className="relative py-12 sm:py-16 lg:py-24 bg-vera-background">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-serif text-xl sm:text-2xl lg:text-4xl font-bold mb-4 tracking-tight text-vera-text">
            Ready to discover your Human Design?
          </h2>
          <p className="text-vera-text/80 text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
            Get your personalized Human Design chart and start your journey of self-discovery today.
          </p>
          <HumanDesignForm />
        </div>
      </section>
      
      <Footer />
    </>
  );
}
