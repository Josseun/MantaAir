export const flightService = {
  async searchFlightOffers({
    origin,
    destination,
    date,
    adults = 1,
    max = 30,
  }) {
    try {
      const params = new URLSearchParams({
        origin,
        destination,
        date,
        adults,
        max,
      });
      const response = await fetch(`/api/amadeus?${params}`);

      if (!response.ok) throw new Error("Flight search failed");

      const data = await response.json();
      return data.data;
    } catch (error) {
      throw error;
    }
  },
};
