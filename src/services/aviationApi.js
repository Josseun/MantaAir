import axios from "axios";

const API_KEY = import.meta.env.VITE_AVIATION_KEY;
const BASE_URL = "https://api.aviationstack.com/v1";

const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    access_key: API_KEY,
  },
});

export const flightService = {
  async getLiveFlights(limit = 10) {
    try {
      const response = await apiClient.get("/flights", {
        params: {
          dep_iata: "LHR",
          flight_status: "active",
          limit,
        },
      });

      return response.data.data;
    } catch (error) {
      console.error("Error fetching live flights:", error);
      throw error;
    }
  },

  async searchByAirport(iataCode) {
    try {
      const response = await apiClient.get("/flights", {
        params: {
          dep_iata: iataCode.toUpperCase(),
        },
      });

      return response.data.data;
    } catch (error) {
      console.error("Search error:", error);
      throw error;
    }
  },
};