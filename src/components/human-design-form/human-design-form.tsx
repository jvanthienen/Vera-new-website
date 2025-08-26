"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LocationAutocomplete } from "@/components/ui/location-autocomplete";
import { PlaceDetails } from "@/hooks/use-location-autocomplete";
import { cn } from "@/lib/utils";

interface FormData {
  firstName: string;
  birthCity: string;
  birthDate: string;
  birthTime: string;
  email: string;
}

interface LocationData {
  lat?: number;
  lng?: number;
  timezone?: string;
  formattedAddress?: string;
}

export function HumanDesignForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    birthCity: "",
    birthDate: "",
    birthTime: "",
    email: ""
  });
  
  const [locationData, setLocationData] = useState<LocationData>({});


  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePlaceSelect = (placeDetails: PlaceDetails) => {
    setLocationData({
      lat: placeDetails.geometry.lat,
      lng: placeDetails.geometry.lng,
      timezone: placeDetails.timezone,
      formattedAddress: placeDetails.formatted_address,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create URL parameters from form data
    const params = new URLSearchParams();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    
    // Add location data if available
    if (locationData.lat) params.append("lat", locationData.lat.toString());
    if (locationData.lng) params.append("lng", locationData.lng.toString());
    if (locationData.timezone) params.append("timezone", locationData.timezone);
    if (locationData.formattedAddress) params.append("formattedAddress", locationData.formattedAddress);
    
    // Navigate to chart page with form data
    router.push(`/chart?${params.toString()}`);
  };

  const canSubmit = Object.values(formData).every(value => value.trim() !== "");

  return (
    <div 
      id="chart-form" 
      className="w-full px-4 mb-8 scroll-mt-8"
    >
      <div className="max-w-4xl mx-auto text-center">
        

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8" suppressHydrationWarning>
          {/* First Name Row */}
          <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
            <div className="flex items-center gap-4">
              <span className="font-body text-vera-success whitespace-nowrap">I&apos;m</span>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="first name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className="w-48 bg-transparent border-0 border-b-2 border-vera-success rounded-none px-0 pb-1 text-center font-body text-vera-success placeholder:text-vera-accent focus-visible:ring-0 focus-visible:border-vera-primary"
                  suppressHydrationWarning
                />
              </div>
              <span className="font-body text-vera-success">.</span>
            </div>
          </div>

          {/* Birth Information Row */}
          <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
            {/* "I was born in" */}
            <div className="flex items-center gap-4">
              <span className="font-body text-vera-success whitespace-nowrap">I was born in</span>
              <div className="relative">
                <LocationAutocomplete
                  value={formData.birthCity}
                  onChange={(value) => handleInputChange("birthCity", value)}
                  onPlaceSelect={handlePlaceSelect}
                  placeholder="a city"
                  inputClassName="w-64 bg-transparent border-0 border-b-2 border-vera-success rounded-none px-0 pb-1 text-center font-body text-vera-success placeholder:text-vera-accent focus-visible:ring-0 focus-visible:border-vera-primary"
                />
              </div>
            </div>

            {/* Date Input */}
            <div className="flex items-center gap-4">
              <span className="font-body text-vera-success whitespace-nowrap">on</span>
              <div className="relative">
                <Input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => handleInputChange("birthDate", e.target.value)}
                  className="w-48 bg-transparent border-0 border-b-2 border-vera-success rounded-none px-0 pb-1 text-center font-body text-vera-success focus-visible:ring-0 focus-visible:border-vera-primary"
                  suppressHydrationWarning
                />
              </div>
            </div>

            {/* Time Input */}
            <div className="flex items-center gap-4">
              <span className="font-body text-vera-success whitespace-nowrap">at</span>
              <div className="relative">
                <Input
                  type="time"
                  value={formData.birthTime}
                  onChange={(e) => handleInputChange("birthTime", e.target.value)}
                  className="w-32 bg-transparent border-0 border-b-2 border-vera-success rounded-none px-0 pb-1 text-center font-body text-vera-success focus-visible:ring-0 focus-visible:border-vera-primary"
                  suppressHydrationWarning
                />
              </div>
              <span className="font-body text-vera-success">.</span>
            </div>
          </div>

          {/* Email Row */}
          <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
            <div className="flex items-center gap-4">
              <span className="font-body text-vera-success whitespace-nowrap">My email is</span>
              <div className="relative">
                <Input
                  type="email"
                  placeholder="email address"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-64 bg-transparent border-0 border-b-2 border-vera-success rounded-none px-0 pb-1 text-center font-body text-vera-success placeholder:text-vera-accent focus-visible:ring-0 focus-visible:border-vera-primary"
                  suppressHydrationWarning
                />
              </div>
              <span className="font-body text-vera-success">.</span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-8">
            <Button
              type="submit"
              disabled={!canSubmit}
              className={cn(
                "px-8 py-3 font-button transition-all duration-200",
                canSubmit
                  ? "bg-vera-primary hover:bg-vera-primary/90 text-vera-background border-vera-primary"
                  : "bg-vera-accent opacity-50 cursor-not-allowed border-vera-accent text-vera-text"
              )}
              suppressHydrationWarning
            >
              GET YOUR CHART
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
