export default async function handler(req, res) {
  const { origin, destination, date, adults = 1, max = 30 } = req.query;

  try {
    const tokenRes = await fetch(
      "https://test.api.amadeus.com/v1/security/oauth2/token",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          client_id: process.env.AMADEUS_KEY,
          client_secret: process.env.AMADEUS_SECRET,
        }),
      },
    );
    const { access_token } = await tokenRes.json();

    const params = new URLSearchParams({
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate: date,
      adults,
      max,
      currencyCode: "USD",
    });

    const flightRes = await fetch(
      `https://test.api.amadeus.com/v2/shopping/flight-offers?${params}`,
      { headers: { Authorization: `Bearer ${access_token}` } },
    );
    const flightData = await flightRes.json();

    res.status(200).json(flightData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
