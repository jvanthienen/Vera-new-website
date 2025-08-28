"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import posthog from "posthog-js";
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
    email: "",
  });

  const [locationData, setLocationData] = useState<LocationData>({});
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePlaceSelect = (placeDetails: PlaceDetails) => {
    setLocationData({
      lat: placeDetails.geometry.lat,
      lng: placeDetails.geometry.lng,
      timezone: placeDetails.timezone,
      formattedAddress: placeDetails.formatted_address,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    posthog.capture("chart_calculation_submitted", {
      birth_time_provided: !!formData.birthTime,
      location_selected_from_autocomplete: !!locationData.lat,
    });
    setError(null);
    setIsCalculating(true);

    try {
      // Validate required fields
      if (!formData.firstName || !formData.birthCity || !formData.birthDate || !formData.email) {
        throw new Error("Please fill in all required fields");
      }

      if (!locationData.lat || !locationData.lng || !locationData.timezone) {
        throw new Error("Please select a valid location from the dropdown");
      }

      // Prepare the request data for the backend API
      const birthTime = formData.birthTime || "unknown";
      const requestBody = {
        birth_date: formData.birthDate,
        birth_time: birthTime === "" ? "unknown" : `${birthTime}:00`, // Add seconds if not present
        birth_location: locationData.formattedAddress || formData.birthCity,
        latitude: locationData.lat,
        longitude: locationData.lng,
        timezone: locationData.timezone,
      };

      // Call the backend API
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://vera.up.railway.app";
      const response = await fetch(`${apiUrl}/api/v1/onboarding/calculate-temporary-chart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Chart calculation failed: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Chart calculation API response:", result);
      console.log("Temporary chart ID from API:", result.temporary_chart_id);

      // Navigate to chart page with temporary chart ID and form data
      const params = new URLSearchParams();
      params.append("temporaryChartId", result.temporary_chart_id);
      Object.entries(formData).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      // Add location data
      if (locationData.lat) params.append("lat", locationData.lat.toString());
      if (locationData.lng) params.append("lng", locationData.lng.toString());
      if (locationData.timezone) params.append("timezone", locationData.timezone);
      if (locationData.formattedAddress) params.append("formattedAddress", locationData.formattedAddress);

      const chartUrl = `/chart?${params.toString()}`;
      console.log("Navigating to chart URL:", chartUrl);
      router.push(chartUrl);
    } catch (err) {
      console.error("Chart calculation error:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to calculate chart";
      posthog.capture("chart_calculation_failed", {
        error_message: errorMessage,
      });
      setError(errorMessage);
    } finally {
      setIsCalculating(false);
    }
  };

  const canSubmit = Object.values(formData).every((value) => value.trim() !== "");

  return (
    <div id="chart-form" className="mb-8 w-full scroll-mt-8 px-4">
      <div className="mx-auto max-w-4xl text-center">
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8" suppressHydrationWarning>
          {/* First Name Row */}
          <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
            <div className="flex items-center gap-4">
              <span className="font-body text-vera-success whitespace-nowrap">I&apos;m</span>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="first name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className="border-vera-success font-body text-vera-success placeholder:text-vera-accent focus-visible:border-vera-primary w-48 rounded-none border-0 border-b-2 bg-transparent px-0 pb-1 text-center focus-visible:ring-0"
                  suppressHydrationWarning
                />
              </div>
              <span className="font-body text-vera-success">.</span>
            </div>
          </div>

          {/* Birth Information Row */}
          <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
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
                  className="border-vera-success font-body text-vera-success focus-visible:border-vera-primary w-48 rounded-none border-0 border-b-2 bg-transparent px-0 pb-1 text-center focus-visible:ring-0"
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
                  className="border-vera-success font-body text-vera-success focus-visible:border-vera-primary w-32 rounded-none border-0 border-b-2 bg-transparent px-0 pb-1 text-center focus-visible:ring-0"
                  suppressHydrationWarning
                />
              </div>
              <span className="font-body text-vera-success">.</span>
            </div>
          </div>

          {/* Email Row */}
          <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
            <div className="flex items-center gap-4">
              <span className="font-body text-vera-success whitespace-nowrap">My email is</span>
              <div className="relative">
                <Input
                  type="email"
                  placeholder="email address"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="border-vera-success font-body text-vera-success placeholder:text-vera-accent focus-visible:border-vera-primary w-64 rounded-none border-0 border-b-2 bg-transparent px-0 pb-1 text-center focus-visible:ring-0"
                  suppressHydrationWarning
                />
              </div>
              <span className="font-body text-vera-success">.</span>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mt-4 flex justify-center">
              <div className="max-w-md rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">{error}</div>
            </div>
          )}

          {/* Submit Button */}
          <div className="mt-8 flex justify-center">
            <Button
              type="submit"
              disabled={!canSubmit || isCalculating}
              className={cn(
                "font-button px-8 py-3 transition-all duration-200",
                canSubmit && !isCalculating
                  ? "bg-vera-primary hover:bg-vera-primary/90 text-vera-background border-vera-primary"
                  : "bg-vera-accent border-vera-accent text-vera-text cursor-not-allowed opacity-50",
              )}
              suppressHydrationWarning
            >
              {isCalculating ? "CALCULATING..." : "GET YOUR CHART"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
