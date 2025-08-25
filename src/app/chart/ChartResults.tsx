'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BackgroundBlur } from "@/components/ui/background-blur";
import { User, Circle, X, Download, Smartphone, ChevronRight, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface FormData {
  firstName: string;
  birthCity: string;
  birthDate: string;
  birthTime: string;
  email: string;
}

interface ChartResultsProps {
  formData: FormData;
}

// Mock chart data - replace with actual calculation
const generateMockChart = (_formData: FormData) => {
  return {
    energyType: "Manifesting Generator",
    strategy: "To respond",
    authority: "Sacral",
    profile: "4/6",
    signature: "Satisfaction",
    notSelfTheme: "Feeling Uninspired",
  };
};

export default function ChartResults({ formData }: ChartResultsProps) {
  const [showAppPrompt, setShowAppPrompt] = useState(false);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [email, setEmail] = useState('');
  const chartData = generateMockChart(formData);
  
  const formatBirthDate = () => {
    if (!formData.birthDate) return '';
    const date = new Date(formData.birthDate);
    return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  const formatBirthTime = () => {
    if (!formData.birthTime) return '';
    return formData.birthTime;
  };

  return (
    <div className="min-h-screen relative bg-background text-foreground">
      {/* Background Blur matching landing page */}
      <BackgroundBlur className="-top-40 md:-top-0" />

      {/* Navigation - Updated to match new website */}
      <nav className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between gap-4 p-8">
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={86} height={26} />
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link href="/#features" className="text-muted-foreground hover:text-foreground transition-colors">
            Features
          </Link>
          <Link href="/#chart-form" className="text-muted-foreground hover:text-foreground transition-colors">
            Chart
          </Link>
          <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
            Blog
          </Link>
        </div>

        <Button asChild className="hidden md:block">
          <Link href="https://apps.apple.com/us/app/vera-your-human-design-guide/id6748094016" target="_blank" rel="noopener noreferrer">Download the app</Link>
        </Button>
        
        {/* Mobile menu button */}
        <button className="md:hidden text-foreground">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Scrollable Content */}
      <div className="relative z-10">
        {/* Header with birth details */}
        <div className="px-6 py-8 text-center">
          <h1 className="font-serif text-center text-3xl leading-[1.1] font-bold tracking-tight sm:text-5xl mb-3">
            {formData.firstName ? `${formData.firstName}'s bodychart` : 'Your human design breakdown'}
          </h1>
          <div className="text-muted-foreground text-center text-sm mx-auto max-w-md">
            {chartData.energyType} • {formatBirthDate()} • {formatBirthTime()} • {formData.birthCity}
          </div>
        </div>

        <div className="px-4 md:px-8 lg:px-12 xl:px-16 pb-6 space-y-6 max-w-4xl mx-auto">
          {/* Your Personal Blueprint Section */}
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-secondary/20 border-2 border-secondary/50 flex items-center justify-center flex-shrink-0">
                <User className="w-7 h-7 text-secondary-foreground" />
              </div>
              <div>
                <h2 className="font-serif text-2xl font-bold tracking-tight text-foreground mb-3">
                  Your personal blueprint
                </h2>
                <p className="text-muted-foreground leading-6 tracking-tight">
                  This is how you&apos;re designed to move through life: how your energy works, how you make aligned choices, and how to come back to your true self.
                </p>
              </div>
            </div>

            {/* Blueprint Cards */}
            <div className="space-y-4">
              {/* Energy Type Card */}
              <div className="bg-card backdrop-blur-md border border-border rounded-xl p-4 shadow-lg">
                <div className="mb-3">
                  <div className="text-muted-foreground text-xs font-medium uppercase tracking-wide mb-2">
                    YOU&apos;RE A MANIFESTING GENERATOR
                  </div>
                  <h2 className="font-serif text-xl font-bold tracking-tight text-foreground mb-3 leading-tight">
                    You are a multi passionate powerhouse. Your many interests and talents aren&apos;t distractions, they&apos;re your greatest gifts.
                  </h2>
                </div>
                <button 
                  className="flex items-center justify-between w-full py-3 text-muted-foreground hover:text-foreground transition-colors group"
                  onClick={() => setShowAppPrompt(true)}
                >
                  <span className="text-sm">Learn more</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Strategy Card */}
              <div className="bg-card backdrop-blur-md border border-border rounded-xl p-4 shadow-lg">
                <div className="mb-3">
                  <div className="text-muted-foreground text-xs font-medium uppercase tracking-wide mb-2">
                    YOUR STRATEGY IS TO RESPOND
                  </div>
                  <h2 className="font-serif text-xl font-bold tracking-tight text-foreground mb-3 leading-tight">
                    Opportunities are always coming your way. Your job is simply to notice them clearly and trust your gut to respond.
                  </h2>
                </div>
                <button 
                  className="flex items-center justify-between w-full py-3 text-muted-foreground hover:text-foreground transition-colors group"
                  onClick={() => setShowAppPrompt(true)}
                >
                  <span className="text-sm">Learn more</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Profile Card */}
              <div className="bg-card backdrop-blur-md border border-border rounded-xl p-4 shadow-lg">
                <div className="mb-3">
                  <div className="text-muted-foreground text-xs font-medium uppercase tracking-wide mb-2">
                    YOUR PROFILE IS 4/6
                  </div>
                  <h2 className="font-serif text-xl font-bold tracking-tight text-foreground mb-3 leading-tight">
                    Influential Role Model - You are most powerful when you honor both connection and distance.
                  </h2>
                </div>
                <button 
                  className="flex items-center justify-between w-full py-3 text-muted-foreground hover:text-foreground transition-colors group"
                  onClick={() => setShowAppPrompt(true)}
                >
                  <span className="text-sm">Learn more</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Your Main Strengths & Purpose Section */}
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-secondary/20 border-2 border-secondary/50 flex items-center justify-center flex-shrink-0">
                <div className="w-8 h-8 flex items-center justify-center">
                  <span className="text-primary text-2xl">✦</span>
                </div>
              </div>
              <div>
                <h2 className="font-serif text-2xl font-bold tracking-tight text-foreground mb-3">
                  Your main strengths & purpose
                </h2>
                <p className="text-muted-foreground leading-6 tracking-tight">
                  Understanding your unique gifts and how you&apos;re designed to contribute to the world.
                </p>
              </div>
            </div>

            {/* Strengths Cards */}
            <div className="space-y-4">
              <div className="bg-card backdrop-blur-md border border-border rounded-xl p-4 shadow-lg">
                <div className="mb-2">
                  <div className="text-muted-foreground text-xs font-medium uppercase tracking-wide mb-2">
                    YOU&apos;RE A MANIFESTING GENERATOR
                  </div>
                  <h3 className="font-serif text-xl font-bold tracking-tight text-foreground mb-3 leading-tight">
                    You are a multi passionate powerhouse. Your many interests and talents aren&apos;t distractions, they&apos;re your greatest gifts.
                  </h3>
                </div>
                <button 
                  className="flex items-center justify-between w-full py-3 text-muted-foreground hover:text-foreground transition-colors group"
                  onClick={() => setShowAppPrompt(true)}
                >
                  <span className="text-sm">Learn more</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Channel Cards */}
              <div className="bg-card backdrop-blur-md border border-border rounded-xl p-4 shadow-lg">
                <div className="mb-2">
                  <div className="text-muted-foreground text-xs font-medium uppercase tracking-wide mb-2 flex items-center gap-2">
                    <Circle className="w-3 h-3" />
                    CHANNEL 2-14
                  </div>
                  <h3 className="font-serif text-xl font-bold tracking-tight text-foreground mb-3 leading-tight">
                    Channel of the Beat - Keeper of Keys
                  </h3>
                </div>
                <button 
                  className="flex items-center justify-between w-full py-2 text-muted-foreground hover:text-foreground transition-colors group"
                  onClick={() => setShowAppPrompt(true)}
                >
                  <span className="text-sm">Learn more</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Your Inner Wiring Section */}
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-secondary/20 border-2 border-secondary/50 flex items-center justify-center flex-shrink-0">
                <Circle className="w-7 h-7 text-secondary-foreground" />
              </div>
              <div>
                <h2 className="font-serif text-2xl font-bold tracking-tight text-foreground mb-3">
                  Your Inner Wiring
                </h2>
                <p className="text-muted-foreground leading-6 tracking-tight">
                  Centers reveal how you take in and express energy: your steady traits and your sensitive spots.
                </p>
              </div>
            </div>
              
            {/* Centers Cards */}
            <div className="space-y-4">
              <div className="bg-card backdrop-blur-md border border-border rounded-xl p-4 shadow-lg">
                <div className="mb-2">
                  <div className="text-muted-foreground text-xs font-medium uppercase tracking-wide mb-2 flex items-center gap-2">
                    <Circle className="w-3 h-3" />
                    SACRAL CENTER - DEFINED
                  </div>
                  <h3 className="font-serif text-xl font-bold tracking-tight text-foreground mb-3 leading-tight">
                    Trust your constant energy wisdom to guide you.
                  </h3>
                </div>
                <button 
                  className="flex items-center justify-between w-full py-2 text-muted-foreground hover:text-foreground transition-colors group"
                  onClick={() => setShowAppPrompt(true)}
                >
                  <span className="text-sm">Learn more</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="bg-card backdrop-blur-md border border-border rounded-xl p-4 shadow-lg">
                <div className="mb-2">
                  <div className="text-muted-foreground text-xs font-medium uppercase tracking-wide mb-2 flex items-center gap-2">
                    <Circle className="w-3 h-3" />
                    SOLAR PLEXUS CENTER - OPEN
                  </div>
                  <h3 className="font-serif text-xl font-bold tracking-tight text-foreground mb-3 leading-tight">
                    Your empathy is off the charts.
                  </h3>
                </div>
                <button 
                  className="flex items-center justify-between w-full py-2 text-muted-foreground hover:text-foreground transition-colors group"
                  onClick={() => setShowAppPrompt(true)}
                >
                  <span className="text-sm">Learn more</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="bg-card backdrop-blur-md border border-border rounded-xl p-4 shadow-lg">
                <div className="mb-2">
                  <div className="text-muted-foreground text-xs font-medium uppercase tracking-wide mb-2 flex items-center gap-2">
                    <Circle className="w-3 h-3" />
                    G CENTER - DEFINED
                  </div>
                  <h3 className="font-serif text-xl font-bold tracking-tight text-foreground mb-3 leading-tight">
                    Your steady sense of self is guiding yourself and others.
                  </h3>
                </div>
                <button 
                  className="flex items-center justify-between w-full py-2 text-muted-foreground hover:text-foreground transition-colors group"
                  onClick={() => setShowAppPrompt(true)}
                >
                  <span className="text-sm">Learn more</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Continue with Vera CTA */}
          <div className="pt-8 pb-4">
            <Button
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg rounded-xl shadow-lg"
              onClick={() => setShowAppPrompt(true)}
            >
              Get your full chart for free
            </Button>
            <p className="text-center text-muted-foreground text-sm mt-4 italic">
              Get personalized guidance and deeper insights in the Vera app
            </p>
          </div>
        </div>

        {/* App Download Prompt Modal */}
        {showAppPrompt && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 z-50">
            <div className="bg-card/90 backdrop-blur-md border border-border rounded-2xl p-8 max-w-md w-full relative shadow-2xl">
              <button
                onClick={() => setShowAppPrompt(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center">
                <div className="w-20 h-20 bg-primary/30 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/50">
                  <Smartphone className="w-10 h-10 text-primary" />
                </div>

                <h3 className="font-serif text-2xl font-bold tracking-tight text-foreground mb-4">
                  Get your complete blueprint
                </h3>

                <p className="text-muted-foreground leading-6 tracking-tight mb-6">
                  Unlock your full Human Design chart with personalized insights, daily guidance, and Vera as your personal coach.
                </p>

                <div className="bg-background/20 backdrop-blur-sm border border-border rounded-xl p-4 mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Download className="w-5 h-5 text-primary" />
                    <span className="text-primary font-medium">3 Days Free Trial</span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Full access to your detailed blueprint, personalized coaching, and decision-making guidance
                  </p>
                </div>

                <div className="space-y-3">
                  {/* App Store Buttons */}
                  <div className="flex gap-3">
                    <Button 
                      className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg rounded-xl flex items-center justify-center gap-2 shadow-lg"
                      onClick={() => window.open('https://apps.apple.com/us/app/vera-your-human-design-guide/id6748094016', '_blank')}
                    >
                      <span className="text-lg">📱</span>
                      App Store
                    </Button>
                    
                    <Button 
                      className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg rounded-xl flex items-center justify-center gap-2 shadow-lg"
                      onClick={() => window.open('https://play.google.com/store/apps/details?id=com.vera.app', '_blank')}
                    >
                      <span className="text-lg">🤖</span>
                      Play Store
                    </Button>
                  </div>
                  
                  <Button 
                    variant="ghost"
                    className="w-full text-muted-foreground hover:text-foreground"
                    onClick={() => {
                      setShowAppPrompt(false);
                      setShowEmailCapture(true);
                    }}
                  >
                    Maybe later
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Email Capture Modal */}
        {showEmailCapture && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-6 z-50">
            <div className="bg-card border border-border rounded-2xl p-8 max-w-md w-full relative">
              <button
                onClick={() => setShowEmailCapture(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center">
                <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-8 h-8 text-secondary-foreground" />
                </div>

                <h3 className="font-serif text-2xl font-bold tracking-tight text-foreground mb-4">
                  Stay connected with your journey
                </h3>

                <p className="text-muted-foreground leading-6 tracking-tight mb-6">
                  Get personalized Human Design insights, tips, and guidance delivered to your inbox. We&apos;ll help you understand your blueprint better.
                </p>

                <div className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full"
                  />
                  
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-xl"
                    onClick={() => {
                      // TODO: Handle email submission
                      console.log('Email submitted:', email);
                      setShowEmailCapture(false);
                      setEmail('');
                    }}
                    disabled={!email || !email.includes('@')}
                  >
                    Send me insights
                  </Button>
                  
                  <Button 
                    variant="ghost"
                    className="w-full text-muted-foreground hover:text-foreground text-sm"
                    onClick={() => setShowEmailCapture(false)}
                  >
                    No thanks
                  </Button>
                </div>

                <p className="text-muted-foreground/70 text-xs mt-4">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
