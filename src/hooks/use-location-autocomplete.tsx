"use client";

import { useState, useCallback, useRef } from "react";

export interface PlaceStructuredFormatting {
  main_text: string;
  secondary_text: string;
}

export interface PlacePrediction {
  description: string;
  place_id: string;
  structured_formatting: PlaceStructuredFormatting;
}

export interface PlacesResponse {
  predictions: PlacePrediction[];
  status: string;
}

export interface PlaceDetails {
  geometry: {
    lat: number;
    lng: number;
  };
  formatted_address: string;
  timezone: string;
}

const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || "https://vera.up.railway.app";

export function useLocationAutocomplete() {
  const [suggestions, setSuggestions] = useState<PlacePrediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const cacheRef = useRef<Map<string, PlacePrediction[]>>(new Map());
  const lastRequestRef = useRef<string>("");

  const fetchSuggestions = useCallback(
    async (inputText: string) => {
      const trimmedInput = inputText.trim().toLowerCase();
      
      // Minimum length check to avoid excessive calls
      if (!trimmedInput || trimmedInput.length < 2) {
        setSuggestions([]);
        setIsLoading(false);
        return;
      }

      // Prevent duplicate requests
      if (lastRequestRef.current === trimmedInput) {
        return;
      }

      // Check cache first
      if (cacheRef.current.has(trimmedInput)) {
        const cachedResults = cacheRef.current.get(trimmedInput) || [];
        setSuggestions(cachedResults);
        setIsLoading(false);
        return;
      }

      // Cancel previous request if it exists
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Update last request
      lastRequestRef.current = trimmedInput;

      // Create new abort controller for this request
      abortControllerRef.current = new AbortController();

      setIsLoading(true);
      setError(null);

      try {
        const url = `${BACKEND_API_URL}/api/v1/location/autocomplete?input_text=${encodeURIComponent(
          trimmedInput
        )}&types=(cities)&language=en`;
        
        const response = await fetch(url, {
          signal: abortControllerRef.current.signal
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: PlacesResponse = await response.json();
        
        if (data.status === "OK") {
          // Cache the results
          cacheRef.current.set(trimmedInput, data.predictions);
          setSuggestions(data.predictions);
        } else {
          throw new Error(`API error: ${data.status}`);
        }
      } catch (err) {
        // Don't set error for aborted requests
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
        setError(err instanceof Error ? err.message : "Failed to fetch suggestions");
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const getPlaceDetails = useCallback(
    async (placeId: string): Promise<PlaceDetails | null> => {
      setError(null);

      try {
        const response = await fetch(
          `${BACKEND_API_URL}/api/v1/location/details?place_id=${encodeURIComponent(placeId)}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: PlaceDetails = await response.json();
        return data;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch place details");
        return null;
      }
    },
    []
  );

  return {
    suggestions,
    isLoading,
    error,
    fetchSuggestions,
    getPlaceDetails,
    clearSuggestions: () => setSuggestions([]),
  };
}
