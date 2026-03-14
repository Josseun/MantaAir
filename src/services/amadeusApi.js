import axios from "axios";

const CLIENT_KEY = import.meta.env.VITE_AMADEUS_KEY;
const CLIENT_SECRET = import.meta.env.VITE_AMADEUS_SECRET;

let cachedToken = null;
let tokenExpiresAt = null;

export const getAccessToken = async () => {
  if (cachedToken && tokenExpiresAt && Date.now() < tokenExpiresAt)
    return cachedToken;

  try {
    const response = await axios.post(
      "https://test.api.amadeus.com/v1/security/oauth2/token",
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: CLIENT_KEY,
        client_secret: CLIENT_SECRET,
      }),

      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      },
    );
    cachedToken = response.data.access_token;
    tokenExpiresAt = Date.now() + (response.data.expires_in - 60) * 1000;
    return cachedToken;
  } catch (error) {
    console.error("Token Error:", error.response?.data || error.message);
    throw error;
  }
};

export const flightService = {
  async searchFlightOffers({
    origin,
    destination,
    date,
    adults = 1,
    max = 30,
  }) {
    const token = await getAccessToken();

    try {
      const response = await axios.get(
        "https://test.api.amadeus.com/v2/shopping/flight-offers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            originLocationCode: origin,
            destinationLocationCode: destination,
            departureDate: date,
            adults,
            max,
            currencyCode: "USD",
          },
        },
      );
      return response.data.data;
    } catch (error) {
      if (error.response?.status === 401) {
        cachedToken = null;
        tokenExpiresAt = null;
      }
      throw error;
    }
  },
};
