import axios from "axios";


const API_KEY = import.meta.env.VITE_MY_API_KEY;
const API_HOST = "sky-scrapper.p.rapidapi.com";


/**
 * Fetches SkyId and EntityId for a location by name
 * @param {string} location - The location name or airport code
 * @returns {Object|null} - Object with skyId and entityId or null if not found
 */
export const fetchSkyIdAndEntityId = async (location) => {
  const options = {
    method: "GET",
    url: `https://${API_HOST}/api/v1/flights/searchAirport`,
    params: { query: location, locale: "en-US" },
    headers: {
      "x-rapidapi-key": API_KEY,
      "x-rapidapi-host": API_HOST,
    },
  };


  try {
    const response = await axios.request(options);
    if (response.data?.data?.length > 0) {
      return {
        skyId: response.data.data[0].skyId,
        entityId: response.data.data[0].entityId,
      };
    } else {
      console.error(`No SkyId found for location: ${location}`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching SkyId for location: ${location}`, error);
    return null;
  }
};


/**
 * Fetch airport suggestions based on user search query
 * @param {string} searchQuery - The search query for airport/city
 * @returns {Array} - Array of airport suggestion objects
 */
export const fetchAirportSuggestions = async (searchQuery) => {
  // Don't make API calls for very short queries
  if (!searchQuery || searchQuery.length < 2) {
    return [];
  }


  const options = {
    method: "GET",
    url: `https://${API_HOST}/api/v1/flights/searchAirport`,
    params: { query: searchQuery, locale: "en-US" },
    headers: {
      "x-rapidapi-key": API_KEY,
      "x-rapidapi-host": API_HOST,
    },
  };


  try {
    const response = await axios.request(options);
   
    if (response.data?.data?.length > 0) {
      return response.data.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching airport suggestions:", error);
    return [];
  }
};


/**
 * Fetch flight details between two locations
 * @param {Object} originSkyIdAndEntityId - Origin location IDs
 * @param {Object} destinationSkyIdAndEntityId - Destination location IDs
 * @param {string} tripClass - Cabin class (economy, premium_economy, business, first)
 * @param {Object} counts - Passenger counts
 * @param {string} departureDate - Departure date (YYYY-MM-DD)
 * @param {string} returnDate - Return date (YYYY-MM-DD) for round trips
 * @returns {Array} - Array of flight itineraries
 */
export const fetchFlightDetails = async (
  originSkyIdAndEntityId,
  destinationSkyIdAndEntityId,
  tripClass,
  counts,
  departureDate,
  returnDate
) => {
  const options = {
    method: "GET",
    url: `https://${API_HOST}/api/v2/flights/searchFlights`,
    params: {
      originSkyId: originSkyIdAndEntityId.skyId,
      originEntityId: originSkyIdAndEntityId.entityId,
      destinationSkyId: destinationSkyIdAndEntityId.skyId,
      destinationEntityId: destinationSkyIdAndEntityId.entityId,
      cabinClass: tripClass || "economy",
      adults: counts.adults,
      children: counts.children,
      infants: counts.infantsSeat + counts.infantsLap,
      sortBy: "best",
      currency: "USD",
      market: "en-US",
      countryCode: "US",
      date: departureDate,
      ...(returnDate && { returnDate }),
    },
    headers: {
      "x-rapidapi-key": API_KEY,
      "x-rapidapi-host": API_HOST,
    },
  };


  try {
    const response = await axios.request(options);
    return response.data?.data?.itineraries || [];
  } catch (error) {
    console.error("Error fetching flight details:", error);
    return [];
  }
};

