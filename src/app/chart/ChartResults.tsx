'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BackgroundBlur } from "@/components/ui/background-blur";
import { User, Circle, X, ChevronRight, Mail } from "lucide-react";
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
  temporaryChartId?: string;
}

interface ChartData {
  energyType?: string;
  strategy?: string;
  authority?: string;
  profile?: string;
  signature?: string;
  notSelfTheme?: string;
  [key: string]: any;
}

export default function ChartResults({ formData, temporaryChartId }: ChartResultsProps) {
  const [showAppPrompt, setShowAppPrompt] = useState(false);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [email, setEmail] = useState('');
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [elements, setElements] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch chart data when component mounts
  useEffect(() => {
    const fetchChartData = async () => {
      console.log('Temporary Chart ID received:', temporaryChartId);
      if (!temporaryChartId) {
        // Fallback to mock data if no chart ID is provided
        setChartData({
          energyType: "Manifesting Generator",
          strategy: "To respond",
          authority: "Sacral",
          profile: "4/6",
          signature: "Satisfaction",
          notSelfTheme: "Feeling Uninspired",
        });
        setIsLoading(false);
        return;
      }

      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://vera.up.railway.app';
        
        // Fetch chart data
        const chartResponse = await fetch(`${apiUrl}/api/v1/onboarding/temporary-chart/${temporaryChartId}`);
        if (!chartResponse.ok) {
          throw new Error(`Failed to fetch chart: ${chartResponse.status} ${chartResponse.statusText}`);
        }
        const chartResult = await chartResponse.json();
        console.log('Chart API response:', chartResult);
        
        // Map backend data structure to frontend structure
        const mappedData = {
          energyType: chartResult.chart.type,
          strategy: chartResult.chart.strategy,
          authority: chartResult.chart.authority,
          profile: chartResult.chart.profile,
          signature: chartResult.chart.self_theme,
          notSelfTheme: chartResult.chart.not_self_theme,
          ...chartResult.chart // Include all other fields
        };
        console.log('Mapped chart data:', mappedData);
        setChartData(mappedData);

        // Fetch elements data
        console.log('Fetching elements for chart ID:', temporaryChartId);
        console.log('Elements API URL:', `${apiUrl}/api/v1/onboarding/temporary-chart/${temporaryChartId}/elements`);
        const elementsResponse = await fetch(`${apiUrl}/api/v1/onboarding/temporary-chart/${temporaryChartId}/elements`);
        if (elementsResponse.ok) {
          const elementsResult = await elementsResponse.json();
          console.log('Elements API response:', elementsResult);
          setElements(elementsResult.elements || []);
        } else {
          console.warn('Failed to fetch elements data:', elementsResponse.status, elementsResponse.statusText);
          console.warn('Elements API URL was:', `${apiUrl}/api/v1/onboarding/temporary-chart/${temporaryChartId}/elements`);
          console.warn('Using basic chart data only');
        }
      } catch (err) {
        console.error('Error fetching chart data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load chart data');
        // Fallback to mock data on error
        setChartData({
          energyType: "Manifesting Generator",
          strategy: "To respond",
          authority: "Sacral",
          profile: "4/6",
          signature: "Satisfaction",
          notSelfTheme: "Feeling Uninspired",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchChartData();
  }, [temporaryChartId]);

  // Helper function to get element data by type and value
  const getElementData = (type: string, _value?: string) => {
    if (!elements.length) return null;
    const element = elements.find(el => el.id === type);
    console.log(`Looking for id='${type}', found:`, element);
    return element;
  };



  // Helper function to get channel data
  const getChannelData = () => {
    const channels = elements.filter(el => el.id && el.id.startsWith('channel_'));
    console.log('Channels found:', channels);
    return channels;
  };
  
  const formatBirthDate = () => {
    if (!formData.birthDate) return '';
    // Split the date string to avoid timezone conversion issues
    const [year, month, day] = formData.birthDate.split('-');
    return `${month.padStart(2, '0')}/${day.padStart(2, '0')}/${year}`;
  };

  const formatBirthTime = () => {
    if (!formData.birthTime) return '';
    return formData.birthTime;
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen relative bg-background text-foreground flex items-center justify-center">
        <BackgroundBlur className="-top-40 md:-top-0" />
        <div className="text-center">
          <div className="text-2xl font-serif mb-4">Loading your chart...</div>
          <div className="text-muted-foreground">Please wait while we calculate your Human Design chart</div>
        </div>
      </div>
    );
  }

  // Show error state (but still render with fallback data)
  if (error) {
    console.warn('Chart loading error (using fallback data):', error);
  }

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
            {formData.firstName ? `${formData.firstName}'s Human Design Chart` : 'Your human design breakdown'}
          </h1>
          <div className="text-muted-foreground text-center text-sm mx-auto max-w-md">
            {chartData?.energyType || 'Loading...'} • {formatBirthDate()} • {formatBirthTime()} • {formData.birthCity}
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
                  Your unique energy blueprint
                </h2>
                <p className="text-muted-foreground leading-6 tracking-tight">
                  This is the basic and most powerful part of your Human Design chart. You have a unique way of making things happen and making decisions. Even if we learned that there is one way to do life, we all have differents ways of doing it.
                </p>
              </div>
            </div>

            {/* Blueprint Cards */}
            <div className="space-y-4">
              {/* Energy Type Card */}
              <div className="bg-card backdrop-blur-md border border-border rounded-xl p-4 shadow-lg">
                <div className="mb-3">
                  <div className="text-muted-foreground text-xs font-medium uppercase tracking-wide mb-2">
                    YOU&apos;RE A {chartData?.energyType?.toUpperCase() || 'LOADING...'}
                  </div>
                  <h2 className="font-serif text-xl font-bold tracking-tight text-foreground mb-3 leading-tight">
                    {(() => {
                      const typeElement = getElementData('type');
                      if (typeElement?.description) {
                        return typeElement.description;
                      }
                      return chartData?.energyType === 'Manifesting Generator' 
                        ? "You are a multi passionate powerhouse. Your many interests and talents aren't distractions, they're your greatest gifts."
                        : `Your energy type is ${chartData?.energyType || 'Loading...'}. This determines how your energy works and how you're designed to move through life.`;
                    })()}
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

              {/* Authority Card */}
              <div className="bg-card backdrop-blur-md border border-border rounded-xl p-4 shadow-lg">
                <div className="mb-3">
                  <div className="text-muted-foreground text-xs font-medium uppercase tracking-wide mb-2">
                    YOUR AUTHORITY IS {chartData?.authority?.toUpperCase() || 'LOADING...'}
                  </div>
                  <h2 className="font-serif text-xl font-bold tracking-tight text-foreground mb-3 leading-tight">
                    {(() => {
                      const authorityElement = getElementData('authority');
                      if (authorityElement?.description) {
                        return authorityElement.description;
                      }
                      return chartData?.authority === 'Sacral' 
                        ? "Trust your gut instincts and yes/no responses. Your body knows what's right for you before your mind does."
                        : `Your inner authority is ${chartData?.authority || 'Loading...'}. This is how you're designed to make decisions.`;
                    })()}
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
                    YOUR STRATEGY IS {chartData?.strategy?.toUpperCase() || 'LOADING...'}
                  </div>
                  <h2 className="font-serif text-xl font-bold tracking-tight text-foreground mb-3 leading-tight">
                    {(() => {
                      const strategyElement = getElementData('strategy');
                      if (strategyElement?.description) {
                        return strategyElement.description;
                      }
                      return chartData?.strategy === 'To respond' 
                        ? "Opportunities are always coming your way. Your job is simply to notice them clearly and trust your gut to respond."
                        : `Your strategy is ${chartData?.strategy || 'Loading...'}. This is how you're designed to engage with the world.`;
                    })()}
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
                    YOUR PROFILE IS {chartData?.profile || 'LOADING...'}
                  </div>
                  <h2 className="font-serif text-xl font-bold tracking-tight text-foreground mb-3 leading-tight">
                    {(() => {
                      const profileElement = getElementData('profile');
                      if (profileElement?.description) {
                        return profileElement.description;
                      }
                      return chartData?.profile === '4/6' 
                        ? "Influential Role Model - You are most powerful when you honor both connection and distance."
                        : `Your profile is ${chartData?.profile || 'Loading...'}. This represents your role in life and how you interact with others.`;
                    })()}
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

              {/* Self Theme Card */}
              <div className="bg-card backdrop-blur-md border border-border rounded-xl p-4 shadow-lg">
                <div className="mb-3">
                  <div className="text-muted-foreground text-xs font-medium uppercase tracking-wide mb-2">
                    YOUR SIGNATURE IS {chartData?.signature?.toUpperCase() || 'LOADING...'}
                  </div>
                  <h2 className="font-serif text-xl font-bold tracking-tight text-foreground mb-3 leading-tight">
                    {(() => {
                      // Self theme content might not be in elements, use fallback
                      return chartData?.signature === 'Satisfaction' 
                        ? "When you're living in alignment, you feel satisfied and fulfilled. This is your sign that you're on the right path."
                        : `Your signature theme is ${chartData?.signature || 'Loading...'}. This is how you feel when you're living authentically.`;
                    })()}
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

              {/* Not Self Theme Card */}
              <div className="bg-card backdrop-blur-md border border-border rounded-xl p-4 shadow-lg">
                <div className="mb-3">
                  <div className="text-muted-foreground text-xs font-medium uppercase tracking-wide mb-2">
                    YOUR NOT SELF THEME IS {chartData?.notSelfTheme?.toUpperCase() || 'LOADING...'}
                  </div>
                  <h2 className="font-serif text-xl font-bold tracking-tight text-foreground mb-3 leading-tight">
                    {(() => {
                      const notSelfElement = getElementData('not_self_theme');
                      if (notSelfElement?.description) {
                        return notSelfElement.description;
                      }
                      return chartData?.notSelfTheme === 'Feeling Uninspired' 
                        ? "When you're out of alignment, you may feel uninspired or frustrated. This is your signal to return to your strategy."
                        : `Your not-self theme is ${chartData?.notSelfTheme || 'Loading...'}. This is how you feel when you're not living authentically.`;
                    })()}
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

          {/* Your Inner Wiring Section */}
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-secondary/20 border-2 border-secondary/50 flex items-center justify-center flex-shrink-0">
                <Circle className="w-7 h-7 text-secondary-foreground" />
              </div>
              <div>
                <h2 className="font-serif text-2xl font-bold tracking-tight text-foreground mb-3">
                  Your Energy Hubs
                </h2>
                <p className="text-muted-foreground leading-6 tracking-tight">
                Your Centers show where your energy is steady and reliable, and where you&apos;re open to the world around you. They help you recognize what&apos;s truly yours vs. what you&apos;re picking up from others, so you can honor your strengths and grow wiser in your sensitivities.
                </p>
              </div>
            </div>
              
            {/* Centers Cards */}
            <div className="space-y-4">
              {(() => {
                const centers = elements.filter(el => el.id && el.id.startsWith('center_'));
                console.log('All centers from API:', centers);
                console.log('Total elements:', elements.length);
                console.log('Centers found:', centers.length);
                
                if (centers.length === 0) {
                  // Fallback to all 9 centers if no centers data
                  return [
                    { name: 'HEAD CENTER', status: 'OPEN', description: 'Your inspiration and mental pressure.' },
                    { name: 'AJNA CENTER', status: 'OPEN', description: 'Your mental awareness and conceptualization.' },
                    { name: 'THROAT CENTER', status: 'OPEN', description: 'Your communication and manifestation.' },
                    { name: 'G CENTER', status: 'DEFINED', description: 'Your identity, direction, and love.' },
                    { name: 'HEART CENTER', status: 'OPEN', description: 'Your willpower and ego.' },
                    { name: 'SACRAL CENTER', status: 'DEFINED', description: 'Your life force and sexual energy.' },
                    { name: 'SOLAR PLEXUS CENTER', status: 'OPEN', description: 'Your emotions and desires.' },
                    { name: 'SPLEEN CENTER', status: 'OPEN', description: 'Your intuition, health, and survival.' },
                    { name: 'ROOT CENTER', status: 'OPEN', description: 'Your drive and pressure to get things done.' }
                  ].map((center, index) => (
                    <div key={index} className="bg-card backdrop-blur-md border border-border rounded-xl p-4 shadow-lg">
                      <div className="mb-2">
                        <div className="text-muted-foreground text-xs font-medium uppercase tracking-wide mb-2 flex items-center gap-2">
                          <Circle className="w-3 h-3" />
                          {center.name} - {center.status}
                        </div>
                        <h3 className="font-serif text-xl font-bold tracking-tight text-foreground mb-3 leading-tight">
                          {center.description}
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
                  ));
                }
                
                // Display all centers from the API (should be 9)
                return centers.map((center, index) => (
                  <div key={index} className="bg-card backdrop-blur-md border border-border rounded-xl p-4 shadow-lg">
                    <div className="mb-2">
                      <div className="text-muted-foreground text-xs font-medium uppercase tracking-wide mb-2 flex items-center gap-2">
                        <Circle className="w-3 h-3" />
                        {center.subtitle?.toUpperCase() || center.element_name?.toUpperCase() || 'CENTER'}
                      </div>
                      <h3 className="font-serif text-xl font-bold tracking-tight text-foreground mb-3 leading-tight">
                        {center.title || center.description || 'Center information'}
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
                ));
              })()}
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

            {/* Channel Cards */}
            <div className="space-y-4">
              {(() => {
                const channels = getChannelData();
                if (channels.length === 0) {
                  return (
                    <div className="bg-card backdrop-blur-md border border-border rounded-xl p-4 shadow-lg">
                      <div className="mb-2">
                        <div className="text-muted-foreground text-xs font-medium uppercase tracking-wide mb-2 flex items-center gap-2">
                          <Circle className="w-3 h-3" />
                          NO DEFINED CHANNELS
                        </div>
                        <h3 className="font-serif text-xl font-bold tracking-tight text-foreground mb-3 leading-tight">
                          You have open and undefined centers, making you very adaptable and sensitive to your environment.
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
                  );
                }
                
                return channels.map((channel, index) => (
                  <div key={index} className="bg-card backdrop-blur-md border border-border rounded-xl p-4 shadow-lg">
                    <div className="mb-2">
                      <div className="text-muted-foreground text-xs font-medium uppercase tracking-wide mb-2 flex items-center gap-2">
                        <Circle className="w-3 h-3" />
                        {channel.subtitle?.toUpperCase() || channel.element_name || 'CHANNEL'}
                      </div>
                      <h3 className="font-serif text-xl font-bold tracking-tight text-foreground mb-3 leading-tight">
                        {channel.title || channel.description || 'Defined channel connection'}
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
                ));
              })()}
            </div>
          </div>

          {/* Continue with Vera CTA */}
          <div className="pt-8 pb-4">
            <Button
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg rounded-xl shadow-lg"
              onClick={() => setShowAppPrompt(true)}
            >
              Get your full personalized chart
            </Button>
            <p className="text-center text-muted-foreground text-sm mt-4 italic">
              Get personalized guidance and deeper insights in the Vera app
            </p>
          </div>
        </div>

        {/* App Download Prompt Modal */}
        {showAppPrompt && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 z-50">
            <div className="bg-vera-background/95 backdrop-blur-md border border-vera-success rounded-2xl p-8 max-w-md w-full relative shadow-2xl">
              <button
                onClick={() => setShowAppPrompt(false)}
                className="absolute top-4 right-4 text-vera-accent hover:text-vera-text transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Image src="/logo-light.svg" alt="Vera logo" width={48} height={48} className="w-12 h-12" />
                </div>

                <h3 className="font-serif text-2xl font-bold tracking-tight text-vera-text mb-4">
                  Get your full personalized Chart in your pocket
                </h3>

                <p className="text-vera-accent leading-6 tracking-tight mb-8 text-center">
                  Your chart helps you illuminate who you really are, how to be yourself, your gifts, the places you are most likely to get off track, and how to navigate the world.
                </p>

                {/* What's Included Section */}
                <div className="bg-vera-background-secondary/40 backdrop-blur-sm border border-vera-success/50 rounded-2xl p-6 mb-6">
                  <h4 className="text-vera-text font-medium text-sm uppercase tracking-wide mb-6 text-center">
                    What&apos;s Included
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="text-center">
                      <h5 className="text-vera-text font-medium text-base mb-2">Full Personalized Human Design Chart</h5>
                      <p className="text-vera-accent text-sm leading-relaxed">
                      </p>
                    </div>

                    <div className="text-center">
                      <h5 className="text-vera-text font-medium text-base mb-2">Accurate Coach</h5>
                      <p className="text-vera-accent text-sm leading-relaxed">
                      </p>
                    </div>

                    <div className="text-center">
                      <h5 className="text-vera-text font-medium text-base mb-2">Relationship Insights</h5>
                      <p className="text-vera-accent text-sm leading-relaxed">
                      </p>
                    </div>

                    <div className="text-center">
                      <h5 className="text-vera-text font-medium text-base mb-2">Daily Journal & Practices</h5>
                      <p className="text-vera-accent text-sm leading-relaxed">
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {/* App Store Button */}
                  <Button 
                    className="w-full bg-vera-primary hover:bg-vera-primary/90 text-black py-6 text-lg rounded-xl flex items-center justify-center gap-2 shadow-lg font-medium"
                    onClick={() => window.open('https://apps.apple.com/us/app/vera-your-human-design-guide/id6748094016', '_blank')}
                  >
                    <span className="text-lg">📱</span>
                    Download from App Store
                  </Button>
                  
                  <Button 
                    variant="ghost"
                    className="w-full text-vera-accent hover:text-vera-text"
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
