import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const LoadingScreen = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        bgcolor: "white",
      }}
    >
      <CircularProgress size={60} thickness={4} color="warning" />
    </Box>
  );
};

export default LoadingScreen;
