import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export default function GooglePlaceAutocomplete({
  value = "",
  onChange,
  onPlaceSelect,
  error,
  placeholder = "Search location...",
  disabled = false,
}) {
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    const initAutocomplete = async () => {
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

      if (!apiKey) {
        console.error("VITE_GOOGLE_MAPS_API_KEY is missing.");

        return;
      }

      try {
        const loader = new Loader({
          apiKey,
          version: "weekly",
          libraries: ["places"],
        });

        await loader.load();

        if (cancelled || !inputRef.current) {
          return;
        }

        const autocomplete = new window.google.maps.places.Autocomplete(
          inputRef.current,
          {
            fields: ["place_id", "formatted_address", "name", "geometry"],
          },
        );

        autocompleteRef.current = autocomplete;

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();

          const address = place.formatted_address || place.name || "";

          onChange?.(address);

          onPlaceSelect?.(place);
        });
      } catch (error) {
        console.error("Google Places failed to load:", error);
      }
    };

    initAutocomplete();

    return () => {
      cancelled = true;

      if (autocompleteRef.current) {
        window.google?.maps?.event?.clearInstanceListeners(
          autocompleteRef.current,
        );
      }
    };
  }, []);

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        value={value || ""}
        onChange={(event) => onChange?.(event.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        autoComplete="off"
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
      />

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
