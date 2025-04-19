import { Typography, Box, Card, Divider, CircularProgress } from "@mui/material";
import MapImage from "../assets/images/map.png";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';

export default function FlightResults(props) {
  const { flightDetails, isLoading, origin, destination } = props;

  // Loading state
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "2rem",
          minHeight: "300px",
        }}
      >
        <CircularProgress size={60} sx={{ mb: 3 }} />
        <Typography variant="h6" color="text.secondary">
          Searching for flights...
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          {origin} to {destination}
        </Typography>
        <Box sx={{ mt: 3, display: "flex", alignItems: "center" }}>
          <FlightTakeoffIcon color="primary" />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            This might take a few moments
          </Typography>
        </Box>
      </Box>
    );
  }

  // No flight details and not loading (default state)
  if (flightDetails.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "2rem",
        }}
      >
        <img
          src={MapImage}
          alt="World Map"
          style={{ width: "90%", maxWidth: "1100px", height: "auto", paddingBottom: "3rem" }}
        />
      </Box>
    );
  }

  // Display flight results
  return (
    <>
      <Typography
        variant="h6"
        sx={{ textAlign: "center", marginTop: "2rem", marginBottom: "1rem" }}
      >
        Flights from {origin} to {destination}
      </Typography>

      <Card
        sx={{
          border: "0.03rem solid #ddd",
          borderRadius: 2,
          width: "90%",
          margin: "auto",
        }}
      >
        {flightDetails.map((flight, index) => (
          <Box key={index}>
            <Box
              sx={{
                display: "flex",
                padding: "1rem 1rem 0 1rem",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {flight.legs[0]?.carriers?.marketing[0]?.logoUrl && (
                <img
                  src={flight.legs[0].carriers.marketing[0].logoUrl}
                  alt={`${flight.legs[0].carriers.marketing[0].name} Logo`}
                  style={{
                    width: "1.5rem",
                    height: "1.5rem",
                    objectFit: "contain",
                  }}
                />
              )}
              <Typography>
                {flight.legs[0]?.carriers?.marketing[0]?.name || "Unknown Airline"}
              </Typography>
              <Typography variant="body1">
                {flight.price?.formatted || "Price unavailable"}
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{ fontSize: "0.8rem", padding: "0 1rem 0 1rem" }}
            >
              {flight.legs[0]?.stopCount} stops ·{" "}
              {Math.floor(flight.legs[0]?.durationInMinutes / 60)} hr{" "}
              {flight.legs[0]?.durationInMinutes % 60} min
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: "0.8rem", padding: "0 1rem 1rem 1rem" }}
            >
              {flight.legs[0]?.origin?.displayCode} -{" "}
              {flight.legs[0]?.destination?.displayCode}
            </Typography>
            {index < flightDetails.length - 1 && (
              <Divider sx={{ width: "100%" }} />
            )}
          </Box>
        ))}
      </Card>
    </>
  );
}