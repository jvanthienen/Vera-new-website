"use client";

import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { useLocationAutocomplete, PlacePrediction, PlaceDetails } from "@/hooks/use-location-autocomplete";
import { cn } from "@/lib/utils";

// Custom hook to handle client-side only state
function useIsClient() {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    // Add a small delay to ensure hydration is complete
    const timer = setTimeout(() => {
      setIsClient(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return isClient;
}

interface LocationAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onPlaceSelect?: (placeDetails: PlaceDetails) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  debounceMs?: number;
}

export function LocationAutocomplete({
  value,
  onChange,
  onPlaceSelect,
  placeholder = "Enter a city",
  className,
  inputClassName,
  debounceMs = 500,
}: LocationAutocompleteProps) {
  const isClient = useIsClient();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const isSelectingRef = useRef<boolean>(false);
  const lastSelectedRef = useRef<string>("");

  // Sync internal state with external value prop
  useEffect(() => {
    if (!isSelectingRef.current && value !== searchTerm) {
      setSearchTerm(value);
    }
  }, [value, searchTerm]);

  const {
    suggestions,
    isLoading,
    error,
    fetchSuggestions,
    getPlaceDetails,
    clearSuggestions,
  } = useLocationAutocomplete();

  // Debounced search effect - only run on client
  useEffect(() => {
    if (!isClient) return;
    
    console.log("🔄 useEffect triggered - searchTerm:", searchTerm, "isSelecting:", isSelectingRef.current, "lastSelected:", lastSelectedRef.current);
    
    // Don't search if we're in the middle of selecting a place
    if (isSelectingRef.current) {
      console.log("🚫 Skipping search - currently selecting");
      isSelectingRef.current = false;
      return;
    }
    
    // Don't search if this is the same as the last selected item
    if (searchTerm === lastSelectedRef.current) {
      console.log("🚫 Skipping search - same as last selected");
      return;
    }
    
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      console.log("⏰ Debounce timeout - searchTerm:", searchTerm);
      if (searchTerm.trim() && searchTerm.trim().length >= 2 && searchTerm !== lastSelectedRef.current) {
        console.log("🔍 Fetching suggestions for:", searchTerm);
        fetchSuggestions(searchTerm);
        setIsOpen(true);
      } else {
        console.log("🧹 Clearing suggestions");
        clearSuggestions();
        setIsOpen(false);
      }
    }, debounceMs);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [isClient, searchTerm, fetchSuggestions, clearSuggestions, debounceMs]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    // Clear the last selected when user types something new
    if (newValue !== lastSelectedRef.current) {
      lastSelectedRef.current = "";
    }
    
    setSearchTerm(newValue);
    onChange(newValue);
  };

  // Handle place selection
  const handlePlaceSelect = async (place: PlacePrediction) => {
    const selectedDescription = place.description;
    
    console.log("🎯 handlePlaceSelect called with:", selectedDescription);
    
    // Clear any pending debounced search
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = undefined;
    }
    
    // Set flag to prevent search on next effect run
    isSelectingRef.current = true;
    
    // Remember this selection to prevent re-searching for it
    lastSelectedRef.current = selectedDescription;
    
    // Update states immediately to prevent search retrigger
    setSearchTerm(selectedDescription);
    setIsOpen(false);
    clearSuggestions();
    
    console.log("🔄 States updated - isOpen: false, searchTerm:", selectedDescription, "lastSelected:", lastSelectedRef.current);
    
    // Update parent component
    onChange(selectedDescription);

    if (onPlaceSelect) {
      const placeDetails = await getPlaceDetails(place.place_id);
      if (placeDetails) {
        onPlaceSelect(placeDetails);
      }
    }
    
    console.log("✅ handlePlaceSelect completed");
  };

  // Handle input focus
  const handleInputFocus = () => {
    if (suggestions.length > 0) {
      setIsOpen(true);
    }
  };

  // Handle input blur
  const handleInputBlur = (e: React.FocusEvent) => {
    // Check if the blur is happening because of a click on the dropdown
    if (
      dropdownRef.current &&
      (dropdownRef.current.contains(e.relatedTarget as Node) ||
        e.relatedTarget === dropdownRef.current)
    ) {
      return;
    }
    setTimeout(() => setIsOpen(false), 150);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div className={cn("relative", className)}>
      <Input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        className={inputClassName}
        autoComplete="off"
        suppressHydrationWarning
      />

      {/* Dropdown - only render on client */}
      {isClient && isOpen && (suggestions.length > 0 || isLoading || error) && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto"
          style={{ zIndex: 9999, minWidth: '100%' }}
        >
          {isLoading && (
            <div className="px-4 py-3 text-sm text-vera-accent">
              Searching for places...
            </div>
          )}

          {error && (
            <div className="px-4 py-3 text-sm text-red-500">
              Error: {error}
            </div>
          )}

          {suggestions.map((place) => (
            <button
                key={place.place_id}
                type="button"
                className="w-full px-4 py-3 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none border-b border-gray-200 last:border-b-0"
                onClick={() => handlePlaceSelect(place)}
              >
                <div className="text-sm font-medium text-gray-900 mb-1">
                  {place.structured_formatting.main_text}
                </div>
                <div className="text-xs text-gray-500">
                  {place.structured_formatting.secondary_text}
                </div>
              </button>
          ))}

          {!isLoading && !error && suggestions.length === 0 && searchTerm.trim() && (
            <div className="px-4 py-3 text-sm text-vera-accent">
              No places found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
