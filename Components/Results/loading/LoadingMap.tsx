import React from "react";
import Box from '@mui/material/Box';
import { ShimmerThumbnail } from "react-shimmer-effects";

const LoadingMap = () => {
  return (
    <Box p={0.5}>
      <ShimmerThumbnail height={350}/>
    </Box>
  );
}

export default LoadingMap;