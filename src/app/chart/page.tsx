'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import ChartResults from './ChartResults';

function ChartPageContent() {
  const searchParams = useSearchParams();
  
  // Get form data from URL parameters
  const formData = {
    firstName: searchParams?.get('firstName') || '',
    birthCity: searchParams?.get('birthCity') || '',
    birthDate: searchParams?.get('birthDate') || '',
    birthTime: searchParams?.get('birthTime') || '',
    email: searchParams?.get('email') || '',
  };

  // Get temporary chart ID if it exists
  const temporaryChartId = searchParams?.get('temporaryChartId') || '';

  return <ChartResults formData={formData} temporaryChartId={temporaryChartId} />;
}

export default function ChartPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-vera-background flex items-center justify-center">
      <div className="text-vera-text">Loading your chart...</div>
    </div>}>
      <ChartPageContent />
    </Suspense>
  );
}
