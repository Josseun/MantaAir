import { MantaClient } from "mantahq-sdk";

const BASE_URL = import.meta.env.VITE_API;

const sdkKey = import.meta.env.VITE_BOOKING_SDK;

if (!sdkKey) {
  console.error(
    "⚠️ VITE_BOOKING_SDK is missing — check your deployment env vars",
  );
}

const mantaSDK = new MantaClient(sdkKey);

export const manta = {
  async signup(data) {
    try {
      const response = await fetch(`${BASE_URL}/auth-api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Signup failed");
      return result;
    } catch (error) {
      console.error("Signup error:", error.message);
      throw error;
    }
  },

  async login(data) {
    try {
      const response = await fetch(`${BASE_URL}/auth-api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Login failed");
      return result;
    } catch (error) {
      console.error("Login Error:", error.message);
      throw error;
    }
  },

  async createBooking(data) {
    try {
      const response = await mantaSDK.createRecords({
        table: "booking-data",
        data: [data],
      });
      return response;
    } catch (error) {
      throw new Error(error.message || "Booking failed");
    }
  },

  async getMyBookings(userId) {
    try {
      const response = await mantaSDK.fetchOneRecord({
        table: "booking-data",
        where: { userid: userId },
        fields: [
          "firstname",
          "lastname",
          "dob",
          "gender",
          "passport",
          "phone",
          "email",
          "flightfrom",
          "flightto",
          "flightdate",
          "flightprice",
          "airline",
          "status",
          "userid",
        ],
      });
      return response;
    } catch (error) {
      throw new Error(error.message || "Failed to fetch booking");
    }
  },

  async getAllBookings(userId) {
    try {
      const response = await mantaSDK.fetchAllRecords({
        table: "booking-data",
        where: { userid: userId },
        fields: [
          "firstname",
          "lastname",
          "dob",
          "gender",
          "passport",
          "phone",
          "email",
          "flightfrom",
          "flightto",
          "flightdate",
          "flightprice",
          "airline",
          "status",
          "userid",
        ],
      });
      return response;
    } catch (error) {
      throw new Error(error.message || "Failed to fetch bookings");
    }
  },
};
