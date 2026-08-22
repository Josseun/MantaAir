// src/services/amadeusApi.js
//
// This used to call the live Amadeus API (now disabled).
// It now reads from a local static JSON file instead, but keeps the
// exact same function name, input shape, and return shape — so nothing
// else in the app (ExploreView.vue, FlightCard.vue, etc.) needs to change.

let cachedFlights = null;

/**
 * Loads /public/data/flights.json once and caches it in memory,
 * so we don't re-fetch the file on every search call.
 */
async function loadFlightsData() {
  if (cachedFlights) return cachedFlights;

  const res = await fetch("/data/flights.json");
  if (!res.ok) {
    throw new Error(`Failed to load local flight data (${res.status})`);
  }

  const json = await res.json();
  cachedFlights = json.data || [];
  return cachedFlights;
}

/**
 * Mimics the old Amadeus search call.
 *
 * @param {Object} params
 * @param {string} params.origin        - e.g. "LOS"
 * @param {string} params.destination   - e.g. "LHR"
 * @param {string} params.date          - e.g. "2026-06-15" (unused for now,
 *                                         since the mock data is fixed to one date)
 * @param {number} [params.max]         - max number of offers to return
 * @returns {Promise<Array>} array of flight offer objects
 */
export async function searchFlightOffers({ origin, destination, date, max = 30 }) {
  const allFlights = await loadFlightsData();

  const matches = allFlights.filter((offer) => {
    const firstSegment = offer.itineraries?.[0]?.segments?.[0];
    const segments = offer.itineraries?.[0]?.segments || [];
    const lastSegment = segments[segments.length - 1];

    const flightOrigin = firstSegment?.departure?.iataCode;
    const flightDestination = lastSegment?.arrival?.iataCode;

    return flightOrigin === origin && flightDestination === destination;
  });

  return matches.slice(0, max);
}

// Keep the same export shape as before, in case other files import it
// as `flightService.searchFlightOffers(...)` rather than a named import.
export const flightService = {
  searchFlightOffers,
};